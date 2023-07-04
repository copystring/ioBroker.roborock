exports.isModeCustomized = W;

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
  module422 = require('./422'),
  module1327 = require('./1327'),
  module1328 = require('./1328'),
  module500 = require('./500').strings,
  c = 106;

exports.CustomCleanMode = c;
var _ = 204;
exports.CustomWaterMode = _;
var u = 302;
exports.CustomMopMode = u;
exports.CleanModeZero = 105;
exports.WaterModeZero = 200;

var p = function () {
  var o = globals.app.state.theme.ModeSettingPanel,
    l = [
      {
        name: module500.localization_strings_Common_Protocol_4,
        selected: o.cleanModeSelected0,
        normal: o.cleanModeNormal0,
        homesmall: o.cleanModeSmall0,
        homenormal: o.cleanMode0,
        strength: 105,
      },
      {
        name: module500.localization_strings_Common_Protocol_0,
        selected: o.cleanModeSelected1,
        normal: o.cleanModeNormal1,
        homesmall: o.cleanModeSmall1,
        homenormal: o.cleanMode1,
        strength: 101,
      },
      {
        name: module500.localization_strings_Common_Protocol_1,
        selected: o.cleanModeSelected2,
        normal: o.cleanModeNormal2,
        homesmall: o.cleanModeSmall2,
        homenormal: o.cleanMode2,
        strength: 102,
      },
      {
        name: module500.localization_strings_Common_Protocol_2,
        selected: o.cleanModeSelected3,
        normal: o.cleanModeNormal3,
        homesmall: o.cleanModeSmall3,
        homenormal: o.cleanMode3,
        strength: 103,
      },
      {
        name: module500.localization_strings_Common_Protocol_3,
        selected: o.cleanModeSelected4,
        normal: o.cleanModeNormal4,
        homesmall: o.cleanModeSmall4,
        homenormal: o.cleanMode4,
        strength: 104,
      },
    ];
  if (module390.default.isMaxPlusModeSupported())
    l.push({
      name: module500.clean_mode_max_plus,
      selected: o.cleanModeSelected5,
      normal: o.cleanModeNormal5,
      homesmall: o.cleanModeSmall5,
      homenormal: o.cleanMode5,
      strength: 108,
    });
  return l;
};

exports.CleanModes = p;

var h = function (o) {
  if (o == c) return module500.localization_strings_Setting_Timer_Common_4;
  var t = p().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

exports.getCleanModeTitle = h;

exports.getCleanModeDetailText = function (o) {
  var c = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null,
    _ = module422.DMM.isGarnet;
  if (W(o.cleanMode, o.waterMode, o.mopMode)) return module500.map_edit_bottom_menu_mode;
  var u = h(o.cleanMode),
    p = C(o.waterMode),
    S = u + (p ? ' | ' + p : '');
  if (module390.default.isPureCleanMopSupported() && 105 == o.cleanMode) return p + ' | ' + w(o.mopMode);

  if (module390.default.isShakeMopSetSupported() && 200 != o.waterMode) {
    var f,
      v = _ ? (null == (f = module1328.ModeDataInstance.modePannelCustomMops[0]) ? undefined : f.name) : w(o.mopMode);
    if (301 == o.mopMode) return p + ' | ' + v;

    if (_) {
      if (c == module1327.CleanMethodClean) return S;
      if (c == module1327.CleanMethodMop) return v;
      if (c == module1327.CleanMethodCleanAndMop) return S + ' | ' + v;
    }
  }

  return S;
};

var S = function () {
    return module390.default.isShakeMopStrengthSupported();
  },
  f = function () {
    var o = globals.app.state.theme.ModeSettingPanel,
      n = [
        {
          name: module500.debug_info_close,
          selected: S() ? o.shakedWaterModeSelected0 : o.waterModeSelected0,
          normal: S() ? o.shakedWaterModeNormal0 : o.waterModeNormal0,
          strength: 200,
        },
        {
          name: S() ? module500.tanos_s_mop_mode_weak : module500.water_box_small,
          selected: S() ? o.shakedWaterModeSelected1 : o.waterModeSelected1,
          normal: S() ? o.shakedWaterModeNormal1 : o.waterModeNormal1,
          homesmall: S() ? o.shakedWaterModeSmall1 : o.waterModeSmall1,
          homenormal: o.waterMode1,
          strength: 201,
        },
        {
          name: S() ? module500.tanos_s_mop_mode_middle : module500.water_box_middle,
          selected: S() ? o.shakedWaterModeSelected2 : o.waterModeSelected2,
          normal: S() ? o.shakedWaterModeNormal2 : o.waterModeNormal2,
          homesmall: S() ? o.shakedWaterModeSmall2 : o.waterModeSmall2,
          homenormal: o.waterMode2,
          strength: 202,
        },
        {
          name: S() ? module500.tanos_s_mop_mode_strong : module500.water_box_big,
          selected: S() ? o.shakedWaterModeSelected3 : o.waterModeSelected3,
          normal: S() ? o.shakedWaterModeNormal3 : o.waterModeNormal3,
          homesmall: S() ? o.shakedWaterModeSmall3 : o.waterModeSmall3,
          homenormal: o.waterMode3,
          strength: 203,
        },
      ];
    if (module422.DMM.isGarnet) n.shift();
    var s = {
      name: module500.localization_strings_Setting_Timer_Common_4,
      selected: o.customWaterModeSelected,
      normal: o.customWaterModeNormal,
      homesmall: o.customWaterModeSmall,
      homenormal: o.customWaterModeNormal,
      strength: 207,
    };
    if (module390.default.isCustomWaterBoxDistanceSupported()) n.push(s);
    return n;
  };

exports.MopWaterOrStrengths = f;

var C = function (o) {
  if (module422.DMM.isGarnet || (!module390.default.isElectronicWaterBoxSupported() && !module390.default.isShakeMopStrengthSupported())) return '';
  if (o == _) return module500.localization_strings_Common_custom_mode;
  var n = f().find(function (t) {
    return t.strength == o;
  });
  return (null == n ? undefined : n.name) || '';
};

exports.getMopWaterOrStrengthTitle = C;

var v = function () {
  var o = globals.app.state.theme.ModeSettingPanel,
    n = [
      {
        name: module500.tanos_s_mop_mode_general_frag,
        selected: o.mopMethodSelected1,
        normal: o.mopMethodNormal1,
        strength: 300,
      },
      {
        name: module500.tanos_s_mop_mode_fine_frag,
        selected: o.mopMethodSelected2,
        normal: o.mopMethodNormal2,
        strength: 301,
      },
    ],
    s = {
      name: module500.mop_method_careful_slow,
      selected: o.mopMethodSelected3,
      normal: o.mopMethodNormal3,
      strength: 303,
    };
  if (module390.default.isCarefulSlowMopSupported() && !module422.DMM.isTopazSV_CE) n.push(s);
  return n;
};

exports.MopMethods = v;

var w = function (o) {
  if (o == u) return module500.localization_strings_Common_custom_mode;
  var t = v().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

function W(o, n, s) {
  return module422.DMM.isGarnet ? o == c || 0 == s : module390.default.isShakeMopStrengthSupported() ? o == c || n == _ || s == u : o == c || n == _;
}

exports.getMopMethodTitle = w;

exports.getSystemCustomMopModes = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return [
    {
      id: 1,
      name: module500.custom_mop_mode_system_normal,
      desc: module500.custom_mop_mode_system_normal_desc,
      icon: o.mopModeNormal0,
      selectedIcon: o.mopModeSelected0,
      listIcon: o.mopModeListIcon0,
    },
    {
      id: 2,
      name: module500.custom_mop_mode_system_wetter_mop,
      desc: module500.custom_mop_mode_system_wetter_mop_desc,
      icon: o.mopModeNormal1,
      selectedIcon: o.mopModeSelected1,
      listIcon: o.mopModeListIcon1,
    },
    {
      id: 3,
      name: module500.custom_mop_mode_system_drier_mop,
      desc: module500.custom_mop_mode_system_drier_mop_desc,
      icon: o.mopModeNormal2,
      selectedIcon: o.mopModeSelected2,
      listIcon: o.mopModeListIcon2,
    },
  ];
};
