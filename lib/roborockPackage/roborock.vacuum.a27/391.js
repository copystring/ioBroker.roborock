exports.RRFirmwareVersionCompare = function (n, t) {
  var o = n.split('.').join(),
    u = t.split('.').join();
  return o > u ? 1 : o == u ? 0 : -1;
};

exports.MIFirmwareVersionCompare = function (n, t) {
  var o,
    u,
    s = null != (o = n.split('[.-]+')) ? o : [],
    l = null != (u = t.split('[.-]+')) ? u : [];
  if (s.length != l.length) return 0;

  for (var f = 0; f < s.length; f++) {
    var h = s[f],
      c = l[f];
    if (h != c) return h > c ? 1 : -1;
  }

  return 0;
};

require('./392');

var regeneratorRuntime = require('regenerator-runtime'),
  module12 = require('./12'),
  module394 = require('./394'),
  module393 = require('./393'),
  module505 = require('./505').strings,
  module410 = require('./410'),
  h = 1,
  c = 2,
  p = function () {
    return module505.getResourceLanguageCode();
  };

function v() {
  return !module393.isMiApp && 'ios' != module12.Platform.OS;
}

var b = (Utils = {
  ScreenWidth: module12.Dimensions.get('window').width,
  ScreenHeight: module12.Dimensions.get('window').height,
  asyncDownloadFile: function (n, t) {
    return new Promise(function (o, u) {
      module393.downloadFile(n, t, function (s, l) {
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
      module393.readFile(n, function (u, s) {
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
      module393.callSmartHomeAPI(n, t, function (t) {
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
    return module393.basePath + n;
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

              if (n.supportedLanguages.includes(module505.getLanguage())) {
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
      f = s ** l,
      h = Math.round((f / 414) * n),
      c = Math.round((f / 414) * n);
    return 'ios' == module12.Platform.OS ? h : t ? c : n;
  },
  scaledPixelForPad: function (n, t) {
    var u = module12.Dimensions.get('window'),
      s = u.width,
      l = u.height,
      f = s ** l,
      h = f > 414 ? n : Math.round((f / 414) * n),
      c = f > 414 ? n : Math.round((f / 414) * n);
    return 'ios' == module12.Platform.OS ? h : t ? c : n;
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
      }[module393.deviceModel] || ''
    );
  },
  iphoneSafeareaTop: function () {
    var n;
    return 'iPhone14,7' == module393.systemInfo.mobileModel ||
      'iPhone14,8' == module393.systemInfo.mobileModel ||
      'iPhone15,2' == module393.systemInfo.mobileModel ||
      'iPhone15,3' == module393.systemInfo.mobileModel
      ? 59
      : (null == module393 ? undefined : null == (n = module393.iphoneSafeareaInsets) ? undefined : n.top) || 44;
  },
  isIphoneX: function () {
    return (
      'iPhone10,3' == module393.systemInfo.mobileModel ||
      'iPhone10,6' == module393.systemInfo.mobileModel ||
      'iPhone11,2' == module393.systemInfo.mobileModel ||
      'iPhone11,8' == module393.systemInfo.mobileModel ||
      'iPhone11,4' == module393.systemInfo.mobileModel ||
      'iPhone11,6' == module393.systemInfo.mobileModel ||
      'iPhone12,1' == module393.systemInfo.mobileModel ||
      'iPhone12,3' == module393.systemInfo.mobileModel ||
      'iPhone12,5' == module393.systemInfo.mobileModel ||
      'iPhone13,1' == module393.systemInfo.mobileModel ||
      'iPhone13,2' == module393.systemInfo.mobileModel ||
      'iPhone13,3' == module393.systemInfo.mobileModel ||
      'iPhone13,4' == module393.systemInfo.mobileModel ||
      'iPhone14,2' == module393.systemInfo.mobileModel ||
      'iPhone14,3' == module393.systemInfo.mobileModel ||
      'iPhone14,4' == module393.systemInfo.mobileModel ||
      'iPhone14,5' == module393.systemInfo.mobileModel ||
      module393.isIphoneXSeries()
    );
  },
  isShareUser: function () {
    return !module393.isOwner();
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
    var n = module12.Dimensions.get('window'),
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
    return module393.isMiApp ? 'MI_MDX_' + module410.version : 'RR_MDX_' + module410.version;
  },
  getAreaUnit: function () {
    var n = module394.default.sharedCache().areaUnitIndex;
    return n == h ? 'ft\xb2' : n == c ? module505.area_ping : '\u33a1';
  },
  getLengthUnit: function () {
    var n = module394.default.sharedCache().areaUnitIndex;
    return n == h ? 'ft' : n == c ? module505.length_rule : 'm';
  },
  getAreaUnitValue: function (n) {
    if (undefined == n) return '--';
    var t = this.areaConvert(n);
    return isNaN(t) ? '--' : t;
  },
  areaConvert: function (n) {
    var t = module394.default.sharedCache().areaUnitIndex,
      o = n;
    if (t == h) o = Math.round(10.7639104 * n);
    else if (t == c) o = Math.round(n / 3.3057);
    return o;
  },
  lengthConvert: function (n) {
    var t = module394.default.sharedCache().areaUnitIndex,
      o = n;
    if (t == h) o = 3.2808399 * n;
    else if (t == c) o = n / 0.3030303;
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
      for (var s = n.split(' '), l = 0, f = true, h = 0, c = '', p = 0; p < s.length; p++)
        if (l + s[p].length + 1 > t && !f) {
          if (++h >= 2) {
            o.push(c + '...');
            break;
          }

          if (1 == h && p == s.length - 1) {
            o.push(c);
            o.push(s[p]);
            break;
          }

          l = 0;
          o.push(c);
          c = s[p];
        } else {
          if ((f && 0 == h ? ((c = s[0]), (l = s[0].length)) : ((c = c + ' ' + s[p]), (l += s[p].length + 1)), p == s.length - 1)) {
            o.push(c);
            break;
          }

          if (f) f = false;
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
    return module393.isAutoTestSupported()
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
    return module393.isSpecSupported() ? escape(n) : n;
  },
  specDecode: function (n) {
    return module393.isSpecSupported() ? unescape(n) : n;
  },
  percentCalculate: function (n, t) {
    var o = n / 3600;
    if (o > t) return 0;
    var u = 100 * (1 - o / t);
    if (NaN == u) u = 1;
    return Math.ceil(u);
  },
  getDid: function () {
    return module393.isMiApp ? module393.deviceId : 1 == module393.iotType ? 'ty_' + module393.deviceId : 2 == module393.iotType ? 'rr_' + module393.deviceId : module393.deviceId;
  },
  getAppDisplayVersion: function () {
    return (
      module393.currentAppVersion() +
      '(' +
      ('ios' == module12.Platform.OS ? 'iOS' : 'Android') +
      ' ' +
      module12.Platform.Version +
      ('ios' == module12.Platform.OS ? ' - ' + module393.appBuildVersion() : '') +
      ')'
    );
  },
});
exports.default = b;
