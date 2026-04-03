import type { FeatureDependencies } from "../../../baseDeviceFeatures";
import { DeviceStateWriter } from "../../../deviceStateWriter";
import { normalizeRoborockRoomDisplayName } from "../../../../roomNameNormalizer";

type Q10ShadowDataServiceHost = {
	applyCleanRecordList: (data: Record<string, unknown>) => Promise<void>;
	applyConsumables: (data: Record<string, unknown>) => Promise<void>;
	applyStatusSnapshot: (resultObj: Record<string, unknown>) => Promise<void>;
	cleanupFloorMetadata: (folder: string) => Promise<void>;
	processStatusProperty: (property: string, value: ioBroker.StateValue) => Promise<void>;
	requestTimerRefresh: () => Promise<void>;
};

export class Q10ShadowDataService {
	private q10SkipNextTimerRefreshFromDp93 = false;
	private q10AwaitingTimerListResult = false;
	private readonly stateWriter: DeviceStateWriter;

	constructor(
		private readonly deps: FeatureDependencies,
		private readonly duid: string,
		private readonly host: Q10ShadowDataServiceHost
	) {
		this.stateWriter = new DeviceStateWriter(deps, duid);
	}

	public skipNextTimerRefreshFromDp93(): void {
		this.q10SkipNextTimerRefreshFromDp93 = true;
	}

	public markTimerListRequestPending(): void {
		this.q10AwaitingTimerListResult = true;
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

	private getDefaultRoomName(): string | undefined {
		return this.deps.adapter.translationManager?.get("default_room_name");
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
			await this.host.applyConsumables(consumables);
		}
	}

	public async applyQ10StatusFromDpResult(dpResult: Record<string, unknown>): Promise<void> {
		const resultObj: Record<string, unknown> = { ...dpResult };
		if (resultObj.state !== undefined) resultObj.status = resultObj.state;
		if (resultObj.fan_power !== undefined) resultObj.wind = resultObj.fan_power;
		if (resultObj.water_box_mode !== undefined) resultObj.water = resultObj.water_box_mode;

		try {
			await this.host.applyStatusSnapshot(resultObj);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10StatusFromDpResult: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10NetworkFromDp81(net81: Record<string, unknown>): Promise<void> {
		if (!net81 || typeof net81 !== "object") return;

		try {
			await this.stateWriter.ensureFolder("networkInfo");
			const keys: Array<{ key: string; stateKey: string }> = [
				{ key: "ipAdress", stateKey: "ipAdress" },
				{ key: "mac", stateKey: "mac" },
				{ key: "signal", stateKey: "rssi" },
				{ key: "wifiName", stateKey: "ssid" }
			];

			for (const { key, stateKey } of keys) {
				if (net81[key] === undefined) continue;
				await this.stateWriter.ensureAndSetValueState(`networkInfo.${stateKey}`, {
					name: stateKey,
					type: typeof net81[key] === "number" ? "number" : "string",
				}, net81[key] as ioBroker.StateValue);
			}
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10NetworkFromDp81: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10MapInfoFromDpResult(resultItem: Record<string, unknown>): Promise<void> {
		const mapInfoList = resultItem.map_info;
		if (!Array.isArray(mapInfoList) || mapInfoList.length === 0) return;

		try {
			const floorsFolder = "floors";
			await this.stateWriter.ensureFolder(floorsFolder);

			for (const key of ["max_multi_map", "max_bak_map", "multi_map_count"]) {
				if (resultItem[key] === undefined) continue;
				await this.stateWriter.ensureAndSetValueState(`${floorsFolder}.${key}`, {
					name: key,
					type: "number",
				}, Number(resultItem[key]));
			}

			for (const map of mapInfoList) {
				const m = map as Record<string, unknown>;
				const mapFlag = m.mapFlag ?? m.mapflag;
				if (mapFlag === undefined) continue;

				const mapId = typeof mapFlag === "number" ? mapFlag : Number(mapFlag);
				const name = (m.name as string) || `Map ${mapId}`;
				const folder = `floors.${mapId}`;

				await this.host.cleanupFloorMetadata(this.stateWriter.path(folder));
				await this.stateWriter.ensureFolder(folder, name);
				await this.stateWriter.ensureAndSetValueState(`${folder}.name`, { name: "Floor Name", type: "string" }, name);

				const addTime = m.add_time;
				if (typeof addTime === "number" && Number.isFinite(addTime)) {
					await this.stateWriter.ensureAndSetValueState(`${folder}.add_time`, {
						name: "Created At",
						type: "string",
					}, this.deps.adapter.formatRoborockDate(addTime));
				}

				const rooms = m.rooms;
				if (!Array.isArray(rooms)) continue;

				for (const room of rooms) {
					const r = room as Record<string, unknown>;
					const roomId = r.id;
					if (roomId === undefined) continue;

					const rid = typeof roomId === "number" ? roomId : Number(roomId);
					const rawRoomName =
						typeof r.iot_name === "string" && r.iot_name.trim()
							? r.iot_name
							: typeof r.name === "string"
								? r.name
								: "";
					const roomName = normalizeRoborockRoomDisplayName(rawRoomName, () => this.getDefaultRoomName());
					await this.stateWriter.ensureState(`${folder}.${rid}`, {
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
			await this.host.applyConsumables(dpResult);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10ConsumablesFromDpResult: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10TimersFromDpResult(dpResult: unknown): Promise<void> {
		if (!Array.isArray(dpResult)) return;

		try {
			this.q10AwaitingTimerListResult = false;
			await this.stateWriter.ensureFolder("schedules");
			for (const timer of dpResult) {
				if (!Array.isArray(timer) || timer.length < 3) continue;

				const [id, enabledValue, segments] = timer;
				const cron = Array.isArray(segments) ? segments[0] : "";
				const folder = `schedules.${id}`;

				await this.stateWriter.ensureFolder(folder);
				await this.stateWriter.ensureAndSetState(`${folder}.enabled`, {
					name: "Enabled",
					type: "boolean",
					role: "switch",
					read: true,
					write: true
				}, enabledValue === "on");

				await this.stateWriter.ensureAndSetValueState(`${folder}.cron`, {
					name: "CRON",
					type: "string",
					role: "text"
				}, String(cron ?? ""));
			}
		} catch (e: unknown) {
			this.q10AwaitingTimerListResult = false;
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10TimersFromDpResult: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10LocalTimerBlob(dpTimer: unknown): Promise<void> {
		const bytes = this.decodeQ10ShadowBytes(dpTimer);
		if (!bytes || bytes.length < 4) return;

		try {
			await this.stateWriter.ensureFolder("schedules");

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

				const folder = `schedules.local_${(index + 1).toString().padStart(2, "0")}`;
				const timeText = `${this.formatQ10Time(hour)}:${this.formatQ10Time(minute)}`;
				const weeks = this.q10WeekDataToWeekArray(weekData);
				const mapName = mapId > 0 ? await this.resolveQ10FloorName(mapId) : "";

				await this.stateWriter.ensureFolder(folder, timeText);
				await this.stateWriter.ensureAndSetValueState(`${folder}.enabled`, { name: "Enabled", type: "boolean", role: "switch" }, effective === 1);
				await this.stateWriter.ensureAndSetValueState(`${folder}.locked`, { name: "Locked", type: "boolean" }, lock === 1);
				await this.stateWriter.ensureAndSetValueState(`${folder}.time`, { name: "Start Time", type: "string", role: "text" }, timeText);
				await this.stateWriter.ensureAndSetValueState(`${folder}.hour`, { name: "Hour", type: "number" }, hour);
				await this.stateWriter.ensureAndSetValueState(`${folder}.minute`, { name: "Minute", type: "number" }, minute);
				await this.stateWriter.ensureAndSetValueState(`${folder}.weeks`, { name: "Repeat Days", type: "string", role: "json" }, JSON.stringify(weeks));
				await this.stateWriter.ensureAndSetValueState(`${folder}.auto_area_id`, { name: "Auto Area ID", type: "number" }, autoAreaId);
				await this.stateWriter.ensureAndSetValueState(`${folder}.clean_mode`, { name: "Clean Mode", type: "number" }, cleanMode);
				await this.stateWriter.ensureAndSetValueState(`${folder}.fan_power`, { name: "Fan Power", type: "number" }, fanPower);
				await this.stateWriter.ensureAndSetValueState(`${folder}.water_box_mode`, { name: "Water Level", type: "number" }, waterBoxMode);
				await this.stateWriter.ensureAndSetValueState(`${folder}.clean_count`, { name: "Clean Count", type: "number" }, cleanCount);
				await this.stateWriter.ensureAndSetValueState(`${folder}.clean_line`, { name: "Clean Line", type: "number" }, cleanLine);
				await this.stateWriter.ensureAndSetValueState(`${folder}.room_count`, { name: "Room Count", type: "number" }, roomCount);
				await this.stateWriter.ensureAndSetValueState(`${folder}.rooms`, { name: "Rooms", type: "string", role: "json" }, JSON.stringify(rooms));
				await this.stateWriter.ensureAndSetValueState(`${folder}.map_id`, { name: "Map ID", type: "number" }, mapId);
				await this.stateWriter.ensureAndSetValueState(`${folder}.map_name`, { name: "Map Name", type: "string", role: "text" }, mapName);
			}
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10LocalTimerBlob: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10NotDisturbData(dpValue: unknown): Promise<void> {
		const bytes = this.decodeQ10ShadowBytes(dpValue);
		if (!bytes || bytes.length < 6) return;

		try {
			await this.host.processStatusProperty("not_disturb_start_hour", bytes[1] ?? 0);
			await this.host.processStatusProperty("not_disturb_start_minute", bytes[2] ?? 0);
			await this.host.processStatusProperty("not_disturb_end_hour", bytes[3] ?? 0);
			await this.host.processStatusProperty("not_disturb_end_minute", bytes[4] ?? 0);
			await this.host.processStatusProperty(
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
			await this.host.processStatusProperty("valley_point_charging_start_hour", bytes[1] ?? 0);
			await this.host.processStatusProperty("valley_point_charging_start_minute", bytes[2] ?? 0);
			await this.host.processStatusProperty("valley_point_charging_end_hour", bytes[3] ?? 0);
			await this.host.processStatusProperty("valley_point_charging_end_minute", bytes[4] ?? 0);
			await this.host.processStatusProperty(
				"valley_point_charging_time",
				`${this.formatQ10Time(bytes[1] ?? 0)}:${this.formatQ10Time(bytes[2] ?? 0)}-${this.formatQ10Time(bytes[3] ?? 0)}:${this.formatQ10Time(bytes[4] ?? 0)}`
			);
		} catch (e: unknown) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Q10 applyQ10ValleyPointChargingData: ${this.deps.adapter.errorMessage(e)}`, "warn");
		}
	}

	public async applyQ10MultiMapListFromDp61(dp61: Record<string, unknown>): Promise<void> {
		const mapList = Array.isArray(dp61.data) ? dp61.data : [];
		if (mapList.length === 0) return;

		try {
			await this.stateWriter.ensureFolder("floors");
			for (const entry of mapList) {
				if (!entry || typeof entry !== "object") continue;
				const map = entry as Record<string, unknown>;
				const mapId = map.id;
				if (mapId === undefined || mapId === null || mapId === "") continue;

				const mapIdText = String(mapId);
				const name = typeof map.name === "string" && map.name.trim() ? map.name : `Map ${mapIdText}`;
				const folder = `floors.${mapIdText}`;

				await this.host.cleanupFloorMetadata(this.stateWriter.path(folder));
				await this.stateWriter.ensureFolder(folder, name);
				await this.stateWriter.ensureAndSetValueState(`${folder}.name`, { name: "Floor Name", type: "string" }, name);

				const timestamp = map.timestamp;
				if (typeof timestamp === "number" && Number.isFinite(timestamp)) {
					await this.stateWriter.ensureAndSetValueState(`${folder}.add_time`, {
						name: "Created At",
						type: "string",
					}, this.deps.adapter.formatRoborockDate(timestamp));
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
				await this.host.applyCleanRecordList(cleanRecords as Record<string, unknown>);
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
					await this.host.requestTimerRefresh();
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
			await this.host.applyStatusSnapshot(statusData);
		}

		if (net81) {
			await this.applyQ10NetworkFromDp81(net81);
		}
	}
}
