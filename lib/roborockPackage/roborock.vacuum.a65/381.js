var module23 = require('@babel/runtime/helpers/slicedToArray'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module382 = require('./382'),
  module1625 = require('./1625'),
  module394 = require('./394'),
  module416 = require('./416'),
  module1639 = require('./1639'),
  module420 = require('./420'),
  module415 = require('./415'),
  module1640 = require('./1640'),
  module419 = require('./419'),
  module418 = require('./418'),
  module1641 = require('./1641'),
  module390 = require('./390'),
  module424 = require('./424'),
  y = null,
  module510 = require('./510').strings,
  module398 = require('./398'),
  I = module398.fromSqmmToSqm,
  O = module398.fromSecToMin,
  module393 = require('./393'),
  module411 = require('./411'),
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
var L = {
  0: {
    name: module510.localization_strings_Common_Constants_0,
    value: G.UNKNOWN,
  },
  1: {
    name: module510.localization_strings_Common_Constants_1,
    value: G.INITIAL,
  },
  2: {
    name: module510.localization_strings_Common_Constants_2,
    value: G.SLEEPING,
  },
  3: {
    name: module510.localization_strings_Common_Constants_3,
    value: G.WAITING,
  },
  7: {
    name: module510.localization_strings_Common_Constants_4,
    value: G.REMOTE,
  },
  5: {
    name: module510.localization_strings_Common_Constants_1,
    value: G.CLEAN,
  },
  6: {
    name: module510.localization_strings_Common_Constants_6,
    value: G.BACK_TO_DOCK,
  },
  8: {
    name: module510.localization_strings_Common_Constants_8,
    value: G.CHARGING,
  },
  9: {
    name: module510.localization_strings_Common_Constants_10,
    value: G.CHARGE_ERROR,
  },
  10: {
    name: module510.localization_strings_Common_Constants_11,
    value: G.PAUSE,
  },
  11: {
    name: module510.localization_strings_Common_Constants_12,
    value: G.SPOT_CLEAN,
  },
  12: {
    name: module510.localization_strings_Common_Constants_13,
    value: G.MALFUNCTIONING,
  },
  14: {
    name: module510.localization_strings_Common_Constants_15,
    value: G.UPDATING,
  },
  15: {
    name: module510.localization_strings_Common_Constants_6,
    value: G.RUB_TO_DOCK,
  },
  16: {
    name: module510.rubys_main_subtitle_goto_target,
    value: G.GOTO_TARGET,
  },
  17: {
    name: module510.rubys_main_button_text_zone,
    value: G.ZONED_CLEAN,
  },
  18: {
    name: module510.rubys_main_segment_clean_alert,
    value: G.SEGMENT_CLEAN,
  },
  22: {
    name: module510.robot_status_collecting_dust,
    value: G.COLLECTING_DUST,
  },
  23: {
    name: module510.robot_status_washing_duster,
    value: G.WASHING_DUSTER,
  },
  25: {
    name: module510.robot_status_washing_duster,
    value: G.WASHING_DUSTER,
  },
  26: {
    name: module510.robot_status_back_dock_washing_duster,
    value: G.BACK_TO_DOCK_WASHING_DUSTER,
  },
  28: {
    name: module510.be_on_the_phone,
    value: G.VOICE_CHATTING,
  },
  29: {
    name: module510.robot_status_quick_building_map,
    value: G.QUICK_BUILDING_MAP,
  },
  30: {
    name: module510.robot_status_egg_attack,
    value: G.EGG_ATTACK,
  },
  100: {
    name: module510.localization_strings_Common_Constants_17,
    value: G.FULL_CHARGE,
  },
  101: {
    name: module510.localization_strings_Common_Constants_18,
    value: G.OFF_LINE,
  },
  102: {
    name: module510.localization_strings_Common_Constants_20,
    value: G.UNKNOW,
  },
  103: {
    name: module510.robot_status_locked_when_saving_map,
    value: G.LOCKED,
  },
  202: {
    name: module510.robot_status_air_drying_stopping,
    value: G.AIR_DRYING_STOPPING,
  },
  6301: {
    name: module510.robot_status_mopping,
    value: G.MOPPING,
  },
  6302: {
    name: module510.localization_strings_Common_Constants_1,
    value: G.CLEAN_MOP_CLEANING,
  },
  6303: {
    name: module510.robot_status_mopping,
    value: G.CLEAN_MOP_MOPPING,
  },
  6304: {
    name: module510.robot_status_segment_mopping,
    value: G.SEGMENT_MOPPING,
  },
  6305: {
    name: module510.rubys_main_segment_clean_alert,
    value: G.SEGMENT_CLEAN_MOP_CLEANING,
  },
  6306: {
    name: module510.robot_status_segment_mopping,
    value: G.SEGMENT_CLEAN_MOP_MOPPING,
  },
  6307: {
    name: module510.robot_status_zone_mopping,
    value: G.ZONED_MOPPING,
  },
  6308: {
    name: module510.rubys_main_button_text_zone,
    value: G.ZONED_CLEAN_MOP_CLEANING,
  },
  6309: {
    name: module510.robot_status_zone_mopping,
    value: G.ZONED_CLEAN_MOP_MOPPING,
  },
  6310: {
    name: module510.robot_status_back_dock_washing_duster,
    value: G.BACK_TO_DOCK_WASHING_DUSTER,
  },
};
exports.CleanMode = {
  Global_Clean: 'Global_Clean',
  Segment_Clean: 'Segment_Clean',
  Zone_Clean: 'Zone_Clean',
};
var P = {
  None: 'None',
  Global_Clean: 'Global_Clean',
  Segment_Clean: 'Segment_Clean',
  Zone_Clean: 'Zone_Clean',
  Quick_Build_Map: 'Quick_Build_Map',
};
exports.CleanResumeFlag = P;
Object.freeze(P);
var b = {
    0: P.None,
    1: P.Global_Clean,
    2: P.Zone_Clean,
    3: P.Segment_Clean,
    4: P.Quick_Build_Map,
  },
  w = {
    None: 'None',
    Has: 'Has',
  };
exports.BackDockResumeFlag = w;
Object.freeze(w);
var K = {
  None: 'None',
  Has_WithoutSegments: 'Has_WithoutSegments',
  Has_WithSegments: 'Has_WithSegments',
};
exports.MapStatus = K;
Object.freeze(K);
var U = {
  0: K.None,
  1: K.Has_WithoutSegments,
  3: K.Has_WithSegments,
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
var F = {
  Timer: 1,
  DryRemainTime: 2,
  PureClean: 3,
  PureMop: 4,
  WaitCharge: 5,
  UnsaveMapReason: 6,
  HasNewMap: 7,
  CleanMopWithCleanRouteFast: 8,
};
exports.SpecialInfoType = F;
var H = {
  Saved: 0,
  ChargerOffset: 1,
  Relocation: 2,
  ReachMaxFloorCount: 3,
  Unfinished: 4,
  DidNotStartFromCharger: 5,
  DidNotReturnToCharger: 6,
  MapSaveNoOpen: 7,
  MapMess: 8,
};
exports.UnsaveMapReason = H;
exports.UnsaveMapHandle = {
  Ignore: 0,
  Update: 1,
  Load: 2,
  Done: 3,
};

var module13 = require('./13'),
  x = module13.DeviceEventEmitter,
  B = {
    RRHomeSecStatusDisconnected: 0,
    RRHomeSecStatusConnected: 1,
    RRHomeSecStatusDisconnecting: 2,
  };

exports.RRHomeSecStatus = B;

var Z = (function () {
  function t() {
    module6.default(this, t);

    if (!y) {
      this.init();
      y = this;
    }

    return y;
  }

  u.default(
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
          this.stateName = module510.localization_strings_Common_Constants_0;
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
          this.preMockState = null;
          this.hasConnectedWashDock = false;
          this.lastDockType = 0;
          var s;
          regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.DockType));

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
        key: 'isFinishCleanBackDock',
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
        key: 'getComputedState',
        value: function (t, s) {
          var n = t.state;
          if (1 == t.lock_status) n = 103;

          if (8 == t.state) {
            if (100 == t.battery) {
              n = 100;
              if (!s) this.isWaitValleyCharge = false;
            } else if (!s) this.isWaitValleyCharge = module390.default.isSupportedValleyElectricity() && 0 == t.charge_status;

            if (!s) this.isDrying = 1 == t.dry_status;
          } else {
            if (!s) this.isWaitValleyCharge = false;
            if (!s) this.isDrying = false;
          }

          if (15 == t.state) n = 1 == t.stop_fan_motor_work_status ? 202 : 6;
          if (6 == t.state && 1 == t.back_type) n = 6310;
          this.clean_mop_status = t.clean_mop_status;
          if (!s) this.back_type = t.back_type;

          if (5 == t.state) {
            if (this.isPureMoppingMode()) n = 6301;
            if (this.isCleanMopCleaningMode()) n = 6302;
            if (this.isCleanMopMoppingMode()) n = 6303;
          }

          if (18 == t.state) {
            if (this.isPureMoppingMode()) n = 6304;
            if (this.isCleanMopCleaningMode()) n = 6305;
            if (this.isCleanMopMoppingMode()) n = 6306;
          }

          if (17 == t.state) {
            if (this.isPureMoppingMode()) n = 6307;
            if (this.isCleanMopCleaningMode()) n = 6308;
            if (this.isCleanMopMoppingMode()) n = 6309;
          }

          return n;
        },
      },
      {
        key: 'parseRobotMotionStatus',
        value: function (t) {
          this.originState = t.state;
          t.state = this.getComputedState(t);
          this.state = L[parseInt(t.state)].value;
          this.stateName = this.isWaitValleyCharge ? module510.robot_status_wait_charge : L[parseInt(t.state)].name;
          this.cleanResumeFlag = b[parseInt(t.in_cleaning)];
          this.backDockResumeFlag = 1 == parseInt(t.in_returning) ? w.Has : w.None;
          this.isError = 12 == t.state;
        },
      },
      {
        key: 'parseStatus',
        value: function (t) {
          var module6,
            u,
            c,
            h,
            _,
            C,
            k,
            module390,
            y,
            v,
            R,
            D,
            b,
            w = this;

          return regeneratorRuntime.default.async(
            function (K) {
              for (;;)
                switch ((K.prev = K.next)) {
                  case 0:
                    this.specialInfo = null;
                    module6 = new Date().getTime();

                    if (this.lastMotionStatusLockTime > 0) {
                      u = this.getComputedState(t, true);
                      c = L[parseInt(u)].value;
                      h = module6 - this.lastMotionStatusLockTime;
                      _ = c == G.MALFUNCTIONING || c == G.LOCKED;
                      C = !!this.preMockState && this.preMockState != c && h < 5e3;

                      k = function () {
                        w.lastMotionStatusLockTime = 0;
                        w.preMockState = null;
                        w.parseRobotMotionStatus(t);
                      };

                      if (C)
                        _
                          ? (module419.Log.log(
                              module418.LogTypes.KeyEvent,
                              'end pre mock by serious state,expected state is ' + this.preMockState + ',firmware state is ' + c + ',pre mock has last ' + h / 1e3 + 's'
                            ),
                            k())
                          : module419.Log.log(
                              module418.LogTypes.KeyEvent,
                              'meet pre mock,expected state is ' + this.preMockState + ',firmware state is ' + c + ',pre mock has last ' + h / 1e3 + 's'
                            );
                      else {
                        module419.Log.log(
                          module418.LogTypes.KeyEvent,
                          'end pre mock,expected state is ' + this.preMockState + ',firmware state is ' + c + ',pre mock has last ' + h / 1e3 + 's'
                        );
                        k();
                      }
                    } else this.parseRobotMotionStatus(t);

                    this.cleanArea = I(parseInt(t.clean_area));
                    this.cleanTime = O(parseInt(t.clean_time));
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
                    this.offlineMapEnabled = !!(t.switch_status && 1 & t.switch_status);
                    this.hasCleanFulidModule = 1 == t.clean_fluid || !!(t.switch_status && 2 & t.switch_status);
                    this.isSettingCarpetFirstOn = !!(t.switch_status && 8 & t.switch_status);
                    this.multiFloorEnabled = 3 == t.lab_status;
                    this.switchMapMode = t.switch_map_mode;
                    module390 = parseInt(t.map_status);
                    this.mapStatus = U[module390 % 4];
                    this.currentMapId = this.isLocating ? -1 : module390 >> 2;
                    this.isCurrentMapChanged = null != this.lastMapId && this.currentMapId != this.lastMapId;
                    this.lastMapId = this.currentMapId;
                    this.wifiDebug = 1 == t.debug_mode;
                    this.voiceChat = 1 == t.voice_chat_status;
                    this.isWarmUp = 1 == t.in_warmup;
                    this.unsaveMapReason = t.unsave_map_reason;
                    this.unsaveMapFlag = t.unsave_map_flag;
                    if (63 == this.currentMapId) this.currentMapId = -1;
                    if (module6 - this.lastHomeSecStatusLockTime >= 2e3) this.homeSecStatus = t.home_sec_status;
                    else {
                      module419.Log.log(module418.LogTypes.KeyEvent, 'lock home sec status,skip this loop');
                      this.lastHomeSecStatusLockTime = 0;
                    }
                    this.isExploring = 1 == t.is_exploring;
                    if (module6 - this.lastCameraStatusLockTime >= 2e3 && !this.cameraStatusLocked) module1640.default.parseCameraStatus(t.camera_status);
                    else {
                      module419.Log.log(module418.LogTypes.KeyEvent, 'lock camera status,skip this loop');
                      this.lastCameraStatusLockTime = 0;
                    }

                    if (t.adbumper_status) {
                      y = module23.default(t.adbumper_status, 3);
                      v = y[0];
                      R = y[1];
                      D = y[2];
                      this.bumperLeft = v && 1 == ((v >> 7) & 1);
                      this.bumperMiddle = R && 1 == ((R >> 7) & 1);
                      this.bumperRight = D && 1 == ((D >> 7) & 1);

                      b = function (t) {
                        return !!(t && ((t >> 1) & true || (t >> 3) & true || (t >> 4) & true || (t >> 6) & true));
                      };

                      this.obstacleLeft = b(v);
                      this.obstacleMiddle = b(R);
                      this.obstacleRight = b(D);
                    }

                    if (t.dss) {
                      this.isUpdownWaterReady = 2 == (3 & t.dss);
                      this.clearWaterBoxStatus = (t.dss >> 2) & 3;
                      this.dirtyWaterBoxStatus = (t.dss >> 4) & 3;
                      this.dustBagStatus = (t.dss >> 6) & 3;
                      this.waterBoxFilterStatus = (t.dss >> 8) & 3;
                      this.cleanFluidStatus = (t.dss >> 10) & 3;
                    }

                    if (t.wash_status) {
                      this.washingTaskStatus = 255 & t.wash_status;
                      this.washingMode = t.wash_status >> 8;
                    }

                    this.errorCode = module411.error || parseInt(t.error_code || t.dock_error_status);
                    K.next = 42;
                    return regeneratorRuntime.default.awrap(this.parseEvents(t));

                  case 42:
                    this.dockErrorStatus = t.error_code ? 0 : t.dock_error_status;
                    if (undefined != t.water_box_mode) this.waterBoxMode = parseInt(t.water_box_mode);
                    this.secPasswordEnabled = 1 == t.home_sec_enable_password;
                    if (undefined != module411.dockType) t.dock_type = module411.dockType;
                    this.originDockType = t.dock_type;
                    if (5 == t.dock_type && (t.dock_type = 1) && module424.DMM.currentSeries == module424.DeviceSeries.a15) t.dock_type = 0;
                    this.dockType = t.dock_type;
                    if (t.dock_type >= 0) module420.SetStorageKey(module420.StorageKeys.DockType, t.dock_type + '');
                    this.isCollectDustDock = 1 == t.dock_type || 3 == t.dock_type;
                    this.isAutoDustCollectionOff = 0 == t.auto_dust_collection;
                    this.checkHowToHandleMapManager();
                    this.lastUpdateTime = new Date().getTime();
                    if (undefined != t.mop_mode) this.mopMode = parseInt(t.mop_mode);
                    if (undefined != t.water_shortage_status) this.waterShortageStatus = parseInt(t.water_shortage_status);
                    this.waterBoxDistance = t.distance_off || 0;
                    this.mopModeId = t.mop_template_id;
                    this.dryRemainTime = t.rdt || 0;
                    this.isWashReady = 1 == t.wash_ready;
                    if (t.clean_percent && t.clean_percent > 0) this.cleanProgress = t.clean_percent;
                    if (this.cleanResumeFlag == P.None) this.cleanProgress = 0;
                    this.lastCleanTimeDistanceToNow = (new Date().getTime() / 1e3 - (t.last_clean_t || 0)) / 3600;
                    this.cornerCleanOn = !!t.corner_clean_mode;
                    if (this.isCurrentMapChanged)
                      x.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module420.EventKeys.CurrentMapDidChange,
                      });
                    if (this.currentMapId > 0 || module415.MM.maps.length > 0)
                      x.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module420.EventKeys.FoundSavedMap,
                      });
                    K.next = 68;
                    return regeneratorRuntime.default.awrap(this.handleSpecialInfo());

                  case 68:
                  case 'end':
                    return K.stop();
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
        key: 'handleSpecialInfo',
        value: function () {
          var t, s, o, u, l, h, _, C, p, N, M;

          return regeneratorRuntime.default.async(
            function (E) {
              for (;;)
                switch ((E.prev = E.next)) {
                  case 0:
                    E.next = 2;
                    return regeneratorRuntime.default.awrap(module1641.TLM.GetListByHours(6));

                  case 2:
                    s = E.sent;
                    this.nextTimer = s.length > 0 ? s[0] : null;
                    if ((null == (t = this.nextTimer) ? undefined : t.hour) < 6) this.nextTimer = null;
                    o = module510.clean_route_fast_mode_is_work;
                    u =
                      module415.MM.mapData &&
                      !module415.MM.mapData.map.isEmpty &&
                      module390.default.isMultiFloorSupported() &&
                      z.mapSaveEnabled &&
                      z.mapStatus != K.None &&
                      !z.isRunning &&
                      -1 == z.currentMapId &&
                      z.state != G.LOCKED;
                    if (module390.default.isUnsaveMapReasonSupported() && this.unsaveMapReason == H.ChargerOffset && -1 != this.unsaveMapFlag)
                      this.specialInfo = {
                        text: module510.home_special_tip_for_charger_offset,
                        actionStyle: F.UnsaveMapReason,
                      };
                    else if (u)
                      this.specialInfo = {
                        text: module510.home_special_tip_for_new_map,
                        actionStyle: F.HasNewMap,
                      };
                    else if (this.isDrying && this.dryRemainTime > 0) {
                      l = this.dryRemainTime / 60;
                      h = module510.home_sepcial_info_airdry_finish_time_minute.templateStringWithParams({
                        minute: l.toFixed(0),
                      });
                      _ = module510.home_sepcial_info_airdry_finish_time.templateStringWithParams({
                        hour: (this.dryRemainTime / 3600).toFixed(1),
                      });
                      this.specialInfo = {
                        text: l >= 60 ? _ : h,
                        actionStyle: F.DryRemainTime,
                      };
                    } else if (
                      this.fanPower != module1625.CleanModeZero &&
                      this.waterBoxMode != module1625.WaterModeZero &&
                      this.mopMode == module1625.CleanRouteFastMode &&
                      this.isCleaning()
                    )
                      this.specialInfo = {
                        text: module510.home_sepecial_tip_cleanmop_fastroute,
                        actionStyle: F.CleanMopWithCleanRouteFast,
                      };
                    else if (module390.default.isPureCleanMopSupported() && this.fanPower == module1625.CleanModeZero && this.isCleaning()) {
                      C = this.isCollectDustDock ? module510.home_sepecial_tip_for_only_mop_collectdusk : module510.home_sepecial_tip_for_only_mop;
                      if (this.mopMode == module1625.CleanRouteFastMode) C = o + ', ' + C;
                      this.specialInfo = {
                        text: C,
                        actionStyle: F.PureMop,
                      };
                    } else if (module390.default.isPureCleanMopSupported() && this.waterBoxMode == module1625.WaterModeZero && this.isCleaning()) {
                      p = module510.home_sepecial_tip_for_only_clean;
                      if (this.mopMode == module1625.CleanRouteFastMode) p = o + ', ' + p;
                      this.specialInfo = {
                        text: p,
                        actionStyle: F.PureClean,
                      };
                    } else if (this.isWaitValleyCharge)
                      this.specialInfo = {
                        text: module510.home_special_tip_for_wait_charge,
                        actionStyle: F.WaitCharge,
                      };
                    else if (this.nextTimer && !this.isCleaning())
                      this.specialInfo = {
                        text: module510.home_special_info_timer.templateStringWithParams({
                          cleanTime: null != (N = null == (M = this.nextTimer) ? undefined : M.cleanTime) ? N : '',
                        }),
                        actionStyle: F.Timer,
                      };

                  case 8:
                  case 'end':
                    return E.stop();
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
          return this.homeSecStatus == B.RRHomeSecStatusDisconnecting;
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
          return this.homeSecStatus == B.RRHomeSecStatusConnected;
        },
      },
      {
        key: 'isHomeSecDisconnected',
        value: function () {
          return this.homeSecStatus == B.RRHomeSecStatusDisconnected;
        },
      },
      {
        key: 'parseEvents',
        value: function (t) {
          var module23, o, u, l, c, _;

          return regeneratorRuntime.default.async(
            function (S) {
              for (;;)
                switch ((S.prev = S.next)) {
                  case 0:
                    module23 = t.events;
                    if (
                      (o = module23.filter(function (t) {
                        return module23 && module1639.Toast[t];
                      }))[0]
                    )
                      this.currentToast = o[0];
                    else this.currentToast = '';
                    if (this.currentToast && this.currentToast.length > 0)
                      x.emit(module420.NotificationKeys.EventToastChange, {
                        data: this.currentToast,
                      });
                    this.handleSpecialToast();
                    u = module23.filter(function (t) {
                      return module23 && module1639.Reminder()[t];
                    });
                    S.next = 8;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.HasShownFullChargeReminder));

                  case 8:
                    if (((l = S.sent), this.state != G.FULL_CHARGE || l)) {
                      S.next = 19;
                      break;
                    }

                    u = u.concat('full_charge');
                    S.prev = 11;
                    S.next = 14;
                    return regeneratorRuntime.default.awrap(
                      module420.SetStorageKey(module420.StorageKeys.HasShownFullChargeReminder, module420.StorageKeys.HasShownFullChargeReminder)
                    );

                  case 14:
                    S.next = 19;
                    break;

                  case 16:
                    S.prev = 16;
                    S.t0 = S.catch(11);
                    console.log('full charge SetStorageKey error  -- ' + S.t0);

                  case 19:
                    if (((c = module394.default.sharedCache().notDisturbReminder), (S.t2 = this.notDisturbEnabled), !S.t2)) {
                      S.next = 25;
                      break;
                    }

                    S.next = 24;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.HasShownNotDisturbReminder));

                  case 24:
                    S.t2 = !S.sent;

                  case 25:
                    if (((S.t1 = S.t2), !S.t1)) {
                      S.next = 28;
                      break;
                    }

                    S.t1 = !c;

                  case 28:
                    if (!S.t1) {
                      S.next = 39;
                      break;
                    }

                    module394.default.sharedCache().notDisturbReminder = true;
                    u = u.concat('noDisturb');
                    S.prev = 31;
                    S.next = 34;
                    return regeneratorRuntime.default.awrap(
                      module420.SetStorageKey(module420.StorageKeys.HasShownNotDisturbReminder, module420.StorageKeys.HasShownNotDisturbReminder)
                    );

                  case 34:
                    S.next = 39;
                    break;

                  case 36:
                    S.prev = 36;
                    S.t3 = S.catch(31);
                    console.log('notDisturb SetStorageKey error  -- ' + S.t3);

                  case 39:
                    _ = undefined == t.common_status || 1 == (1 & t.common_status);

                    if (this.isChargingOnDock() && this.cleanResumeFlag != P.None && !this.hasShownChargingResumeCleanReminder && _) {
                      u = this.notDisturbEnabled ? u.concat('chargingResumeNoDisturbClean') : u.concat('chargingResumeClean');
                      this.hasShownChargingResumeCleanReminder = true;
                    }

                    if (!module394.default.sharedCache().waterShortageNotification && this.isWaterBoxIn && this.isWaterBoxCarriageIn && this.waterShortageStatus)
                      u = u.concat('water_shortage_reminder');
                    if (!((!this.isCleaning() && this.cleanResumeFlag != P.None) || ('chargingResumeClean' != this.currentReminder && 'full_charge' != this.currentReminder)))
                      this.closeReminder();
                    if (u[0] && !this.errorCode) this.currentReminder = u[0];
                    this.handleSpecialReminder();

                  case 46:
                  case 'end':
                    return S.stop();
                }
            },
            null,
            this,
            [
              [11, 16],
              [31, 36],
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
            x.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
              data: this.currentToast,
            });
        },
      },
      {
        key: 'handleSpecialReminder',
        value: function () {
          if (['relocate_failed_fz_clean', 'relocate_failed_fz_back', 'remind_to_save_map'].indexOf(this.currentReminder) >= 0)
            x.emit(module420.NotificationKeys.DidReceiveSpecialEvents, {
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
                    x.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (t) {
                      if (t.data == module420.EventKeys.MapSaveSwitchChanged) s.getStatus();
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
                    return regeneratorRuntime.default.awrap(module416.default.getStatus());

                  case 3:
                    t = o.sent;
                    console.log('origin status - ' + JSON.stringify(t));
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(this.parseStatus(t.result[0]));

                  case 7:
                    x.emit(module420.NotificationKeys.RobotStatusDidUpdate);
                    o.prev = 8;
                    o.next = 11;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.ValidConnect, module420.StorageKeys.ValidConnect));

                  case 11:
                    o.next = 16;
                    break;

                  case 13:
                    o.prev = 13;
                    o.t0 = o.catch(8);
                    console.log('getStatus SetStorageKey error  -- ' + o.t0);

                  case 16:
                    this.isValidConnect = true;
                    module419.Log.log(module418.LogTypes.LoopStatus, this.briefInfo(), module418.InfoColors.Success);
                    o.next = 34;
                    break;

                  case 20:
                    o.prev = 20;
                    o.t1 = o.catch(0);
                    module419.Log.log(module418.LogTypes.LoopStatus, 'RSM get status failed - ' + JSON.stringify(o.t1), module418.InfoColors.Fail, false);
                    module23 = o.t1.data && o.t1.data.error && (-10002 == o.t1.data.error.code || -10002 == o.t1.data.error);
                    this.isValidConnect = !module23;
                    o.prev = 25;
                    o.next = 28;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.ValidConnect, module23 ? '' : module420.StorageKeys.ValidConnect));

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
                      x.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module420.EventKeys.Error10002,
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
          return this.state == G.BACK_TO_DOCK || this.state == G.BACK_TO_DOCK_WASHING_DUSTER || z.state == G.COLLECTING_DUST || this.isDrying;
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
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag != P.None;
        },
      },
      {
        key: 'isGlobalCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == P.Global_Clean;
        },
      },
      {
        key: 'isSegmentCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == P.Segment_Clean;
        },
      },
      {
        key: 'isZoneCleanTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == P.Zone_Clean;
        },
      },
      {
        key: 'isQuickBuildMapTaskShouldResume',
        value: function () {
          return this.isReadyForCleanTaskResume() && this.cleanResumeFlag == P.Quick_Build_Map;
        },
      },
      {
        key: 'isBackDockTaskShouldResume',
        value: function () {
          return this.isBackDockTaskResumeable() && this.backDockResumeFlag == w.Has;
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
          return (this.isReadyToCmd() || this.state == G.PAUSE || this.isChargingOnDock()) && this.cleanResumeFlag == P.None;
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
          module415.MapManager.sharedManager().isStopedByStatus = false;
          module415.MapManager.sharedManager().shouldForceStart = false;
          module415.MapManager.sharedManager().isStopedBySettingPage = false;
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
          return this.cleanResumeFlag != P.None || (this.backDockResumeFlag != w.None && this.state != G.WAITING) || this.state == G.SPOT_CLEAN;
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
          return 204 == this.waterBoxMode || module424.DMM.isTanosSC || module424.DMM.isTanosSE;
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
          return (this.isCollectDock() || this.isCollectWashDock() || this.isCollectWashDryDock()) && (this.state == G.CHARGING || this.state == G.FULL_CHARGE);
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
        key: 'preMockMotionStatus',
        value: function (t) {
          if (t || this.preMockState) {
            for (var s in ((this.state = t || this.preMockState), (this.preMockState = this.state), (this.lastMotionStatusLockTime = new Date().getTime()), L))
              if (L[s].value == this.state) {
                this.stateName = L[s].name;
                break;
              }

            if (this.isWaitValleyCharge) this.stateName = module510.robot_status_wait_charge;
            x.emit(module420.NotificationKeys.RobotStatusDidUpdate);
          } else
            module419.Log.log(
              module418.LogTypes.KeyEvent,
              "meet a strange and invalid pre mock ,automatically end. beacause,preMockMotionStatus function param 'state' is " + t + ",'RSM.preMockState' is " + this.preMockState,
              module418.InfoColors.Fail
            );
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
            'washingTaskStatus',
            'washingMode',
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

            if (this.staticTotalCount > 5 && module415.MapManager.sharedManager().isRunning()) {
              module415.MapManager.sharedManager().stop();
              module415.MapManager.sharedManager().isStopedByStatus = true;
              console.log('checkHowToHandleMapManager stop request map - ' + this.staticTotalCount);
            }
          } else if (module415.MapManager.sharedManager().isStopedByStatus) {
            module415.MapManager.sharedManager().isStopedByStatus = false;
            this.staticTotalCount = 0;
            module415.MapManager.sharedManager().start();
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
        key: 'isO3PlusDock',
        value: function () {
          return 6 == this.dockType;
        },
      },
      {
        key: 'isO4Dock',
        value: function () {
          return 7 == this.dockType;
        },
      },
      {
        key: 'isPearlDock',
        value: function () {
          return 8 == this.dockType;
        },
      },
      {
        key: 'isOCDock',
        value: function () {
          return 5 == this.originDockType && module424.DMM.currentSeries != module424.DeviceSeries.a15;
        },
      },
      {
        key: 'isCollectDock',
        value: function () {
          return this.isO1Dock() || this.isOCDock();
        },
      },
      {
        key: 'isWashDock',
        value: function () {
          return this.isO2Dock();
        },
      },
      {
        key: 'isCollectWashDock',
        value: function () {
          return this.isO3Dock();
        },
      },
      {
        key: 'isCollectWashDryDock',
        value: function () {
          return this.isO3PlusDock() || this.isO4Dock() || this.isPearlDock();
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

exports.RobotStatusManager = Z;
var z = Z.sharedManager();
exports.RSM = z;
