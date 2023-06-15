exports.isModeCustomized = function (o, l, _) {
  if (module415.DMM.isGarnet) return o == s || 0 == _;
  return module386.default.isShakeMopStrengthSupported() ? o == s || l == c || _ == M : o == s || l == c;
};

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

require('./389');

var module386 = require('./386'),
  module415 = require('./415'),
  module491 = require('./491').strings,
  s = 106;

exports.CustomCleanMode = s;
var c = 204;
exports.CustomWaterMode = c;
var M = 302;
exports.CustomMopMode = M;

var _ = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return [
    {
      name: module491.localization_strings_Common_Protocol_4,
      selected: o.cleanModeSelected0,
      normal: o.cleanModeNormal0,
      homesmall: o.cleanModeSmall0,
      homenormal: o.cleanMode0,
      strength: 105,
    },
    {
      name: module491.localization_strings_Common_Protocol_0,
      selected: o.cleanModeSelected1,
      normal: o.cleanModeNormal1,
      homesmall: o.cleanModeSmall1,
      homenormal: o.cleanMode1,
      strength: 101,
    },
    {
      name: module491.localization_strings_Common_Protocol_1,
      selected: o.cleanModeSelected2,
      normal: o.cleanModeNormal2,
      homesmall: o.cleanModeSmall2,
      homenormal: o.cleanMode2,
      strength: 102,
    },
    {
      name: module491.localization_strings_Common_Protocol_2,
      selected: o.cleanModeSelected3,
      normal: o.cleanModeNormal3,
      homesmall: o.cleanModeSmall3,
      homenormal: o.cleanMode3,
      strength: 103,
    },
    {
      name: module491.localization_strings_Common_Protocol_3,
      selected: o.cleanModeSelected4,
      normal: o.cleanModeNormal4,
      homesmall: o.cleanModeSmall4,
      homenormal: o.cleanMode4,
      strength: 104,
    },
  ];
};

exports.CleanModes = _;

exports.getCleanModeTitle = function (o) {
  if (o == s) return module491.localization_strings_Setting_Timer_Common_4;

  var t = _().find(function (t) {
    return t.strength == o;
  });

  return (null == t ? undefined : t.name) || '';
};

var u = function () {
    return module386.default.isShakeMopStrengthSupported();
  },
  h = function () {
    var o = globals.app.state.theme.ModeSettingPanel,
      s = [
        {
          name: module491.debug_info_close,
          selected: u() ? o.shakedWaterModeSelected0 : o.waterModeSelected0,
          normal: u() ? o.shakedWaterModeNormal0 : o.waterModeNormal0,
          strength: 200,
        },
        {
          name: u() ? module491.tanos_s_mop_mode_weak : module491.water_box_small,
          selected: u() ? o.shakedWaterModeSelected1 : o.waterModeSelected1,
          normal: u() ? o.shakedWaterModeNormal1 : o.waterModeNormal1,
          homesmall: u() ? o.shakedWaterModeSmall1 : o.waterModeSmall1,
          homenormal: o.waterMode1,
          strength: 201,
        },
        {
          name: u() ? module491.tanos_s_mop_mode_middle : module491.water_box_middle,
          selected: u() ? o.shakedWaterModeSelected2 : o.waterModeSelected2,
          normal: u() ? o.shakedWaterModeNormal2 : o.waterModeNormal2,
          homesmall: u() ? o.shakedWaterModeSmall2 : o.waterModeSmall2,
          homenormal: o.waterMode2,
          strength: 202,
        },
        {
          name: u() ? module491.tanos_s_mop_mode_strong : module491.water_box_big,
          selected: u() ? o.shakedWaterModeSelected3 : o.waterModeSelected3,
          normal: u() ? o.shakedWaterModeNormal3 : o.waterModeNormal3,
          homesmall: u() ? o.shakedWaterModeSmall3 : o.waterModeSmall3,
          homenormal: o.waterMode3,
          strength: 203,
        },
      ];
    if (module415.DMM.isGarnet) s.shift();
    var c = {
      name: module491.localization_strings_Setting_Timer_Common_4,
      selected: o.customWaterModeSelected,
      normal: o.customWaterModeNormal,
      homesmall: o.customWaterModeSmall,
      homenormal: o.customWaterModeNormal,
      strength: 207,
    };
    if (module386.default.isCustomWaterBoxDistanceSupported()) s.push(c);
    return s;
  };

exports.MopWaterOrStrengths = h;

exports.getMopWaterOrStrengthTitle = function (o) {
  if (module415.DMM.isGarnet) return '';
  if (o == c) return module491.localization_strings_Common_custom_mode;
  var t = h().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

var p = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return [
    {
      name: module491.tanos_s_mop_mode_general_frag,
      selected: o.mopMethodSelected1,
      normal: o.mopMethodNormal1,
      strength: 300,
    },
    {
      name: module491.tanos_s_mop_mode_fine_frag,
      selected: o.mopMethodSelected2,
      normal: o.mopMethodNormal2,
      strength: 301,
    },
  ];
};

exports.MopMethods = p;

exports.getMopMethodTitle = function (o) {
  if (o == M) return module491.localization_strings_Common_custom_mode;
  var t = p().find(function (t) {
    return t.strength == o;
  });
  return (null == t ? undefined : t.name) || '';
};

exports.getSystemCustomMopModes = function () {
  var o = globals.app.state.theme.ModeSettingPanel;
  return [
    {
      id: 1,
      name: module491.custom_mop_mode_system_normal,
      desc: module491.custom_mop_mode_system_normal_desc,
      icon: o.mopModeNormal0,
      selectedIcon: o.mopModeSelected0,
      listIcon: o.mopModeListIcon0,
    },
    {
      id: 2,
      name: module491.custom_mop_mode_system_wetter_mop,
      desc: module491.custom_mop_mode_system_wetter_mop_desc,
      icon: o.mopModeNormal1,
      selectedIcon: o.mopModeSelected1,
      listIcon: o.mopModeListIcon1,
    },
    {
      id: 3,
      name: module491.custom_mop_mode_system_drier_mop,
      desc: module491.custom_mop_mode_system_drier_mop_desc,
      icon: o.mopModeNormal2,
      selectedIcon: o.mopModeSelected2,
      listIcon: o.mopModeListIcon2,
    },
  ];
};
