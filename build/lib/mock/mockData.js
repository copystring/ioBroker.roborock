"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_ROBOT_DATA = void 0;
exports.MOCK_ROBOT_DATA = {
    duid: "52E5XuBOSFE0s2oEmQWxPd",
    model: "roborock.vacuum.a147",
    firmwareFeatures: [111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125],
    properties: {
        msg_ver: 2,
        msg_seq: 2619,
        state: 8,
        battery: 100,
        clean_time: 4538,
        clean_area: 54632500,
        error_code: 0,
        map_present: 1,
        in_cleaning: 0,
        in_returning: 0,
        in_fresh_state: 1,
        lab_status: 1,
        water_box_status: 1,
        fan_power: 102,
        dnd_enabled: 0,
        map_status: 3,
        is_locating: 0,
        lock_status: 0,
        water_box_mode: 201,
        water_box_carriage_status: 1,
        mop_forbidden_enable: 1,
        camera_status: 3493,
        is_exploring: 0,
        home_sec_status: 0,
        voice_chat_status: 0,
        home_sec_enable_password: 1,
        monitor_status: 0,
        adbumper_status: [0, 0, 0],
        water_shortage_status: 0,
        dock_type: 18,
        dust_collection_status: 0,
        auto_dust_collection: 1,
        avoid_count: 50,
        mop_mode: 300,
        in_warmup: 0,
        back_type: -1,
        wash_phase: 0,
        wash_ready: 1,
        wash_status: 0,
        debug_mode: 0,
        collision_avoid_status: 1,
        switch_map_mode: 0,
        dock_error_status: 0,
        charge_status: 1,
        unsave_map_reason: 0,
        unsave_map_flag: 0,
        dry_status: 0,
        rdt: 0,
        clean_percent: 0,
        extra_time: 1463,
        rss: 2,
        dss: 2728, // 10 10 10 10 10 00 -> All OK
        common_status: 2,
        repeat: 1,
        kct: 0,
        sterilize_status: 0,
        rst: 0,
        events: [],
        switch_status: 18,
        last_clean_t: 1765204440,
        replenish_mode: 0,
        subdivision_sets: 0,
        cleaning_info: {
            target_segment_id: -1,
            segment_id: -1,
            fan_power: 102,
            water_box_status: 201,
            mop_mode: 300
        },
        exit_dock: 0,
        dtof_status: 0,
        seq_type: 0
    },
    consumables: {
        main_brush_work_time: 55395,
        side_brush_work_time: 441810,
        filter_work_time: 20144,
        filter_element_work_time: 0,
        sensor_dirty_time: 17684,
        strainer_work_times: 15,
        dust_collection_work_times: 179,
        cleaning_brush_work_times: 15
    },
    networkInfo: {
        ssid: "gge-7227",
        ip: "192.168.1.91",
        mac: "b0:4a:39:f2:4d:c0",
        bssid: "80:2a:a8:57:05:1b",
        rssi: -35
    },
    cleanSummary: {
        clean_time: 441361,
        clean_area: 6046965000,
        clean_count: 190,
        patrol_count: 3,
        dust_collection_count: 179,
        records: [
            1765198801, 1764939602, 1764766801, 1764692579, 1764691546,
            1764594002, 1764334801, 1764162002, 1763989201, 1763890442,
            1763890088, 1763829930, 1763730002, 1763557201, 1763384401,
            1763298890, 1763298201, 1763196267, 1763125202, 1762952401,
            1749535370, 1749378635, 1749276753
        ]
    },
    cleanRecords: [
        {
            begin: 1765198801, end: 1765204816, duration: 4538, area: 51290000, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 50,
            wash_count: 5, map_flag: 0, cleaned_area: 54632500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1463, sub_source: 0
        },
        {
            begin: 1764939602, end: 1764945388, duration: 4258, area: 51920000, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 58,
            wash_count: 5, map_flag: 0, cleaned_area: 55470000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1523, sub_source: 0
        },
        {
            begin: 1764766801, end: 1764770621, duration: 3816, area: 51702500, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 57,
            wash_count: 0, map_flag: 0, cleaned_area: 51702500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 0
        },
        {
            begin: 1764692579, end: 1764693187, duration: 605, area: 9860000, error: 0, complete: 1,
            start_type: 101, clean_type: 3, finish_reason: 56, dust_collection_status: 1, avoid_count: 17,
            wash_count: 0, map_flag: 0, cleaned_area: 9860000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 823
        },
        {
            begin: 1764691546, end: 1764691988, duration: 438, area: 6852500, error: 0, complete: 1,
            start_type: 101, clean_type: 3, finish_reason: 56, dust_collection_status: 1, avoid_count: 1,
            wash_count: 0, map_flag: 0, cleaned_area: 6852500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 823
        },
        {
            begin: 1764594002, end: 1764599580, duration: 4029, area: 49960000, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 74,
            wash_count: 5, map_flag: 0, cleaned_area: 53642500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1508, sub_source: 0
        },
        {
            begin: 1764334801, end: 1764340619, duration: 4339, area: 52120000, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 70,
            wash_count: 5, map_flag: 0, cleaned_area: 55800000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1471, sub_source: 0
        },
        {
            begin: 1764162002, end: 1764164897, duration: 2892, area: 42327500, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 76,
            wash_count: 0, map_flag: 0, cleaned_area: 42327500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 0
        },
        {
            begin: 1763989201, end: 1763994935, duration: 4289, area: 51787500, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 65,
            wash_count: 5, map_flag: 0, cleaned_area: 55532500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1434, sub_source: 0
        },
        {
            begin: 1763890442, end: 1763891351, duration: 384, area: 6802500, error: 0, complete: 1,
            start_type: 101, clean_type: 3, finish_reason: 56, dust_collection_status: 1, avoid_count: 2,
            wash_count: 2, map_flag: 0, cleaned_area: 6802500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 515, sub_source: 823
        },
        {
            begin: 1763890088, end: 1763890247, duration: 155, area: 3887500, error: 0, complete: 0,
            start_type: 101, clean_type: 3, finish_reason: 60, dust_collection_status: 1, avoid_count: 1,
            wash_count: 0, map_flag: 0, cleaned_area: 3887500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 823
        },
        {
            begin: 1763829930, end: 1763830413, duration: 479, area: 6840000, error: 0, complete: 1,
            start_type: 101, clean_type: 3, finish_reason: 56, dust_collection_status: 1, avoid_count: 0,
            wash_count: 0, map_flag: 0, cleaned_area: 6840000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 823
        },
        {
            begin: 1763730002, end: 1763735577, duration: 4061, area: 52072500, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 68,
            wash_count: 5, map_flag: 0, cleaned_area: 55762500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1507, sub_source: 0
        },
        {
            begin: 1763557201, end: 1763561038, duration: 3833, area: 51795000, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 66,
            wash_count: 0, map_flag: 0, cleaned_area: 51795000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 0
        },
        {
            begin: 1763384401, end: 1763390091, duration: 4199, area: 51915000, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 66,
            wash_count: 5, map_flag: 0, cleaned_area: 55420000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1483, sub_source: 0
        },
        {
            begin: 1763298890, end: 1763299334, duration: 440, area: 6972500, error: 0, complete: 1,
            start_type: 101, clean_type: 3, finish_reason: 56, dust_collection_status: 1, avoid_count: 3,
            wash_count: 0, map_flag: 0, cleaned_area: 6972500, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 823
        },
        {
            begin: 1763298201, end: 1763298817, duration: 612, area: 8910000, error: 0, complete: 1,
            start_type: 101, clean_type: 3, finish_reason: 56, dust_collection_status: 1, avoid_count: 44,
            wash_count: 0, map_flag: 0, cleaned_area: 8910000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 823
        },
        {
            begin: 1763196267, end: 1763197191, duration: 405, area: 6875000, error: 0, complete: 1,
            start_type: 101, clean_type: 3, finish_reason: 56, dust_collection_status: 1, avoid_count: 1,
            wash_count: 2, map_flag: 0, cleaned_area: 6875000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 513, sub_source: 823
        },
        {
            begin: 1763125202, end: 1763130867, duration: 4145, area: 51692500, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 66,
            wash_count: 5, map_flag: 0, cleaned_area: 55350000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 1504, sub_source: 0
        },
        {
            begin: 1762952401, end: 1762956186, duration: 3781, area: 50970000, error: 0, complete: 1,
            start_type: 3, clean_type: 1, finish_reason: 52, dust_collection_status: 1, avoid_count: 85,
            wash_count: 0, map_flag: 0, cleaned_area: 50970000, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 0, extra_time: 0, sub_source: 0
        },
        {
            begin: 1749535370, end: 1749535449, duration: 75, area: 0, error: 0, complete: 0,
            start_type: 2, clean_type: 5, finish_reason: 43, dust_collection_status: 0, avoid_count: 0,
            wash_count: 0, map_flag: 0, cleaned_area: 0, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 1749535369, extra_time: 0, sub_source: 0
        },
        {
            begin: 1749378635, end: 1749378669, duration: 30, area: 0, error: 0, complete: 0,
            start_type: 2, clean_type: 5, finish_reason: 43, dust_collection_status: 0, avoid_count: 0,
            wash_count: 0, map_flag: 0, cleaned_area: 0, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 1749378636, extra_time: 0, sub_source: 0
        },
        {
            begin: 1749276753, end: 1749276812, duration: 55, area: 0, error: 0, complete: 1,
            start_type: 2, clean_type: 5, finish_reason: 114, dust_collection_status: 0, avoid_count: 0,
            wash_count: 0, map_flag: 0, cleaned_area: 0, manual_replenish: 0, dirty_replenish: 0,
            clean_times: 1, task_id: 1749276752, extra_time: 0, sub_source: 0
        }
    ],
    multiMaps: {
        max_multi_map: 1,
        max_bak_map: 1,
        multi_map_count: 1,
        map_info: [{
                mapFlag: 0,
                add_time: 1765204821,
                length: 0,
                name: "",
                bak_maps: [{ mapFlag: 4, add_time: 1749406826 }],
                rooms: [
                    { id: 1, tag: 1, iot_name_id: "1060432", iot_name: "Room" },
                    { id: 2, tag: 15, iot_name_id: "30164387", iot_name: "Room" },
                    { id: 3, tag: 8, iot_name_id: "30164411", iot_name: "Room" },
                    { id: 4, tag: 9, iot_name_id: "30164408", iot_name: "Room" },
                    { id: 5, tag: 6, iot_name_id: "1060436", iot_name: "Room" },
                    { id: 6, tag: 14, iot_name_id: "1060424", iot_name: "Room" }
                ],
                furnitures: [
                    { id: 1, type: 43, subtype: 0 },
                    { id: 2, type: 46, subtype: 3 },
                    { id: 3, type: 47, subtype: 0 },
                    { id: 4, type: 45, subtype: 2 },
                    { id: 5, type: 50, subtype: 0 },
                    { id: 6, type: 50, subtype: 0 },
                    { id: 7, type: 48, subtype: 2 },
                    { id: 8, type: 44, subtype: 0 }
                ]
            }]
    },
    roomMapping: [
        [1, "1060432", 1],
        [2, "30164387", 15],
        [3, "30164411", 8],
        [4, "30164408", 9],
        [5, "1060436", 6],
        [6, "1060424", 14]
    ],
    timers: [
        ["1749184337669", "on", ["0 14 * * 5", ["start_clean", { "fan_power": 110, "segments": "0", "repeat": 1, "clean_order_mode": 0, "water_box_mode": 209, "map_index": -1, "mop_mode": 306, "seq_type": 0 }]]],
        ["1749184280712", "on", ["0 14 * * 3", ["start_clean", { "fan_power": 102, "segments": "0", "repeat": 1, "clean_order_mode": 0, "water_box_mode": 200, "map_index": -1, "mop_mode": 300, "seq_type": 0 }]]],
        ["1749184241783", "on", ["0 14 * * 1", ["start_clean", { "fan_power": 110, "segments": "0", "repeat": 1, "clean_order_mode": 0, "water_box_mode": 209, "map_index": -1, "mop_mode": 306, "seq_type": 0 }]]]
    ]
};
//# sourceMappingURL=mockData.js.map