import { DeviceModelConfig, FeatureDependencies } from "../../baseDeviceFeatures";
import { B01BaseVacuumFeatures } from "./B01BaseVacuumFeatures";

export class Q10VacuumFeatures extends B01BaseVacuumFeatures {
	private q10RecordIndexById = new Map<string, number>();
	private q10RecordSelectTokenById = new Map<string, string>();
	private q10PendingRecordMapRequests = new Set<string>();
	private q10QueuedRecordMapRequests: string[] = [];
	private q10ActiveRecordMapRequest: { recordId: string; index: number } | null = null;
	private q10RecordMapRequestTimeout: ioBroker.Timeout | undefined;
	private q10SkipNextTimerRefreshFromDp93 = false;
	private q10AwaitingTimerListResult = false;
	private static readonly Q10_RECORD_MAP_TIMEOUT_MS = 15000;
	private readonly q10LegacyCommandIds = [
		"app_segment_clean",
		"carpet_turbo",
		"child_lock",
		"find_me",
		"green_laser",
		"light_mode",
		"mode",
		"repeat_state"
	] as const;

	private async cleanupQ10CommandObjects(): Promise<void> {
		const base = `Devices.${this.duid}`;
		await this.deleteObjectIfExists(`${base}.commands.prop`, true);
		await this.deleteObjectIfExists(`${base}.resetConsumables`, true);
		for (const commandId of this.q10LegacyCommandIds) {
			await this.deleteObjectIfExists(`${base}.commands.${commandId}`);
		}
	}

	private async cleanupQ10LegacyStates(): Promise<void> {
		await this.deleteObjectIfExists(`Devices.${this.duid}.deviceStatus.language`);
	}

	private async ensureQ10Folders(): Promise<void> {
		await Promise.all([
			this.deps.ensureFolder(`Devices.${this.duid}.consumables`),
			this.deps.ensureFolder(`Devices.${this.duid}.schedules`),
			this.deps.ensureFolder(`Devices.${this.duid}.floors`),
			this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo`),
			this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records`)
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

	private async requestQ10MapMetadataList(): Promise<void> {
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "64": { op: "list" } } });
	}

	private async requestQ10TimerList(): Promise<void> {
		this.q10AwaitingTimerListResult = true;
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "69": 0 } });
	}

	private async requestQ10LiveMap(): Promise<void> {
		await this.mapService.updateMap(async () => {
			await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "110": 1 } });
		});
	}

	private async initializeQ10DeviceData(): Promise<void> {
		await this.cleanupQ10LegacyStates();
		await this.ensureQ10Folders();

		// The first startup 102 snapshot usually contains timer_type (DP 93).
		// We already request the timer list explicitly during init, so the next DP 93
		// must not immediately trigger the same 69 request a second time.
		this.q10SkipNextTimerRefreshFromDp93 = true;

		await this.requestQ10StatusSnapshot();
		await this.requestQ10MultiMapList();
		await this.requestQ10CleanRecordList();
		await this.requestQ10MapMetadataList();
		await this.requestQ10LiveMap();
		await this.requestQ10TimerList();

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
	}

	public override async setupProtocolFeatures(): Promise<void> {
		this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, "Configuring B01 Command Set...", "debug");
		this.commands = {};
		this.addQ10SourceVerifiedCommands();
		const cmds = Object.keys(this.commands);
		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Q10 source-verified commands in memory: ${cmds.join(", ")}`, "info");
	}

	public override async createCommandObjects(): Promise<void> {
		await this.cleanupQ10CommandObjects();
		await super.createCommandObjects();
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
			await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo`);

			if (resultObj.clean_time !== undefined) {
				const raw = Number(resultObj.clean_time);
				const val = Number((raw / 3600).toFixed(2));
				await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.clean_time`, {
					name: "clean_time",
					type: "number",
					role: "value",
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.clean_time`, { val, ack: true });
			}

			if (resultObj.clean_area !== undefined) {
				const raw = Number(resultObj.clean_area);
				const val = Number((raw / 1000000).toFixed(2));
				await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.clean_area`, {
					name: "clean_area",
					type: "number",
					role: "value",
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.clean_area`, { val, ack: true });
			}
		}
	}

	public async applyQ10StatusFromDpResult(dpResult: Record<string, unknown>): Promise<void> {
		const resultObj: Record<string, unknown> = { ...dpResult };
		if (resultObj.state !== undefined) resultObj.status = resultObj.state;
		if (resultObj.fan_power !== undefined) resultObj.wind = resultObj.fan_power;
		if (resultObj.water_box_mode !== undefined) resultObj.water = resultObj.water_box_mode;

		try {
			await this.applyQ10StatusSnapshot(resultObj);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10StatusFromDpResult: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10NetworkFromDp81(net81: Record<string, unknown>): Promise<void> {
		if (!net81 || typeof net81 !== "object") return;

		try {
			await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
			const keys: Array<{ key: string; stateKey: string }> = [
				{ key: "ipAdress", stateKey: "ipAdress" },
				{ key: "mac", stateKey: "mac" },
				{ key: "signal", stateKey: "rssi" },
				{ key: "wifiName", stateKey: "ssid" }
			];

			for (const { key, stateKey } of keys) {
				if (net81[key] === undefined) continue;
				await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${stateKey}`, {
					name: stateKey,
					type: typeof net81[key] === "number" ? "number" : "string",
					role: "value",
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.networkInfo.${stateKey}`, { val: net81[key] as ioBroker.StateValue, ack: true });
			}
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10NetworkFromDp81: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10MapInfoFromDpResult(resultItem: Record<string, unknown>): Promise<void> {
		const mapInfoList = resultItem.map_info;
		if (!Array.isArray(mapInfoList) || mapInfoList.length === 0) return;

		try {
			const floorsFolder = `Devices.${this.duid}.floors`;
			await this.deps.ensureFolder(floorsFolder);

			for (const key of ["max_multi_map", "max_bak_map", "multi_map_count"]) {
				if (resultItem[key] === undefined) continue;
				await this.deps.ensureState(`${floorsFolder}.${key}`, {
					name: key,
					type: "number",
					role: "value",
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChanged(`${floorsFolder}.${key}`, { val: Number(resultItem[key]), ack: true });
			}

			for (const map of mapInfoList) {
				const m = map as Record<string, unknown>;
				const mapFlag = m.mapFlag ?? m.mapflag;
				if (mapFlag === undefined) continue;

				const mapId = typeof mapFlag === "number" ? mapFlag : Number(mapFlag);
				const name = (m.name as string) || `Map ${mapId}`;
				const folder = `Devices.${this.duid}.floors.${mapId}`;

				await this.cleanupQ10FloorMetadata(folder);
				await this.deps.ensureFolder(folder, name);
				await this.deps.ensureState(`${folder}.name`, { name: "Floor Name", type: "string", role: "value", read: true, write: false });
				await this.deps.adapter.setStateChanged(`${folder}.name`, { val: name, ack: true });

				const addTime = m.add_time;
				if (typeof addTime === "number" && Number.isFinite(addTime)) {
					await this.deps.ensureState(`${folder}.add_time`, {
						name: "Created At",
						type: "string",
						role: "value",
						read: true,
						write: false
					});
					await this.deps.adapter.setStateChanged(`${folder}.add_time`, {
						val: this.deps.adapter.formatRoborockDate(addTime),
						ack: true
					});
				}

				const rooms = m.rooms;
				if (!Array.isArray(rooms)) continue;

				for (const room of rooms) {
					const r = room as Record<string, unknown>;
					const roomId = r.id;
					if (roomId === undefined) continue;

					const rid = typeof roomId === "number" ? roomId : Number(roomId);
					const roomName = (r.iot_name as string) || (r.name as string) || `Room ${rid}`;
					await this.deps.ensureState(`${folder}.${rid}`, {
						name: roomName,
						type: "boolean",
						role: "value",
						def: false,
						read: true,
						write: true
					});
				}
			}
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10MapInfoFromDpResult: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10ConsumablesFromDpResult(dpResult: Record<string, unknown>): Promise<void> {
		try {
			await this.updateConsumables(dpResult);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10ConsumablesFromDpResult: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10TimersFromDpResult(dpResult: unknown): Promise<void> {
		if (!Array.isArray(dpResult)) return;

		try {
			this.q10AwaitingTimerListResult = false;
			await this.deps.ensureFolder(`Devices.${this.duid}.schedules`);
			for (const timer of dpResult) {
				if (!Array.isArray(timer) || timer.length < 3) continue;

				const [id, enabledValue, segments] = timer;
				const cron = Array.isArray(segments) ? segments[0] : "";
				const folder = `Devices.${this.duid}.schedules.${id}`;

				await this.deps.ensureFolder(folder);
				await this.deps.ensureState(`${folder}.enabled`, {
					name: "Enabled",
					type: "boolean",
					role: "switch",
					read: true,
					write: true
				});
				await this.deps.adapter.setStateChanged(`${folder}.enabled`, { val: enabledValue === "on", ack: true });

				await this.deps.ensureState(`${folder}.cron`, {
					name: "CRON",
					type: "string",
					role: "text",
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChanged(`${folder}.cron`, { val: String(cron ?? ""), ack: true });
			}
		} catch (e: unknown) {
			this.q10AwaitingTimerListResult = false;
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10TimersFromDpResult: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	private normalizeQ10BooleanNumberFlags(statusData: Record<string, unknown>): void {
		for (const key of ["map_save_switch", "recent_clean_record", "valley_point_charging"] as const) {
			if (typeof statusData[key] === "boolean") {
				statusData[key] = statusData[key] ? 1 : 0;
			}
		}
	}

	private decodeQ10ShadowBytes(value: unknown): Uint8Array | null {
		if (typeof value !== "string" || value.length === 0) return null;

		try {
			return new Uint8Array(Buffer.from(value, "base64"));
		} catch {
			return null;
		}
	}

	private async ensureAndSetQ10ValueState(
		stateId: string,
		common: Partial<ioBroker.StateCommon>,
		value: ioBroker.StateValue
	): Promise<void> {
		await this.deps.ensureState(stateId, {
			role: "value",
			read: true,
			write: false,
			...common
		});
		await this.deps.adapter.setStateChanged(stateId, { val: value, ack: true });
	}

	private q10WeekDataToWeekArray(weekData: number): number[] {
		const weeks: number[] = [];
		if (((weekData >> 6) & 1) === 1) {
			weeks.push(0);
		}
		for (let day = 1; day < 7; day++) {
			if (((weekData >> (day - 1)) & 1) === 1) {
				weeks.push(day);
			}
		}
		return weeks;
	}

	private formatQ10Time(value: number): string {
		return value.toString().padStart(2, "0");
	}

	private async resolveQ10FloorName(mapId: number): Promise<string> {
		const floorState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.floors.${mapId}.name`);
		return typeof floorState?.val === "string" && floorState.val.trim() ? floorState.val : `Map ${mapId}`;
	}

	public async applyQ10LocalTimerBlob(dpTimer: unknown): Promise<void> {
		const bytes = this.decodeQ10ShadowBytes(dpTimer);
		if (!bytes || bytes.length < 4) return;

		try {
			await this.deps.ensureFolder(`Devices.${this.duid}.schedules`);

			const timerCount = bytes[3] ?? 0;
			let offset = 4;

			for (let index = 0; index < timerCount; index++) {
				if (offset + 14 > bytes.length) break;

				const lock = bytes[offset] ?? 0;
				offset += 1;
				const autoAreaId = Buffer.from(bytes.slice(offset, offset + 4)).readUInt32BE(0);
				offset += 4;
				const effective = bytes[offset] ?? 0;
				offset += 1;
				const weekData = bytes[offset] ?? 0;
				offset += 1;
				const hour = bytes[offset] ?? 0;
				offset += 1;
				const minute = bytes[offset] ?? 0;
				offset += 1;
				const mapId = Buffer.from(bytes.slice(offset, offset + 4)).readUInt32BE(0);
				offset += 4;
				const roomCount = bytes[offset] ?? 0;
				offset += 1;

				const rooms: number[] = [];
				for (let roomIndex = 0; roomIndex < roomCount; roomIndex++) {
					if (offset >= bytes.length) break;
					rooms.push(bytes[offset] ?? 0);
					offset += 1;
				}

				if (offset + 5 > bytes.length) break;
				const cleanMode = bytes[offset] ?? 0;
				offset += 1;
				const fanPower = bytes[offset] ?? 0;
				offset += 1;
				const waterBoxMode = bytes[offset] ?? 0;
				offset += 1;
				const cleanCount = bytes[offset] ?? 0;
				offset += 1;
				const cleanLine = bytes[offset] ?? 0;
				offset += 1;

				const folder = `Devices.${this.duid}.schedules.local_${(index + 1).toString().padStart(2, "0")}`;
				const timeText = `${this.formatQ10Time(hour)}:${this.formatQ10Time(minute)}`;
				const weeks = this.q10WeekDataToWeekArray(weekData);
				const mapName = mapId > 0 ? await this.resolveQ10FloorName(mapId) : "";

				await this.deps.ensureFolder(folder, timeText);
				await this.ensureAndSetQ10ValueState(`${folder}.enabled`, {
					name: "Enabled",
					type: "boolean",
					role: "switch"
				}, effective === 1);
				await this.ensureAndSetQ10ValueState(`${folder}.locked`, {
					name: "Locked",
					type: "boolean"
				}, lock === 1);
				await this.ensureAndSetQ10ValueState(`${folder}.time`, {
					name: "Start Time",
					type: "string",
					role: "text"
				}, timeText);
				await this.ensureAndSetQ10ValueState(`${folder}.hour`, {
					name: "Hour",
					type: "number"
				}, hour);
				await this.ensureAndSetQ10ValueState(`${folder}.minute`, {
					name: "Minute",
					type: "number"
				}, minute);
				await this.ensureAndSetQ10ValueState(`${folder}.weeks`, {
					name: "Repeat Days",
					type: "string",
					role: "json"
				}, JSON.stringify(weeks));
				await this.ensureAndSetQ10ValueState(`${folder}.auto_area_id`, {
					name: "Auto Area ID",
					type: "number"
				}, autoAreaId);
				await this.ensureAndSetQ10ValueState(`${folder}.clean_mode`, {
					name: "Clean Mode",
					type: "number"
				}, cleanMode);
				await this.ensureAndSetQ10ValueState(`${folder}.fan_power`, {
					name: "Fan Power",
					type: "number"
				}, fanPower);
				await this.ensureAndSetQ10ValueState(`${folder}.water_box_mode`, {
					name: "Water Level",
					type: "number"
				}, waterBoxMode);
				await this.ensureAndSetQ10ValueState(`${folder}.clean_count`, {
					name: "Clean Count",
					type: "number"
				}, cleanCount);
				await this.ensureAndSetQ10ValueState(`${folder}.clean_line`, {
					name: "Clean Line",
					type: "number"
				}, cleanLine);
				await this.ensureAndSetQ10ValueState(`${folder}.room_count`, {
					name: "Room Count",
					type: "number"
				}, roomCount);
				await this.ensureAndSetQ10ValueState(`${folder}.rooms`, {
					name: "Rooms",
					type: "string",
					role: "json"
				}, JSON.stringify(rooms));
				await this.ensureAndSetQ10ValueState(`${folder}.map_id`, {
					name: "Map ID",
					type: "number"
				}, mapId);
				await this.ensureAndSetQ10ValueState(`${folder}.map_name`, {
					name: "Map Name",
					type: "string",
					role: "text"
				}, mapName);
			}
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10LocalTimerBlob: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10NotDisturbData(dpValue: unknown): Promise<void> {
		const bytes = this.decodeQ10ShadowBytes(dpValue);
		if (!bytes || bytes.length < 6) return;

		try {
			await this.processStatusProperty("not_disturb_start_hour", bytes[1] ?? 0);
			await this.processStatusProperty("not_disturb_start_minute", bytes[2] ?? 0);
			await this.processStatusProperty("not_disturb_end_hour", bytes[3] ?? 0);
			await this.processStatusProperty("not_disturb_end_minute", bytes[4] ?? 0);
			await this.processStatusProperty(
				"not_disturb_time",
				`${this.formatQ10Time(bytes[1] ?? 0)}:${this.formatQ10Time(bytes[2] ?? 0)}-${this.formatQ10Time(bytes[3] ?? 0)}:${this.formatQ10Time(bytes[4] ?? 0)}`
			);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10NotDisturbData: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10ValleyPointChargingData(dpValue: unknown): Promise<void> {
		const bytes = this.decodeQ10ShadowBytes(dpValue);
		if (!bytes || bytes.length < 6) return;

		try {
			await this.processStatusProperty("valley_point_charging_start_hour", bytes[1] ?? 0);
			await this.processStatusProperty("valley_point_charging_start_minute", bytes[2] ?? 0);
			await this.processStatusProperty("valley_point_charging_end_hour", bytes[3] ?? 0);
			await this.processStatusProperty("valley_point_charging_end_minute", bytes[4] ?? 0);
			await this.processStatusProperty(
				"valley_point_charging_time",
				`${this.formatQ10Time(bytes[1] ?? 0)}:${this.formatQ10Time(bytes[2] ?? 0)}-${this.formatQ10Time(bytes[3] ?? 0)}:${this.formatQ10Time(bytes[4] ?? 0)}`
			);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10ValleyPointChargingData: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
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
		const folder = `Devices.${this.duid}.cleaningInfo.records.${index}`;
		const mapFolder = `${folder}.map`;
		await this.deps.ensureFolder(folder);
		await this.deps.ensureFolder(mapFolder);
		await this.deleteObjectIfExists(`${folder}.mapBase64`);
		await this.deleteObjectIfExists(`${folder}.mapBase64Clean`);
		await this.deleteObjectIfExists(`${folder}.mapData`);
		await this.deleteObjectIfExists(`${mapFolder}.mapBase64Clean`);
		await this.deps.ensureState(`${mapFolder}.mapBase64`, {
			name: "Map Base64",
			type: "string",
			role: "text.png",
			read: true,
			write: false
		});
		await this.deps.adapter.setStateChanged(`${mapFolder}.mapBase64`, { val: mapRes.mapBase64, ack: true });

		if (mapRes.mapData) {
			await this.deps.ensureState(`${mapFolder}.mapData`, {
				name: "Map Data",
				type: "string",
				role: "json",
				read: true,
				write: false
			});
			await this.deps.adapter.setStateChanged(`${mapFolder}.mapData`, {
				val: JSON.stringify(mapRes.mapData),
				ack: true
			});
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

			this.q10ActiveRecordMapRequest = { recordId, index };
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
			}, Q10VacuumFeatures.Q10_RECORD_MAP_TIMEOUT_MS);

			try {
				await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, {
					"101": {
						"52": {
							op: "select",
							id: selectToken
						}
					}
				});
				this.deps.adapter.rLog(
					"System",
					this.duid,
					"Debug",
					"B01",
					52,
					`Q10 requested clean record detail ${recordId} for records.${index}.`,
					"debug"
				);
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
		for (const record of records) {
			const shouldHaveMap = record.map_len > 0 || record.path_len > 0 || record.virtual_len > 0;
			if (!shouldHaveMap || !record.record_id) continue;
			if (this.q10PendingRecordMapRequests.has(record.record_id)) continue;

			const index = this.q10RecordIndexById.get(record.record_id);
			if (index == null) continue;

			const existingMap =
				await this.deps.adapter.getStateAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.map.mapBase64`) ??
				await this.deps.adapter.getStateAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64`);
			if (typeof existingMap?.val === "string" && existingMap.val.startsWith("data:image/")) continue;

			this.q10PendingRecordMapRequests.add(record.record_id);
			if (!this.q10QueuedRecordMapRequests.includes(record.record_id)) {
				this.q10QueuedRecordMapRequests.push(record.record_id);
			}
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
			const serial = device?.sn || "";
			const mapRes = await this.deps.adapter.mapManager.processMap(
				blobPayload,
				"B01",
				model,
				serial,
				null,
				this.duid,
				"B01History"
			);
			if (!mapRes?.mapBase64) {
				throw new Error(`Q10 clean record blob ${recordId} did not produce a history map.`);
			}

			await this.ensureQ10RecordMapStates(index, mapRes);
			this.deps.adapter.rLog("MapManager", this.duid, "Debug", "B01", 52, `Q10 clean record map stored for record ${recordId} at index ${index}`, "debug");
			await this.finishQ10CleanRecordMapRequest(recordId, true);
			return true;
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10CleanRecordBlob(${recordId}): ${this.deps.adapter.errorMessage(e)}`, "warn");
			await this.finishQ10CleanRecordMapRequest(recordId, false);
			return false;
		}
	}

	private async applyQ10CleanRecordDetail(dp52: Record<string, unknown>): Promise<void> {
		const op = String(dp52.op ?? "");
		if (op !== "select") return;

		const recordId = this.q10ActiveRecordMapRequest?.recordId ?? String(dp52.id ?? dp52.record_id ?? "");
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

		this.deps.adapter.rLog(
			"System",
			this.duid,
			"Debug",
			"B01",
			52,
			`Q10 clean record detail ${recordId} acknowledged; waiting for blob type 3.`,
			"debug"
		);
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

			await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo`);
			await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records`);
			await this.ensureAndSetQ10ValueState(`Devices.${this.duid}.cleaningInfo.record_count`, {
				name: "Record Count",
				type: "number"
			}, records.length);

			for (let index = 0; index < records.length; index++) {
				const record = records[index];
				const folder = `Devices.${this.duid}.cleaningInfo.records.${index}`;
				this.q10RecordIndexById.set(record.record_id, index);
				this.q10RecordSelectTokenById.set(record.record_id, record.raw);
				await this.deps.ensureFolder(folder, record.begin);
				for (const [key, value] of Object.entries(record)) {
					await this.ensureAndSetQ10ValueState(`${folder}.${key}`, {
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

	private async applyQ10ShadowConsumables(
		topLevelDps: Record<string, unknown>,
		commonDps: Record<string, unknown>
	): Promise<void> {
		const consumables: Record<string, unknown> = {};

		if (topLevelDps["125"] !== undefined) consumables.main_brush_work_time = topLevelDps["125"];
		if (topLevelDps["126"] !== undefined) consumables.side_brush_work_time = topLevelDps["126"];
		if (topLevelDps["127"] !== undefined) consumables.filter_work_time = topLevelDps["127"];
		if (commonDps["67"] !== undefined) consumables.sensor_dirty_time = commonDps["67"];

		if (Object.keys(consumables).length > 0) {
			await this.updateConsumables(consumables);
		}
	}

	public async applyQ10MultiMapListFromDp61(dp61: Record<string, unknown>): Promise<void> {
		const mapList = Array.isArray(dp61.data) ? dp61.data : [];
		if (mapList.length === 0) return;

		try {
			await this.deps.ensureFolder(`Devices.${this.duid}.floors`);
			for (const entry of mapList) {
				if (!entry || typeof entry !== "object") continue;
				const map = entry as Record<string, unknown>;
				const mapId = map.id;
				if (mapId === undefined || mapId === null || mapId === "") continue;

				const mapIdText = String(mapId);
				const name = typeof map.name === "string" && map.name.trim() ? map.name : `Map ${mapIdText}`;
				const folder = `Devices.${this.duid}.floors.${mapIdText}`;

				await this.cleanupQ10FloorMetadata(folder);
				await this.deps.ensureFolder(folder, name);
				await this.deps.ensureState(`${folder}.name`, {
					name: "Floor Name",
					type: "string",
					role: "value",
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChanged(`${folder}.name`, { val: name, ack: true });

				const timestamp = map.timestamp;
				if (typeof timestamp === "number" && Number.isFinite(timestamp)) {
					await this.deps.ensureState(`${folder}.add_time`, {
						name: "Created At",
						type: "string",
						role: "value",
						read: true,
						write: false
					});
					await this.deps.adapter.setStateChanged(`${folder}.add_time`, {
						val: this.deps.adapter.formatRoborockDate(timestamp),
						ack: true
					});
				}
			}
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10MultiMapListFromDp61: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10ShadowDpPayload(dps: Record<string, unknown>): Promise<void> {
		if (!dps || typeof dps !== "object") return;

		const statusData: Record<string, unknown> = {};
		const topLevelMap: Record<string, string> = {
			"121": "status",
			"122": "battery",
			"123": "fan_power",
			"124": "water_box_mode",
			"125": "main_brush_life",
			"126": "side_brush_life",
			"127": "filter_life",
			"136": "clean_times",
			"137": "clean_mode",
			"138": "clean_task_type",
			"139": "back_type",
			"141": "cleaning_progress",
			"142": "fleeing_goods"
		};

		for (const [dpId, field] of Object.entries(topLevelMap)) {
			if (dps[dpId] !== undefined) {
				statusData[field] = dps[dpId];
			}
		}

		let net81: Record<string, unknown> | undefined;
		const common = dps["101"];
		if (common && typeof common === "object" && !Array.isArray(common)) {
			const commonMap: Record<string, string> = {
				"6": "clean_time",
				"7": "clean_area",
				"25": "quiet_is_open",
				"26": "volume",
				"36": "voice_language",
				"37": "dust_switch",
				"40": "mop_state",
				"45": "auto_boost",
				"47": "child_lock",
				"50": "dust_setting",
				"51": "map_save_switch",
				"53": "recent_clean_record",
				"29": "total_clean_area",
				"30": "total_clean_count",
				"31": "total_clean_time",
				"60": "multi_map_switch",
				"76": "carpet_clean_type",
				"78": "clean_path_preference",
				"83": "robot_type",
				"86": "line_laser_obstacle_avoidance",
				"87": "cleaning_progress",
				"88": "ground_clean",
				"90": "fault",
				"93": "timer_type",
				"96": "add_clean_state",
				"104": "breakpoint_clean",
				"105": "valley_point_charging",
				"108": "voice_version",
				"109": "robot_country_code",
				"207": "user_plan"
			};

			const commonDps = common as Record<string, unknown>;
			for (const [dpId, field] of Object.entries(commonMap)) {
				if (commonDps[dpId] !== undefined) {
					statusData[field] = commonDps[dpId];
				}
			}

			if (commonDps["79"] && typeof commonDps["79"] === "object" && !Array.isArray(commonDps["79"])) {
				const timeZone = commonDps["79"] as Record<string, unknown>;
				if (timeZone.timeZoneSec !== undefined) statusData.time_zone = timeZone.timeZoneSec;
				if (timeZone.timeZoneCity !== undefined) statusData.time_zone_info = timeZone.timeZoneCity;
			}

			if (commonDps["92"] && typeof commonDps["92"] === "object" && !Array.isArray(commonDps["92"])) {
				const disturb = commonDps["92"] as Record<string, unknown>;
				if (disturb.disturb_light !== undefined) statusData.disturb_light = disturb.disturb_light;
				if (disturb.disturb_voice !== undefined) statusData.disturb_voice = disturb.disturb_voice;
				if (disturb.disturb_resume_clean !== undefined) statusData.disturb_resume_clean = disturb.disturb_resume_clean;
				if (disturb.disturb_dust_enable !== undefined) statusData.disturb_dust_enable = disturb.disturb_dust_enable;
			}

			const multiMapList = commonDps["61"];
			if (multiMapList && typeof multiMapList === "object" && !Array.isArray(multiMapList)) {
				await this.applyQ10MultiMapListFromDp61(multiMapList as Record<string, unknown>);
			}

			const cleanRecords = commonDps["52"];
			if (cleanRecords && typeof cleanRecords === "object" && !Array.isArray(cleanRecords)) {
				await this.applyQ10CleanRecordList(cleanRecords as Record<string, unknown>);
			}

			if (commonDps["32"] !== undefined) {
				await this.applyQ10LocalTimerBlob(commonDps["32"]);
			}

			if (commonDps["33"] !== undefined) {
				await this.applyQ10NotDisturbData(commonDps["33"]);
			}

			if (commonDps["106"] !== undefined) {
				await this.applyQ10ValleyPointChargingData(commonDps["106"]);
			}

			if (commonDps["93"] !== undefined) {
				const currentTimerTypeState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.timer_type`);
				const nextTimerType = Number(commonDps["93"]);
				const currentTimerType = currentTimerTypeState && currentTimerTypeState.val !== null && currentTimerTypeState.val !== undefined
					? Number(currentTimerTypeState.val)
					: Number.NaN;
				if (this.q10SkipNextTimerRefreshFromDp93) {
					this.q10SkipNextTimerRefreshFromDp93 = false;
				} else if (this.q10AwaitingTimerListResult) {
					// A list refresh is already in flight, so a repeated DP 93 echo must not trigger another 69 request.
				} else if (!Number.isFinite(currentTimerType) || currentTimerType !== nextTimerType) {
					await this.updateTimers();
				}
			}

			const candidateNet81 = commonDps["81"];
			if (candidateNet81 && typeof candidateNet81 === "object" && !Array.isArray(candidateNet81)) {
				net81 = candidateNet81 as Record<string, unknown>;
			}

			await this.applyQ10ShadowConsumables(dps, commonDps);
		}

		if (Object.keys(statusData).length > 0) {
			if (statusData.status !== undefined) statusData.state = statusData.status;
			if (statusData.fan_power !== undefined) statusData.wind = statusData.fan_power;
			if (statusData.water_box_mode !== undefined) statusData.water = statusData.water_box_mode;
			this.normalizeQ10BooleanNumberFlags(statusData);
			await this.applyQ10StatusSnapshot(statusData);
		}

		if (net81) {
			await this.applyQ10NetworkFromDp81(net81);
		}
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
}
