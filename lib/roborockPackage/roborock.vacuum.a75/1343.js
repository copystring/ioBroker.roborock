var module391 = require('./391'),
  module390 = require('./390'),
  module424 = require('./424'),
  module13 = require('./13'),
  c = module13.StatusBar,
  module393 = require('./393'),
  module510 = require('./510').strings;

exports.MAP_MODE_REGULAR = 'regular';
exports.MAP_MODE_GOTO_EDIT = 'goto';
exports.MAP_MODE_ZONED_CLEAN_EDIT = 'zone';
exports.MAP_MODE_MAP_EDIT = 'mapEdit';
exports.MAP_MODE_BLOCK_CLEAN_EDIT = 'block';
exports.MAP_MODE_CARPET_EDIT = 'carpet';
exports.MAP_MODE_FURNITURE_EDIT = 'furniture';
exports.MAP_MODE_EASTER_EGG = 'easteregg';
exports.MAP_MODE_DOORSILL_EDIT = 'doorsill';
exports.PhotoScale = 3;

var E = (function () {
  var _ = c.currentHeight;
  module393.isWindowDisplay;
  return _;
})();

exports.StatusBarHeight = E;
exports.AppBarHeight = 56;
var b = module393.isWindowDisplay ? 18 : 0;
exports.AppBorderRadius = b;
var u = 0;
exports.AppBarMarginTop = u;
var v = 0;
exports.AppBarMarginBottom = v;

if (module391.default.isIphoneX()) {
  exports.AppBarMarginTop = u = 24;
  exports.AppBarMarginBottom = v = 34;
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
var O = {
  Video_StartPreviewFailed_unKnownReason: {
    code: -100,
    msg: '\u5f00\u59cb\u9884\u89c8 \u672a\u77e5\u9519\u8bef',
    resolve: module510.video_error100_resolve,
  },
  Video_StartPreviewFailed_robotInCharge: {
    code: -101,
    msg: '\u5f00\u59cb\u9884\u89c8 \u673a\u5668\u6b63\u5728\u5145\u7535 robot in charge, denied preview',
    resolve: module510.video_error101_resolve,
  },
  Video_StartPreviewFailed_cameraStatusError: {
    code: -102,
    msg: '\u5f00\u59cb\u9884\u89c8 \u6444\u50cf\u5934\u72b6\u6001\u5f02\u5e38 camera status denied preview',
    resolve: module510.video_error102_resolve,
  },
  Video_StartPreviewFailed_innerUnknowReason: {
    code: -103,
    msg: '\u5f00\u59cb\u9884\u89c8 \u5185\u90e8\u672a\u77e5\u9519\u8bef',
    resolve: module510.video_error103_resolve,
  },
  Video_StartPreviewFailed_alreadyInPreview: {
    code: -104,
    msg: '\u5f00\u59cb\u9884\u89c8 \u53d1\u73b0\u89c6\u9891\u6b63\u5728\u9884\u89c8\u4e2d\u9519\u8bef',
    resolve: module510.video_error104_resolve,
  },
  Video_StartPreviewFailed_passwordError: {
    code: -105,
    msg: '\u5f00\u59cb\u9884\u89c8 \u8f93\u5165\u5bc6\u7801\u9519\u8bef password error, denied preview',
    resolve: module510.video_error105_resolve,
  },
  Video_StartPreviewFailed_passwordErrorFrequently: {
    code: -106,
    msg: '\u5f00\u59cb\u9884\u89c8 \u8fde\u7eed\u8f93\u5165\u5bc6\u7801\u9519\u8bef locking',
    resolve: module510.video_error105_resolve,
  },
  Video_StartPreviewFailed_robotIsDisconnecting: {
    code: -107,
    msg: '\u5f00\u59cb\u9884\u89c8 \u673a\u5668\u4eba\u6b63\u5728\u9000\u51fa \u7a0d\u540e\u518d\u8bd5',
    resolve: module510.video_error107_resolve,
  },
  Video_StartPreviewFailed_requestTurnserverFailed: {
    code: -108,
    msg: '\u5f00\u59cb\u9884\u89c8 \u8bf7\u6c42turn server \u5931\u8d25',
    resolve: module510.video_error108_resolve,
  },
  Video_GetTurnServerFailed: {
    code: -110,
    msg: '\u83b7\u53d6\u8f6c\u53d1\u670d\u52a1\u5668\u5931\u8d25',
    resolve: module510.video_error108_resolve,
  },
  Video_GetDeviceSdpFailed: {
    code: -111,
    msg: 'device sdp\u9519\u8bef',
    resolve: module510.video_error108_resolve,
  },
  Video_SendSDKSdpToDeviceFailed_responseTimeout: {
    code: -112,
    msg: '\u53d1\u9001sdk sdp\u4fe1\u606f \u5230device,\u8d85\u65f6 \u672a\u8fd4\u56de\u7ed3\u679c\u9519\u8bef',
    resolve: module510.video_error102_resolve,
  },
  Video_SendSDKSdpToDeviceFailed_processedError: {
    code: -113,
    msg: '\u53d1\u9001sdk sdp\u4fe1\u606f \u5230device, \u5904\u7406\u5931\u8d25',
    resolve: module510.video_error108_resolve,
  },
  Video_PreviewTimeout: {
    code: -114,
    msg: '\u9884\u89c8\u8d85\u65f6',
    resolve: module510.video_error114_resolve,
  },
  Video_PreviewCalledError: {
    code: -115,
    msg: '\u547c\u53eb\u89c6\u9891\u9519\u8bef (sdk \u6709\u5177\u4f53\u7684\u9519\u8bef\u7801)',
    resolve: module510.video_error115_resolve,
  },
  Video_PreviewDustCollectionError: {
    code: -116,
    msg: '\u5f00\u59cb\u9884\u89c8 \u673a\u5668\u6b63\u5728\u96c6\u5c18 robot in dust collection, denied preview',
    resolve: module510.video_error116_resolve,
  },
};
exports.VideoError = O;
var h = [
  {
    title: module510.video_definition_high,
    command: 'HD',
  },
  {
    title: module510.video_definition_normal,
    command: 'SD',
  },
];
exports.Definitions = h;
var D = {
  0: module510.map_object_name_xian,
  1: module510.map_object_name_baba,
  2: module510.map_object_name_shoe,
  3: module510.map_object_name_dizuo,
  4: module510.map_object_name_dizuo,
  5: module510.map_object_name_chapai,
  9: module510.map_object_name_tizhongcheng,
  10: module510.map_object_name_zhiwu,
  18: module510.map_obstacles_title18,
  25: module510.map_object_name_poqi,
  26: module510.map_object_name_henggan,
  27: module510.map_object_name_henggan,
  34: module510.map_object_name_zhiwu,
  42: module510.map_obstacles_title,
  48: module510.map_object_name_loosewire,
  49: module510.map_object_name_cat,
  50: module510.map_object_name_dog,
  51: module510.map_object_name_curledfabric,
};
exports.obstacleNames = D;
var A = {
  34: module510.map_object_name_sock,
};

function T() {
  return module390.default.isStructuredLightSupported()
    ? module510.map_object_desc_general_structure_light
    : module424.DMM.isTopazSV || module424.DMM.isPearlPlus
    ? module510.map_object_desc_general1
    : module390.default.isSingleLineLaserProduct()
    ? module510.map_object_desc_general_1
    : module510.map_object_desc_general;
}

exports.obstacleNamesBackup = A;
var M = {
  0: module510.map_object_desc_xian,
  1: module510.map_object_desc_baba,
  2: module510.map_object_desc_shoe,
  3: module510.map_object_desc_dizuo,
  4: module510.map_object_desc_dizuo,
  5: module510.map_object_desc_chapai,
  9: module510.map_object_desc_tizhongcheng,
  10: module510.map_object_desc_zhiwu,
  18: T(),
  25: module510.map_object_desc_poqi,
  26: module510.map_object_desc_henggan,
  27: module510.map_object_desc_henggan,
  34: module510.map_object_desc_zhiwu,
  42: T(),
  48: module510.map_object_desc_sanxian,
  49: module510.map_object_desc_chongwu,
  50: module510.map_object_desc_chongwu,
  51: module510.map_object_desc_zhituan,
};
exports.obstacleRemoveTips = M;
var R = {
  34: module510.map_object_desc_sock,
};
exports.obstacleRemoveTipsBackup = R;

exports.CleanFinishCleanReasons = function () {
  return {
    21: module510.finsh_reason_by_manual_interrupt,
    24: module510.localization_strings_Setting_History_index_15,
    29: module510.finsh_reason_by_manual_interrupt,
    32: module510.finsh_reason_by_breakpoint,
    33: module510.finsh_reason_by_breakpoint,
    34: module510.localization_strings_Setting_History_index_15,
    35: module510.finsh_reason_by_manual_interrupt,
    36: module510.finsh_reason_by_manual_interrupt,
    37: module510.finsh_reason_by_manual_interrupt,
    43: module510.finsh_reason_by_manual_interrupt,
    45: module510.finsh_reason_by_locate_fail,
    64: module510.localization_strings_Setting_History_index_15,
    65: module510.finsh_reason_by_locate_fail,
    48: module510.finsh_reason_by_manual_interrupt,
    49: module510.finsh_reason_by_manual_interrupt,
    50: module510.finsh_reason_by_manual_interrupt,
    51: module510.localization_strings_Setting_History_index_15,
    52: module510.localization_strings_Main_Constants_68,
    54: module510.localization_strings_Main_Constants_68,
    55: module510.localization_strings_Main_Constants_68,
    56: module510.localization_strings_Main_Constants_68,
    57: module510.localization_strings_Main_Constants_68,
    60: module510.finsh_reason_by_manual_interrupt,
    61: module510.finsh_reason_by_not_reach,
    62: module510.finsh_reason_by_not_reach,
    67: module510.cleanout_the_error,
    68: module510.back_to_the_wash_failure,
    101: module510.localization_strings_Setting_History_index_15,
    102: module510.finsh_reason_by_breakpoint,
    103: module510.finsh_reason_by_manual_interrupt,
    104: module510.localization_strings_Setting_History_index_15,
    105: module510.localization_strings_Setting_History_index_15,
    106: module510.localization_strings_Setting_History_index_15,
    107: module510.localization_strings_Setting_History_index_15,
    109: module510.localization_strings_Setting_History_index_15,
    110: module510.localization_strings_Setting_History_index_15,
  };
};

exports.OverTimer_Six = 6e3;
exports.OverTimer_Fifteen = 15e3;

exports.CleanStartType = function () {
  return {
    1: module510.robot_start_type_robot,
    2: module510.robot_start_type_app,
    3: module510.robot_start_type_timer,
    4: module510.robot_start_type_intelligence_scene,
    5: module510.robot_start_type_vocie,
    101: module510.robot_start_type_rr_intelligence_scene,
    801: module510.robot_start_type_alexa,
    802: module510.robot_start_type_google,
    803: module510.robot_start_type_ifttt,
    804: module510.robot_start_type_yandex,
    805: module510.robot_start_type_homekit,
    806: module510.robot_start_type_little_love,
    807: module510.robot_start_type_tmall,
    808: module510.robot_start_type_baidu,
    809: module510.robot_start_type_jd,
    810: module510.robot_start_type_siri,
    811: module510.robot_start_type_clova,
    901: module510.robot_start_type_wechat,
    902: module510.robot_start_type_alipay,
    903: module510.robot_start_type_green_rice,
    904: module510.robot_start_type_hisense,
    905: module510.robot_start_type_huawei,
  };
};
