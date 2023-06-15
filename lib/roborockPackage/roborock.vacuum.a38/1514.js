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
    S = u.initWidth,
    M = l.interpolate({
      inputRange: [P, p, s],
      outputRange: globals.isRTL ? [-S, 0, 0.3 * S] : [S, 0, -0.3 * S],
    });
  return {
    opacity: c,
    transform: [
      {
        translateX: M,
      },
      {
        translateY: 0,
      },
    ],
  };
};

var module50 = require('./50'),
  module12 = require('./12'),
  module1515 = require('./1515'),
  module416 = require('./416'),
  module1825 = require('./1825'),
  module1830 = require('./1830'),
  module1831 = require('./1831'),
  module1835 = require('./1835'),
  module1841 = require('./1841'),
  module1848 = require('./1848'),
  module1858 = require('./1858'),
  module1864 = require('./1864'),
  module1867 = require('./1867'),
  module1875 = require('./1875'),
  module1879 = require('./1879'),
  module1876 = require('./1876'),
  module1885 = require('./1885'),
  module1886 = require('./1886'),
  module1895 = require('./1895'),
  module1896 = require('./1896'),
  module1898 = require('./1898'),
  module1899 = require('./1899'),
  module1902 = require('./1902'),
  module1903 = require('./1903'),
  module1905 = require('./1905'),
  module1906 = require('./1906'),
  module1799 = require('./1799'),
  module1907 = require('./1907'),
  module1908 = require('./1908'),
  module1918 = require('./1918'),
  module1923 = require('./1923'),
  module1937 = require('./1937'),
  module1939 = require('./1939'),
  module1940 = require('./1940'),
  module1941 = require('./1941'),
  module1943 = require('./1943'),
  module1944 = require('./1944'),
  module1949 = require('./1949'),
  module1950 = require('./1950'),
  module1953 = require('./1953'),
  module1956 = require('./1956'),
  module1958 = require('./1958'),
  module1959 = require('./1959'),
  module1960 = require('./1960'),
  module1961 = require('./1961'),
  module1967 = require('./1967'),
  module1969 = require('./1969'),
  module1970 = require('./1970'),
  module1971 = require('./1971'),
  module1972 = require('./1972'),
  module1973 = require('./1973'),
  module1977 = require('./1977'),
  module1978 = require('./1978'),
  module1979 = require('./1979'),
  module1839 = require('./1839'),
  module1980 = require('./1980'),
  module1981 = require('./1981'),
  module1985 = require('./1985'),
  module1988 = require('./1988'),
  module1504 = require('./1504'),
  module1990 = require('./1990'),
  module1991 = require('./1991'),
  module1999 = require('./1999'),
  module2001 = require('./2001'),
  module2004 = require('./2004'),
  module2005 = require('./2005'),
  module2006 = require('./2006'),
  module2007 = require('./2007'),
  module2012 = require('./2012'),
  module2017 = require('./2017'),
  module2018 = require('./2018'),
  module2019 = require('./2019'),
  module2020 = require('./2020'),
  module2022 = require('./2022'),
  module2023 = require('./2023'),
  module2024 = require('./2024'),
  module2025 = require('./2025'),
  module2026 = require('./2026');

function Te(t, u) {
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

function xe(t) {
  for (var l = 1; l < arguments.length; l++) {
    var f = null != arguments[l] ? arguments[l] : {};
    if (l % 2)
      Te(Object(f), true).forEach(function (l) {
        module50.default(t, l, f[l]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      Te(Object(f)).forEach(function (u) {
        Object.defineProperty(t, u, Object.getOwnPropertyDescriptor(f, u));
      });
  }

  return t;
}

var module393 = require('./393'),
  module2027 = module393.isMiApp ? module12.View : require('./2027').default,
  Ve = {
    MainPage: module1972.default(module1515.default),
    ErrorDetailPageNew: module1972.default(module1825.default),
    BuyCompassPage: module1972.default(module1830.default),
    Setting: module1972.default(module1831.default),
    TimerPage: module1972.default(module1835.default),
    TimerSettingPage: module1972.default(module1841.default),
    HistoryPage: module1972.default(module1848.default),
    CleanRecordDetailPage: module1972.default(module1858.default),
    SuppliesPage: module1972.default(module1864.default),
    SupplyDetailPage: module1972.default(module1867.default),
    GuidePage: module1972.default(module1875.default),
    ContactUSPage: module1972.default(module1879.default),
    GuideDetailPage: module1972.default(module1876.default),
    NetInfoPage: module1972.default(module1885.default),
    SoundPackagePage: module1972.default(module1886.default),
    SyncTimezonePage: module1972.default(module1895.default),
    RobotSettingPage: module1972.default(module1896.default),
    MapEditForbiddenZonePage: module1972.default(module1958.default),
    MapEditZoneOrderPage: module1972.default(module1959.default),
    MapEditZoneModePage: module1972.default(module1960.default),
    MapEditZoneInfoPage: module1972.default(module1961.default),
    MapEditRotatePage: module1972.default(module1967.default),
    MapEditFurniturePage: module1972.default(module1969.default),
    MapEditGroundPage: module1972.default(module1970.default),
    MapEditFloorMaterialPage: module1972.default(module1971.default),
    WebViewPage: module1972.default(module1898.default),
    MapViewGotoPage: module1972.default(module1899.default),
    ObaInfoPage: module1972.default(module1902.default),
    UITestPage: module1972.default(module1903.default),
    MultiFloorPage: module1972.default(module1799.default),
    MonitorPage: module1972.default(module2027, true),
    MonitorErrorPage: module1972.default(module1907.default, false),
    RemoteControlPageNew: module1972.default(module1908.default),
    CameraSettingDetail: module1972.default(module1905.default),
    GesturePasswordPage: module1972.default(module1918.default),
    SecuritySettingPage: module1972.default(module1906.default),
    MapObjectPhotoPage: module1972.default(module1923.default),
    LogListPage: module1972.default(module416.LogListPage),
    LogDetailPage: module1972.default(module416.LogDetailPage),
    VideoCallSettingPage: module1972.default(module1937.default),
    CarpetCleanModeSetting: module1972.default(module1939.default),
    MapCarpetIgnorePage: module1972.default(module1940.default),
    MapCarpetInfoPage: module1972.default(module1941.default),
    StructureLightSetting: module1972.default(module1943.default),
    MultiFloorSwitch: module1972.default(module1944.default),
    DebugViewPage: module1972.default(module1949.default),
    FeedbackViewPage: module1972.default(module1950.default),
    ObstacleTypeSelection: module1972.default(module1953.default),
    PictureProcessingResultPage: module1972.default(module1956.default),
    DebugPage: module1972.default(module1973.default),
    CarpetCleanModeDebug: module1972.default(module1977.default),
    WiFiDebugPage: module1972.default(module1978.default),
    DustCollectionModeSetting: module1972.default(module1979.default),
    SmartScenePage: module1972.default(module1839.default),
    SmartCommandList: module1972.default(module2007.default),
    SmartCommandEditView: module1972.default(module2012.default),
    SmartCommandTimer: module1972.default(module2017.default),
    WashTowelSetting: module1972.default(module1980.default),
    WashTowelSettingNew: module1972.default(module1981.default),
    DraggableListDemo: module1972.default(module1985.default),
    SettingAirDryPage: module1972.default(module1988.default),
    MopModeCustomPage: module1972.default(module1504.default),
    MopModeListPage: module1972.default(module1990.default),
    MapARScanPage: module1972.default(module1991.default),
    MapARScanResultPage: module1972.default(module1999.default),
    EggPage: module1972.default(module2001.default),
    CarpetPressurizeSettingPage: module1972.default(module2004.default),
    DebugRemoteControlPage: module1972.default(module2005.default),
    SoundPackageInfoDebugPage: module1972.default(module2006.default),
    DebugConfigFileListPage: module1972.default(module2018.default),
    SelfCleaningSettingPage: module1972.default(module2019.default),
    ProductInformationPage: module1972.default(module2020.default),
    DebugDrySettingPage: module1972.default(module2022.default),
    DryTimeSettingPage: module1972.default(module2023.default),
    CleanEstimateInfoDebugPage: module1972.default(module2024.default),
    CustomDndPage: module1972.default(module2025.default),
    ChangeWaterDebugPage: module1972.default(module2026.default),
  };

exports.routes = Ve;
if (module393.isMiApp)
  exports.routes = Ve = xe(
    xe({}, Ve),
    {},
    {
      MoreSetting: module393.MoreSetting,
    }
  );
