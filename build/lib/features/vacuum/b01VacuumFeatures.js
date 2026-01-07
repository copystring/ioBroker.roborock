"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B01VacuumFeatures = void 0;
const MapManager_1 = require("../../map/MapManager");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const vacuumConstants_1 = require("./vacuumConstants");
class B01VacuumFeatures extends baseDeviceFeatures_1.BaseDeviceFeatures {
    // B01-specific properties
    mapManager;
    mappedRooms = null;
    constructor(dependencies, duid, robotModel, config, profile // Accept profile to match legacy subclasses, but ignore it
    ) {
        super(dependencies, duid, robotModel, config);
        void profile;
        this.mapManager = new MapManager_1.MapManager(this.deps.adapter);
        this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Constructing B01VacuumFeatures for ${robotModel}`, "info");
    }
    // Override updateStatus to use strict B01 prop.get
    async setupProtocolFeatures() {
        this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, "Configuring B01 Command Set...", "debug");
        // 1. CLEAR all inherited base commands. B01 uses its own protocol.
        this.commands = {};
        // 2. Add properties for prop.get
        const properties = [
            "wind", "water", "clean_mode", "status", "error_code", "battery",
            "clean_time", "clean_area", "map_status", "dock_status", "water_box_level_off", "dust_collection_status"
        ];
        const propStates = {};
        properties.forEach(p => propStates[p] = p);
        this.addCommand("prop.get", {
            type: "string",
            role: "text",
            name: "Property Get",
            def: "status",
            states: propStates
        });
        // 3. Status Control (Buttons)
        this.addCommand("app_start", {
            type: "boolean",
            role: "button",
            name: this.deps.adapter.translations["app_start"] || "Start Cleaning",
            def: false
        });
        this.addCommand("app_pause", {
            type: "boolean",
            role: "button",
            name: this.deps.adapter.translations["app_pause"] || "Pause Cleaning",
            def: false
        });
        this.addCommand("app_stop", {
            type: "boolean",
            role: "button",
            name: this.deps.adapter.translations["app_stop"] || "Stop Cleaning",
            def: false
        });
        this.addCommand("app_charge", {
            type: "boolean",
            role: "button",
            name: this.deps.adapter.translations["app_charge"] || "Return to Dock",
            def: false
        });
        this.addCommand("find_me", {
            type: "boolean",
            role: "button",
            name: this.deps.adapter.translations["find_me"] || "Find Me",
            def: false
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
                4: "Max",
                5: "Max+"
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
        // 12. Update Map
        this.addCommand("update_map", {
            type: "boolean",
            role: "button",
            name: "Update Map",
            def: false
        });
        // 13. Consumable Resets (in resetConsumables folder)
        // We can't use addCommand easily for subfolders without modifying base class logic or hacking the key.
        // Instead, we will define them here but they won't automatically be created by createCommandObjects
        // if we don't add them to this.commands.
        // However, getCommandParams needs to intercept them.
        // Let's create these states manually later in createCommandObjects override or just here using ensureState?
        // Better: Override createCommandObjects or do it in initializeDeviceData?
        // Let's do it in initializeDeviceData to ensure they exist.
        // 14. Additional B01 Commands (Discovered in Sniffer)
        this.addCommand("child_lock", {
            type: "boolean",
            role: "switch",
            name: "Child Lock",
            def: false
        });
        this.addCommand("carpet_turbo", {
            type: "boolean",
            role: "switch",
            name: "Carpet Turbo (Boost)",
            def: false
        });
        this.addCommand("light_mode", {
            type: "boolean",
            role: "switch",
            name: "Button Lights",
            def: true
        });
        this.addCommand("green_laser", {
            type: "boolean",
            role: "switch",
            name: "Reactive AI / Obstacle Avoidance",
            def: true
        });
        this.addCommand("repeat_state", {
            type: "number",
            role: "value",
            name: "Repeat Cleaning",
            def: 0,
            states: { 0: "Off", 1: "On" } // Assuming 0/1 typical for repeat
        });
        // 10. Robot Mode (Verified in logs: 0=Vacuum, 1=Vac&Mop, 2=Mop)
        this.addCommand("mode", {
            type: "number",
            role: "value",
            name: "Robot Mode",
            def: 0,
            states: {
                0: "Vacuum",
                1: "Vacuum & Mop",
                2: "Mop"
            }
        });
        const cmds = Object.keys(this.commands);
        this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `B01 Protocol Enforced. Commands in memory: ${cmds.join(", ")}`, "info");
    }
    async createCommandObjects() {
        await super.createCommandObjects();
        // Create Reset Consumables Folder
        await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);
        const resets = {
            "reset_main_brush": "Reset Main Brush",
            "reset_side_brush": "Reset Side Brush",
            "reset_filter": "Reset Filter"
        };
        for (const [id, name] of Object.entries(resets)) {
            await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.${id}`, {
                name: name,
                type: "boolean",
                role: "button",
                def: false,
                read: false,
                write: true
            });
        }
    }
    /**
     * Allows feature handlers to provide/modify parameters for a command before sending.
     * B01 uses this to map individual command states to prop.set or service calls.
     */
    async getCommandParams(method, params) {
        // Intercept individual commands and route to prop.set or service
        // Removed "clean_path_preference" and "status" from generic list
        // Added "clean_path_preference" handler below
        if (["wind", "water", "mode",
            "child_lock", "carpet_turbo", "light_mode", "green_laser", "repeat_state"
        ].includes(method)) {
            return {
                method: "prop.set",
                params: { [method]: params }
            };
        }
        if (method === "clean_path_preference") {
            return {
                method: "service.set_preference_type",
                params: { "prefer_type": params }
            };
        }
        if (method === "find_me") {
            return {
                method: "service.find_device",
                params: {}
            };
        }
        if (method === "app_start") {
            return {
                method: "service.set_room_clean",
                params: { "clean_type": 0, "ctrl_value": 1, "room_ids": [] }
            };
        }
        if (method === "app_pause") {
            return {
                method: "service.set_room_clean",
                params: { "clean_type": 0, "ctrl_value": 2, "room_ids": [] }
            };
        }
        // User explicit mapping: app_stop -> stop_recharge
        if (method === "app_stop") {
            return {
                method: "service.stop_recharge",
                params: {}
            };
        }
        if (method === "app_charge") {
            return {
                method: "service.start_recharge",
                params: {}
            };
        }
        if (method === "update_map") {
            return {
                method: "service.upload_by_maptype",
                params: { "force": 1, "map_type": 0 }
            };
        }
        // Service calls
        // Explicit Consumable Resets
        if (method === "reset_main_brush") {
            return { method: "service.reset_consumable", params: { "consumable": 1 } };
        }
        if (method === "reset_side_brush") {
            return { method: "service.reset_consumable", params: { "consumable": 2 } };
        }
        if (method === "reset_filter") {
            return { method: "service.reset_consumable", params: { "consumable": 3 } };
        }
        return params;
    }
    async initializeDeviceData() {
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
    async updateRoomMapping() {
        if (!this.mappedRooms)
            return;
        await this.deps.ensureFolder(`Devices.${this.duid}.floors`);
        // B01 only supports single floor active mapping usually, or we treat it as "current_floor"
        // But for ioBroker structure we usually put rooms under "floors.cleanSegments" or similar?
        // V1 used "floors" and "rooms" in config?
        // Let's use a flat room list under "floors" like V1 did.
        // Create/Update Room States
        // We assume mappedRooms is [{ id: 10, name: "Living Room" }, ...]
        const rooms = this.mappedRooms;
        const roomFolder = `Devices.${this.duid}.floors`;
        const cleanSegmentsFolder = `${roomFolder}.cleanSegments`;
        await this.deps.ensureFolder(cleanSegmentsFolder);
        for (const room of rooms) {
            const roomID = room.id;
            const roomName = room.name || `Room ${roomID}`;
            const roomStateId = `${cleanSegmentsFolder}.${roomID}`;
            await this.deps.ensureState(roomStateId, {
                name: roomName,
                type: "boolean",
                role: "value",
                def: false,
                read: true,
                write: true
            });
        }
    }
    // Override updateStatus to use strict B01 prop.get
    async updateStatus() {
        const props = vacuumConstants_1.VACUUM_CONSTANTS.b01StatusProps;
        let resultObj;
        try {
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "prop.get", { property: props });
            if (Array.isArray(result) && result.length === props.length) {
                resultObj = {};
                props.forEach((key, index) => {
                    resultObj[key] = result[index];
                });
            }
            else if (typeof result === "object" && result !== null) {
                resultObj = result;
            }
            if (resultObj) {
                await this.processStatus(resultObj);
                // B01: Features are static/protocol-defined, skipping dynamic detection
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update status (B01): ${e.message}`, "warn");
        }
    }
    // Override updateConsumables to use strict B01 prop.get
    async updateConsumables(data) {
        let resultObj;
        if (data) {
            resultObj = data;
        }
        else {
            const props = vacuumConstants_1.VACUUM_CONSTANTS.b01SettingsProps;
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "prop.get", { property: props });
            if (Array.isArray(result) && result.length === props.length) {
                resultObj = {};
                props.forEach((key, index) => {
                    resultObj[key] = result[index];
                });
            }
            else if (typeof result === "object" && result !== null) {
                resultObj = result;
            }
        }
        if (resultObj) {
            await this.processConsumables(resultObj);
        }
    }
    // Override processStatus to apply B01 specific conversions (dm² to m²)
    async processStatus(resultObj) {
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
            const common = def ? { ...def } : { name: key, type: typeof val, role: "value", read: true, write: false };
            // Enrich with defaults if missing
            if (!common.name)
                common.name = key;
            if (!common.role)
                common.role = "value";
            if (common.read === undefined)
                common.read = true;
            if (common.write === undefined)
                common.write = false;
            // Manual Metadata Overrides for B01 specific fields
            if (key === "clean_finish") {
                common.name = "Clean Finish Timestamp";
                common.role = "value.time";
                common.unit = null; // Ensure no unit residue
            }
            else if (key === "cleaning_time" || key === "real_clean_time") {
                common.name = key === "cleaning_time" ? "Cleaning Time" : "Real Cleaning Time";
                common.role = "value.interval";
                common.unit = key === "cleaning_time" ? "min" : "s";
            }
            else if (key === "cleaning_area") {
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
                const numericVal = Number(val);
                val = isNaN(numericVal) ? 0 : numericVal;
            }
            else if (["cleaning_area", "cleaning_area", "last_clean_area"].includes(key)) {
                // B01 sends dm² (e.g. 2129 -> 21.29 m²)
                const numericVal = Number((val / 100).toFixed(2));
                val = isNaN(numericVal) ? 0 : numericVal;
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
    async updateMap() {
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
                resolve: (data) => {
                    this.deps.adapter.pendingRequests.delete(dummyId);
                    if (Buffer.isBuffer(data)) {
                        void this.processUpdateMapResponse(data);
                    }
                },
                reject: () => { }
            });
            this.deps.adapter.setTimeout(() => {
                if (this.deps.adapter.pendingRequests.has(dummyId)) {
                    this.deps.adapter.pendingRequests.delete(dummyId);
                }
            }, 15000);
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to trigger B01 map update: ${e.message}`, "warn");
        }
    }
    async updateCleanSummary() {
        try {
            const summaryRes = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_record_list", {}, { priority: -10 });
            if (summaryRes) {
                await this.processCleanSummary(summaryRes);
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update B01 clean summary: ${e.message}`, "warn");
        }
    }
    // Override getCleaningRecordMap to use B01 service call (upload_record_by_url)
    async getCleaningRecordMap(startTime, recordDetails) {
        try {
            const details = recordDetails;
            let url = details?.record_map_url || details?.url;
            if (!url && details?.detail) {
                const d = typeof details.detail === "string" ? JSON.parse(details.detail) : details.detail;
                url = d.record_map_url || d.url;
            }
            if (!url) {
                this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `No URL found in record details for B01 history map (startTime: ${startTime})`, "warn");
                return null;
            }
            const dummyId = -Math.floor(Math.random() * 1000000);
            const historyMapPromise = new Promise((resolve) => {
                this.deps.adapter.pendingRequests.set(dummyId, {
                    method: "get_clean_record_map",
                    duid: this.duid,
                    resolve: (data) => {
                        this.deps.adapter.pendingRequests.delete(dummyId);
                        void this.processHistoryMapResponse(data, resolve);
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
            }
            catch (e) {
                this.deps.adapter.pendingRequests.delete(dummyId);
                this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to trigger B01 history map upload: ${e.message}`, "warn");
                return null;
            }
            return historyMapPromise;
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to get cleaning record map (B01): ${e.message}`, "warn");
            return null;
        }
    }
    // Override processCleanSummary to handle B01 specific structure and avoid redundant requests
    async processCleanSummary(result) {
        try {
            // B01 result structure is { total_time, total_area, total_count, record_list: [ { url, detail: string }, ... ] }
            let sd = result;
            if (sd && sd.data) {
                sd = sd.data;
            }
            if (!sd || !sd.record_list) {
                this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "Invalid B01 clean summary format", "warn");
                return;
            }
            // Update Summary States
            await this.updateSummaryState("clean_time", sd.total_time);
            await this.updateSummaryState("clean_area", sd.total_area);
            await this.updateSummaryState("clean_count", sd.total_count);
            await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records`);
            const recordList = sd.record_list;
            const limit = 20;
            recordList.sort((a, b) => {
                const timeA = this.extractStartTime(a);
                const timeB = this.extractStartTime(b);
                return timeB - timeA;
            });
            for (let i = 0; i < Math.min(recordList.length, limit); i++) {
                const recordItem = recordList[i];
                let detail = null;
                try {
                    detail = typeof recordItem.detail === "string" ? JSON.parse(recordItem.detail) : recordItem.detail;
                }
                catch (e) {
                    this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Failed to parse record detail: ${e}`, "error");
                    continue;
                }
                if (!detail)
                    continue;
                const index = i;
                await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records.${index}`);
                await this.processRecordAttributes(index, detail);
                if (detail.record_map_url || detail.url || recordItem.url) {
                    await this.processRecordMap(index, detail, recordItem);
                }
            }
            const jsonSummary = {
                clean_time: Number((sd.total_time / 3600).toFixed(2)),
                clean_area: Number((sd.total_area / 1000000).toFixed(2)),
                clean_count: sd.total_count,
                records: recordList.map((r) => {
                    try {
                        return typeof r.detail === "string" ? JSON.parse(r.detail) : r.detail;
                    }
                    catch {
                        return null;
                    }
                }).filter((r) => r !== null)
            };
            await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.JSON`, { val: JSON.stringify(jsonSummary), ack: true });
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Error processing B01 clean summary: ${e.message}`, "error");
        }
    }
    async updateSummaryState(attr, value) {
        let val = value;
        if (attr === "clean_time") {
            val = Number((val / 3600).toFixed(2));
        }
        else if (attr === "clean_area") {
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
    extractStartTime(record) {
        try {
            const r = record;
            const detail = typeof r.detail === "string" ? JSON.parse(r.detail) : r.detail;
            return detail.record_start_time || detail.begin || 0;
        }
        catch {
            return 0;
        }
    }
    async processRecordAttributes(index, detail) {
        for (const key in detail) {
            const val = detail[key];
            const mappedKey = B01VacuumFeatures.MAPPED_CLEAN_SUMMARY[key] || key;
            // Simple type mapping
            const type = typeof val;
            if (type !== "string" && type !== "number" && type !== "boolean")
                continue;
            await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, {
                name: mappedKey,
                type: type,
                role: "value",
                read: true,
                write: false
            });
            await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, { val: val, ack: true });
        }
    }
    async detectAndApplyRuntimeFeatures(statusData) {
        // B01 features are statically defined, parameter unused but required by signature
        void statusData;
        return false;
    }
    getDynamicFeatures() {
        return new Set(); // B01 does not use bitfield feature flags
    }
    async processDockType(dockType) {
        // B01 dock features are handled via static command definitions, parameter unused but required by signature
        void dockType;
    }
    getCommonDeviceStates(attribute) {
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
                    105: "Off",
                    5: "Max+"
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
        // 10. Robot Mode
        if (attribute === "mode") {
            return {
                type: "number",
                states: {
                    0: "Vacuum",
                    1: "Vacuum & Mop",
                    2: "Mop"
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
    async updateNetworkInfo() {
        try {
            // B01: Request via service.get_net_info? Or just rely on prop.get("net_status")?
            // prop.get "net_status" usually just gives connected state.
            // Let's try service.get_network_info first as it's common.
            const res = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_net_info", {});
            if (!res)
                return;
            // Typically returns { ssid, ip, mac, rssi... }
            const info = Array.isArray(res) ? res[0] : res;
            if (!info)
                return;
            await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
            for (const key in info) {
                await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${key}`, {
                    name: key,
                    type: typeof info[key],
                    read: true,
                    write: false
                });
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.networkInfo.${key}`, { val: info[key], ack: true });
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update network info: ${e.message}`, "warn");
        }
    }
    async processConsumables(resultObj) {
        await this.deps.ensureFolder(`Devices.${this.duid}.consumables`);
        await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);
        // Process Net Status if present (B01)
        if (resultObj.net_status) {
            await this.processNetworkInfo(resultObj.net_status);
        }
        // Process other B01 settings
        const settingsToProcess = ["volume", "voice_type", "light_mode", "child_lock", "sound", "charge_station_type", "dust_auto_state"];
        for (const key of settingsToProcess) {
            if (resultObj[key] !== undefined) {
                const type = resultObj[key] === null ? "mixed" : typeof resultObj[key];
                await this.deps.ensureState(`Devices.${this.duid}.deviceStatus.${key}`, {
                    name: key,
                    type: type,
                    role: "value",
                    write: false
                });
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.deviceStatus.${key}`, { val: resultObj[key], ack: true });
            }
        }
        for (const key in resultObj) {
            const val = resultObj[key];
            if (key === "net_status" || settingsToProcess.includes(key))
                continue;
            const common = this.getCommonDeviceStates(key) || { name: key, type: typeof val, role: "value", write: false };
            // Check for specific consumables
            if (["main_brush_work_time", "side_brush_work_time", "filter_work_time", "filter_element_work_time", "sensor_dirty_time"].includes(key)) {
                const deviceName = key.replace("_work_time", "").replace("_dirty_time", "");
                await this.deps.ensureState(`Devices.${this.duid}.consumables.${deviceName}`, { ...common, unit: "%" });
                const totalTime = this.getConsumableLifeSpan(deviceName) * 3600;
                if (totalTime > 0) {
                    const percent = Math.round(100 - (val / totalTime) * 100);
                    await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${deviceName}`, { val: percent, ack: true });
                }
            }
            else {
                await this.deps.ensureState(`Devices.${this.duid}.consumables.${key}`, common);
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${key}`, { val: val, ack: true });
            }
            if (key.endsWith("_work_time") || key.endsWith("_dirty_time")) {
                const resetKey = key.replace("_work_time", "").replace("_dirty_time", "");
                await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.${resetKey}`, { name: `Reset ${resetKey}`, type: "boolean", role: "button", write: true, def: false });
            }
        }
    }
    async processNetworkInfo(data) {
        if (!data || typeof data !== "object")
            return;
        const info = data;
        await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
        const mapping = {
            ssid: "ssid",
            ip: "ip",
            mac: "mac",
            bssid: "bssid",
            rssi: "rssi",
            frequency: "frequency" // Not standard but useful
        };
        for (const [key, stateName] of Object.entries(mapping)) {
            if (info[key] !== undefined) {
                const val = info[key];
                const common = {
                    name: stateName,
                    type: typeof val === "number" ? "number" : "string",
                    role: key === "rssi" ? "value.rssi" : "info",
                    read: true,
                    write: false
                };
                await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${stateName}`, common);
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.networkInfo.${stateName}`, { val: val, ack: true });
            }
        }
    }
    getConsumableLifeSpan(deviceName) {
        switch (deviceName) {
            case "main_brush": return 300;
            case "side_brush": return 200;
            case "filter":
            case "filter_element": return 150;
            case "sensor": return 30;
            default: return 0;
        }
    }
    async processUpdateMapResponse(data) {
        try {
            const device = this.deps.adapter.http_api.getDevices().find(d => d.duid === this.duid);
            const sn = device?.sn || this.duid;
            const res = await this.mapManager.processMap(data, "B01", this.robotModel, sn, this.mappedRooms, this.duid, "MQTT");
            if (!res)
                return;
            const { mapBase64, mapBase64Truncated, mapData } = res;
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
            // Update internal room mapping from map data
            if (mapData.rooms) {
                this.mappedRooms = mapData.rooms;
                await this.updateRoomMapping();
            }
        }
        catch (err) {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to process B01 map: ${err.message}`, "error");
        }
    }
    async processRecordMap(index, detail, recordItem) {
        const startTime = detail.record_start_time || detail.begin;
        const mapRes = await this.getCleaningRecordMap(startTime, recordItem);
        if (!mapRes)
            return;
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
    async updateDockingStationStatus(dss) {
        // Guard: Feature must be active
        if (!this.appliedFeatures.has(features_enum_1.Feature.DockingStationStatus)) {
            return;
        }
        // Parse 2-bit status fields
        const status = {
            cleanFluidStatus: (dss >> 10) & 0b11, // Bits 10-11: Clean water tank status
            waterBoxFilterStatus: (dss >> 8) & 0b11, // Bits 8-9: Water box filter
            dustBagStatus: (dss >> 6) & 0b11, // Bits 6-7: Dust bag (Staubbeutel)
            dirtyWaterBoxStatus: (dss >> 4) & 0b11, // Bits 4-5: Dirty water tank
            clearWaterBoxStatus: (dss >> 2) & 0b11, // Bits 2-3: Clear water box
            isUpdownWaterReady: dss & 0b11, // Bits 0-1: Water ready status
        };
        for (const [name, val] of Object.entries(status)) {
            await this.deps.adapter.setStateChanged(`Devices.${this.duid}.dockingStationStatus.${name}`, { val: val, ack: true });
        }
    }
    static MAPPED_CLEAN_SUMMARY = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records", record_list: "records" };
    getCommonConsumable(attribute) {
        return vacuumConstants_1.VACUUM_CONSTANTS.consumables[attribute];
    }
    isResetableConsumable(consumable) {
        return vacuumConstants_1.VACUUM_CONSTANTS.resetConsumables.has(consumable);
    }
    getCommonCleaningInfo(attribute) {
        return vacuumConstants_1.VACUUM_CONSTANTS.cleaningInfo[attribute];
    }
    getCommonCleaningRecords(attribute) {
        const spec = vacuumConstants_1.VACUUM_CONSTANTS.cleaningRecords[attribute];
        return spec;
    }
    getFirmwareFeatureName(featureID) {
        const name = vacuumConstants_1.VACUUM_CONSTANTS.firmwareFeatures[featureID];
        return name || `FeatureID_${featureID}`;
    }
    async processHistoryMapResponse(data, resolve) {
        if (!Buffer.isBuffer(data)) {
            resolve(null);
            return;
        }
        try {
            const devices = this.deps.adapter.http_api.getDevices();
            const device = devices.find((d) => d.duid === this.duid);
            const serial = device?.sn || this.duid;
            const mapRes = await this.deps.adapter.mapManager.processMap(data, "B01", this.robotModel, serial, null, this.duid, "B01History");
            if (mapRes) {
                resolve({
                    mapBase64CleanUncropped: mapRes.mapBase64Clean || mapRes.mapBase64,
                    mapBase64: mapRes.mapBase64,
                    mapBase64Truncated: mapRes.mapBase64Clean || mapRes.mapBase64,
                    mapData: JSON.stringify(mapRes.mapData),
                });
            }
            else {
                this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "B01 History Map processing returned null.", "warn");
                resolve(null);
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Failed to process B01 history map: ${e.message}`, "error");
            resolve(null);
        }
    }
}
exports.B01VacuumFeatures = B01VacuumFeatures;
//# sourceMappingURL=b01VacuumFeatures.js.map