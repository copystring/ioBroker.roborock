"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.device_features = void 0;
const errorCodes = {
    0: "No error",
    1: "Laser sensor fault",
    2: "Collision sensor fault",
    3: "Wheel floating",
    4: "Cliff sensor fault",
    5: "Main brush blocked",
    6: "Side brush blocked",
    7: "Wheel blocked",
    8: "Device stuck",
    9: "Dust bin missing",
    10: "Filter blocked",
    11: "Magnetic field detected",
    12: "Low battery",
    13: "Charging problem",
    14: "Battery failure",
    15: "Wall sensor fault",
    16: "Uneven surface",
    17: "Side brush failure",
    18: "Suction fan failure",
    19: "Unpowered charging station",
    20: "Unknown Error",
    21: "Laser pressure sensor problem",
    22: "Charge sensor problem",
    23: "Dock problem",
    24: "No-go zone or invisible wall detected",
    254: "Bin full",
    255: "Internal error",
    "-1": "Unknown Error",
};
const stateCodes = {
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
    22: "Emptying dust container",
    23: "Washing the mop",
    26: "Going to wash the mop",
    28: "In call",
    29: "Mapping",
    100: "Fully Charged",
};
const dockTypes = {
    0: "Charging dock",
    1: "Auto-Empty Dock",
    2: "Empty Wash Fill Dock",
    3: "Empty Wash Fill (Dry) Dock",
    5: "Auto-Empty Dock (Q8 Max+)",
    7: "Empty Wash Fill Dry Dock (S8 Pro Ultra)",
    8: "Empty Wash Fill Dry Dock (Q Revo)",
    9: "Empty Wash Fill Dry Dock (Q Revo Pro)",
};
const firmwareFeatures = {
    111: "isSupportFDSEndPoint",
    112: "isSupportAutoSplitSegments",
    114: "isSupportOrderSegmentClean",
    116: "isMapSegmentSupported",
    119: "isSupportLedStatusSwitch",
    120: "isMultiFloorSupported",
    122: "isSupportFetchTimerSummary",
    123: "isOrderCleanSupported",
    125: "isRemoteSupported",
};
const commands = {
    app_start: { type: "boolean", def: false },
    app_segment_clean: { type: "boolean", def: false },
    app_stop: { type: "boolean", def: false },
    app_pause: { type: "boolean", def: false },
    app_charge: { type: "boolean", def: false },
    app_spot: { type: "boolean", def: false },
    app_zoned_clean: { type: "json" },
    resume_zoned_clean: { type: "boolean", def: false },
    stop_zoned_clean: { type: "boolean", def: false },
    resume_segment_clean: { type: "boolean", def: false },
    stop_segment_clean: { type: "boolean", def: false },
    set_custom_mode: { type: "number", def: 102, states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off" } },
    find_me: { type: "boolean", def: false },
    app_goto_target: { type: "json" },
};
const deviceStates = {
    dock_type: { states: dockTypes },
    error_code: { states: errorCodes },
    clean_area: { unit: "m²" },
    clean_time: { unit: "min" },
    battery: { unit: "%" },
    state: { states: stateCodes },
    fan_power: { states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off" } },
    clean_percent: { unit: "%" },
    water_box_custom_mode: { states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" } },
    water_box_mode: { type: "number", states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" } },
    mop_mode: { states: { 300: "Standard", 301: "Deep", 303: "Deep+", 304: "Fast" } },
    carpet_mode: {
        states: {
            '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': "off",
            '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': "on",
        },
    },
    carpet_clean_mode: {
        states: {
            '{"carpet_clean_mode":0}': "Avoid",
            '{"carpet_clean_mode":1}': "Rise",
            '{"carpet_clean_mode":2}': "Ignore",
        },
    },
};
const consumables = {
    main_brush_work_time: { unit: "h" },
    side_brush_work_time: { unit: "h" },
    filter_work_time: { unit: "h" },
    filter_element_work_time: { unit: "h" },
    sensor_dirty_time: { unit: "h" },
    125: { unit: "%" },
    126: { unit: "%" },
    127: { unit: "%" },
    main_brush_life: { unit: "%" },
    side_brush_life: { unit: "%" },
    filter_life: { unit: "%" },
};
const resetConsumables = [
    "main_brush_work_time",
    "side_brush_work_time",
    "filter_work_time",
    "filter_element_work_time",
    "sensor_dirty_time",
    "dust_collection_work_times",
    "strainer_work_times",
    "cleaning_brush_work_times",
];
const cleaningRecords = {
    2: { unit: "min" },
    3: { unit: "m²" },
    duration: { unit: "min" },
    area: { unit: "m²" },
    cleaned_area: { unit: "m²" },
};
const cleaningInfo = {
    0: { unit: "h" },
    1: { unit: "m²" },
    clean_time: { unit: "h" },
    clean_area: { unit: "m²" },
};
const actions = {
    set_custom_mode_max_plus: () => {
        commands.set_custom_mode.states[108] = "Max+";
    },
    addSmartModeCommand: () => {
        commands.app_set_clean_sequence_type = {
            type: "json",
            def: '{\"fan_power\":110,\"mop_mode\":306,\"type\":0,\"water_box_mode\":209}',
            states: {
                '{\"fan_power\":102,\"mop_mode\":300,\"repeat\":1,\"type\":1,\"water_box_mode\":201}': "Mop and vacuum",
                '{\"fan_power\":110,\"mop_mode\":306,\"type\":0,\"water_box_mode\":209}': "Smart mode",
            },
        };
    }
};
class device_features {
    adapter;
    cleaningInfo;
    cleaningRecords;
    constructor(adapter) {
        this.adapter = adapter;
        this.cleaningInfo = {};
        this.cleaningRecords = {};
    }
    getCommonCommand(command) {
        return commands[command];
    }
    /**
     * @param {string | number} attribute
     */
    getCommonDeviceStates(attribute) {
        return deviceStates[attribute];
    }
    /**
     * @param {string | number} attribute
     */
    getCommonCleaningRecords(attribute) {
        return cleaningRecords[attribute];
    }
    /**
     * @param {string | number} attribute
     */
    getCommonCleaningInfo(attribute) {
        return cleaningInfo[attribute];
    }
    /**
     * @param {string} consumable
     */
    isResetableConsumable(consumable) {
        return resetConsumables.includes(consumable);
    }
    isWashThenChargeCmdSupported() {
        commands.app_start_wash = { type: "boolean", def: false };
        commands.app_stop_wash = { type: "boolean", def: false };
        commands.set_wash_towel_mode = {
            type: "json",
            def: '{"wash_mode":2}',
            states: {
                '{"wash_mode":0}': "Eco",
                '{"wash_mode":1}': "Medium",
                '{"wash_mode":2}': "Intense",
            },
        };
        commands.set_smart_wash_params = {
            type: "json",
            def: '{"smart_wash":0,"wash_interval":1800}',
            states: {
                '{"smart_wash":0,"wash_interval":600}': "10 Min",
                '{"smart_wash":0,"wash_interval":900}': "15 Min",
                '{"smart_wash":0,"wash_interval":1200}': "20 Min",
                '{"smart_wash":0,"wash_interval":1500}': "25 Min",
                '{"smart_wash":0,"wash_interval":1800}': "30 Min",
                '{"smart_wash":0,"wash_interval":2100}': "35 Min",
                '{"smart_wash":0,"wash_interval":2400}': "40 Min",
                '{"smart_wash":0,"wash_interval":2700}': "45 Min",
                '{"smart_wash":0,"wash_interval":3000}': "50 Min",
                '{"smart_wash":1,"wash_interval":1200}': "Per room",
            },
        };
    }
    isDustCollectionSettingSupported() {
        commands.app_start_collect_dust = { type: "boolean", def: false };
        commands.app_stop_collect_dust = { type: "boolean", def: false };
        commands.set_dust_collection_switch_status = { type: "json", def: '{"status":1}', states: { '{"status":0}': "Off", '{"status":1}': "On" } };
        commands.set_dust_collection_mode = {
            type: "json",
            def: '{"mode":0}',
            states: {
                '{"mode":0}': "Smart",
                '{"mode":1}': "Low",
                '{"mode":2}': "Medium",
                '{"mode":4}': "Max",
            },
        };
    }
    isSupportedDrying() {
        commands.app_set_dryer_status = { type: "string", def: '{"status": 0}', states: { '{"status": 1}': "On", '{"status": 0}': "Off" } };
        commands.app_set_dryer_setting = {
            type: "json",
            def: '{"on":{"dry_time":10800},"status":0}',
            states: {
                '{"on":{"dry_time":10800},"status":0}': "Off",
                '{"on":{"dry_time":7200},"status":1}': "2h",
                '{"on":{"dry_time":10800},"status":1}': "3h",
                '{"on":{"dry_time":14400},"status":1}': "4h",
            },
        };
    }
    isSupportedWaterMode() {
        commands.set_mop_mode = { type: "number", def: 300, states: { 300: "Standard", 301: "Deep", 303: "Deep+" } };
        commands.set_water_box_custom_mode = { type: "number", def: 201, states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" } };
    }
    isShakeMopSetSupported() {
        // this.isSupportedWaterMode(); // can not use this for isSupportedWaterMode().
        // nothing for now
    }
    isElectronicWaterBoxSupported() {
        this.isSupportedWaterMode();
    }
    isCarpetSupported() {
        // nothing for now
    }
    isCleanRouteFastModeSupported() {
        commands.set_mop_mode = { type: "number", def: 300, states: { 300: "Standard", 301: "Deep", 303: "Deep+", 304: "Fast" } };
    }
    isAvoidCollisionSupported() {
        // nothing for now
    }
    isCornerCleanModeSupported() {
        // nothing for now
    }
    isCameraSupported() {
        // nothing for now
    }
    isVideoLiveCallSupported(duid) {
        const ip = this.adapter.config.hostname_ip;
        const streamTypes = {
            stream_html: `http://${ip}:1984/stream.html?src=${duid}`,
            webrtc_html: `http://${ip}:1984/webrtc.html?src=${duid}&media=video`,
            stream_mp4: `http://${ip}:1984/api/stream.mp4?src=${duid}`,
            rtsp: `rtsp://${ip}:8554/${duid}?video`,
        };
        for (const [name, stream_uri] of Object.entries(streamTypes)) {
            const folder = `Devices.${duid}.camera`;
            this.adapter.ensureFolder(folder);
            this.adapter.setObjectAsync(`${folder}.${name}`, {
                type: "state",
                common: {
                    name: name,
                    type: "string",
                    role: "value",
                    read: true,
                    write: false,
                    def: stream_uri,
                },
                native: {},
            });
        }
    }
    isVoiceControlSupported() {
        // nothing for now
    }
    isSupportSetSwitchMapMode() {
        // nothing for now
    }
    isMopForbiddenSupported() {
        // nothing for now
    }
    isShakeMopStrengthSupported() {
        this.isSupportedWaterMode();
    }
    isWaterBoxSupported() {
        // nothing for now
    }
    isCustomWaterBoxDistanceSupported(duid) {
        // in this special case, create the command directly instead of the usual way
        this.adapter.setObjectAsync(`Devices.${duid}.commands.set_water_box_distance_off`, {
            type: "state",
            common: {
                name: this.adapter.translations.set_water_box_distance_off,
                type: "number",
                role: "value",
                read: true,
                write: true,
                def: 1,
                min: 1,
                max: 30,
            },
            native: {},
        });
    }
    isBackChargeAutoWashSupported() {
        // this means the robot can stay reversed into the dock and still charge
        // nothing for now
    }
    isAvoidCarpetSupported() {
        // nothing for now
    }
    // the functions below are used for processing the firmware features from get_fw_features
    isSupportFDSEndPoint() {
        // nothing for now
    }
    isSupportAutoSplitSegments() {
        // nothing for now
    }
    isSupportOrderSegmentClean() {
        // nothing for now
    }
    isMapSegmentSupported() {
        // nothing for now
    }
    isSupportLedStatusSwitch() {
        // nothing for now
    }
    isMultiFloorSupported(duid) {
        for (const feature of ["max_multi_map", "max_bak_map", "multi_map_count"]) {
            this.adapter.setObjectAsync(`Devices.${duid}.floors.${feature}`, {
                type: "state",
                common: {
                    name: feature,
                    type: "number",
                    role: "value",
                    read: true,
                    write: false,
                },
                native: {},
            });
        }
    }
    isSupportFetchTimerSummary() {
        // nothing for now
    }
    isOrderCleanSupported() {
        // nothing for now
    }
    isRemoteSupported() {
        // nothing for now
    }
    getFeatureList(duid) {
        const robotModel = this.adapter.http_api.getRobotModel(duid);
        const featureSet = this.adapter.http_api.getFeatureSet(duid);
        const newFeatureSet = this.adapter.http_api.getNewFeatureSet(duid);
        return {
            isWashThenChargeCmdSupported: ((featureSet / Math.pow(2, 32)) >> 5) & 1,
            isDustCollectionSettingSupported: !!(33554432 & featureSet),
            isSupportedDrying: ((featureSet / Math.pow(2, 32)) >> 15) & 1,
            isShakeMopSetSupported: !!(262144 & featureSet),
            isVideoMonitorSupported: !!(8 & featureSet), // I tested this for S7 MaxV, S8 MaxV
            isVideoSettingSupported: !!(64 & featureSet), // I tested this for S7 MaxV, S8 MaxV
            isCarpetSupported: !!(512 & featureSet),
            isPhotoUploadSupported: !!(65536 & featureSet),
            isAvoidCollisionSupported: !!(134217728 & featureSet),
            isCornerCleanModeSupported: !!(2147483648 & featureSet),
            // isCameraSupported: [p.Products.TanosV_CN, p.Products.TanosV_CE, p.Products.TopazSV_CN, p.Products.TopazSV_CE, p.Products.TanosSV].hasElement(p.DMM.currentProduct),
            isCameraSupported: !!["roborock.vacuum.a10", "roborock.vacuum.a27", "roborock.vacuum.a51", "roborock.vacuum.a87"].includes(robotModel),
            isSupportSetSwitchMapMode: !!(268435456 & featureSet),
            // isMopForbiddenSupported: !!(p.DMM.isTanosV || p.DMM.isTanos || p.DMM.isTopazSV || p.DMM.isPearlPlus) || !![p.Products.TanosE, p.Products.TanosSL, p.Products.TanosS, p.Products.TanosSPlus, p.Products.TanosSMax, p.Products.Ultron, p.Products.UltronLite, p.Products.Pearl, p.Products.RubysLite].hasElement(p.DMM.currentProduct),
            isMopForbiddenSupported: [
                "roborock.vacuum.s6", // S6
                "roborock.vacuum.a10", // S6 MaxV
                "roborock.vacuum.a40", // Q7
                "roborock.vacuum.s5e", // S5 Max
                "roborock.vacuum.a38", // Q7 Max
                "roborock.vacuum.a72", // Q5 Pro
                "roborock.vacuum.a73", // Q8 Max
                "roborock.vacuum.a75", // Q Revo
                "roborock.vacuum.a15", // S7
                "roborock.vacuum.a51", // S8
                "roborock.vacuum.a70", // S8 Pro Ultra
                "roborock.vacuum.a62", // S7 Pro Ultra
                "roborock.vacuum.a65", // S7 Max Ultra
                "roborock.vacuum.a27", // S7 MaxV (Ultra)
                "roborock.vacuum.a87", // Qrevo MaxV
                "roborock.vacuum.a101", // Q Revo Pro
                "roborock.vacuum.a97", // S8 MaxV (Ultra)
                "roborock.vacuum.a104", // Roborock Qrevo S
                "roborock.vacuum.a135", // Qrevo Curv
                "roborock.vacuum.a117", // Qrevo Master
                "roborock.vacuum.a21", // Qrevo Slim
                "roborock.vacuum.a144", // Saros 10R
            ].includes(robotModel),
            // isShakeMopStrengthSupported: p.DMM.currentProduct == p.Products.TanosS || p.DMM.currentProduct == p.Products.TanosSPlus || p.DMM.isGarnet || p.DMM.isTopazSV || p.DMM.isPearlPlus || p.DMM.isCoral || p.DMM.isTopazS || p.DMM.isTopazSPlus || p.DMM.isTopazSC || p.DMM.isTopazSV || p.DMM.isPearlPlus || p.DMM.isTanosSMax || p.DMM.isUltron || p.DMM.isUltronSPlus || p.DMM.isUltronSMop || p.DMM.isUltronSV || p.DMM.isPearl
            isShakeMopStrengthSupported: [
                "roborock.vacuum.a08", // S6 Pure
                "roborock.vacuum.a10", // S6 MaxV
                "roborock.vacuum.a62", // S7 Pro Ultra
                "roborock.vacuum.a51", // S8
                "roborock.vacuum.a15", // S7
                "roborock.vacuum.a27", // S7 MaxV (Ultra)
                "roborock.vacuum.a19", // S4 Max
                "roborock.vacuum.a40", // Q7
                "roborock.vacuum.a65", // S7 Max Ultra
                "roborock.vacuum.a38", // Q7 Max
                "roborock.vacuum.a73", // Q8 Max
                "roborock.vacuum.a75", // Q Revo
                "roborock.vacuum.a70", // S8 Pro Ultra
                "roborock.vacuum.s5e", // S5 Max
                "roborock.vacuum.a87", // Qrevo MaxV
                "roborock.vacuum.a101", // Q Revo Pro
                "roborock.vacuum.a147", // Saros 10
            ].includes(robotModel),
            // isWaterBoxSupported: [p.Products.Tanos_CE, p.Products.Tanos_CN].hasElement(p.DMM.currentProduct)
            isWaterBoxSupported: [
                "roborock.vacuum.s5e", // S5 Max
                "roborock.vacuum.s6", // S6
                "roborock.vacuum.a08", // S6 Pure
                "roborock.vacuum.a10", // S6 MaxV
                "roborock.vacuum.a15", // S7
                "roborock.vacuum.a27", // S7 MaxV (Ultra)
                "roborock.vacuum.a38", // Q7 Max
                "roborock.vacuum.a40", // Q7
                "roborock.vacuum.a51", // S8
                "roborock.vacuum.a62", // S7 Pro Ultra
                "roborock.vacuum.a65", // S7 Max Ultra
                "roborock.vacuum.a70", // S8 Pro Ultra
                "roborock.vacuum.a73", // Q8 Max
                "roborock.vacuum.a75", // Q Revo
                "roborock.vacuum.a87", // Qrevo MaxV
                "roborock.vacuum.a101", // Q Revo Pro
                "roborock.vacuum.a97", // S8 MaxV (Ultra)
                "roborock.vacuum.a104", // Roborock Qrevo S
                "roborock.vacuum.a135", // Qrevo Curv
                "roborock.vacuum.a117", // Qrevo Master
                "roborock.vacuum.a21", // Qrevo Slim
                "roborock.vacuum.a144", // Saros 10R
            ].includes(robotModel),
            isCustomWaterBoxDistanceSupported: !!(2147483648 & featureSet),
            isBackChargeAutoWashSupported: newFeatureSet && !!(4096 & parseInt("0x" + newFeatureSet.slice(-8))),
            isAvoidCarpetSupported: [
                "roborock.vacuum.a10", // S6 MaxV
                "roborock.vacuum.a40", // Q7
                "roborock.vacuum.s6", // S6
                "roborock.vacuum.a73", // Q8 Max
                "roborock.vacuum.a38", // Q7 Max
                "roborock.vacuum.a51", // S8
                "roborock.vacuum.a75", // Q Revo
                "roborock.vacuum.a27", // S7 MaxV (Ultra)
                "roborock.vacuum.a15", // S7
                "roborock.vacuum.a70", // S8 Pro Ultra
                "roborock.vacuum.a62", // S7 Pro Ultra
                "roborock.vacuum.a65", // S7 Max Ultra
                "roborock.vacuum.a87", // Qrevo MaxV
                "roborock.vacuum.a101", // Q Revo Pro
                "roborock.vacuum.a97", // S8 MaxV (Ultra)
                "roborock.vacuum.a104", // Roborock Qrevo S
                "roborock.vacuum.a135", // Qrevo Curv
                "roborock.vacuum.a117", // Qrevo Master
                "roborock.vacuum.a21", // Qrevo slim
                "roborock.vacuum.a72", // Q5 pro
            ].includes(robotModel),
            // this isn't the correct way to use this. This code must be from a different robot
            // isVoiceControlSupported: !!(parseInt(`0x${newFeatureSet || "0"}`.slice(-10, -9)) & 2),
            isVoiceControlSupported: [
                "roborock.vacuum.a27", // S7 MaxV (Ultra)
            ],
            isElectronicWaterBoxSupported: false, // nothing for now. If this is needed, add the models here
            isCleanRouteFastModeSupported: newFeatureSet && !!(256 & parseInt("0x" + newFeatureSet.slice(-8))),
            isVideoLiveCallSupported: [
                "roborock.vacuum.a10", // S6 MaxV
                "roborock.vacuum.a27", // S7 MaxV (Ultra)
                "roborock.vacuum.a97", // S8 MaxV (Ultra)
                "roborock.vacuum.a87", // Qrevo MaxV
                "roborock.vacuum.a135", // Qrevo Curv
                "roborock.vacuum.a117", // Qrevo Master
                "roborock.vacuum.a21", // Qrevo Slim
                "roborock.vacuum.a144", // Saros 10R
            ].includes(robotModel),
        };
    }
    /**
     * @param {string | number} attribute
     */
    getCommonConsumable(attribute) {
        return consumables[attribute];
    }
    async processSupportedFeatures(duid) {
        const robotModel = this.adapter.http_api.getRobotModel(duid);
        const productCategory = this.adapter.http_api.getProductCategory(duid);
        if (productCategory == "robot.vacuum.cleaner") {
            // process states etc. depending on model
            const modelConfig = {
                // S6 Pure
                "roborock.vacuum.a08": [],
                // S6 MaxV
                "roborock.vacuum.a10": [],
                // S7
                "roborock.vacuum.a15": [],
                // S4 Max
                "roborock.vacuum.a19": [],
                // S7 MaxV (Ultra)
                "roborock.vacuum.a27": [],
                // Q7 Max
                "roborock.vacuum.a38": [],
                // Q7
                "roborock.vacuum.a40": [],
                // S8
                "roborock.vacuum.a51": [],
                // S7 Pro Ultra
                "roborock.vacuum.a62": [],
                // S7 Max Ultra
                "roborock.vacuum.a65": [],
                // S8 Pro Ultra
                "roborock.vacuum.a70": ["set_custom_mode_max_plus"],
                // Q5 Pro
                "roborock.vacuum.a72": [],
                // Q8 Max
                "roborock.vacuum.a73": [],
                // Q Revo
                "roborock.vacuum.a75": [],
                // S4
                "roborock.vacuum.s4": [],
                // S5 Max
                "roborock.vacuum.s5e": [],
                // S6
                "roborock.vacuum.s6": [],
                // Qrevo MaxV
                "roborock.vacuum.a87": [],
                // Q Revo Pro
                "roborock.vacuum.a101": [],
                // S8 MaxV (Ultra)
                "roborock.vacuum.a97": [],
                // Roborock Qrevo S
                "roborock.vacuum.a104": [],
                // Roborock Qrevo Curv
                "roborock.vacuum.a135": [],
                // Roborock Qrevo Master
                "roborock.vacuum.a117": [],
                // Roborock Qrevo Slim
                "roborock.vacuum.a21": [],
                // Roborock Saros 10R
                "roborock.vacuum.a144": [],
                // Roborock Saros 10
                "roborock.vacuum.a147": ["addSmartModeCommand"],
                // Roborock Qrevo Edge Series
                "roborock.vacuum.a187": [],
                // Roborock Qrevo Edge
                "roborock.vacuum.a156": [],
                // Roborock QV 35A
                "roborock.vacuum.a168": []
            };
            // process modelConfig
            const configActions = modelConfig[robotModel];
            if (configActions) {
                for (const actionName of configActions) {
                    const action = actions[actionName];
                    if (action) {
                        await action(this);
                    }
                }
            }
            else {
                this.adapter.log.error(`This robot is not fully supported just yet. Contact the dev to get this robot fully supported! Model: ${robotModel}`);
            }
            this.adapter.createBaseRobotObjects(duid);
            const featureList = this.getFeatureList(duid);
            this.adapter.log.debug(`Supported features of robot ${duid} - ${robotModel}: ${JSON.stringify(featureList)}`);
            Object.keys(featureList).forEach((feature) => {
                if (featureList[feature]) {
                    if (typeof this[feature] === "function") {
                        this[feature](duid);
                    }
                }
            });
            // process commands
            for (const [command, commonCommand] of Object.entries(commands)) {
                await this.adapter.ensureCommand(`Devices.${duid}.commands.${command}`, commonCommand);
            }
        }
        else if (productCategory == "roborock.vacuum") {
            // vacuum (not sure if it's actually roborock.vacuum. Might be something else. Haven't testet)
            this.adapter.createBasicVacuumObjects(duid);
        }
        else if (productCategory == "roborock.wm") {
            // washing machine
            this.adapter.createBasicWashingMachineObjects(duid);
        }
    }
    processDockType(dockType) {
        switch (dockType) {
            case 0: // Charging dock
                // nothing to do here
                break;
            case 1: // Auto-Empty Dock - Onyx: S7+/S7Plus (Empty Dock)
                this.isDustCollectionSettingSupported();
                break;
            case 2: // Empty Wash Fill Dock - Onyx2: G10
                this.isWashThenChargeCmdSupported();
                break;
            case 3: // Empty Wash Fill (Dry) Dock - Onyx3: S7 Pro, MaxV Ultra
                this.isDustCollectionSettingSupported();
                this.isWashThenChargeCmdSupported();
                this.isSupportedDrying();
                break;
            case 5: // Onyx-C: S8, S8 Plus, Q8, Q8 Max
                this.isDustCollectionSettingSupported();
                break;
            case 6: // Onyx3 Plus: S7 Max Ultra
                this.isDustCollectionSettingSupported();
                this.isWashThenChargeCmdSupported();
                this.isSupportedDrying();
                break;
            case 7: // Onyx4: S8 Pro Ultra
                this.isDustCollectionSettingSupported();
                this.isWashThenChargeCmdSupported();
                this.isSupportedDrying();
                break;
            case 8: // PEARL: Q Revo, P10
                this.isDustCollectionSettingSupported();
                this.isWashThenChargeCmdSupported();
                this.isSupportedDrying();
                break;
            // Not much info on this one. Might be missing some features
            case 9: // Unknown codename for now: Q Revo Pro
                this.isDustCollectionSettingSupported();
                this.isWashThenChargeCmdSupported();
                this.isSupportedDrying();
                break;
            default:
                break;
        }
    }
    getFirmwareFeature(featureID) {
        const feature = firmwareFeatures[featureID];
        if (feature) {
            return feature;
        }
        else {
            return "unknown feature";
        }
    }
}
exports.device_features = device_features;
//# sourceMappingURL=device_features.js.map