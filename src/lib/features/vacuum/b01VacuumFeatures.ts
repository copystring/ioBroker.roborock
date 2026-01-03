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

		// 1. CLEAR all inherited base commands. B01 uses its own protocol.
		this.commands = {};

		// 2. Add properties for prop.get
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

		// 3. Status Control (Start / Stop / Charge)
		this.addCommand("status", {
			type: "number",
			role: "value",
			name: "Status Control",
			def: 1,
			states: {
				1: this.deps.adapter.translations["app_start"] || "Start Cleaning",
				2: this.deps.adapter.translations["app_pause"] || "Pause",
				3: this.deps.adapter.translations["app_stop"] || "Stop",
				4: this.deps.adapter.translations["app_charge"] || "Return to Dock"
			}
		});

		// 4. Fan Power (wind)
		this.addCommand("wind", {
			type: "number",
			role: "value",
			name: "Fan Power",
			def: 2,
			states: {
				1: "Quiet",
				2: "Balanced",
				3: "Turbo",
				4: "Max"
			}
		});

		// 5. Water Level (water)
		this.addCommand("water", {
			type: "number",
			role: "value",
			name: "Water Level",
			def: 1,
			states: {
				1: "Low",
				2: "Medium",
				3: "High"
			}
		});

		// 6. Work Mode
		this.addCommand("work_mode", {
			type: "number",
			role: "value",
			name: "Work Mode",
			def: 0,
			states: {
				0: "Standard",
				1: "Custom",
				2: "Silent"
			}
		});

		// 7. Dust Collection Frequency
		this.addCommand("dust_frequency", {
			type: "number",
			role: "value",
			name: "Dust Collection Frequency",
			def: 0,
			states: {
				0: "Smart",
				1: "Low",
				2: "Medium",
				3: "High",
				4: "Never"
			}
		});

		// 8. Clean Path Preference
		this.addCommand("clean_path_preference", {
			type: "number",
			role: "value",
			name: "Clean Path Preference",
			def: 0,
			states: {
				0: "Standard",
				1: "Fast"
			}
		});

		// 9. Build Map
		this.addCommand("build_map", {
			type: "number",
			role: "value",
			name: "Build Map",
			def: 1,
			states: {
				0: "Off",
				1: "On"
			}
		});

		// 10. Robot Mode
		this.addCommand("mode", {
			type: "number",
			role: "value",
			name: "Robot Mode",
			def: 0,
			states: {
				0: "Vacuum",
				1: "Mop",
				2: "Vacuum & Mop"
			}
		});

		// 11. Custom Mode
		this.addCommand("custom_type", {
			type: "number",
			role: "value",
			name: "Custom Mode",
			def: 0,
			states: {
				0: "Off",
				1: "On"
			}
		});

		// 12. Service Commands (as individual buttons)
		const services = {
			"update_map": "Update Map",
			"start_recharge": "Start Charging",
			"stop_recharge": "Stop Charging",
			"start_dust_collection": "Start Emptying",
			"stop_dust_collection": "Stop Emptying",
			"reset_main_brush": "Reset Main Brush",
			"reset_side_brush": "Reset Side Brush",
			"reset_filter": "Reset Filter"
		};

		for (const [srv, srvName] of Object.entries(services)) {
			this.addCommand(srv, {
				type: "boolean",
				role: "button",
				name: srvName,
				def: false
			});
		}

		const cmds = Object.keys(this.commands);
		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `B01 Protocol Enforced. Commands in memory: ${cmds.join(", ")}`, "info");
	}

	/**
	 * Allows feature handlers to provide/modify parameters for a command before sending.
	 * B01 uses this to map individual command states to prop.set or service calls.
	 */
	public override async getCommandParams(method: string, params?: unknown): Promise<any> {
		// Intercept individual commands and route to prop.set or service
		if (["status", "wind", "water", "work_mode", "dust_frequency", "clean_path_preference", "build_map", "mode", "custom_type"].includes(method)) {
			return {
				method: "prop.set",
				params: { [method]: params }
			};
		}

		// Service calls
		const serviceMap: Record<string, { method: string, params: any }> = {
			"update_map": { method: "service", params: { "method": "upload_by_maptype", "params": { "force": 1, "map_type": 0 } } },
			"start_recharge": { method: "service", params: { "method": "start_recharge", "params": {} } },
			"stop_recharge": { method: "service", params: { "method": "stop_recharge", "params": {} } },
			"start_dust_collection": { method: "service", params: { "method": "start_dust_collection", "params": {} } },
			"stop_dust_collection": { method: "service", params: { "method": "stop_dust_collection", "params": {} } },
			"reset_main_brush": { method: "service", params: { "method": "reset_consumable", "params": { "main_brush_life": 100 } } },
			"reset_side_brush": { method: "service", params: { "method": "reset_consumable", "params": { "side_brush_life": 100 } } },
			"reset_filter": { method: "service", params: { "method": "reset_consumable", "params": { "filter_life": 100 } } }
		};

		if (serviceMap[method]) {
			return serviceMap[method];
		}

		return params;
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

	// Override processStatus to apply B01 specific conversions (dm² to m²)
	protected override async processStatus(resultObj: Record<string, any>): Promise<void> {
		// Prioritize dock_type processing to ensure feature flags are set
		const dockType = resultObj["dock_type"];
		if (dockType !== undefined) {
			await this.processDockType(Number(dockType));
		}

		// Handle docking station status separately
		const dssValue = resultObj["dss"];
		if (dssValue !== undefined) {
			delete resultObj["dss"];
			await this.updateDockingStationStatus(Number(dssValue));
		}

		// Map B01 specific keys to standard ioBroker states for compatibility
		// Map B01 specific keys to standard ioBroker states for compatibility


		await this.deps.ensureFolder(`Devices.${this.duid}.deviceStatus`);
		for (const key in resultObj) {
			let val = resultObj[key];

			// Get definition or create default
			const def = this.getCommonDeviceStates(key);
			const common: any = def ? { ...def } : { name: key, type: typeof val as ioBroker.CommonType, role: "value", read: true, write: false };

			// Enrich with defaults if missing
			if (!common.name) common.name = key;
			if (!common.role) common.role = "value";
			if (common.read === undefined) common.read = true;
			if (common.write === undefined) common.write = false;

			// Manual Metadata Overrides for B01 specific fields
			if (key === "clean_finish") {
				common.name = "Clean Finish Timestamp";
				common.role = "value.time";
				common.unit = null; // Ensure no unit residue
			} else if (key === "cleaning_time" || key === "real_clean_time") {
				common.name = key === "cleaning_time" ? "Cleaning Time" : "Real Cleaning Time";
				common.role = "value.interval";
				common.unit = key === "cleaning_time" ? "min" : "s";
			} else if (key === "cleaning_area") {
				common.name = "Cleaning Area";
			}

			// Serialize complex objects
			if (typeof val === "object" && val !== null) {
				val = JSON.stringify(val);
			}

			// Debug clean_finish value
			if (key === "clean_finish") {
				this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `clean_finish raw: ${val}`, "debug");
			}

			// B01 Area/Time Conversion
			if (["clean_time", "cleaning_time"].includes(key)) {
				// sniffs show 'cleaning_time: 25' for 25 min -> already in minutes. No conversion needed.
				// last_clean_t might be timestamp or duration? usually timestamp if clean_finish.
				val = Number(val);
			} else if (["cleaning_area", "cleaning_area", "last_clean_area"].includes(key)) {
				// B01 sends dm² (e.g. 2129 -> 21.29 m²)
				val = Number(((val as number) / 100).toFixed(2));
			}

			if (common.type === "string" && typeof val !== "string") {
				val = String(val);
			}

			// Force object update to ensure units/states are applied
			// extendObject ensures that if the object exists, it gets updated with new common properties
			await this.deps.adapter.extendObject(`Devices.${this.duid}.deviceStatus.${key}`, {
				type: "state",
				common: common
			});

			await this.deps.ensureState(`Devices.${this.duid}.deviceStatus.${key}`, common);
			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.deviceStatus.${key}`, { val: val, ack: true });
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

	public override async detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, any>>): Promise<boolean> {
		// B01 features are statically defined, parameter unused but required by signature
		void statusData;
		return false;
	}

	protected override getDynamicFeatures(): Set<Feature> {
		return new Set<Feature>(); // B01 does not use bitfield feature flags
	}

	public override async processDockType(dockType: number): Promise<void> {
		// B01 dock features are handled via static command definitions, parameter unused but required by signature
		void dockType;
	}

	public override getCommonDeviceStates(attribute: string | number): { states?: Record<any, any>; unit?: string; type?: ioBroker.CommonType | undefined } | undefined {
		// Map B01 properties to readable states

		// 1. Fan Power (wind) - User confirmed 101-104 but B01/Q7 sends 1-4
		if (attribute === "wind" || attribute === "fan_power") {
			return {
				type: "number",
				states: {
					1: "Quiet",
					2: "Balanced",
					3: "Turbo",
					4: "Max",
					101: "Quiet",
					102: "Balanced",
					103: "Turbo",
					104: "Max",
					105: "Off"
				}
			};
		}

		// 2. Water Level (water) - Standard 200-203 but B01/Q7 sends 1-3
		if (attribute === "water" || attribute === "water_box_mode") {
			return {
				type: "number",
				states: {
					0: "Off",
					1: "Low",
					2: "Medium",
					3: "High",
					200: "Off",
					201: "Low",
					202: "Medium",
					203: "High"
				}
			};
		}

		// 3. Status - General Robot State
		if (attribute === "status" || attribute === "state") {
			return {
				type: "number",
				states: {
					0: "Unknown",
					1: "Initiating",
					2: "Sleeping",
					3: "Idle",
					4: "Remote Control",
					5: "Cleaning",
					6: "Returning Dock",
					7: "Manual Mode",
					8: "Charging",
					9: "Charging Error",
					10: "Paused",
					11: "Spot Cleaning",
					12: "In Error",
					13: "Shutting Down",
					14: "Updating",
					15: "Docking",
					16: "Go To",
					17: "Zone Clean",
					18: "Room Clean",
					22: "Emptying Dust Container",
					23: "Washing Mop",
					26: "Going to Wash Lov",
					28: "In Call",
					29: "Mapping",
					100: "Fully Charged"
				}
			};
		}

		// 3.1 Cleaning Stats Units
		if (attribute === "clean_time" || attribute === "cleaning_time") {
			return {
				type: "number",
				unit: "min"
			};
		}
		if (attribute === "clean_area" || attribute === "cleaning_area" || attribute === "last_clean_area") {
			return {
				type: "number",
				unit: "m²"
			};
		}
		if (attribute === "battery" || attribute === "quantity") {
			return {
				type: "number",
				unit: "%"
			};
		}
		if (attribute === "real_clean_time") {
			return {
				type: "number",
				unit: "s"
			};
		}
		if (attribute === "clean_finish") {
			return {
				type: "number"
			};
		}
		if (attribute === "last_clean_t") {
			return {
				type: "string"
			};
		}

		// 4. Error Codes - Populate from q7_dataset if available, else generic
		if (attribute === "error_code" || attribute === "fault") {
			// We can generate a states object from the imported Q7Data if we want 'states' mapping in object
			// This might be large, but useful.
			// However, Q7Data is imported in v1VacuumFeatures only?
			// Let's rely on base implementation for dynamic lookup OR return a basic set.
			// Base implementation usually sets the text state 'error_text'.
			// But for the numeric 'error_code' state, we can add common ones.
			return {
				type: "number",
				states: {
					0: "No Error",
					1: "LiDAR Blocked",
					2: "Bumper Stuck",
					3: "Wheels Suspended",
					4: "Cliff Sensor Error",
					5: "Main Brush Jammed",
					6: "Side Brush Jammed",
					7: "Wheels Jammed",
					8: "Robot Trapped",
					9: "No Dustbin",
					10: "Filter Wet/Blocked",
					11: "Magnetic Field Detected",
					12: "Low Battery",
					13: "Charging Error",
					14: "Battery Error",
					15: "Wall Sensor Dirty",
					16: "Robot Tilted",
					17: "Side Brush Error",
					18: "Fan Error",
					100: "Sensor Dirty"
				}
			};
		}

		// 5. Dock Status
		if (attribute === "dock_status") {
			return {
				type: "number",
				states: {
					0: "Undocked",
					1: "Docking",
					2: "Docked",
					3: "Leaving Dock",
					255: "Unknown"
				}
			};
		}

		// 6. Dust Collection Status
		if (attribute === "dust_collection_status") {
			return {
				type: "number",
				states: {
					0: "Idle",
					1: "Collecting",
					2: "Collection Weaker",
					3: "Collection Failed",
					4: "Dustbin Full"
				}
			};
		}

		// 7. Map Status
		if (attribute === "map_status") {
			return {
				type: "number",
				states: {
					0: "Unmapped",
					1: "Mapped",
					2: "Mapping",
					3: "Loading"
				}
			};
		}

		// 8. Charge Status
		if (attribute === "charge_status") {
			return {
				type: "number",
				states: {
					0: "Not Charging",
					1: "Charging",
					2: "Fully Charged",
					3: "Charge Failed"
				}
			};
		}

		// 9. Work Mode
		if (attribute === "work_mode") {
			return {
				type: "number",
				states: {
					0: "Standard",
					1: "Custom",
					2: "Silent"
				}
			};
		}

		// 10. Tank State (Water Box)
		if (attribute === "tank_state") {
			return {
				type: "number",
				states: {
					0: "Installed",
					1: "Removed",
					2: "Empty",
					3: "Unknown"
				}
			};
		}

		// 11. Sweep Type (Mop Route)
		if (attribute === "sweep_type" || attribute === "mop_mode") {
			return {
				type: "number",
				states: {
					0: "Standard",
					1: "Deep",
					2: "Deep+"
				}
			};
		}

		// 12. Cloth State (Mop Pad)
		if (attribute === "cloth_state") {
			return {
				type: "number",
				states: {
					0: "Installed",
					1: "Removed",
					2: "Dirty"
				}
			};
		}

		// 13. Multi Floor
		if (attribute === "multi_floor") {
			return {
				type: "number",
				states: {
					0: "Disabled",
					1: "Enabled"
				}
			};
		}

		// 14. Quiet Is Open (DND Mode)
		if (attribute === "quiet_is_open") {
			return {
				type: "number",
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 15. Dust Collection Frequency
		if (attribute === "dust_frequency") {
			return {
				type: "number",
				states: {
					0: "Smart",
					1: "Low",
					2: "Medium",
					3: "High",
					4: "Never"
				}
			};
		}

		// 16. Clean Path Preference
		if (attribute === "clean_path_preference") {
			return {
				type: "number",
				states: {
					0: "Standard",
					1: "Fast"
				}
			};
		}

		// 17. Repeat State
		if (attribute === "repeat_state") {
			return {
				type: "number",
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 18. Dust Action
		if (attribute === "dust_action") {
			return {
				type: "number",
				states: {
					0: "Idle",
					1: "Emptying"
				}
			};
		}

		// 19. Build Map
		if (attribute === "build_map") {
			return {
				type: "number",
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 20. Map Num
		if (attribute === "map_num") {
			return {
				type: "number",
				unit: "maps"
			};
		}

		// 21. Mode
		if (attribute === "mode") {
			return {
				type: "number",
				states: {
					0: "Vacuum",
					1: "Mop",
					2: "Vacuum & Mop"
				}
			};
		}

		// 22. Custom Type
		if (attribute === "custom_type") {
			return {
				type: "number",
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 8. Charge State (Fixed key from charge_status)
		if (attribute === "charge_state") {
			return {
				type: "number",
				states: {
					0: "Charging",
					1: "Not Charging",
					2: "Fully Charged",
					3: "Charge Failed"
				}
			};
		}

		// 23. Add Sweep Status
		if (attribute === "add_sweep_status") {
			return {
				type: "number",
				states: {
					"-1": "Unknown",
					0: "Off",
					1: "On"
				}
			};
		}

		// 24. Language
		if (attribute === "language") {
			return {
				type: "number",
				states: {
					0: "Chinese",
					1: "English",
					2: "Other",
					4: "German", // Guessed based on 4 in DE context
				}
			};
		}

		return undefined;
	}

	public override async updateNetworkInfo(): Promise<void> {
		try {
			// B01: Request via service.get_net_info? Or just rely on prop.get("net_status")?
			// prop.get "net_status" usually just gives connected state.
			// Let's try service.get_network_info first as it's common.
			const res = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_net_info", {});
			if (res) {
				// Typically returns { ssid, ip, mac, rssi... }
				const info = Array.isArray(res) ? res[0] : res;

				if (info) {
					await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
					for (const key in info) {
						await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${key}`, {
							name: key,
							type: typeof info[key] as ioBroker.CommonType,
							read: true,
							write: false
						});
						await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.networkInfo.${key}`, { val: info[key], ack: true });
					}
				}
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update network info: ${e.message}`, "warn");
		}
	}

}




