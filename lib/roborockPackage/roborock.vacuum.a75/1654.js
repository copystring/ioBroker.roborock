var module381 = require('./381'),
  module424 = require('./424'),
  module390 = require('./390'),
  module510 = require('./510').strings,
  module1343 = require('./1343'),
  p = function () {
    return module510.getResourceLanguageCode();
  },
  _ = module510.getInterfaceLanguage(),
  c = null,
  h = module424.DMM.bucket,
  module1655 = require('./1655').HtmlMap;

function M() {
  return module1343.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
}

function v() {
  return module390.default.hasTranslateGuidePage(p()) ? p() : 'en';
}

c =
  module424.DMM.isTanosS || module424.DMM.isTanosSL || module424.DMM.isTanosSC || module424.DMM.isTanosSE
    ? module1655.TanosS
    : module424.DMM.isTanosSPlus || module424.DMM.isTanosSMax
    ? module1655.TanosSPlus
    : module424.DMM.isTanosV
    ? module1655.TanosV
    : module424.DMM.isRubysLite
    ? module1655.RubysLite
    : module424.DMM.isTopazS
    ? module1655.TopazS
    : module424.DMM.isTopazSV
    ? module1655.TopazSV
    : module424.DMM.isTanos || module424.DMM.isRubyPlus || module424.DMM.isRubySC || module424.DMM.isRubysE
    ? module1655.Tanos
    : module1655.Default;
console.log('lang - ' + p() + ' - robotBucket - ' + h);
var T = (HtmlResManager = {
  MapSaveGuide: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/mapsave/rockrobo_map_save_guide.html';
  },
  UserAgreement: function () {
    var t = p() || _,
      n = c.agreement_en;

    return c['agreement_' + t] || n;
  },
  UserPrivacyProtocol: function () {
    var t = p() || _,
      n = c.privacy_en;

    return c['privacy_' + t] || n;
  },
  WiFiPrivacy: function () {
    var t = module1655.Tanos,
      n = p() ? p() : _,
      o = t.wifi_privacy_en;
    return t['wifi_privacy_' + n] || o;
  },
  MonitorPrivacy: function () {
    var t = p() ? p() : _,
      n = c.monitor_privacy_en;
    return c['monitor_privacy_' + t] || n;
  },
  PhotoPrivacy: function () {
    var t = p() ? p() : _,
      n = c.photo_privacy_en;
    return c['photo_privacy_' + t] || n;
  },
  ARMapPrivacy: function () {
    var t = module1655.TopazSV,
      n = p() ? p() : _,
      o = t.armap_privacy_en;
    return t['armap_privacy_' + n] || o;
  },
  MainVideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/combine.mp4';
  },
  QuickStartVideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/1_quickstart.mp4';
  },
  MachineWorksVideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/2_clean.mp4';
  },
  UseMoppingModuleVideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/2_2.mp4';
  },
  CleanWashableFilterVideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/3_dustbin.mp4';
  },
  RoutineMaintenanceVideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/5_maintain.mp4';
  },
  ScheduleCleanVideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/6_schduele.mp4';
  },
  Guide5VideoUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/video/6_schduele.mp4';
  },
  MainVideoPosterUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/poster/quickstart.jpg';
  },
  UseMoppingModulePosterUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/poster/mop.jpg';
  },
  CleanWashableFilterPosterUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/poster/bin_pic.jpg';
  },
  MachineWorksPosterUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/poster/maintain.jpg';
  },
  RoutineMaintenancePosterUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/poster/maintain.jpg';
  },
  Guide5PosterUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/poster/maintain.jpg';
  },
  IntroduceRobotGuideUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide1.html';
  },
  QuickStartGuideUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide2.html';
  },
  UseMoppingModuleGuideUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide2_2.html';
  },
  MachineWorksGuideUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide3.html';
  },
  CleanWashableFilterGuideUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide4.html';
  },
  Guide5Url: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide5.html';
  },
  RoutineMaintenanceGuideUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide6.html';
  },
  TroubleshootingGuideUrl: function () {
    return 'https://' + M() + '/' + h + '/app/' + v() + '/html/guide/rockrobo_guide7.html';
  },
  GuideTitle1: function () {
    return module390.default.isUseOldTitleInGuide() ? module510.localization_strings_Setting_Guide_index_0 : module510.tanosv_title_guide_1;
  },
  GuideTitle2: function () {
    return module390.default.isUseOldTitleInGuide() ? module510.localization_strings_Setting_Guide_index_1 : module510.tanosv_title_guide_2;
  },
  GuideTitle2_2: function () {
    return module510.localization_strings_Main_IntroducePage_1;
  },
  GuideTitle3: function () {
    return module390.default.isUseOldTitleInGuide() ? module510.localization_strings_Setting_Guide_index_2 : module510.map_edit_map_lab_save_map_kindly_remind;
  },
  GuideTitle4: function () {
    return module390.default.isUseOldTitleInGuide() ? module510.localization_strings_Setting_Guide_index_3 : module510.tanosv_title_guide_4;
  },
  GuideTitle5: function () {
    return module390.default.isUseOldTitleInGuide() ? module510.localization_strings_Setting_Guide_index_0 : module510.tanosv_title_guide_5;
  },
  GuideTitle6: function () {
    return module390.default.isUseOldTitleInGuide() ? module510.localization_strings_Setting_Guide_index_5 : module510.tanosv_title_guide_6;
  },
  GuideTitle7: function () {
    return module510.localization_strings_Setting_Guide_index_6;
  },
});
exports.default = T;
