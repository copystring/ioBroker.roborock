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
        c = l[s].index,
        p = l[n].index;
      return f !== c && P === n
        ? {
            first: c ** (f - 1),
            last: f + 1,
          }
        : f === c && P === s
        ? {
            first: f - 1,
            last: p ** (f + 1),
          }
        : f === c || P > s
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
    c = f.index,
    p = l.interpolate({
      inputRange: [P, P + 0.01, c, s - 0.01, s],
      outputRange: [0, 1, 1, 0.85, 0],
    }),
    M = u.initWidth,
    S = l.interpolate({
      inputRange: [P, c, s],
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

var module50 = require('./50'),
  module12 = require('./12'),
  module1567 = require('./1567'),
  module417 = require('./417'),
  module1874 = require('./1874'),
  module1879 = require('./1879'),
  module1880 = require('./1880'),
  module1884 = require('./1884'),
  module1889 = require('./1889'),
  module1896 = require('./1896'),
  module1906 = require('./1906'),
  module1912 = require('./1912'),
  module1915 = require('./1915'),
  module1923 = require('./1923'),
  module1927 = require('./1927'),
  module1924 = require('./1924'),
  module1933 = require('./1933'),
  module1934 = require('./1934'),
  module1943 = require('./1943'),
  module1944 = require('./1944'),
  module1946 = require('./1946'),
  module1947 = require('./1947'),
  module1950 = require('./1950'),
  module1951 = require('./1951'),
  module1953 = require('./1953'),
  module1954 = require('./1954'),
  module1955 = require('./1955'),
  module1958 = require('./1958'),
  module1959 = require('./1959'),
  module1969 = require('./1969'),
  module1974 = require('./1974'),
  module1988 = require('./1988'),
  module1990 = require('./1990'),
  module1991 = require('./1991'),
  module1992 = require('./1992'),
  module1997 = require('./1997'),
  module1998 = require('./1998'),
  module2001 = require('./2001'),
  module2004 = require('./2004'),
  module2006 = require('./2006'),
  module2007 = require('./2007'),
  module2008 = require('./2008'),
  module2009 = require('./2009'),
  module2010 = require('./2010'),
  module2016 = require('./2016'),
  module2017 = require('./2017'),
  module2019 = require('./2019'),
  module2020 = require('./2020'),
  module2021 = require('./2021'),
  module2022 = require('./2022'),
  module2023 = require('./2023'),
  module2025 = require('./2025'),
  module2026 = require('./2026'),
  module2030 = require('./2030'),
  module2031 = require('./2031'),
  module2032 = require('./2032'),
  module1888 = require('./1888'),
  module2033 = require('./2033'),
  module2034 = require('./2034'),
  module2038 = require('./2038'),
  module2041 = require('./2041'),
  module1557 = require('./1557'),
  module2043 = require('./2043'),
  module2044 = require('./2044'),
  module2052 = require('./2052'),
  module2054 = require('./2054'),
  module2057 = require('./2057'),
  module2058 = require('./2058'),
  module2059 = require('./2059'),
  module2060 = require('./2060'),
  module2065 = require('./2065'),
  module2070 = require('./2070'),
  module2071 = require('./2071'),
  module2072 = require('./2072'),
  module2073 = require('./2073'),
  module2075 = require('./2075'),
  module2076 = require('./2076'),
  module2077 = require('./2077'),
  module2078 = require('./2078'),
  module2079 = require('./2079'),
  module2080 = require('./2080'),
  module2081 = require('./2081');

function Ve(t, u) {
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

function We(t) {
  for (var l = 1; l < arguments.length; l++) {
    var f = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      Ve(Object(f), true).forEach(function (l) {
        module50.default(t, l, f[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      Ve(Object(f)).forEach(function (u) {
        Object.defineProperty(t, u, Object.getOwnPropertyDescriptor(f, u));
      });
  }

  return t;
}

var module393 = require('./393'),
  module2082 = module393.isMiApp ? module12.View : require('./2082').default,
  Ne = {
    MainPage: module2025.default(module1567.default),
    ErrorDetailPageNew: module2025.default(module1874.default),
    BuyCompassPage: module2025.default(module1879.default),
    Setting: module2025.default(module1880.default),
    TimerPage: module2025.default(module1884.default),
    TimerSettingPage: module2025.default(module1889.default),
    HistoryPage: module2025.default(module1896.default),
    CleanRecordDetailPage: module2025.default(module1906.default),
    SuppliesPage: module2025.default(module1912.default),
    SupplyDetailPage: module2025.default(module1915.default),
    GuidePage: module2025.default(module1923.default),
    ContactUSPage: module2025.default(module1927.default),
    GuideDetailPage: module2025.default(module1924.default),
    NetInfoPage: module2025.default(module1933.default),
    SoundPackagePage: module2025.default(module1934.default),
    SyncTimezonePage: module2025.default(module1943.default),
    RobotSettingPage: module2025.default(module1944.default),
    MapEditForbiddenZonePage: module2025.default(module2007.default),
    MapEditZoneOrderPage: module2025.default(module2008.default),
    MapEditZoneModePage: module2025.default(module2009.default),
    MapEditZoneInfoPage: module2025.default(module2010.default),
    MapEditCarpetPage: module2025.default(module2016.default),
    MapEditRotatePage: module2025.default(module2017.default),
    MapEditFurniturePage: module2025.default(module2019.default),
    MapEditGroundPage: module2025.default(module2020.default),
    MapEditFloorMaterialPage: module2025.default(module2021.default),
    MapEditDoorSillPage: module2025.default(module2022.default),
    MapAICheckPage: module2025.default(module2023.default),
    WebViewPage: module2025.default(module1946.default),
    MapViewGotoPage: module2025.default(module1947.default),
    ObaInfoPage: module2025.default(module1950.default),
    UITestPage: module2025.default(module1951.default),
    MultiFloorPage: module2025.default(module1955.default),
    MonitorPage: module2025.default(module2082, true),
    MonitorErrorPage: module2025.default(module1958.default, false),
    RemoteControlPageNew: module2025.default(module1959.default),
    CameraSettingDetail: module2025.default(module1953.default),
    GesturePasswordPage: module2025.default(module1969.default),
    SecuritySettingPage: module2025.default(module1954.default),
    MapObjectPhotoPage: module2025.default(module1974.default),
    LogListPage: module2025.default(module417.LogListPage),
    LogDetailPage: module2025.default(module417.LogDetailPage),
    VideoCallSettingPage: module2025.default(module1988.default),
    CarpetCleanModeSetting: module2025.default(module1990.default),
    StructureLightSetting: module2025.default(module1991.default),
    MultiFloorSwitch: module2025.default(module1992.default),
    DebugViewPage: module2025.default(module1997.default),
    FeedbackViewPage: module2025.default(module1998.default),
    ObstacleTypeSelection: module2025.default(module2001.default),
    PictureProcessingResultPage: module2025.default(module2004.default),
    GroundCleanModePage: module2025.default(module2006.default),
    DebugPage: module2025.default(module2026.default),
    CarpetCleanModeDebug: module2025.default(module2030.default),
    WiFiDebugPage: module2025.default(module2031.default),
    DustCollectionModeSetting: module2025.default(module2032.default),
    SmartScenePage: module2025.default(module1888.default),
    SmartCommandList: module2025.default(module2060.default),
    SmartCommandEditView: module2025.default(module2065.default),
    SmartCommandTimer: module2025.default(module2070.default),
    WashTowelSetting: module2025.default(module2033.default),
    WashTowelSettingNew: module2025.default(module2034.default),
    DraggableListDemo: module2025.default(module2038.default),
    SettingAirDryPage: module2025.default(module2041.default),
    MopModeCustomPage: module2025.default(module1557.default),
    MopModeListPage: module2025.default(module2043.default),
    MapARScanPage: module2025.default(module2044.default),
    MapARScanResultPage: module2025.default(module2052.default),
    EggPage: module2025.default(module2054.default),
    CarpetPressurizeSettingPage: module2025.default(module2057.default),
    DebugRemoteControlPage: module2025.default(module2058.default),
    SoundPackageInfoDebugPage: module2025.default(module2059.default),
    DebugConfigFileListPage: module2025.default(module2071.default),
    SelfCleaningSettingPage: module2025.default(module2072.default),
    ProductInformationPage: module2025.default(module2073.default),
    DebugDrySettingPage: module2025.default(module2075.default),
    DryTimeSettingPage: module2025.default(module2076.default),
    CleanEstimateInfoDebugPage: module2025.default(module2077.default),
    CustomDndPage: module2025.default(module2078.default),
    ChangeWaterDebugPage: module2025.default(module2079.default),
    WifiPage: module2025.default(module2080.default),
    IncrementalMapDebugPage: module2025.default(module2081.default),
  };

exports.routes = Ne;
if (module393.isMiApp)
  exports.routes = Ne = We(
    We({}, Ne),
    {},
    {
      MoreSetting: module393.MoreSetting,
    }
  );
