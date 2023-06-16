exports.isModeCustomized = R;

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
  module423 = require('./423'),
  module1544 = require('./1544'),
  module1545 = require('./1545'),
  module505 = require('./505').strings,
  u = 106;

exports.CustomCleanMode = u;
var _ = 204;
exports.CustomWaterMode = _;
var p = 302;
exports.CustomMopMode = p;
exports.CleanModeZero = 105;
exports.WaterModeZero = 200;
exports.CleanRouteSubtlyMode = 301;
exports.CleanRouteDeepSlowMode = 303;
exports.CleanRouteFastMode = 304;

var h = function () {
  var o = globals.app.state.theme.ModeSettingPanel,
    t = [
      {
        name: module505.localization_strings_Common_Protocol_4,
        selected: o.cleanModeSelected0,
        normal: o.cleanModeNormal0,
        homesmall: o.cleanModeSmall0,
        homenormal: o.cleanMode0,
        strength: 105,
      },
      {
        name: module505.localization_strings_Common_Protocol_0,
        selected: o.cleanModeSelected1,
        normal: o.cleanModeNormal1,
        homesmall: o.cleanModeSmall1,
        homenormal: o.cleanMode1,
        strength: 101,
      },
      {
        name: module505.localization_strings_Common_Protocol_1,
        selected: o.cleanModeSelected2,
        normal: o.cleanModeNormal2,
        homesmall: o.cleanModeSmall2,
        homenormal: o.cleanMode2,
        strength: 102,
      },
      {
        name: module505.localization_strings_Common_Protocol_2,
        selected: o.cleanModeSelected3,
        normal: o.cleanModeNormal3,
        homesmall: o.cleanModeSmall3,
        homenormal: o.cleanMode3,
        strength: 103,
      },
      {
        name: module505.localization_strings_Common_Protocol_3,
        selected: o.cleanModeSelected4,
        normal: o.cleanModeNormal4,
        homesmall: o.cleanModeSmall4,
        homenormal: o.cleanMode4,
        strength: 104,
      },
    ];
  if (module390.default.isMaxPlusModeSupported())
    t.push({
      name: module505.clean_mode_max_plus,
      selected: o.cleanModeSelected5,
      normal: o.cleanModeNormal5,
      homesmall: o.cleanModeSmall5,
      homenormal: o.cleanMode5,
      strength: 108,
    });
  return t;
};

exports.CleanModes = h;

var S = function (o) {
  if (o == u) return module505.localization_strings_Setting_Timer_Common_4;
  var t = h().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

exports.getCleanModeTitle = S;

exports.getCleanModeDetailText = function (o) {
  var t = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
    u = module423.DMM.isGarnet;
  if (R(o.cleanMode, o.waterMode, o.mopMode)) return module505.map_edit_bottom_menu_mode;

  var _ = S(o.cleanMode),
    p = v(o.waterMode),
    h = _ + (p ? ' | ' + p : '');

  if (module390.default.isPureCleanMopSupported() && 105 == o.cleanMode) return p + ' | ' + y(o.mopMode);

  if (module390.default.isShakeMopSetSupported() && 200 != o.waterMode) {
    var f,
      C = u ? (null == (f = module1545.ModeDataInstance.modePannelCustomMops[0]) ? undefined : f.name) : y(o.mopMode);
    if (301 == o.mopMode) return p + ' | ' + C;

    if (u) {
      if (t == module1544.CleanMethodClean) return h;
      if (t == module1544.CleanMethodMop) return C;
      if (t == module1544.CleanMethodCleanAndMop) return h + ' | ' + C;
    }
  }

  return h;
};

var f = function () {
    return module390.default.isShakeMopStrengthSupported();
  },
  C = function () {
    var o = globals.app.state.theme.ModeSettingPanel,
      t = [
        {
          name: module505.debug_info_close,
          selected: f() ? o.shakedWaterModeSelected0 : o.waterModeSelected0,
          normal: f() ? o.shakedWaterModeNormal0 : o.waterModeNormal0,
          strength: 200,
        },
        {
          name: f() ? module505.tanos_s_mop_mode_weak : module505.water_box_small,
          selected: f() ? o.shakedWaterModeSelected1 : o.waterModeSelected1,
          normal: f() ? o.shakedWaterModeNormal1 : o.waterModeNormal1,
          homesmall: f() ? o.shakedWaterModeSmall1 : o.waterModeSmall1,
          homenormal: o.waterMode1,
          strength: 201,
        },
        {
          name: f() ? module505.tanos_s_mop_mode_middle : module505.water_box_middle,
          selected: f() ? o.shakedWaterModeSelected2 : o.waterModeSelected2,
          normal: f() ? o.shakedWaterModeNormal2 : o.waterModeNormal2,
          homesmall: f() ? o.shakedWaterModeSmall2 : o.waterModeSmall2,
          homenormal: o.waterMode2,
          strength: 202,
        },
        {
          name: f() ? module505.tanos_s_mop_mode_strong : module505.water_box_big,
          selected: f() ? o.shakedWaterModeSelected3 : o.waterModeSelected3,
          normal: f() ? o.shakedWaterModeNormal3 : o.waterModeNormal3,
          homesmall: f() ? o.shakedWaterModeSmall3 : o.waterModeSmall3,
          homenormal: o.waterMode3,
          strength: 203,
        },
      ];
    if (module423.DMM.isGarnet) t.shift();
    var s = {
      name: module505.localization_strings_Setting_Timer_Common_4,
      selected: o.customWaterModeSelected,
      normal: o.customWaterModeNormal,
      homesmall: o.customWaterModeSmall,
      homenormal: o.customWaterModeNormal,
      strength: 207,
    };
    if (module390.default.isCustomWaterBoxDistanceSupported()) t.push(s);
    return t;
  };

exports.MopWaterOrStrengths = C;

var v = function (o) {
  if (module423.DMM.isGarnet || (!module390.default.isElectronicWaterBoxSupported() && !module390.default.isShakeMopStrengthSupported())) return '';
  if (o == _) return module505.localization_strings_Common_custom_mode;
  var t = C().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

exports.getMopWaterOrStrengthTitle = v;

var w = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module505.tanos_s_mop_mode_general_frag,
    selected: o.mopMethodSelected1,
    normal: o.mopMethodNormal1,
    strength: 300,
  };
};

exports.CleanRouteDaily = w;

var W = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module505.tanos_s_mop_mode_fine_frag,
    selected: o.mopMethodSelected2,
    normal: o.mopMethodNormal2,
    strength: 301,
  };
};

exports.CleanRouteSubtly = W;

var N = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module505.mop_method_careful_slow,
    selected: o.mopMethodSelected3,
    normal: o.mopMethodNormal3,
    strength: 303,
  };
};

exports.CleanRouteDeepSlow = N;

var k = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return {
    name: module505.clean_route_fast_mode_title,
    selected: o.mopMethodSelected0,
    normal: o.mopMethodNormal0,
    strength: 304,
  };
};

exports.CleanRouteFast = k;

var P = function () {
  var o = [w(), W()];
  if (module390.default.isCarefulSlowMopSupported()) o.push(N());
  if (module390.default.isCleanRouteFastModeSupported()) o = [k()].concat(module31.default(o));
  return o;
};

exports.MopMethods = P;

var y = function (o) {
  if (o == p) return module505.localization_strings_Common_custom_mode;
  var t = P().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

function R(o, t, s) {
  return module423.DMM.isGarnet ? o == u || 0 == s : module390.default.isShakeMopStrengthSupported() ? o == u || t == _ || s == p : o == u || t == _;
}

exports.getMopMethodTitle = y;

exports.getSystemCustomMopModes = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return [
    {
      id: 1,
      name: module505.custom_mop_mode_system_normal,
      desc: module505.custom_mop_mode_system_normal_desc,
      icon: o.mopModeNormal0,
      selectedIcon: o.mopModeSelected0,
      listIcon: o.mopModeListIcon0,
    },
    {
      id: 2,
      name: module505.custom_mop_mode_system_wetter_mop,
      desc: module505.custom_mop_mode_system_wetter_mop_desc,
      icon: o.mopModeNormal1,
      selectedIcon: o.mopModeSelected1,
      listIcon: o.mopModeListIcon1,
    },
    {
      id: 3,
      name: module505.custom_mop_mode_system_drier_mop,
      desc: module505.custom_mop_mode_system_drier_mop_desc,
      icon: o.mopModeNormal2,
      selectedIcon: o.mopModeSelected2,
      listIcon: o.mopModeListIcon2,
    },
  ];
};
