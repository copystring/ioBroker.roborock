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
  module1646 = require('./1646'),
  module418 = require('./418'),
  module1955 = require('./1955'),
  module1960 = require('./1960'),
  module1961 = require('./1961'),
  module1965 = require('./1965'),
  module1975 = require('./1975'),
  module1982 = require('./1982'),
  module1992 = require('./1992'),
  module1998 = require('./1998'),
  module2001 = require('./2001'),
  module2009 = require('./2009'),
  module2013 = require('./2013'),
  module2010 = require('./2010'),
  module2019 = require('./2019'),
  module2020 = require('./2020'),
  module2029 = require('./2029'),
  module2030 = require('./2030'),
  module2032 = require('./2032'),
  module2033 = require('./2033'),
  module2036 = require('./2036'),
  module2037 = require('./2037'),
  module2040 = require('./2040'),
  module2041 = require('./2041'),
  module2042 = require('./2042'),
  module2045 = require('./2045'),
  module2046 = require('./2046'),
  module2056 = require('./2056'),
  module2061 = require('./2061'),
  module2075 = require('./2075'),
  module2077 = require('./2077'),
  module2078 = require('./2078'),
  module2079 = require('./2079'),
  module2084 = require('./2084'),
  module2085 = require('./2085'),
  module2093 = require('./2093'),
  module2096 = require('./2096'),
  module2098 = require('./2098'),
  module2099 = require('./2099'),
  module2100 = require('./2100'),
  module2101 = require('./2101'),
  module2102 = require('./2102'),
  module2108 = require('./2108'),
  module2109 = require('./2109'),
  module2111 = require('./2111'),
  module2112 = require('./2112'),
  module2113 = require('./2113'),
  module2114 = require('./2114'),
  module2115 = require('./2115'),
  module2117 = require('./2117'),
  module2118 = require('./2118'),
  module2122 = require('./2122'),
  module2123 = require('./2123'),
  module2124 = require('./2124'),
  module1969 = require('./1969'),
  module2125 = require('./2125'),
  module2126 = require('./2126'),
  module2130 = require('./2130'),
  module2133 = require('./2133'),
  module1636 = require('./1636'),
  module2135 = require('./2135'),
  module2136 = require('./2136'),
  module2144 = require('./2144'),
  module2146 = require('./2146'),
  module2149 = require('./2149'),
  module2150 = require('./2150'),
  module2151 = require('./2151'),
  module2152 = require('./2152'),
  module2166 = require('./2166'),
  module2171 = require('./2171'),
  module2172 = require('./2172'),
  module2173 = require('./2173'),
  module2174 = require('./2174'),
  module2176 = require('./2176'),
  module2177 = require('./2177'),
  module2178 = require('./2178'),
  module2179 = require('./2179'),
  module2180 = require('./2180'),
  module2181 = require('./2181'),
  module2182 = require('./2182'),
  module2183 = require('./2183'),
  module2184 = require('./2184'),
  module2185 = require('./2185'),
  module2195 = require('./2195'),
  module2196 = require('./2196');

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
  module2197 = module393.isMiApp ? module13.View : require('./2197').default,
  Xe = {
    MainPage: module2117.default(module1646.default),
    ErrorDetailPageNew: module2117.default(module1955.default),
    BuyCompassPage: module2117.default(module1960.default),
    Setting: module2117.default(module1961.default),
    TimerPage: module2117.default(module1965.default),
    TimerSettingPage: module2117.default(module1975.default),
    HistoryPage: module2117.default(module1982.default),
    CleanRecordDetailPage: module2117.default(module1992.default),
    SuppliesPage: module2117.default(module1998.default),
    SupplyDetailPage: module2117.default(module2001.default),
    GuidePage: module2117.default(module2009.default),
    ContactUSPage: module2117.default(module2013.default),
    GuideDetailPage: module2117.default(module2010.default),
    NetInfoPage: module2117.default(module2019.default),
    SoundPackagePage: module2117.default(module2020.default),
    SyncTimezonePage: module2117.default(module2029.default),
    RobotSettingPage: module2117.default(module2030.default),
    MapEditForbiddenZonePage: module2117.default(module2099.default),
    MapEditZoneOrderPage: module2117.default(module2100.default),
    MapEditZoneModePage: module2117.default(module2101.default),
    MapEditZoneInfoPage: module2117.default(module2102.default),
    MapEditCarpetPage: module2117.default(module2108.default),
    MapEditRotatePage: module2117.default(module2109.default),
    MapEditFurniturePage: module2117.default(module2111.default),
    MapEditGroundPage: module2117.default(module2112.default),
    MapEditFloorMaterialPage: module2117.default(module2113.default),
    MapEditDoorSillPage: module2117.default(module2114.default),
    MapAICheckPage: module2117.default(module2115.default),
    WebViewPage: module2117.default(module2032.default),
    MapViewGotoPage: module2117.default(module2033.default),
    ObaInfoPage: module2117.default(module2036.default),
    UITestPage: module2117.default(module2037.default),
    MultiFloorPage: module2117.default(module2042.default),
    MonitorPage: module2117.default(module2197, true),
    MonitorErrorPage: module2117.default(module2045.default, false),
    RemoteControlPageNew: module2117.default(module2046.default),
    CameraSettingDetail: module2117.default(module2040.default),
    GesturePasswordPage: module2117.default(module2056.default),
    SecuritySettingPage: module2117.default(module2041.default),
    MapObjectPhotoPage: module2117.default(module2061.default),
    LogListPage: module2117.default(module418.LogListPage),
    LogDetailPage: module2117.default(module418.LogDetailPage),
    VideoCallSettingPage: module2117.default(module2075.default),
    CarpetCleanModeSetting: module2117.default(module2077.default),
    StructureLightSetting: module2117.default(module2078.default),
    MultiFloorSwitch: module2117.default(module2079.default),
    DebugViewPage: module2117.default(module2084.default),
    FeedbackViewPage: module2117.default(module2085.default),
    ObstacleTypeSelection: module2117.default(module2093.default),
    PictureProcessingResultPage: module2117.default(module2096.default),
    GroundCleanModePage: module2117.default(module2098.default),
    DebugPage: module2117.default(module2118.default),
    CarpetCleanModeDebug: module2117.default(module2122.default),
    WiFiDebugPage: module2117.default(module2123.default),
    DustCollectionModeSetting: module2117.default(module2124.default),
    SmartScenePage: module2117.default(module1969.default),
    SmartCommandList: module2117.default(module2152.default),
    SmartCommandEditView: module2117.default(module2166.default),
    SmartCommandTimer: module2117.default(module2171.default),
    WashTowelSetting: module2117.default(module2125.default),
    WashTowelSettingNew: module2117.default(module2126.default),
    DraggableListDemo: module2117.default(module2130.default),
    SettingAirDryPage: module2117.default(module2133.default),
    MopModeCustomPage: module2117.default(module1636.default),
    MopModeListPage: module2117.default(module2135.default),
    MapARScanPage: module2117.default(module2136.default),
    MapARScanResultPage: module2117.default(module2144.default),
    EggPage: module2117.default(module2146.default),
    CarpetPressurizeSettingPage: module2117.default(module2149.default),
    DebugRemoteControlPage: module2117.default(module2150.default),
    SoundPackageInfoDebugPage: module2117.default(module2151.default),
    DebugConfigFileListPage: module2117.default(module2172.default),
    DockSettingPage: module2117.default(module2173.default),
    ProductInformationPage: module2117.default(module2174.default),
    DebugDrySettingPage: module2117.default(module2176.default),
    DryTimeSettingPage: module2117.default(module2177.default),
    CleanEstimateInfoDebugPage: module2117.default(module2178.default),
    CustomDndPage: module2117.default(module2179.default),
    ChangeWaterDebugPage: module2117.default(module2180.default),
    WifiPage: module2117.default(module2181.default),
    IncrementalMapDebugPage: module2117.default(module2182.default),
    OffLineMapPage: module2117.default(module2183.default, true),
    WaterUpDownPage: module2117.default(module2184.default),
    CES2022Page: module2117.default(module2185.default),
    PearlDrainWaterPage: module2117.default(module2195.default),
    SoundPackageTestPage: module2117.default(module2196.default),
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
