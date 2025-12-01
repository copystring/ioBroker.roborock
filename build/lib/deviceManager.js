"use strict";
// src/lib/DeviceManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceManager = void 0;
// Import BaseDeviceFeatures as a value, not just a type
const baseDeviceFeatures_1 = require("./features/baseDeviceFeatures");
const fallbackFeatures_1 = require("./features/fallbackFeatures");
// Import indices to trigger decorators
// This ensures BaseDeviceFeatures.getRegisteredModelClass() works
require("./features/vacuum/index");
function createFeaturesForModel(adapter, duid, robotModel, productCategory) {
    adapter.log.debug(`[DeviceManager] Looking for feature handler for model: ${robotModel} (Category: ${productCategory})`);
    const dependencies = {
        adapter: adapter,
        config: adapter.config,
        http_api: adapter.http_api,
        ensureState: adapter.ensureState.bind(adapter),
        ensureFolder: adapter.ensureFolder.bind(adapter),
        log: adapter.log,
    };
    // This is the correct static method for your decorator pattern
    const ModelClass = baseDeviceFeatures_1.BaseDeviceFeatures.getRegisteredModelClass(robotModel);
    if (ModelClass) {
        adapter.log.debug(`[DeviceManager] Using specific feature handler for model: ${robotModel}`);
        // Pass dependencies and duid to the constructor
        return new ModelClass(dependencies, duid);
    }
    else {
        adapter.log.warn(`[DeviceManager] Model "${robotModel}" (Category: ${productCategory}) not registered. Using fallback.`);
        if (productCategory === "robot.vacuum.cleaner" || productCategory === "roborock.vacuum") {
            return new fallbackFeatures_1.FallbackVacuumFeatures(dependencies, duid, robotModel);
        }
        else {
            return new fallbackFeatures_1.FallbackBaseFeatures(dependencies, duid, robotModel);
        }
    }
}
class DeviceManager {
    adapter;
    // Use NodeJS.Timeout for intervals from adapter.setInterval
    mainUpdateInterval = undefined;
    deviceFeatureHandlers = new Map();
    constructor(adapter) {
        this.adapter = adapter;
    }
    /**
     * Initializes all devices found via the HTTP API.
     */
    async initializeDevices() {
        const devices = this.adapter.http_api.getDevices();
        this.adapter.log.info(`[DeviceManager] Initializing ${devices.length} devices...`);
        const initPromises = [];
        for (const device of devices) {
            const duid = device.duid;
            const initTask = async () => {
                try {
                    const model = this.adapter.http_api.getRobotModel(duid);
                    const category = this.adapter.http_api.getProductCategory(duid);
                    // Ensure model is present before proceeding
                    if (!model) {
                        this.adapter.log.warn(`[DeviceManager] Could not find model for duid ${duid}. Skipping init.`);
                        return;
                    }
                    const handler = createFeaturesForModel(this.adapter, duid, model, category);
                    // Store the handler instance
                    this.deviceFeatureHandlers.set(duid, handler);
                    await this.adapter.setObjectNotExistsAsync(`Devices.${duid}`, {
                        type: "device",
                        common: {
                            name: device.name || duid, // Use cloud name or DUID
                            // Optional: Link the online status for ioBroker admin
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
                    // Apply static features (Model Specifics) immediately after device object creation
                    await handler.applyModelSpecifics();
                    if (!device.online) {
                        this.adapter.log.debug(`[DeviceManager] Device ${duid} is offline. Initializing features without runtime data.`);
                    }
                    // --- Initialization sequence ---
                    // 1. Get initial status (get_prop)
                    if (device.online) {
                        this.adapter.requestsHandler.getParameter(handler, duid, "get_prop", ["get_status"]);
                    }
                    // 2. Get firmware features
                    if (device.online) {
                        this.adapter.requestsHandler.getParameter(handler, duid, "get_fw_features");
                    }
                    // State should be updated after getStatus.
                    // Attempt to read 'dock_type' from state to handle dock features immediately.
                    const dockTypeState = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.dock_type`);
                    if (device.online && dockTypeState && dockTypeState.val !== null) {
                        await handler.processDockType(Number(dockTypeState.val));
                    }
                    // 5. Create all command objects for the device
                    await handler.createCommandObjects();
                    // 6. Initial Map Update & Other Data
                    if (device.online) {
                        await this.updateDeviceData(handler, duid);
                        await this.updateConsumablesPercent(duid);
                        this.adapter.requestsHandler.getMap(handler, duid);
                        // Fire cleaning summary immediately (background)
                        this.adapter.requestsHandler.getCleanSummary(handler, duid);
                    }
                    handler.printSummary();
                }
                catch (error) {
                    this.adapter.log.warn(`[DeviceManager] Failed initial poll for ${duid}: ${error.message}`);
                }
            };
            initPromises.push(initTask());
        }
        await Promise.all(initPromises);
        // Wait for all startup requests to finish
        await this.adapter.requestsHandler.waitForStartup();
        this.adapter.log.info("[DeviceManager] All devices initialized.");
        // Cleanup orphaned devices (devices present in ioBroker but not in cloud account)
        await this.cleanupOrphanedDevices(devices.map((d) => d.duid));
    }
    /**
     * Removes device folders for devices that are no longer in the cloud account.
     */
    async cleanupOrphanedDevices(activeDuids) {
        const activeDuidSet = new Set(activeDuids);
        const namespace = this.adapter.namespace;
        try {
            // Get all objects in the adapter namespace
            const allObjects = await this.adapter.getAdapterObjectsAsync();
            const deviceFolders = Object.keys(allObjects).filter((id) => id.startsWith(`${namespace}.Devices.`) && id.split(".").length === 4);
            for (const folderId of deviceFolders) {
                const duid = folderId.split(".").pop();
                if (duid && !activeDuidSet.has(duid)) {
                    this.adapter.log.info(`[DeviceManager] Deleting orphaned device folder: ${folderId}`);
                    await this.adapter.delObjectAsync(folderId, { recursive: true });
                }
            }
        }
        catch (error) {
            this.adapter.log.error(`[DeviceManager] Failed to cleanup orphaned devices: ${error.message}`);
        }
    }
    // Track previous cleaning state to detect completion
    lastCleaningState = new Map();
    /**
     * Starts the polling loops.
     */
    startPolling() {
        const mainPollInterval = this.adapter.config.updateInterval; // e.g., 60 seconds
        const fastMapPollInterval = 1; // e.g., 1 second for live map
        this.adapter.log.info(`[DeviceManager] Starting main poll (every ${mainPollInterval}s) and fast map poll (every ${fastMapPollInterval}s during cleaning)`);
        let mainUpdateCount = mainPollInterval; // Counter for slow loop (run immediately on first tick)
        let mapUpdateCount = 0; // Counter for fast loop
        this.mainUpdateInterval = this.adapter.setInterval(async () => {
            mainUpdateCount++;
            mapUpdateCount++;
            if (mapUpdateCount >= fastMapPollInterval) {
                mapUpdateCount = 0;
                const allDevices = this.adapter.http_api.getDevices();
                for (const device of allDevices) {
                    const duid = device.duid;
                    const isCleaning = await this.adapter.requestsHandler.isCleaning(duid);
                    const wasCleaning = this.lastCleaningState.get(duid) || false;
                    // Detect cleaning completion (True -> False transition)
                    if (wasCleaning && !isCleaning) {
                        this.adapter.log.info(`[DeviceManager] Cleaning finished for ${duid}. Fetching clean summary...`);
                        const handler = this.deviceFeatureHandlers.get(duid);
                        if (handler) {
                            this.adapter.requestsHandler.getCleanSummary(handler, duid).catch((e) => {
                                this.adapter.log.error(`[DeviceManager] Failed to fetch clean summary after cleaning: ${e}`);
                            });
                        }
                    }
                    // Update state tracker
                    this.lastCleaningState.set(duid, isCleaning);
                    if (device.online && isCleaning) {
                        const handler = this.deviceFeatureHandlers.get(duid);
                        if (!handler)
                            continue;
                        try {
                            this.adapter.log.debug(`[DeviceManager] Fast map update for cleaning device ${duid}`);
                            await this.adapter.requestsHandler.getMap(handler, duid);
                        }
                        catch (e) {
                            this.adapter.catchError(e, "fastMapUpdate", duid);
                        }
                    }
                }
            }
            // --- SLOW MAIN LOOP ---
            if (mainUpdateCount >= mainPollInterval) {
                mainUpdateCount = 0;
                this.adapter.log.debug("[DeviceManager] Running scheduled main device update...");
                await this.adapter.http_api.updateHomeData();
                const cloudDevices = this.adapter.http_api.getDevices();
                for (const device of cloudDevices) {
                    const duid = device.duid;
                    if (!device.online) {
                        this.adapter.log.debug(`[DeviceManager] Device ${duid} is offline. Skipping poll.`);
                        continue;
                    }
                    const handler = this.deviceFeatureHandlers.get(duid);
                    if (!handler)
                        continue;
                    try {
                        await this.adapter.updateDeviceInfo(duid, cloudDevices);
                        const version = await this.adapter.getDeviceProtocolVersion(duid);
                        if (version === "A01") {
                            await this.adapter.requestsHandler.getStatus(handler, duid);
                        }
                        else {
                            await this.adapter.requestsHandler.getStatus(handler, duid);
                            const dockTypeState = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.dock_type`);
                            if (dockTypeState && dockTypeState.val !== null) {
                                // We can't easily reconstruct the full status object for detectAndApplyRuntimeFeatures without reading all states.
                                // For now, let's assume runtime features are static enough or handled elsewhere.
                                // But we MUST handle dock_type.
                                await handler.processDockType(Number(dockTypeState.val));
                            }
                            // Update cleaning status and map if cleaning
                            if (await this.adapter.requestsHandler.isCleaning(duid)) {
                                this.updateDeviceData(handler, duid);
                                this.updateConsumablesPercent(duid);
                                await this.adapter.requestsHandler.getCleanSummary(handler, duid);
                            }
                        }
                    }
                    catch (error) {
                        this.adapter.catchError(error, "mainUpdateInterval", duid);
                    }
                }
            }
        }, 1000); // 1-second ticker
    }
    /**
     * Stops the polling interval.
     */
    stopPolling() {
        if (this.mainUpdateInterval) {
            // Cast to 'any' to satisfy ioBroker's specific interval type
            this.adapter.clearInterval(this.mainUpdateInterval);
            this.mainUpdateInterval = undefined;
        }
    }
    /**
     * Fetches non-status data (consumables, timers, etc.) for a device.
     */
    async updateDeviceData(handler, duid) {
        const robotModel = this.adapter.http_api.getRobotModel(duid);
        // Common requests
        const requestList = ["get_fw_features", "get_multi_maps_list", "get_room_mapping", "get_consumable", "get_server_timer", "get_timer", "get_network_info"];
        const promises = [];
        for (const request of requestList) {
            promises.push(this.adapter.requestsHandler.getParameter(handler, duid, request, []).catch(() => { }));
        }
        await Promise.all(promises);
        await this.adapter.checkForNewFirmware(duid);
        // Model-specific requests
        switch (robotModel) {
            case "roborock.vacuum.s4":
            case "roborock.vacuum.s5":
            case "roborock.vacuum.s5e":
            case "roborock.vacuum.a08":
            case "roborock.vacuum.a10":
            case "roborock.vacuum.a40":
                // No extra params needed
                break;
            case "roborock.vacuum.s6":
            case "roborock.vacuum.a72":
                this.adapter.requestsHandler.getParameter(handler, duid, "get_carpet_mode", []).catch(() => { });
                break;
            case "roborock.vacuum.a27":
                this.adapter.requestsHandler.getParameter(handler, duid, "get_dust_collection_switch_status", {}).catch(() => { });
                this.adapter.requestsHandler.getParameter(handler, duid, "get_wash_towel_mode", {}).catch(() => { });
                this.adapter.requestsHandler.getParameter(handler, duid, "get_smart_wash_params", {}).catch(() => { });
                this.adapter.requestsHandler.getParameter(handler, duid, "app_get_dryer_setting", {}).catch(() => { });
                break;
            default:
                // Assume newer models, try to get all
                this.adapter.requestsHandler.getParameter(handler, duid, "get_carpet_mode", []).catch(() => { });
                this.adapter.requestsHandler.getParameter(handler, duid, "get_carpet_clean_mode", []).catch(() => { });
                this.adapter.requestsHandler.getParameter(handler, duid, "get_water_box_custom_mode", []).catch(() => { });
        }
    }
    /**
     * Fetches consumable percentages from cloud data.
     */
    async updateConsumablesPercent(duid) {
        const handler = this.deviceFeatureHandlers.get(duid);
        if (!handler)
            return;
        const device = this.adapter.http_api.getDevices().find((d) => d.duid === duid);
        if (!device?.deviceStatus)
            return; // 'deviceStatus' exists on our fixed Device type
        const status = device.deviceStatus;
        const consumableMap = {
            "125": "main_brush_life",
            "126": "side_brush_life",
            "127": "filter_life",
        };
        for (const [attribute, value] of Object.entries(status)) {
            // 125, 126, 127 are cloud-provided consumable percentages
            if (attribute === "125" || attribute === "126" || attribute === "127") {
                const val = value >= 0 && value <= 100 ? value : 0;
                const mappedName = consumableMap[attribute];
                const common = handler.getCommonConsumable(mappedName); // Use mapped name for common def
                await this.adapter.ensureState(`Devices.${duid}.consumables.${mappedName}`, common || {});
                await this.adapter.setStateChangedAsync(`Devices.${duid}.consumables.${mappedName}`, { val, ack: true });
            }
        }
    }
}
exports.DeviceManager = DeviceManager;
//# sourceMappingURL=deviceManager.js.map