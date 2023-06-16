exports.PluginDidEnter = function () {
  module388.default.getInstance().enterPlugin();
};

exports.PluginDidExit = function () {
  module388.default.getInstance().exitPlugin();
};

exports.PluginDidReadyForStatisticsTask = function () {
  module388.default.getInstance().sendStatToVacuum();
};

exports.LogEventStat = function (t) {
  console.log('Stat::recieve event: ' + t);
  if (t != module388.default.ID_INVALID) t ? module388.default.getInstance().type0(t) : console.log("Warning: event shouldn't be null or undefined.");
};

exports.LogEventStatus = function (t) {
  var n,
    l = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
    I = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null != (n = globals.currentPageName) ? n : '';
  module393.logEventStatus(
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
  module393.logEventCommon(
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
  module393.logEventRecordView(t, n, l, I);
};

var module50 = require('./50'),
  module388 = require('./388');

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
        module50.default(t, l, u[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      I(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var module393 = require('./393'),
  D = {
    TapSettingButton: module388.default.ID_SETTINGCLICKED,
    TapFindMe: module388.default.ID_FINDME,
    CleanRecordListPage: module388.default.ID_CLEANRECORDLIST,
    CleanRecordDetailPage: module388.default.ID_CLEANRECORDDETAIL,
    SuppliesListPage: module388.default.ID_MAINTENANCEINDEX,
    TapShareButton: module388.default.ID_SHARETOUNKNOWN,
    MapOnReady: module388.default.ID_MAPSHOWN,
    NotifacationsOn: module388.default.ID_NOTIFICATIONON,
    NotifacationsOff: module388.default.ID_NOTIFICATIONOFF,
    StrainerDetail: module388.default.ID_MAINTENANCEFILTER,
    SideBrushDetail: module388.default.ID_MAINTENANCESIDEBURSH,
    MainBrushDetail: module388.default.ID_MAINTENANCEMAINBRUSH,
    SensorDetail: module388.default.ID_MAINTENANCESENSOR,
    WaterBoxFilterDetail: module388.default.ID_MAINTENANCEWATERBOX,
    GuideList: module388.default.ID_USERGUIDELIST,
    GuideProductInfo: module388.default.ID_USERGUIDEPRODUCTINFO,
    GuideKnowYourRobot: module388.default.ID_USERGUIDEKNOWYOURROBOT,
    GuideHowToUseMop: module388.default.ID_USERGUIDEHOWTOUSEMOP,
    GuideQuickStart: module388.default.ID_USERGUIDEQUICKSTART,
    GuideHowToWork: module388.default.ID_USERGUIDEHOWTOWORK,
    GuideCleanRubbishBoxAndStrainer: module388.default.ID_USERGUIDECLEANDUSTBINFILTER,
    GuideWhatIsVirtualWall: module388.default.ID_USERGUIDEWHATISVIRTUALWALL,
    GuideDailyMaintain: module388.default.ID_USERGUIDEDAILYMAINTENANCE,
    GuideMalfunctionRemoval: module388.default.ID_USERGUIDEDEALMALFUNCTION,
    GuideContactService: module388.default.ID_USERGUIDECONTACTSERVICE,
    MultiMapCreateNewMap: module388.default.ID_MULTIFLOORCREATENEWMAP,
    MultiMapMainChangeMap: module388.default.ID_MULTIFLOORCHANGEMAP,
    MultiMapMapManagerMap: module388.default.ID_MULTIFLOORMAPMANAGERCHANGEMAP,
    RealTimeOn: module388.default.ID_REALVIDEO_ON,
    RealTimeOff: module388.default.ID_REALVIDEO_OFF,
    RealTimeDefinitionLD: module388.default.ID_REALVIDEO_DEFINITION_LD,
    RealTimeDefinitionHD: module388.default.ID_REALVIDEO_DEFINITION_HD,
    RealTimeUpdatePassword: module388.default.ID_REALVIDEO_UPDATEPASSWORD,
    RealTimeForgetPassword: module388.default.ID_REALVIDEO_FORGETPASSWORD,
    RealTimeCleanButton: module388.default.ID_REALVIDEO_CLEAN_BUTTON,
    RealTimeRechargeButton: module388.default.ID_REALVIDEO_RECHARD_BUTTON,
    RealTimeCallingError: module388.default.ID_REALVIDEO_CALLING_ERROR,
    RealTimeCallTimeout: module388.default.ID_REALVIDEO_CALLING_TIMEOUT,
    RealTimeFrameStuck: module388.default.ID_REALVIDEO_FRAME_STUCK,
    StrainerHoareDetail: module388.default.ID_STRAINERHOARE,
    MopRollerDetail: module388.default.ID_MOPROLLER,
  };

exports.LogEventMap = D;
Object.freeze(D);
