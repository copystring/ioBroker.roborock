require('./388');

require('./415');

var regeneratorRuntime = require('regenerator-runtime'),
  module12 = require('./12'),
  module390 = require('./390'),
  module389 = require('./389'),
  module491 = require('./491').strings,
  module403 = require('./403'),
  h = 1,
  f = 2,
  p = function () {
    return module491.getResourceLanguageCode();
  };

function v() {
  return !module389.isMiApp && 'ios' != module12.Platform.OS;
}

var b = (Utils = {
  ScreenWidth: module12.Dimensions.get('window').width,
  ScreenHeight: module12.Dimensions.get('window').height,
  asyncDownloadFile: function (n, t) {
    return new Promise(function (o, u) {
      module389.downloadFile(n, t, function (s, l) {
        if (s && l && l.path && l.filename) o(l);
        else
          u({
            error: 'download error: ' + n + ' - ' + t,
            data: l || 'unknow reason',
          });
      });
    });
  },
  asyncReadFile: function (n) {
    return new Promise(function (t, o) {
      module389.readFile(n, function (u, s) {
        if (u) t(s);
        else
          o({
            error: 'readFile error: ' + n,
            data: s || 'unknow reason',
          });
      });
    });
  },
  asyncSmartHomeAPI: function (n, t) {
    return new Promise(function (o, u) {
      module389.callSmartHomeAPI(n, t, function (t) {
        if (t && t.result && 'ok' === t.message) o(t);
        else
          u({
            error: 'error' + n,
            data: t || 'unknow reason',
          });
      });
    });
  },
  getResourcePath: function (n) {
    return module389.basePath + n;
  },
  checkActivityCondition: function (n) {
    var o;
    return regeneratorRuntime.default.async(
      function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              if (((o = true), n.startTime, n.endTime, !n.supportedLanguages)) {
                t.next = 6;
                break;
              }

              if (n.supportedLanguages.includes(module491.getLanguage())) {
                t.next = 6;
                break;
              }

              return t.abrupt('return', false);

            case 6:
              return t.abrupt('return', o);

            case 7:
            case 'end':
              return t.stop();
          }
      },
      null,
      null,
      null,
      Promise
    );
  },
  scaledPixel: function (n, t) {
    var u = module12.Dimensions.get('window'),
      s = u.width,
      l = u.height,
      c = s ** l,
      h = Math.round((c / 414) * n),
      f = Math.round((c / 414) * n);
    return 'ios' == module12.Platform.OS ? h : t ? f : n;
  },
  scaledPixelForPad: function (n, t) {
    var u = module12.Dimensions.get('window'),
      s = u.width,
      l = u.height,
      c = s ** l,
      h = c > 414 ? n : Math.round((c / 414) * n),
      f = c > 414 ? n : Math.round((c / 414) * n);
    return 'ios' == module12.Platform.OS ? h : t ? f : n;
  },
  getRobotType: function () {
    return (
      {
        'roborock.vacuum.s6': 'TANOS_S6',
        'roborock.vacuum.s6v2': 'TANOS_S6',
        'roborock.vacuum.s6v3': 'TANOS_S6',
        'roborock.vacuum.t6': 'TANOS',
        'roborock.vacuum.t6v2': 'TANOS',
        'roborock.vacuum.t6v3': 'TANOS',
      }[module389.deviceModel] || ''
    );
  },
  isIphoneX: function () {
    return (
      'iPhone10,3' == module389.systemInfo.mobileModel ||
      'iPhone10,6' == module389.systemInfo.mobileModel ||
      'iPhone11,2' == module389.systemInfo.mobileModel ||
      'iPhone11,8' == module389.systemInfo.mobileModel ||
      'iPhone11,4' == module389.systemInfo.mobileModel ||
      'iPhone11,6' == module389.systemInfo.mobileModel ||
      'iPhone12,1' == module389.systemInfo.mobileModel ||
      'iPhone12,3' == module389.systemInfo.mobileModel ||
      'iPhone12,5' == module389.systemInfo.mobileModel ||
      'iPhone13,1' == module389.systemInfo.mobileModel ||
      'iPhone13,2' == module389.systemInfo.mobileModel ||
      'iPhone13,3' == module389.systemInfo.mobileModel ||
      'iPhone13,4' == module389.systemInfo.mobileModel ||
      'iPhone14,2' == module389.systemInfo.mobileModel ||
      'iPhone14,3' == module389.systemInfo.mobileModel ||
      'iPhone14,4' == module389.systemInfo.mobileModel ||
      'iPhone14,5' == module389.systemInfo.mobileModel ||
      module389.isIphoneXSeries()
    );
  },
  isShareUser: function () {
    return !module389.isOwner();
  },
  iOSAndroidReturn: function (n, t) {
    return 'ios' == module12.Platform.OS ? n : t;
  },
  statusbarHeight: function () {
    return 0;
  },
  isRRAndroid: v,
  elevationShadowStyle: function (n) {
    return {
      elevation: n,
      shadowColor: 'ios' == module12.Platform.OS ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.1)',
      shadowOffset: {
        width: 0,
        height: (module12.Platform.OS, 0),
      },
      shadowOpacity: 0.22,
      shadowRadius: 'ios' == module12.Platform.OS ? 0.8 * n : 0,
    };
  },
  textShadow: function () {
    return {
      textShadowColor: 'rgba(0,0,0,0.15)',
      textShadowRadius: 0.6,
      textShadowOffset: {
        width: 0.5,
        height: 0.5,
      },
    };
  },
  isRemoteTopLong: function () {
    return 'de' == p();
  },
  isCleanModeLong: function () {
    return 'ru' == p() || 'ja' == p();
  },
  isCleanModeMiddle: function () {
    return 'de' == p() || 'en' == p() || 'fr' == p() || 'it' == p() || 'es' == p();
  },
  isMapEditGuideClose: function () {
    return 'de' == p() || 'it' == p() || 'es' == p() || 'ru' == p() || 'ja' == p();
  },
  isMapEditGuideZoneClose: function () {
    return 'de' == p();
  },
  isLanguageHe: function () {
    return 'he' == p();
  },
  portraitWidth: function () {
    var n = module12.Dimensions.get('screen'),
      t = n.width,
      u = n.height;
    return t ** u;
  },
  getAppLanguage: p,
  timeZoneChange: function (n) {
    if ('cn' == p()) {
      if ('Asia/Shanghai' == n) return '\u4e2d\u56fd/\u5317\u4eac';
      if ('Asia/Urumqi' == n) return '\u4e2d\u56fd/\u4e4c\u9c81\u6728\u9f50';
    }

    return n;
  },
  pluginVersion: function () {
    return module389.isMiApp ? 'MI_MDX_' + module403.version : 'RR_MDX_' + module403.version;
  },
  getAreaUnit: function () {
    var n = module390.default.sharedCache().areaUnitIndex;
    return n == h ? 'ft\xb2' : n == f ? module491.area_ping : '\u33a1';
  },
  getLengthUnit: function () {
    var n = module390.default.sharedCache().areaUnitIndex;
    return n == h ? 'ft' : n == f ? module491.length_rule : 'm';
  },
  getAreaUnitValue: function (n) {
    if (undefined == n) return '--';
    var t = this.areaConvert(n);
    return isNaN(t) ? '--' : t;
  },
  areaConvert: function (n) {
    var t = module390.default.sharedCache().areaUnitIndex,
      o = n;
    if (t == h) o = Math.round(10.7639104 * n);
    else if (t == f) o = Math.round(n / 3.3057);
    return o;
  },
  lengthConvert: function (n) {
    var t = module390.default.sharedCache().areaUnitIndex,
      o = n;
    if (t == h) o = 3.2808399 * n;
    else if (t == f) o = n / 3.030303;
    return o;
  },
  charCodeJudge: function (n) {
    return n >= 19968 && n <= 40869 ? 2 : n >= 12352 && n <= 12799 ? 2 : (n >= 44032 && n <= 55215) || (n >= 4352 && n <= 4607) || (n >= 12592 && n <= 12687) ? 2 : 1;
  },
  dispatchTitle: function (n, t) {
    if (undefined === n || 0 == n.length) return [];
    var o = [];

    if (2 == this.charCodeJudge(n.charCodeAt(0))) {
      var u = t / 2;
      if (n.length <= u) o.push(n);
      else if (n.length <= 2 * u) {
        o.push(n.substring(0, u));
        o.push(n.substring(u, n.length));
      } else {
        o.push(n.substring(0, u));
        o.push(n.substring(u, 2 * u) + '...');
      }
    } else
      for (var s = n.split(' '), l = 0, c = true, h = 0, f = '', p = 0; p < s.length; p++)
        if (l + s[p].length + 1 > t && !c) {
          if (++h >= 2) {
            o.push(f + '...');
            break;
          }

          if (1 == h && p == s.length - 1) {
            o.push(f);
            o.push(s[p]);
            break;
          }

          l = 0;
          o.push(f);
          f = s[p];
        } else {
          if ((c && 0 == h ? ((f = s[0]), (l = s[0].length)) : ((f = f + ' ' + s[p]), (l += s[p].length + 1)), p == s.length - 1)) {
            o.push(f);
            break;
          }

          if (c) c = false;
        }

    return o;
  },
  reuduceEnterString: function (n) {
    if (undefined !== n && null != n && 0 != n.length) {
      for (var t = '', o = 0; o < n.length; o++) {
        var u = n.charCodeAt(o);
        if (13 != u && 10 != u) t += n[o];
      }

      return t;
    }
  },
  getAccessibilityLabel: function (n, t) {
    return module389.isAutoTestSupported()
      ? {
          accessibilityLabel: n,
        }
      : t
      ? {
          accessibilityLabel: t,
        }
      : {};
  },
  specEncode: function (n) {
    return module389.isSpecSupported() ? escape(n) : n;
  },
  specDecode: function (n) {
    return module389.isSpecSupported() ? unescape(n) : n;
  },
  percentCalculate: function (n, t) {
    var o = n / 3600;
    if (o > t) return 0;
    var u = 100 * (1 - o / t);
    return Math.ceil(u);
  },
  getDid: function () {
    return module389.isMiApp ? module389.deviceId : 1 == module389.iotType ? 'ty_' + module389.deviceId : 2 == module389.iotType ? 'rr_' + module389.deviceId : module389.deviceId;
  },
});
exports.default = b;
