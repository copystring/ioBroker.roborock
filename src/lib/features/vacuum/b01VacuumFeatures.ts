import { V1VacuumFeatures, VacuumProfile } from "./v1VacuumFeatures";
import { FeatureDependencies, DeviceModelConfig } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

export class B01VacuumFeatures extends V1VacuumFeatures {

	constructor(
		dependencies: FeatureDependencies,
		duid: string,
		robotModel: string,
		config: DeviceModelConfig,
		profile?: VacuumProfile
	) {
		super(dependencies, duid, robotModel, config, profile);
		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Constructing B01VacuumFeatures for ${robotModel}`, "info");
	}



	// Override updateStatus to use strict B01 prop.get
	public override async setupProtocolFeatures(): Promise<void> {
		this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, "Configuring B01 Command Set...", "debug");

		// 1. Blacklist/Clear static features to prevent auto-re-population
		// B01 devices typically don't use the standard Vacuum features like 'Timers' or 'Consumables' in the same way,
		// or at least we don't want the standard commands for them.
		// We explicitly allow only what we implemented or know works.
		const allowedFeatures = [
			Feature.FirmwareInfo, // Used for FW version
			Feature.MultiMap, // Used for floor list
			Feature.RoomMapping // Used for room names
		];
		this.config.staticFeatures = this.config.staticFeatures.filter(f => allowedFeatures.includes(f));




		// 3. Add B01 Specific Protocol Commands
		const properties = [
			"wind", "water", "clean_mode", "status", "error_code", "battery",
			"clean_time", "clean_area", "map_status", "dock_status", "water_box_level_off", "dust_collection_status"
		];
		const propStates: Record<string, string> = {};
		properties.forEach(p => propStates[p] = p);

		this.addCommand("prop.get", {
			type: "string",
			role: "text",
			name: "Property Get",
			def: "status",
			states: propStates
		});

		this.addCommand("prop.set", {
			type: "json",
			role: "json",
			name: "Direct Property Set",
			def: '{"status": 1}',
			states: {
				'{"status": 1}': "Start Cleaning",
				'{"status": 2}': "Pause",
				'{"status": 3}': "Stop",
				'{"status": 4}': "Return to Dock",
				'{"wind": 101}': "Fan: Quiet",
				'{"wind": 102}': "Fan: Balanced",
				'{"wind": 103}': "Fan: Turbo",
				'{"wind": 104}': "Fan: Max",
				'{"water": 201}': "Water: Mild",
				'{"water": 202}': "Water: Moderate",
				'{"water": 203}': "Water: Intense"
			}
		});

		this.addCommand("service", {
			type: "json",
			role: "json",
			name: "Direct Service Call",
			def: '{"method": "upload_by_maptype", "params": {"force": 1, "map_type": 0}}',
			states: {
				'{"method": "upload_by_maptype", "params": {"force": 1, "map_type": 0}}': "Update Map",
				'{"method": "reset_consumable", "params": {"main_brush_life": 100}}': "Reset Main Brush",
				'{"method": "reset_consumable", "params": {"side_brush_life": 100}}': "Reset Side Brush",
				'{"method": "reset_consumable", "params": {"filter_life": 100}}': "Reset Filter",
				'{"method": "get_custom_voice", "params": {}}': "Get Custom Voice Info"
			}
		});

		const cmds = Object.keys(this.commands);
		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `B01 Protocol Enforced. Commands in memory: ${cmds.join(", ")}`, "info");
	}

	public override async initializeDeviceData(): Promise<void> {
		await this.updateStatus();
		await Promise.all([
			this.updateFirmwareFeatures(),
			this.updateMultiMapsList(),
			this.updateRoomMapping(),
		]);

		await this.deps.adapter.checkForNewFirmware(this.duid);

		// Model-specific requests
		await this.updateExtraStatus();

		// Initial Map
		await this.updateMap();
	}

	// Override updateStatus to use strict B01 prop.get
	public override async updateStatus(): Promise<void> {
		const props = V1VacuumFeatures.CONSTANTS.b01StatusProps;
		let resultObj: Record<string, any> | undefined;

		try {
			const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "prop.get", { property: props });

			if (Array.isArray(result) && result.length === props.length) {
				resultObj = {};
				props.forEach((key: string, index: number) => {
                    resultObj![key] = result[index];
				});
			} else if (typeof result === "object" && result !== null) {
				resultObj = result;
			}

			if (resultObj) {
				await this.processStatus(resultObj);
				// B01: Features are static/protocol-defined, skipping dynamic detection
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update status (B01): ${e.message}`, "warn");
		}
	}

	// Override updateConsumables to use strict B01 prop.get
	public override async updateConsumables(data?: any): Promise<void> {
		let resultObj: Record<string, any> | undefined;

		if (data) {
			resultObj = data;
		} else {
    		const props = V1VacuumFeatures.CONSTANTS.b01SettingsProps;
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "prop.get", { property: props });
    		if (Array.isArray(result) && result.length === props.length) {
    			resultObj = {};
    			props.forEach((key: string, index: number) => {
    				resultObj![key] = result[index];
    			});
    		} else if (typeof result === "object" && result !== null) {
    			resultObj = result as Record<string, any>;
    		}
		}

		if (resultObj) {
			await this.processConsumables(resultObj);
		}
	}

	// Override updateMap to use B01 service call
	public override async updateMap(): Promise<void> {
		try {
			// Trigger map push (Protocol 301)
			await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.upload_by_maptype", {
				force: 1,
				map_type: 0
			});
			this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, "Triggered B01 Map update via service.upload_by_maptype", "debug");

			// Pending Request to handle the async 301 push
			const dummyId = -Math.floor(Math.random() * 1000000);

			this.deps.adapter.pendingRequests.set(dummyId, {
				method: "get_map_v1",
				duid: this.duid,
				resolve: (data: any) => {
					this.deps.adapter.pendingRequests.delete(dummyId);
					if (Buffer.isBuffer(data)) {
						const device = this.deps.adapter.http_api.getDevices().find(d => d.duid === this.duid);
						const sn = device?.sn || this.duid;

						this.mapManager.processMap(data, "B01", this.robotModel, sn, this.mappedRooms, this.duid, "MQTT")
							.then(async (res) => {
								if (res) {
									const { mapBase64, mapBase64Truncated, mapData } = res as any;
									await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64`, {
										name: "Map Image",
										type: "string",
										role: "text.png",
										read: true,
										write: false
									});
									await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64`, { val: mapBase64, ack: true });

									await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64Truncated`, {
										name: "Map Image Truncated",
										type: "string",
										role: "text.png",
										read: true,
										write: false
									});
									await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64Truncated`, { val: mapBase64Truncated, ack: true });

									await this.deps.ensureState(`Devices.${this.duid}.map.mapData`, {
										name: "Map Data",
										type: "string",
										role: "json",
										read: true,
										write: false
									});
									await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapData`, { val: JSON.stringify(mapData), ack: true });
								}
							}).catch(err => {
								this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to process B01 map: ${err}`, "error");
							});
					}
				},
				reject: () => { }
			});

			this.deps.adapter.setTimeout(() => {
				if (this.deps.adapter.pendingRequests.has(dummyId)) {
					this.deps.adapter.pendingRequests.delete(dummyId);
				}
			}, 15000);

		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to trigger B01 map update: ${e.message}`, "warn");
		}
	}

	public override async updateCleanSummary(): Promise<void> {
		try {
			const summaryRes = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_record_list", {}, { priority: -10 });
			if (summaryRes) {
				await this.processCleanSummary(summaryRes);
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update B01 clean summary: ${e.message}`, "warn");
		}
	}

	// Override getCleaningRecordMap to use B01 service call (upload_record_by_url)
	protected override async getCleaningRecordMap(startTime: number, recordDetails?: any): Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null> {
		try {
			let url = recordDetails?.record_map_url || recordDetails?.url;
			if (!url && recordDetails?.detail) {
				const detail = typeof recordDetails.detail === "string" ? JSON.parse(recordDetails.detail) : recordDetails.detail;
				url = detail.record_map_url || detail.url;
			}

			if (!url) {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `No URL found in record details for B01 history map (startTime: ${startTime})`, "warn");
				return null;
			}

			const dummyId = -Math.floor(Math.random() * 1000000);

			const historyMapPromise = new Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null>((resolve) => {
				this.deps.adapter.pendingRequests.set(dummyId, {
					method: "get_clean_record_map",
					duid: this.duid,
					resolve: async (data: Buffer) => {
						this.deps.adapter.pendingRequests.delete(dummyId);
						if (Buffer.isBuffer(data)) {
							try {
								const devices = this.deps.adapter.http_api.getDevices();
								const device = devices.find((d: any) => d.duid === this.duid);
								const serial = device?.sn || this.duid;

								const mapRes = await this.deps.adapter.mapManager.processMap(data, "B01", this.robotModel, serial, null, this.duid, "B01History");

								if (mapRes) {
									resolve({
										mapBase64CleanUncropped: mapRes.mapBase64Clean || mapRes.mapBase64,
										mapBase64: mapRes.mapBase64,
										mapBase64Truncated: mapRes.mapBase64Clean || mapRes.mapBase64,
										mapData: JSON.stringify(mapRes.mapData),
									});
								} else {
									this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "B01 History Map processing returned null.", "warn");
									resolve(null);
								}
							} catch (e: any) {
								this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Failed to process B01 history map: ${e.message}`, "error");
								resolve(null);
							}
						} else {
							resolve(null);
						}
					},
					reject: () => {
						this.deps.adapter.pendingRequests.delete(dummyId);
						resolve(null);
					}
				});

				this.deps.adapter.setTimeout(() => {
					if (this.deps.adapter.pendingRequests.has(dummyId)) {
						this.deps.adapter.pendingRequests.delete(dummyId);
						resolve(null);
					}
				}, 30000);
			});

			try {
				await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.upload_record_by_url", { url }, { priority: -10 });
				this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `Triggered B01 History Map update for URL: ${url}`, "debug");
			} catch (e: any) {
				this.deps.adapter.pendingRequests.delete(dummyId);
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to trigger B01 history map upload: ${e.message}`, "warn");
				return null;
			}

			return historyMapPromise;
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to get cleaning record map (B01): ${e.message}`, "warn");
			return null;
		}
	}
	// Override processCleanSummary to handle B01 specific structure and avoid redundant requests
	protected override async processCleanSummary(result: any): Promise<void> {
		try {
			// B01 result structure is { total_time, total_area, total_count, record_list: [ { url, detail: string }, ... ] }
			let summaryData = result;
			if (result && result.data) {
				summaryData = result.data;
			}

			if (!summaryData || !summaryData.record_list) {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "Invalid B01 clean summary format", "warn");
				return;
			}

			// Update Summary States
			await this.updateSummaryState("clean_time", summaryData.total_time);
			await this.updateSummaryState("clean_area", summaryData.total_area);
			await this.updateSummaryState("clean_count", summaryData.total_count);

			await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records`);
			const recordList = summaryData.record_list;
			const limit = 20;

			recordList.sort((a: any, b: any) => {
				const timeA = this.extractStartTime(a);
				const timeB = this.extractStartTime(b);
				return timeB - timeA;
			});


			for (let i = 0; i < Math.min(recordList.length, limit); i++) {
				const recordItem = recordList[i];
				let detail: any = null;

				try {
					detail = typeof recordItem.detail === "string" ? JSON.parse(recordItem.detail) : recordItem.detail;
				} catch (e) {
					this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Failed to parse record detail: ${e}`, "error");
					continue;
				}

				if (!detail) continue;

				const startTime = detail.record_start_time || detail.begin;
				const index = i;

				await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records.${index}`);

				await this.processRecordAttributes(index, detail);

				if (detail.record_map_url || detail.url || recordItem.url) {
					const mapRes = await this.getCleaningRecordMap(startTime, recordItem);
					if (mapRes) {
						await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64`, {
							name: "History Map Base64",
							type: "string",
							role: "text",
							read: true,
							write: false
						});
						await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64Truncated`, {
							name: "History Map Base64 Truncated",
							type: "string",
							role: "text",
							read: true,
							write: false
						});

						await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64`, { val: mapRes.mapBase64, ack: true });
						await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64Truncated`, { val: mapRes.mapBase64Truncated, ack: true });

						// Add the map_object state (Combined JSON)
						const combinedObject = {
							...detail,
							mapBase64: mapRes.mapBase64,
							mapBase64Truncated: mapRes.mapBase64Truncated
						};

						await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.map_object`, {
							name: "Combined History Record",
							type: "string",
							role: "json",
							read: true,
							write: false
						});

						await this.deps.adapter.setStateAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.map_object`, {
							val: JSON.stringify(combinedObject),
							ack: true
						});
					}
				}
			}

			const jsonSummary = {
				clean_time: Number((summaryData.total_time / 3600).toFixed(2)),
				clean_area: Number((summaryData.total_area / 1000000).toFixed(2)),
				clean_count: summaryData.total_count,
				records: recordList.map((r: any) => {
					try {
						return typeof r.detail === "string" ? JSON.parse(r.detail) : r.detail;
					} catch { return null; }
				}).filter((r: any) => r !== null)
			};

			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.JSON`, { val: JSON.stringify(jsonSummary), ack: true });


		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Error processing B01 clean summary: ${e.message}`, "error");
		}
	}

	private async updateSummaryState(attr: string, value: number): Promise<void> {
		let val = value;
		if (attr === "clean_time") {
			val = Number((val / 3600).toFixed(2));
		} else if (attr === "clean_area") {
			val = Number((val / 1000000).toFixed(2));
		}

		await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${attr}`, {
			name: attr,
			type: "number",
			role: "value",
			read: true,
			write: false
		});
		await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.${attr}`, { val, ack: true });
	}


	private extractStartTime(record: any): number {
		try {
			const detail = typeof record.detail === "string" ? JSON.parse(record.detail) : record.detail;
			return detail.record_start_time || detail.begin || 0;
		} catch {
			return 0;
		}
	}

	private async processRecordAttributes(index: number, detail: any): Promise<void> {
		for (const key in detail) {
			const val = detail[key];
			const mappedKey = V1VacuumFeatures.MAPPED_CLEAN_SUMMARY[key] || key;

			// Simple type mapping
			const type = typeof val;
			if (type !== "string" && type !== "number" && type !== "boolean") continue;

			await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, {
				name: mappedKey,
				type: type as any,
				role: "value",
				read: true,
				write: false
			});
			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, { val, ack: true });
		}
	}

	public override async detectAndApplyRuntimeFeatures(_statusData: Readonly<Record<string, any>>): Promise<boolean> {
		return false; // B01 features are statically defined
	}

	protected override getDynamicFeatures(): Set<Feature> {
		return new Set<Feature>(); // B01 does not use bitfield feature flags
	}

	public override async processDockType(_dockType: number): Promise<void> {
		// B01 dock features are handled via static command definitions
	}

}




