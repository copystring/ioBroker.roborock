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
  var module393;
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
            module393 = u.sent;
            return u.abrupt('return', module393);

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
  Object.values(v).forEach(function (t) {
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
  module393 = require('./393'),
  u = module393.deviceId,
  y = module393.userId,
  module410 = require('./410'),
  S = module410.MiPrivacyAgreementVersion,
  c = module410.RRPrivacyAgreementVersion,
  l = module410.RRMonitorPrivacyVersion || 1,
  K = module410.RRPhotoPrivacyVersion || 1,
  D = module410.RRARMapPrivacyVersion || 1,
  M = module393.isMiApp ? S : c,
  p = module393.isMiApp ? 'MI' : 'RR',
  C = {
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
    BottomControlDoAction: 'NotificationKeys_BottomControlDoAction',
    SelfCleaningSetDidChange: 'NotificationKeys_SelfCleaningSetDidChange',
  };

exports.NotificationKeys = C;
Object.freeze(C);
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
  CurrentARMapDidDelete: 'NotificationKeys_CurrentARMapDidDelete',
};
var v = {
  HasShownFullChargeReminder: 'StorageKeys_HasShownFullChargeReminder' + u,
  HasShownNotDisturbReminder: 'StorageKeys_HasShownNotDisturbReminder' + u,
  UserSelectedCountryServerCode: 'StorageKeys_UserSelectedCountryServerCode_' + u + '_' + y + '_' + p + '_' + M,
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
  DeviceActiveTime: 'StorageKeys_DeviceActiveTime_' + u + '_' + y,
  RubyPlusCN0720Notice: 'StorageKeys_RubyPlusCN0720Notice_' + u + '_' + y,
  SoundPackageUpgrade: 'StorageKeys_SoundPackageUpgrade_' + u + '_' + y + '_' + new Date().getMonth() + new Date().getDate(),
  ActivityCN0919Notice: 'StorageKeys_ActivityCN0919Notice_' + u + '_' + y + '_2020',
  LedSettingNotice: 'StorageKeys_LedSettingNotice_' + u + '_' + y,
  CleanMode: 'StorageKeys_CleanMode_' + u + '_' + y,
  WaterMode: 'StorageKeys_WaterMode_' + u + '_' + y,
  MopMode: 'StorageKeys_MopMode_' + u + '_' + y,
  MapDebugInfoVisible: 'StorageKeys_MapDebugInfoVisible_' + u + '_' + y,
  MonitorVideoDefinition: 'StorageKeys_MonitorVideoDefinition_' + u + '_' + y,
  HasSetInitialGesturePassword: 'StorageKeys_HasSetGesturePasswordInitially_' + u + '_' + y,
  HasShownMapObjectPhotoReminder: 'StorageKeys_MapObstaclesPhotoReminderHasShown_' + u + '_' + y,
  AreaUnitIndex: 'StorageKeys_AreaUnitIndex_' + u + '_' + y,
  MonitorPrivacyVersion: 'StorageKeys_MonitorPrivacyVersion_' + l + '_' + u + '_' + y,
  PhotoPrivacyVersion: 'StorageKeys_PhotoPrivacyVersion_' + K + '_' + u + '_' + y,
  ARMapPrivacyVersion: 'StorageKeys_ARMapPrivacyVersion_' + D + '_' + u + '_' + y,
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
  InnerTestHDVersion: 'StorageKeys_InnerTestHDVersion' + u,
  ConfigInfoStorage: 'StorageKeys_ConfigInfoStorage' + u,
  MapSaveGuide: 'StorageKeys_MapSaveGuide' + u,
  MultiFloorGuide: 'StorageKeys_MultiFloorGuide' + u,
  AvoidCollisionGuide: 'StorageKeys_AvoidCollisionGuide' + u,
  ARMapPathPrefixKey: 'StorageKeys_ARMapPath' + u,
  ShowFurnitureModel: 'StorageKeys_ShowFurnitureModel' + u,
  ProhibitedBehaviorsGuide: 'StorageKeys_ProhibitedBehaviorsGuide' + u,
  PreferedMapType: 'StorageKeys_PreferedMapType_' + u + '_' + y,
  CloseFurnitureGuide: 'StorageKeys_CloseFurnitureGuide_' + u + '_' + y,
  AutoIdentifyRoomTag: 'StorageKeys_AutoIdentifyRoomTag_' + u + '_' + y,
  MonitorVideoWatermark: 'StorageKeys_MonitorVideoWatermark_' + u + '_' + y,
  MapElementShowFlag: 'StorageKeys_MapElementShowFlag_' + u + '_' + y,
  SapMapBeautifyFlag: 'StorageKeys_SapMapBeautifyFlag_' + u + '_' + y,
  ChatVolumeValue: 'StorageKeys_ChatVolumeValue' + u,
};
exports.StorageKeys = v;
Object.freeze(v);
