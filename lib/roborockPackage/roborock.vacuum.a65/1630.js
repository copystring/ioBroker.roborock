var module381 = require('./381'),
  module424 = require('./424'),
  module510 = require('./510').strings,
  _ = function () {
    var n = module424.DMM.isTopazS;
    return module381.RSM.isO2Dock() || module381.RSM.isO3Dock() || module381.RSM.hasConnectedWashDock || n;
  },
  c = function (t) {
    return t.homeBottomControl;
  },
  u = function (t, n) {
    var u = c(t);
    return module424.DMM.isGarnet && n ? u.garnetPauseImg : !module424.DMM.isGarnet && _() ? u.topazSPauseImg : u.pauseImg;
  },
  s = function (t) {
    return c(t).startMopImg;
  },
  l = function (t) {
    return c(t).startCleanMopImg;
  },
  p = function (t) {
    var n = c(t);
    return !module424.DMM.isGarnet && _() ? n.topazSStartWashingImg : n.startWashingImg;
  },
  f = function (t) {
    var n = c(t);
    return !module424.DMM.isGarnet && _() ? n.topazSResumeWashingImg : n.startWashingImg;
  },
  h = function (t) {
    var n = c(t);
    return !module424.DMM.isGarnet && _() ? n.topazSStopImg : n.stopImg;
  },
  C = function (t) {
    var n = c(t);
    return !module424.DMM.isGarnet && _() ? n.topazSResumeChargeImg : n.startChargeImg;
  },
  M = function (t) {
    return c(t).resumeMopImg;
  },
  k = function (t) {
    return c(t).resumeCleanMopImg;
  };

exports.getCleanButtonConfig = function (_, c) {
  var u = module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map;
  return {
    start: {
      title: module424.DMM.isGarnet ? module510.main_page_garnet_clean_1 : module510.main_page_clean_1,
      image: I(c),
    },
    pause: {
      title: u ? module510.main_control_pause_quick_build_map : module424.DMM.isGarnet ? module510.main_page_garnet_clean_2 : module510.main_page_clean_2,
      image: R(c),
    },
    resume: {
      title: u ? module510.main_control_resume_quick_build_map : module424.DMM.isGarnet ? module510.main_page_garnet_clean_3 : module510.main_page_clean_3,
      image: D(c),
    },
  }[_];
};

exports.getMopButtonConfig = function (t, o) {
  return {
    start: {
      title: module510.robot_cmd_start_mopping,
      image: s(o),
    },
    pause: {
      title: module510.robot_cmd_pause_mopping,
      image: u(o, true),
    },
    resume: {
      title: module510.robot_cmd_resume_mopping,
      image: M(o),
    },
  }[t];
};

exports.getCleanMopButtonConfig = function (t, o) {
  return {
    start: {
      title: module510.robot_cmd_start_clean_mop,
      image: l(o),
    },
    pause: {
      title: module510.robot_cmd_pause_clean_mop,
      image: u(o, true),
    },
    resume: {
      title: module510.robot_cmd_resume_clean_mop,
      image: k(o),
    },
  }[t];
};

exports.getWashingDusterButtonConfig = function (o, _) {
  return {
    start: {
      title: module381.RSM.isChargingOnDock() || module381.RSM.isWashReady ? module510.start_washing_duster_noback_dock : module510.robot_cmd_start_washing_duster,
      image: p(_),
    },
    pause: {
      title: module510.robot_cmd_pause_back_washing,
      image: u(_),
    },
    resume: {
      title: module510.robot_cmd_resume_back_washing,
      image: f(_),
    },
    stop: {
      title: module510.robot_cmd_stop_washing_duster,
      image: h(_),
    },
  }[o];
};

var w = function (t) {
    return c(t).newControlDockOnDock;
  },
  S = function (t) {
    return c(t).newControlDockOffDock;
  },
  x = function (t) {
    return c(t).newControlStartCharge;
  },
  b = function (t) {
    return c(t).newControlChargeOnDock;
  },
  I = function (t) {
    return c(t).newControlStartClean;
  },
  D = function (t) {
    return c(t).newControlResumeClean;
  },
  R = function (t) {
    return c(t).newControlPause;
  },
  B = function (t) {
    return c(t).newControlStartCollect;
  },
  W = function (t) {
    return c(t).newControlStartWash;
  },
  O = function (t) {
    return c(t).newControlStartDry;
  },
  v = function (t) {
    return c(t).newControlStop;
  };

exports.getDockButtonConfig = function (o, _) {
  return {
    unfold: {
      title: module381.RSM.isChargingOnDock() || module381.RSM.isWashReady ? module510.home_new_control_dock_unfold_title : module510.home_new_control_back_charge,
      image: module381.RSM.isChargingOnDock() ? w(_) : S(_),
    },
    startCharge: {
      title: module381.RSM.isO0Dock() ? module510.localization_strings_Main_MainPage_1 : module510.home_new_control_back_charge,
      image: x(_),
    },
    charging: {
      title: module510.new_dock_charging_or_full_charging_title,
      image: b(_),
    },
    full: {
      title: module510.new_dock_charging_or_full_charging_title,
      image: b(_),
    },
    startCollectDust: {
      title: module510.home_new_control_start_collect,
      image: B(_),
    },
    pauseCharge: {
      title: module510.main_page_charge_3,
      image: R(_),
    },
    pauseBackWash: {
      title: module510.robot_cmd_pause_back_washing,
      image: R(_),
    },
    resumeCharge: {
      title: module510.main_page_charge_4,
      image: C(_),
    },
    resumeWash: {
      title: module510.robot_cmd_resume_back_washing,
      image: W(_),
    },
    startWash: {
      title: module510.home_new_control_start_wash,
      image: W(_),
    },
    stop: {
      title: module510.egg_page_stop_button_title,
      image: v(_),
    },
  }[o];
};

exports.getNewCollectButtonConfig = function (t, o) {
  return {
    startCollect: {
      title: module510.home_new_control_start_collect,
      image: B(o),
    },
    startCharge: {
      title: module510.terminate_current_task_back_dock,
      image: x(o),
    },
    resumeCharge: {
      title: module510.main_page_charge_4,
      image: x(o),
    },
  }[t];
};

exports.getNewWashButtonConfig = function (o, _) {
  return {
    start: {
      title: module381.RSM.isChargingOnDock() ? module510.home_new_control_start_wash : module510.start_washing_duster_noback_dock,
      image: W(_),
    },
    resume: {
      title: module510.robot_cmd_resume_back_washing,
      image: W(_),
    },
    halfwayWash: {
      title: module510.terminate_current_task_then_wash,
      image: W(_),
    },
  }[o];
};

exports.getNewDryButtonConfig = function (t, o) {
  return {
    start: {
      title: module510.home_new_control_start_dry,
      image: O(o),
    },
    stop: {
      title: module510.egg_page_stop_button_title,
      image: v(o),
    },
  }[t];
};

var y = function () {
  var o = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {},
    _ = [],
    c = {
      1: module510.dock_info_clear_water_box_exception1,
      38: module510.dock_info_clear_water_box_exception1,
      48: module510.error_up_water_title,
    },
    u = (module381.RSM.errorCode > 2 && module381.RSM.errorCode) || module381.RSM.clearWaterBoxStatus,
    s = {
      name: module510.dock_info_clear_water_box_title,
      okIcon: o.clearWaterBoxOKIcon,
      exceptionIcon: o.clearWaterBoxExceptionIcon,
      exceptionText: c[u],
    },
    l = {
      1: module510.dock_info_dirty_water_box_exception1,
      39: module510.dock_info_dirty_water_box_exception1,
      49: module510.error_drain_water_title,
    },
    p = (module381.RSM.errorCode > 2 && module381.RSM.errorCode) || module381.RSM.dirtyWaterBoxStatus,
    f = {
      name: module510.dock_info_dirty_water_box_title,
      okIcon: o.dirtyWaterBoxOKIcon,
      exceptionIcon: o.dirtyWaterBoxExceptionIcon,
      exceptionText: l[p],
    },
    h = {
      1: module510.dock_info_item_gone_exception,
      34: module510.dock_info_dust_bag_exception,
    },
    C = (module381.RSM.errorCode > 2 && module381.RSM.errorCode) || module381.RSM.dustBagStatus,
    M = {
      name: module510.dust_collection_life1,
      okIcon: o.dustBagOKIcon,
      exceptionIcon: o.dustBagExceptionIcon,
      exceptionText: h[C],
    },
    k = {
      1: module510.dock_info_clean_fluid_exception,
    },
    w = (module381.RSM.errorCode > 2 && module381.RSM.errorCode) || module381.RSM.cleanFluidStatus,
    S = {
      name: module510.dock_info_clean_fluid_title,
      okIcon: o.cleanFluidOKIcon,
      exceptionIcon: o.cleanFluidExceptionIcon,
      exceptionText: k[w],
    };
  if (!(module381.RSM.errorCode > 2 && module381.RSM.errorCode)) module381.RSM.waterBoxFilterStatus;
  module381.RSM.waterBoxFilterStatus;

  _.push(s);

  _.push(f);

  if (!module381.RSM.isO2Dock()) _.push(M);
  if (module381.RSM.hasCleanFulidModule) _.push(S);
  return _;
};

exports.getDockInfoItems = y;

exports.hasDockExceptions = function () {
  for (var t = false, o = y(), n = 0; n < o.length; n++)
    if (o[n].exceptionText) {
      t = true;
      break;
    }

  return t;
};
