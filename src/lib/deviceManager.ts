// src/lib/DeviceManager.ts

import type { Roborock } from "../main";
// Import BaseDeviceFeatures value
import { BaseDeviceFeatures, FeatureDependencies } from "./features/baseDeviceFeatures";
import { FallbackBaseFeatures, FallbackVacuumFeatures } from "./features/fallbackFeatures";
import { DEFAULT_PROFILE, VacuumProfile } from "./features/vacuum/v1VacuumFeatures";

import { ProductHelper } from "./productHelper";
import { Feature } from "./features/features.enum";
import { getB01VariantFromModel } from "./b01Variant";

// Import indices to trigger decorators
import "./features/vacuum/index";

import { Q7VacuumFeatures } from "./features/vacuum/b01/Q7VacuumFeatures";
import { Q10VacuumFeatures } from "./features/vacuum/b01/Q10VacuumFeatures";
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

		if (Object.keys(fanMappings).length > 0 || Object.keys(mopMappings).length > 0 || Object.keys(waterMappings).length > 0 || Object.keys(errorMappings).length > 0 || Object.keys(stateMappings).length > 0) {
			dynamicProfile = {
				...DEFAULT_PROFILE,
				mappings: {
					fan_power: Object.keys(fanMappings).length > 0 ? fanMappings : DEFAULT_PROFILE.mappings.fan_power,
					mop_mode: Object.keys(mopMappings).length > 0 ? mopMappings : DEFAULT_PROFILE.mappings.mop_mode,
					water_box_mode: Object.keys(waterMappings).length > 0 ? waterMappings : DEFAULT_PROFILE.mappings.water_box_mode,
					error_code: Object.keys(errorMappings).length > 0 ? errorMappings : undefined,
					state: Object.keys(stateMappings).length > 0 ? stateMappings : undefined,
				}
			};
		}
	}

	// B01 Detection: Prioritize Protocol Version over Registered Model Class
	// This ensures that B01 devices always get the B01 feature handler, even if they share a model ID with a V1 device.
	if (protocolVersion === "B01") {
		const b01Variant = getB01VariantFromModel(robotModel);
		const HandlerClass = b01Variant === "Q10" ? Q10VacuumFeatures : Q7VacuumFeatures;
		const handler = new HandlerClass(dependencies, duid, robotModel, { staticFeatures: [] }, dynamicProfile);
		handler.protocolVersion = protocolVersion;
		return handler;
	}

	// Get registered model class (optional: only for model-specific overrides)
	const ModelClass = BaseDeviceFeatures.getRegisteredModelClass(robotModel);

	if (ModelClass) {
		// Specific model class registered – use it (e.g. custom profile/features)
		const handler = new ModelClass(dependencies, duid);
		handler.protocolVersion = protocolVersion;
		return handler;
	}

	// No model-specific class: auto-detect by category. Log once so users report unknown models for full support.
	const isVacuum = productCategory === "robot.vacuum.cleaner" || productCategory === "roborock.vacuum";
	if (isVacuum) {
		adapter.rLog("System", duid, "Info", undefined, undefined, `Model "${robotModel}" is not explicitly supported yet; using auto-detected vacuum features. If something is missing or wrong, please report your model (e.g. via GitHub Issues) so we can add full support with correct parameters.`, "info");
		const deducedFeatures = productInfo ? ProductHelper.deduceFeatures(productInfo, robotModel) : new Set<Feature>();
		const handler = new FallbackVacuumFeatures(dependencies, duid, robotModel, dynamicProfile, {
			staticFeatures: Array.from(deducedFeatures),
			autoDetected: true
		});
		handler.protocolVersion = protocolVersion;
		return handler;
	}

	// Unknown category: warn and use generic fallback
	adapter.rLog("System", duid, "Warn", undefined, undefined, `Model "${robotModel}" (Category: ${productCategory}) not registered. Using fallback (Protocol: ${protocolVersion || "Unknown"}).`, "warn");
	const handler = new FallbackBaseFeatures(dependencies, duid, robotModel);
	handler.protocolVersion = protocolVersion;
	return handler;
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
				} catch (error: unknown) {
					this.adapter.rLog("System", duid, "Warn", undefined, undefined, `Failed initial poll: ${this.adapter.errorMessage(error)}`, "warn");
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
			handler.updateCleanSummary().catch((e: unknown) => {
				this.adapter.log.warn(`Background summary update failed for ${(handler as any).duid}: ${this.adapter.errorMessage(e)}`);
			});
		}

		// Cleanup orphaned devices (non-blocking)
		this.cleanupOrphanedDevices(devices.map((d) => d.duid)).catch((e: unknown) => {
			this.adapter.rLog("System", null, "Warn", undefined, undefined, `Device cleanup failed: ${this.adapter.errorMessage(e)}`, "warn");
		});
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

			// Safety guard: NEVER delete all devices at once.
			// This covers the case where the cloud returns an empty list incorrectly.
			if (activeDuids.length === 0 && deviceFolders.length > 0) {
				this.adapter.rLog("System", null, "Warn", undefined, undefined, "Cleanup of orphaned devices blocked: API returned 0 devices, but local states exist. Mass deletion prevented.", "warn");
				return;
			}

			for (const folderId of deviceFolders) {
				const duid = folderId.split(".").pop();
				if (duid && !activeDuidSet.has(duid)) {
					this.adapter.rLog("System", duid, "Info", undefined, undefined, `Deleting orphaned device folder: ${folderId}`, "info");
					await this.adapter.delObjectAsync(folderId, { recursive: true });
				}
			}
		} catch (error: unknown) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `Failed to cleanup orphaned devices: ${this.adapter.errorMessage(error)}`, "error");
		}
	}

	// Track previous state
	private lastStateCode = new Map<string, number>();
	private skipPollUntilNextHomeData = new Set<string>(); // cleared each slow tick

	/**
	 * Get current state code. V1 uses deviceStatus.state, B01 uses deviceStatus.status.
	 */
	private async getDeviceState(duid: string): Promise<number> {
		const [state, status] = await Promise.all([
			this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.state`),
			this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.status`),
		]);
		const val = (state?.val != null ? state.val : status?.val) ?? 0;
		return Number(val);
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

	/** Parked/docked: fetch history only then (cloud has new record). 4 = docked, 8 = Charging, 100 = Fully Charged. */
	private isParkedState(stateCode: number): boolean {
		return stateCode === 4 || stateCode === 8 || stateCode === 100;
	}

	/** Starts polling. updateInterval (UI) drives everything except TCP; TCP keepalive is fixed 30s. */
	public startPolling(): void {
		const mainPollInterval = this.adapter.config.updateInterval; // e.g. 60s

		this.adapter.rLog("System", null, "Info", undefined, undefined, `Starting main poll (every ${mainPollInterval}s). Heavy data updates only after activity finishes.`, "info");

		let mainUpdateCount = mainPollInterval; // Slow loop counter

		this.mainUpdateInterval = this.adapter.setInterval(async () => {
			mainUpdateCount++;

			const isSlowTick = mainUpdateCount >= mainPollInterval;

			if (isSlowTick) {
				mainUpdateCount = 0;
				this.skipPollUntilNextHomeData.clear();
				this.adapter.rLog("System", null, "Debug", undefined, undefined, "Running scheduled main device update...", "debug");
				await this.adapter.http_api.updateHomeData();
			}

			const cloudDevices = this.adapter.http_api.getDevices();
			for (const device of cloudDevices) {
				const duid = device.duid;
				if (!device.online) continue;
				if (this.skipPollUntilNextHomeData.has(duid)) continue;

				const handler = this.deviceFeatureHandlers.get(duid);
				if (!handler) continue;

				const lastState = this.lastStateCode.get(duid) || 0;
				const isActive = this.isActiveState(lastState);
				const isFastTick = (mainUpdateCount % 2 === 0);
				const shouldPoll = isSlowTick || (isActive && isFastTick);

				if (!shouldPoll) continue;

				try {
					if (isSlowTick) {
						await this.adapter.updateDeviceInfo(duid, cloudDevices);
					}
					const version = await this.adapter.getDeviceProtocolVersion(duid);
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
				} catch (error: unknown) {
					this.adapter.catchError(error, "mainUpdateInterval", duid);
					this.skipPollUntilNextHomeData.add(duid);
				}
			}
		}, 1000); // 1s ticker
	}

	/** On state change: history only when parked (4/8/100) or idle→parked (3→4); else only map. */
	public async onDeviceStateChange(duid: string, newStateVal: number): Promise<void> {
		const handler = this.deviceFeatureHandlers.get(duid);
		if (!handler) return;

		const oldVal = this.lastStateCode.get(duid) ?? 0;
		const wasActive = this.isActiveState(oldVal);
		const isActive = this.isActiveState(newStateVal);
		const isParked = this.isParkedState(newStateVal);
		const wasIdle = oldVal === 3;
		this.lastStateCode.set(duid, newStateVal);

		if (wasActive && !isActive) {
			const version = (handler as any).protocolVersion || "?";
			if (isParked) {
				this.adapter.rLog("System", duid, "Info", version, undefined, `Activity finished (State ${oldVal} -> ${newStateVal}). Fetching history + map...`, "info");
				await handler.updateMap();
				await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
			} else {
				this.adapter.rLog("System", duid, "Info", version, undefined, `Activity finished (State ${oldVal} -> ${newStateVal}). Fetching map...`, "info");
				await handler.updateMap();
			}
		} else if (wasIdle && isParked) {
			const version = (handler as any).protocolVersion || "?";
			this.adapter.rLog("System", duid, "Info", version, undefined, `Idle -> Parked (State ${oldVal} -> ${newStateVal}). Fetching history + map...`, "info");
			await handler.updateMap();
			await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
		}
	}

	/**
	 * Polling logic for B01 devices.
	 */
	private async pollB01Device(handler: BaseDeviceFeatures, duid: string): Promise<void> {
		await handler.updateStatus();
		const currentState = await this.getDeviceState(duid);
		const lastState = this.lastStateCode.get(duid) || 0;
		const isActive = this.isActiveState(currentState);
		const wasActive = this.isActiveState(lastState);

		if (isActive) {
			await handler.updateMap();
		}

		if (wasActive && !isActive) {
			const isParked = this.isParkedState(currentState);
			if (isParked) {
				this.adapter.rLog("System", duid, "Info", "B01", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching history + map...`, "info");
				await handler.updateMap();
				await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
			} else {
				this.adapter.rLog("System", duid, "Info", "B01", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching map...`, "info");
				await handler.updateMap();
			}
		} else if (lastState === 3 && this.isParkedState(currentState)) {
			this.adapter.rLog("System", duid, "Info", "B01", undefined, `Idle -> Parked (State ${lastState} -> ${currentState}). Fetching history + map...`, "info");
			await handler.updateMap();
			await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
		}

		this.lastStateCode.set(duid, currentState);
	}

	/**
	 * Polling logic for A01 devices.
	 */
	private async pollA01Device(handler: BaseDeviceFeatures, duid: string): Promise<void> {
		await handler.updateStatus();
		const currentState = await this.getDeviceState(duid);
		const lastState = this.lastStateCode.get(duid) || 0;
		const isActive = this.isActiveState(currentState);
		const wasActive = this.isActiveState(lastState);

		if (isActive) {
			await handler.updateMap();
		}

		if (wasActive && !isActive) {
			const isParked = this.isParkedState(currentState);
			if (isParked) {
				this.adapter.rLog("System", duid, "Info", "A01", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching history + map...`, "info");
				await handler.updateMap();
				await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
			} else {
				this.adapter.rLog("System", duid, "Info", "A01", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching map...`, "info");
				await handler.updateMap();
			}
		} else if (lastState === 3 && this.isParkedState(currentState)) {
			this.adapter.rLog("System", duid, "Info", "A01", undefined, `Idle -> Parked (State ${lastState} -> ${currentState}). Fetching history + map...`, "info");
			await handler.updateMap();
			await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
		}

		this.lastStateCode.set(duid, currentState);
	}

	/**
	 * Polling logic for V1 (Legacy) devices.
	 */
	private async pollV1Device(handler: BaseDeviceFeatures, duid: string): Promise<void> {
		await handler.updateStatus();
		const currentState = await this.getDeviceState(duid);
		const lastState = this.lastStateCode.get(duid) || 0;
		const isActive = this.isActiveState(currentState);
		const wasActive = this.isActiveState(lastState);

		if (isActive) {
			await handler.updateMap();
		}

		if (wasActive && !isActive) {
			const isParked = this.isParkedState(currentState);
			if (isParked) {
				this.adapter.rLog("System", duid, "Info", "1.0", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching history + map...`, "info");
				await handler.updateMap();
				await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
			} else {
				this.adapter.rLog("System", duid, "Info", "1.0", undefined, `Activity finished (State ${lastState} -> ${currentState}). Fetching map...`, "info");
				await handler.updateMap();
			}
		} else if (lastState === 3 && this.isParkedState(currentState)) {
			this.adapter.rLog("System", duid, "Info", "1.0", undefined, `Idle -> Parked (State ${lastState} -> ${currentState}). Fetching history + map...`, "info");
			await handler.updateMap();
			await handler.updateCleanSummary().catch((e: unknown) => this.adapter.catchError(e, "updateCleanSummary", duid));
		}

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

		const devices = this.adapter.http_api.getDevices();

		const device = devices.find((d) => d.duid === duid);
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
