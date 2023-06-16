var regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module389 = require('./389'),
  module512 = require('./512'),
  module12 = require('./12'),
  module381 = require('./381'),
  module414 = require('./414');

function D(t, n) {
  var s;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (s = T(t)) || (n && t && 'number' == typeof t.length)) {
      if (s) t = s;
      var o = 0;
      return function () {
        return o >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[o++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (s = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(s);
}

function T(t, n) {
  if (t) {
    if ('string' == typeof t) return S(t, n);
    var s = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === s && t.constructor) s = t.constructor.name;
    return 'Map' === s || 'Set' === s ? Array.from(t) : 'Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? S(t, n) : undefined;
  }
}

function S(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var s = 0, o = new Array(n); s < n; s++) o[s] = t[s];

  return o;
}

require('./500').strings;

var module393 = require('./393'),
  O = (function () {
    function t() {
      module4.default(this, t);
      console.debug('Stat::constructor');
      this._statItems = new Map();
      this._pendingItemsIndexedByTag = new Map();
      this._allPendingItems = new Set();
      this._notReadyForSendingItems = new Set();
      this._enterPluginTimestamp = NaN;
      this._counter = 0;
      this._timer = -1;
      this._loaded = false;
    }

    module5.default(t, null, [
      {
        key: 'getInstance',
        value: function () {
          return t._instance;
        },
      },
    ]);
    module5.default(
      t,
      [
        {
          key: '_stat',
          value: function (n, s, o, I) {
            var _ = t._makeKey(n, s),
              u = {
                id: n,
                ts: s,
                type: o,
                data: I,
              };

            console.log('Stat::_stat [%s]: %s', _, JSON.stringify(u));

            this._statItems.set(_, u);

            this._save();

            return _;
          },
        },
        {
          key: '_isStatInfoEmpty',
          value: function () {
            return 0 == this._statItems.size && 0 == this._allPendingItems.size && this._loaded;
          },
        },
        {
          key: '_startTimer',
          value: function () {
            var n = this;
            this._timer = setTimeout(function () {
              n._timer = -1;

              n._sendStatInfoToDevice();

              if (!n._isStatInfoEmpty()) n._startTimer();
            }, t.SEND_MSG_INTERVAL);
          },
        },
        {
          key: '_stopTimer',
          value: function () {
            clearTimeout(this._timer);
            this._timer = -1;
          },
        },
        {
          key: '_save',
          value: function () {
            console.debug('Stat::_save');

            if (this._loaded) {
              json = JSON.stringify(Array.from(this._statItems.entries()));
              module512.saveStat(json);
            } else console.debug('Stat::_save: loading in progress, and ignore save command against overwriting old data...');
          },
        },
        {
          key: '_load',
          value: function () {
            var t = this;
            console.debug('Stat::_load');
            module512.readStat(function (n) {
              try {
                new Map(JSON.parse(n)).forEach(function (n, s, o) {
                  t._statItems.set(s, n);
                });
              } catch (t) {
                console.error('Stat::_load error=%s', t);
              }

              t._loaded = true;
            });
            setTimeout(function () {
              t._loaded = true;
            }, 2e3);
          },
        },
        {
          key: '_sendStatInfoToDevice',
          value: function () {
            var o,
              I,
              u,
              l,
              E,
              T,
              S,
              p,
              O,
              f,
              A,
              N,
              h,
              R,
              y,
              b,
              v,
              M = this;
            return regeneratorRuntime.default.async(
              function (L) {
                for (;;)
                  switch ((L.prev = L.next)) {
                    case 0:
                      if (((o = 768), 'AppStat' in module389.Methods != false)) {
                        L.next = 5;
                        break;
                      }

                      this._statItems.clear();

                      console.debug('device not support app_stat');
                      return L.abrupt('return');

                    case 5:
                      if (0 != this._statItems.size) {
                        L.next = 8;
                        break;
                      }

                      console.debug('stat items empty');
                      return L.abrupt('return');

                    case 8:
                      this._counter = this._counter + 1;
                      I = this._counter;
                      u = {
                        type: t.TYPE0,
                        data: [],
                      };
                      l = {
                        type: t.TYPE1,
                        data: [],
                      };
                      E = {
                        type: t.TYPE2,
                        data: null,
                        times: [],
                      };
                      T = o - 128;
                      S = new Map();

                      this._pendingItemsIndexedByTag.set(I, new Set());

                      p = D(this._statItems);

                    case 17:
                      if ((O = p()).done) {
                        L.next = 54;
                        break;
                      }

                      if (((f = O.value), (A = module23.default(f, 2)), (N = A[0]), (h = A[1]), !this._allPendingItems.has(N))) {
                        L.next = 25;
                        break;
                      }

                      console.debug('Stat::%s is in pending state', N);
                      return L.abrupt('continue', 52);

                    case 25:
                      if (!this._notReadyForSendingItems.has(N)) {
                        L.next = 28;
                        break;
                      }

                      console.debug('Stat::%s is not ready for sending', N);
                      return L.abrupt('continue', 52);

                    case 28:
                      if (h.type != t.TYPE0) {
                        L.next = 38;
                        break;
                      }

                      if (!(T < 16)) {
                        L.next = 32;
                        break;
                      }

                      console.debug('Stat::_sendStatInfoToDevice: no more buffer');
                      return L.abrupt('break', 54);

                    case 32:
                      T -= 16;
                      if (S.has(h.id)) S.get(h.id).times.push(h.ts);
                      else {
                        R = {
                          id: h.id,
                          times: [h.ts],
                        };
                        u.data.push(R);
                        S.set(R.id, R);
                      }

                      this._pendingItemsIndexedByTag.get(I).add(N);

                      this._allPendingItems.add(N);

                      L.next = 52;
                      break;

                    case 38:
                      if (h.type != t.TYPE1) {
                        L.next = 48;
                        break;
                      }

                      if (!(T < 16)) {
                        L.next = 42;
                        break;
                      }

                      console.debug('Stat::_sendStatInfoToDevice: no more buffer');
                      return L.abrupt('break', 54);

                    case 42:
                      T -= 16;
                      if (S.has(h.id)) S.get(h.id).durations.push([h.data, h.ts]);
                      else {
                        y = {
                          id: h.id,
                          durations: [[h.data, h.ts]],
                        };
                        l.data.push(y);
                        S.set(y.id, y);
                      }

                      this._pendingItemsIndexedByTag.get(I).add(N);

                      this._allPendingItems.add(N);

                      L.next = 52;
                      break;

                    case 48:
                      if (!(T < 256)) {
                        L.next = 51;
                        break;
                      }

                      console.debug('Stat::_sendStatInfoToDevice: no more buffer');
                      return L.abrupt('break', 54);

                    case 51:
                      if (null === E.data || t._infoEqual(E.data, h.data)) {
                        if (null === E.data) {
                          E.data = h.data;
                          T -= 256;
                        }

                        E.times.push(h.ts);
                        T -= 16;

                        this._pendingItemsIndexedByTag.get(I).add(N);

                        this._allPendingItems.add(N);
                      }

                    case 52:
                      L.next = 17;
                      break;

                    case 54:
                      b = {
                        ver: t.MSG_VER,
                        data: [],
                      };
                      if (u.data.length > 0) b.data.push(u);
                      if (l.data.length > 0) b.data.push(l);
                      if (E.times.length > 0) b.data.push(E);
                      console.log('Stat::_sendStatInfoToDevice: call rpc: tag=%s, param=%s', I, JSON.stringify(b));
                      L.prev = 59;
                      L.next = 62;
                      return regeneratorRuntime.default.awrap(module414.default.appStat(b));

                    case 62:
                      v = L.sent;
                      console.log('Stat::app_stat rpc OK: tag=%s res=%s', I, JSON.stringify(v));

                      this._pendingItemsIndexedByTag.get(I).forEach(function (t, n, s) {
                        M._statItems.delete(t);

                        M._allPendingItems.delete(t);
                      });

                      this._save();

                      L.next = 72;
                      break;

                    case 68:
                      L.prev = 68;
                      L.t0 = L.catch(59);
                      console.log('Stat::app_stat rpc Error: tag=%s', I);

                      this._pendingItemsIndexedByTag.get(I).forEach(function (t, n, s) {
                        M._allPendingItems.delete(t);
                      });

                    case 72:
                      this._pendingItemsIndexedByTag.delete(I);

                    case 73:
                    case 'end':
                      return L.stop();
                  }
              },
              null,
              this,
              [[59, 68]],
              Promise
            );
          },
        },
        {
          key: '_statEnterPlugin',
          value: function (n) {
            var s = {
                mobileBrand: '*',
                mobileModel: module393.systemInfo.mobileModel,
                os: module12.Platform.OS,
                osVersion: module12.Platform.Version.toString(),
                pluginVersion: module393.pluginVersion.toString(),
                language: 'ios' === module12.Platform.OS ? module12.NativeModules.SettingsManager.settings.AppleLocale : module12.NativeModules.I18nManager.localeIdentifier,
                region: module381.RobotStatusManager.sharedManager().timeZone || '*',
                mcc: module393.MCC || '*',
                mnc: '*',
                appType: module393.isMiApp ? 'mi' : 'roborock',
              },
              o = this._stat(t.ID_PLUGINENTER, this._enterPluginTimestamp, t.TYPE2, s);

            if (n) this._notReadyForSendingItems.delete(o);
            else this._notReadyForSendingItems.add(o);
          },
        },
        {
          key: 'enterPlugin',
          value: function () {
            this._enterPluginTimestamp = t._utc();

            this._load();

            this._statEnterPlugin(false);
          },
        },
        {
          key: 'exitPlugin',
          value: function () {
            if (isNaN(this._enterPluginTimestamp)) console.warn('cannot stat plugin usage time due to entering plugin event lost');
            else {
              var n = t._utc() - this._enterPluginTimestamp;

              this._stat(t.ID_TIMEONPLUGIN, t._utc(), t.TYPE1, n);

              this._stopTimer();
            }
          },
        },
        {
          key: 'type0',
          value: function (n) {
            this._stat(n, t._utc(), t.TYPE0);
          },
        },
        {
          key: 'sendStatToVacuum',
          value: function () {
            var t = this;
            setTimeout(function () {
              t._statEnterPlugin(true);
            }, 5e3);

            this._startTimer();
          },
        },
      ],
      [
        {
          key: '_utc',
          value: function () {
            return Math.round(new Date().getTime() / 1e3);
          },
        },
        {
          key: '_makeKey',
          value: function (t, n) {
            return t + '##' + n;
          },
        },
        {
          key: '_infoEqual',
          value: function (t, n) {
            return (
              !(!t || !n) &&
              t.mobileBrand === n.mobileBrand &&
              t.mobileModel === n.mobileModel &&
              t.os === n.os &&
              t.osVersion === n.osVersion &&
              t.pluginVersion === n.pluginVersion &&
              t.language === n.language &&
              t.region === n.region &&
              t.mcc === n.mcc &&
              t.mnc === n.mnc &&
              t.appType === n.appType
            );
          },
        },
      ]
    );
    return t;
  })();

exports.default = O;
O._instance = new O();
O.ID_INVALID = -1;
O.ID_PLUGINENTER = 1;
O.ID_VIDEOSUMMARY = 1e4;
O.ID_VIDEOQUICKSTART = 10001;
O.ID_VIDEOHOWTOUSEMOP = 10002;
O.ID_VIDEOHOWTOWORK = 10003;
O.ID_VIDEOHOWTOCLEANDUSTBIN = 10004;
O.ID_VIDEOVIRTUALWALLGUIDE = 10005;
O.ID_VIDEODAILYMAINTENANCE = 10006;
O.ID_MAINTENANCEINDEX = 10100;
O.ID_MAINTENANCEMAINBRUSH = 10101;
O.ID_MAINTENANCESIDEBURSH = 10102;
O.ID_MAINTENANCEWATERBOX = 10103;
O.ID_MAINTENANCEFILTER = 10104;
O.ID_MAINTENANCESENSOR = 10105;
O.ID_STRAINERHOARE = 10106;
O.ID_MOPROLLER = 10107;
O.ID_SHARETOUNKNOWN = 10200;
O.ID_SHARETOWEIXIN = 10201;
O.ID_SHARETOMOMENTS = 10202;
O.ID_SHARETOWEIBO = 10203;
O.ID_SHARETOFACEBOOK = 10204;
O.ID_SHARETOLINE = 10205;
O.ID_SHARETOSTORAGE = 10206;
O.ID_NOTIFICATIONON = 10300;
O.ID_NOTIFICATIONOFF = 10301;
O.ID_SETTINGCLICKED = 10400;
O.ID_FINDME = 10401;
O.ID_CLEANRECORDLIST = 10402;
O.ID_CLEANRECORDDETAIL = 10403;
O.ID_MAPSHOWN = 10404;
O.ID_COREDUMP = 10405;
O.ID_USERGUIDELIST = 10500;
O.ID_USERGUIDEPRODUCTINFO = 10501;
O.ID_USERGUIDEKNOWYOURROBOT = 10502;
O.ID_USERGUIDEQUICKSTART = 10503;
O.ID_USERGUIDEHOWTOUSEMOP = 10504;
O.ID_USERGUIDEHOWTOWORK = 10505;
O.ID_USERGUIDECLEANDUSTBINFILTER = 10506;
O.ID_USERGUIDEWHATISVIRTUALWALL = 10507;
O.ID_USERGUIDEDAILYMAINTENANCE = 10508;
O.ID_USERGUIDEDEALMALFUNCTION = 10509;
O.ID_USERGUIDECONTACTSERVICE = 10510;
O.ID_MULTIFLOORCREATENEWMAP = 10600;
O.ID_MULTIFLOORCHANGEMAP = 10601;
O.ID_MULTIFLOORMAPMANAGERCHANGEMAP = 10602;
O.ID_REALVIDEO_ON = 10700;
O.ID_REALVIDEO_OFF = 10701;
O.ID_REALVIDEO_DEFINITION_LD = 10702;
O.ID_REALVIDEO_DEFINITION_HD = 10703;
O.ID_REALVIDEO_UPDATEPASSWORD = 10704;
O.ID_REALVIDEO_FORGETPASSWORD = 10705;
O.ID_REALVIDEO_CLEAN_BUTTON = 10706;
O.ID_REALVIDEO_RECHARD_BUTTON = 10707;
O.ID_REALVIDEO_CALLING_ERROR = 10708;
O.ID_REALVIDEO_CALLING_TIMEOUT = 10709;
O.ID_REALVIDEO_FRAME_STUCK = 10710;
O.ID_TIMEONPLUGIN = 2e4;
O.SEND_MSG_INTERVAL = 5e3;
O.MSG_VER = '0.1';
O.TYPE0 = 0;
O.TYPE1 = 1;
O.TYPE2 = 2;
