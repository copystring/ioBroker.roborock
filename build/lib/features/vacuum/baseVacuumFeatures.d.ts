import { BaseDeviceFeatures, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { z } from "zod";
export declare const VacuumStatusSchema: z.ZodObject<{
    state: z.ZodOptional<z.ZodNumber>;
    fan_power: z.ZodOptional<z.ZodNumber>;
    water_box_mode: z.ZodOptional<z.ZodNumber>;
    mop_mode: z.ZodOptional<z.ZodNumber>;
    dock_type: z.ZodOptional<z.ZodNumber>;
    error_code: z.ZodOptional<z.ZodNumber>;
    battery: z.ZodOptional<z.ZodNumber>;
    clean_time: z.ZodOptional<z.ZodNumber>;
    clean_area: z.ZodOptional<z.ZodNumber>;
    dss: z.ZodOptional<z.ZodNumber>;
    map_status: z.ZodOptional<z.ZodNumber>;
    carpet_mode: z.ZodOptional<z.ZodString>;
    carpet_clean_mode: z.ZodOptional<z.ZodString>;
    water_box_custom_mode: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
export declare abstract class BaseVacuumFeatures extends BaseDeviceFeatures {
    protected static readonly CONSTANTS: {
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
            7: string;
            8: string;
            9: string;
            16: string;
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
            water_box_custom_mode: {
                states: {
                    200: string;
                    201: string;
                    202: string;
                    203: string;
                };
            };
            water_box_mode: {
                type: string;
                states: {
                    200: string;
                    201: string;
                    202: string;
                    203: string;
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
            125: {
                unit: string;
            };
            126: {
                unit: string;
            };
            127: {
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
            111: string;
            112: string;
            114: string;
            116: string;
            119: string;
            120: string;
            122: string;
            123: string;
            125: string;
        };
    };
    constructor(dependencies: FeatureDependencies, duid: string, robotModel: string, config: DeviceModelConfig);
    protected registerFeatures(): void;
    protected _getDynamicFeatures(): Set<Feature>;
    detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, any>>): Promise<boolean>;
    processDockType(dockTypeInput: number | undefined): Promise<void>;
    getCommonConsumable(attribute: string | number): {
        unit?: string;
    } | undefined;
    isResetableConsumable(consumable: string): boolean;
    getCommonDeviceStates(attribute: string | number): {
        states?: Record<any, any>;
        unit?: string;
        type?: ioBroker.CommonType | undefined;
    } | undefined;
    getCommonCleaningInfo(attribute: string | number): {
        unit?: string;
    } | undefined;
    getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    getFirmwareFeatureName(featureID: string | number): string;
    protected _addAutoEmptyDockCommands(): void;
    protected _addMopWashCommands(): void;
    protected _addMopDryCommands(): void;
    protected _addWaterBoxCommands(): void;
    protected _addCleanRouteFastModeCommand(): void;
    protected _createCameraStates(): Promise<void>;
    protected _createMultiFloorStates(): Promise<void>;
    protected _createCustomWaterDistanceState(): Promise<void>;
    protected _addFanMaxPlusCommand(): void;
    protected _addSmartModeCommand(): void;
}
