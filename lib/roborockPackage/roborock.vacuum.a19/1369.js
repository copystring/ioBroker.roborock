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
  module1370 = require('./1370'),
  module409 = require('./409'),
  module1816 = require('./1816'),
  module1852 = require('./1852'),
  module1855 = require('./1855'),
  module1859 = require('./1859'),
  module1862 = require('./1862'),
  module1872 = require('./1872'),
  module1882 = require('./1882'),
  module1887 = require('./1887'),
  module1890 = require('./1890'),
  module1897 = require('./1897'),
  module1901 = require('./1901'),
  module1898 = require('./1898'),
  module1907 = require('./1907'),
  module1908 = require('./1908'),
  module1916 = require('./1916'),
  module1917 = require('./1917'),
  module1919 = require('./1919'),
  module1920 = require('./1920'),
  module1922 = require('./1922'),
  module1923 = require('./1923'),
  module1925 = require('./1925'),
  module1926 = require('./1926'),
  module1933 = require('./1933'),
  module1934 = require('./1934'),
  module1938 = require('./1938'),
  module1939 = require('./1939'),
  module1950 = require('./1950'),
  module1955 = require('./1955'),
  module1965 = require('./1965'),
  module1966 = require('./1966'),
  module1968 = require('./1968'),
  module1969 = require('./1969'),
  module1971 = require('./1971'),
  module1972 = require('./1972'),
  module1977 = require('./1977'),
  module1978 = require('./1978'),
  module1957 = require('./1957'),
  module1980 = require('./1980'),
  module1982 = require('./1982'),
  module1983 = require('./1983'),
  module1984 = require('./1984'),
  module1985 = require('./1985'),
  module1987 = require('./1987'),
  module1988 = require('./1988'),
  module1989 = require('./1989'),
  module1990 = require('./1990'),
  module1994 = require('./1994'),
  module1995 = require('./1995'),
  module1996 = require('./1996'),
  module2003 = require('./2003'),
  module2004 = require('./2004'),
  module2005 = require('./2005'),
  module2006 = require('./2006'),
  module2008 = require('./2008'),
  module2009 = require('./2009'),
  module2012 = require('./2012'),
  module1358 = require('./1358'),
  module2013 = require('./2013');

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
  module2014 = module389.isMiApp ? module12.View : require('./2014').default,
  Oe = {
    MainPage: module1989.default(module1370.default),
    ErrorDetailPageNew: module1989.default(module1816.default),
    BuyCompassPage: module1989.default(module1852.default),
    Setting: module1989.default(module1855.default),
    TimerPage: module1989.default(module1859.default),
    TimerSettingPage: module1989.default(module1862.default),
    HistoryPage: module1989.default(module1872.default),
    CleanRecordDetailPage: module1989.default(module1882.default),
    SuppliesPage: module1989.default(module1887.default),
    SupplyDetailPage: module1989.default(module1890.default),
    GuidePage: module1989.default(module1897.default),
    ContactUSPage: module1989.default(module1901.default),
    GuideDetailPage: module1989.default(module1898.default),
    NetInfoPage: module1989.default(module1907.default),
    SoundPackagePage: module1989.default(module1908.default),
    SyncTimezonePage: module1989.default(module1916.default),
    RobotSettingPage: module1989.default(module1917.default),
    MapEditForbiddenZonePage: module1989.default(module1982.default),
    MapEditZoneOrderPage: module1989.default(module1983.default),
    MapEditZoneModePage: module1989.default(module1984.default),
    MapEditZoneInfoPage: module1989.default(module1985.default),
    MapEditRotateView: module1989.default(module1987.default),
    MapEditFurnitureView: module1989.default(module1988.default),
    WebViewPage: module1989.default(module1919.default),
    MapViewGotoPage: module1989.default(module1920.default),
    ObaInfoPage: module1989.default(module1922.default),
    UITestPage: module1989.default(module1923.default),
    MultiFloorPage: module1989.default(module1934.default),
    MonitorPage: module1989.default(module2014, true),
    MonitorErrorPage: module1989.default(module1938.default, false),
    RemoteControlPageNew: module1989.default(module1939.default),
    CameraSettingPage: module1989.default(module1925.default),
    CameraSettingDetail: module1989.default(module1926.default),
    GesturePasswordPage: module1989.default(module1950.default),
    SecuritySettingPage: module1989.default(module1933.default),
    MapObjectPhotoPage: module1989.default(module1955.default),
    LogListPage: module1989.default(module409.LogListPage),
    LogDetailPage: module1989.default(module409.LogDetailPage),
    VideoCallSettingPage: module1989.default(module1965.default),
    CarpetCleanModeSetting: module1989.default(module1966.default),
    MapCarpetIgnorePage: module1989.default(module1968.default),
    MapCarpetInfoPage: module1989.default(module1969.default),
    StructureLightSetting: module1989.default(module1971.default),
    MultiFloorSwitch: module1989.default(module1972.default),
    DebugViewPage: module1989.default(module1977.default),
    FeedbackViewPage: module1989.default(module1978.default),
    ObstacleTypeSelection: module1989.default(module1957.default),
    PictureProcessingResultPage: module1989.default(module1980.default),
    DebugPage: module1989.default(module1990.default),
    OtaDebugViewPage: module1989.default(module1994.default),
    WiFiDebugPage: module1989.default(module1995.default),
    SettingLayerBorad: module1989.default(module1996.default),
    DustCollectionModeSetting: module1989.default(module2003.default),
    SmartScenePage: module1989.default(module2004.default),
    WashTowelSetting: module1989.default(module2005.default),
    WashTowelSettingNew: module1989.default(module2006.default),
    DustCollectionSettingPageNew: module1989.default(module2008.default),
    DraggableListDemo: module1989.default(module2009.default),
    SettingAirDryPage: module1989.default(module2012.default),
    MopModeCustomPage: module1989.default(module1358.default),
    MopModeListPage: module1989.default(module2013.default),
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
