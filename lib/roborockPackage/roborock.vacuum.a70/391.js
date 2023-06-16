exports.RRFirmwareVersionCompare = function (n, o) {
  var t = n.split('.').join(),
    s = o.split('.').join();
  return t > s ? 1 : t == s ? 0 : -1;
};

exports.MIFirmwareVersionCompare = function (n, o) {
  var t,
    s,
    u = null != (t = n.split('[.-]+')) ? t : [],
    l = null != (s = o.split('[.-]+')) ? s : [];
  if (u.length != l.length) return 0;

  for (var h = 0; h < u.length; h++) {
    var f = u[h],
      c = l[h];
    if (f != c) return f > c ? 1 : -1;
  }

  return 0;
};

require('./392');

var regeneratorRuntime = require('regenerator-runtime'),
  module13 = require('./13'),
  module394 = require('./394'),
  module393 = require('./393'),
  module510 = require('./510').strings,
  module410 = require('./410'),
  f = 1,
  c = 2,
  p = function () {
    return module510.getResourceLanguageCode();
  };

function v() {
  return !module393.isMiApp && 'ios' != module13.Platform.OS;
}

var b = (Utils = {
  ScreenWidth: module13.Dimensions.get('window').width,
  ScreenHeight: module13.Dimensions.get('window').height,
  asyncDownloadFile: function (n, o) {
    return new Promise(function (t, s) {
      module393.downloadFile(n, o, function (u, l) {
        if (u && l && l.path && l.filename) t(l);
        else
          s({
            error: 'download error: ' + n + ' - ' + o,
            data: l || 'unknow reason',
          });
      });
    });
  },
  asyncReadFile: function (n) {
    return new Promise(function (o, t) {
      module393.readFile(n, function (s, u) {
        if (s) o(u);
        else
          t({
            error: 'readFile error: ' + n,
            data: u || 'unknow reason',
          });
      });
    });
  },
  asyncSmartHomeAPI: function (n, o) {
    return new Promise(function (t, s) {
      module393.callSmartHomeAPI(n, o, function (o) {
        if (o && o.result && 'ok' === o.message) t(o);
        else
          s({
            error: 'error' + n,
            data: o || 'unknow reason',
          });
      });
    });
  },
  getResourcePath: function (n) {
    return module393.basePath + n;
  },
  checkActivityCondition: function (n) {
    var t;
    return regeneratorRuntime.default.async(
      function (o) {
        for (;;)
          switch ((o.prev = o.next)) {
            case 0:
              if (((t = true), n.startTime, n.endTime, !n.supportedLanguages)) {
                o.next = 6;
                break;
              }

              if (n.supportedLanguages.includes(module510.getLanguage())) {
                o.next = 6;
                break;
              }

              return o.abrupt('return', false);

            case 6:
              return o.abrupt('return', t);

            case 7:
            case 'end':
              return o.stop();
          }
      },
      null,
      null,
      null,
      Promise
    );
  },
  scaledPixel: function (n, o) {
    var s = module13.Dimensions.get('window'),
      u = s.width,
      l = s.height,
      h = u ** l,
      f = Math.round((h / 414) * n),
      c = Math.round((h / 414) * n);
    return 'ios' == module13.Platform.OS ? f : o ? c : n;
  },
  scaledPixelForPad: function (n, o) {
    var s = module13.Dimensions.get('window'),
      u = s.width,
      l = s.height,
      h = u ** l,
      f = h > 414 ? n : Math.round((h / 414) * n),
      c = h > 414 ? n : Math.round((h / 414) * n);
    return 'ios' == module13.Platform.OS ? f : o ? c : n;
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
  isIphone14Series: function () {
    return (
      'iPhone14,7' == module393.systemInfo.mobileModel ||
      'iPhone14,8' == module393.systemInfo.mobileModel ||
      'iPhone15,2' == module393.systemInfo.mobileModel ||
      'iPhone15,3' == module393.systemInfo.mobileModel
    );
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
  isIpad: function () {
    var n = module13.Dimensions.get('window'),
      o = n.height,
      s = n.width;
    if ('android' == module13.Platform.OS) return false;
    var u = o > s;
    return u ? s >= 768 : !u && o >= 768;
  },
  isShareUser: function () {
    return !module393.isOwner();
  },
  iOSAndroidReturn: function (n, o) {
    return 'ios' == module13.Platform.OS ? n : o;
  },
  statusbarHeight: function (n) {
    return n && v() ? module13.StatusBar.currentHeight : 0;
  },
  isRRAndroid: v,
  elevationShadowStyle: function (n) {
    return {
      elevation: n,
      shadowColor: 'ios' == module13.Platform.OS ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.1)',
      shadowOffset: {
        width: 0,
        height: (module13.Platform.OS, 0),
      },
      shadowOpacity: 0.22,
      shadowRadius: 'ios' == module13.Platform.OS ? 0.8 * n : 0,
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
    var n = module13.Dimensions.get('window'),
      o = n.width,
      s = n.height;
    return o ** s;
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
    return n == f ? 'ft\xb2' : n == c ? module510.area_ping : '\u33a1';
  },
  getLengthUnit: function () {
    var n = module394.default.sharedCache().areaUnitIndex;
    return n == f ? 'ft' : n == c ? module510.length_rule : 'm';
  },
  getAreaUnitValue: function (n) {
    if (undefined == n) return '--';
    var o = this.areaConvert(n);
    return isNaN(o) ? '--' : o;
  },
  areaConvert: function (n) {
    var o = module394.default.sharedCache().areaUnitIndex,
      t = n;
    if (o == f) t = Math.round(10.7639104 * n);
    else if (o == c) t = Math.round(n / 3.3057);
    return t;
  },
  lengthConvert: function (n) {
    var o = module394.default.sharedCache().areaUnitIndex,
      t = n;
    if (o == f) t = 3.2808399 * n;
    else if (o == c) t = n / 0.3030303;
    return t;
  },
  charCodeJudge: function (n) {
    return n >= 19968 && n <= 40869 ? 2 : n >= 12352 && n <= 12799 ? 2 : (n >= 44032 && n <= 55215) || (n >= 4352 && n <= 4607) || (n >= 12592 && n <= 12687) ? 2 : 1;
  },
  dispatchTitle: function (n, o) {
    if (undefined === n || 0 == n.length) return [];
    var t = [];

    if (2 == this.charCodeJudge(n.charCodeAt(0))) {
      var s = o / 2;
      if (n.length <= s) t.push(n);
      else if (n.length <= 2 * s) {
        t.push(n.substring(0, s));
        t.push(n.substring(s, n.length));
      } else {
        t.push(n.substring(0, s));
        t.push(n.substring(s, 2 * s) + '...');
      }
    } else
      for (var u = n.split(' '), l = 0, h = true, f = 0, c = '', p = 0; p < u.length; p++)
        if (l + u[p].length + 1 > o && !h) {
          if (++f >= 2) {
            t.push(c + '...');
            break;
          }

          if (1 == f && p == u.length - 1) {
            t.push(c);
            t.push(u[p]);
            break;
          }

          l = 0;
          t.push(c);
          c = u[p];
        } else {
          if ((h && 0 == f ? ((c = u[0]), (l = u[0].length)) : ((c = c + ' ' + u[p]), (l += u[p].length + 1)), p == u.length - 1)) {
            t.push(c);
            break;
          }

          if (h) h = false;
        }

    return t;
  },
  reuduceEnterString: function (n) {
    if (undefined !== n && null != n && 0 != n.length) {
      for (var o = '', t = 0; t < n.length; t++) {
        var s = n.charCodeAt(t);
        if (13 != s && 10 != s) o += n[t];
      }

      return o;
    }
  },
  getAccessibilityLabel: function (n, o) {
    return module393.isAutoTestSupported()
      ? {
          accessibilityLabel: n,
        }
      : o
      ? {
          accessibilityLabel: o,
        }
      : {};
  },
  specEncode: function (n) {
    return module393.isSpecSupported() ? escape(n) : n;
  },
  specDecode: function (n) {
    return module393.isSpecSupported() ? unescape(n) : n;
  },
  percentCalculate: function (n, o) {
    var t = n / 3600;
    if (t > o) return 0;
    var s = 100 * (1 - t / o);
    if (NaN == s) s = 1;
    return Math.ceil(s);
  },
  getDid: function () {
    return module393.isMiApp ? module393.deviceId : 1 == module393.iotType ? 'ty_' + module393.deviceId : 2 == module393.iotType ? 'rr_' + module393.deviceId : module393.deviceId;
  },
  getAppDisplayVersion: function () {
    return (
      module393.currentAppVersion() +
      '(' +
      ('ios' == module13.Platform.OS ? 'iOS' : 'Android') +
      ' ' +
      module13.Platform.Version +
      ('ios' == module13.Platform.OS ? ' - ' + module393.appBuildVersion() : '') +
      ')'
    );
  },
});
exports.default = b;
