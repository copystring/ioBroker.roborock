require('./391');

var module50 = require('./50'),
  module417 = require('./417'),
  module418 = require('./418'),
  module390 = require('./390'),
  module389 = require('./389'),
  module393 = require('./393'),
  p = 1e3 * Math.round(1e4 * Math.random()),
  l = {
    ReachMaxRetryCount: 'reach_max_retry_count',
    RetryIDInvalid: 'retry_id_invalid',
  };

function f(t, n, o, s) {
  module418.Log.log(module418.LogTypes.SRPC, t + ' - ' + JSON.stringify(n), module418.InfoColors.Normal, true);
  return new Promise(function (c, _) {
    s(t, n, o, function (o, s) {
      if (o && s && s.result && 'unknown_method' != s.result) {
        module418.Log.log(module418.LogTypes.RPC, t + ' - ' + ('object' == typeof n ? JSON.stringify(n) : n) + ' - ' + JSON.stringify(s), module418.InfoColors.Success, true);
        c(s);
      } else {
        module418.Log.log(
          module418.LogTypes.RPC,
          t + '  - ' + ('object' == typeof n ? JSON.stringify(n) : n) + ' - ' + (JSON.stringify(s) || 'unknow reason'),
          module418.InfoColors.Fail,
          true
        );

        _({
          error: 'error: ' + t,
          data: s || 'unknow reason',
        });
      }
    });
  });
}

function M(t, n, s) {
  var c = {
      id: p,
      method: t,
      params: n,
    },
    l = module417.default.encode(JSON.stringify(c)),
    f = {
      did: module393.deviceId,
      siid: 7,
      aiid: 1,
      in: [l],
    };
  console.log('miSpec', t, JSON.stringify(f));
  module418.Log.log(module418.LogTypes.SRPC, 'spec ' + t + ' - ' + JSON.stringify(c), module418.InfoColors.Normal, true);
  return new Promise(function (s, c) {
    module393.Service.spec
      .doAction(f)
      .then(function (_) {
        if ((console.log('miSpec', _), _.out)) {
          var p = JSON.parse(module417.default.decode(_.out[0])),
            l = p.result && 'unknown_method' != p.result;
          module418.Log.log(
            module418.LogTypes.RPC,
            'spec ' + t + ' - ' + ('object' == typeof n ? JSON.stringify(n) : n) + ' - ' + JSON.stringify(p),
            module418.InfoColors.Success,
            true
          );
          if (l) s(p);
          else
            c({
              error: 'spec error: ' + t,
              data: p || 'unknow reason',
            });
        } else {
          module418.Log.log(module418.LogTypes.RPC, 'spec error missing out field', module418.InfoColors.Fail, true);
          c('spec error missing out field');
        }
      })
      .catch(function (n) {
        module418.Log.log(module418.LogTypes.RPC, 'spec error ' + t + ' - ' + ('object' == typeof n ? JSON.stringify(n) : n), module418.InfoColors.Fail, true);
        c({
          error: 'spec error: ' + t,
          data: n || 'Service.spec.doAction exception',
        });
      });
  });
}

var h = [
  'save_map',
  'merge_segment',
  'split_segment',
  'name_segment',
  'set_customize_clean_mode',
  'load_multi_map',
  'save_as_multi_map',
  'set_clean_sequence',
  'set_lab_status',
  'set_timer',
  'set_ignore_identify_area',
  'set_ignore_carpet_zone',
  'set_server_timer',
];

function S(t, n, o) {
  if ((p++, !(module390.default.isRPCRetrySupported() && 'retry_request' != t))) return module393.isSpecSupported() ? M(t, n) : f(t, n, o, module393.callMethod);

  var u = n,
    c = 0,
    S = function t(n, o, u, s) {
      c++;
      setTimeout(function () {
        RobotApi.retryRequest({
          retry_id: n,
          method: o,
          retry_count: c,
        })
          .then(function (_) {
            if (_.result && 'retry' == _.result) c >= 8 ? s && s(l.ReachMaxRetryCount) : t(n, o, u, s);
            else if (u) u(_);
          })
          .catch(function (t) {
            if (s) s(t);
          });
      }, 2e3);
    },
    C = h.hasElement(t);

  if (C)
    u.constructor === Array
      ? (u = {
          data: n,
          need_retry: 1,
        })
      : 'object' == typeof u && (u.need_retry = 1);
  return new Promise(function (n, s) {
    var c;
    ((c = u), module393.isSpecSupported() ? M(t, c) : f(t, c, o, module393.callMethod))
      .then(function (o) {
        if (o.result && 'retry' == o.result && C) undefined != o.id && null != o.id ? S(o.id, t, n, s) : s(l.RetryIDInvalid);
        else n(o);
      })
      .catch(function (t) {
        s(t);
      });
  });
}

var C = (RobotApi = {
  getStatus: function () {
    return S(module389.Methods.GetProp, [module389.Methods.GetStatus], {});
  },
  getMapStatus: function () {
    return S(module389.Methods.GetMapStatus, [], {});
  },
  getMapName: function (t, n) {
    return S(t, n, {});
  },
  getSegmentStatus: function () {
    return S(module389.Methods.GetSegmentStatus, [], {});
  },
  start: function (t) {
    return S(module389.Methods.AppStart, t || [], {});
  },
  segmentClean: function (t) {
    return S(module389.Methods.SegmentClean, t, {});
  },
  stopSegmentClean: function () {
    return S(module389.Methods.StopSegmentClean, [], {});
  },
  resumeSegmentClean: function () {
    return S(module389.Methods.ResumeSegmentClean, [], {});
  },
  zoneClean: function (t) {
    return S(module389.Methods.StartZonedClean, t, {});
  },
  stopZoneClean: function () {
    return S(module389.Methods.StopZonedClean, [], {});
  },
  resumeZoneClean: function () {
    return S(module389.Methods.ResumeZonedClean, [], {});
  },
  pause: function () {
    return S(module389.Methods.AppPause, [], {});
  },
  charge: function () {
    return S(module389.Methods.AppCharge, [], {});
  },
  startWashThenCharge: function () {
    return S('start_wash_then_charge', [], {});
  },
  stop: function () {
    return S(module389.Methods.AppStop, [], {});
  },
  spot: function () {
    return S(module389.Methods.AppSpot, [], {});
  },
  getCustomMode: function () {
    return S(module389.Methods.GetCustomMode, [], {});
  },
  setCustomMode: function (t) {
    return S(module389.Methods.SetCustomMode, [t], {});
  },
  setCleanMotorMode: function (t, n) {
    return S(
      'set_clean_motor_mode',
      [
        {
          fan_power: t,
          water_box_mode: n,
        },
      ],
      {}
    );
  },
  getCurrentSoundPackage: function () {
    return S(module389.Methods.GetCurrentSoundPackage, [], {});
  },
  setSoundPackage: function (t) {
    return S(module389.Methods.SetSoundPackage, t, {});
  },
  getSoundPackageProgress: function () {
    return S(module389.Methods.GetSoundPackageProgress, [], {});
  },
  setCarpetMode: function (t) {
    return S(module389.Methods.SetCarpetMode, [t], {});
  },
  getCarpetMode: function () {
    return S(module389.Methods.GetCarpetMode, [], {});
  },
  getTimeZone: function () {
    return S(module389.Methods.GetTimezone, [], {});
  },
  setLabStatus: function (t) {
    return S(module389.Methods.SetLabStatus, [t], {});
  },
  setSwitchMapMode: function (t) {
    return S(
      module389.Methods.SetSwitchMapMode,
      {
        mode: t,
      },
      {}
    );
  },
  findMe: function () {
    return S(module389.Methods.FindMe, [], {});
  },
  getCleanSummary: function () {
    return S(module389.Methods.GetCleanSummary, [], {});
  },
  getLocale: function () {
    return S(module389.Methods.GetRobotLocale, [], {});
  },
  getServerTimer: function () {
    return S(module389.Methods.GetServerTimer, [], {});
  },
  deleteServerTimer: function (t) {
    return S(module389.Methods.DeleteServerTimer, [t], {});
  },
  updateServerTimer: function (t) {
    return S(module389.Methods.UpdateServerTimer, t, {});
  },
  setServerTimer: function (t) {
    return S(module389.Methods.SetServerTimer, [t], {});
  },
  updateTimer: function (t) {
    return S(module389.Methods.UpdTimer, t, {});
  },
  setTimer: function (t) {
    return S(module389.Methods.SetTimer, [t], {});
  },
  getTimer: function () {
    return S(module389.Methods.GetTimer, [], {});
  },
  deleteTimer: function (t) {
    return S(module389.Methods.DelTimer, [t], {});
  },
  getSupplies: function () {
    return S(module389.Methods.GetSupplies, [], {});
  },
  getNetworkInfo: function () {
    return S(module389.Methods.GetNetworkInfo, [], {});
  },
  getCleanSummary: function () {
    return S(module389.Methods.GetCleanSummary, [], {});
  },
  getCleanRecord: function (t) {
    return S(module389.Methods.GetCleanRecord, [t], {});
  },
  deleteCleanRecord: function (t) {
    return S(module389.Methods.DelCleanRecord, [t], {});
  },
  setLogLevel: function (t, n) {
    return S(module389.Methods.EnableLogUpload, [t, n], {});
  },
  setDndTimer: function (t, n, o, u) {
    return S(module389.Methods.SetDndTimer, [t, n, o, u], {});
  },
  closeDndTimer: function () {
    return S(module389.Methods.CloseDndTimer, [], {});
  },
  getDndTimer: function () {
    return S(module389.Methods.GetDndTimer, [], {});
  },
  getFWFeatures: function () {
    return S(module389.Methods.GetFWFeatures, [], {});
  },
  setFDSEndpoint: function (t) {
    return S(module389.Methods.SetFdsEndpoint, [t], {});
  },
  getInitStatus: function () {
    return S(module389.Methods.GetInitStatus, [], {});
  },
  setAppTimezone: function (t) {
    return S(module389.Methods.SetAppTimezone, t, {});
  },
  manualSegmentMap: function (t) {
    return S(module389.Methods.ManualSegmentMap, [t], {});
  },
  setLedStatus: function (t) {
    return S(module389.Methods.SetLedStatus, [t], {});
  },
  getLedStatus: function () {
    return S(module389.Methods.GetLedStatus, [], {});
  },
  getSoundVolume: function () {
    return S(module389.Methods.GetSoundVolume, [], {});
  },
  setSoundVolume: function (t) {
    return S(module389.Methods.SetSoundVolume, [t], {});
  },
  testSoundVolume: function () {
    return S(module389.Methods.TestSoundVolume, [], {});
  },
  getSerialNumber: function () {
    return S(module389.Methods.GetSerialNumber, [], {});
  },
  getWaterBoxMode: function () {
    return S(module389.Methods.GetWaterBoxMode, [], {});
  },
  setWaterBoxMode: function (t) {
    return S(module389.Methods.SetWaterBoxMode, [t], {});
  },
  setCustomCleanMode: function (t) {
    return S(module389.Methods.SetCustomCleanMode, t, {});
  },
  getCustomCleanMode: function () {
    return S(module389.Methods.GetCustomCleanMode, [], {});
  },
  setTimezone: function (t) {
    return S(module389.Methods.SetTimezone, [t], {});
  },
  createNewFloorMap: function () {
    return S(
      module389.Methods.AppStart,
      [
        {
          use_new_map: 1,
        },
      ],
      {}
    );
  },
  quickCreateMap: function () {
    return S('app_start_build_map', [], {});
  },
  resumeQuickBuildMap: function () {
    return S('app_resume_build_map', [], {});
  },
  getCameraStatus: function () {
    return S('get_camera_status', [], {});
  },
  setCameraStatus: function (t) {
    return S('set_camera_status', [t], {});
  },
  getTimerListSummary: function () {
    return S('get_timer_summary', [], {});
  },
  getTimerDetail: function (t) {
    return S('get_timer_detail', [t], {});
  },
  getRoomNameMappingInfo: function () {
    return S(module389.Methods.GetRoomMapping, [], {});
  },
  getMultiMaps: function () {
    return S(module389.Methods.GetMultiMapsList, [], {});
  },
  saveMap: function (t) {
    return S('save_map', t, {});
  },
  retryRequest: function (t) {
    return S('retry_request', t, {});
  },
  saveCarpetIgnoreZone: function (t) {
    return S('set_ignore_carpet_zone', t, {});
  },
  saveDoorSillBlocks: function (t) {
    return S('app_set_door_sill_blocks', t, {});
  },
  saveSmartDoorSills: function (t) {
    return S('app_set_smart_door_sill', t, {});
  },
  saveCarpetAddedZone: function (t) {
    return S('set_carpet_area', t, {});
  },
  saveFloorMaterial: function (t) {
    return S('set_segment_ground_material', t, {});
  },
  setFloorIdentifyStatus: function (t) {
    return S('set_identify_ground_material_status', t, {});
  },
  getFloorIdentifyStatus: function () {
    return S('get_identify_ground_material_status', [], {});
  },
  saveFurnitureEditZones: function (t) {
    return S('save_furnitures', t, {});
  },
  setFurnitureIdentifyStatus: function (t) {
    return S('set_identify_furniture_status', t, {});
  },
  getFurnitureIdentifyStatus: function () {
    return S('get_identify_furniture_status', [], {});
  },
  setIgnoreStuckPoint: function (t) {
    return S('app_set_ignore_stuck_point', t, {});
  },
  setCliffForbidden: function (t) {
    return S('app_set_smart_cliff_forbidden', t, {});
  },
  getAnonymousID: function () {
    return S('get_testid', [], {});
  },
  setCleanSequence: function (t) {
    return S('set_clean_sequence', t, {});
  },
  getCleanSequence: function () {
    return S('get_clean_sequence', [], {});
  },
  startEditMap: function () {
    return S(module389.Methods.StartEditMap, [], {});
  },
  loadMultiMap: function (t) {
    return S(module389.Methods.LoadMultiMap, [t], {});
  },
  remoteStart: function () {
    return S(module389.Methods.AppRemoteControlStart, [], {});
  },
  remoteEnd: function () {
    return S(module389.Methods.AppRemoteControlEnd, [], {});
  },
  remoteMove: function (t) {
    return S(module389.Methods.AppRemoteControlMove, [t], {});
  },
  remoteStop: function () {
    return S('app_rc_stop', [], {});
  },
  startCameraPreview: function (t) {
    return S('start_camera_preview', t, {});
  },
  stopCameraPreview: function (t) {
    return S('stop_camera_preview', t, {});
  },
  getTurnServerInfo: function () {
    return S('get_turn_server', [], {});
  },
  sendSdpInfo: function (t) {
    return f(
      'send_sdp_to_robot',
      {
        app_sdp: t,
      },
      {},
      module393.callMethodFromCloud
    );
  },
  sendIceInfo: function (t) {
    return S(
      'send_ice_to_robot',
      {
        app_ice: t,
      },
      {}
    );
  },
  setVideoQuality: function (t) {
    return S(
      'switch_video_quality',
      {
        quality: t,
      },
      {}
    );
  },
  getDeviceSdpInfo: function () {
    return S('get_device_sdp', [], {});
  },
  getDeviceIceInfo: function () {
    return S('get_device_ice', [], {});
  },
  setSecPassword: function (t) {
    return S('set_homesec_password', t, {});
  },
  resetSecPassword: function () {
    return S('reset_homesec_password', [], {});
  },
  getHomeSecConnectStatus: function () {
    return S('get_homesec_connect_status', [], {});
  },
  checkSecPassword: function (t) {
    return S(
      'check_homesec_password',
      {
        password: t,
      },
      {}
    );
  },
  gotoTarget: function (t) {
    return S('app_goto_target', t, {});
  },
  setChildLockStatus: function (t) {
    return S(
      'set_child_lock_status',
      {
        lock_status: t,
      },
      {}
    );
  },
  getChildLockStatus: function () {
    return S('get_child_lock_status', [], {});
  },
  setCarpetCleanMode: function (t) {
    return S(
      'set_carpet_clean_mode',
      {
        carpet_clean_mode: t,
      },
      {}
    );
  },
  getCarpetCleanMode: function () {
    return S('get_carpet_clean_mode', [], {});
  },
  playAudio: function (t) {
    return S('play_audio', t, {});
  },
  getRandomPubKey: function () {
    return S('get_random_pkey', [], {});
  },
  resetSupplies: function (t) {
    return S(module389.Methods.ResetSupplies, [t], {});
  },
  userUploadLog: function () {
    return S(module389.Methods.UserUploadLog, [], {});
  },
  appStat: function (t) {
    return S(module389.Methods.AppStat, [t], {});
  },
  appWakeupRobot: function () {
    return S(module389.Methods.AppWakeupRobot, [], {});
  },
  gotoTargetStop: function () {
    return S(module389.Methods.GotoTargetStop, [], {});
  },
  endEditMap: function () {
    return S(module389.Methods.EndEditMap, [], {});
  },
  mergeSegment: function (t) {
    return S(module389.Methods.MergeSegment, t, {});
  },
  splitSegment: function (t) {
    return S(module389.Methods.SplitSegment, t, {});
  },
  nameSegment: function (t) {
    return S(module389.Methods.NameSegment, t, {});
  },
  setIgnoreIdentifyArea: function (t) {
    return S('set_ignore_identify_area', t, {});
  },
  getMultiMapsList: function () {
    return S('get_multi_maps_list', [], {});
  },
  nameMultiMap: function (t) {
    return S(module389.Methods.NameMultiMap, t, {});
  },
  getRecoverMap: function (t) {
    return S(module389.Methods.GetRecoverMap, [t], {});
  },
  deleteSelectMap: function (t) {
    return S(module389.Methods.DeleteSelectMap, [t], {});
  },
  recoverMap: function (t) {
    return S(module389.Methods.RecoverMap, [t], {});
  },
  resetMap: function () {
    return S('reset_map', [], {});
  },
  getRecoverMaps: function () {
    return S(module389.Methods.GetRecoverMaps, [], {});
  },
  uploadObstaclesPhotos: function (t) {
    return S('upload_photo', t, {});
  },
  startCollectDust: function () {
    return S('app_start_collect_dust', [], {});
  },
  stopCollectDust: function () {
    return S('app_stop_collect_dust', [], {});
  },
  setCleanMopMode: function (t, o, u, s) {
    var c = s ? 'mop_template_id' : 'mop_mode';
    return S(
      'set_clean_motor_mode',
      [
        module50.default(
          {
            fan_power: t,
            water_box_mode: o,
          },
          c,
          u
        ),
      ],
      {}
    );
  },
  setMopMode: function (t) {
    return S('set_mop_mode', [t], {});
  },
  getMopMode: function () {
    return S('get_clean_motor_mode', [mode], {});
  },
  startWash: function () {
    return S('app_start_wash', {}, {});
  },
  stopWash: function () {
    return S('app_stop_wash', {}, {});
  },
  stopAirdryMop: function () {
    return S('stop_fan_motor_work', [], {});
  },
  setAirdryDuration: function (t) {
    return S(
      'set_airdry_hours',
      {
        hours: t,
      },
      {}
    );
  },
  setDustCollectionStatus: function (t) {
    return S(
      'set_dust_collection_switch_status',
      {
        status: t,
      },
      {}
    );
  },
  getDustCollectionStatus: function () {
    return S('get_dust_collection_switch_status', [], {});
  },
  setMapBeautificationStatus: function (t) {
    return S(
      'set_map_beautification_status',
      {
        status: t,
      },
      {}
    );
  },
  getMapBeautificationStatus: function () {
    return S('get_map_beautification_status', [], {});
  },
  otaMiIot: function (t, n, o, u, s) {
    return S(
      'miIO.ota',
      {
        app_url: t,
        file_md5: n,
        proc: o,
        mode: u,
        install: s,
      },
      {}
    );
  },
  uploadDataDebugMode: function () {
    return S('upload_data_for_debug_mode', [], {});
  },
  setFanMotorWorkTimeout: function (t) {
    return S(
      'set_fan_motor_work_timeout',
      {
        timeout: t,
      },
      {}
    );
  },
  getFanMotorWorkTimeout: function () {
    return S('get_fan_motor_work_timeout', [], {});
  },
  setMopMontorStatus: function (t) {
    return S(
      'set_mop_motor_status',
      {
        status: t,
      },
      {}
    );
  },
  getMopMontorStatus: function () {
    return S('get_mop_motor_status', [], {});
  },
  setFloorDirectionCleanStatus: function (t) {
    return S(
      'set_clean_follow_ground_material_status',
      {
        status: t,
      },
      {}
    );
  },
  getFloorDirectionCleanStatus: function () {
    return S('get_clean_follow_ground_material_status', [], {});
  },
  setCollisionAvoidStatus: function (t) {
    return S(
      'set_collision_avoid_status',
      {
        status: t,
      },
      {}
    );
  },
  getCollisionAvoidStatus: function () {
    return S('get_collision_avoid_status', [], {});
  },
  setFlowSettingStatus: function (t) {
    return S(
      'set_flow_led_status',
      {
        status: t,
      },
      {}
    );
  },
  getFlowSettingStatus: function () {
    return S('get_flow_led_status', [], {});
  },
  setDustCollectionMode: function (t) {
    return S(
      'set_dust_collection_mode',
      {
        mode: t,
      },
      {}
    );
  },
  getDustCollectionMode: function () {
    return S('get_dust_collection_mode', [], {});
  },
  getCleanRollerDebugInfo: function () {
    return S('get_wash_debug_params', [], {});
  },
  setWashInterval: function (t) {
    return S(
      'set_wash_debug_params',
      {
        washinterval: t,
      },
      {}
    );
  },
  setDryingTime: function (t) {
    return S(
      'set_wash_debug_params',
      {
        dryingtime: t,
      },
      {}
    );
  },
  setRollerSpeed: function (t) {
    return S(
      'set_wash_debug_params',
      {
        rollerspeed: t,
      },
      {}
    );
  },
  setMoppingSpeed: function (t) {
    return S(
      'set_wash_debug_params',
      {
        moppingspeed: t,
      },
      {}
    );
  },
  setWashTowelStatus: function (t) {
    return S(
      'set_wash_towel_params',
      {
        status: t,
      },
      {}
    );
  },
  setWashTowelParams: function (t) {
    return S(
      'set_wash_towel_params',
      {
        mode: t,
      },
      {}
    );
  },
  setWashTowelInterval: function (t) {
    return S(
      'set_wash_towel_params',
      {
        interval: t,
      },
      {}
    );
  },
  getWashTowel: function () {
    return S('get_wash_towel_params', [], {});
  },
  resolveError: function (t) {
    return S(
      'resolve_error',
      {
        error_code: t,
      },
      {}
    );
  },
  enableHomeSecVoice: function (t) {
    return S(
      'enable_homesec_voice',
      {
        enable: t,
      },
      {}
    );
  },
  reunionScenes: function (t) {
    return S(
      'reunion_scenes',
      {
        data: t,
      },
      {}
    );
  },
  setScenesSegment: function (t) {
    return S(
      'set_scenes_segments',
      {
        data: t,
      },
      {}
    );
  },
  setScenesZone: function (t) {
    return S(
      'set_scenes_zones',
      {
        data: t,
      },
      {}
    );
  },
  getScenes: function () {
    return S('get_scenes_valid_tids', {}, {});
  },
  setSmartWashParams: function (t, n) {
    return S(
      'set_smart_wash_params',
      {
        smart_wash: t,
        wash_interval: n,
      },
      {}
    );
  },
  getSmartWashParams: function () {
    return S('get_smart_wash_params', {}, {});
  },
  setWashTowelMode: function (t) {
    return S(
      'set_wash_towel_mode',
      {
        wash_mode: t,
      },
      {}
    );
  },
  getWashTowelMode: function () {
    return S('get_wash_towel_mode', {}, {});
  },
  getCustomMopModeList: function () {
    return S('get_mop_template_params_summary', {}, {});
  },
  getCustomMopModeDetail: function (t) {
    return S(
      'get_mop_template_params_by_id',
      {
        id: t,
      },
      {}
    );
  },
  addCustomMopMode: function (t) {
    return S('add_mop_template_params', t, {});
  },
  updateCustomMopMode: function (t) {
    return S('update_mop_template_params', t, {});
  },
  delCustomMopMode: function (t) {
    return S(
      'del_mop_template_params',
      {
        id: t,
      },
      {}
    );
  },
  sortCustomMopModes: function (t) {
    return S('sort_mop_template_params', t, {});
  },
  setCustomMopById: function (t) {
    return S(
      'set_mop_template_id',
      {
        mop_template_id: t,
      },
      {}
    );
  },
  setWaterBoxDistance: function (t) {
    return S(
      'set_water_box_distance_off',
      {
        distance_off: t,
      },
      {}
    );
  },
  startVoiceChat: function (t) {
    return S('start_voice_chat', t, {});
  },
  stopVoiceChat: function () {
    return S('stop_voice_chat', {}, {});
  },
  startEggAttack: function () {
    return S('app_start_easter_egg', {}, {});
  },
  eggKeep: function () {
    return S('app_keep_easter_egg', {}, {});
  },
  setWatermark: function (t) {
    return S(
      'switch_water_mark',
      {
        waterMark: t,
      },
      {}
    );
  },
  setValleyElectricityTimer: function (t, n, o, u) {
    return S('set_valley_electricity_timer', [t, n, o, u], {});
  },
  getValleyElectricityTimer: function () {
    return S('get_valley_electricity_timer', [], {});
  },
  closeValleyElectricityTimer: function () {
    return S('close_valley_electricity_timer', [], {});
  },
  updateUnsaveMap: function (t) {
    return S(
      'app_update_unsave_map',
      {
        update: t,
      },
      {}
    );
  },
  getDryerSetting: function () {
    return S('app_get_dryer_setting', [], {});
  },
  setDryerSetting: function (t, n) {
    return S(
      'app_set_dryer_setting',
      {
        on: {
          dry_time: t,
        },
        status: n,
      },
      {}
    );
  },
  setDryerStatus: function (t) {
    return S(
      'app_set_dryer_status',
      {
        status: t,
      },
      {}
    );
  },
  getAmethystStatus: function () {
    return S('app_get_amethyst_status', [], {});
  },
  setAmethystStatus: function (t) {
    return S(
      'app_set_amethyst_status',
      {
        status: t,
      },
      {}
    );
  },
  manualBackupMap: function (t) {
    return S(
      'manual_bak_map',
      {
        map_flag: t,
      },
      {}
    );
  },
  recoverMultiMap: function (t) {
    return S(
      'recover_multi_map',
      {
        map_flag: t,
      },
      {}
    );
  },
  setConfigTestUrl: function (t, n, o) {
    return S(
      'app_set_dynamic_config',
      {
        version: t,
        url: n,
        signature_url: o,
      },
      {}
    );
  },
  setVoiceChatVolume: function (t) {
    return S(
      'set_voice_chat_volume',
      {
        volume: t,
      },
      {}
    );
  },
  getCleanEstimateInfo: function () {
    return S('app_get_clean_estimate_info', {}, {});
  },
  setDndTimerActions: function (t) {
    return S('set_dnd_timer_actions', t, {});
  },
  appAmethystSelfCheck: function () {
    return S('app_amethyst_self_check', {}, {});
  },
  appAmethystDrainWater: function () {
    return S('app_amethyst_drain_all_water', {}, {});
  },
  appAmethystDrainWater: function () {
    return S('app_amethyst_drain_all_water', {}, {});
  },
  appAmethystDrainLeftWater: function () {
    return S('app_empty_inbuilt_water_tank', {}, {});
  },
  setCarpetDeepClean: function (t) {
    return S('app_set_carpet_deep_clean_status', t, {});
  },
  getCarpetDeepClean: function () {
    return S('app_get_carpet_deep_clean_status', {}, {});
  },
  getWifiList: function () {
    return S('app_get_wifi_list', {}, {});
  },
  deleteWifi: function (t) {
    return S(
      'app_delete_wifi',
      {
        id: t,
      },
      {}
    );
  },
  getDockInfo: function () {
    return S('get_dock_info', {}, {});
  },
  updateDock: function () {
    return S('update_dock', {}, {});
  },
  getMapDiffDynamic: function (t) {
    return S('get_dynamic_map_diff', t, {});
  },
  getMapDataDynamic: function (t) {
    return S('get_dynamic_data', t, {});
  },
  getAutoDeliveryCleanFluid: function () {
    return S('get_auto_delivery_cleaning_fluid', {}, {});
  },
  setAutoDeliveryCleanFluid: function (t) {
    return S(
      'set_auto_delivery_cleaning_fluid',
      {
        status: t,
      },
      {}
    );
  },
  setOfflineMapStatus: function (t) {
    return S(
      'set_offline_map_status',
      {
        status: t ? 1 : 0,
      },
      {}
    );
  },
  getOfflineMapStatus: function () {
    return S('get_offline_map_status', {}, {});
  },
  getMopBackPWM: function () {
    return S('get_mop_reverse_pwm_values', {}, {});
  },
  setMopBackPWM: function (t) {
    return S('set_mop_reverse_pwm_values', t, {});
  },
  setCes2022Action: function (t) {
    return S('set_ces_action', t, {});
  },
  setCarpetFirstSwitch: function (t) {
    return S(
      'app_set_priority_carpet_cleaning_status',
      {
        status: t,
      },
      {}
    );
  },
  skipCurrentCleaningArea: function (t) {
    return S('app_skip_current_cleaning_area', t, {});
  },
  gotoCleanSupplementZones: function (t) {
    return S('app_start_replenish_clean_area', t, {});
  },
  setCornerCleanMode: function (t) {
    return S(
      'set_corner_clean_mode',
      {
        status: t ? 1 : 0,
      },
      {}
    );
  },
});
exports.default = C;
