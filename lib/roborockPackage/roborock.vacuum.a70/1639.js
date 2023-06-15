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
  module1640 = require('./1640'),
  module418 = require('./418'),
  module1949 = require('./1949'),
  module1954 = require('./1954'),
  module1955 = require('./1955'),
  module1959 = require('./1959'),
  module1964 = require('./1964'),
  module1971 = require('./1971'),
  module1981 = require('./1981'),
  module1987 = require('./1987'),
  module1990 = require('./1990'),
  module1998 = require('./1998'),
  module2002 = require('./2002'),
  module1999 = require('./1999'),
  module2008 = require('./2008'),
  module2009 = require('./2009'),
  module2018 = require('./2018'),
  module2019 = require('./2019'),
  module2021 = require('./2021'),
  module2022 = require('./2022'),
  module2025 = require('./2025'),
  module2026 = require('./2026'),
  module2029 = require('./2029'),
  module2030 = require('./2030'),
  module2031 = require('./2031'),
  module2034 = require('./2034'),
  module2035 = require('./2035'),
  module2045 = require('./2045'),
  module2050 = require('./2050'),
  module2064 = require('./2064'),
  module2066 = require('./2066'),
  module2067 = require('./2067'),
  module2068 = require('./2068'),
  module2073 = require('./2073'),
  module2074 = require('./2074'),
  module2082 = require('./2082'),
  module2085 = require('./2085'),
  module2087 = require('./2087'),
  module2088 = require('./2088'),
  module2089 = require('./2089'),
  module2090 = require('./2090'),
  module2091 = require('./2091'),
  module2097 = require('./2097'),
  module2098 = require('./2098'),
  module2100 = require('./2100'),
  module2101 = require('./2101'),
  module2102 = require('./2102'),
  module2103 = require('./2103'),
  module2104 = require('./2104'),
  module2106 = require('./2106'),
  module2107 = require('./2107'),
  module2111 = require('./2111'),
  module2112 = require('./2112'),
  module2113 = require('./2113'),
  module1963 = require('./1963'),
  module2114 = require('./2114'),
  module2115 = require('./2115'),
  module2119 = require('./2119'),
  module2122 = require('./2122'),
  module1630 = require('./1630'),
  module2124 = require('./2124'),
  module2125 = require('./2125'),
  module2133 = require('./2133'),
  module2135 = require('./2135'),
  module2138 = require('./2138'),
  module2139 = require('./2139'),
  module2140 = require('./2140'),
  module2141 = require('./2141'),
  module2146 = require('./2146'),
  module2151 = require('./2151'),
  module2152 = require('./2152'),
  module2153 = require('./2153'),
  module2154 = require('./2154'),
  module2156 = require('./2156'),
  module2157 = require('./2157'),
  module2158 = require('./2158'),
  module2159 = require('./2159'),
  module2160 = require('./2160'),
  module2161 = require('./2161'),
  module2162 = require('./2162'),
  module2163 = require('./2163'),
  module2164 = require('./2164'),
  module2165 = require('./2165'),
  module2175 = require('./2175'),
  module2176 = require('./2176');

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
  module2177 = module393.isMiApp ? module13.View : require('./2177').default,
  Xe = {
    MainPage: module2106.default(module1640.default),
    ErrorDetailPageNew: module2106.default(module1949.default),
    BuyCompassPage: module2106.default(module1954.default),
    Setting: module2106.default(module1955.default),
    TimerPage: module2106.default(module1959.default),
    TimerSettingPage: module2106.default(module1964.default),
    HistoryPage: module2106.default(module1971.default),
    CleanRecordDetailPage: module2106.default(module1981.default),
    SuppliesPage: module2106.default(module1987.default),
    SupplyDetailPage: module2106.default(module1990.default),
    GuidePage: module2106.default(module1998.default),
    ContactUSPage: module2106.default(module2002.default),
    GuideDetailPage: module2106.default(module1999.default),
    NetInfoPage: module2106.default(module2008.default),
    SoundPackagePage: module2106.default(module2009.default),
    SyncTimezonePage: module2106.default(module2018.default),
    RobotSettingPage: module2106.default(module2019.default),
    MapEditForbiddenZonePage: module2106.default(module2088.default),
    MapEditZoneOrderPage: module2106.default(module2089.default),
    MapEditZoneModePage: module2106.default(module2090.default),
    MapEditZoneInfoPage: module2106.default(module2091.default),
    MapEditCarpetPage: module2106.default(module2097.default),
    MapEditRotatePage: module2106.default(module2098.default),
    MapEditFurniturePage: module2106.default(module2100.default),
    MapEditGroundPage: module2106.default(module2101.default),
    MapEditFloorMaterialPage: module2106.default(module2102.default),
    MapEditDoorSillPage: module2106.default(module2103.default),
    MapAICheckPage: module2106.default(module2104.default),
    WebViewPage: module2106.default(module2021.default),
    MapViewGotoPage: module2106.default(module2022.default),
    ObaInfoPage: module2106.default(module2025.default),
    UITestPage: module2106.default(module2026.default),
    MultiFloorPage: module2106.default(module2031.default),
    MonitorPage: module2106.default(module2177, true),
    MonitorErrorPage: module2106.default(module2034.default, false),
    RemoteControlPageNew: module2106.default(module2035.default),
    CameraSettingDetail: module2106.default(module2029.default),
    GesturePasswordPage: module2106.default(module2045.default),
    SecuritySettingPage: module2106.default(module2030.default),
    MapObjectPhotoPage: module2106.default(module2050.default),
    LogListPage: module2106.default(module418.LogListPage),
    LogDetailPage: module2106.default(module418.LogDetailPage),
    VideoCallSettingPage: module2106.default(module2064.default),
    CarpetCleanModeSetting: module2106.default(module2066.default),
    StructureLightSetting: module2106.default(module2067.default),
    MultiFloorSwitch: module2106.default(module2068.default),
    DebugViewPage: module2106.default(module2073.default),
    FeedbackViewPage: module2106.default(module2074.default),
    ObstacleTypeSelection: module2106.default(module2082.default),
    PictureProcessingResultPage: module2106.default(module2085.default),
    GroundCleanModePage: module2106.default(module2087.default),
    DebugPage: module2106.default(module2107.default),
    CarpetCleanModeDebug: module2106.default(module2111.default),
    WiFiDebugPage: module2106.default(module2112.default),
    DustCollectionModeSetting: module2106.default(module2113.default),
    SmartScenePage: module2106.default(module1963.default),
    SmartCommandList: module2106.default(module2141.default),
    SmartCommandEditView: module2106.default(module2146.default),
    SmartCommandTimer: module2106.default(module2151.default),
    WashTowelSetting: module2106.default(module2114.default),
    WashTowelSettingNew: module2106.default(module2115.default),
    DraggableListDemo: module2106.default(module2119.default),
    SettingAirDryPage: module2106.default(module2122.default),
    MopModeCustomPage: module2106.default(module1630.default),
    MopModeListPage: module2106.default(module2124.default),
    MapARScanPage: module2106.default(module2125.default),
    MapARScanResultPage: module2106.default(module2133.default),
    EggPage: module2106.default(module2135.default),
    CarpetPressurizeSettingPage: module2106.default(module2138.default),
    DebugRemoteControlPage: module2106.default(module2139.default),
    SoundPackageInfoDebugPage: module2106.default(module2140.default),
    DebugConfigFileListPage: module2106.default(module2152.default),
    DockSettingPage: module2106.default(module2153.default),
    ProductInformationPage: module2106.default(module2154.default),
    DebugDrySettingPage: module2106.default(module2156.default),
    DryTimeSettingPage: module2106.default(module2157.default),
    CleanEstimateInfoDebugPage: module2106.default(module2158.default),
    CustomDndPage: module2106.default(module2159.default),
    ChangeWaterDebugPage: module2106.default(module2160.default),
    WifiPage: module2106.default(module2161.default),
    IncrementalMapDebugPage: module2106.default(module2162.default),
    OffLineMapPage: module2106.default(module2163.default, true),
    WaterUpDownPage: module2106.default(module2164.default),
    CES2022Page: module2106.default(module2165.default),
    PearlDrainWaterPage: module2106.default(module2175.default),
    SoundPackageTestPage: module2106.default(module2176.default),
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
