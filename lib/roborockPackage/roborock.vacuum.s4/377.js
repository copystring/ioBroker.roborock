var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  o = require('./4'),
  module5 = require('./5'),
  module378 = require('./378'),
  module390 = require('./390'),
  module407 = require('./407'),
  module1362 = require('./1362'),
  module411 = require('./411'),
  module1231 = require('./1231'),
  module1363 = require('./1363'),
  module410 = require('./410'),
  module409 = require('./409'),
  module1364 = require('./1364'),
  T = null,
  module491 = require('./491').strings,
  module394 = require('./394'),
  O = module394.fromSqmmToSqm,
  I = module394.fromSecToMin,
  module389 = require('./389'),
  v = {
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
  };

exports.RobotState = v;
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
Object.freeze(v);
var y = {
  0: {
    name: module491.localization_strings_Common_Constants_0,
    value: v.UNKNOWN,
  },
  1: {
    name: module491.localization_strings_Common_Constants_1,
    value: v.INITIAL,
  },
  2: {
    name: module491.localization_strings_Common_Constants_2,
    value: v.SLEEPING,
  },
  3: {
    name: module491.localization_strings_Common_Constants_3,
    value: v.WAITING,
  },
  7: {
    name: module491.localization_strings_Common_Constants_4,
    value: v.REMOTE,
  },
  5: {
    name: module491.localization_strings_Common_Constants_1,
    value: v.CLEAN,
  },
  6: {
    name: module491.localization_strings_Common_Constants_6,
    value: v.BACK_TO_DOCK,
  },
  8: {
    name: module491.localization_strings_Common_Constants_8,
    value: v.CHARGING,
  },
  9: {
    name: module491.localization_strings_Common_Constants_10,
    value: v.CHARGE_ERROR,
  },
  10: {
    name: module491.localization_strings_Common_Constants_11,
    value: v.PAUSE,
  },
  11: {
    name: module491.localization_strings_Common_Constants_12,
    value: v.SPOT_CLEAN,
  },
  12: {
    name: module491.localization_strings_Common_Constants_13,
    value: v.MALFUNCTIONING,
  },
  14: {
    name: module491.localization_strings_Common_Constants_15,
    value: v.UPDATING,
  },
  15: {
    name: module491.localization_strings_Common_Constants_6,
    value: v.RUB_TO_DOCK,
  },
  16: {
    name: module491.rubys_main_subtitle_goto_target,
    value: v.GOTO_TARGET,
  },
  17: {
    name: module491.rubys_main_button_text_zone,
    value: v.ZONED_CLEAN,
  },
  18: {
    name: module491.rubys_main_segment_clean_alert,
    value: v.SEGMENT_CLEAN,
  },
  22: {
    name: module491.robot_status_collecting_dust,
    value: v.COLLECTING_DUST,
  },
  23: {
    name: module491.robot_status_washing_duster,
    value: v.WASHING_DUSTER,
  },
  25: {
    name: module491.robot_status_washing_duster,
    value: v.WASHING_DUSTER,
  },
  26: {
    name: module491.robot_status_back_dock_washing_duster,
    value: v.BACK_TO_DOCK_WASHING_DUSTER,
  },
  28: {
    name: module491.be_on_the_phone,
    value: v.VOICE_CHATTING,
  },
  100: {
    name: module491.localization_strings_Common_Constants_17,
    value: v.FULL_CHARGE,
  },
  101: {
    name: module491.localization_strings_Common_Constants_18,
    value: v.OFF_LINE,
  },
  102: {
    name: module491.localization_strings_Common_Constants_20,
    value: v.UNKNOW,
  },
  103: {
    name: module491.robot_status_locked_when_saving_map,
    value: v.LOCKED,
  },
  202: {
    name: module491.robot_status_air_drying_stopping,
    value: v.AIR_DRYING_STOPPING,
  },
  6301: {
    name: module491.robot_status_mopping,
    value: v.MOPPING,
  },
  6302: {
    name: module491.localization_strings_Common_Constants_1,
    value: v.CLEAN_MOP_CLEANING,
  },
  6303: {
    name: module491.robot_status_mopping,
    value: v.CLEAN_MOP_MOPPING,
  },
  6304: {
    name: module491.robot_status_segment_mopping,
    value: v.SEGMENT_MOPPING,
  },
  6305: {
    name: module491.rubys_main_segment_clean_alert,
    value: v.SEGMENT_CLEAN_MOP_CLEANING,
  },
  6306: {
    name: module491.robot_status_segment_mopping,
    value: v.SEGMENT_CLEAN_MOP_MOPPING,
  },
  6307: {
    name: module491.robot_status_zone_mopping,
    value: v.ZONED_MOPPING,
  },
  6308: {
    name: module491.rubys_main_button_text_zone,
    value: v.ZONED_CLEAN_MOP_CLEANING,
  },
  6309: {
    name: module491.robot_status_zone_mopping,
    value: v.ZONED_CLEAN_MOP_MOPPING,
  },
  6310: {
    name: module491.robot_status_back_dock_washing_duster,
    value: v.BACK_TO_DOCK_WASHING_DUSTER,
  },
};
exports.CleanMode = {
  Global_Clean: 'Global_Clean',
  Segment_Clean: 'Segment_Clean',
  Zone_Clean: 'Zone_Clean',
};
var A = {
  None: 'None',
  Global_Clean: 'Global_Clean',
  Segment_Clean: 'Segment_Clean',
  Zone_Clean: 'Zone_Clean',
};
exports.CleanResumeFlag = A;
Object.freeze(A);
var L = {
    0: A.None,
    1: A.Global_Clean,
    2: A.Zone_Clean,
    3: A.Segment_Clean,
  },
  G = {
    None: 'None',
    Has: 'Has',
  };
exports.BackDockResumeFlag = G;
Object.freeze(G);
var D = {
  None: 'None',
  Has_WithoutSegments: 'Has_WithoutSegments',
  Has_WithSegments: 'Has_WithSegments',
};
exports.MapStatus = D;
Object.freeze(D);
var P = {
  0: D.None,
  1: D.Has_WithoutSegments,
  3: D.Has_WithSegments,
};
exports.MapStatusCodeMap = P;
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
};
var b = {
  ExquisiteClean: 0,
  Timer: 1,
  AirdryFinishTime: 2,
};
exports.SpecialInfoType = b;
exports.CarpetEditMode = {
  CarpetIgnore: 1,
  CarpetAdd: 2,
};

var module12 = require('./12'),
  H = module12.DeviceEventEmitter,
  K = {
    RRHomeSecStatusDisconnected: 0,
    RRHomeSecStatusConnected: 1,
    RRHomeSecStatusDisconnecting: 2,
  };

exports.RRHomeSecStatus = K;

var U = (function () {
  function t() {
    o.default(this, t);

    if (!T) {
      this.init();
      T = this;
    }

    return T;
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
          this.state = v.UNKNOWN;
          this.stateName = module491.localization_strings_Common_Constants_0;
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
          this.mapRotateAngle = {};
          this.hasConnectedWashDock = false;
          var n;
          regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.DockType));

                  case 2:
                    n = o.sent;
                    console.log('readDockType', n);
                    t.hasConnectedWashDock = n && parseInt(n) >= 2;

                  case 5:
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
          return !this.isCleanMopMoppingMode() && this.state == v.BACK_TO_DOCK;
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
          if (8 == t.state && 100 == t.battery) t.state = 100;
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
          this.state = y[parseInt(t.state)].value;
          this.stateName = y[parseInt(t.state)].name;
          this.cleanResumeFlag = L[parseInt(t.in_cleaning)];
          this.backDockResumeFlag = 1 == parseInt(t.in_returning) ? G.Has : G.None;
          this.isError = 12 == t.state;
        },
      },
      {
        key: 'parseStatus',
        value: function (t) {
          var o, u, module390, _, h, S, T, f, k, v, y;

          return regeneratorRuntime.default.async(
            function (A) {
              for (;;)
                switch ((A.prev = A.next)) {
                  case 0:
                    this.specialInfo = null;
                    if ((u = new Date().getTime()) - this.lastMotionStatusLockTime >= 2e3) this.parseRobotMotionStatus(t);
                    else {
                      module410.Log.log(module409.LogTypes.KeyEvent, 'lock robot motion status,skip this loop');
                      this.lastMotionStatusLockTime = 0;
                    }
                    this.cleanArea = O(parseInt(t.clean_area));
                    this.cleanTime = I(parseInt(t.clean_time));
                    this.fanPower = module378.fixCleanMode(parseInt(t.fan_power));
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
                    module390 = parseInt(t.map_status);
                    this.mapStatus = P[module390 % 4];
                    this.currentMapId = this.isLocating ? -1 : module390 >> 2;
                    this.isCurrentMapChanged = null != this.lastMapId && this.currentMapId != this.lastMapId;
                    this.lastMapId = this.currentMapId;
                    this.wifiDebug = 1 == t.debug_mode;
                    this.voiceChat = 1 == t.voice_chat_status;
                    this.isAirDrying = this.isChargingOnDock() && 1 == t.fan_motor_work_status;
                    this.isWarmUp = 1 == t.in_warmup;
                    if (63 == this.currentMapId) this.currentMapId = -1;
                    if (u - this.lastHomeSecStatusLockTime >= 2e3) this.homeSecStatus = t.home_sec_status;
                    else {
                      module410.Log.log(module409.LogTypes.KeyEvent, 'lock home sec status,skip this loop');
                      this.lastHomeSecStatusLockTime = 0;
                    }
                    this.isExploring = 1 == t.is_exploring;
                    if (u - this.lastCameraStatusLockTime >= 2e3 && !this.cameraStatusLocked) module1363.default.parseCameraStatus(t.camera_status);
                    else {
                      module410.Log.log(module409.LogTypes.KeyEvent, 'lock camera status,skip this loop');
                      this.lastCameraStatusLockTime = 0;
                    }

                    if (t.adbumper_status) {
                      _ = module22.default(t.adbumper_status, 3);
                      h = _[0];
                      S = _[1];
                      T = _[2];
                      this.bumperLeft = h && 1 == ((h >> 7) & 1);
                      this.bumperMiddle = S && 1 == ((S >> 7) & 1);
                      this.bumperRight = T && 1 == ((T >> 7) & 1);

                      f = function (t) {
                        return !!(t && ((t >> 1) & true || (t >> 3) & true || (t >> 4) & true || (t >> 6) & true));
                      };

                      this.obstacleLeft = f(h);
                      this.obstacleMiddle = f(S);
                      this.obstacleRight = f(T);
                    }

                    this.errorCode = this.handleErrorCode(parseInt(t.error_code || t.dock_error_status));
                    A.next = 35;
                    return regeneratorRuntime.default.awrap(this.parseEvents(t.events));

                  case 35:
                    this.dockErrorStatus = t.dock_error_status;
                    if (undefined != t.water_box_mode) this.waterBoxMode = parseInt(t.water_box_mode);
                    this.secPasswordEnabled = 1 == t.home_sec_enable_password;
                    this.dockType = t.dock_type;
                    this.isCollectDustDock = 1 == t.dock_type || 3 == t.dock_type;
                    if (t.dock_type && !this.hasConnectedWashDock) module411.SetStorageKey(module411.StorageKeys.DockType, t.dock_type + '');
                    this.isAutoDustCollectionOff = 0 == t.auto_dust_collection;
                    this.checkHowToHandleMapManager();
                    this.lastUpdateTime = new Date().getTime();
                    if (undefined != t.mop_mode) this.mopMode = parseInt(t.mop_mode);
                    if (undefined != t.water_shortage_status) this.waterShortageStatus = parseInt(t.water_shortage_status);
                    this.waterBoxDistance = t.distance_off || 0;
                    this.mopModeId = t.mop_template_id;
                    this.isWashReady = 1 == t.wash_ready;
                    if (this.isCurrentMapChanged)
                      H.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module411.EventKeys.CurrentMapDidChange,
                      });
                    A.next = 52;
                    return regeneratorRuntime.default.awrap(module1364.TLM.GetListByHours(6));

                  case 52:
                    k = A.sent;
                    this.nextTimer = k.length > 0 ? k[0] : null;
                    if ((null == (o = this.nextTimer) ? undefined : o.hour) < 6) this.nextTimer = null;
                    if (this.isAirDrying && t.fan_motor_work_time && t.fan_motor_work_time > 0)
                      this.specialInfo = {
                        text: module491.home_sepcial_info_airdry_finish_time.templateStringWithParams({
                          hour: (t.fan_motor_work_time / 60).toFixed(1),
                        }),
                        actionStyle: b.AirdryFinishTime,
                      };
                    else if (301 == this.mopMode && this.isCleaning() && this.isWaterBoxIn && this.isWaterBoxCarriageIn && !this.waterShortageStatus)
                      this.specialInfo = {
                        text: module491.home_special_info_exquisite,
                        actionStyle: b.ExquisiteClean,
                      };
                    else if (this.nextTimer && !this.isCleaning())
                      this.specialInfo = {
                        text: module491.home_special_info_timer.templateStringWithParams({
                          cleanTime: null != (v = null == (y = this.nextTimer) ? undefined : y.cleanTime) ? v : '',
                        }),
                        actionStyle: b.Timer,
                      };

                  case 56:
                  case 'end':
                    return A.stop();
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
          return this.homeSecStatus == K.RRHomeSecStatusDisconnecting;
        },
      },
      {
        key: 'isHomeSecControlledByCurrentClient',
        value: function () {
          return this.homeSecClientID && this.homeSecClientID == module389.appClientID;
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
          return this.homeSecStatus == K.RRHomeSecStatusConnected;
        },
      },
      {
        key: 'isHomeSecDisconnected',
        value: function () {
          return this.homeSecStatus == K.RRHomeSecStatusDisconnected;
        },
      },
      {
        key: 'handleErrorCode',
        value: function (t) {
          if (24 == t) {
            if (!module390.default.sharedCache().error24) {
              module390.default.sharedCache().error24 = true;
              this.currentReminder = 'error24';
            }

            return 0;
          } else if (25 == t) {
            if (!module390.default.sharedCache().error25) {
              module390.default.sharedCache().error25 = true;
              this.currentReminder = 'error25';
            }

            return 0;
          } else return t;
        },
      },
      {
        key: 'parseEvents',
        value: function (t) {
          var n, o, u, l;
          return regeneratorRuntime.default.async(
            function (_) {
              for (;;)
                switch ((_.prev = _.next)) {
                  case 0:
                    if (
                      (n = t.filter(function (s) {
                        return t && module1362.Toast[s];
                      }))[0]
                    )
                      this.currentToast = n[0];
                    else this.currentToast = '';
                    if (this.currentToast && this.currentToast.length > 0)
                      H.emit(module411.NotificationKeys.EventToastChange, {
                        data: this.currentToast,
                      });
                    this.handleSpecialToast();
                    o = t.filter(function (s) {
                      return t && module1362.Reminder()[s];
                    });
                    _.next = 7;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.HasShownFullChargeReminder));

                  case 7:
                    if (((u = _.sent), this.state != v.FULL_CHARGE || u)) {
                      _.next = 18;
                      break;
                    }

                    o = o.concat('full_charge');
                    _.prev = 10;
                    _.next = 13;
                    return regeneratorRuntime.default.awrap(
                      module411.SetStorageKey(module411.StorageKeys.HasShownFullChargeReminder, module411.StorageKeys.HasShownFullChargeReminder)
                    );

                  case 13:
                    _.next = 18;
                    break;

                  case 15:
                    _.prev = 15;
                    _.t0 = _.catch(10);
                    console.log('full charge SetStorageKey error  -- ' + _.t0);

                  case 18:
                    if (((l = module390.default.sharedCache().notDisturbReminder), (_.t2 = this.notDisturbEnabled), !_.t2)) {
                      _.next = 24;
                      break;
                    }

                    _.next = 23;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.HasShownNotDisturbReminder));

                  case 23:
                    _.t2 = !_.sent;

                  case 24:
                    if (((_.t1 = _.t2), !_.t1)) {
                      _.next = 27;
                      break;
                    }

                    _.t1 = !l;

                  case 27:
                    if (!_.t1) {
                      _.next = 38;
                      break;
                    }

                    module390.default.sharedCache().notDisturbReminder = true;
                    o = o.concat('noDisturb');
                    _.prev = 30;
                    _.next = 33;
                    return regeneratorRuntime.default.awrap(
                      module411.SetStorageKey(module411.StorageKeys.HasShownNotDisturbReminder, module411.StorageKeys.HasShownNotDisturbReminder)
                    );

                  case 33:
                    _.next = 38;
                    break;

                  case 35:
                    _.prev = 35;
                    _.t3 = _.catch(30);
                    console.log('notDisturb SetStorageKey error  -- ' + _.t3);

                  case 38:
                    if (!(this.state != v.CHARGING || this.isCleanMopMoppingMode() || this.cleanResumeFlag == A.None || this.hasShownChargingResumeCleanReminder)) {
                      o = this.notDisturbEnabled ? o.concat('chargingResumeNoDisturbClean') : o.concat('chargingResumeClean');
                      this.hasShownChargingResumeCleanReminder = true;
                    }

                    if (!(this.state != v.FULL_CHARGE || this.cleanResumeFlag == A.None || this.hasShownChargedResumeCleanReminder)) {
                      o = o.concat('chargedResumeClean');
                      this.hasShownChargedResumeCleanReminder = true;
                    }

                    if (!module390.default.sharedCache().waterShortageNotification && this.isWaterBoxIn && this.isWaterBoxCarriageIn && this.waterShortageStatus)
                      o = o.concat('water_shortage_reminder');
                    if (!(!this.isCleaning() || ('chargingResumeClean' != this.currentReminder && 'full_charge' != this.currentReminder))) this.closeReminder();
                    if (o[0] && !this.errorCode) this.currentReminder = o[0];
                    this.handleSpecialReminder();

                  case 45:
                  case 'end':
                    return _.stop();
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
            H.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
              data: this.currentToast,
            });
        },
      },
      {
        key: 'handleSpecialReminder',
        value: function () {
          if (['relocate_failed_fz_clean', 'relocate_failed_fz_back', 'remind_to_save_map'].indexOf(this.currentReminder) >= 0)
            H.emit(module411.NotificationKeys.DidReceiveSpecialEvents, {
              data: this.currentReminder,
            });
        },
      },
      {
        key: 'start',
        value: function () {
          var t,
            n = this;
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
                        function (n) {
                          for (;;)
                            switch ((n.prev = n.next)) {
                              case 0:
                                n.next = 2;
                                return regeneratorRuntime.default.awrap(t.getStatus());

                              case 2:
                              case 'end':
                                return n.stop();
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
                    H.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (t) {
                      if (t.data == module411.EventKeys.MapSaveSwitchChanged) n.getStatus();
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
          var t, module22;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getStatus());

                  case 3:
                    t = o.sent;
                    console.log('Computed Status - ' + JSON.stringify(t));
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(this.parseStatus(t.result[0]));

                  case 7:
                    H.emit(module411.NotificationKeys.RobotStatusDidUpdate);
                    o.prev = 8;
                    o.next = 11;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.ValidConnect, module411.StorageKeys.ValidConnect));

                  case 11:
                    o.next = 16;
                    break;

                  case 13:
                    o.prev = 13;
                    o.t0 = o.catch(8);
                    console.log('getStatus SetStorageKey error  -- ' + o.t0);

                  case 16:
                    this.isValidConnect = true;
                    module410.Log.log(module409.LogTypes.LoopStatus, this.briefInfo(), module409.InfoColors.Success);
                    o.next = 34;
                    break;

                  case 20:
                    o.prev = 20;
                    o.t1 = o.catch(0);
                    module410.Log.log(module409.LogTypes.LoopStatus, 'RSM get status failed - ' + JSON.stringify(o.t1), module409.InfoColors.Fail, false);
                    module22 = o.t1.data && o.t1.data.error && (-10002 == o.t1.data.error.code || -10002 == o.t1.data.error);
                    this.isValidConnect = !module22;
                    o.prev = 25;
                    o.next = 28;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.ValidConnect, module22 ? '' : module411.StorageKeys.ValidConnect));

                  case 28:
                    o.next = 33;
                    break;

                  case 30:
                    o.prev = 30;
                    o.t2 = o.catch(25);
                    console.log('getStatus error SetStorageKey error  -- ' + o.t2);

                  case 33:
                    if (module22 && !this.hasShow10002Error) {
                      this.hasShow10002Error = true;
                      console.log('get Error10002');
                      H.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module411.EventKeys.Error10002,
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
          if ('water_shortage_reminder' == this.currentReminder) module390.default.sharedCache().waterShortageNotification = true;
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
          return this.state == v.CLEAN || this.state == v.SEGMENT_CLEAN || this.state == v.ZONED_CLEAN || this.state == v.SPOT_CLEAN;
        },
      },
      {
        key: 'isZonedCleaning',
        value: function () {
          return this.state == v.ZONED_CLEAN;
        },
      },
      {
        key: 'isSegmentCleaning',
        value: function () {
          return this.state == v.SEGMENT_CLEAN;
        },
      },
      {
        key: 'isPureMopping',
        value: function () {
          return this.state == v.MOPPING || this.state == v.SEGMENT_MOPPING || this.state == v.ZONED_MOPPING;
        },
      },
      {
        key: 'isCleanMopCleaning',
        value: function () {
          return this.state == v.CLEAN_MOP_CLEANING || this.state == v.SEGMENT_CLEAN_MOP_CLEANING || this.state == v.ZONED_CLEAN_MOP_CLEANING;
        },
      },
      {
        key: 'isCleanMopMopping',
        value: function () {
          return this.state == v.CLEAN_MOP_MOPPING || this.state == v.SEGMENT_CLEAN_MOP_MOPPING || this.state == v.ZONED_CLEAN_MOP_MOPPING;
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
          return this.state == v.BACK_TO_DOCK || this.state == v.BACK_TO_DOCK_WASHING_DUSTER || F.state == v.COLLECTING_DUST || this.isAirDrying;
        },
      },
      {
        key: 'isBackDockTaskResumeable',
        value: function () {
          return this.state == v.PAUSE || this.state == v.SLEEPING || this.state == v.MALFUNCTIONING;
        },
      },
      {
        key: 'isReadyForCleanTaskResume',
        value: function () {
          return (
            this.state == v.PAUSE || this.state == v.SLEEPING || this.state == v.WAITING || this.state == v.MALFUNCTIONING || this.isInBackDockTask() || this.isChargingOnDock()
          );
        },
      },
      {
        key: 'isCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag != A.None;
        },
      },
      {
        key: 'isGlobalCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == A.Global_Clean;
        },
      },
      {
        key: 'isSegmentCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == A.Segment_Clean;
        },
      },
      {
        key: 'isZoneCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == A.Zone_Clean;
        },
      },
      {
        key: 'isBackDockTaskShouldResume',
        value: function () {
          return this.isBackDockTaskResumeable() && this.backDockResumeFlag == G.Has;
        },
      },
      {
        key: 'isInSpotCleaning',
        value: function () {
          return this.state == v.SPOT_CLEAN;
        },
      },
      {
        key: 'isReadyToCmd',
        value: function () {
          return this.state == v.SLEEPING || this.state == v.WAITING;
        },
      },
      {
        key: 'isReadyToNewClean',
        value: function () {
          return (this.isReadyToCmd() || this.state == v.PAUSE || this.isChargingOnDock()) && this.cleanResumeFlag == A.None;
        },
      },
      {
        key: 'isChargingOnDock',
        value: function () {
          return this.state == v.CHARGING || this.state == v.FULL_CHARGE;
        },
      },
      {
        key: 'isSupportFeature',
        value: function (t) {
          return (
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
          module1231.MapManager.sharedManager().isStopedByStatus = false;
          module1231.MapManager.sharedManager().shouldForceStart = false;
          module1231.MapManager.sharedManager().isStopedBySettingPage = false;
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
            this.state != v.UPDATING &&
            this.state != v.LOCKED &&
            !this.isLocating &&
            this.state != v.COLLECTING_DUST &&
            this.state != v.WASHING_DUSTER &&
            this.state != v.AIR_DRYING_STOPPING &&
            this.state != v.REMOTE &&
            this.state != v.GOTO_TARGET &&
            !this.voiceChat
          );
        },
      },
      {
        key: 'shouldStopFetchMap',
        value: function () {
          return this.state == v.UPDATING || this.state == v.LOCKED || this.isLocating;
        },
      },
      {
        key: 'isHomeSettingButtonEnabled',
        value: function () {
          return this.state != v.UPDATING && this.state != v.LOCKED;
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
          return 204 == this.waterBoxMode;
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
          return this.isCollectDustDock && (this.state == v.CHARGING || this.state == v.FULL_CHARGE);
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
          for (var t in ((this.lastMotionStatusLockTime = new Date().getTime()), y))
            if (y[t].value == this.state) {
              this.stateName = y[t].name;
              break;
            }

          H.emit(module411.NotificationKeys.RobotStatusDidUpdate);
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

            if (this.staticTotalCount > 5 && module1231.MapManager.sharedManager().isRunning()) {
              module1231.MapManager.sharedManager().stop();
              module1231.MapManager.sharedManager().isStopedByStatus = true;
              console.log('checkHowToHandleMapManager stop request map - ' + this.staticTotalCount);
            }
          } else if (module1231.MapManager.sharedManager().isStopedByStatus) {
            module1231.MapManager.sharedManager().isStopedByStatus = false;
            this.staticTotalCount = 0;
            module1231.MapManager.sharedManager().start();
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
        key: 'waitUntilStateIsNotLocked',
        value: function () {
          var t = 0;
          return new Promise(function (s, n) {
            var o = setInterval(function () {
              if (++t > 5) {
                n('ReachedMaxTryCount');
                return void clearInterval(o);
              }

              if (F.state != v.LOCKED) {
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

exports.RobotStatusManager = U;
var F = U.sharedManager();
exports.RSM = F;
