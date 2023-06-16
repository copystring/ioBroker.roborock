exports.SetStorageKey = function (t, s) {
  return regeneratorRuntime.default.async(
    function (u) {
      for (;;)
        switch ((u.prev = u.next)) {
          case 0:
            u.next = 2;
            return regeneratorRuntime.default.awrap(module12.AsyncStorage.setItem(t, s));

          case 2:
          case 'end':
            return u.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.GetStorageKey = function (t) {
  var module389;
  return regeneratorRuntime.default.async(
    function (u) {
      for (;;)
        switch ((u.prev = u.next)) {
          case 0:
            if (t) {
              u.next = 2;
              break;
            }

            return u.abrupt('return', null);

          case 2:
            u.next = 4;
            return regeneratorRuntime.default.awrap(module12.AsyncStorage.getItem(t));

          case 4:
            module389 = u.sent;
            return u.abrupt('return', module389);

          case 6:
          case 'end':
            return u.stop();
        }
    },
    null,
    null,
    null,
    Promise
  );
};

exports.DelStorageKey = function (t) {
  return regeneratorRuntime.default.async(
    function (s) {
      for (;;)
        switch ((s.prev = s.next)) {
          case 0:
            s.next = 2;
            return regeneratorRuntime.default.awrap(module12.AsyncStorage.removeItem(t));

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
};

exports.clearAllAsyncStorage = function () {
  Object.values(p).forEach(function (t) {
    return regeneratorRuntime.default.async(
      function (s) {
        for (;;)
          switch ((s.prev = s.next)) {
            case 0:
              s.next = 2;
              return regeneratorRuntime.default.awrap(module12.AsyncStorage.removeItem(t));

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
  });
};

var regeneratorRuntime = require('regenerator-runtime'),
  module12 = require('./12'),
  module389 = require('./389'),
  u = module389.deviceId,
  c = module389.userId,
  module403 = require('./403'),
  _ = module403.MiPrivacyAgreementVersion,
  S = module403.RRPrivacyAgreementVersion,
  l = module403.RRMonitorPrivacyVersion || 1,
  D = module403.RRPhotoPrivacyVersion || 1,
  K = module389.isMiApp ? _ : S,
  C = module389.isMiApp ? 'MI' : 'RR',
  M = {
    RobotStatusDidUpdate: 'NotificationKeys_RobotStatusDidUpdate',
    MapDidUpdate: 'NotificationKeys_MapDidUpdate',
    DidReceiveSpecialEvent: 'NotificationKeys_DidReceiveSpecialEvent',
    RedDotDidChange: 'NotificationKeys_RedDotDidChange',
    EventToastChange: 'NotificationKeys_EventToast',
    RealTimeVideoSettingChange: 'NotificationKeys__Real_Time_Video_Setting',
    AreaUnitChange: 'EventKeys_AreaUnitChange',
    DeviceExtraInfo: 'NotificationKeys_DeviceExtraInfo',
    MapImageLoaded: 'NotificationKeys_MapImageLoaded',
    ThemeDidChange: 'NotificationKeys_ThemeDidChange',
    MapEditDidChange: 'NotificationKeys_MapEditDidChange',
    CarpetCleanModeDidChange: 'NotificationKeys_CarpetCleanModeDidChange',
    MapManualReset: 'NotificationKeys_MapManualReset',
    ConfigDidLoad: 'NotificationKeys_ConfigDidLoad',
    BottomControlMenuNeedRefresh: 'NotificationKeys_BottomControlMenuNeedRefresh',
  };

exports.NotificationKeys = M;
Object.freeze(M);
exports.EventKeys = {
  MapSegmentsDidChange: 'EventKeys_MapSegmentsDidChange',
  MapDidRotate: 'EventKeys_MapDidRotate',
  ConsumableReset: 'EventKeys_ConsumableReset',
  CleanWaterModeDidChange: 'EventKeys_CleanWaterModeDidChange',
  Error10002: 'EventKeys_Error10002',
  SegmentCustomModeDidChange: 'EventKeys_SegmentCustomModeDidChange',
  SegmentCustomModeDidReceive: 'EventKeys_SegmentCustomModeDidReceive',
  RoomNameMappingDidReceive: 'EventKeys_RoomNameMappingDidReceive',
  MultiMapsDidReceive: 'EventKeys_MultiMapsDidReceive',
  CleanSequenceDidReceive: 'EventKeys_CleanSequenceDidReceive',
  CleanSequenceDidChange: 'EventKeys_SegmentCustomModeDidChange',
  MapSaveSwitchChanged: 'EventKeys_MapSaveSwitchChanged',
  FBZSettingsDidChange: 'EventKeys_FBZSettingsDidChange',
  CurrentMapDidChange: 'EventKeys_CurrentMapDidChange',
};
var p = {
  HasShownFullChargeReminder: 'StorageKeys_HasShownFullChargeReminder' + u,
  HasShownNotDisturbReminder: 'StorageKeys_HasShownNotDisturbReminder' + u,
  UserSelectedCountryServerCode: 'StorageKeys_UserSelectedCountryServerCode_' + u + '_' + c + '_' + C + '_' + K,
  SoundPackageLsitData: 'StorageKeys_SoundPackageLsitData' + u,
  SpecialSoundPackageLsitData: 'StorageKeys_SpecialSoundPackageLsitData' + u,
  MapEditNewbyGuide: 'StorageKeys_MapEditNewbyGuide' + u,
  RobotMopModeState: 'StorageKeys_RobotMopModeState' + u,
  RobotSerialNumber: 'StorageKeys_RobotSerialNumber' + u,
  ValidConnect: 'StorageKeys_ValidConnect' + u,
  DoNotDisturbBeginHour: 'StorageKeys_DoNotDisturbBeginHour' + u,
  DoNotDisturbBeginMinute: 'StorageKeys_DoNotDisturbBeginMinute' + u,
  DoNotDisturbEndHour: 'StorageKeys_DoNotDisturbEndHour' + u,
  DoNotDisturbEndMinute: 'StorageKeys_DoNotDisturbEndMinute' + u,
  DoNotDisturbEnable: 'StorageKeys_DoNotDisturbEnable' + u,
  VolumeValue: 'StorageKeys_VolumeValue' + u,
  RobotTimeZone: 'StorageKeys_RobotTimeZone' + u,
  DeviceActiveTime: 'StorageKeys_DeviceActiveTime_' + u + '_' + c,
  RubyPlusCN0720Notice: 'StorageKeys_RubyPlusCN0720Notice_' + u + '_' + c,
  SoundPackageUpgrade: 'StorageKeys_SoundPackageUpgrade_' + u + '_' + c + '_' + new Date().getMonth() + new Date().getDate(),
  ActivityCN0919Notice: 'StorageKeys_ActivityCN0919Notice_' + u + '_' + c + '_2020',
  LedSettingNotice: 'StorageKeys_LedSettingNotice_' + u + '_' + c,
  CleanMode: 'StorageKeys_CleanMode_' + u + '_' + c,
  WaterMode: 'StorageKeys_WaterMode_' + u + '_' + c,
  MopMode: 'StorageKeys_MopMode_' + u + '_' + c,
  MapDebugInfoVisible: 'StorageKeys_MapDebugInfoVisible_' + u + '_' + c,
  MonitorVideoDefinition: 'StorageKeys_MonitorVideoDefinition_' + u + '_' + c,
  HasSetInitialGesturePassword: 'StorageKeys_HasSetGesturePasswordInitially_' + u + '_' + c,
  HasShownMapObjectPhotoReminder: 'StorageKeys_MapObstaclesPhotoReminderHasShown_' + u + '_' + c,
  AreaUnitIndex: 'StorageKeys_AreaUnitIndex_' + u + '_' + c,
  MonitorPrivacyVersion: 'StorageKeys_MonitorPrivacyVersion_' + l + '_' + u + '_' + c,
  PhotoPrivacyVersion: 'StorageKeys_PhotoPrivacyVersion_' + D + '_' + u + '_' + c,
  HasCollectDustDock: 'StorageKeys_HasCollectDustDock_' + u + '_' + c,
  ExquisiteCleanbyGuide: 'StorageKeys_ExquisiteCleanbyGuide' + u,
  FindCarpetbyGuide: 'StorageKeys_FindCarpetbyGuide' + u,
  VirtualWallbyGuide: 'StorageKeys_VirtualWallbyGuide' + u,
  EditZonebyGuide: 'StorageKeys_EditZonebyGuide' + u,
  CustomModebyGuide: 'StorageKeys_CustomModebyGuide' + u,
  CleanSequencebyGuide: 'StorageKeys_CleanSequencebyGuide' + u,
  DustCollectionSequencebyGuide: 'StorageKeys_DustSequencebyGuide' + u,
  HasDarkMode: 'StorageKeys_HasDarkMode' + u,
  TimerCleanbyGuide: 'StorageKeys_TimerCleanbyGuide' + u,
  ShowSpecificObstacle: 'StorageKeys_ShowSpecificObstacle' + u,
  MapRotateAngle: 'StorageKeys_MapRotateAngle' + u,
  DockType: 'StorageKeys_DockType' + u,
  DockGuide: 'StorageKeys_DockGuide' + u,
  FoamRemoveGuide: 'StorageKeys_FoamRemoveGuide' + u,
  InnerTestUsersName: 'StorageKeys_InnerTestUsersName' + u,
  ConfigInfoStorage: 'StorageKeys_ConfigInfoStorage' + u,
};
exports.StorageKeys = p;
Object.freeze(p);
