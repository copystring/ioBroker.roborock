// src/lib/DeviceManager.ts

import type { Roborock } from "../main";
// Import BaseDeviceFeatures value
import { BaseDeviceFeatures, FeatureDependencies } from "./features/baseDeviceFeatures";
import { FallbackBaseFeatures, FallbackVacuumFeatures } from "./features/fallbackFeatures";
import { DEFAULT_PROFILE, VacuumProfile } from "./features/vacuum/v1VacuumFeatures";

import { ProductHelper } from "./productHelper";

// Import indices to trigger decorators
import "./features/vacuum/index";

// Import B01VacuumFeatures
import { B01VacuumFeatures } from "./features/vacuum/b01VacuumFeatures";
function createFeaturesForModel(adapter: Roborock, duid: string, robotModel: string, productCategory: string | null, protocolVersion: string | null): BaseDeviceFeatures {
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

	// B01 Detection: Prioritize Protocol Version over Registered Model Class
	// This ensures that B01 devices always get the B01 feature handler, even if they share a model ID with a V1 device.
	if (protocolVersion === "B01") {
		// Dynamic B01 Detection
		const handler = new B01VacuumFeatures(dependencies, duid, robotModel, { staticFeatures: [] }, dynamicProfile);
		handler.protocolVersion = protocolVersion;
		return handler;
	}

	// Get registered model class
	const ModelClass = BaseDeviceFeatures.getRegisteredModelClass(robotModel);

	if (ModelClass) {
		// Specific model classes typically define their own profiles internally
		const handler = new ModelClass(dependencies, duid);
		handler.protocolVersion = protocolVersion;
		return handler;
	} else {
		adapter.rLog("System", duid, "Warn", undefined, undefined, `Model "${robotModel}" (Category: ${productCategory}) not registered. Using fallback (Protocol: ${protocolVersion || "Unknown"}).`, "warn");

		if (productCategory === "robot.vacuum.cleaner" || productCategory === "roborock.vacuum") {
			const handler = new FallbackVacuumFeatures(dependencies, duid, robotModel, dynamicProfile);
			handler.protocolVersion = protocolVersion;
			return handler;
		} else {
			const handler = new FallbackBaseFeatures(dependencies, duid, robotModel);
			handler.protocolVersion = protocolVersion;
			return handler;
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
		this.adapter.rLog("System", null, "Info", undefined, undefined, `Initializing data for ${devices.length} devices...`, "info");

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
						this.adapter.rLog("System", duid, "Warn", undefined, undefined, "Could not find model. Skipping init.", "warn");
						return;
					}

					const version = await this.adapter.getDeviceProtocolVersion(duid);
					const handler = createFeaturesForModel(this.adapter, duid, model, category, version);

					// Store handler and initialize
					this.deviceFeatureHandlers.set(duid, handler);

					await this.adapter.extendObject(`Devices.${duid}`, {
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
					await handler.initialize(device.online);

					if (device.online) {
						// Fire cleaning summary (background)
						cleanSummaryHandlers.push(handler);
					}
				} catch (error: any) {
					this.adapter.rLog("System", duid, "Warn", undefined, undefined, `Failed initial poll: ${error.message}`, "warn");
				}
			};
			initPromises.push(initTask());
		}

		await Promise.all(initPromises);
		const deviceSummaries: string[] = [];
		for (const [duid, handler] of this.deviceFeatureHandlers) {
			const model = (handler as any).robotModel || "Unknown";
			const version = (handler as any).protocolVersion || "Unknown";
			deviceSummaries.push(`${duid} (${model}, ${version})`);
		}
		this.adapter.rLog("System", null, "Info", undefined, undefined, `Initialization complete for ${this.deviceFeatureHandlers.size} devices: [${deviceSummaries.join(", ")}]`, "info");

		// Fire cleaning summary (background)
		for (const handler of cleanSummaryHandlers) {
			handler.updateCleanSummary().catch(e => this.adapter.log.warn(`Background summary update failed for ${(handler as any).duid}: ${e.message}`));
		}

		// Cleanup orphaned devices (non-blocking)
		this.cleanupOrphanedDevices(devices.map((d) => d.duid)).catch(e =>
			this.adapter.rLog("System", null, "Warn", undefined, undefined, `Device cleanup failed: ${e.message}`, "warn")
		);
	}
	/**
	 * Removes orphaned device folders.
	 */
	private async cleanupOrphanedDevices(activeDuids: string[]): Promise<void> {
		const activeDuidSet = new Set(activeDuids);
		const namespace = this.adapter.namespace;

		try {
			// Get all device objects (more efficient than getting all objects)
			const devices = await this.adapter.getDevicesAsync();
			const deviceFolders = devices.map((obj) => obj._id).filter((id) => id.startsWith(`${namespace}.Devices.`) && id.split(".").length === 4);

			for (const folderId of deviceFolders) {
				const duid = folderId.split(".").pop();
				if (duid && !activeDuidSet.has(duid)) {
					this.adapter.rLog("System", duid, "Info", undefined, undefined, `Deleting orphaned device folder: ${folderId}`, "info");
					await this.adapter.delObjectAsync(folderId, { recursive: true });
				}
			}
		} catch (error: any) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `Failed to cleanup orphaned devices: ${error.message}`, "error");
		}
	}

	// Track previous state
	private lastStateCode = new Map<string, number>();

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

		this.adapter.rLog("System", null, "Info", undefined, undefined, `Starting main poll (every ${mainPollInterval}s). Heavy data updates only after activity finishes.`, "info");

		let mainUpdateCount = mainPollInterval; // Slow loop counter

		this.mainUpdateInterval = this.adapter.setInterval(async () => {
			mainUpdateCount++;

			// --- Independent Polling Logic ---
			// 1. Check for Slow Tick (HomeData update)
			const isSlowTick = mainUpdateCount >= mainPollInterval;

			if (isSlowTick) {
				mainUpdateCount = 0;
				this.adapter.rLog("System", null, "Debug", undefined, undefined, "Running scheduled main device update...", "debug");
				await this.adapter.http_api.updateHomeData();
			}

			// 2. Poll Devices (Fast or Slow)
			const cloudDevices = this.adapter.http_api.getDevices();

			for (const device of cloudDevices) {
				const duid = device.duid;
				if (!device.online) continue;

				const handler = this.deviceFeatureHandlers.get(duid);
				if (!handler) continue;

				// Determine activity
				const lastState = this.lastStateCode.get(duid) || 0;
				const isActive = this.isActiveState(lastState);

				// Poll if:
				// a) Slow Tick (Base Interval)
				// b) Device is Active AND Fast Tick (every 2s)
				const isFastTick = (mainUpdateCount % 2 === 0);
				const shouldPoll = isSlowTick || (isActive && isFastTick);

				if (!shouldPoll) continue;

				try {
					// Update basic info only on slow tick (optional optimization)
					if (isSlowTick) {
						await this.adapter.updateDeviceInfo(duid, cloudDevices);
					}

					const version = await this.adapter.getDeviceProtocolVersion(duid);

					// Switch on version
					switch (version) {
						case "B01":
							await this.pollB01Device(handler, duid);
							break;
						case "A01":
							await this.pollA01Device(handler, duid);
							break;
						case "L01":
						case "1.0":
							await this.pollV1Device(handler, duid);
							break;
						default:
							this.adapter.rLog("System", duid, "Warn", version, undefined, "Unknown protocol version. Skipping poll.", "warn");
					}
				} catch (error: any) {
					this.adapter.catchError(error, "mainUpdateInterval", duid);
				}
			}
		}, 1000); // 1s ticker
	}

	/**
	 * Polling logic for B01 devices.
	 */
	private async pollB01Device(handler: BaseDeviceFeatures, duid: string): Promise<void> {
		// 1. Update Status (fast)
		await handler.updateStatus();

		// 2. Check State Transitions
		const currentState = await this.getDeviceState(duid);
		const lastState = this.lastStateCode.get(duid) || 0;
		const isActive = this.isActiveState(currentState);
		const wasActive = this.isActiveState(lastState);

		// Determine if we need to update the map (Active = polling map)
		if (isActive) {
			await handler.updateMap();
		}

		// Transition: Active -> Inactive
		if (wasActive && !isActive) {
			this.adapter.rLog("System", duid, "Info", "B01", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching B01 data...`, "info");

			// Trigger B01-specific data update
			await handler.initializeDeviceData();
			await handler.updateCleanSummary();
			await handler.updateMap();
		}

		// Update state tracker
		this.lastStateCode.set(duid, currentState);
	}

	/**
	 * Polling logic for A01 devices.
	 */
	private async pollA01Device(handler: BaseDeviceFeatures, duid: string): Promise<void> {
		// 1. Update Status (fast)
		await handler.updateStatus();

		// 2. Check State Transitions
		const currentState = await this.getDeviceState(duid);
		const lastState = this.lastStateCode.get(duid) || 0;
		const isActive = this.isActiveState(currentState);
		const wasActive = this.isActiveState(lastState);

		// Determine if we need to update the map (Active = polling map)
		if (isActive) {
			await handler.updateMap();
		}

		// Transition: Active -> Inactive
		if (wasActive && !isActive) {
			this.adapter.rLog("System", duid, "Info", "A01", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching full data...`, "info");

			// Trigger full update
			await handler.initializeDeviceData();
			await handler.updateCleanSummary();
			await handler.updateMap();
		}

		// Update state tracker
		this.lastStateCode.set(duid, currentState);
	}

	/**
	 * Polling logic for V1 (Legacy) devices.
	 */
	private async pollV1Device(handler: BaseDeviceFeatures, duid: string): Promise<void> {
		// 1. Update Status (fast)
		await handler.updateStatus();

		// Check Dock Type
		const dockTypeState = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.dock_type`);
		if (dockTypeState && dockTypeState.val !== null) {
			await handler.processDockType(Number(dockTypeState.val));
		}

		// 2. Check State Transitions
		const currentState = await this.getDeviceState(duid);
		const lastState = this.lastStateCode.get(duid) || 0;
		const isActive = this.isActiveState(currentState);
		const wasActive = this.isActiveState(lastState);

		// Determine if we need to update the map (Active = polling map)
		if (isActive) {
			await handler.updateMap();
		}

		// Transition: Active -> Inactive
		if (wasActive && !isActive) {
			this.adapter.rLog("System", duid, "Info", "1.0", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching full data...`, "info");

			// Trigger full update
			await handler.initializeDeviceData();
			await handler.updateCleanSummary();
			await handler.updateMap();
		}

		// Update state tracker
		this.lastStateCode.set(duid, currentState);
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
