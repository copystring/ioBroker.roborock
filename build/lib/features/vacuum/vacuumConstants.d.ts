export declare const VACUUM_CONSTANTS: {
    errorCodes: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
        14: string;
        15: string;
        16: string;
        17: string;
        18: string;
        19: string;
        20: string;
        21: string;
        22: string;
        23: string;
        24: string;
        254: string;
        255: string;
        "-1": string;
    };
    stateCodes: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
        14: string;
        15: string;
        16: string;
        17: string;
        18: string;
        22: string;
        23: string;
        26: string;
        28: string;
        29: string;
        100: string;
    };
    dockTypes: {
        0: string;
        1: string;
        2: string;
        3: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        14: string;
        15: string;
        16: string;
        17: string;
        18: string;
    };
    baseCommands: {
        app_start: {
            type: string;
            def: boolean;
        };
        app_segment_clean: {
            type: string;
            def: boolean;
        };
        app_stop: {
            type: string;
            def: boolean;
        };
        app_pause: {
            type: string;
            def: boolean;
        };
        app_charge: {
            type: string;
            def: boolean;
        };
        app_spot: {
            type: string;
            def: boolean;
        };
        app_zoned_clean: {
            type: string;
        };
        resume_zoned_clean: {
            type: string;
            def: boolean;
        };
        stop_zoned_clean: {
            type: string;
            def: boolean;
        };
        resume_segment_clean: {
            type: string;
            def: boolean;
        };
        stop_segment_clean: {
            type: string;
            def: boolean;
        };
        set_custom_mode: {
            type: string;
            def: number;
            states: {
                101: string;
                102: string;
                103: string;
                104: string;
                105: string;
            };
        };
        find_me: {
            type: string;
            def: boolean;
        };
        app_goto_target: {
            type: string;
        };
        set_clean_motor_mode: {
            type: string;
            def: string;
        };
    };
    deviceStates: {
        dock_type: {
            type: string;
            states: {};
        };
        error_code: {
            type: string;
            states: {};
        };
        clean_area: {
            type: string;
            unit: string;
        };
        clean_time: {
            type: string;
            unit: string;
        };
        battery: {
            type: string;
            unit: string;
        };
        state: {
            type: string;
            states: {};
        };
        fan_power: {
            type: string;
            states: {
                101: string;
                102: string;
                103: string;
                104: string;
                105: string;
            };
        };
        clean_percent: {
            unit: string;
        };
        water_box_mode: {
            type: string;
            states: {
                200: string;
                201: string;
                202: string;
                203: string;
                204: string;
                205: string;
                206: string;
                207: string;
                208: string;
                209: string;
            };
        };
        mop_mode: {
            states: {
                300: string;
                301: string;
                303: string;
                304: string;
            };
        };
        carpet_mode: {
            states: {
                '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': string;
                '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': string;
            };
        };
        carpet_clean_mode: {
            states: {
                '{"carpet_clean_mode":0}': string;
                '{"carpet_clean_mode":1}': string;
                '{"carpet_clean_mode":2}': string;
            };
        };
        unsave_map_flag: {
            type: string;
        };
        unsave_map_reason: {
            type: string;
        };
        dock_error_status: {
            type: string;
        };
        debug_mode: {
            type: string;
        };
        auto_dust_collection: {
            type: string;
        };
        dust_collection_status: {
            type: string;
        };
        adbumper_status: {
            type: string;
        };
        lock_status: {
            type: string;
        };
        is_locating: {
            type: string;
        };
        map_status: {
            type: string;
        };
        dnd_enabled: {
            type: string;
        };
        lab_status: {
            type: string;
        };
        in_fresh_state: {
            type: string;
        };
        in_returning: {
            type: string;
        };
        in_cleaning: {
            type: string;
        };
        in_warmup: {
            type: string;
        };
        map_present: {
            type: string;
        };
        is_exploring: {
            type: string;
        };
        events: {
            type: string;
        };
        subdivision_sets: {
            type: string;
        };
        repeat: {
            type: string;
        };
        replenish_mode: {
            type: string;
        };
        rdt: {
            type: string;
        };
        camera_status: {
            type: string;
        };
        distance_off: {
            type: string;
        };
        wash_phase: {
            type: string;
        };
        wash_ready: {
            type: string;
        };
        wash_status: {
            type: string;
        };
        back_type: {
            type: string;
        };
        collision_avoid_status: {
            type: string;
        };
        avoid_count: {
            type: string;
        };
        switch_map_mode: {
            type: string;
        };
        charge_status: {
            type: string;
        };
        dry_status: {
            type: string;
        };
        extra_time: {
            type: string;
        };
        rss: {
            type: string;
        };
        dss: {
            type: string;
        };
        common_status: {
            type: string;
        };
        kct: {
            type: string;
        };
        sterilize_status: {
            type: string;
        };
        rst: {
            type: string;
        };
        switch_status: {
            type: string;
        };
        last_clean_t: {
            type: string;
        };
        cleaning_info: {
            type: string;
        };
        exit_dock: {
            type: string;
        };
        dtof_status: {
            type: string;
        };
        seq_type: {
            type: string;
        };
        mop_forbidden_enable: {
            type: string;
        };
        voice_chat_status: {
            type: string;
        };
        corner_clean_mode: {
            type: string;
        };
        home_sec_status: {
            type: string;
        };
        home_sec_enable_password: {
            type: string;
        };
        monitor_status: {
            type: string;
        };
        clean_fluid: {
            type: string;
        };
        water_box_carriage_status: {
            type: string;
        };
        water_box_status: {
            type: string;
        };
        water_shortage_status: {
            type: string;
        };
        cleaned_area: {
            type: string;
            unit: string;
        };
        clean_times: {
            type: string;
        };
    };
    consumables: {
        main_brush_work_time: {
            unit: string;
        };
        side_brush_work_time: {
            unit: string;
        };
        filter_work_time: {
            unit: string;
        };
        filter_element_work_time: {
            unit: string;
        };
        sensor_dirty_time: {
            unit: string;
        };
        dust_collection_work_times: {
            unit: string;
        };
        main_brush_life: {
            unit: string;
        };
        side_brush_life: {
            unit: string;
        };
        filter_life: {
            unit: string;
        };
        strainer_work_times: {
            unit: string;
        };
        cleaning_brush_work_times: {
            unit: string;
        };
    };
    resetConsumables: Set<string>;
    cleaningRecords: {
        0: {
            type: string;
        };
        1: {
            type: string;
        };
        2: {
            type: string;
            unit: string;
        };
        3: {
            type: string;
            unit: string;
        };
        4: {
            type: string;
        };
        5: {
            type: string;
        };
        6: {
            type: string;
        };
        7: {
            type: string;
        };
        8: {
            type: string;
        };
        9: {
            type: string;
        };
        begin: {
            type: string;
        };
        end: {
            type: string;
        };
        duration: {
            type: string;
            unit: string;
        };
        area: {
            type: string;
            unit: string;
        };
        error: {
            type: string;
        };
        complete: {
            type: string;
        };
        start_type: {
            type: string;
        };
        clean_type: {
            type: string;
        };
        finish_reason: {
            type: string;
        };
        dust_collection_status: {
            type: string;
        };
        cleaned_area: {
            type: string;
            unit: string;
        };
        task_id: {
            type: string;
        };
        clean_times: {
            type: string;
        };
        dirty_replenish: {
            type: string;
        };
        manual_replenish: {
            type: string;
        };
        map_flag: {
            type: string;
        };
        wash_count: {
            type: string;
        };
        avoid_count: {
            type: string;
        };
        sub_source: {
            type: string;
        };
        extra_time: {
            type: string;
        };
    };
    cleaningInfo: {
        0: {
            unit: string;
        };
        1: {
            unit: string;
        };
        clean_time: {
            unit: string;
        };
        clean_area: {
            unit: string;
        };
    };
    firmwareFeatures: {
        readonly 111: "isSupportFDSEndPoint";
        readonly 112: "isSupportAutoSplitSegments";
        readonly 114: "isSupportOrderSegmentClean";
        readonly 116: "isMapSegmentSupported";
        readonly 119: "isSupportLedStatusSwitch";
        readonly 120: "isMultiFloorSupported";
        readonly 122: "isSupportFetchTimerSummary";
        readonly 123: "isOrderCleanSupported";
        readonly 125: "isRemoteSupported";
    };
};
export type FirmwareFeatures = typeof VACUUM_CONSTANTS.firmwareFeatures;
export type FirmwareFeatureId = keyof FirmwareFeatures;
