var module387 = require('./387'),
  module12 = require('./12'),
  s = module12.StatusBar,
  module389 = require('./389'),
  module491 = require('./491').strings;

exports.MAP_MODE_REGULAR = 'regular';
exports.MAP_MODE_GOTO_EDIT = 'goto';
exports.MAP_MODE_ZONED_CLEAN_EDIT = 'zone';
exports.MAP_MODE_MAP_EDIT = 'mapEdit';
exports.MAP_MODE_BLOCK_CLEAN_EDIT = 'block';
exports.MAP_MODE_CARPET_EDIT = 'carpet';
exports.MAP_MODE_FURNITURE_EDIT = 'furniture';
exports.PhotoScale = 3;

var p = (function () {
  var _ = s.currentHeight;
  module389.isWindowDisplay;
  return _;
})();

exports.StatusBarHeight = p;
exports.AppBarHeight = 56;
var l = module389.isWindowDisplay ? 18 : 0;
exports.AppBorderRadius = l;
var b = 0;
exports.AppBarMarginTop = b;
var E = 0;
exports.AppBarMarginBottom = E;

if (module387.default.isIphoneX()) {
  exports.AppBarMarginTop = b = 24;
  exports.AppBarMarginBottom = E = 34;
}

exports.NavigationBarHeight = 0;
exports.areaServerMap = {
  cn: {
    host: 'cnbj2.fds.api.xiaomi.com',
    cdnHost: 'cdn.cnbj2.fds.api.mi-img.com',
  },
  tw: {
    host: 'awssgp0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awssgp0.fds.api.mi-img.com',
  },
  hk: {
    host: 'awssgp0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awssgp0.fds.api.mi-img.com',
  },
  sg: {
    host: 'awssgp0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awssgp0.fds.api.mi-img.com',
  },
  in: {
    host: 'awssgp0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awssgp0.fds.api.mi-img.com',
  },
  ru: {
    host: 'ksyru0-eco.fds.api.xiaomi.com',
    cdnHost: 'cdn.ksyru0-eco.fds.api.mi-img.com',
  },
  us: {
    host: 'awsusor0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awsusor0.fds.api.mi-img.com',
  },
  us_sg: {
    host: 'awssgp0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awssgp0.fds.api.mi-img.com',
  },
  kr: {
    host: 'awssgp0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awssgp0.fds.api.mi-img.com',
  },
  de: {
    host: 'awsde0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awsde0.fds.api.mi-img.com',
  },
  others: {
    host: 'awssgp0.fds.api.xiaomi.com',
    cdnHost: 'cdn.awssgp0.fds.api.mi-img.com',
  },
};

exports.Scale = function (_, o, t) {
  return {
    width: Math.round(_ / t),
    height: Math.round(o / t),
  };
};

exports.carpetModeParamsDisable = {
  enable: 0,
  current_integral: 550,
  current_high: 625,
  current_low: 500,
  stall_time: 10,
};
exports.carpetModeParamsEnable = {
  enable: 1,
  current_integral: 550,
  current_high: 625,
  current_low: 500,
  stall_time: 10,
};
exports.Resolution = {
  480: '4,4s',
  568: '5,5s',
  667: '6',
  736: '6plus',
};
exports.DefaultResolution = '6';
exports.RobotStateCode = {
  UNKNOWN: 0,
  INITIAL: 1,
  SLEEPING: 2,
  WAITING: 3,
  REMOTE: 4,
  CLEAN: 5,
  BACK_TO_DOCK: 6,
  SEARCH_FOR_DOCK: 7,
  CHARGING: 8,
  CHARGE_ERROR: 9,
  PAUSE: 10,
  SPOT_CLEAN: 11,
  MALFUNCTIONING: 12,
  PREPARE_SHUTDOWN: 13,
  UPDATING: 14,
  RUB_TO_DOCK: 15,
  GOTO_TARGET: 16,
  ZONED_CLEAN: 17,
  SEGMENT_CLEAN: 18,
  ZONED_PAUSE: 99,
  FULL_CHARGE: 100,
  OFF_LINE: 101,
  UNKNOWN_STATUES: 102,
};
exports.InCleaningStatus = {
  COMPLETE: 0,
  GLOBAL_CLEAN_NOT_COMPLETE: 1,
  ZONE_CLEAN_NOT_COMPLETE: 2,
  SEGMENT_CLEAN_NOT_COMPLETE: 3,
};
exports.privacyName = {
  PN_NONE: 0,
  PN_CN: 1,
  PN_GENERAL: 2,
  PN_EU: 3,
  PN_MAX: 4,
};
exports.OperatorCode = {
  OPERATOR_NONE: 0,
  OPERATOR_CN: 1,
  OPERATOR_NOT_CN: 2,
};
exports.mapOpErrorCode = {
  VENDOR_ERROR_CODE: -1e4,
  PROCESS_BUSY_ERROR_CODE: -10001,
  ERROR_ACCESS_DENIED: -10002,
  ERROR_ACTION_LOCKED: -10003,
  ERROR_ACTION_TIMEOUT: -10004,
  PARAM_ERROR: -10005,
  OPERATION_FAILED: -10006,
  BAD_REQUEST: -10007,
};
exports.VideoQuality = {
  SD: 'SD',
  HD: 'HD',
  FHD: 'FHD',
  AUTO: 'auto',
};
var u = {
  Video_StartPreviewFailed_unKnownReason: {
    code: -100,
    msg: '\u5f00\u59cb\u9884\u89c8 \u672a\u77e5\u9519\u8bef',
    resolve: module491.video_error100_resolve,
  },
  Video_StartPreviewFailed_robotInCharge: {
    code: -101,
    msg: '\u5f00\u59cb\u9884\u89c8 \u673a\u5668\u6b63\u5728\u5145\u7535 robot in charge, denied preview',
    resolve: module491.video_error101_resolve,
  },
  Video_StartPreviewFailed_cameraStatusError: {
    code: -102,
    msg: '\u5f00\u59cb\u9884\u89c8 \u6444\u50cf\u5934\u72b6\u6001\u5f02\u5e38 camera status denied preview',
    resolve: module491.video_error102_resolve,
  },
  Video_StartPreviewFailed_innerUnknowReason: {
    code: -103,
    msg: '\u5f00\u59cb\u9884\u89c8 \u5185\u90e8\u672a\u77e5\u9519\u8bef',
    resolve: module491.video_error103_resolve,
  },
  Video_StartPreviewFailed_alreadyInPreview: {
    code: -104,
    msg: '\u5f00\u59cb\u9884\u89c8 \u53d1\u73b0\u89c6\u9891\u6b63\u5728\u9884\u89c8\u4e2d\u9519\u8bef',
    resolve: module491.video_error104_resolve,
  },
  Video_StartPreviewFailed_passwordError: {
    code: -105,
    msg: '\u5f00\u59cb\u9884\u89c8 \u8f93\u5165\u5bc6\u7801\u9519\u8bef password error, denied preview',
    resolve: module491.video_error105_resolve,
  },
  Video_StartPreviewFailed_passwordErrorFrequently: {
    code: -106,
    msg: '\u5f00\u59cb\u9884\u89c8 \u8fde\u7eed\u8f93\u5165\u5bc6\u7801\u9519\u8bef locking',
    resolve: module491.video_error105_resolve,
  },
  Video_StartPreviewFailed_robotIsDisconnecting: {
    code: -107,
    msg: '\u5f00\u59cb\u9884\u89c8 \u673a\u5668\u4eba\u6b63\u5728\u9000\u51fa \u7a0d\u540e\u518d\u8bd5',
    resolve: module491.video_error107_resolve,
  },
  Video_StartPreviewFailed_requestTurnserverFailed: {
    code: -108,
    msg: '\u5f00\u59cb\u9884\u89c8 \u8bf7\u6c42turn server \u5931\u8d25',
    resolve: module491.video_error108_resolve,
  },
  Video_GetTurnServerFailed: {
    code: -110,
    msg: '\u83b7\u53d6\u8f6c\u53d1\u670d\u52a1\u5668\u5931\u8d25',
    resolve: module491.video_error108_resolve,
  },
  Video_GetDeviceSdpFailed: {
    code: -111,
    msg: 'device sdp\u9519\u8bef',
    resolve: module491.video_error108_resolve,
  },
  Video_SendSDKSdpToDeviceFailed_responseTimeout: {
    code: -112,
    msg: '\u53d1\u9001sdk sdp\u4fe1\u606f \u5230device,\u8d85\u65f6 \u672a\u8fd4\u56de\u7ed3\u679c\u9519\u8bef',
    resolve: module491.video_error102_resolve,
  },
  Video_SendSDKSdpToDeviceFailed_processedError: {
    code: -113,
    msg: '\u53d1\u9001sdk sdp\u4fe1\u606f \u5230device, \u5904\u7406\u5931\u8d25',
    resolve: module491.video_error108_resolve,
  },
  Video_PreviewTimeout: {
    code: -114,
    msg: '\u9884\u89c8\u8d85\u65f6',
    resolve: module491.video_error114_resolve,
  },
  Video_PreviewCalledError: {
    code: -115,
    msg: '\u547c\u53eb\u89c6\u9891\u9519\u8bef (sdk \u6709\u5177\u4f53\u7684\u9519\u8bef\u7801)',
    resolve: module491.video_error115_resolve,
  },
};
exports.VideoError = u;
var v = [
  {
    title: module491.video_definition_high,
    command: 'HD',
  },
  {
    title: module491.video_definition_normal,
    command: 'SD',
  },
];
exports.Definitions = v;
var h = {
  0: module491.map_object_name_xian,
  1: module491.map_object_name_baba,
  2: module491.map_object_name_shoe,
  3: module491.map_object_name_dizuo,
  4: module491.map_object_name_dizuo,
  5: module491.map_object_name_chapai,
  9: module491.map_object_name_tizhongcheng,
  10: module491.map_object_name_zhiwu,
  18: module491.map_obstacles_title,
  25: module491.map_object_name_poqi,
  26: module491.map_object_name_henggan,
  27: module491.map_object_name_henggan,
  34: module491.map_object_name_zhiwu,
  42: module491.map_obstacles_title,
};
exports.obstacleNames = h;
var O = {
  34: module491.map_object_name_sock,
};
exports.obstacleNamesBackup = O;
var T = {
  0: module491.map_object_desc_xian,
  1: module491.map_object_desc_baba,
  2: module491.map_object_desc_shoe,
  3: module491.map_object_desc_dizuo,
  4: module491.map_object_desc_dizuo,
  5: module491.map_object_desc_chapai,
  9: module491.map_object_desc_tizhongcheng,
  10: module491.map_object_desc_zhiwu,
  18: module491.map_object_desc_general,
  25: module491.map_object_desc_poqi,
  26: module491.map_object_desc_henggan,
  27: module491.map_object_desc_henggan,
  34: module491.map_object_desc_zhiwu,
  42: module491.map_object_desc_general,
};
exports.obstacleRemoveTips = T;
var y = {
  0: module491.map_object_desc_xian,
  1: module491.map_object_desc_baba,
  2: module491.map_object_desc_shoe,
  3: module491.map_object_desc_dizuo,
  4: module491.map_object_desc_dizuo,
  5: module491.map_object_desc_chapai,
  9: module491.map_object_desc_tizhongcheng,
  10: module491.map_object_desc_zhiwu,
  18: module491.map_object_desc_general_structure_light,
  25: module491.map_object_desc_poqi,
  26: module491.map_object_desc_henggan,
  27: module491.map_object_desc_henggan,
  34: module491.map_object_desc_zhiwu,
  42: module491.map_object_desc_general_structure_light,
};
exports.obstacleRemoveTipsStructuredLight = y;
var R = {
  34: module491.map_object_desc_sock,
};
exports.obstacleRemoveTipsBackup = R;

exports.CleanFinishCleanReasons = function () {
  return {
    21: module491.finsh_reason_by_manual_interrupt,
    24: module491.localization_strings_Setting_History_index_15,
    29: module491.finsh_reason_by_manual_interrupt,
    32: module491.finsh_reason_by_breakpoint,
    33: module491.finsh_reason_by_breakpoint,
    34: module491.localization_strings_Setting_History_index_15,
    35: module491.finsh_reason_by_manual_interrupt,
    36: module491.finsh_reason_by_manual_interrupt,
    37: module491.finsh_reason_by_manual_interrupt,
    43: module491.finsh_reason_by_manual_interrupt,
    45: module491.finsh_reason_by_locate_fail,
    64: module491.finsh_reason_by_locate_fail,
    65: module491.finsh_reason_by_locate_fail,
    48: module491.finsh_reason_by_manual_interrupt,
    49: module491.finsh_reason_by_manual_interrupt,
    50: module491.finsh_reason_by_manual_interrupt,
    51: module491.localization_strings_Setting_History_index_15,
    52: module491.localization_strings_Setting_History_index_16,
    54: module491.localization_strings_Setting_History_index_16,
    55: module491.localization_strings_Setting_History_index_16,
    56: module491.localization_strings_Setting_History_index_16,
    57: module491.localization_strings_Setting_History_index_16,
    60: module491.finsh_reason_by_manual_interrupt,
    61: module491.finsh_reason_by_not_reach,
    62: module491.finsh_reason_by_not_reach,
    67: module491.cleanout_the_error,
    68: module491.back_to_the_wash_failure,
    101: module491.localization_strings_Setting_History_index_15,
    102: module491.finsh_reason_by_breakpoint,
    103: module491.finsh_reason_by_manual_interrupt,
    104: module491.localization_strings_Setting_History_index_15,
    105: module491.localization_strings_Setting_History_index_15,
    106: module491.localization_strings_Setting_History_index_15,
    107: module491.localization_strings_Setting_History_index_15,
    109: module491.localization_strings_Setting_History_index_15,
    110: module491.localization_strings_Setting_History_index_15,
  };
};

exports.OverTimer_Six = 6e3;
exports.OverTimer_Fifteen = 15e3;

exports.CleanStartType = function () {
  return {
    1: module491.robot_start_type_robot,
    2: module491.robot_start_type_app,
    3: module491.robot_start_type_timer,
    4: module491.robot_start_type_intelligence_scene,
    5: module491.robot_start_type_vocie,
    101: module491.robot_start_type_rr_intelligence_scene,
    801: module491.robot_start_type_alexa,
    802: module491.robot_start_type_google,
    803: module491.robot_start_type_ifttt,
    804: module491.robot_start_type_yandex,
    805: module491.robot_start_type_homekit,
    806: module491.robot_start_type_little_love,
    807: module491.robot_start_type_tmall,
    808: module491.robot_start_type_baidu,
    809: module491.robot_start_type_jd,
    810: module491.robot_start_type_siri,
    811: module491.robot_start_type_clova,
    901: module491.robot_start_type_wechat,
    902: module491.robot_start_type_alipay,
    903: module491.robot_start_type_green_rice,
    904: module491.robot_start_type_hisense,
    905: module491.robot_start_type_huawei,
  };
};
