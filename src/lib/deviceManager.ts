// src/lib/DeviceManager.ts

import type { Roborock } from "../main";
// Import BaseDeviceFeatures value
import { BaseDeviceFeatures, FeatureDependencies } from "./features/baseDeviceFeatures";
import { FallbackBaseFeatures, FallbackVacuumFeatures } from "./features/fallbackFeatures";
import { VacuumProfile, DEFAULT_PROFILE } from "./features/vacuum/baseVacuumFeatures";
import { ProductHelper } from "./productHelper";

// Import indices to trigger decorators
import "./features/vacuum/index";

function createFeaturesForModel(adapter: Roborock, duid: string, robotModel: string, productCategory: string | null): BaseDeviceFeatures {
	adapter.log.debug(`[DeviceManager] Looking for feature handler for model: ${robotModel} (Category: ${productCategory})`);

	const dependencies: FeatureDependencies = {
		adapter: adapter,
		config: adapter.config,
		http_api: adapter.http_api,
		ensureState: adapter.ensureState.bind(adapter),
		ensureFolder: adapter.ensureFolder.bind(adapter),
		log: adapter.log,
	};

	// dynamic profile creation
	let dynamicProfile: VacuumProfile = DEFAULT_PROFILE;
	const productInfo = adapter.http_api.productInfo;
	if (productInfo) {
		const fanMappings = ProductHelper.getStateDefinitions(productInfo, robotModel, "fan_power");
		const mopMappings = ProductHelper.getStateDefinitions(productInfo, robotModel, "mop_mode");
		const waterMappings = ProductHelper.getStateDefinitions(productInfo, robotModel, "water_box_mode");
		const errorMappings = ProductHelper.getStateDefinitions(productInfo, robotModel, "error");
		const stateMappings = ProductHelper.getStateDefinitions(productInfo, robotModel, "state");

		if (fanMappings || mopMappings || waterMappings || errorMappings || stateMappings) {
			adapter.log.debug(`[DeviceManager] Applied dynamic state mappings for ${robotModel}`);
			dynamicProfile = {
				...DEFAULT_PROFILE,
				mappings: {
					fan_power: fanMappings || DEFAULT_PROFILE.mappings.fan_power,
					mop_mode: mopMappings || DEFAULT_PROFILE.mappings.mop_mode,
					water_box_mode: waterMappings || DEFAULT_PROFILE.mappings.water_box_mode,
					error_code: errorMappings || undefined,
					state: stateMappings || undefined,
				}
			};
		}
	}

	// Get registered model class
	const ModelClass = BaseDeviceFeatures.getRegisteredModelClass(robotModel);

	if (ModelClass) {
		adapter.log.debug(`[DeviceManager] Using specific feature handler for model: ${robotModel}`);
		// Specific model classes typically define their own profiles internally
		return new ModelClass(dependencies, duid);
	} else {
		adapter.log.warn(`[DeviceManager] Model "${robotModel}" (Category: ${productCategory}) not registered. Using fallback.`);
		if (productCategory === "robot.vacuum.cleaner" || productCategory === "roborock.vacuum") {
			return new FallbackVacuumFeatures(dependencies, duid, robotModel, dynamicProfile);
		} else {
			return new FallbackBaseFeatures(dependencies, duid, robotModel);
		}
	}
}

export class DeviceManager {
	private adapter: Roborock;
	// Interval handle
	private mainUpdateInterval: ioBroker.Interval | undefined = undefined;
	public deviceFeatureHandlers = new Map<string, BaseDeviceFeatures>();

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	/**
	 * Initializes devices from HTTP API.
	 */
	public async initializeDevices(): Promise<void> {
		const devices = this.adapter.http_api.getDevices();

		this.adapter.log.info(`[DeviceManager] Initializing ${devices.length} devices...`);

		const initPromises: Promise<void>[] = [];
		const cleanSummaryHandlers: BaseDeviceFeatures[] = [];

		for (const device of devices) {
			const duid = device.duid;

			const initTask = async () => {
				try {
					const model = this.adapter.http_api.getRobotModel(duid);
					const category = this.adapter.http_api.getProductCategory(duid);

					// Ensure model exists
					if (!model) {
						this.adapter.log.warn(`[DeviceManager] Could not find model for duid ${duid}. Skipping init.`);
						return;
					}

					const handler = createFeaturesForModel(this.adapter, duid, model, category);

					// Store handler
					this.deviceFeatureHandlers.set(duid, handler);

					await this.adapter.extendObjectAsync(`Devices.${duid}`, {
						type: "device",
						common: {
							name: device.name || duid, // Use cloud name or DUID
							// Link online status
							statusStates: {
								onlineId: `${this.adapter.namespace}.Devices.${duid}.deviceInfo.online`,
							},
						},
						native: {
							duid: duid,
							model: model,
							category: category,
						},
					});

					// Apply static features
					await handler.applyModelSpecifics();

					if (!device.online) {
						this.adapter.log.debug(`[DeviceManager] Device ${duid} is offline. Initializing features without runtime data.`);
					}


					// --- Initialization sequence ---


					// 1. Check dock type from cloud data and apply features FIRST
					const cloudDockType = this.adapter.http_api.getDevices().find(d => d.duid === duid)?.deviceStatus?.dock_type;
					if (device.online && cloudDockType !== undefined) {
						await handler.processDockType(Number(cloudDockType));
					}

					// 1.5 Get Network Info & fallback for Local API
					if (device.online) {
						await handler.updateNetworkInfo();

						const ipState = await this.adapter.getStateAsync(`Devices.${duid}.networkInfo.ip`);
						if (ipState && ipState.val) {
							const ip = String(ipState.val);
							// If not found via UDP yet, seed it from Cloud data
							if (!this.adapter.local_api.localDevices[duid] && ip && ip !== "0.0.0.0") {
								const pv = device.pv || "1.0";
								this.adapter.log.info(`[DeviceManager] Seeding local API with Cloud IP for ${duid}: ${ip} (Proto: ${pv})`);
								this.adapter.local_api.localDevices[duid] = {
									ip: ip,
									version: pv
								};
								// Explicitly try to connect via TCP since UDP failed
								await this.adapter.local_api.initiateClient(duid);
							}
						}
					}

					// 2. Get initial status (now dockingStationStatus objects exist)
					if (device.online) {
						await handler.updateStatus();
					}

					// 3. Get firmware features
					if (device.online) {
						await handler.updateFirmwareFeatures();
					}

					// 4. Create command objects
					await handler.createCommandObjects();

					// 6. Initial Map & Data
					if (device.online) {
						// updateDeviceData includes updateNetworkInfo, but we did it early.
						// To avoid double call, we could split updateDeviceData or just accept the redundancy (safe).
						// For optimization, we can comment it out in updateDeviceData or just leave it.
						// Redundancy is acceptable for robustness.
						await this.updateDeviceData(handler, duid);
						await this.updateConsumablesPercent(duid);
						await handler.updateMap();

						// Fire cleaning summary (background)
						// handler.updateCleanSummary();
						// Collect for later execution
						cleanSummaryHandlers.push(handler);
					}

					handler.printSummary();
				} catch (error: any) {
					this.adapter.log.warn(`[DeviceManager] Failed initial poll for ${duid}: ${error.message}`);
				}
			};

			initPromises.push(initTask());
		}

		await Promise.all(initPromises);

		// Wait for startup requests
		await this.adapter.requestsHandler.waitForStartup();

		this.adapter.log.info(`[DeviceManager] Processing ${cleanSummaryHandlers.length} clean summaries...`);
		for (const handler of cleanSummaryHandlers) {
			handler.updateCleanSummary();
		}

		this.adapter.log.info("[DeviceManager] All devices initialized.");

		// Cleanup orphaned devices
		await this.cleanupOrphanedDevices(devices.map((d) => d.duid));
	}



	/**
	 * Removes orphaned device folders.
	 */
	private async cleanupOrphanedDevices(activeDuids: string[]): Promise<void> {
		const activeDuidSet = new Set(activeDuids);
		const namespace = this.adapter.namespace;

		try {
			// Get all adapter objects
			const allObjects = await this.adapter.getAdapterObjectsAsync();
			const deviceFolders = Object.keys(allObjects).filter((id) => id.startsWith(`${namespace}.Devices.`) && id.split(".").length === 4);

			for (const folderId of deviceFolders) {
				const duid = folderId.split(".").pop();
				if (duid && !activeDuidSet.has(duid)) {
					this.adapter.log.info(`[DeviceManager] Deleting orphaned device folder: ${folderId}`);
					await this.adapter.delObjectAsync(folderId, { recursive: true });
				}
			}
		} catch (error: any) {
			this.adapter.log.error(`[DeviceManager] Failed to cleanup orphaned devices: ${error.message}`);
		}
	}

	// Track previous state
	private lastStateCode = new Map<string, number>();
	private lastMapStatus = new Map<string, number>();

	/**
	 * Get current state code.
	 */
	private async getDeviceState(duid: string): Promise<number> {
		const state = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.state`);
		if (state && state.val !== null) {
			return Number(state.val);
		}
		return 0; // Unknown
	}

	/**
	 * Get current map status.
	 */
	private async getDeviceMapStatus(duid: string): Promise<number> {
		const state = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);
		if (state && state.val !== null) {
			return Number(state.val);
		}
		return -1; // Unknown
	}

	/**
	 * Check if robot is active.
	 */
	private isActiveState(stateCode: number): boolean {
		const activeStates = [
			5, // Cleaning
			6, // Returning Dock
			7, // Manual Mode
			11, // Spot Cleaning
			15, // Docking
			16, // Go To
			17, // Zone Clean
			18, // Room Clean
			22, // Emptying dust container
			23, // Washing the mop
			26, // Going to wash the mop
			29, // Mapping
		];
		return activeStates.includes(stateCode);
	}

	/**
	 * Starts polling.
	 */
	public startPolling(): void {
		const mainPollInterval = this.adapter.config.updateInterval; // e.g. 60s

		this.adapter.log.info(`[DeviceManager] Starting main poll (every ${mainPollInterval}s). Heavy data updates only after activity finishes.`);

		let mainUpdateCount = mainPollInterval; // Slow loop counter

		this.mainUpdateInterval = this.adapter.setInterval(async () => {
			mainUpdateCount++;

			// --- Fast Loop (Map Updates) ---
			// Update map if robot is active (cleaning, etc.)
			try {
				const devices = this.adapter.http_api.getDevices();
				for (const device of devices) {
					if (!device.online) continue;

					const duid = device.duid;
					const handler = this.deviceFeatureHandlers.get(duid);

					if (handler) {
						const currentState = await this.getDeviceState(duid);
						if (this.isActiveState(currentState)) {
							await handler.updateMap();
						}
					}
				}
			} catch (e: any) {
				this.adapter.log.error(`[DeviceManager] Error in fast loop: ${e.message}`);
			}

			// --- Slow Loop ---
			if (mainUpdateCount >= mainPollInterval) {
				mainUpdateCount = 0;
				this.adapter.log.debug("[DeviceManager] Running scheduled main device update...");

				// await this.adapter.http_api.updateHomeData(); // We DO NOT update HomeData on interval to avoid bans.
				const cloudDevices = this.adapter.http_api.getDevices();

				for (const device of cloudDevices) {
					const duid = device.duid;
					if (!device.online) {
						this.adapter.log.debug(`[DeviceManager] Device ${duid} is offline. Skipping poll.`);
						continue;
					}

					const handler = this.deviceFeatureHandlers.get(duid);
					if (!handler) continue;

					try {
						await this.adapter.updateDeviceInfo(duid, cloudDevices);
						const version = await this.adapter.getDeviceProtocolVersion(duid);

						// 1. Update Status
						if (version === "A01") {
							await handler.updateStatus();
						} else {
							await handler.updateStatus();

							// Check Dock Type
							const dockTypeState = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.dock_type`);
							if (dockTypeState && dockTypeState.val !== null) {
								await handler.processDockType(Number(dockTypeState.val));
							}
						}

						// 2. Map Status Change Detection
						const currentMapStatus = await this.getDeviceMapStatus(duid);
						const lastMapStatus = this.lastMapStatus.get(duid);

						if (lastMapStatus !== undefined && currentMapStatus !== lastMapStatus) {
							this.adapter.log.info(`[DeviceManager] Map changed for ${duid} (${lastMapStatus} -> ${currentMapStatus}). Updating device data (rooms, etc.)...`);
							await this.updateDeviceData(handler, duid);
							// Also update consumables as they might be stale
							await this.updateConsumablesPercent(duid);
							// Trigger map update immediately
							await handler.updateMap();
						}
						this.lastMapStatus.set(duid, currentMapStatus);

						// 3. Periodic Consumables Update (Optional? User said "only map change". But consumables change dynamically)
						// Keeping consumables updated is generally safe and low-cost.
						// But strictly sticking to "only map change" for heavy data.
						// We'll update consumables on activity finish or map change. Consumables don't change fast.

						// 4. Check State Transitions
						const currentState = await this.getDeviceState(duid);
						const lastState = this.lastStateCode.get(duid) || 0;
						const isActive = this.isActiveState(currentState);
						const wasActive = this.isActiveState(lastState);

						this.adapter.log.debug(`[DeviceManager] ${duid} State: ${lastState} -> ${currentState} | Active: ${wasActive} -> ${isActive}`);

						// Transition: Active -> Inactive
						if (wasActive && !isActive) {
							this.adapter.log.info(`[DeviceManager] Activity finished for ${duid} (State ${lastState} -> ${currentState}). Fetching full data...`);

							// Trigger full update
							await this.updateDeviceData(handler, duid);
							await this.updateConsumablesPercent(duid);
							// CRITICAL: Fetch status (including Docking Station Status) immediately after cleaning
							await handler.updateStatus();
							await handler.updateCleanSummary();
							await handler.updateMap();
						}

						// Update state tracker
						this.lastStateCode.set(duid, currentState);

					} catch (error: any) {
						this.adapter.catchError(error, "mainUpdateInterval", duid);
					}
				}
			}
		}, 1000); // 1s ticker
	}

	/**
	 * Stops polling.
	 */
	public stopPolling(): void {
		if (this.mainUpdateInterval) {
			// Cast to any for ioBroker interval
			this.adapter.clearInterval(this.mainUpdateInterval as any);
			this.mainUpdateInterval = undefined;
		}
	}

	/**
	 * Fetches non-status data.
	 */
	public async updateDeviceData(handler: BaseDeviceFeatures, duid: string): Promise<void> {
		await Promise.all([
			handler.updateFirmwareFeatures(),
			handler.updateMultiMapsList(),
			handler.updateRoomMapping(),
			handler.updateConsumables(),
			handler.updateTimers(),
			handler.updateNetworkInfo(),
		]);

		await this.adapter.checkForNewFirmware(duid);

		// Model-specific requests
		await handler.updateExtraStatus();
	}

	/**
	 * Fetches consumable percentages.
	 */
	public async updateConsumablesPercent(duid: string): Promise<void> {
		const handler = this.deviceFeatureHandlers.get(duid);
		if (!handler) return;

		const device = this.adapter.http_api.getDevices().find((d) => d.duid === duid);
		if (!device?.deviceStatus) return; // 'deviceStatus' exists on Device type
		const status = device.deviceStatus as Record<string, number>;

		const consumableMap: Record<string, string> = {
			"125": "main_brush_life",
			"126": "side_brush_life",
			"127": "filter_life",
		};

		for (const [attribute, value] of Object.entries(status)) {
			// Cloud consumable percentages
			if (attribute === "125" || attribute === "126" || attribute === "127") {
				const val = value >= 0 && value <= 100 ? value : 0;
				const mappedName = consumableMap[attribute];
				const common = handler.getCommonConsumable(mappedName); // Use mapped name

				await this.adapter.ensureState(`Devices.${duid}.consumables.${mappedName}`, common || {});
				await this.adapter.setStateChanged(`Devices.${duid}.consumables.${mappedName}`, { val, ack: true });
			}
		}
	}
}
