export declare const SUBTITLE_STATUS: {
    SLEEP: number;
    IDEL: number;
    DUSTING: number;
    CLEANNING: number;
    RECHARGING: number;
    CHARGE_FULL: number;
    PAUSE: number;
    UPGRADING: number;
    BREAK_CHARGING: number;
    BREAK_RECHARGING: number;
    WORKING_DUSTING: number;
    WORKING_SLEEP: number;
    RELOCTION: number;
    SELF_CHECK: number;
    REMOTE_CONTROL: number;
    BUILD_MAP: number;
    CLEAN_REPEAT: number;
    RECLEAN: number;
    WAIT_INSTRUCTION: number;
};
export declare const SCCleanType: {
    clean: number;
    mop: number;
    both: number;
};
export declare const CleanModeType: {
    ALL: number;
    ROOM_NORMAL: number;
    ROOM: number;
    ALL_CUSTOM: number;
    AREA_CUSTOM: number;
};
export declare const SC_MAP_COLORS: {
    LEVEL_1: string[];
    LEVEL_2: string[];
    LEVEL_3: string[];
    ROOM_ICON_BG: string[];
    ROOM_ICON_BORDER: string[];
};
export declare const JOB_STATUS: {
    CHARGING: number;
    CLEANING: number;
    ZONED_CLEANING: number;
    SPOT_CLEANING: number;
    PAUSED: number;
    ERROR: number;
    SLEEP: number;
    IDLE: number;
    RETURNING: number;
};
export declare const ROOM_TYPE_MAP: Record<number, string>;
export declare const APP_COLORS: {
    virtualStrokeColor: string;
    virtualFillColor: string;
    zoneStrokeColor: string;
    zoneFillColor: string;
    zoneBorderColor: string;
    circleColor: string;
    eraseStrokeColor: string;
    eraseFillColor: string;
    forbiddenStrokeColor: string;
    forbiddenFillColor: string;
};
export declare const PALETTE: {
    WALL: string;
    FLOOR: string;
    OBSTACLE: string;
    UNKNOWN: string;
    CARPET: string;
    ROOMS: {
        default: string;
    };
};
