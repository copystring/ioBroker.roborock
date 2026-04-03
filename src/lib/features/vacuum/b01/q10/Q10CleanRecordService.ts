import type { FeatureDependencies } from "../../../baseDeviceFeatures";
import { DeviceStateWriter } from "../../../deviceStateWriter";

type Q10CleanRecordServiceDeps = {
	deps: FeatureDependencies;
	duid: string;
	robotModel: string;
};

export class Q10CleanRecordService {
	private q10RecordIndexById = new Map<string, number>();
	private q10RecordSelectTokenById = new Map<string, string>();
	private q10PendingRecordMapRequests = new Set<string>();
	private q10QueuedRecordMapRequests: string[] = [];
	private q10ActiveRecordMapRequest: { recordId: string; index: number; acknowledged: boolean } | null = null;
	private q10RecordMapRequestTimeout: ioBroker.Timeout | undefined;
	private static readonly Q10_RECORD_MAP_TIMEOUT_MS = 15000;
	private readonly stateWriter: DeviceStateWriter;

	constructor(private readonly featureDeps: Q10CleanRecordServiceDeps) {
		this.stateWriter = new DeviceStateWriter(this.deps, this.duid);
	}

	private get deps(): FeatureDependencies {
		return this.featureDeps.deps;
	}

	private get duid(): string {
		return this.featureDeps.duid;
	}

	private get robotModel(): string {
		return this.featureDeps.robotModel;
	}

	private formatQ10Time(value: number): string {
		return value.toString().padStart(2, "0");
	}

	private async deleteObjectIfExists(relativePath: string, recursive = false): Promise<void> {
		const id = this.stateWriter.path(relativePath);
		const existing = await this.deps.adapter.getObjectAsync(id);
		if (!existing) return;
		await this.deps.adapter.delObjectAsync(id, recursive ? { recursive: true } : undefined);
	}

	private decodeQ10RecordMapPayload(value: unknown): Buffer | null {
		if (Buffer.isBuffer(value)) return value;
		if (value instanceof Uint8Array) return Buffer.from(value);
		if (value instanceof ArrayBuffer) return Buffer.from(value);

		if (typeof value === "string") {
			const payload = value.trim();
			if (!payload) return null;

			if (/^[0-9a-f]+$/i.test(payload) && payload.length % 2 === 0) {
				const hex = Buffer.from(payload, "hex");
				if (hex.length > 0) return hex;
			}

			if (/^[A-Za-z0-9+/=]+$/.test(payload) && payload.length >= 8) {
				const base64 = Buffer.from(payload, "base64");
				if (base64.length > 0) return base64;
			}

			return null;
		}

		if (!value || typeof value !== "object") return null;
		for (const key of ["data", "map", "payload", "detail", "blob", "raw"]) {
			const nested = (value as Record<string, unknown>)[key];
			const decoded = this.decodeQ10RecordMapPayload(nested);
			if (decoded) return decoded;
		}
		return null;
	}

	private async ensureQ10RecordMapStates(index: number, mapRes: { mapBase64: string; mapBase64Clean?: string; mapData?: unknown }): Promise<void> {
		const folder = `cleaningInfo.records.${index}`;
		const mapFolder = `${folder}.map`;
		await this.stateWriter.ensureFolder(folder);
		await this.stateWriter.ensureFolder(mapFolder);
		await this.deleteObjectIfExists(`${folder}.mapBase64`);
		await this.deleteObjectIfExists(`${folder}.mapBase64Clean`);
		await this.deleteObjectIfExists(`${folder}.mapData`);
		await this.deleteObjectIfExists(`${mapFolder}.mapBase64Clean`);
		await this.stateWriter.ensureAndSetState(`${mapFolder}.mapBase64`, {
			name: "Map Base64",
			type: "string",
			role: "text.png",
			read: true,
			write: false
		}, mapRes.mapBase64);

		if (mapRes.mapData) {
			await this.stateWriter.ensureAndSetValueState(`${mapFolder}.mapData`, {
				name: "Map Data",
				type: "string",
				role: "json"
			}, JSON.stringify(mapRes.mapData));
		}
	}

	private clearQ10RecordMapTimeout(): void {
		if (this.q10RecordMapRequestTimeout) {
			this.deps.adapter.clearTimeout(this.q10RecordMapRequestTimeout);
			this.q10RecordMapRequestTimeout = undefined;
		}
	}

	private async finishQ10CleanRecordMapRequest(recordId: string, success: boolean): Promise<void> {
		if (this.q10ActiveRecordMapRequest?.recordId !== recordId) {
			return;
		}

		this.clearQ10RecordMapTimeout();
		this.q10ActiveRecordMapRequest = null;
		this.q10PendingRecordMapRequests.delete(recordId);

		if (!success) {
			this.q10QueuedRecordMapRequests = this.q10QueuedRecordMapRequests.filter((queuedId) => queuedId !== recordId);
		}

		await this.requestNextQ10CleanRecordMap();
	}

	private async requestNextQ10CleanRecordMap(): Promise<void> {
		if (this.q10ActiveRecordMapRequest || this.q10QueuedRecordMapRequests.length === 0) {
			return;
		}

		while (this.q10QueuedRecordMapRequests.length > 0) {
			const recordId = this.q10QueuedRecordMapRequests.shift();
			if (!recordId) return;

			const index = this.q10RecordIndexById.get(recordId);
			if (index == null) {
				this.q10PendingRecordMapRequests.delete(recordId);
				continue;
			}

			const selectToken = this.q10RecordSelectTokenById.get(recordId);
			if (!selectToken) {
				this.q10PendingRecordMapRequests.delete(recordId);
				this.deps.adapter.rLog(
					"System",
					this.duid,
					"Warn",
					"B01",
					52,
					`Q10 clean record detail ${recordId} missing select token from 52.list entry.`,
					"warn"
				);
				continue;
			}

			this.q10ActiveRecordMapRequest = { recordId, index, acknowledged: false };
			this.clearQ10RecordMapTimeout();
			this.q10RecordMapRequestTimeout = this.deps.adapter.setTimeout(() => {
				const active = this.q10ActiveRecordMapRequest;
				if (!active || active.recordId !== recordId) return;
				this.deps.adapter.rLog(
					"System",
					this.duid,
					"Warn",
					"B01",
					52,
					`Q10 clean record detail ${recordId} timed out waiting for blob type 3.`,
					"warn"
				);
				void this.finishQ10CleanRecordMapRequest(recordId, false);
			}, Q10CleanRecordService.Q10_RECORD_MAP_TIMEOUT_MS);

			try {
				await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, {
					"101": {
						"52": {
							op: "select",
							id: selectToken
						}
					}
				});
				return;
			} catch (e: unknown) {
				this.clearQ10RecordMapTimeout();
				this.q10ActiveRecordMapRequest = null;
				this.q10PendingRecordMapRequests.delete(recordId);
				this.deps.adapter.rLog(
					"System",
					this.duid,
					"Warn",
					"B01",
					undefined,
					`Q10 request clean record detail ${recordId}: ${this.deps.adapter.errorMessage(e)}`,
					"warn"
				);
			}
		}
	}

	private async requestMissingQ10CleanRecordMaps(
		records: ReadonlyArray<{ raw: string; record_id: string; map_len: number; path_len: number; virtual_len: number }>
	): Promise<void> {
		let queuedCount = 0;
		for (const record of records) {
			const shouldHaveMap = record.map_len > 0 || record.path_len > 0 || record.virtual_len > 0;
			if (!shouldHaveMap || !record.record_id) continue;
			if (this.q10PendingRecordMapRequests.has(record.record_id)) continue;

			const index = this.q10RecordIndexById.get(record.record_id);
			if (index == null) continue;

			const existingMap =
				await this.deps.adapter.getStateAsync(this.stateWriter.path(`cleaningInfo.records.${index}.map.mapBase64`)) ??
				await this.deps.adapter.getStateAsync(this.stateWriter.path(`cleaningInfo.records.${index}.mapBase64`));
			if (typeof existingMap?.val === "string" && existingMap.val.startsWith("data:image/")) continue;

			this.q10PendingRecordMapRequests.add(record.record_id);
			if (!this.q10QueuedRecordMapRequests.includes(record.record_id)) {
				this.q10QueuedRecordMapRequests.push(record.record_id);
				queuedCount++;
			}
		}

		if (queuedCount > 0) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Debug",
				"B01",
				52,
				`Q10 queued ${queuedCount} clean record map request(s).`,
				"debug"
			);
		}

		await this.requestNextQ10CleanRecordMap();
	}

	public hasPendingQ10CleanRecordBlobRequest(): boolean {
		return this.q10ActiveRecordMapRequest !== null;
	}

	public async applyQ10CleanRecordBlob(blobPayload: Buffer): Promise<boolean> {
		if (!this.q10ActiveRecordMapRequest) return false;
		if (blobPayload[0] !== 3) return false;

		const { recordId, index } = this.q10ActiveRecordMapRequest;

		try {
			const device = this.deps.adapter.http_api.getDevices().find((entry: { duid: string }) => entry.duid === this.duid);
			const model = this.deps.adapter.http_api.getRobotModel(this.duid) || this.robotModel;
			const serial = typeof device?.sn === "string" && device.sn.trim() ? device.sn.trim() : null;
			if (!serial) {
				this.deps.adapter.rLog(
					"System",
					this.duid,
					"Warn",
					"B01",
					52,
					`Q10 clean record blob ${recordId} skipped because the device serial is missing.`,
					"warn"
				);
				await this.finishQ10CleanRecordMapRequest(recordId, false);
				return true;
			}
			const mapRes = await this.deps.adapter.mapManager.processMap(
				blobPayload,
				"B01",
				model,
				serial,
				null,
				this.duid,
				"B01History"
			);
			if (!mapRes?.mapBase64) return true;

			await this.ensureQ10RecordMapStates(index, mapRes);
			this.deps.adapter.rLog("MapManager", this.duid, "Debug", "B01", 52, `Q10 clean record map stored for record ${recordId} at index ${index}`, "debug");
			await this.finishQ10CleanRecordMapRequest(recordId, true);
			return true;
		} catch {
			return true;
		}
	}

	private async applyQ10CleanRecordDetail(dp52: Record<string, unknown>): Promise<void> {
		const op = String(dp52.op ?? "");
		if (op !== "select") return;

		const activeRequest = this.q10ActiveRecordMapRequest;
		const recordId = activeRequest?.recordId ?? String(dp52.id ?? dp52.record_id ?? "");
		if (!recordId) return;

		const result = Number(dp52.result ?? 0);
		if (result !== 1) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", 52, `Q10 clean record detail ${recordId} select failed with result=${result}.`, "warn");
			await this.finishQ10CleanRecordMapRequest(recordId, false);
			return;
		}

		const payload = this.decodeQ10RecordMapPayload(dp52.data ?? dp52.payload ?? dp52);
		if (payload?.length) {
			await this.applyQ10CleanRecordBlob(payload);
			return;
		}

		if (activeRequest && activeRequest.recordId === recordId && activeRequest.acknowledged) {
			return;
		}

		if (activeRequest && activeRequest.recordId === recordId) {
			activeRequest.acknowledged = true;
		}
	}

	public async applyQ10CleanRecordList(dp52: Record<string, unknown>): Promise<void> {
		const op = dp52.op;
		const result = dp52.result;
		if (op === "select") {
			await this.applyQ10CleanRecordDetail(dp52);
			return;
		}
		if (op !== "list" || result !== 1 || !Array.isArray(dp52.data)) return;

		try {
			const records = dp52.data
				.filter((entry): entry is string => typeof entry === "string" && entry.includes("_"))
				.map((entry) => {
					const parts = entry.split("_");
					if (parts.length < 12) return null;

					const timestamp = Number(parts[1] ?? 0);
					const date = new Date(timestamp * 1000);
					const begin = `${this.formatQ10Time(date.getMonth() + 1)}/${this.formatQ10Time(date.getDate())} ${this.formatQ10Time(date.getHours())}:${this.formatQ10Time(date.getMinutes())}`;

					return {
						raw: entry,
						record_id: parts[0] ?? "",
						timestamp,
						begin,
						clean_time: Number(parts[2] ?? 0),
						clean_area: Number(parts[3] ?? 0),
						map_len: Number(parts[4] ?? 0),
						path_len: Number(parts[5] ?? 0),
						virtual_len: Number(parts[6] ?? 0),
						clean_mode: Number(parts[7] ?? 0),
						work_mode: Number(parts[8] ?? 0),
						cleaning_result: Number(parts[9] ?? 0),
						start_method: Number(parts[10] ?? 0),
						dust_collection_count: Number(parts[11] ?? 0)
					};
				})
				.filter((entry): entry is NonNullable<typeof entry> => entry !== null)
				.sort((left, right) => right.timestamp - left.timestamp);
			this.q10RecordIndexById.clear();
			this.q10RecordSelectTokenById.clear();

			await this.stateWriter.ensureFolder("cleaningInfo");
			await this.stateWriter.ensureFolder("cleaningInfo.records");
			await this.stateWriter.ensureAndSetValueState(`cleaningInfo.record_count`, {
				name: "Record Count",
				type: "number"
			}, records.length);

			for (let index = 0; index < records.length; index++) {
				const record = records[index];
				const folder = `cleaningInfo.records.${index}`;
				this.q10RecordIndexById.set(record.record_id, index);
				this.q10RecordSelectTokenById.set(record.record_id, record.raw);
				await this.stateWriter.ensureFolder(folder, record.begin);
				for (const [key, value] of Object.entries(record)) {
					await this.stateWriter.ensureAndSetValueState(`${folder}.${key}`, {
						name: key,
						type: typeof value === "number" ? "number" : "string",
						role: typeof value === "number" ? "value" : "text"
					}, value);
				}
			}

			await this.requestMissingQ10CleanRecordMaps(records);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10CleanRecordList: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}
}
