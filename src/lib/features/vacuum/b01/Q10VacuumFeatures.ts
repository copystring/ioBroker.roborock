import { DeviceModelConfig, FeatureDependencies } from "../../baseDeviceFeatures";
import { B01BaseVacuumFeatures } from "./B01BaseVacuumFeatures";
import { Q10CleanRecordService } from "./q10/Q10CleanRecordService";
import { Q10ShadowDataService } from "./q10/Q10ShadowDataService";

export class Q10VacuumFeatures extends B01BaseVacuumFeatures {
	private readonly q10CleanRecordService: Q10CleanRecordService;
	private readonly q10ShadowDataService: Q10ShadowDataService;
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

	private async requestQ10MapMetadataList(): Promise<void> {
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "64": { op: "list" } } });
	}

	private async requestQ10TimerList(): Promise<void> {
		this.q10ShadowDataService.markTimerListRequestPending();
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "69": 0 } });
	}

	private async primeQ10LiveMapStream(): Promise<void> {
		// Android app sessions consistently prime the Q10 live map stream with these
		// DP writes before requesting the current map payload.
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "75": 0 } });
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "16": 1 } });
		await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "107": 0 } });
	}

	private async requestQ10LiveMap(): Promise<void> {
		await this.mapService.updateMap(async () => {
			await this.primeQ10LiveMapStream();
			await this.deps.adapter.requestsHandler.publishB01Dp(this.duid, { "101": { "110": 1 } });
		});
	}

	private async initializeQ10DeviceData(): Promise<void> {
		await this.cleanupQ10LegacyStates();
		await this.ensureQ10Folders();

		// The first startup 102 snapshot usually contains timer_type (DP 93).
		// We already request the timer list explicitly during init, so the next DP 93
		// must not immediately trigger the same 69 request a second time.
		this.q10ShadowDataService.skipNextTimerRefreshFromDp93();

		await this.requestQ10StatusSnapshot();
		await this.requestQ10MultiMapList();
		await this.requestQ10CleanRecordList();
		await this.requestQ10MapMetadataList();
		await this.requestQ10TimerList();
		await this.requestQ10LiveMap();

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
}
