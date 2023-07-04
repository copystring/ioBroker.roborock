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
  module13 = require('./13'),
  module1647 = require('./1647'),
  module418 = require('./418'),
  module1956 = require('./1956'),
  module1961 = require('./1961'),
  module1962 = require('./1962'),
  module1966 = require('./1966'),
  module1976 = require('./1976'),
  module1983 = require('./1983'),
  module1993 = require('./1993'),
  module1999 = require('./1999'),
  module2002 = require('./2002'),
  module2010 = require('./2010'),
  module2014 = require('./2014'),
  module2011 = require('./2011'),
  module2020 = require('./2020'),
  module2021 = require('./2021'),
  module2030 = require('./2030'),
  module2031 = require('./2031'),
  module2033 = require('./2033'),
  module2034 = require('./2034'),
  module2037 = require('./2037'),
  module2038 = require('./2038'),
  module2041 = require('./2041'),
  module2042 = require('./2042'),
  module2043 = require('./2043'),
  module2046 = require('./2046'),
  module2047 = require('./2047'),
  module2057 = require('./2057'),
  module2062 = require('./2062'),
  module2076 = require('./2076'),
  module2078 = require('./2078'),
  module2079 = require('./2079'),
  module2080 = require('./2080'),
  module2085 = require('./2085'),
  module2086 = require('./2086'),
  module2094 = require('./2094'),
  module2097 = require('./2097'),
  module2099 = require('./2099'),
  module2100 = require('./2100'),
  module2101 = require('./2101'),
  module2102 = require('./2102'),
  module2103 = require('./2103'),
  module2109 = require('./2109'),
  module2110 = require('./2110'),
  module2112 = require('./2112'),
  module2113 = require('./2113'),
  module2114 = require('./2114'),
  module2115 = require('./2115'),
  module2116 = require('./2116'),
  module2118 = require('./2118'),
  module2119 = require('./2119'),
  module2123 = require('./2123'),
  module2124 = require('./2124'),
  module2125 = require('./2125'),
  module1970 = require('./1970'),
  module2126 = require('./2126'),
  module2127 = require('./2127'),
  module2131 = require('./2131'),
  module2134 = require('./2134'),
  module1637 = require('./1637'),
  module2136 = require('./2136'),
  module2137 = require('./2137'),
  module2145 = require('./2145'),
  module2147 = require('./2147'),
  module2150 = require('./2150'),
  module2151 = require('./2151'),
  module2152 = require('./2152'),
  module2153 = require('./2153'),
  module2167 = require('./2167'),
  module2172 = require('./2172'),
  module2173 = require('./2173'),
  module2174 = require('./2174'),
  module2175 = require('./2175'),
  module2177 = require('./2177'),
  module2178 = require('./2178'),
  module2179 = require('./2179'),
  module2180 = require('./2180'),
  module2181 = require('./2181'),
  module2182 = require('./2182'),
  module2183 = require('./2183'),
  module2184 = require('./2184'),
  module2185 = require('./2185'),
  module2186 = require('./2186'),
  module2196 = require('./2196'),
  module2197 = require('./2197');

function Ze(t, u) {
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

function _e(t) {
  for (var l = 1; l < arguments.length; l++) {
    var f = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      Ze(Object(f), true).forEach(function (l) {
        module50.default(t, l, f[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      Ze(Object(f)).forEach(function (u) {
        Object.defineProperty(t, u, Object.getOwnPropertyDescriptor(f, u));
      });
  }

  return t;
}

var module393 = require('./393'),
  module2198 = module393.isMiApp ? module13.View : require('./2198').default,
  Xe = {
    MainPage: module2118.default(module1647.default),
    ErrorDetailPageNew: module2118.default(module1956.default),
    BuyCompassPage: module2118.default(module1961.default),
    Setting: module2118.default(module1962.default),
    TimerPage: module2118.default(module1966.default),
    TimerSettingPage: module2118.default(module1976.default),
    HistoryPage: module2118.default(module1983.default),
    CleanRecordDetailPage: module2118.default(module1993.default),
    SuppliesPage: module2118.default(module1999.default),
    SupplyDetailPage: module2118.default(module2002.default),
    GuidePage: module2118.default(module2010.default),
    ContactUSPage: module2118.default(module2014.default),
    GuideDetailPage: module2118.default(module2011.default),
    NetInfoPage: module2118.default(module2020.default),
    SoundPackagePage: module2118.default(module2021.default),
    SyncTimezonePage: module2118.default(module2030.default),
    RobotSettingPage: module2118.default(module2031.default),
    MapEditForbiddenZonePage: module2118.default(module2100.default),
    MapEditZoneOrderPage: module2118.default(module2101.default),
    MapEditZoneModePage: module2118.default(module2102.default),
    MapEditZoneInfoPage: module2118.default(module2103.default),
    MapEditCarpetPage: module2118.default(module2109.default),
    MapEditRotatePage: module2118.default(module2110.default),
    MapEditFurniturePage: module2118.default(module2112.default),
    MapEditGroundPage: module2118.default(module2113.default),
    MapEditFloorMaterialPage: module2118.default(module2114.default),
    MapEditDoorSillPage: module2118.default(module2115.default),
    MapAICheckPage: module2118.default(module2116.default),
    WebViewPage: module2118.default(module2033.default),
    MapViewGotoPage: module2118.default(module2034.default),
    ObaInfoPage: module2118.default(module2037.default),
    UITestPage: module2118.default(module2038.default),
    MultiFloorPage: module2118.default(module2043.default),
    MonitorPage: module2118.default(module2198, true),
    MonitorErrorPage: module2118.default(module2046.default, false),
    RemoteControlPageNew: module2118.default(module2047.default),
    CameraSettingDetail: module2118.default(module2041.default),
    GesturePasswordPage: module2118.default(module2057.default),
    SecuritySettingPage: module2118.default(module2042.default),
    MapObjectPhotoPage: module2118.default(module2062.default),
    LogListPage: module2118.default(module418.LogListPage),
    LogDetailPage: module2118.default(module418.LogDetailPage),
    VideoCallSettingPage: module2118.default(module2076.default),
    CarpetCleanModeSetting: module2118.default(module2078.default),
    StructureLightSetting: module2118.default(module2079.default),
    MultiFloorSwitch: module2118.default(module2080.default),
    DebugViewPage: module2118.default(module2085.default),
    FeedbackViewPage: module2118.default(module2086.default),
    ObstacleTypeSelection: module2118.default(module2094.default),
    PictureProcessingResultPage: module2118.default(module2097.default),
    GroundCleanModePage: module2118.default(module2099.default),
    DebugPage: module2118.default(module2119.default),
    CarpetCleanModeDebug: module2118.default(module2123.default),
    WiFiDebugPage: module2118.default(module2124.default),
    DustCollectionModeSetting: module2118.default(module2125.default),
    SmartScenePage: module2118.default(module1970.default),
    SmartCommandList: module2118.default(module2153.default),
    SmartCommandEditView: module2118.default(module2167.default),
    SmartCommandTimer: module2118.default(module2172.default),
    WashTowelSetting: module2118.default(module2126.default),
    WashTowelSettingNew: module2118.default(module2127.default),
    DraggableListDemo: module2118.default(module2131.default),
    SettingAirDryPage: module2118.default(module2134.default),
    MopModeCustomPage: module2118.default(module1637.default),
    MopModeListPage: module2118.default(module2136.default),
    MapARScanPage: module2118.default(module2137.default),
    MapARScanResultPage: module2118.default(module2145.default),
    EggPage: module2118.default(module2147.default),
    CarpetPressurizeSettingPage: module2118.default(module2150.default),
    DebugRemoteControlPage: module2118.default(module2151.default),
    SoundPackageInfoDebugPage: module2118.default(module2152.default),
    DebugConfigFileListPage: module2118.default(module2173.default),
    DockSettingPage: module2118.default(module2174.default),
    ProductInformationPage: module2118.default(module2175.default),
    DebugDrySettingPage: module2118.default(module2177.default),
    DryTimeSettingPage: module2118.default(module2178.default),
    CleanEstimateInfoDebugPage: module2118.default(module2179.default),
    CustomDndPage: module2118.default(module2180.default),
    ChangeWaterDebugPage: module2118.default(module2181.default),
    WifiPage: module2118.default(module2182.default),
    IncrementalMapDebugPage: module2118.default(module2183.default),
    OffLineMapPage: module2118.default(module2184.default, true),
    WaterUpDownPage: module2118.default(module2185.default),
    CES2022Page: module2118.default(module2186.default),
    PearlDrainWaterPage: module2118.default(module2196.default),
    SoundPackageTestPage: module2118.default(module2197.default),
  };

exports.routes = Xe;
if (module393.isMiApp)
  exports.routes = Xe = _e(
    _e({}, Xe),
    {},
    {
      MoreSetting: module393.MoreSetting,
    }
  );
