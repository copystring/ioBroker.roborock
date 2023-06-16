exports.interpolator = function (t) {
  var u = t.layout,
    l = t.position,
    f = t.scene;
  if (!u.isMeasured)
    return function (t) {
      var u = t.navigation,
        l = t.scene,
        f = u.state.index === l.index,
        n = f ? 1 : 0,
        o = f ? 0 : 1e6;
      return {
        opacity: n,
        transform: [
          {
            translateX: o,
          },
          {
            translateY: o,
          },
        ],
      };
    };

  var n = function (t) {
    var u = t.scene,
      l = t.scenes,
      f = u.index,
      n = l.length - 1,
      o = !l[n].isActive;

    if (o) {
      var s = l.findIndex(function (t) {
          return t === u;
        }),
        P = l.findIndex(function (t) {
          return t.isActive;
        }),
        c = l[P].index,
        p = l[n].index;
      return f !== c && s === n
        ? {
            first: c ** (f - 1),
            last: f + 1,
          }
        : f === c && s === P
        ? {
            first: f - 1,
            last: p ** (f + 1),
          }
        : f === c || s > P
        ? null
        : {
            first: f - 1,
            last: f + 1,
          };
    }

    return {
      first: f - 1,
      last: f + 1,
    };
  };

  if (!n || !n(t))
    return {
      opacity: 0,
    };
  var o = n(t),
    s = o.first,
    P = o.last,
    c = f.index,
    p = l.interpolate({
      inputRange: [s, s + 0.01, c, P - 0.01, P],
      outputRange: [0, 1, 1, 0.85, 0],
    }),
    M = u.initWidth,
    S = l.interpolate({
      inputRange: [s, c, P],
      outputRange: globals.isRTL ? [-M, 0, 0.3 * M] : [M, 0, -0.3 * M],
    });
  return {
    opacity: p,
    transform: [
      {
        translateX: S,
      },
      {
        translateY: 0,
      },
    ],
  };
};

var module49 = require('./49'),
  module12 = require('./12'),
  module1368 = require('./1368'),
  module409 = require('./409'),
  module1814 = require('./1814'),
  module1850 = require('./1850'),
  module1853 = require('./1853'),
  module1857 = require('./1857'),
  module1860 = require('./1860'),
  module1870 = require('./1870'),
  module1880 = require('./1880'),
  module1885 = require('./1885'),
  module1888 = require('./1888'),
  module1895 = require('./1895'),
  module1899 = require('./1899'),
  module1896 = require('./1896'),
  module1905 = require('./1905'),
  module1906 = require('./1906'),
  module1914 = require('./1914'),
  module1915 = require('./1915'),
  module1917 = require('./1917'),
  module1918 = require('./1918'),
  module1920 = require('./1920'),
  module1921 = require('./1921'),
  module1923 = require('./1923'),
  module1924 = require('./1924'),
  module1931 = require('./1931'),
  module1932 = require('./1932'),
  module1936 = require('./1936'),
  module1937 = require('./1937'),
  module1948 = require('./1948'),
  module1953 = require('./1953'),
  module1963 = require('./1963'),
  module1964 = require('./1964'),
  module1966 = require('./1966'),
  module1967 = require('./1967'),
  module1969 = require('./1969'),
  module1970 = require('./1970'),
  module1975 = require('./1975'),
  module1976 = require('./1976'),
  module1955 = require('./1955'),
  module1978 = require('./1978'),
  module1980 = require('./1980'),
  module1981 = require('./1981'),
  module1982 = require('./1982'),
  module1983 = require('./1983'),
  module1985 = require('./1985'),
  module1986 = require('./1986'),
  module1987 = require('./1987'),
  module1988 = require('./1988'),
  module1992 = require('./1992'),
  module1993 = require('./1993'),
  module1995 = require('./1995'),
  module2002 = require('./2002'),
  module2003 = require('./2003'),
  module2004 = require('./2004'),
  module2005 = require('./2005'),
  module2007 = require('./2007'),
  module2008 = require('./2008'),
  module2011 = require('./2011'),
  module1356 = require('./1356'),
  module2012 = require('./2012');

function Me(t, u) {
  var l = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(t);
    if (u)
      f = f.filter(function (u) {
        return Object.getOwnPropertyDescriptor(t, u).enumerable;
      });
    l.push.apply(l, f);
  }

  return l;
}

function Se(t) {
  for (var l = 1; l < arguments.length; l++) {
    var f = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      Me(Object(f), true).forEach(function (l) {
        module49.default(t, l, f[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      Me(Object(f)).forEach(function (u) {
        Object.defineProperty(t, u, Object.getOwnPropertyDescriptor(f, u));
      });
  }

  return t;
}

var module389 = require('./389'),
  module2013 = module389.isMiApp ? module12.View : require('./2013').default,
  Oe = {
    MainPage: module1987.default(module1368.default),
    ErrorDetailPageNew: module1987.default(module1814.default),
    BuyCompassPage: module1987.default(module1850.default),
    Setting: module1987.default(module1853.default),
    TimerPage: module1987.default(module1857.default),
    TimerSettingPage: module1987.default(module1860.default),
    HistoryPage: module1987.default(module1870.default),
    CleanRecordDetailPage: module1987.default(module1880.default),
    SuppliesPage: module1987.default(module1885.default),
    SupplyDetailPage: module1987.default(module1888.default),
    GuidePage: module1987.default(module1895.default),
    ContactUSPage: module1987.default(module1899.default),
    GuideDetailPage: module1987.default(module1896.default),
    NetInfoPage: module1987.default(module1905.default),
    SoundPackagePage: module1987.default(module1906.default),
    SyncTimezonePage: module1987.default(module1914.default),
    RobotSettingPage: module1987.default(module1915.default),
    MapEditForbiddenZonePage: module1987.default(module1980.default),
    MapEditZoneOrderPage: module1987.default(module1981.default),
    MapEditZoneModePage: module1987.default(module1982.default),
    MapEditZoneInfoPage: module1987.default(module1983.default),
    MapEditRotateView: module1987.default(module1985.default),
    MapEditFurnitureView: module1987.default(module1986.default),
    WebViewPage: module1987.default(module1917.default),
    MapViewGotoPage: module1987.default(module1918.default),
    ObaInfoPage: module1987.default(module1920.default),
    UITestPage: module1987.default(module1921.default),
    MultiFloorPage: module1987.default(module1932.default),
    MonitorPage: module1987.default(module2013, true),
    MonitorErrorPage: module1987.default(module1936.default, false),
    RemoteControlPageNew: module1987.default(module1937.default),
    CameraSettingPage: module1987.default(module1923.default),
    CameraSettingDetail: module1987.default(module1924.default),
    GesturePasswordPage: module1987.default(module1948.default),
    SecuritySettingPage: module1987.default(module1931.default),
    MapObjectPhotoPage: module1987.default(module1953.default),
    LogListPage: module1987.default(module409.LogListPage),
    LogDetailPage: module1987.default(module409.LogDetailPage),
    VideoCallSettingPage: module1987.default(module1963.default),
    CarpetCleanModeSetting: module1987.default(module1964.default),
    MapCarpetIgnorePage: module1987.default(module1966.default),
    MapCarpetInfoPage: module1987.default(module1967.default),
    StructureLightSetting: module1987.default(module1969.default),
    MultiFloorSwitch: module1987.default(module1970.default),
    DebugViewPage: module1987.default(module1975.default),
    FeedbackViewPage: module1987.default(module1976.default),
    ObstacleTypeSelection: module1987.default(module1955.default),
    PictureProcessingResultPage: module1987.default(module1978.default),
    DebugPage: module1987.default(module1988.default),
    OtaDebugViewPage: module1987.default(module1992.default),
    WiFiDebugPage: module1987.default(module1993.default),
    SettingLayerBorad: module1987.default(module1995.default),
    DustCollectionModeSetting: module1987.default(module2002.default),
    SmartScenePage: module1987.default(module2003.default),
    WashTowelSetting: module1987.default(module2004.default),
    WashTowelSettingNew: module1987.default(module2005.default),
    DustCollectionSettingPageNew: module1987.default(module2007.default),
    DraggableListDemo: module1987.default(module2008.default),
    SettingAirDryPage: module1987.default(module2011.default),
    MopModeCustomPage: module1987.default(module1356.default),
    MopModeListPage: module1987.default(module2012.default),
  };

exports.routes = Oe;
if (module389.isMiApp)
  exports.routes = Oe = Se(
    Se({}, Oe),
    {},
    {
      MoreSetting: module389.MoreSetting,
    }
  );
