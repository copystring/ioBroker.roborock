var module23 = require('@babel/runtime/helpers/slicedToArray'),
  regeneratorRuntime = require('regenerator-runtime'),
  module382 = require('./382'),
  module1326 = require('./1326'),
  module394 = require('./394'),
  module414 = require('./414'),
  module1507 = require('./1507'),
  module418 = require('./418'),
  module1329 = require('./1329'),
  module1508 = require('./1508'),
  module417 = require('./417'),
  module416 = require('./416'),
  module1509 = require('./1509'),
  module390 = require('./390'),
  module422 = require('./422'),
  R = null,
  module500 = require('./500').strings,
  module398 = require('./398'),
  O = module398.fromSqmmToSqm,
  y = module398.fromSecToMin,
  module393 = require('./393'),
  G = {
    UNKNOWN: 'UNKNOWN',
    INITIAL: 'INITIAL',
    SLEEPING: 'SLEEPING',
    WAITING: 'WAITING',
    REMOTE: 'REMOTE',
    CLEAN: 'CLEAN',
    BACK_TO_DOCK: 'BACK_TO_DOCK',
    CHARGING: 'CHARGING',
    CHARGE_ERROR: 'CHARGE_ERROR',
    FULL_CHARGE: 'FULL_CHARGE',
    PAUSE: 'PAUSE',
    SPOT_CLEAN: 'SPOT_CLEAN',
    MALFUNCTIONING: 'MALFUNCTIONING',
    PREPARE_SHUTDOWN: 'PREPARE_SHUTDOWN',
    UPDATING: 'UPDATING',
    RUB_TO_DOCK: 'RUB_TO_DOCK',
    GOTO_TARGET: 'GOTO_TARGET',
    ZONED_CLEAN: 'ZONED_CLEAN',
    SEGMENT_CLEAN: 'SEGMENT_CLEAN',
    OFF_LINE: 'OFF_LINE',
    LOCKED: 'LOCKED',
    COLLECTING_DUST: 'COLLECTING_DUST',
    WASHING_DUSTER: 'WASHING_DUSTER',
    MOPPING: 'MOPPING',
    CLEAN_MOP_CLEANING: 'CLEAN_MOP_CLEANING',
    CLEAN_MOP_MOPPING: 'CLEAN_MOP_MOPPING',
    SEGMENT_MOPPING: 'SEGMENT_MOPPING',
    SEGMENT_CLEAN_MOP_CLEANING: 'SEGMENT_CLEAN_MOP_CLEANING',
    SEGMENT_CLEAN_MOP_MOPPING: 'SEGMENT_CLEAN_MOP_MOPPING',
    ZONED_MOPPING: 'ZONED_MOPPING',
    ZONED_CLEAN_MOP_CLEANING: 'ZONED_CLEAN_MOP_CLEANING',
    ZONED_CLEAN_MOP_MOPPING: 'ZONED_CLEAN_MOP_MOPPING',
    BACK_TO_DOCK_WASHING_DUSTER: 'BACK_TO_DOCK_WASHING_DUSTER',
    AIR_DRYING_STOPPING: 'AIR_DRYING_STOPPING',
    VOICE_CHATTING: 'VOICE_CHATTING',
    QUICK_BUILDING_MAP: 'QUICK_BUILDING_MAP',
    EGG_ATTACK: 'EGG_ATTACK',
  };

exports.RobotState = G;
exports.RobotCompactState = {
  UNKNOWN: 'UNKNOWN',
  INITIAL: 'INITIAL',
  SLEEPING: 'SLEEPING',
  WAITING: 'WAITING',
  REMOTE: 'REMOTE',
  CLEAN: 'CLEAN',
  BACK_TO_DOCK: 'BACK_TO_DOCK',
  CHARGING: 'CHARGING',
  CHARGE_ERROR: 'CHARGE_ERROR',
  FULL_CHARGE: 'FULL_CHARGE',
  PAUSE: 'PAUSE',
  SPOT_CLEAN: 'SPOT_CLEAN',
  MALFUNCTIONING: 'MALFUNCTIONING',
  PREPARE_SHUTDOWN: 'PREPARE_SHUTDOWN',
  UPDATING: 'UPDATING',
  RUB_TO_DOCK: 'RUB_TO_DOCK',
  GOTO_TARGET: 'GOTO_TARGET',
  ZONED_CLEAN: 'ZONED_CLEAN',
  SEGMENT_CLEAN: 'SEGMENT_CLEAN',
  OFF_LINE: 'OFF_LINE',
};
Object.freeze(G);
var D = {
  0: {
    name: module500.localization_strings_Common_Constants_0,
    value: G.UNKNOWN,
  },
  1: {
    name: module500.localization_strings_Common_Constants_1,
    value: G.INITIAL,
  },
  2: {
    name: module500.localization_strings_Common_Constants_2,
    value: G.SLEEPING,
  },
  3: {
    name: module500.localization_strings_Common_Constants_3,
    value: G.WAITING,
  },
  7: {
    name: module500.localization_strings_Common_Constants_4,
    value: G.REMOTE,
  },
  5: {
    name: module500.localization_strings_Common_Constants_1,
    value: G.CLEAN,
  },
  6: {
    name: module500.localization_strings_Common_Constants_6,
    value: G.BACK_TO_DOCK,
  },
  8: {
    name: module500.localization_strings_Common_Constants_8,
    value: G.CHARGING,
  },
  9: {
    name: module500.localization_strings_Common_Constants_10,
    value: G.CHARGE_ERROR,
  },
  10: {
    name: module500.localization_strings_Common_Constants_11,
    value: G.PAUSE,
  },
  11: {
    name: module500.localization_strings_Common_Constants_12,
    value: G.SPOT_CLEAN,
  },
  12: {
    name: module500.localization_strings_Common_Constants_13,
    value: G.MALFUNCTIONING,
  },
  14: {
    name: module500.localization_strings_Common_Constants_15,
    value: G.UPDATING,
  },
  15: {
    name: module500.localization_strings_Common_Constants_6,
    value: G.RUB_TO_DOCK,
  },
  16: {
    name: module500.rubys_main_subtitle_goto_target,
    value: G.GOTO_TARGET,
  },
  17: {
    name: module500.rubys_main_button_text_zone,
    value: G.ZONED_CLEAN,
  },
  18: {
    name: module500.rubys_main_segment_clean_alert,
    value: G.SEGMENT_CLEAN,
  },
  22: {
    name: module500.robot_status_collecting_dust,
    value: G.COLLECTING_DUST,
  },
  23: {
    name: module500.robot_status_washing_duster,
    value: G.WASHING_DUSTER,
  },
  25: {
    name: module500.robot_status_washing_duster,
    value: G.WASHING_DUSTER,
  },
  26: {
    name: module500.robot_status_back_dock_washing_duster,
    value: G.BACK_TO_DOCK_WASHING_DUSTER,
  },
  28: {
    name: module500.be_on_the_phone,
    value: G.VOICE_CHATTING,
  },
  29: {
    name: module500.robot_status_quick_building_map,
    value: G.QUICK_BUILDING_MAP,
  },
  30: {
    name: module500.robot_status_egg_attack,
    value: G.EGG_ATTACK,
  },
  100: {
    name: module500.localization_strings_Common_Constants_17,
    value: G.FULL_CHARGE,
  },
  101: {
    name: module500.localization_strings_Common_Constants_18,
    value: G.OFF_LINE,
  },
  102: {
    name: module500.localization_strings_Common_Constants_20,
    value: G.UNKNOW,
  },
  103: {
    name: module500.robot_status_locked_when_saving_map,
    value: G.LOCKED,
  },
  202: {
    name: module500.robot_status_air_drying_stopping,
    value: G.AIR_DRYING_STOPPING,
  },
  6301: {
    name: module500.robot_status_mopping,
    value: G.MOPPING,
  },
  6302: {
    name: module500.localization_strings_Common_Constants_1,
    value: G.CLEAN_MOP_CLEANING,
  },
  6303: {
    name: module500.robot_status_mopping,
    value: G.CLEAN_MOP_MOPPING,
  },
  6304: {
    name: module500.robot_status_segment_mopping,
    value: G.SEGMENT_MOPPING,
  },
  6305: {
    name: module500.rubys_main_segment_clean_alert,
    value: G.SEGMENT_CLEAN_MOP_CLEANING,
  },
  6306: {
    name: module500.robot_status_segment_mopping,
    value: G.SEGMENT_CLEAN_MOP_MOPPING,
  },
  6307: {
    name: module500.robot_status_zone_mopping,
    value: G.ZONED_MOPPING,
  },
  6308: {
    name: module500.rubys_main_button_text_zone,
    value: G.ZONED_CLEAN_MOP_CLEANING,
  },
  6309: {
    name: module500.robot_status_zone_mopping,
    value: G.ZONED_CLEAN_MOP_MOPPING,
  },
  6310: {
    name: module500.robot_status_back_dock_washing_duster,
    value: G.BACK_TO_DOCK_WASHING_DUSTER,
  },
};
exports.CleanMode = {
  Global_Clean: 'Global_Clean',
  Segment_Clean: 'Segment_Clean',
  Zone_Clean: 'Zone_Clean',
};
var L = {
  None: 'None',
  Global_Clean: 'Global_Clean',
  Segment_Clean: 'Segment_Clean',
  Zone_Clean: 'Zone_Clean',
  Quick_Build_Map: 'Quick_Build_Map',
};
exports.CleanResumeFlag = L;
Object.freeze(L);
var P = {
    0: L.None,
    1: L.Global_Clean,
    2: L.Zone_Clean,
    3: L.Segment_Clean,
    4: L.Quick_Build_Map,
  },
  b = {
    None: 'None',
    Has: 'Has',
  };
exports.BackDockResumeFlag = b;
Object.freeze(b);
var w = {
  None: 'None',
  Has_WithoutSegments: 'Has_WithoutSegments',
  Has_WithSegments: 'Has_WithSegments',
};
exports.MapStatus = w;
Object.freeze(w);
var U = {
  0: w.None,
  1: w.Has_WithoutSegments,
  3: w.Has_WithSegments,
};
exports.MapStatusCodeMap = U;
exports.RobotStatusInMap = {
  UNKNOWN: 'Locating',
  INITIAL: null,
  SLEEPING: 'Sleeping',
  WAITING: 'Waiting',
  REMOTE: 'Running',
  CLEAN: 'Running',
  BACK_TO_DOCK: 'Running',
  SEARCH_FOR_DOCK: null,
  CHARGING: 'Charging',
  CHARGE_ERROR: 'Warning',
  PAUSE: 'Waiting',
  SPOT_CLEAN: 'Running',
  MALFUNCTIONING: 'Warning',
  PREPARE_SHUTDOWN: null,
  UPDATING: null,
  RUB_TO_DOCK: 'Running',
  GOTO_TARGET: 'Running',
  ZONED_CLEAN: 'Running',
  SEGMENT_CLEAN: 'Running',
  ZONED_PAUSE: 'Waiting',
  FULL_CHARGE: 'Charged',
  OFF_LINE: null,
  UNKNOWN_STATUES: null,
  EGG_ATTACK: null,
};
var H = {
  Timer: 1,
  AirdryFinishTime: 2,
  PureClean: 3,
  PureMop: 4,
  WaitCharge: 5,
  UnsaveMapReason: 6,
  HasNewMap: 7,
};
exports.SpecialInfoType = H;
exports.CarpetEditMode = {
  CarpetIgnore: 1,
  CarpetAdd: 2,
};
var K = {
  Saved: 0,
  ChargerOffset: 1,
  Relocation: 2,
  ReachMaxFloorCount: 3,
  Unfinished: 4,
  DidNotStartFromCharger: 5,
  DidNotReturnToCharger: 6,
};
exports.UnsaveMapReason = K;
exports.UnsaveMapHandle = {
  Ignore: 0,
  Update: 1,
  Load: 2,
  Done: 3,
};

var module12 = require('./12'),
  x = module12.DeviceEventEmitter,
  W = {
    RRHomeSecStatusDisconnected: 0,
    RRHomeSecStatusConnected: 1,
    RRHomeSecStatusDisconnecting: 2,
  };

exports.RRHomeSecStatus = W;

var B = (function () {
  function t() {
    o.default(this, t);

    if (!R) {
      this.init();
      R = this;
    }

    return R;
  }

  module5.default(
    t,
    [
      {
        key: 'init',
        value: function () {
          var t = this;
          this.id = Math.ceil(1e4 * Math.random());
          this.lastUpdateTime = 0;
          this.isLocating = false;
          this.staticTotalCount = 0;
          this.countryCode = 'cn';
          this.serverCode = 'cn';
          this.suppliesShouldShowRedDot = false;
          this.robotFeatures = [];
          this.state = G.UNKNOWN;
          this.stateName = module500.localization_strings_Common_Constants_0;
          this.isCurrentMapChanged = false;
          this.lastMapId = null;
          this.isEnterBackgroundWhenCleaning = false;
          this.robotNewFeatures = 0;
          this.lastCameraStatusLockTime = 0;
          this.lastMotionStatusLockTime = 0;
          this.lastHomeSecStatusLockTime = 0;
          this.hasShownChargingResumeCleanReminder = false;
          this.hasShownChargedResumeCleanReminder = false;
          this.cameraStatusLocked = false;
          this.wifiDebug = false;
          this.voiceChat = false;
          this.validTids = [];
          this.specialInfo = null;
          this.hasConnectedWashDock = false;
          this.lastDockType = 0;
          var s;
          regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.DockType));

                  case 2:
                    s = o.sent;
                    t.lastDockType = parseInt(s);
                    console.log('readDockType', s);
                    t.hasConnectedWashDock = s && (2 == parseInt(s) || 3 == parseInt(s));

                  case 6:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'mockPureCleaningMode',
        value: function () {
          this.clean_mop_status = undefined;
        },
      },
      {
        key: 'mockPureMoppingMode',
        value: function () {
          this.clean_mop_status = 2;
        },
      },
      {
        key: 'mockCleanMopCleaningMode',
        value: function () {
          this.clean_mop_status = 7;
        },
      },
      {
        key: 'isPureCleaningMode',
        value: function () {
          return undefined == this.clean_mop_status || 1 == this.clean_mop_status;
        },
      },
      {
        key: 'isPureMoppingMode',
        value: function () {
          return 2 == this.clean_mop_status;
        },
      },
      {
        key: 'isCleanMopCleaningMode',
        value: function () {
          return 7 == this.clean_mop_status;
        },
      },
      {
        key: 'isCleanMopMoppingMode',
        value: function () {
          return 6 == this.clean_mop_status;
        },
      },
      {
        key: 'isFnishCleanBackDock',
        value: function () {
          return !this.isCleanMopMoppingMode() && this.state == G.BACK_TO_DOCK;
        },
      },
      {
        key: 'isFnishCleanChargingOnDock',
        value: function () {
          return !this.isCleanMopMoppingMode() && this.isChargingOnDock();
        },
      },
      {
        key: 'isBackDockWashingDusterMode',
        value: function () {
          return 1 == this.back_type;
        },
      },
      {
        key: 'parseRobotMotionStatus',
        value: function (t) {
          this.originState = t.state;
          if (8 == t.state)
            100 == t.battery
              ? ((t.state = 100), (this.isWaitValleyCharge = false))
              : (this.isWaitValleyCharge = module390.default.isSupportedValleyElectricity() && 0 == t.charge_status);
          else this.isWaitValleyCharge = false;
          if (15 == t.state) t.state = 1 == t.stop_fan_motor_work_status ? 202 : 6;
          if (6 == t.state && 1 == t.back_type) t.state = 6310;
          this.clean_mop_status = t.clean_mop_status;
          this.back_type = t.back_type;

          if (5 == t.state) {
            if (this.isPureMoppingMode()) t.state = 6301;
            if (this.isCleanMopCleaningMode()) t.state = 6302;
            if (this.isCleanMopMoppingMode()) t.state = 6303;
          }

          if (18 == t.state) {
            if (this.isPureMoppingMode()) t.state = 6304;
            if (this.isCleanMopCleaningMode()) t.state = 6305;
            if (this.isCleanMopMoppingMode()) t.state = 6306;
          }

          if (17 == t.state) {
            if (this.isPureMoppingMode()) t.state = 6307;
            if (this.isCleanMopCleaningMode()) t.state = 6308;
            if (this.isCleanMopMoppingMode()) t.state = 6309;
          }

          if (1 == t.lock_status) t.state = 103;
          this.state = D[parseInt(t.state)].value;
          this.stateName = this.isWaitValleyCharge ? module500.robot_status_wait_charge : D[parseInt(t.state)].name;
          this.cleanResumeFlag = P[parseInt(t.in_cleaning)];
          this.backDockResumeFlag = 1 == parseInt(t.in_returning) ? b.Has : b.None;
          this.isError = 12 == t.state;
        },
      },
      {
        key: 'parseStatus',
        value: function (t) {
          var o, u, module394, h, C, R, v, A, D, L, P, b;
          return regeneratorRuntime.default.async(
            function (F) {
              for (;;)
                switch ((F.prev = F.next)) {
                  case 0:
                    this.specialInfo = null;
                    if ((u = new Date().getTime()) - this.lastMotionStatusLockTime >= 2e3) this.parseRobotMotionStatus(t);
                    else {
                      module417.Log.log(module416.LogTypes.KeyEvent, 'lock robot motion status,skip this loop');
                      this.lastMotionStatusLockTime = 0;
                    }
                    this.cleanArea = O(parseInt(t.clean_area));
                    this.cleanTime = y(parseInt(t.clean_time));
                    this.fanPower = module382.fixCleanMode(parseInt(t.fan_power)) || 102;
                    this.avoidCount = t.avoid_count;
                    this.isWaterBoxIn = 1 == parseInt(t.water_box_status);
                    this.isWaterBoxCarriageIn = 1 == parseInt(t.water_box_carriage_status);
                    this.isMopForbiddenEnabled = 1 == parseInt(t.mop_forbidden_enable);
                    this.isCleanFBZEnabled = 1 == parseInt(t.sfzs);
                    this.battery = parseInt(t.battery);
                    this.isRunning = 1 != t.in_fresh_state;
                    this.isLocating = !!t.is_locating;
                    this.notDisturbEnabled = 1 == t.dnd_enabled;
                    this.mapSaveEnabled = 1 == t.lab_status || 3 == t.lab_status;
                    this.multiFloorEnabled = 3 == t.lab_status;
                    this.switchMapMode = t.switch_map_mode;
                    module394 = parseInt(t.map_status);
                    this.mapStatus = U[module394 % 4];
                    this.currentMapId = this.isLocating ? -1 : module394 >> 2;
                    this.isCurrentMapChanged = null != this.lastMapId && this.currentMapId != this.lastMapId;
                    this.lastMapId = this.currentMapId;
                    this.wifiDebug = 1 == t.debug_mode;
                    this.voiceChat = 1 == t.voice_chat_status;
                    this.isAirDrying = this.isChargingOnDock() && 1 == t.fan_motor_work_status;
                    this.isWarmUp = 1 == t.in_warmup;
                    this.unsaveMapReason = t.unsave_map_reason;
                    this.unsaveMapFlag = t.unsave_map_flag;
                    if (63 == this.currentMapId) this.currentMapId = -1;
                    if (u - this.lastHomeSecStatusLockTime >= 2e3) this.homeSecStatus = t.home_sec_status;
                    else {
                      module417.Log.log(module416.LogTypes.KeyEvent, 'lock home sec status,skip this loop');
                      this.lastHomeSecStatusLockTime = 0;
                    }
                    this.isExploring = 1 == t.is_exploring;
                    if (u - this.lastCameraStatusLockTime >= 2e3 && !this.cameraStatusLocked) module1508.default.parseCameraStatus(t.camera_status);
                    else {
                      module417.Log.log(module416.LogTypes.KeyEvent, 'lock camera status,skip this loop');
                      this.lastCameraStatusLockTime = 0;
                    }

                    if (t.adbumper_status) {
                      h = module23.default(t.adbumper_status, 3);
                      C = h[0];
                      R = h[1];
                      v = h[2];
                      this.bumperLeft = C && 1 == ((C >> 7) & 1);
                      this.bumperMiddle = R && 1 == ((R >> 7) & 1);
                      this.bumperRight = v && 1 == ((v >> 7) & 1);

                      A = function (t) {
                        return !!(t && ((t >> 1) & true || (t >> 3) & true || (t >> 4) & true || (t >> 6) & true));
                      };

                      this.obstacleLeft = A(C);
                      this.obstacleMiddle = A(R);
                      this.obstacleRight = A(v);
                    }

                    this.errorCode = parseInt(t.error_code || t.dock_error_status);
                    F.next = 37;
                    return regeneratorRuntime.default.awrap(this.parseEvents(t.events));

                  case 37:
                    this.dockErrorStatus = t.dock_error_status;
                    if (undefined != t.water_box_mode) this.waterBoxMode = parseInt(t.water_box_mode);
                    this.secPasswordEnabled = 1 == t.home_sec_enable_password;
                    this.originDockType = t.dock_type;
                    if (5 == t.dock_type && (t.dock_type = 1) && module422.DMM.currentSeries == module422.DeviceSeries.a15) t.dock_type = 0;
                    this.dockType = t.dock_type;
                    if (t.dock_type >= 0) module418.SetStorageKey(module418.StorageKeys.DockType, t.dock_type + '');
                    this.isCollectDustDock = 1 == t.dock_type || 3 == t.dock_type;
                    this.isAutoDustCollectionOff = 0 == t.auto_dust_collection;
                    this.checkHowToHandleMapManager();
                    this.lastUpdateTime = new Date().getTime();
                    if (undefined != t.mop_mode) this.mopMode = parseInt(t.mop_mode);
                    if (undefined != t.water_shortage_status) this.waterShortageStatus = parseInt(t.water_shortage_status);
                    this.waterBoxDistance = t.distance_off || 0;
                    this.mopModeId = t.mop_template_id;
                    this.isWashReady = 1 == t.wash_ready;
                    if (this.isCurrentMapChanged)
                      x.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module418.EventKeys.CurrentMapDidChange,
                      });
                    F.next = 56;
                    return regeneratorRuntime.default.awrap(module1509.TLM.GetListByHours(6));

                  case 56:
                    if (
                      ((D = F.sent),
                      (this.nextTimer = D.length > 0 ? D[0] : null),
                      (null == (o = this.nextTimer) ? undefined : o.hour) < 6 && (this.nextTimer = null),
                      (L =
                        module1329.MM.mapData &&
                        !module1329.MM.mapData.map.isEmpty &&
                        module390.default.isMultiFloorSupported() &&
                        z.mapSaveEnabled &&
                        z.mapStatus != w.None &&
                        !z.isRunning &&
                        -1 == z.currentMapId &&
                        z.state != G.LOCKED),
                      !module390.default.isUnsaveMapReasonSupported() || this.unsaveMapReason != K.ChargerOffset || -1 == this.unsaveMapFlag)
                    ) {
                      F.next = 65;
                      break;
                    }

                    this.specialInfo = {
                      text: module500.home_special_tip_for_charger_offset,
                      actionStyle: H.UnsaveMapReason,
                    };
                    return F.abrupt('return');

                  case 65:
                    if (!L) {
                      F.next = 70;
                      break;
                    }

                    this.specialInfo = {
                      text: module500.home_special_tip_for_new_map,
                      actionStyle: H.HasNewMap,
                    };
                    return F.abrupt('return');

                  case 70:
                    if (!(this.isAirDrying && t.fan_motor_work_time && t.fan_motor_work_time > 0)) {
                      F.next = 75;
                      break;
                    }

                    this.specialInfo = {
                      text: module500.home_sepcial_info_airdry_finish_time.templateStringWithParams({
                        hour: (t.fan_motor_work_time / 60).toFixed(1),
                      }),
                      actionStyle: H.AirdryFinishTime,
                    };
                    return F.abrupt('return');

                  case 75:
                    if (!module390.default.isPureCleanMopSupported() || this.fanPower != module1326.CleanModeZero || !this.isCleaning()) {
                      F.next = 80;
                      break;
                    }

                    this.specialInfo = {
                      text: module500.home_sepecial_tip_for_only_mop,
                      actionStyle: H.PureMop,
                    };
                    return F.abrupt('return');

                  case 80:
                    if (!module390.default.isPureCleanMopSupported() || this.waterBoxMode != module1326.WaterModeZero || !this.isCleaning()) {
                      F.next = 85;
                      break;
                    }

                    this.specialInfo = {
                      text: module500.home_sepecial_tip_for_only_clean,
                      actionStyle: H.PureClean,
                    };
                    return F.abrupt('return');

                  case 85:
                    if (!this.isWaitValleyCharge) {
                      F.next = 90;
                      break;
                    }

                    this.specialInfo = {
                      text: module500.home_special_tip_for_wait_charge,
                      actionStyle: H.WaitCharge,
                    };
                    return F.abrupt('return');

                  case 90:
                    if (!this.nextTimer || this.isCleaning()) {
                      F.next = 93;
                      break;
                    }

                    this.specialInfo = {
                      text: module500.home_special_info_timer.templateStringWithParams({
                        cleanTime: null != (P = null == (b = this.nextTimer) ? undefined : b.cleanTime) ? P : '',
                      }),
                      actionStyle: H.Timer,
                    };
                    return F.abrupt('return');

                  case 93:
                  case 'end':
                    return F.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'isHomeSecDisconnecting',
        value: function () {
          return this.homeSecStatus == W.RRHomeSecStatusDisconnecting;
        },
      },
      {
        key: 'isHomeSecControlledByCurrentClient',
        value: function () {
          return this.homeSecClientID && this.homeSecClientID == module393.appClientID;
        },
      },
      {
        key: 'isHomeSecFreeControl',
        value: function () {
          return this.homeSecClientID && 'none' == this.homeSecClientID;
        },
      },
      {
        key: 'isHomeSecRunning',
        value: function () {
          return this.homeSecStatus == W.RRHomeSecStatusConnected;
        },
      },
      {
        key: 'isHomeSecDisconnected',
        value: function () {
          return this.homeSecStatus == W.RRHomeSecStatusDisconnected;
        },
      },
      {
        key: 'parseEvents',
        value: function (t) {
          var s, o, u, l;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      (s = t.filter(function (s) {
                        return t && module1507.Toast[s];
                      }))[0]
                    )
                      this.currentToast = s[0];
                    else this.currentToast = '';
                    if (this.currentToast && this.currentToast.length > 0)
                      x.emit(module418.NotificationKeys.EventToastChange, {
                        data: this.currentToast,
                      });
                    this.handleSpecialToast();
                    o = t.filter(function (s) {
                      return t && module1507.Reminder()[s];
                    });
                    c.next = 7;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.HasShownFullChargeReminder));

                  case 7:
                    if (((u = c.sent), this.state != G.FULL_CHARGE || u)) {
                      c.next = 18;
                      break;
                    }

                    o = o.concat('full_charge');
                    c.prev = 10;
                    c.next = 13;
                    return regeneratorRuntime.default.awrap(
                      module418.SetStorageKey(module418.StorageKeys.HasShownFullChargeReminder, module418.StorageKeys.HasShownFullChargeReminder)
                    );

                  case 13:
                    c.next = 18;
                    break;

                  case 15:
                    c.prev = 15;
                    c.t0 = c.catch(10);
                    console.log('full charge SetStorageKey error  -- ' + c.t0);

                  case 18:
                    if (((l = module394.default.sharedCache().notDisturbReminder), (c.t2 = this.notDisturbEnabled), !c.t2)) {
                      c.next = 24;
                      break;
                    }

                    c.next = 23;
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.HasShownNotDisturbReminder));

                  case 23:
                    c.t2 = !c.sent;

                  case 24:
                    if (((c.t1 = c.t2), !c.t1)) {
                      c.next = 27;
                      break;
                    }

                    c.t1 = !l;

                  case 27:
                    if (!c.t1) {
                      c.next = 38;
                      break;
                    }

                    module394.default.sharedCache().notDisturbReminder = true;
                    o = o.concat('noDisturb');
                    c.prev = 30;
                    c.next = 33;
                    return regeneratorRuntime.default.awrap(
                      module418.SetStorageKey(module418.StorageKeys.HasShownNotDisturbReminder, module418.StorageKeys.HasShownNotDisturbReminder)
                    );

                  case 33:
                    c.next = 38;
                    break;

                  case 35:
                    c.prev = 35;
                    c.t3 = c.catch(30);
                    console.log('notDisturb SetStorageKey error  -- ' + c.t3);

                  case 38:
                    if (!(this.state != G.CHARGING || this.isCleanMopMoppingMode() || this.cleanResumeFlag == L.None || this.hasShownChargingResumeCleanReminder)) {
                      o = this.notDisturbEnabled ? o.concat('chargingResumeNoDisturbClean') : o.concat('chargingResumeClean');
                      this.hasShownChargingResumeCleanReminder = true;
                    }

                    if (!(this.state != G.FULL_CHARGE || this.cleanResumeFlag == L.None || this.hasShownChargedResumeCleanReminder)) {
                      o = o.concat('chargedResumeClean');
                      this.hasShownChargedResumeCleanReminder = true;
                    }

                    if (!module394.default.sharedCache().waterShortageNotification && this.isWaterBoxIn && this.isWaterBoxCarriageIn && this.waterShortageStatus)
                      o = o.concat('water_shortage_reminder');
                    if (!((!this.isCleaning() && this.cleanResumeFlag != L.None) || ('chargingResumeClean' != this.currentReminder && 'full_charge' != this.currentReminder)))
                      this.closeReminder();
                    if (o[0] && !this.errorCode) this.currentReminder = o[0];
                    this.handleSpecialReminder();

                  case 45:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [
              [10, 15],
              [30, 35],
            ],
            Promise
          );
        },
      },
      {
        key: 'handleSpecialToast',
        value: function () {
          if (
            [
              'goto_target_succ',
              'relocate_fail',
              'segment_clean_succ',
              'zoned_clean_succ',
              'zoned_clean_partial_done',
              'zoned_clean_failed',
              'segment_clean_part_done',
              'target_not_reachable',
            ].indexOf(this.currentToast) >= 0
          )
            x.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
              data: this.currentToast,
            });
        },
      },
      {
        key: 'handleSpecialReminder',
        value: function () {
          if (['relocate_failed_fz_clean', 'relocate_failed_fz_back', 'remind_to_save_map'].indexOf(this.currentReminder) >= 0)
            x.emit(module418.NotificationKeys.DidReceiveSpecialEvents, {
              data: this.currentReminder,
            });
        },
      },
      {
        key: 'start',
        value: function () {
          var t,
            s = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!this.timer) {
                      o.next = 2;
                      break;
                    }

                    return o.abrupt('return');

                  case 2:
                    this.timer;
                    this.stop();
                    t = this;
                    this.timer = setInterval(function () {
                      return regeneratorRuntime.default.async(
                        function (s) {
                          for (;;)
                            switch ((s.prev = s.next)) {
                              case 0:
                                s.next = 2;
                                return regeneratorRuntime.default.awrap(t.getStatus());

                              case 2:
                              case 'end':
                                return s.stop();
                            }
                        },
                        null,
                        null,
                        null,
                        Promise
                      );
                    }, 2e3);
                    o.next = 8;
                    return regeneratorRuntime.default.awrap(t.getStatus());

                  case 8:
                    x.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (t) {
                      if (t.data == module418.EventKeys.MapSaveSwitchChanged) s.getStatus();
                    });

                  case 9:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'stop',
        value: function () {
          clearInterval(this.timer);
          this.timer = null;
        },
      },
      {
        key: 'getStatus',
        value: function () {
          var t, module23;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getStatus());

                  case 3:
                    t = o.sent;
                    console.log('Computed Status - ' + JSON.stringify(t));
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(this.parseStatus(t.result[0]));

                  case 7:
                    x.emit(module418.NotificationKeys.RobotStatusDidUpdate);
                    o.prev = 8;
                    o.next = 11;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.ValidConnect, module418.StorageKeys.ValidConnect));

                  case 11:
                    o.next = 16;
                    break;

                  case 13:
                    o.prev = 13;
                    o.t0 = o.catch(8);
                    console.log('getStatus SetStorageKey error  -- ' + o.t0);

                  case 16:
                    this.isValidConnect = true;
                    module417.Log.log(module416.LogTypes.LoopStatus, this.briefInfo(), module416.InfoColors.Success);
                    o.next = 34;
                    break;

                  case 20:
                    o.prev = 20;
                    o.t1 = o.catch(0);
                    module417.Log.log(module416.LogTypes.LoopStatus, 'RSM get status failed - ' + JSON.stringify(o.t1), module416.InfoColors.Fail, false);
                    module23 = o.t1.data && o.t1.data.error && (-10002 == o.t1.data.error.code || -10002 == o.t1.data.error);
                    this.isValidConnect = !module23;
                    o.prev = 25;
                    o.next = 28;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.ValidConnect, module23 ? '' : module418.StorageKeys.ValidConnect));

                  case 28:
                    o.next = 33;
                    break;

                  case 30:
                    o.prev = 30;
                    o.t2 = o.catch(25);
                    console.log('getStatus error SetStorageKey error  -- ' + o.t2);

                  case 33:
                    if (module23 && !this.hasShow10002Error) {
                      this.hasShow10002Error = true;
                      console.log('get Error10002');
                      x.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module418.EventKeys.Error10002,
                      });
                    }

                  case 34:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [
              [0, 20],
              [8, 13],
              [25, 30],
            ],
            Promise
          );
        },
      },
      {
        key: 'closeReminder',
        value: function () {
          if ('water_shortage_reminder' == this.currentReminder) module394.default.sharedCache().waterShortageNotification = true;
          this.currentReminder = '';
        },
      },
      {
        key: 'closeError',
        value: function () {
          this.errorCode = 0;
        },
      },
      {
        key: 'isCleaning',
        value: function () {
          return this.state == G.CLEAN || this.state == G.SEGMENT_CLEAN || this.state == G.ZONED_CLEAN || this.state == G.SPOT_CLEAN;
        },
      },
      {
        key: 'isZonedCleaning',
        value: function () {
          return this.state == G.ZONED_CLEAN;
        },
      },
      {
        key: 'isSegmentCleaning',
        value: function () {
          return this.state == G.SEGMENT_CLEAN;
        },
      },
      {
        key: 'isPureMopping',
        value: function () {
          return this.state == G.MOPPING || this.state == G.SEGMENT_MOPPING || this.state == G.ZONED_MOPPING;
        },
      },
      {
        key: 'isCleanMopCleaning',
        value: function () {
          return this.state == G.CLEAN_MOP_CLEANING || this.state == G.SEGMENT_CLEAN_MOP_CLEANING || this.state == G.ZONED_CLEAN_MOP_CLEANING;
        },
      },
      {
        key: 'isCleanMopMopping',
        value: function () {
          return this.state == G.CLEAN_MOP_MOPPING || this.state == G.SEGMENT_CLEAN_MOP_MOPPING || this.state == G.ZONED_CLEAN_MOP_MOPPING;
        },
      },
      {
        key: 'isInCleanMopping',
        value: function () {
          return this.isCleanMopCleaning() || this.isCleanMopMopping();
        },
      },
      {
        key: 'isInBackDockTask',
        value: function () {
          return this.state == G.BACK_TO_DOCK || this.state == G.BACK_TO_DOCK_WASHING_DUSTER || z.state == G.COLLECTING_DUST || this.isAirDrying;
        },
      },
      {
        key: 'isBackDockTaskResumeable',
        value: function () {
          return this.state == G.PAUSE || this.state == G.SLEEPING || this.state == G.MALFUNCTIONING;
        },
      },
      {
        key: 'isReadyForCleanTaskResume',
        value: function () {
          return (
            this.state == G.PAUSE || this.state == G.SLEEPING || this.state == G.WAITING || this.state == G.MALFUNCTIONING || this.isInBackDockTask() || this.isChargingOnDock()
          );
        },
      },
      {
        key: 'isCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag != L.None;
        },
      },
      {
        key: 'isGlobalCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == L.Global_Clean;
        },
      },
      {
        key: 'isSegmentCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == L.Segment_Clean;
        },
      },
      {
        key: 'isZoneCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == L.Zone_Clean;
        },
      },
      {
        key: 'isQuickBuildMapTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == L.Quick_Build_Map;
        },
      },
      {
        key: 'isBackDockTaskShouldResume',
        value: function () {
          return this.isBackDockTaskResumeable() && this.backDockResumeFlag == b.Has;
        },
      },
      {
        key: 'isInSpotCleaning',
        value: function () {
          return this.state == G.SPOT_CLEAN;
        },
      },
      {
        key: 'isReadyToCmd',
        value: function () {
          return this.state == G.SLEEPING || this.state == G.WAITING;
        },
      },
      {
        key: 'isReadyToNewClean',
        value: function () {
          return (this.isReadyToCmd() || this.state == G.PAUSE || this.isChargingOnDock()) && this.cleanResumeFlag == L.None;
        },
      },
      {
        key: 'isChargingOnDock',
        value: function () {
          return this.state == G.CHARGING || this.state == G.FULL_CHARGE;
        },
      },
      {
        key: 'isOnDock',
        value: function () {
          return this.state == G.CHARGING || this.state == G.FULL_CHARGE || this.state == G.UPDATING || this.state == G.COLLECTING_DUST || this.state == G.WASHING_DUSTER;
        },
      },
      {
        key: 'isWashing',
        value: function () {
          return this.state == G.WASHING_DUSTER;
        },
      },
      {
        key: 'isSupportFeature',
        value: function (t) {
          return (
            this.robotFeatures &&
            -1 !=
              this.robotFeatures.findIndex(function (s) {
                return s == t;
              })
          );
        },
      },
      {
        key: 'isSupportFDSEndPoint',
        value: function () {
          return this.isSupportFeature(111);
        },
      },
      {
        key: 'isSupportAutoSplitSegments',
        value: function () {
          return this.isSupportFeature(112);
        },
      },
      {
        key: 'isSupportOrderSegmentClean',
        value: function () {
          return this.isSupportFeature(114);
        },
      },
      {
        key: 'reset',
        value: function () {
          var t = this;
          Object.keys(this).forEach(function (s) {
            t[s] = undefined;
          });
          this.init();
          this.hasAgreedPrivacyPolicy = false;
          this.hasShow10002Error = false;
          this.staticTotalCount = 0;
          module1329.MapManager.sharedManager().isStopedByStatus = false;
          module1329.MapManager.sharedManager().shouldForceStart = false;
          module1329.MapManager.sharedManager().isStopedBySettingPage = false;
          this.errorCode = 0;
          this.dockErrorStatus = 0;
          this.currentReminder = '';
          this.currentToast = '';
          this.lastMapId = null;
        },
      },
      {
        key: 'isHomeButtonsEnabled',
        value: function () {
          return (
            this.state != G.UPDATING &&
            this.state != G.LOCKED &&
            !this.isLocating &&
            this.state != G.COLLECTING_DUST &&
            this.state != G.WASHING_DUSTER &&
            this.state != G.AIR_DRYING_STOPPING &&
            this.state != G.REMOTE &&
            this.state != G.GOTO_TARGET &&
            !this.voiceChat &&
            this.state != G.EGG_ATTACK
          );
        },
      },
      {
        key: 'isShowStopTaskAlert',
        value: function () {
          return this.cleanResumeFlag != L.None || (this.backDockResumeFlag != b.None && this.state != G.WAITING) || this.state == G.SPOT_CLEAN;
        },
      },
      {
        key: 'shouldStopFetchMap',
        value: function () {
          return this.state == G.UPDATING || this.state == G.LOCKED || this.isLocating;
        },
      },
      {
        key: 'isHomeSettingButtonEnabled',
        value: function () {
          return this.state != G.UPDATING && this.state != G.LOCKED && !this.voiceChat;
        },
      },
      {
        key: 'isCustomCleanMode',
        value: function () {
          return 106 == this.fanPower;
        },
      },
      {
        key: 'isCustomWaterMode',
        value: function () {
          return 204 == this.waterBoxMode || module422.DMM.isTanosSC || module422.DMM.isTanosSE;
        },
      },
      {
        key: 'isCustomMopMode',
        value: function () {
          return 302 == this.mopMode;
        },
      },
      {
        key: 'isCustomCleanWaterMode',
        value: function () {
          return this.isCustomCleanMode() && this.isCustomWaterMode();
        },
      },
      {
        key: 'hasCustomMode',
        value: function () {
          return this.isCustomCleanMode() || this.isCustomWaterMode() || this.isCustomMopMode();
        },
      },
      {
        key: 'isStatic',
        value: function () {
          return false;
        },
      },
      {
        key: 'isReadyToCollectDust',
        value: function () {
          return this.isCollectDustDock && (this.state == G.CHARGING || this.state == G.FULL_CHARGE);
        },
      },
      {
        key: 'lockCameraStatus',
        value: function () {
          this.lastCameraStatusLockTime = new Date().getTime();
        },
      },
      {
        key: 'lockHomeSecStatus',
        value: function () {
          this.lastHomeSecStatusLockTime = new Date().getTime();
        },
      },
      {
        key: 'hardLockCameraStatus',
        value: function () {
          this.cameraStatusLocked = true;
        },
      },
      {
        key: 'unHardLockCameraStatus',
        value: function () {
          this.cameraStatusLocked = false;
        },
      },
      {
        key: 'lockMotionStatus',
        value: function () {
          for (var t in ((this.lastMotionStatusLockTime = new Date().getTime()), D))
            if (D[t].value == this.state) {
              this.stateName = D[t].name;
              break;
            }

          if (this.isWaitValleyCharge) this.stateName = module500.robot_status_wait_charge;
          x.emit(module418.NotificationKeys.RobotStatusDidUpdate);
        },
      },
      {
        key: 'briefInfo',
        value: function () {
          var t = this,
            s = {};
          [
            'battery',
            'cleanArea',
            'cleanTime',
            'fanPower',
            'state',
            'errorCode',
            'currentReminder',
            'originState',
            'cleanResumeFlag',
            'backDockResumeFlag',
            'clean_mop_status',
            'back_type',
            'dockType',
            'waterBoxMode',
          ].forEach(function (n) {
            return (s[n] = t[n]);
          });
          return JSON.stringify(s);
        },
      },
      {
        key: 'checkHowToHandleMapManager',
        value: function () {
          if (this.isStatic()) {
            this.staticTotalCount++;

            if (this.staticTotalCount > 5 && module1329.MapManager.sharedManager().isRunning()) {
              module1329.MapManager.sharedManager().stop();
              module1329.MapManager.sharedManager().isStopedByStatus = true;
              console.log('checkHowToHandleMapManager stop request map - ' + this.staticTotalCount);
            }
          } else if (module1329.MapManager.sharedManager().isStopedByStatus) {
            module1329.MapManager.sharedManager().isStopedByStatus = false;
            this.staticTotalCount = 0;
            module1329.MapManager.sharedManager().start();
            console.log('checkHowToHandleMapManager restart request map - ' + this.state);
          }
        },
      },
      {
        key: 'containOrderSegmentCleanString',
        value: function (t) {
          return t.indexOf('fan_power') > -1 || t.indexOf('segments') > -1 || t.indexOf('repeat') > -1 || t.indexOf('clean_order_mode') > -1;
        },
      },
      {
        key: 'isFCCOrCE',
        value: function () {
          return 'us' == this.deviceLocation || 'de' == this.deviceLocation;
        },
      },
      {
        key: 'resetForAutoTest',
        value: function () {
          this.hasShownChargingResumeCleanReminder = false;
          this.hasShownChargedResumeCleanReminder = false;
        },
      },
      {
        key: 'isO0Dock',
        value: function () {
          return 0 == this.dockType;
        },
      },
      {
        key: 'isO1Dock',
        value: function () {
          return 1 == this.dockType;
        },
      },
      {
        key: 'isO2Dock',
        value: function () {
          return 2 == this.dockType;
        },
      },
      {
        key: 'isO3Dock',
        value: function () {
          return 3 == this.dockType;
        },
      },
      {
        key: 'isOCDock',
        value: function () {
          return 5 == this.originDockType && module422.DMM.currentSeries != module422.DeviceSeries.a15;
        },
      },
      {
        key: 'isCollectDock',
        value: function () {
          return this.isO1Dock() || this.isOCDock();
        },
      },
      {
        key: 'waitUntilStateIsNotLocked',
        value: function () {
          var t = 0;
          return new Promise(function (s, n) {
            var o = setInterval(function () {
              if (++t > 5) {
                n('ReachedMaxTryCount');
                return void clearInterval(o);
              }

              if (z.state != G.LOCKED) {
                s();
                clearInterval(o);
              }
            }, 1e3);
          });
        },
      },
      {
        key: 'isSwitchMapModeManual',
        get: function () {
          return 1 == this.switchMapMode;
        },
      },
    ],
    [
      {
        key: 'sharedManager',
        value: function () {
          return new t();
        },
      },
    ]
  );
  return t;
})();

exports.RobotStatusManager = B;
var z = B.sharedManager();
exports.RSM = z;
