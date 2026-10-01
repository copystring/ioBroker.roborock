import { buildMowerButton, buildMowerInfoRequest, buildMowerSettingsRequest, buildMowerRainfallRequest, buildMowerNotDisturbRequest, isSourceSupportedMower } from "./mowerContract";
import type { MowerCommand, MowerRainfallSetting, MowerNotDisturbSetting } from "./mowerContract";
import type { MowerRpcTransport, MowerRpcResponse } from "./MowerRpcTransport";
import { MowerStatusStore } from "./MowerStatusStore";
import type { MowerStatusSnapshot } from "./MowerStatusStore";
import { buildMowerScheduleRequest, parseMowerScheduleReadback, findMowerScheduleOverlap, prepareMowerSchedulePreferences } from "./mowerScheduleContract";
import type { MowerScheduleReadback } from "./mowerScheduleContract";
import { waitForMowerReadback } from "./MowerReadback";
import { readMowerHeightParameters, readMowerHeightPreference, validateMowerCuttingHeight, sendMowerCuttingHeight } from "./mowerCuttingHeight";
import type { MowerHeightParameters, MowerHeightPreference, MowerHeightBleProvider } from "./mowerCuttingHeight";
import { decodeMowerRpcResult } from "./mowerJsonMessage";
import { MowerMapStore, buildMowerAreaRequest, buildMowerMapNamesRequest } from "./MowerMapStore";
import type { MowerMapSelection } from "./MowerMapStore";

/** The SDK blob receiver must establish the active map, not merely download a saved map by name. */
export interface MowerMapProvider {
	isAvailable(duid: string): boolean;
	readCurrentMap(duid: string, signal: AbortSignal): Promise<{ mapName: string; navMap: unknown }>;
}
export interface MowerServices { ble?: MowerHeightBleProvider; maps?: MowerMapProvider; }

/** Source-derived device behavior; transport wiring remains separate from the vacuum handlers. */
export class MowerSession {
	private readonly status = new MowerStatusStore();
	private schedule: MowerScheduleReadback | undefined;
	private readonly messages = new Set<(message: unknown) => void>();
	private reads = new AbortController();
	private mutations: Promise<void> = Promise.resolve();
	private heightParameters: MowerHeightParameters | undefined;
	private heightPreference: MowerHeightPreference | undefined;
	private readonly map = new MowerMapStore();
	private mapData: string | undefined;
	private mapKnown = false;
	private mapRead: Promise<void> | undefined;
	private lastRequestId = 0;
	private closed = false;
	private readonly lifetime = new AbortController();

	constructor(
		private readonly duid: string,
		model: string,
		category: string | null,
		private readonly rpc: Pick<MowerRpcTransport, "request">,
		private readonly now: () => number = Date.now,
		private readonly services: MowerServices = {},
	) {
		if (!duid || !isSourceSupportedMower(model, category)) throw new Error("Unsupported mower session");
	}

	/** A resolved result confirms only RPC acknowledgement, not completion of the movement. */
	public command(command: MowerCommand): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerButton(command, this.nextId()), this.lifetime.signal);
	}

	/** Status remains unchanged until a separate ROBOT_STATUS_UPDATE arrives. */
	public requestStatus(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerInfoRequest(this.nextId()), this.lifetime.signal);
	}

	public requestSettings(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerSettingsRequest(this.nextId()), this.lifetime.signal);
	}

	public setRainfall(setting: MowerRainfallSetting): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerRainfallRequest(setting, this.nextId()), this.lifetime.signal);
	}

	public setNotDisturb(setting: MowerNotDisturbSetting): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerNotDisturbRequest(setting, this.nextId()), this.lifetime.signal);
	}

	public requestSchedules(signal = this.lifetime.signal): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerScheduleRequest("list", this.nextId()), signal);
	}

	public async readSchedules(signal = AbortSignal.any([this.lifetime.signal, this.reads.signal])): Promise<MowerScheduleReadback> {
		this.assertOpen();
		const schedule = await waitForMowerReadback(() => this.requestSchedules(signal), parseMowerScheduleReadback, listener => {
			this.messages.add(listener);
			return () => this.messages.delete(listener);
		}, signal);
		this.schedule = schedule;
		return structuredClone(schedule);
	}

	/** Mutations use a freshly confirmed list and never convert a transport ACK into readback. */
	public mutateSchedule(action: "create" | "change" | "delete" | "deleteAll", plan?: unknown): Promise<MowerScheduleReadback> {
		this.assertOpen();
		const validatedRequest = buildMowerScheduleRequest(action, 1, plan);
		const signal = AbortSignal.any([this.lifetime.signal, this.reads.signal]);
		const result = this.mutations.then(async () => {
			let request = validatedRequest;
			signal.throwIfAborted();
			const current = await this.readSchedules(signal);
			if ("mowing_plan" in request && request.mowing_plan) {
				const id = request.mowing_plan.id;
				const exists = current.plans.some(existing => existing.id === id);
				if (action === "create" && exists) throw new Error("Mower schedule id already exists");
				if (action !== "create" && !exists) throw new Error("Mower schedule id is not present in device readback");
			}
			let mapSignal: AbortSignal | undefined;
			if (request.type === "CREATE_MOWING_PLAN" || request.type === "CHANGE_MOWING_PLAN") {
				const preferences = await this.readSchedulePreferences(signal);
				const planId = request.mowing_plan.id;
				const existing = action === "change" ? current.plans.find(item => item.id === planId) : undefined;
				const prepared = prepareMowerSchedulePreferences(request.mowing_plan, preferences, existing);
				if (prepared.changedHeights.length) {
					const parameters = await waitForMowerReadback(() => this.rpc.request(this.duid, { id: String(this.nextId()), type: "GET_HEIGHT_MOTOR_PARAMETER" }, signal), readMowerHeightParameters, listener => {
						this.messages.add(listener);
						return () => this.messages.delete(listener);
					}, signal);
					this.heightParameters = parameters;
					for (const height of prepared.changedHeights) validateMowerCuttingHeight(height, parameters);
				}
				request = { ...request, mowing_plan: prepared.plan };
				const candidate = request.mowing_plan;
				if (candidate.status === 1) {
					const timeZone = current.time_zone || await this.readTimeZone(signal);
					if (findMowerScheduleOverlap(candidate, current, timeZone) !== undefined) throw new Error("Mower schedule overlaps an existing active plan");
				}
				if (candidate.fsm_state === 20) {
					await this.refreshMap();
					const mapName = this.map.getCurrentMap();
					if (!mapName) throw new Error("Current mower map is unavailable");
					// Boundary.id is int32; MowPreference.area_id stores the same bits as uint32.
					const ids = candidate.config.custom!.map(area => area.area_id! > 0x7fffffff ? area.area_id! - 0x100000000 : area.area_id!);
					mapSignal = this.map.selectBoundaries(mapName, ids).signal;
				}
			}
			signal.throwIfAborted();
			await this.rpc.request(this.duid, { ...request, id: String(this.nextId()) }, mapSignal ? AbortSignal.any([signal, mapSignal]) : signal);
			return this.readSchedules(signal);
		});
		this.mutations = result.then(() => {}, () => {});
		return result;
	}

	private async readSchedulePreferences(signal: AbortSignal): Promise<unknown> {
		const parse = (value: unknown): Record<string, unknown> | undefined => {
			if (!readMowerHeightPreference(value)) return undefined;
			return value as Record<string, unknown>;
		};
		const message = await waitForMowerReadback(() => this.rpc.request(this.duid, { id: String(this.nextId()), type: "GET_MOW_PREFERENCE_CONFIG" }, signal), parse, listener => {
			this.messages.add(listener);
			return () => this.messages.delete(listener);
		}, signal);
		this.acceptRobotMessage(message);
		return message.preference_config;
	}

	public requestTimeZone(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerScheduleRequest("timezone", this.nextId()), this.lifetime.signal);
	}

	private async readTimeZone(signal: AbortSignal): Promise<string> {
		const parse = (value: unknown): string | undefined => {
			if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
			const message = value as Record<string, unknown>;
			return (message.type === 35 || message.type === "ROBOT_TIME_ZONE") && typeof message.time_zone === "string" ? message.time_zone : undefined;
		};
		const zone = await waitForMowerReadback(() => this.rpc.request(this.duid, buildMowerScheduleRequest("timezone", this.nextId()), signal), parse, listener => {
			this.messages.add(listener);
			return () => this.messages.delete(listener);
		}, signal);
		this.status.acceptRobotMessage({ type: "ROBOT_TIME_ZONE", time_zone: zone });
		return zone;
	}

	public requestHeightParameters(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, { id: String(this.nextId()), type: "GET_HEIGHT_MOTOR_PARAMETER" }, this.lifetime.signal);
	}

	public requestMowingPreferences(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, { id: String(this.nextId()), type: "GET_MOW_PREFERENCE_CONFIG" }, this.lifetime.signal);
	}

	public isBluetoothAvailable(): boolean {
		return !this.closed && this.services.ble?.isConnected(this.duid) === true;
	}

	public validateCuttingHeight(value: unknown): number {
		this.assertOpen();
		if (!this.heightParameters) throw new Error("Refresh cutting-height parameters before setting height");
		if (!this.isBluetoothAvailable()) throw new Error("Mower BLE connection unavailable");
		return validateMowerCuttingHeight(value, this.heightParameters);
	}

	public async setCuttingHeight(value: unknown): Promise<void> {
		const height = this.validateCuttingHeight(value);
		const signal = AbortSignal.any([this.lifetime.signal, this.reads.signal]);
		await sendMowerCuttingHeight(this.duid, height, this.heightParameters!, this.nextId(), this.services.ble, signal);
		signal.throwIfAborted();
		// BLE completion is not the preference value. Request the independent readback.
		const response = await this.requestMowingPreferences();
		const preference = readMowerHeightPreference(decodeMowerRpcResult(response));
		if (preference) this.heightPreference = preference;
	}

	public isMapDownloadAvailable(): boolean {
		return !this.closed && this.services.maps?.isAvailable(this.duid) === true;
	}

	public requestMapNames(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerMapNamesRequest(this.nextId()), this.lifetime.signal);
	}

	public async refreshMap(): Promise<void> {
		this.assertOpen();
		if (this.mapRead) return this.mapRead;
		if (!this.isMapDownloadAvailable()) throw new Error("Mower native map download unavailable");
		const signal = AbortSignal.any([this.lifetime.signal, this.reads.signal]);
		this.map.clear();
		this.mapKnown = true;
		this.mapData = undefined;
		const task = (async () => {
			const response = await this.services.maps!.readCurrentMap(this.duid, signal);
			signal.throwIfAborted();
			const serialized = JSON.stringify(response.navMap);
			const revision = this.map.beginMap(response.mapName);
			if (!this.map.acceptMap(response.mapName, revision, response.navMap)) throw new Error("Invalid current mower map data");
			this.mapData = serialized;
		})();
		this.mapRead = task;
		try {
			await task;
		} finally {
			if (this.mapRead === task) this.mapRead = undefined;
		}
	}

	public validateAreaInput(value: unknown): { mapName: string; boundaryIds: number[] } {
		if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Area command requires mapName and boundaryIds");
		const input = value as Record<string, unknown>;
		if (Object.keys(input).length !== 2 || typeof input.mapName !== "string" || !input.mapName || !Array.isArray(input.boundaryIds) || input.boundaryIds.length === 0 || input.boundaryIds.some(id => !Number.isInteger(id) || id < -0x80000000 || id > 0x7fffffff) || new Set(input.boundaryIds).size !== input.boundaryIds.length) throw new Error("Invalid mower area selection");
		if (!this.isMapDownloadAvailable()) throw new Error("Mower native map download unavailable");
		return { mapName: input.mapName, boundaryIds: [...input.boundaryIds] as number[] };
	}

	public async mowAreas(input: unknown, kind: "area" | "edge"): Promise<MowerRpcResponse> {
		this.assertOpen();
		const area = this.validateAreaInput(input);
		// Re-read the active map for each movement. Persisted IDs from a saved map are insufficient.
		await this.refreshMap();
		const selection: MowerMapSelection = this.map.selectBoundaries(area.mapName, area.boundaryIds);
		if (!this.map.isCurrent(selection)) throw new Error("Mower map selection changed");
		return this.rpc.request(this.duid, buildMowerAreaRequest(selection, this.nextId(), kind), AbortSignal.any([this.lifetime.signal, this.reads.signal, selection.signal]));
	}

	public acceptRobotMessage(message: unknown): boolean {
		if (this.closed) return false;
		const status = this.status.acceptRobotMessage(message);
		const schedule = parseMowerScheduleReadback(message);
		if (schedule) this.schedule = schedule;
		const heightParameters = readMowerHeightParameters(message);
		const heightPreference = readMowerHeightPreference(message);
		if (heightParameters) this.heightParameters = heightParameters;
		if (heightPreference) this.heightPreference = heightPreference;
		for (const listener of this.messages) listener(message);
		return status || schedule !== undefined || heightParameters !== undefined || heightPreference !== undefined;
	}

	public getStatus(): MowerStatusSnapshot | undefined {
		const status = this.status.getSnapshot();
		if (!status && !this.schedule && !this.heightParameters && !this.heightPreference && !this.mapKnown) return undefined;
		return {
			...status,
			...(this.schedule ? { schedules: JSON.stringify(this.schedule) } : {}),
			...(this.heightParameters ? { cuttingHeightMin: this.heightParameters.min, cuttingHeightMax: this.heightParameters.max, cuttingHeightStep: this.heightParameters.step } : {}),
			...(this.heightPreference ? { areaCuttingHeights: JSON.stringify(this.heightPreference.custom), cuttingHeight: this.heightPreference.global ?? null } : {}),
			...(this.mapKnown ? { mapData: this.mapData ?? null, currentMap: this.map.getCurrentMap(), mowingAreas: this.map.getCurrentMap() ? JSON.stringify(this.map.getBoundaries()) : null } : {}),
		};
	}

	public getSchedules(): MowerScheduleReadback | undefined {
		return this.schedule ? structuredClone(this.schedule) : undefined;
	}

	public close(): void {
		this.closed = true;
		this.lifetime.abort();
		this.messages.clear();
		this.map.clear();
	}

	private assertOpen(): void {
		if (this.closed) throw new Error("Mower session closed");
	}

	public cancelReadbacks(): void {
		this.reads.abort();
		this.reads = new AbortController();
		this.map.clear();
		this.mapData = undefined;
	}

	private nextId(): number {
		const timestamp = this.now();
		if (!Number.isSafeInteger(timestamp) || timestamp <= 0) throw new Error("Invalid mower request clock");
		// Preserve timestamp semantics while avoiding duplicate ids within the same millisecond.
		const id = Math.max(timestamp, this.lastRequestId + 1);
		if (!Number.isSafeInteger(id)) throw new Error("Mower protobuf id exhausted");
		this.lastRequestId = id;
		return id;
	}
}
