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
      var P = l.findIndex(function (t) {
          return t === u;
        }),
        s = l.findIndex(function (t) {
          return t.isActive;
        }),
        p = l[s].index,
        c = l[n].index;
      return f !== p && P === n
        ? {
            first: p ** (f - 1),
            last: f + 1,
          }
        : f === p && P === s
        ? {
            first: f - 1,
            last: c ** (f + 1),
          }
        : f === p || P > s
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
    P = o.first,
    s = o.last,
    p = f.index,
    c = l.interpolate({
      inputRange: [P, P + 0.01, p, s - 0.01, s],
      outputRange: [0, 1, 1, 0.85, 0],
    }),
    M = u.initWidth,
    S = l.interpolate({
      inputRange: [P, p, s],
      outputRange: globals.isRTL ? [-M, 0, 0.3 * M] : [M, 0, -0.3 * M],
    });
  return {
    opacity: c,
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

var module50 = require('./50'),
  module12 = require('./12'),
  module1565 = require('./1565'),
  module417 = require('./417'),
  module1872 = require('./1872'),
  module1877 = require('./1877'),
  module1878 = require('./1878'),
  module1882 = require('./1882'),
  module1887 = require('./1887'),
  module1894 = require('./1894'),
  module1904 = require('./1904'),
  module1910 = require('./1910'),
  module1913 = require('./1913'),
  module1921 = require('./1921'),
  module1925 = require('./1925'),
  module1922 = require('./1922'),
  module1931 = require('./1931'),
  module1932 = require('./1932'),
  module1941 = require('./1941'),
  module1942 = require('./1942'),
  module1944 = require('./1944'),
  module1945 = require('./1945'),
  module1948 = require('./1948'),
  module1949 = require('./1949'),
  module1951 = require('./1951'),
  module1952 = require('./1952'),
  module1953 = require('./1953'),
  module1956 = require('./1956'),
  module1957 = require('./1957'),
  module1967 = require('./1967'),
  module1972 = require('./1972'),
  module1986 = require('./1986'),
  module1988 = require('./1988'),
  module1989 = require('./1989'),
  module1990 = require('./1990'),
  module1995 = require('./1995'),
  module1996 = require('./1996'),
  module1999 = require('./1999'),
  module2002 = require('./2002'),
  module2004 = require('./2004'),
  module2005 = require('./2005'),
  module2006 = require('./2006'),
  module2007 = require('./2007'),
  module2008 = require('./2008'),
  module2014 = require('./2014'),
  module2015 = require('./2015'),
  module2017 = require('./2017'),
  module2018 = require('./2018'),
  module2019 = require('./2019'),
  module2020 = require('./2020'),
  module2021 = require('./2021'),
  module2023 = require('./2023'),
  module2024 = require('./2024'),
  module2028 = require('./2028'),
  module2029 = require('./2029'),
  module2030 = require('./2030'),
  module1886 = require('./1886'),
  module2031 = require('./2031'),
  module2032 = require('./2032'),
  module2036 = require('./2036'),
  module2039 = require('./2039'),
  module1555 = require('./1555'),
  module2041 = require('./2041'),
  module2042 = require('./2042'),
  module2050 = require('./2050'),
  module2052 = require('./2052'),
  module2055 = require('./2055'),
  module2056 = require('./2056'),
  module2057 = require('./2057'),
  module2058 = require('./2058'),
  module2063 = require('./2063'),
  module2068 = require('./2068'),
  module2069 = require('./2069'),
  module2070 = require('./2070'),
  module2071 = require('./2071'),
  module2073 = require('./2073'),
  module2074 = require('./2074'),
  module2075 = require('./2075'),
  module2076 = require('./2076'),
  module2077 = require('./2077'),
  module2078 = require('./2078'),
  module2079 = require('./2079'),
  module2080 = require('./2080');

function We(t, u) {
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

function Ge(t) {
  for (var l = 1; l < arguments.length; l++) {
    var f = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      We(Object(f), true).forEach(function (l) {
        module50.default(t, l, f[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      We(Object(f)).forEach(function (u) {
        Object.defineProperty(t, u, Object.getOwnPropertyDescriptor(f, u));
      });
  }

  return t;
}

var module393 = require('./393'),
  module2081 = module393.isMiApp ? module12.View : require('./2081').default,
  Ze = {
    MainPage: module2023.default(module1565.default),
    ErrorDetailPageNew: module2023.default(module1872.default),
    BuyCompassPage: module2023.default(module1877.default),
    Setting: module2023.default(module1878.default),
    TimerPage: module2023.default(module1882.default),
    TimerSettingPage: module2023.default(module1887.default),
    HistoryPage: module2023.default(module1894.default),
    CleanRecordDetailPage: module2023.default(module1904.default),
    SuppliesPage: module2023.default(module1910.default),
    SupplyDetailPage: module2023.default(module1913.default),
    GuidePage: module2023.default(module1921.default),
    ContactUSPage: module2023.default(module1925.default),
    GuideDetailPage: module2023.default(module1922.default),
    NetInfoPage: module2023.default(module1931.default),
    SoundPackagePage: module2023.default(module1932.default),
    SyncTimezonePage: module2023.default(module1941.default),
    RobotSettingPage: module2023.default(module1942.default),
    MapEditForbiddenZonePage: module2023.default(module2005.default),
    MapEditZoneOrderPage: module2023.default(module2006.default),
    MapEditZoneModePage: module2023.default(module2007.default),
    MapEditZoneInfoPage: module2023.default(module2008.default),
    MapEditCarpetPage: module2023.default(module2014.default),
    MapEditRotatePage: module2023.default(module2015.default),
    MapEditFurniturePage: module2023.default(module2017.default),
    MapEditGroundPage: module2023.default(module2018.default),
    MapEditFloorMaterialPage: module2023.default(module2019.default),
    MapEditDoorSillPage: module2023.default(module2020.default),
    MapAICheckPage: module2023.default(module2021.default),
    WebViewPage: module2023.default(module1944.default),
    MapViewGotoPage: module2023.default(module1945.default),
    ObaInfoPage: module2023.default(module1948.default),
    UITestPage: module2023.default(module1949.default),
    MultiFloorPage: module2023.default(module1953.default),
    MonitorPage: module2023.default(module2081, true),
    MonitorErrorPage: module2023.default(module1956.default, false),
    RemoteControlPageNew: module2023.default(module1957.default),
    CameraSettingDetail: module2023.default(module1951.default),
    GesturePasswordPage: module2023.default(module1967.default),
    SecuritySettingPage: module2023.default(module1952.default),
    MapObjectPhotoPage: module2023.default(module1972.default),
    LogListPage: module2023.default(module417.LogListPage),
    LogDetailPage: module2023.default(module417.LogDetailPage),
    VideoCallSettingPage: module2023.default(module1986.default),
    CarpetCleanModeSetting: module2023.default(module1988.default),
    StructureLightSetting: module2023.default(module1989.default),
    MultiFloorSwitch: module2023.default(module1990.default),
    DebugViewPage: module2023.default(module1995.default),
    FeedbackViewPage: module2023.default(module1996.default),
    ObstacleTypeSelection: module2023.default(module1999.default),
    PictureProcessingResultPage: module2023.default(module2002.default),
    GroundCleanModePage: module2023.default(module2004.default),
    DebugPage: module2023.default(module2024.default),
    CarpetCleanModeDebug: module2023.default(module2028.default),
    WiFiDebugPage: module2023.default(module2029.default),
    DustCollectionModeSetting: module2023.default(module2030.default),
    SmartScenePage: module2023.default(module1886.default),
    SmartCommandList: module2023.default(module2058.default),
    SmartCommandEditView: module2023.default(module2063.default),
    SmartCommandTimer: module2023.default(module2068.default),
    WashTowelSetting: module2023.default(module2031.default),
    WashTowelSettingNew: module2023.default(module2032.default),
    DraggableListDemo: module2023.default(module2036.default),
    SettingAirDryPage: module2023.default(module2039.default),
    MopModeCustomPage: module2023.default(module1555.default),
    MopModeListPage: module2023.default(module2041.default),
    MapARScanPage: module2023.default(module2042.default),
    MapARScanResultPage: module2023.default(module2050.default),
    EggPage: module2023.default(module2052.default),
    CarpetPressurizeSettingPage: module2023.default(module2055.default),
    DebugRemoteControlPage: module2023.default(module2056.default),
    SoundPackageInfoDebugPage: module2023.default(module2057.default),
    DebugConfigFileListPage: module2023.default(module2069.default),
    SelfCleaningSettingPage: module2023.default(module2070.default),
    ProductInformationPage: module2023.default(module2071.default),
    DebugDrySettingPage: module2023.default(module2073.default),
    DryTimeSettingPage: module2023.default(module2074.default),
    CleanEstimateInfoDebugPage: module2023.default(module2075.default),
    CustomDndPage: module2023.default(module2076.default),
    ChangeWaterDebugPage: module2023.default(module2077.default),
    WifiPage: module2023.default(module2078.default),
    IncrementalMapDebugPage: module2023.default(module2079.default),
    OffLineMapPage: module2023.default(module2080.default, true),
  };

exports.routes = Ze;
if (module393.isMiApp)
  exports.routes = Ze = Ge(
    Ge({}, Ze),
    {},
    {
      MoreSetting: module393.MoreSetting,
    }
  );
