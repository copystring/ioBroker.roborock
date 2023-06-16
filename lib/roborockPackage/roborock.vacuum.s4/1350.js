var module377 = require('./377'),
  module415 = require('./415'),
  module491 = require('./491').strings,
  s = function () {
    return module377.RSM.isO2Dock() || module377.RSM.isO3Dock() || module377.RSM.hasConnectedWashDock || module415.DMM.isTopazS;
  },
  _ = function (t) {
    return t.homeBottomControl;
  },
  u = function (t) {
    var o = _(t);

    return module415.DMM.isGarnet || s() ? o.topazSStartCleanImg : o.startCleanImg;
  },
  c = function (t, o) {
    var u = _(t);

    return module415.DMM.isGarnet && o ? u.garnetPauseImg : !module415.DMM.isGarnet && s() ? u.topazSPauseImg : u.pauseImg;
  },
  l = function (t) {
    var o = _(t);

    return module415.DMM.isGarnet || s() ? o.topazSResumeCleanImg : o.resumeCleanImg;
  },
  p = function (t) {
    var o = _(t);

    return !module415.DMM.isGarnet && s() ? o.topazSStartChargeImg : o.startChargeImg;
  },
  M = function (t) {
    return _(t).startMopImg;
  },
  C = function (t) {
    return _(t).startCleanMopImg;
  },
  f = function (t) {
    var o = _(t);

    return !module415.DMM.isGarnet && s() ? o.topazSStartWashingImg : o.startWashingImg;
  },
  h = function (t) {
    var o = _(t);

    return !module415.DMM.isGarnet && s() ? o.topazSResumeWashingImg : o.startWashingImg;
  },
  D = function (t) {
    var o = _(t);

    return !module415.DMM.isGarnet && s() ? o.topazSCollectDustImg : o.startCollectDustImg;
  },
  I = function (t) {
    var o = _(t);

    return !module415.DMM.isGarnet && s() ? o.topazSStopImg : o.stopImg;
  },
  S = function (t) {
    var o = _(t);

    return !module415.DMM.isGarnet && s() ? o.topazSResumeChargeImg : o.startChargeImg;
  },
  b = function (t) {
    return _(t).resumeMopImg;
  },
  G = function (t) {
    return _(t).resumeCleanMopImg;
  };

exports.getCleanButtonConfig = function (t, s) {
  return {
    start: {
      title: module415.DMM.isGarnet ? module491.main_page_garnet_clean_1 : module491.main_page_clean_1,
      image: u(s),
    },
    pause: {
      title: module415.DMM.isGarnet ? module491.main_page_garnet_clean_2 : module491.main_page_clean_2,
      image: c(s, true),
    },
    resume: {
      title: module415.DMM.isGarnet ? module491.main_page_garnet_clean_3 : module491.main_page_clean_3,
      image: l(s),
    },
  }[t];
};

exports.getChargeButtonConfig = function (t, n) {
  return {
    charging: {
      title: module491.main_page_charge_1,
      image: p(n),
    },
    start: {
      title: module491.main_page_charge_2,
      image: p(n),
    },
    pause: {
      title: module491.main_page_charge_3,
      image: c(n),
    },
    resume: {
      title: module491.main_page_charge_4,
      image: S(n),
    },
    full: {
      title: module491.localization_strings_Common_Constants_17,
      image: p(n),
    },
    startCollectDust: {
      title: module491.mainpage_start_collect_dust,
      image: D(n),
    },
    stopCollectDust: {
      title: module491.mainpage_stop_collect_dust,
      image: I(n),
    },
    stopAirDry: {
      title: module491.mainpage_stop_air_dry,
      image: I(n),
    },
  }[t];
};

exports.getMopButtonConfig = function (t, n) {
  return {
    start: {
      title: module491.robot_cmd_start_mopping,
      image: M(n),
    },
    pause: {
      title: module491.robot_cmd_pause_mopping,
      image: c(n, true),
    },
    resume: {
      title: module491.robot_cmd_resume_mopping,
      image: b(n),
    },
  }[t];
};

exports.getCleanMopButtonConfig = function (t, n) {
  return {
    start: {
      title: module491.robot_cmd_start_clean_mop,
      image: C(n),
    },
    pause: {
      title: module491.robot_cmd_pause_clean_mop,
      image: c(n, true),
    },
    resume: {
      title: module491.robot_cmd_resume_clean_mop,
      image: G(n),
    },
  }[t];
};

exports.getWashingDusterButtonConfig = function (n, s) {
  return {
    start: {
      title: module377.RSM.isChargingOnDock() || module377.RSM.isWashReady ? module491.start_washing_duster_noback_dock : module491.robot_cmd_start_washing_duster,
      image: f(s),
    },
    pause: {
      title: module491.robot_cmd_pause_back_washing,
      image: c(s),
    },
    resume: {
      title: module491.robot_cmd_resume_back_washing,
      image: h(s),
    },
    stop: {
      title: module491.robot_cmd_stop_washing_duster,
      image: I(s),
    },
  }[n];
};
