exports.PluginDidEnter = function () {
  module384.default.getInstance().enterPlugin();
};

exports.PluginDidExit = function () {
  module384.default.getInstance().exitPlugin();
};

exports.PluginDidReadyForStatisticsTask = function () {
  module384.default.getInstance().sendStatToVacuum();
};

exports.LogEventStat = function (t) {
  console.log('Stat::recieve event: ' + t);
  if (t != module384.default.ID_INVALID) t ? module384.default.getInstance().type0(t) : console.log("Warning: event shouldn't be null or undefined.");
};

exports.LogEventStatus = function (t) {
  var n,
    l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    I = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null != (n = globals.currentPageName) ? n : '';
  module389.logEventStatus(
    t,
    u(
      {
        page: 'Plugin' + I,
      },
      l
    )
  );
};

exports.LogEventCommon = function (t) {
  var n,
    l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    I = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null != (n = globals.currentPageName) ? n : '';
  module389.logEventCommon(
    'Plugin' + I,
    u(
      {
        event: t,
      },
      l
    )
  );
};

exports.LogEventRecordView = function (t, n, l) {
  var I = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : {};
  module389.logEventRecordView(t, n, l, I);
};

var module49 = require('./49'),
  module384 = require('./384');

function I(t, n) {
  var l = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var I = Object.getOwnPropertySymbols(t);
    if (n)
      I = I.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    l.push.apply(l, I);
  }

  return l;
}

function u(t) {
  for (var l = 1; l < arguments.length; l++) {
    var u = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      I(Object(u), true).forEach(function (l) {
        module49.default(t, l, u[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      I(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var module389 = require('./389'),
  D = {
    TapSettingButton: module384.default.ID_SETTINGCLICKED,
    TapFindMe: module384.default.ID_FINDME,
    CleanRecordListPage: module384.default.ID_CLEANRECORDLIST,
    CleanRecordDetailPage: module384.default.ID_CLEANRECORDDETAIL,
    SuppliesListPage: module384.default.ID_MAINTENANCEINDEX,
    TapShareButton: module384.default.ID_SHARETOUNKNOWN,
    MapOnReady: module384.default.ID_MAPSHOWN,
    NotifacationsOn: module384.default.ID_NOTIFICATIONON,
    NotifacationsOff: module384.default.ID_NOTIFICATIONOFF,
    StrainerDetail: module384.default.ID_MAINTENANCEFILTER,
    SideBrushDetail: module384.default.ID_MAINTENANCESIDEBURSH,
    MainBrushDetail: module384.default.ID_MAINTENANCEMAINBRUSH,
    SensorDetail: module384.default.ID_MAINTENANCESENSOR,
    WaterBoxFilterDetail: module384.default.ID_MAINTENANCEWATERBOX,
    GuideList: module384.default.ID_USERGUIDELIST,
    GuideProductInfo: module384.default.ID_USERGUIDEPRODUCTINFO,
    GuideKnowYourRobot: module384.default.ID_USERGUIDEKNOWYOURROBOT,
    GuideHowToUseMop: module384.default.ID_USERGUIDEHOWTOUSEMOP,
    GuideQuickStart: module384.default.ID_USERGUIDEQUICKSTART,
    GuideHowToWork: module384.default.ID_USERGUIDEHOWTOWORK,
    GuideCleanRubbishBoxAndStrainer: module384.default.ID_USERGUIDECLEANDUSTBINFILTER,
    GuideWhatIsVirtualWall: module384.default.ID_USERGUIDEWHATISVIRTUALWALL,
    GuideDailyMaintain: module384.default.ID_USERGUIDEDAILYMAINTENANCE,
    GuideMalfunctionRemoval: module384.default.ID_USERGUIDEDEALMALFUNCTION,
    GuideContactService: module384.default.ID_USERGUIDECONTACTSERVICE,
    MultiMapCreateNewMap: module384.default.ID_MULTIFLOORCREATENEWMAP,
    MultiMapMainChangeMap: module384.default.ID_MULTIFLOORCHANGEMAP,
    MultiMapMapManagerMap: module384.default.ID_MULTIFLOORMAPMANAGERCHANGEMAP,
    RealTimeOn: module384.default.ID_REALVIDEO_ON,
    RealTimeOff: module384.default.ID_REALVIDEO_OFF,
    RealTimeDefinitionLD: module384.default.ID_REALVIDEO_DEFINITION_LD,
    RealTimeDefinitionHD: module384.default.ID_REALVIDEO_DEFINITION_HD,
    RealTimeUpdatePassword: module384.default.ID_REALVIDEO_UPDATEPASSWORD,
    RealTimeForgetPassword: module384.default.ID_REALVIDEO_FORGETPASSWORD,
    RealTimeCleanButton: module384.default.ID_REALVIDEO_CLEAN_BUTTON,
    RealTimeRechargeButton: module384.default.ID_REALVIDEO_RECHARD_BUTTON,
    RealTimeCallingError: module384.default.ID_REALVIDEO_CALLING_ERROR,
    RealTimeCallTimeout: module384.default.ID_REALVIDEO_CALLING_TIMEOUT,
    RealTimeFrameStuck: module384.default.ID_REALVIDEO_FRAME_STUCK,
    StrainerHoareDetail: module384.default.ID_STRAINERHOARE,
    MopRollerDetail: module384.default.ID_MOPROLLER,
  };

exports.LogEventMap = D;
Object.freeze(D);
