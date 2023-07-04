require('./387');

var module377 = require('./377'),
  module415 = require('./415'),
  module386 = require('./386'),
  module389 = require('./389'),
  module491 = require('./491').strings,
  module934 = require('./934'),
  _ = function () {
    return module491.getResourceLanguageCode();
  },
  c = module491.getInterfaceLanguage(),
  M = null,
  h = module415.DMM.bucket,
  module1377 = require('./1377').HtmlMap,
  module1607 = require('./1607').HtmlMap;

function T() {
  return module377.RobotStatusManager.sharedManager().serverCode;
}

function S() {
  return module934.areaServerMap[T()].host;
}

function b() {
  var t = module377.RobotStatusManager.sharedManager().countryCode;
  if ('il' === t) t = 'he';
  return t;
}

function G() {
  return module386.default.hasTranslateGuidePage(_()) ? _() : 'en';
}

M = module389.isMiApp
  ? module415.DMM.isTanosS || module415.DMM.isTanosSL || module415.DMM.isTanosSC || module415.DMM.isTanosSE
    ? module1377.TanosS
    : module415.DMM.isTanosSPlus
    ? module1377.TanosSPlus
    : module415.DMM.isTanosE
    ? module1377.TanosE
    : module415.DMM.isRubysLite
    ? module1377.RubysLite
    : module415.DMM.isTopazS
    ? module1377.TopazS
    : module415.DMM.isTanos || module415.DMM.isRubyPlus || module415.DMM.isRubySC || module415.DMM.isRubysE
    ? module1377.Tanos
    : module1377.Default
  : module415.DMM.isTanosS || module415.DMM.isTanosSL || module415.DMM.isTanosSC || module415.DMM.isTanosSE
  ? module1607.TanosS
  : module415.DMM.isTanosSPlus
  ? module1607.TanosSPlus
  : module415.DMM.isTanosV
  ? module1607.TanosV
  : module415.DMM.isRubysLite
  ? module1607.RubysLite
  : module415.DMM.isTopazS
  ? module1607.TopazS
  : module415.DMM.isTanos || module415.DMM.isRubyPlus || module415.DMM.isRubySC || module415.DMM.isRubysE
  ? module1607.Tanos
  : module1607.Default;
console.log('lang - ' + _() + ' - robotBucket - ' + h);
var U = (HtmlResManager = {
  MapSaveGuide: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/mapsave/rockrobo_map_save_guide.html';
  },
  UserAgreement: function () {
    if (module389.isMiApp) {
      var t = b(),
        n = 'de' == T() && module389.isMiApp,
        o = 'en' == c && 'en' == _() ? 'en' : 'other',
        u = M['agreement_en' + (n ? '_de' : '')];
      return M['agreement_' + t + '_' + o + (n ? '_de' : '')] || u;
    }

    var p = b(),
      l = 'en' == c && 'en' == _() ? _() : p,
      h = M.agreement_en;
    return M['agreement_' + l + ('de' == T() && module389.isMiApp ? '_de' : '')] || h;
  },
  UserPrivacyProtocol: function () {
    if (module389.isMiApp) {
      var t = b(),
        n = 'de' == T() && module389.isMiApp,
        o = 'en' == c && 'en' == _() ? 'en' : 'other',
        u = M['privacy_en' + (n ? '_de' : '')];
      return M['privacy_' + t + '_' + o + (n ? '_de' : '')] || u;
    }

    var p = b(),
      l = 'en' == c && 'en' == _() ? _() : p,
      h = M.privacy_en;
    return M['privacy_' + l + ('de' == T() && module389.isMiApp ? '_de' : '')] || h;
  },
  WiFiPrivacy: function () {
    var t = module1607.Tanos;
    if (module389.isMiApp) t = module1377.Tanos;
    var n = b(),
      o = 'en' == c && 'en' == _() ? _() : n,
      u = t.wifi_privacy_en;
    return t['wifi_privacy_' + o] || u;
  },
  MonitorPrivacy: function () {
    var t = b(),
      n = 'en' == c && 'en' == _() ? _() : t,
      o = M.monitor_privacy_en;
    return M['monitor_privacy_' + n + ('de' == T() && module389.isMiApp ? '_de' : '')] || o;
  },
  PhotoPrivacy: function () {
    var t = b(),
      n = 'en' == c && 'en' == _() ? _() : t,
      o = M.photo_privacy_en;
    return M['photo_privacy_' + n] || o;
  },
  MainVideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/combine.mp4';
  },
  QuickStartVideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/1_quickstart.mp4';
  },
  MachineWorksVideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/2_clean.mp4';
  },
  UseMoppingModuleVideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/2_2.mp4';
  },
  CleanWashableFilterVideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/3_dustbin.mp4';
  },
  RoutineMaintenanceVideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/5_maintain.mp4';
  },
  ScheduleCleanVideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/6_schduele.mp4';
  },
  Guide5VideoUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/video/6_schduele.mp4';
  },
  MainVideoPosterUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/poster/quickstart.jpg';
  },
  UseMoppingModulePosterUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/poster/mop.jpg';
  },
  CleanWashableFilterPosterUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/poster/bin_pic.jpg';
  },
  MachineWorksPosterUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/poster/maintain.jpg';
  },
  RoutineMaintenancePosterUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/poster/maintain.jpg';
  },
  Guide5PosterUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/poster/maintain.jpg';
  },
  IntroduceRobotGuideUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide1.html';
  },
  QuickStartGuideUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide2.html';
  },
  UseMoppingModuleGuideUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide2_2.html';
  },
  MachineWorksGuideUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide3.html';
  },
  CleanWashableFilterGuideUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide4.html';
  },
  Guide5Url: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide5.html';
  },
  RoutineMaintenanceGuideUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide6.html';
  },
  TroubleshootingGuideUrl: function () {
    return 'https://' + S() + '/' + h + '/app/' + G() + '/html/guide/rockrobo_guide7.html';
  },
  GuideTitle1: function () {
    return module386.default.isUseOldTitleInGuide() ? module491.localization_strings_Setting_Guide_index_0 : module491.tanosv_title_guide_1;
  },
  GuideTitle2: function () {
    return module386.default.isUseOldTitleInGuide() ? module491.localization_strings_Setting_Guide_index_1 : module491.tanosv_title_guide_2;
  },
  GuideTitle2_2: function () {
    return module491.localization_strings_Main_IntroducePage_1;
  },
  GuideTitle3: function () {
    return module386.default.isUseOldTitleInGuide() ? module491.localization_strings_Setting_Guide_index_2 : module491.map_edit_map_lab_save_map_kindly_remind;
  },
  GuideTitle4: function () {
    return module386.default.isUseOldTitleInGuide() ? module491.localization_strings_Setting_Guide_index_3 : module491.tanosv_title_guide_4;
  },
  GuideTitle5: function () {
    return module386.default.isUseOldTitleInGuide() ? module491.localization_strings_Setting_Guide_index_0 : module491.tanosv_title_guide_5;
  },
  GuideTitle6: function () {
    return module386.default.isUseOldTitleInGuide() ? module491.localization_strings_Setting_Guide_index_5 : module491.tanosv_title_guide_6;
  },
  GuideTitle7: function () {
    return module491.localization_strings_Setting_Guide_index_6;
  },
});
exports.default = U;
