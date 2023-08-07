/**
 * @file base.js
 * @description This file contains the features for the Gen1 Roborock vacuum cleaners.
 */

/**
 * @typedef {Object} States
 * @property {Object<string, string>} fan_power - Fan power levels.
 * @property {Object<number, string>} state - Device states.
 * @property {Object<number, string>} error - Error codes.
 */

/**
 * @type {States}
 */
const states = {
    fan_power: {
        "101": "Quiet",
        "102": "Balanced",
        "103": "Turbo",
        "104": "Max",
        "105": "Off"
    },
    state: {
        0: "Unknown",
        1: "Initiating",
        2: "Sleeping",
        3: "Waiting",
        4: "Cleaning",
        5: "Returning Home",
        6: "Charging",
        7: "Spot Cleaning",
        8: "Error",
        9: "Paused",
        10: "Spot Cleaning",
        11: "In Error",
        12: "Shutting Down",
        13: "Updating",
        14: "Docking",
        15: "Going to Spot",
        16: "Zoned Cleaning",
        17: "Room Cleaning",
        100: "Fully Charged"
    },
    error: {
        0: "No error",
        1: "Laser sensor fault",
        2: "Collision sensor fault",
        3: "Wheels on top of void",
        4: "Clean hovering sensors",
        5: "Clean main brush",
        6: "Clean side brushes",
        7: "Main wheel stuck?",
        8: "Device stuck, clean area",
        9: "Dust collector missing",
        10: "Clean filter",
        11: "Stuck in magnetic barrier",
        12: "Low battery",
        13: "Charging fault",
        14: "Battery fault",
        15: "Wall sensors fault",
        16: "Dirty drop sensors",
        17: "Main brush stuck",
        18: "Side brush stuck",
        19: "Suction fan fault",
        20: "Unpowered charging station",
        "-1": "Unknown Error"
    }
};

/**
 * @typedef {Object} DeviceStatus
 * @property {Object} battery - Battery status.
 * @property {Object} clean_area - Cleaned area status.
 * @property {Object} clean_time - Cleaning time status.
 * @property {Object} dnd_enabled - Do not disturb status.
 * @property {Object} error_code - Error code status.
 * @property {Object} fan_power - Fan power status.
 * @property {Object} in_cleaning - Cleaning status.
 * @property {Object} in_returning - Returning home status.
 * @property {Object} in_fresh_state - Fresh state status.
 * @property {Object} lab_status - Lab status.
 * @property {Object} map_present - Map present status.
 * @property {Object} map_status - Map status.
 * @property {Object} msg_seq - Message sequence status.
 * @property {Object} msg_ver - Message version status.
 * @property {Object} state - Device state status.
 * @property {Object} water_box_status - Water box status.
 */

/**
 * @type {DeviceStatus}
 */
const deviceStatus = {
    battery: {
        "name": "Battery",
        "type": "number",
        "unit": "%",
        "write": false
    },
    clean_area: {
        "name": "Cleaned area",
        "type": "number",
        "unit": "m²",
        "write": false
    },
    clean_time: {
        "name": "Cleaning time",
        "type": "number",
        "unit": "min",
        "write": false
    },
    dnd_enabled: {
        "name": "Do not disturb",
        "type": "boolean",
        "write": false
    },
    error_code: {
        "name": "Error code",
        "type": "number",
        "states": states["error"],
        "write": false
    },
    fan_power: {
        "name": "Fan power",
        "type": "number",
        "states": states["fan_power"],
        "write": false
    },
    in_cleaning: {
        "name": "Cleaning",
        "type": "boolean",
        "write": false
    },
    in_returning: {
        "name": "Returning home",
        "type": "boolean",
        "write": false
    },
    in_fresh_state: {
        "name": "Fresh state",
        "type": "boolean",
        "write": false
    },
    lab_status: {
        "name": "Lab status",
        "type": "boolean",
        "write": false
    },
    map_present: {
        "name": "Map present",
        "type": "boolean",
        "write": false
    },
    map_status: {
        "name": "Map status",
        "type": "number",
        "write": false
    },
    msg_seq: {
        "name": "Message sequence",
        "type": "number",
        "write": false
    },
    msg_ver: {
        "name": "Message version",
        "type": "number",
        "write": false
    },
    state: {
        "name": "Device state",
        "type": "number",
        "states": states["state"],
        "write": false
    },
    water_box_status: {
        "name": "Water box status",
        "type": "boolean",
        "write": false
    }
};

/**
 * @typedef {Object} Consumables
 * @property {Object} main_brush_work_time - Main brush work time.
 * @property {Object} side_brush_work_time - Side brush work time.
 * @property {Object} filter_work_time - Filter work time.
 * @property {Object} sensor_dirty_time - Sensor dirty time.
 */

/**
 * @type {Consumables}
 */
const consumables = {
    main_brush_work_time: {
        "name": "Main brush used hours",
        "type": "number",
        "unit": "h",
        "divider": 60 * 60,
        "write": false
    },
    side_brush_work_time: {
        "name": "Side brush used hours",
        "type": "number",
        "unit": "h",
        "divider": 60 * 60,
        "write": false
    },
    filter_work_time: {
        "name": "Filter used hours",
        "type": "number",
        "unit": "h",
        "divider": 60 * 60,
        "write": false
    },
    sensor_dirty_time: {
        "name": "Sensor dirty hours",
        "type": "number",
        "unit": "h",
        "divider": 60 * 60,
        "write": false
    }
};

/**
 * @typedef {Object} CleaningRecords
 * @property {Object} total_clean_count - Total cleaning count.
 * @property {Object} clean_success_count - Successful cleaning count.
 * @property {Object} total_clean_area - Total cleaned area.
 * @property {Object} total_clean_time - Total cleaning time.
 * @property {Object} average_clean_time - Average cleaning time.
 * @property {Object} last_clean_time - Last cleaning time.
 * @property {Object} last_clean_area - Last cleaned area.
 */

/**
 * @type {CleaningRecords}
 */
const cleaningRecords = {
    total_clean_count: {
        "name": "Total cleaning count",
        "type": "number",
        "write": false
    },
    clean_success_count: {
        "name": "Successful cleaning count",
        "type": "number",
        "write": false
    },
    total_clean_area: {
        "name": "Total cleaned area",
        "type": "number",
        "unit": "m²",
        "write": false
    },
    total_clean_time: {
        "name": "Total cleaning time",
        "type": "number",
        "unit": "min",
        "write": false
    },
    average_clean_time: {
        "name": "Average cleaning time",
        "type": "number",
        "unit": "min",
        "write": false
    },
    last_clean_time: {
        "name": "Last cleaning time",
        "type": "number",
        "unit": "min",
        "write": false
    },
    last_clean_area: {
        "name": "Last cleaned area",
        "type": "number",
        "unit": "m²",
        "write": false
    }
};

/**
 * @typedef {Object} Commands
 * @property {Object} app_start - Start cleaning command.
 * @property {Object} app_stop - Stop cleaning command.
 * @property {Object} app_pause - Pause cleaning command.
 * @property {Object} app_spot - Spot cleaning command.
 * @property {Object} app_goto_target - Go to target command.
 * @property {Object} app_charge - Return to dock command.
 */

/**
 * @type {Commands}
 */
const commands = {
    app_start: {
        "name": "Start cleaning",
        "type": "boolean",
        "write": true
    },
    app_stop: {
        "name": "Stop cleaning",
        "type": "boolean",
        "write": true
    },
    app_pause: {
        "name": "Pause cleaning",
        "type": "boolean",
        "write": true
    },
    app_spot: {
        "name": "Spot cleaning",
        "type": "boolean",
        "write": true
    },
    app_goto_target: {
        "name": "Go to target",
        "type": "string",
        "write": true
    },
    app_charge: {
        "name": "Return to dock",
        "type": "boolean",
        "write": true
    }
};

module.exports = {
    states,
    deviceStatus,
    consumables,
    cleaningRecords,
    commands
};