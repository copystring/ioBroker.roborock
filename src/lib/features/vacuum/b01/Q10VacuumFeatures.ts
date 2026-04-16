import { DeviceModelConfig, FeatureDependencies } from "../../baseDeviceFeatures";
import { B01BaseVacuumFeatures } from "./B01BaseVacuumFeatures";
import { Q10CleanRecordService } from "./q10/Q10CleanRecordService";
import { Q10ShadowDataService } from "./q10/Q10ShadowDataService";

type Q10ZoneTuple = [number, number, number, number, number?];
type Q10AreaPoint = { x: number; y: number };
type Q10ZoneArea = { points: Q10AreaPoint[]; name: string };
type Q10ZoneCleanParams = { repeatCount: number; areas: Q10ZoneArea[] };

export class Q10VacuumFeatures extends B01BaseVacuumFeatures {
	private readonly q10CleanRecordService: Q10CleanRecordService;
	private readonly q10ShadowDataService: Q10ShadowDataService;
	private readonly q10LegacyCommandIds = [
		"carpet_turbo",
		"child_lock",
		"find_me",
		"green_laser",
		"light_mode",
		"mode",
		"repeat_state",
		"resume_segment_clean",
		"resume_zoned_clean",
		"stop_segment_clean",
		"stop_zoned_clean"
	] as const;

	private isFiniteNumber(value: unknown): value is number {
		return typeof value === "number" && Number.isFinite(value);
	}

	private normalizeRoomIds(input: unknown): number[] | null {
		const rawIds = Array.isArray(input)
			? input
			: (typeof input === "object" && input !== null && Array.isArray((input as { segments?: unknown }).segments))
				? (input as { segments: unknown[] }).segments
				: null;

		if (!rawIds) return null;

		const normalized = rawIds
			.map((value) => Number(value))
			.filter((value, index, values) => Number.isInteger(value) && value >= 0 && values.indexOf(value) === index);

		return normalized.length > 0 ? normalized : null;
	}

	private async collectSelectedRoomIds(): Promise<number[]> {
		const currentMapIdState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.current_map_id`);
		const currentMapId = typeof currentMapIdState?.val === "number" && currentMapIdState.val > 0
			? currentMapIdState.val
			: null;
		const namespace = this.deps.adapter.namespace;
		const pattern = currentMapId != null
			? `${namespace}.Devices.${this.duid}.floors.${currentMapId}.*`
			: `${namespace}.Devices.${this.duid}.floors.*.*`;
		const selectedStates = await this.deps.adapter.getStatesAsync(pattern);
		const nonRoomKeys = new Set(["add_time", "load", "mapFlag", "map_id", "name"]);
		const roomIds = new Set<number>();

		if (selectedStates) {
			for (const [stateId, state] of Object.entries(selectedStates)) {
				if (!state || (state.val !== true && state.val !== "true" && state.val !== 1)) continue;

				const parts = stateId.split(".");
				const lastSegment = parts[parts.length - 1];
				if (!lastSegment || nonRoomKeys.has(lastSegment)) continue;

				const roomId = Number(lastSegment);
				if (Number.isInteger(roomId) && roomId >= 0) {
					roomIds.add(roomId);
				}
			}
		}

		return Array.from(roomIds).sort((left, right) => left - right);
	}

	private normalizeZoneAreas(input: unknown): Q10ZoneCleanParams | null {
		const rawZones = Array.isArray(input)
			? input
			: (typeof input === "object" && input !== null && Array.isArray((input as { zones?: unknown }).zones))
				? (input as { zones: unknown[] }).zones
				: null;

		if (!rawZones || rawZones.length === 0) return null;

		const areas: Q10ZoneArea[] = [];
		let repeatCount: number | null = null;

		for (const rawZone of rawZones) {
			if (Array.isArray(rawZone) && rawZone.length >= 4) {
				const [rawX1, rawY1, rawX2, rawY2, rawRepeat] = rawZone as Q10ZoneTuple;
				if (
					!this.isFiniteNumber(rawX1)
					|| !this.isFiniteNumber(rawY1)
					|| !this.isFiniteNumber(rawX2)
					|| !this.isFiniteNumber(rawY2)
				) {
					throw new Error(`Invalid Q10 zone tuple: ${JSON.stringify(rawZone)}`);
				}

				const zoneRepeat = Number.isInteger(rawRepeat) && rawRepeat! > 0 ? rawRepeat! : 1;
				if (repeatCount === null) {
					repeatCount = zoneRepeat;
				} else if (repeatCount !== zoneRepeat) {
					throw new Error("Q10 zone clean expects one shared repeat count for all areas");
				}

				const minX = Math.min(rawX1, rawX2);
				const minY = Math.min(rawY1, rawY2);
				const maxX = Math.max(rawX1, rawX2);
				const maxY = Math.max(rawY1, rawY2);

				areas.push({
					name: "",
					points: [
						{ x: minX, y: minY },
						{ x: maxX, y: minY },
						{ x: maxX, y: maxY },
						{ x: minX, y: maxY }
					]
				});
				continue;
			}

			if (typeof rawZone === "object" && rawZone !== null && Array.isArray((rawZone as { points?: unknown }).points)) {
				const zone = rawZone as { points: unknown[]; name?: unknown; cleanCount?: unknown; repeat?: unknown };
				const points = zone.points.map((point) => {
					if (typeof point !== "object" || point === null) {
						throw new Error(`Invalid Q10 zone point: ${JSON.stringify(point)}`);
					}

					const x = Number((point as { x?: unknown }).x);
					const y = Number((point as { y?: unknown }).y);
					if (!this.isFiniteNumber(x) || !this.isFiniteNumber(y)) {
						throw new Error(`Invalid Q10 zone point coordinates: ${JSON.stringify(point)}`);
					}
					return { x, y };
				});

				if (points.length < 3) {
					throw new Error(`Invalid Q10 zone polygon: ${JSON.stringify(rawZone)}`);
				}

				const zoneRepeat = Number(zone.cleanCount ?? zone.repeat ?? 1);
				if (!Number.isInteger(zoneRepeat) || zoneRepeat <= 0) {
					throw new Error(`Invalid Q10 zone repeat count: ${JSON.stringify(rawZone)}`);
				}
				if (repeatCount === null) {
					repeatCount = zoneRepeat;
				} else if (repeatCount !== zoneRepeat) {
					throw new Error("Q10 zone clean expects one shared repeat count for all areas");
				}

				areas.push({
					name: typeof zone.name === "string" ? zone.name : "",
					points
				});
				continue;
			}

			throw new Error(`Unsupported Q10 zone payload: ${JSON.stringify(rawZone)}`);
		}

		if (areas.length === 0 || repeatCount === null) return null;
		return { repeatCount, areas };
	}

	protected override async cleanupVariantCommandObjects(): Promise<void> {
		const base = `Devices.${this.duid}`;
		await this.deleteObjectIfExists(`${base}.commands.prop`, true);
		await this.deleteObjectIfExists(`${base}.resetConsumables`, true);
		for (const commandId of this.q10LegacyCommandIds) {
			await this.deleteObjectIfExists(`${base}.commands.${commandId}`);
		}
	}

	private async cleanupQ10LegacyStates(): Promise<void> {
		await this.deleteObjectIfExists(`Devices.${this.duid}.deviceStatus.language`);
		await this.deleteObjectIfExists(`Devices.${this.duid}.deviceStatus.state`);
	}

	protected override shouldPrecreateConsumableResetStates(): boolean {
		return false;
	}

	protected override getVariantCommonDeviceStates(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		const key = String(attribute);

		if ([
			"dust_switch",
			"mop_state",
			"auto_boost",
			"child_lock",
			"map_save_switch",
			"line_laser_obstacle_avoidance",
			"ground_clean",
			"valley_point_charging",
			"breakpoint_clean",
			"disturb_light",
			"disturb_voice",
			"disturb_resume_clean",
			"disturb_dust_enable",
			"recent_clean_record",
			"fleeing_goods"
		].includes(key)) {
			return {
				type: "number",
				name: this.locales.getNameAll(key),
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		if (key === "add_clean_state") {
			return {
				type: "number",
				name: this.locales.getNameAll(key),
				states: {
					0: "Idle",
					1: "Add Clean"
				}
			};
		}

		if (key === "timer_type") {
			return {
				type: "number",
				name: this.locales.getNameAll(key),
				states: {
					0: "Local",
					1: "Cloud"
				}
			};
		}

		if (key === "multi_map_switch") {
			return {
				type: "number",
				name: this.locales.getNameAll(key),
				states: {
					1: "Off",
					4: "On"
				}
			};
		}

		if (key === "voice_language" || key === "voice_version" || key === "robot_type") {
			return {
				type: "number",
				name: this.locales.getNameAll(key)
			};
		}

		if (key === "robot_country_code") {
			return {
				type: "string",
				name: this.locales.getNameAll(key)
			};
		}

		if (key === "cleaning_progress") {
			return {
				type: "number",
				name: this.locales.getNameAll(key),
				unit: "%"
			};
		}

		return undefined;
	}

	private async ensureQ10Folders(): Promise<void> {
		await Promise.all([
			this.stateWriter.ensureFolder("consumables"),
			this.stateWriter.ensureFolder("schedules"),
			this.stateWriter.ensureFolder("floors"),
			this.stateWriter.ensureFolder("cleaningInfo"),
			this.stateWriter.ensureFolder("cleaningInfo.records")
		]);
	}

	private async cleanupQ10FloorMetadata(folder: string): Promise<void> {
		await this.deleteObjectIfExists(`${folder}.mapFlag`);
		await this.deleteObjectIfExists(`${folder}.map_id`);
	}

	private async requestQ10StatusSnapshot(): Promise<void> {
		try {
			await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "102": 1 });
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `Q10 requestAllDps failed: ${this.deps.adapter.errorMessage(e)}`, "debug");
		}
	}

	private async requestQ10MultiMapList(): Promise<void> {
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "61": { op: "list" } } });
	}

	private async requestQ10CleanRecordList(): Promise<void> {
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "52": { op: "list" } } });
	}

	private async requestQ10CarpetList(): Promise<void> {
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "64": { op: "list" } } });
	}

	private async requestQ10TimerList(): Promise<void> {
		this.q10ShadowDataService.markTimerListRequestPending();
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "69": 0 } });
	}

	private async requestQ10NotDisturbData(): Promise<void> {
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "75": 0 } });
	}

	private async requestQ10ValleyPointChargingData(): Promise<void> {
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "107": 0 } });
	}

	private async requestQ10LiveMap(): Promise<void> {
		await this.mapService.updateMap(async () => {
			// Original app: requestMapAndPathData() => DP 16 with value 1.
			await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "16": 1 } });
		});
	}

	private async initializeQ10DeviceData(): Promise<void> {
		await this.cleanupQ10LegacyStates();
		await this.ensureQ10Folders();

		// The first startup 102 snapshot usually contains timer_type (DP 93).
		// We already request the timer list explicitly during init, so the next DP 93
		// must not immediately trigger the same 69 request a second time.
		this.q10ShadowDataService.skipNextTimerRefreshFromDp93();

		// Original app startup order (module_1131 ka()):
		// requestMapAndPathData(), loadShadowDps(), requestAllDps(),
		// requestMultiMapList(), requestCleanRecordList(), requestTimer(),
		// requsetNotDisturbData(), getCarpetList(), getValleyPointChargingData()
		await this.requestQ10LiveMap();
		await this.requestQ10StatusSnapshot();
		await this.requestQ10MultiMapList();
		await this.requestQ10CleanRecordList();
		await this.requestQ10TimerList();
		await this.requestQ10NotDisturbData();
		await this.requestQ10CarpetList();
		await this.requestQ10ValleyPointChargingData();

		await this.deps.adapter.checkForNewFirmware(this.duid);

		await Promise.all([
			this.updateFirmwareFeatures(),
			this.updateExtraStatus()
		]);
	}

	private addQ10SourceVerifiedCommands(): void {
		this.addCommand("app_start", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_start"] || "Start Cleaning",
			def: false
		});

		this.addCommand("app_stop", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_stop"] || "Stop",
			def: false
		});

		this.addCommand("app_pause", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_pause"] || "Pause Cleaning",
			def: false
		});

		this.addCommand("app_charge", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_charge"] || "Return to Dock",
			def: false
		});

		this.addCommand("app_segment_clean", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_segment_clean"] || "Segment Cleaning",
			def: false
		});

		this.addCommand("app_zoned_clean", {
			type: "json",
			role: "json",
			name: this.deps.adapter.translations["app_zoned_clean"] || "Zone Clean"
		});

		this.addCommand("wind", {
			type: "number",
			role: "value",
			name: this.locales.getNameAll("wind"),
			def: 2,
			states: {
				1: "Quiet",
				2: "Balanced",
				3: "Turbo",
				4: "Max",
				5: "Max+"
			}
		});

		this.addCommand("water", {
			type: "number",
			role: "value",
			name: this.locales.getNameAll("water"),
			def: 1,
			states: {
				1: "Low",
				2: "Medium",
				3: "High"
			}
		});

		this.addCommand("clean_path_preference", {
			type: "number",
			role: "value",
			name: this.locales.getNameAll("clean_path_preference"),
			def: 0,
			states: {
				0: "Standard",
				1: "Fast",
				2: "Deep"
			}
		});

		this.addCommand("update_map", {
			type: "boolean",
			role: "button",
			name: "Update Map",
			def: false
		});
	}

	constructor(
		dependencies: FeatureDependencies,
		duid: string,
		robotModel: string,
		config: DeviceModelConfig,
		profile?: unknown
	) {
		super(dependencies, duid, robotModel, config, profile, "Q10");
		this.q10CleanRecordService = new Q10CleanRecordService({
			deps: dependencies,
			duid,
			robotModel
		});
		this.q10ShadowDataService = new Q10ShadowDataService(
			dependencies,
			duid,
			{
				applyCleanRecordList: async (data) => this.q10CleanRecordService.applyQ10CleanRecordList(data),
				applyConsumables: async (data) => super.updateConsumables(data),
				applyStatusSnapshot: async (resultObj) => this.applyQ10StatusSnapshot(resultObj),
				cleanupFloorMetadata: async (folder) => this.cleanupQ10FloorMetadata(folder),
				processStatusProperty: async (property, value) => this.processStatusProperty(property, value),
				requestTimerRefresh: async () => this.updateTimers()
			}
		);
	}

	public override async setupProtocolFeatures(): Promise<void> {
		this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, "Configuring B01 Command Set...", "debug");
		this.commands = {};
		this.addQ10SourceVerifiedCommands();
		const cmds = Object.keys(this.commands);
		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Q10 commands in memory: ${cmds.join(", ")}`, "info");
	}

	public override async initializeDeviceData(): Promise<void> {
		await this.initializeQ10DeviceData();
	}

	public override async updateMultiMapsList(): Promise<void> {
		await this.requestQ10MultiMapList();
	}

	public override async updateRoomMapping(): Promise<void> {
		if (this.mappedRooms && this.mapService) {
			await this.mapService.updateRoomMapping(this.mappedRooms, { refreshFloors: false });
		}
	}

	private async applyQ10StatusSnapshot(resultObj: Record<string, unknown>): Promise<void> {
		if (!this.runtimeDetectionComplete) {
			await this.detectAndApplyRuntimeFeatures(resultObj);
		}

		await this.processStatus(resultObj);

		if (resultObj.clean_time !== undefined || resultObj.clean_area !== undefined) {
			await this.stateWriter.ensureFolder("cleaningInfo");

			if (resultObj.clean_time !== undefined) {
				const raw = Number(resultObj.clean_time);
				const val = Number((raw / 3600).toFixed(2));
				await this.stateWriter.ensureAndSetValueState(`cleaningInfo.clean_time`, {
					name: "clean_time",
					type: "number"
				}, val);
			}

			if (resultObj.clean_area !== undefined) {
				const raw = Number(resultObj.clean_area);
				const val = Number((raw / 1000000).toFixed(2));
				await this.stateWriter.ensureAndSetValueState(`cleaningInfo.clean_area`, {
					name: "clean_area",
					type: "number"
				}, val);
			}
		}
	}

	public async applyQ10StatusFromDpResult(dpResult: Record<string, unknown>): Promise<void> {
		await this.q10ShadowDataService.applyQ10StatusFromDpResult(dpResult);
	}

	public async applyQ10NetworkFromDp81(net81: Record<string, unknown>): Promise<void> {
		await this.q10ShadowDataService.applyQ10NetworkFromDp81(net81);
	}

	public async applyQ10MapInfoFromDpResult(resultItem: Record<string, unknown>): Promise<void> {
		await this.q10ShadowDataService.applyQ10MapInfoFromDpResult(resultItem);
	}

	public async applyQ10ConsumablesFromDpResult(dpResult: Record<string, unknown>): Promise<void> {
		await this.q10ShadowDataService.applyQ10ConsumablesFromDpResult(dpResult);
	}

	public async applyQ10TimersFromDpResult(dpResult: unknown): Promise<void> {
		await this.q10ShadowDataService.applyQ10TimersFromDpResult(dpResult);
	}

	public async applyQ10LocalTimerBlob(dpTimer: unknown): Promise<void> {
		await this.q10ShadowDataService.applyQ10LocalTimerBlob(dpTimer);
	}

	public async applyQ10NotDisturbData(dpValue: unknown): Promise<void> {
		await this.q10ShadowDataService.applyQ10NotDisturbData(dpValue);
	}

	public async applyQ10ValleyPointChargingData(dpValue: unknown): Promise<void> {
		await this.q10ShadowDataService.applyQ10ValleyPointChargingData(dpValue);
	}

	public hasPendingQ10CleanRecordBlobRequest(): boolean {
		return this.q10CleanRecordService.hasPendingQ10CleanRecordBlobRequest();
	}

	public async applyQ10CleanRecordBlob(blobPayload: Buffer): Promise<boolean> {
		return this.q10CleanRecordService.applyQ10CleanRecordBlob(blobPayload);
	}

	public async applyQ10CleanRecordList(dp52: Record<string, unknown>): Promise<void> {
		await this.q10CleanRecordService.applyQ10CleanRecordList(dp52);
	}

	public async applyQ10LiveMapPayload(payload: Buffer): Promise<void> {
		await this.mapService.applyLiveMapPayload(payload);
	}

	public async applyQ10MultiMapListFromDp61(dp61: Record<string, unknown>): Promise<void> {
		await this.q10ShadowDataService.applyQ10MultiMapListFromDp61(dp61);
	}

	public async applyQ10ShadowDpPayload(dps: Record<string, unknown>): Promise<void> {
		await this.q10ShadowDataService.applyQ10ShadowDpPayload(dps);
	}

	public override async updateStatus(): Promise<void> {
		await this.requestQ10StatusSnapshot();
	}

	public override async updateConsumables(data?: unknown): Promise<void> {
		if (data === undefined) {
			await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "102": 1 });
			return;
		}
		await super.updateConsumables(data);
	}

	public override async updateTimers(): Promise<void> {
		await this.requestQ10TimerList();
	}

	public override async updateMap(): Promise<void> {
		await this.requestQ10LiveMap();
	}

	public override async updateCleanSummary(): Promise<void> {
		await this.requestQ10CleanRecordList();
	}

	public override async updateNetworkInfo(): Promise<void> {
		return;
	}

	public override async getCommandParams(method: string, params?: unknown, id?: string): Promise<unknown> {
		void id;

		if (method === "app_segment_clean") {
			const explicitRoomIds = this.normalizeRoomIds(params);
			if (explicitRoomIds) {
				return explicitRoomIds;
			}

			const roomIds = await this.collectSelectedRoomIds();
			if (roomIds.length === 0) {
				throw new Error("No rooms selected for Q10 segment cleaning");
			}

			this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Starting Q10 room clean for rooms: ${roomIds.join(", ")}`, "info");
			return roomIds;
		}

		if (method === "app_zoned_clean") {
			const normalized = this.normalizeZoneAreas(params);
			if (!normalized) {
				throw new Error("No zones supplied for Q10 zone cleaning");
			}

			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Info",
				"B01",
				undefined,
				`Starting Q10 zone clean for ${normalized.areas.length} area(s) with repeat ${normalized.repeatCount}`,
				"info"
			);
			return normalized;
		}

		return super.getCommandParams(method, params, id);
	}
}
