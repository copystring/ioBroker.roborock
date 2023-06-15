var module381 = require('./381'),
  module423 = require('./423'),
  module505 = require('./505').strings,
  _ = function () {
    var o = module423.DMM.isTopazS;
    return module381.RSM.isO2Dock() || module381.RSM.isO3Dock() || module381.RSM.hasConnectedWashDock || o;
  },
  s = function (t) {
    return t.homeBottomControl;
  },
  u = function (t, o) {
    var u = s(t);
    return module423.DMM.isGarnet && o ? u.garnetPauseImg : !module423.DMM.isGarnet && _() ? u.topazSPauseImg : u.pauseImg;
  },
  l = function (t) {
    var o = s(t);
    return !module423.DMM.isGarnet && _() ? o.topazSStartChargeImg : o.startChargeImg;
  },
  c = function (t) {
    return s(t).startMopImg;
  },
  p = function (t) {
    return s(t).startCleanMopImg;
  },
  h = function (t) {
    var o = s(t);
    return !module423.DMM.isGarnet && _() ? o.topazSStartWashingImg : o.startWashingImg;
  },
  C = function (t) {
    var o = s(t);
    return !module423.DMM.isGarnet && _() ? o.topazSResumeWashingImg : o.startWashingImg;
  },
  f = function (t) {
    var o = s(t);
    return !module423.DMM.isGarnet && _() ? o.topazSCollectDustImg : o.startCollectDustImg;
  },
  M = function (t) {
    var o = s(t);
    return !module423.DMM.isGarnet && _() ? o.topazSStopImg : o.stopImg;
  },
  w = function (t) {
    var o = s(t);
    return !module423.DMM.isGarnet && _() ? o.topazSResumeChargeImg : o.startChargeImg;
  },
  D = function (t) {
    return s(t).resumeMopImg;
  },
  S = function (t) {
    return s(t).resumeCleanMopImg;
  };

exports.getCleanButtonConfig = function (_, s) {
  var u = module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.Quick_Build_Map;
  return {
    start: {
      title: module423.DMM.isGarnet ? module505.main_page_garnet_clean_1 : module505.main_page_clean_1,
      image: k(s),
    },
    pause: {
      title: u ? module505.main_control_pause_quick_build_map : module423.DMM.isGarnet ? module505.main_page_garnet_clean_2 : module505.main_page_clean_2,
      image: I(s),
    },
    resume: {
      title: u ? module505.main_control_resume_quick_build_map : module423.DMM.isGarnet ? module505.main_page_garnet_clean_3 : module505.main_page_clean_3,
      image: B(s),
    },
  }[_];
};

exports.getChargeButtonConfig = function (t, n) {
  return {
    charging: {
      title: module505.main_page_charge_1,
      image: l(n),
    },
    start: {
      title: module505.main_page_charge_2,
      image: l(n),
    },
    pause: {
      title: module505.main_page_charge_3,
      image: u(n),
    },
    resume: {
      title: module505.main_page_charge_4,
      image: w(n),
    },
    full: {
      title: module505.localization_strings_Common_Constants_17,
      image: l(n),
    },
    startCollectDust: {
      title: module505.mainpage_start_collect_dust,
      image: f(n),
    },
    stopCollectDust: {
      title: module505.mainpage_stop_collect_dust,
      image: M(n),
    },
    stopAirDry: {
      title: module505.mainpage_stop_air_dry,
      image: M(n),
    },
  }[t];
};

exports.getMopButtonConfig = function (t, n) {
  return {
    start: {
      title: module505.robot_cmd_start_mopping,
      image: c(n),
    },
    pause: {
      title: module505.robot_cmd_pause_mopping,
      image: u(n, true),
    },
    resume: {
      title: module505.robot_cmd_resume_mopping,
      image: D(n),
    },
  }[t];
};

exports.getCleanMopButtonConfig = function (t, n) {
  return {
    start: {
      title: module505.robot_cmd_start_clean_mop,
      image: p(n),
    },
    pause: {
      title: module505.robot_cmd_pause_clean_mop,
      image: u(n, true),
    },
    resume: {
      title: module505.robot_cmd_resume_clean_mop,
      image: S(n),
    },
  }[t];
};

exports.getWashingDusterButtonConfig = function (n, _) {
  return {
    start: {
      title: module381.RSM.isChargingOnDock() || module381.RSM.isWashReady ? module505.start_washing_duster_noback_dock : module505.robot_cmd_start_washing_duster,
      image: h(_),
    },
    pause: {
      title: module505.robot_cmd_pause_back_washing,
      image: u(_),
    },
    resume: {
      title: module505.robot_cmd_resume_back_washing,
      image: C(_),
    },
    stop: {
      title: module505.robot_cmd_stop_washing_duster,
      image: M(_),
    },
  }[n];
};

var b = function (t) {
    return s(t).newControlDockUnfold;
  },
  k = function (t) {
    return s(t).newControlStartClean;
  },
  B = function (t) {
    return s(t).newControlResumeClean;
  },
  I = function (t) {
    return s(t).newControlPause;
  },
  R = function (t) {
    return s(t).newControlStartCollect;
  },
  W = function (t) {
    return s(t).newControlStartWash;
  },
  v = function (t) {
    return s(t).newControlStartDry;
  },
  z = function (t) {
    return s(t).newControlStop;
  };

exports.getDockButtonConfig = function (n, _) {
  return {
    unfold: {
      title: module381.RSM.isChargingOnDock() || module381.RSM.isWashReady ? module505.home_new_control_dock_unfold_title : module505.home_new_control_back_charge,
      image: b(_),
    },
    startCharge: {
      title: module381.RSM.isO0Dock() ? module505.localization_strings_Main_MainPage_1 : module505.home_new_control_back_charge,
      image: b(_),
    },
    charging: {
      title: module505.new_dock_charging_or_full_charging_title,
      image: b(_),
    },
    full: {
      title: module505.new_dock_charging_or_full_charging_title,
      image: b(_),
    },
    startCollectDust: {
      title: module505.home_new_control_start_collect,
      image: R(_),
    },
    pauseCharge: {
      title: module505.main_page_charge_3,
      image: I(_),
    },
    pauseBackWash: {
      title: module505.robot_cmd_pause_back_washing,
      image: I(_),
    },
    resumeCharge: {
      title: module505.main_page_charge_4,
      image: w(_),
    },
    resumeWash: {
      title: module505.robot_cmd_resume_back_washing,
      image: W(_),
    },
    startWash: {
      title: module505.home_new_control_start_wash,
      image: W(_),
    },
    stop: {
      title: module505.egg_page_stop_button_title,
      image: z(_),
    },
  }[n];
};

exports.getNewCollectButtonConfig = function (t, n) {
  return {
    startCollect: {
      title: module505.home_new_control_start_collect,
      image: R(n),
    },
    startCharge: {
      title: module505.localization_strings_Main_MainPage_1,
      image: b(n),
    },
  }[t];
};

exports.getNewWashButtonConfig = function (t, n) {
  return {
    start: {
      title: module505.home_new_control_start_wash,
      image: W(n),
    },
  }[t];
};

exports.getNewDryButtonConfig = function (t, n) {
  return {
    start: {
      title: module505.home_new_control_start_dry,
      image: v(n),
    },
    stop: {
      title: module505.egg_page_stop_button_title,
      image: z(n),
    },
  }[t];
};
