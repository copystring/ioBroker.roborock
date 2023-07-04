exports.isModeCustomized = D;

exports.fixCleanMode = function (o) {
  return (
    {
      38: 101,
      60: 102,
      75: 103,
      100: 104,
    }[o] || o
  );
};

require('./393');

var module390 = require('./390'),
  module424 = require('./424'),
  module1625 = require('./1625'),
  module510 = require('./510').strings,
  u = 106;

exports.CustomCleanMode = u;
var c = 204;
exports.CustomWaterMode = c;
var _ = 302;
exports.CustomMopMode = _;
exports.CleanModeZero = 105;
exports.WaterModeZero = 200;
exports.CleanRouteDailyMode = 300;
exports.CleanRouteSubtlyMode = 301;
exports.CleanRouteDeepSlowMode = 303;
exports.CleanRouteFastMode = 304;
exports.CleanRouteDeepSlowPearlMode = 305;

var p = function () {
  var o = globals.app.state.theme.ModeSettingPanel,
    t = [
      {
        name: module510.localization_strings_Common_Protocol_4,
        selected: o.cleanModeSelected0,
        normal: o.cleanModeNormal0,
        homesmall: o.cleanModeSmall0,
        homenormal: o.cleanMode0,
        strength: 105,
      },
      {
        name: module510.localization_strings_Common_Protocol_0,
        selected: o.cleanModeSelected1,
        normal: o.cleanModeNormal1,
        homesmall: o.cleanModeSmall1,
        homenormal: o.cleanMode1,
        strength: 101,
      },
      {
        name: module510.localization_strings_Common_Protocol_1,
        selected: o.cleanModeSelected2,
        normal: o.cleanModeNormal2,
        homesmall: o.cleanModeSmall2,
        homenormal: o.cleanMode2,
        strength: 102,
      },
      {
        name: module510.localization_strings_Common_Protocol_2,
        selected: o.cleanModeSelected3,
        normal: o.cleanModeNormal3,
        homesmall: o.cleanModeSmall3,
        homenormal: o.cleanMode3,
        strength: 103,
      },
      {
        name: module510.localization_strings_Common_Protocol_3,
        selected: o.cleanModeSelected4,
        normal: o.cleanModeNormal4,
        homesmall: o.cleanModeSmall4,
        homenormal: o.cleanMode4,
        strength: 104,
      },
    ];
  if (module390.default.isMaxPlusModeSupported() || module390.default.isNonePureCleanMopWithMaxPlus())
    t.push({
      name: module510.clean_mode_max_plus,
      selected: o.cleanModeSelected5,
      normal: o.cleanModeNormal5,
      homesmall: o.cleanModeSmall5,
      homenormal: o.cleanMode5,
      strength: 108,
    });
  return t;
};

exports.CleanModes = p;

var h = function (o) {
  if (o == u) return module510.localization_strings_Setting_Timer_Common_4;
  var t = p().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

exports.getCleanModeTitle = h;

exports.getCleanModeDetailText = function (o) {
  var t = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
    u = module424.DMM.isGarnet;
  if (D(o.cleanMode, o.waterMode, o.mopMode)) return module510.map_edit_bottom_menu_mode;

  var c = h(o.cleanMode),
    _ = f(o.waterMode),
    p = c + (_ ? ' | ' + _ : '');

  if (module390.default.isPureCleanMopSupported() && 105 == o.cleanMode) return _ + ' | ' + R(o.mopMode);

  if (module390.default.isShakeMopSetSupported() && 200 != o.waterMode) {
    var S = R(o.mopMode);
    if (301 == o.mopMode) return _ + ' | ' + S;

    if (u) {
      if (t == module1625.CleanMethodClean) return p;
      if (t == module1625.CleanMethodMop) return S;
      if (t == module1625.CleanMethodCleanAndMop) return p + ' | ' + S;
    }
  }

  return p;
};

var S = function () {
    return module390.default.isShakeMopStrengthSupported() && !module424.DMM.isPearl;
  },
  C = function () {
    var o = globals.app.state.theme.ModeSettingPanel,
      t = [
        {
          name: module510.debug_info_close,
          selected: S() ? o.shakedWaterModeSelected0 : o.waterModeSelected0,
          normal: S() ? o.shakedWaterModeNormal0 : o.waterModeNormal0,
          strength: 200,
        },
        {
          name: S() ? module510.tanos_s_mop_mode_weak : module510.water_box_small,
          selected: S() ? o.shakedWaterModeSelected1 : o.waterModeSelected1,
          normal: S() ? o.shakedWaterModeNormal1 : o.waterModeNormal1,
          homesmall: S() ? o.shakedWaterModeSmall1 : o.waterModeSmall1,
          homenormal: S() ? o.waterMode1 : o.homeWaterMode1,
          strength: 201,
        },
        {
          name: S() ? module510.tanos_s_mop_mode_middle : module510.water_box_middle,
          selected: S() ? o.shakedWaterModeSelected2 : o.waterModeSelected2,
          normal: S() ? o.shakedWaterModeNormal2 : o.waterModeNormal2,
          homesmall: S() ? o.shakedWaterModeSmall2 : o.waterModeSmall2,
          homenormal: S() ? o.waterMode2 : o.homeWaterMode2,
          strength: 202,
        },
        {
          name: S() ? module510.tanos_s_mop_mode_strong : module510.water_box_big,
          selected: S() ? o.shakedWaterModeSelected3 : o.waterModeSelected3,
          normal: S() ? o.shakedWaterModeNormal3 : o.waterModeNormal3,
          homesmall: S() ? o.shakedWaterModeSmall3 : o.waterModeSmall3,
          homenormal: S() ? o.waterMode3 : o.homeWaterMode3,
          strength: 203,
        },
      ];
    if (module424.DMM.isGarnet) t.shift();
    var s = {
      name: module510.localization_strings_Setting_Timer_Common_4,
      selected: o.customWaterModeSelected,
      normal: o.customWaterModeNormal,
      homesmall: o.customWaterModeSmall,
      homenormal: o.waterModeCustom,
      strength: 207,
    };
    if (module390.default.isCustomWaterBoxDistanceSupported()) t.push(s);
    return t;
  };

exports.MopWaterOrStrengths = C;

var f = function (o) {
  if (module424.DMM.isGarnet || (!module390.default.isElectronicWaterBoxSupported() && !module390.default.isShakeMopStrengthSupported())) return '';
  if (o == c) return module510.localization_strings_Common_custom_mode;
  var t = C().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

exports.getMopWaterOrStrengthTitle = f;

var v = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module510.tanos_s_mop_mode_general_frag,
    selected: o.mopMethodSelected1,
    normal: o.mopMethodNormal1,
    strength: 300,
  };
};

exports.CleanRouteDaily = v;

var w = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module510.tanos_s_mop_mode_fine_frag,
    selected: o.mopMethodSelected2,
    normal: o.mopMethodNormal2,
    strength: 301,
  };
};

exports.CleanRouteSubtly = w;

var W = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module510.mop_method_careful_slow,
    selected: o.mopMethodSelected3,
    normal: o.mopMethodNormal3,
    strength: !module390.default.isCornerCleanModeSupported() && module390.default.isCleanRouteDeepSlowPlusSupported() && 'cn' == module390.default.deviceLocation ? 305 : 303,
  };
};

exports.CleanRouteDeepSlow = W;

var N = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module510.clean_route_fast_mode_title,
    selected: o.mopMethodSelected0,
    normal: o.mopMethodNormal0,
    strength: 304,
  };
};

exports.CleanRouteFast = N;

var P = function () {
  if (module390.default.isNonePureCleanMopWithMaxPlus()) return [N(), v()];
  var o = [v(), w()];
  if (module390.default.isCarefulSlowMopSupported()) o.push(W());
  if (module390.default.isCleanRouteFastModeSupported()) o = [N()].concat(module31.default(o));
  return o;
};

exports.MopMethods = P;

var R = function (o) {
  if (o == _) return module510.localization_strings_Common_custom_mode;
  var t = P().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

function D(o, t, s) {
  return module424.DMM.isGarnet ? o == u || 0 == s : module390.default.isShakeMopStrengthSupported() ? o == u || t == c || s == _ : o == u || t == c;
}

exports.getMopMethodTitle = R;

exports.getSystemCustomMopModes = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return [
    {
      id: 1,
      name: module510.custom_mop_mode_system_normal,
      desc: module510.custom_mop_mode_system_normal_desc,
      icon: o.mopModeNormal0,
      selectedIcon: o.mopModeSelected0,
      listIcon: o.mopModeListIcon0,
    },
    {
      id: 2,
      name: module510.custom_mop_mode_system_wetter_mop,
      desc: module510.custom_mop_mode_system_wetter_mop_desc,
      icon: o.mopModeNormal1,
      selectedIcon: o.mopModeSelected1,
      listIcon: o.mopModeListIcon1,
    },
    {
      id: 3,
      name: module510.custom_mop_mode_system_drier_mop,
      desc: module510.custom_mop_mode_system_drier_mop_desc,
      icon: o.mopModeNormal2,
      selectedIcon: o.mopModeSelected2,
      listIcon: o.mopModeListIcon2,
    },
  ];
};
