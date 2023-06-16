var module50 = require('./50'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module415 = require('./415'),
  module419 = require('./419'),
  module12 = require('./12'),
  module390 = require('./390'),
  module381 = require('./381'),
  module417 = require('./417'),
  module391 = require('./391'),
  module515 = require('./515'),
  module1055 = require('./1055'),
  module423 = require('./423'),
  module394 = require('./394'),
  module1404 = require('./1404'),
  module1401 = require('./1401'),
  module1406 = require('./1406'),
  module395 = require('./395');

function I(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function C(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      I(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      I(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function F(t, n) {
  var o;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (o = _(t)) || (n && t && 'number' == typeof t.length)) {
      if (o) t = o;
      var s = 0;
      return function () {
        return s >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[s++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (o = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(o);
}

function _(t, n) {
  if (t) {
    if ('string' == typeof t) return T(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? T(t, n) : undefined;
  }
}

function T(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, s = new Array(n); o < n; o++) s[o] = t[o];

  return s;
}

var E = null,
  module393 = require('./393'),
  base64js = require('base64-js'),
  module411 = require('./411').JsExecutor,
  module505 = require('./505').strings;

exports.CurrentMapId = -1;

var A = module393.isMiApp ? 1500 : 1200,
  q = (function () {
    function t() {
      var n = this;
      module4.default(this, t);

      if (!E) {
        this.lastUpdateTime = 0;
        this.lastMapRequestHasHandled = true;
        this.customCleanModes = [];
        this.isStopedByStatus = false;
        this.shouldForceStart = false;
        this.isStopedBySettingPage = false;
        this.roomNameMapping = null;
        this.roomNameList = null;
        this.allServerNames = null;
        this.mapCountMax = 2;
        this.maps = [];
        this.cleanSequence = [];
        this.mapRotateAngle = {};
        this.MinDelayForRequestMap = 2;
        this.lastMinDelayForRequestMap = 2;
        this.mapRequestTotalCount = 0;
        this.zoneChanged = false;
        this.mapNonce = -1;
        this.dataInstMap = new Map();
        this.lastDiffTime = 0;
        this.diffReceiveSucTime = 0;
        this.mapDiffCount = 20;
        this.diffInfo = '';
        module12.DeviceEventEmitter.addListener(module419.NotificationKeys.DidReceiveSpecialEvent, function (t) {
          if (t.data == module419.EventKeys.MapSaveSwitchChanged) {
            n.getMultiMaps();
            if (!module381.RSM.mapSaveEnabled) n.clearMapData();
          }
        });
        module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (t) {
          n.AutoIdentifyRoomTag();
          n.checkMapCleanData();
        });
        this.getSapMapBeautifyFlag();
        E = this;
      }

      return E;
    }

    module5.default(
      t,
      [
        {
          key: '_getMap',
          value: function () {
            var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : -1,
              n = module390.default.isSupportIncrementalMap()
                ? {
                    nonce: t,
                  }
                : module393.isMiApp
                ? []
                : {};
            return new Promise(function (t, o) {
              module393.getMapData('get_map_v1', n, function (n, s) {
                if (n) t(s);
                else
                  o({
                    error: s || 'unknow reason',
                  });
              });
            });
          },
        },
        {
          key: '_getMapForSP',
          value: function () {
            return regeneratorRuntime.default.async(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      t.next = 2;
                      return regeneratorRuntime.default.awrap(module393.getMapBase64Data());

                    case 2:
                      return t.abrupt('return', t.sent);

                    case 3:
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
        },
        {
          key: 'enterEasterEggModel',
          value: function () {
            this.lastMinDelayForRequestMap = this.MinDelayForRequestMap;
            this.MinDelayForRequestMap = 1;
          },
        },
        {
          key: 'quitEasterEggModel',
          value: function () {
            this.MinDelayForRequestMap = this.lastMinDelayForRequestMap;
          },
        },
        {
          key: 'createJsExecutor',
          value: function (t) {
            var n = this,
              module1407 = require('./1407');

            module411
              .createJsExecutor(module1407)
              .then(function (o) {
                n.executor = o;
                if (t) t();
              })
              .catch(function (t) {
                console.log('initially create executor failed');
              });
          },
        },
        {
          key: 'clearMapData',
          value: function () {
            this._useMapResult({
              map: {
                image: '',
                width: 100,
                height: 100,
                left: 462,
                top: 462,
                isEmpty: true,
              },
              path: {
                points: [],
                num: 0,
              },
              carpetMap: {
                image: '',
                capCount: -1,
              },
            });

            module12.DeviceEventEmitter.emit(module419.NotificationKeys.MapDidUpdate);
          },
        },
        {
          key: 'checkMapCleanData',
          value: function () {
            var t, n;
            if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None && module390.default.isSupportIncrementalMap())
              (null == (t = this.mapData.blocks) ? undefined : null == (n = t.blocks) ? undefined : n.length) > 0 &&
                ((this.mapData.blocks = {}), module12.DeviceEventEmitter.emit(module419.NotificationKeys.MapDidUpdate));
          },
        },
        {
          key: 'getMap',
          value: function () {
            var t,
              n,
              o,
              l,
              c,
              p,
              f = this,
              h = arguments;
            return regeneratorRuntime.default.async(
              function (S) {
                for (;;)
                  switch ((S.prev = S.next)) {
                    case 0:
                      if (((t = h.length > 0 && undefined !== h[0] && h[0]), (n = h.length > 1 && undefined !== h[1] ? h[1] : -1), !module381.RSM.isLocating)) {
                        S.next = 4;
                        break;
                      }

                      return S.abrupt('return');

                    case 4:
                      if (
                        ((o = (new Date() - this.lastUpdateTime) / 1e3),
                        !(l = this.lastMapRequestHasHandled && (o >= this.MinDelayForRequestMap || !!t)) &&
                          this.lastMapRequestHasHandled &&
                          o >= 0.3 &&
                          this.forceGetMapNext &&
                          ((l = true), (this.forceGetMapNext = false)),
                        l)
                      ) {
                        S.next = 10;
                        break;
                      }

                      if (t && module393.isMiApp) this.forceGetMapNext = true;
                      return S.abrupt('return');

                    case 10:
                      if (
                        (this.mapRequestTotalCount++,
                        module393.isMiApp &&
                          module390.default.isLowFrequencyMapForMiSupported() &&
                          (this.mapRequestTotalCount >= 60 && (this.MinDelayForRequestMap = 3), this.mapRequestTotalCount >= 240 && (this.MinDelayForRequestMap = 4)),
                        this._setMapLog('getMap begin request map,lastUpdateTime ' + this.lastUpdateTime + ', timeInterval - ' + o + ', nonce = ' + n),
                        (this.lastMapRequestHasHandled = false),
                        (S.prev = 14),
                        (c = null),
                        (p = null),
                        !module423.DMM.isSapphirePlus)
                      ) {
                        S.next = 24;
                        break;
                      }

                      S.next = 19;
                      return regeneratorRuntime.default.awrap(this._getMapForSP());

                    case 19:
                      p = S.sent;
                      c = base64js.fromByteArray(p);
                      this.originBase64MapData = c;
                      S.next = 29;
                      break;

                    case 24:
                      S.next = 26;
                      return regeneratorRuntime.default.awrap(this._getMap(n));

                    case 26:
                      c = S.sent;
                      this.originBase64MapData = c;
                      p = base64js.toByteArray(c);

                    case 29:
                      if ((this._setMapLog('getMap Got mapData, will parse', module417.InfoColors.Success), this.executor)) {
                        S.next = 34;
                        break;
                      }

                      console.log('recreate a executor');
                      this.createJsExecutor(function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  t.next = 2;
                                  return regeneratorRuntime.default.awrap(f.getMap());

                                case 2:
                                case 'end':
                                  return t.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      });
                      return S.abrupt('return');

                    case 34:
                      this.executor
                        .execute('parse', c, globals.app.state.theme != module515.Themes.light, module423.DMM.isSapphirePlus, module394.MC.sapMapBeautify, globals.isEgg)
                        .then(function (t) {
                          var n = 'object' == typeof t ? t : JSON.parse(t);
                          f.parsedMapData = JSON.parse(JSON.stringify(n));
                          if (n && n.map && n.map.data)
                            module22.default(n.map.data, {
                              data: p,
                            });

                          f._useMapResult(n);
                        })
                        .catch(function (t, n) {
                          f._setMapLog('getMap js executor parse map failed  -' + t + ' - ' + n, module417.InfoColors.Fail);

                          f._dealMapGetFailed();
                        });
                      S.next = 41;
                      break;

                    case 37:
                      S.prev = 37;
                      S.t0 = S.catch(14);

                      this._dealMapGetFailed();

                      this._setMapLog('getMap  error: ' + ('object' == typeof S.t0 ? JSON.stringify(S.t0) : S.t0), module417.InfoColors.Fail);

                    case 41:
                    case 'end':
                      return S.stop();
                  }
              },
              null,
              this,
              [[14, 37]],
              Promise
            );
          },
        },
        {
          key: '_useMapResult',
          value: function (t) {
            if (!t.map || isNaN(t.map.width) || isNaN(t.map.height) || isNaN(t.map.top) || isNaN(t.map.left)) {
              this.lastUpdateTime = new Date().getTime();

              this._setMapLog('map is parsed failed, invalid map', module417.InfoColors.Fail);

              return void this._dealMapGetFailed();
            }

            t.charger = t.charger || null;
            t.target = t.target || {};
            t.pathGotoPlan = t.pathGotoPlan || {};
            t.fbzs = t.fbzs || {};
            t.mfbzs = t.mfbzs || {};
            t.walls = t.walls || {};
            t.clfbzs = t.clfbzs || {};
            t.cfbzs = t.cfbzs || {};
            t.smartZones = t.smartZones || {};
            t.customCarpet = t.customCarpet || {};
            t.dsfbz = t.dsfbz || {};
            if (module390.default.isSupportIncrementalMap()) this._parseInitDynamicData(t);
            else {
              if (!t.obstacles && t.obstaclesOld) t.obstacles = t.obstaclesOld;
              if (!t.ignoredObstacles && t.ignoredObstaclesOld) t.ignoredObstacles = t.ignoredObstaclesOld;
              t.zones = t.zones || {};
              t.mopPath = t.mopPath || {};
              t.enemies = t.enemies || {};
              t.stuckpts = t.stuckpts || {};
              t.clffbz = t.clffbz || {};
              t.smartds = t.smartds || {};
              t.floorMap = t.floorMap || {};
              t.furnitures = t.furnitures || {};
            }
            this.zoneChanged = this._checkZoneChanged(t);
            this.mapData = t;
            this.hasGetMap = true;
            if (t.carpetMap && t.carpetMap.capCount && t.carpetMap.capCount > 0) this.hasCarpetMap = true;
            module12.DeviceEventEmitter.emit(module419.NotificationKeys.MapDidUpdate);
            this.lastMapRequestHasHandled = true;
            this.lastUpdateTime = new Date().getTime();

            this._setMapLog('map is parsed successully,map did update', module417.InfoColors.Success);
          },
        },
        {
          key: '_dealMapGetFailed',
          value: function () {
            this.lastMapRequestHasHandled = true;
            module12.DeviceEventEmitter.emit(module419.NotificationKeys.MapDidUpdate);
          },
        },
        {
          key: '_checkZoneChanged',
          value: function (t) {
            var n, o, s;
            if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) return false;

            if (
              (null == t ? undefined : null == (n = t.map) ? undefined : n.colorData) &&
              (null == (o = this.mapData) ? undefined : null == (s = o.map) ? undefined : s.colorData)
            ) {
              var u = t.map.colorData.length;
              if (u != this.mapData.map.colorData.length) return true;

              for (var l = 0; l < u; l++) if (t.map.colorData[l] != this.mapData.map.colorData[l]) return true;
            }

            return false;
          },
        },
        {
          key: '_parseInitDynamicData',
          value: function (t) {
            var n, s, l, c, p, f, h, v, M, y, S, b, k;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      for (n = F(this.dataInstMap); !(s = n()).done; ) {
                        l = s.value;
                        c = module23.default(l, 2);
                        p = c[0];
                        if ((f = c[1]) && -1 != f.snapShot)
                          3 === p
                            ? ((t.mopPath = t.mopPath || {}),
                              (M = (null == (h = t.path) ? undefined : null == (v = h.points) ? undefined : v.length) || 0),
                              f.initData(t, f.snapShot, M))
                            : (y = module1055.MapDyTypeMap.get(p)) &&
                              ((S = module23.default(y, 2)),
                              (b = S[0]),
                              (k = S[1]),
                              b &&
                                k &&
                                (function () {
                                  var n = t[b] || {},
                                    o = 0;
                                  k.forEach(function (t) {
                                    var s;
                                    o += (n && (null == (s = n[t]) ? undefined : s.length)) || 0;
                                  });
                                  f.initData(n, f.snapShot, o);
                                })());
                      }

                    case 1:
                    case 'end':
                      return u.stop();
                  }
              },
              null,
              this,
              null,
              Promise
            );
          },
        },
        {
          key: 'parseMapSnapshot',
          value: function (t) {
            var n = this;

            if (t) {
              var o = Object.keys(t);
              if (!(o.length <= 0))
                o.forEach(function (o) {
                  o = parseInt(o);
                  if (!n.dataInstMap.has(o)) n.dataInstMap.set(o, new module1406.MapDataConfig(o));
                  var s = n.dataInstMap.get(o);
                  s.snapShot = t[o].nonce;
                  if (0 === s.maxAskLen && 'number' == typeof t[o].limit_len) s.maxAskLen = t[o].limit_len;
                });
            }
          },
        },
        {
          key: 'checkMapDiff',
          value: function () {
            var t,
              n,
              o,
              s,
              l,
              c = this;
            return regeneratorRuntime.default.async(
              function (f) {
                for (;;)
                  switch ((f.prev = f.next)) {
                    case 0:
                      if (-1 != this.mapNonce && this.lastMapRequestHasHandled) {
                        f.next = 2;
                        break;
                      }

                      return f.abrupt('return');

                    case 2:
                      if (!module393.isMiApp) {
                        f.next = 7;
                        break;
                      }

                      if (((t = (new Date().getTime() - this.lastDiffTime) / 1e3), this._setMapLog('checkMapDiff diff-begin currnetTime = ' + t), !(t < 1.4))) {
                        f.next = 7;
                        break;
                      }

                      return f.abrupt('return');

                    case 7:
                      f.prev = 7;
                      this.lastDiffTime = new Date().getTime();
                      f.next = 11;
                      return regeneratorRuntime.default.awrap(
                        module415.default.getMapDiffDynamic({
                          nonce: this.mapNonce,
                          round: new Date().getTime(),
                        })
                      );

                    case 11:
                      n = f.sent;
                      this.diffReceiveSucTime = new Date().getTime();
                      o = n.result;
                      s = false;
                      l = -1;
                      if (o)
                        1 === o.result && o.nonce
                          ? ((l = o.nonce), (s = true))
                          : 2 === o.result
                          ? (s = true)
                          : 0 === o.result && o.nonce == this.mapNonce && o.diff && ((s = this._checkMapDiff(o.diff)), this._checkMapObjDiff(o.diff));

                      if (s && this.lastMapRequestHasHandled) {
                        this._setMapLog('checkMapDiff diff-getMap: ' + JSON.stringify(o), module417.InfoColors.Normal, false);

                        this.getMap(false, l);
                      }

                      f.next = 23;
                      break;

                    case 18:
                      f.prev = 18;
                      f.t0 = f.catch(7);

                      if ((new Date() - this.diffReceiveSucTime) / 1e3 > 7 && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
                        setTimeout(function () {
                          c.getMap();
                        }, 1e3);
                        this.diffReceiveSucTime = new Date().getTime();
                      }

                      this._setMapLog('checkMapDiff error: ' + ('object' == typeof f.t0 ? JSON.stringify(f.t0) : f.t0), module417.InfoColors.Fail, false);

                    case 23:
                    case 'end':
                      return f.stop();
                  }
              },
              null,
              this,
              [[7, 18]],
              Promise
            );
          },
        },
        {
          key: '_checkMapDiff',
          value: function (t) {
            var n = this;
            if ('object' != typeof t) return false;
            var o = Object.keys(t);
            if (o.length <= 0) return false;

            for (
              var s = [
                  ['1', 1],
                  ['2', B.mapDiffCount],
                  ['5', 1],
                  ['17', B.mapDiffCount],
                  ['21', 1],
                  ['26', 1],
                ],
                u = function (u) {
                  var l = s.findIndex(function (t) {
                    return t[0] === o[u];
                  });

                  if (-1 != l && t[o[u]].count > s[l][1]) {
                    if ('2' == o[u] && -1 != l) {
                      n.diffInfo = JSON.stringify(t[o[u]]);
                      module12.DeviceEventEmitter.emit(module419.NotificationKeys.MapDynamicDiffInfoChange);
                    }

                    return {
                      v: true,
                    };
                  }
                },
                l = 0;
              l < o.length;
              l++
            ) {
              var c = u(l);
              if ('object' == typeof c) return c.v;
            }

            return false;
          },
        },
        {
          key: '_checkMapObjDiff',
          value: function (t) {
            var n = this;
            if ('object' != typeof t) return false;
            var o = Object.keys(t);
            if (o.length <= 0) return false;
            o.forEach(function (o) {
              o = parseInt(o);
              var s = n.dataInstMap.get(o);

              if (s && t[o]) {
                if (3 === o && t[o].data && undefined !== t[o].start && t[o].len)
                  n._parseMapDynamicData(t[o], o) == module1406.updateRes.hasUpdate && n._updateMapDataDynamic(n.mapData, o);
                var u = s.dealDiff(t[o]);
                if (u == module1406.diffRes.getDiff) n.getMapDataDynamic(s.toJSONString, o);
                else if (u == module1406.diffRes.resetDiff) n._updateMapDataDynamic(n.mapData, o);
                else if (u == module1406.diffRes.getMap)
                  setTimeout(function () {
                    n.getMap();
                  }, 500);
              }
            });
          },
        },
        {
          key: '_updateMapDataDynamic',
          value: function (t, n) {
            var o = this.dataInstMap.get(n);
            if (null == o ? undefined : o.data)
              if (3 === n) {
                t.robot = o.data.robot;
                t.mopPath = o.data.mopPath;
                t.path = C({}, o.data.path);
              } else {
                var s = module1055.MapDyTypeMap.get(n);
                if (s && s[0]) t[s[0]] = o.data;
              }
            module12.DeviceEventEmitter.emit(module419.NotificationKeys.MapDidUpdate);
          },
        },
        {
          key: 'getMapDataDynamic',
          value: function (t, n) {
            var o,
              s,
              l,
              c,
              f,
              h = arguments;
            return regeneratorRuntime.default.async(
              function (v) {
                for (;;)
                  switch ((v.prev = v.next)) {
                    case 0:
                      if (((o = !(h.length > 2 && undefined !== h[2]) || h[2]), this.hasGetMap && -1 != this.mapNonce && !module381.RSM.isLocating)) {
                        v.next = 3;
                        break;
                      }

                      return v.abrupt('return', false);

                    case 3:
                      v.prev = 3;

                      this._setMapLog('getMapDynamic params: ' + JSON.stringify(t), module417.InfoColors.Normal, false);

                      v.next = 7;
                      return regeneratorRuntime.default.awrap(module415.default.getMapDataDynamic(t));

                    case 7:
                      if ((s = v.sent) && s.result && 0 !== s.result.nonce) {
                        v.next = 10;
                        break;
                      }

                      return v.abrupt('return');

                    case 10:
                      l = s.result;

                      this._setMapLog('getMapDynamic res: ' + JSON.stringify(l), module417.InfoColors.Normal, false);

                      if (l)
                        (c = this._parseMapDynamicData(l, l.data_id)) == module1406.updateRes.hasUpdate || (c == module1406.updateRes.reUpdate && !o)
                          ? this._updateMapDataDynamic(this.mapData, n)
                          : c == module1406.updateRes.reUpdate && o && (f = this.dataInstMap.get(l.data_id)) && this.getMapDataDynamic(f.toJSONString, n, false);
                      v.next = 18;
                      break;

                    case 15:
                      v.prev = 15;
                      v.t0 = v.catch(3);

                      this._setMapLog('getMapDynamic error: ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0), module417.InfoColors.Fail, false);

                    case 18:
                    case 'end':
                      return v.stop();
                  }
              },
              null,
              this,
              [[3, 15]],
              Promise
            );
          },
        },
        {
          key: '_parseMapDynamicData',
          value: function (t, n) {
            var o,
              s,
              u = base64js.toByteArray(t.data);
            if (!module395.default.validate_single_payload(u)) return module1406.updateRes.noUpdate;
            var l = module1404.parseDynamicData(u, false);
            if (!l) return module1406.updateRes.noUpdate;
            if (undefined !== l.floorMap)
              l.floorMap = this._generateFloorMap(null == (o = B.mapData) ? undefined : o.map, l.floorMap, null == (s = B.mapData.floorMap) ? undefined : s.direction);
            var c = this.dataInstMap.get(n);
            return c ? c.updateData(t, l) : module1406.updateRes.noUpdate;
          },
        },
        {
          key: '_generateFloorMap',
          value: function (t, n, o) {
            if (!t || !t.width || !n.data) return {};
            var s = {
                width: t.width,
                height: t.height,
                top: t.top + 0.5 - t.data.top,
                left: t.left + 0.5 - t.data.left,
              },
              u = module1401.convertFloorDataToImage(n.data, s, t.data, o);
            return {
              data: n.data,
              image: u,
              direction: (null == o ? undefined : o.data) || [],
            };
          },
        },
        {
          key: 'start',
          value: function () {
            var t,
              n = this;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (((t = (!this.isStopedByStatus && !this.isStopedBySettingPage) || this.shouldForceStart), !this.isRunning() || !t)) {
                        o.next = 3;
                        break;
                      }

                      return o.abrupt('return');

                    case 3:
                      if (t) {
                        o.next = 6;
                        break;
                      }

                      this.stop();
                      return o.abrupt('return');

                    case 6:
                      this.lastMapRequestHasHandled = true;
                      this.timer = module390.default.isSupportIncrementalMap()
                        ? setInterval(function () {
                            return regeneratorRuntime.default.async(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      t.next = 2;
                                      return regeneratorRuntime.default.awrap(n.checkMapDiff());

                                    case 2:
                                    case 'end':
                                      return t.stop();
                                  }
                              },
                              null,
                              null,
                              null,
                              Promise
                            );
                          }, A)
                        : setInterval(function () {
                            return regeneratorRuntime.default.async(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      t.next = 2;
                                      return regeneratorRuntime.default.awrap(n.getMap());

                                    case 2:
                                    case 'end':
                                      return t.stop();
                                  }
                              },
                              null,
                              null,
                              null,
                              Promise
                            );
                          }, 1e3);
                      o.next = 10;
                      return regeneratorRuntime.default.awrap(this.getMapRotateDeg());

                    case 10:
                      o.next = 12;
                      return regeneratorRuntime.default.awrap(this.getMap());

                    case 12:
                      o.next = 14;
                      return regeneratorRuntime.default.awrap(this.updateRoomNameMapping());

                    case 14:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              this,
              null,
              Promise
            );
          },
        },
        {
          key: 'stop',
          value: function () {
            if (this.timer) {
              console.log('MapManager stop');
              if (this.timer) clearInterval(this.timer);
              this.timer = null;
            }
          },
        },
        {
          key: 'isRunning',
          value: function () {
            return !!this.timer;
          },
        },
        {
          key: '_setMapLog',
          value: function (t) {
            var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module417.InfoColors.Normal;
            if (!(arguments.length > 2 && undefined !== arguments[2]) || arguments[2]) module417.Log.log(module417.LogTypes.LoopMap, t, n);
          },
        },
        {
          key: 'saveMapWallFbzData',
          value: function (t, n, o, s, l) {
            var module5, f;
            return regeneratorRuntime.default.async(
              function (h) {
                for (;;)
                  switch ((h.prev = h.next)) {
                    case 0:
                      h.prev = 0;
                      module5 = o.concat(s);
                      if (module390.default.isMultiFloorSupported())
                        module5 = t
                          ? module5.concat([
                              [100, n],
                              [200, 0],
                            ])
                          : module5.concat([[100, n]]);
                      console.log('saveMapWallFbzData isHome ' + t + ' - ' + JSON.stringify(module5));
                      h.next = 7;
                      return regeneratorRuntime.default.awrap(module415.default.saveMap(module5));

                    case 7:
                      f = h.sent;
                      console.log('saveMapWallFbzData isHome ' + t + ' - ' + JSON.stringify(f));
                      if (l) l(true);
                      this.getMultiMaps();
                      h.next = 17;
                      break;

                    case 13:
                      h.prev = 13;
                      h.t0 = h.catch(0);
                      if (l) l(false);
                      console.log('saveMapWallFbzData isHome ' + t + '  error: ' + ('object' == typeof h.t0 ? JSON.stringify(h.t0) : h.t0));

                    case 17:
                    case 'end':
                      return h.stop();
                  }
              },
              null,
              this,
              [[0, 13]],
              Promise
            );
          },
        },
        {
          key: 'saveCarpetIgnoreZone',
          value: function (t, n, o) {
            var module22, l;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module22 = {
                        map_index: t,
                        zone_data: n,
                      };
                      console.log('saveCarpetIgnoreZone ' + JSON.stringify(module22));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.saveCarpetIgnoreZone(module22));

                    case 5:
                      l = c.sent;
                      console.log('saveCarpetIgnoreZone ' + JSON.stringify(l));
                      if (o) o(true);
                      this.getMultiMaps();
                      c.next = 15;
                      break;

                    case 11:
                      c.prev = 11;
                      c.t0 = c.catch(0);
                      if (o) o(false);
                      console.log('saveCarpetIgnoreZone error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                    case 15:
                    case 'end':
                      return c.stop();
                  }
              },
              null,
              this,
              [[0, 11]],
              Promise
            );
          },
        },
        {
          key: 'saveCarpetAddedZone',
          value: function (t, n, o, s) {
            var module4, c;
            return regeneratorRuntime.default.async(
              function (f) {
                for (;;)
                  switch ((f.prev = f.next)) {
                    case 0:
                      f.prev = 0;
                      module4 = {
                        map_index: t,
                        type: n,
                        zone_data: o,
                      };
                      console.log('saveCarpetAddedZone ' + JSON.stringify(module4));
                      f.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.saveCarpetAddedZone(module4));

                    case 5:
                      c = f.sent;
                      console.log('saveCarpetAddedZone ' + JSON.stringify(c));
                      if (s) s(true);
                      this.getMultiMaps();
                      f.next = 15;
                      break;

                    case 11:
                      f.prev = 11;
                      f.t0 = f.catch(0);
                      if (s) s(false);
                      console.log('saveCarpetAddedZone error: ' + ('object' == typeof f.t0 ? JSON.stringify(f.t0) : f.t0));

                    case 15:
                    case 'end':
                      return f.stop();
                  }
              },
              null,
              this,
              [[0, 11]],
              Promise
            );
          },
        },
        {
          key: 'saveFurnitureEditZones',
          value: function (t, n) {
            var module23,
              module22,
              l,
              c = arguments;
            return regeneratorRuntime.default.async(
              function (f) {
                for (;;)
                  switch ((f.prev = f.next)) {
                    case 0:
                      module23 = !(c.length > 2 && undefined !== c[2]) || c[2];
                      f.prev = 1;
                      module22 = {
                        map_flag: t,
                        data: n,
                      };
                      f.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.saveFurnitureEditZones(module22));

                    case 5:
                      l = f.sent;
                      console.log('saveFurnitureEditZones ' + JSON.stringify(module22) + ', res = ' + JSON.stringify(l));
                      if (module23) this.getMultiMaps();
                      f.next = 13;
                      break;

                    case 10:
                      f.prev = 10;
                      f.t0 = f.catch(1);
                      console.log('saveFurnitureEditZones error: ' + ('object' == typeof f.t0 ? JSON.stringify(f.t0) : f.t0));

                    case 13:
                    case 'end':
                      return f.stop();
                  }
              },
              null,
              this,
              [[1, 10]],
              Promise
            );
          },
        },
        {
          key: 'saveDoorSillBlocks',
          value: function (t, n, o) {
            var module22, l;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module22 = {
                        map_index: t,
                        zone_data: n,
                      };
                      console.log('saveDoorSillBlocks ' + JSON.stringify(module22));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.saveDoorSillBlocks(module22));

                    case 5:
                      l = c.sent;
                      console.log('saveDoorSillBlocks ' + JSON.stringify(l));
                      if (o) o(true);
                      this.getMultiMaps();
                      c.next = 15;
                      break;

                    case 11:
                      c.prev = 11;
                      c.t0 = c.catch(0);
                      if (o) o(false);
                      this.logFailInfo('saveDoorSillBlocks', c.t0);

                    case 15:
                    case 'end':
                      return c.stop();
                  }
              },
              null,
              this,
              [[0, 11]],
              Promise
            );
          },
        },
        {
          key: 'saveSmartDoorSillBlocks',
          value: function (t, n, o) {
            var module22, l;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module22 = {
                        map_index: t,
                        zones: n,
                      };
                      console.log('saveSmartDoorSill ' + JSON.stringify(module22));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.saveSmartDoorSills(module22));

                    case 5:
                      l = c.sent;
                      console.log('saveSmartDoorSill ' + JSON.stringify(l));
                      if (o) o(true);
                      this.getMultiMaps();
                      c.next = 15;
                      break;

                    case 11:
                      c.prev = 11;
                      c.t0 = c.catch(0);
                      if (o) o(false);
                      this.logFailInfo('saveSmartDoorSill', c.t0);

                    case 15:
                    case 'end':
                      return c.stop();
                  }
              },
              null,
              this,
              [[0, 11]],
              Promise
            );
          },
        },
        {
          key: 'saveSetIgnoreStuckPoint',
          value: function (t, n, o) {
            var module22, l;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module22 = {
                        map_index: t,
                        point_data: n,
                      };
                      console.log('saveSetIgnoreStuckPt ' + JSON.stringify(module22));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.setIgnoreStuckPoint(module22));

                    case 5:
                      l = c.sent;
                      console.log('saveSetIgnoreStuckPt ' + JSON.stringify(l));
                      if (o) o(true);
                      this.getMultiMaps();
                      c.next = 15;
                      break;

                    case 11:
                      c.prev = 11;
                      c.t0 = c.catch(0);
                      if (o) o(false);
                      this.logFailInfo('saveSetIgnoreStuckPt', c.t0);

                    case 15:
                    case 'end':
                      return c.stop();
                  }
              },
              null,
              this,
              [[0, 11]],
              Promise
            );
          },
        },
        {
          key: 'saveSmartCliffForbidden',
          value: function (t, n, o) {
            var module22, module4;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module22 = {
                        map_index: t,
                        zones: n,
                      };
                      console.log('saveSmartCliffFbz ' + JSON.stringify(module22));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.setCliffForbidden(module22));

                    case 5:
                      module4 = c.sent;
                      console.log('saveSmartCliffFbz ' + JSON.stringify(module4));
                      if (o) o(true);
                      this.getMultiMaps();
                      return c.abrupt('return', module4);

                    case 12:
                      c.prev = 12;
                      c.t0 = c.catch(0);
                      if (o) o(false);
                      this.logFailInfo('saveSmartCliffFbz', c.t0);
                      return c.abrupt('return', false);

                    case 17:
                    case 'end':
                      return c.stop();
                  }
              },
              null,
              this,
              [[0, 12]],
              Promise
            );
          },
        },
        {
          key: 'logFailInfo',
          value: function (t, n) {
            module417.Log.log(module417.LogTypes.RPC, t + ' error: ' + ('object' == typeof n ? JSON.stringify(n) : n), module417.InfoColors.Fail);
          },
        },
        {
          key: 'getCustomCleanMode',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      n.prev = 0;
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(module415.default.getCustomCleanMode());

                    case 3:
                      t = n.sent;
                      this.customCleanModes = t.result;
                      console.log('getCustomCleanMode - ' + JSON.stringify(t));
                      module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module419.EventKeys.SegmentCustomModeDidReceive,
                      });
                      n.next = 12;
                      break;

                    case 9:
                      n.prev = 9;
                      n.t0 = n.catch(0);
                      console.log('getCustomCleanMode  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                    case 12:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              this,
              [[0, 9]],
              Promise
            );
          },
        },
        {
          key: 'getCurrentMapName',
          value: function () {
            var t = null;
            this.maps.forEach(function (n) {
              if (n.id == module381.RSM.currentMapId) t = n.name;
            });
            return module391.default.reuduceEnterString(t);
          },
        },
        {
          key: 'getMultiMaps',
          value: function () {
            var t,
              n,
              o = this;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      if (!this.isRequestingMultiMaps) {
                        s.next = 2;
                        break;
                      }

                      return s.abrupt('return');

                    case 2:
                      s.prev = 2;
                      this.isRequestingMultiMaps = true;
                      s.next = 6;
                      return regeneratorRuntime.default.awrap(module415.default.getMultiMaps());

                    case 6:
                      t = s.sent;
                      this.isRequestingMultiMaps = false;
                      this.mapCountMax = t.result[0].max_multi_map;
                      this.maps = t.result[0].map_info.map(function (t, n) {
                        return C(
                          C({}, t),
                          {},
                          {
                            name: t.name.length > 0 ? module391.default.specDecode(t.name) : '' + module505.floor_map_default_name_prefix + (t.mapFlag + 1),
                            id: t.mapFlag,
                          }
                        );
                      });
                      module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module419.EventKeys.MultiMapsDidReceive,
                      });
                      this.hasGotMultiMap = true;
                      s.next = 19;
                      break;

                    case 14:
                      s.prev = 14;
                      s.t0 = s.catch(2);
                      this.isRequestingMultiMaps = false;

                      if (-97 == (null == s.t0 ? undefined : null == (n = s.t0.data) ? undefined : n.error)) {
                        console.log('Mijia two rpc interval should be greater than 1000 ms, will retry in 1000 ms');
                        setTimeout(function () {
                          o.getMultiMaps();
                        }, 1e3);
                      }

                      console.log('getMultiMaps  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                    case 19:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[2, 14]],
              Promise
            );
          },
        },
        {
          key: 'getSapMapBeautifyFlag',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      n.next = 2;
                      return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.SapMapBeautifyFlag));

                    case 2:
                      if ((t = n.sent)) {
                        n.next = 9;
                        break;
                      }

                      n.next = 6;
                      return regeneratorRuntime.default.awrap(module419.SetStorageKey(module419.StorageKeys.SapMapBeautifyFlag, 'on'));

                    case 6:
                      module394.MC.sapMapBeautify = true;
                      n.next = 10;
                      break;

                    case 9:
                      module394.MC.sapMapBeautify = !('on' != t);

                    case 10:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          },
        },
        {
          key: 'getMapConfigById',
          value: function (t) {
            return this.maps.find(function (n) {
              return n.id == t;
            });
          },
        },
        {
          key: 'getRoomNameMapping',
          value: function () {
            return regeneratorRuntime.default.async(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      t.next = 2;
                      return regeneratorRuntime.default.awrap(module415.default.getRoomNameMappingInfo());

                    case 2:
                      return t.abrupt('return', t.sent);

                    case 3:
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
        },
        {
          key: 'getRoomNameListOnServer',
          value: function () {
            return new Promise(function (t, n) {
              module393.getRoomList(function (o, s) {
                if (o) t(s);
                else n(s);
              });
            });
          },
        },
        {
          key: 'getRoomNameList',
          value: function () {
            return regeneratorRuntime.default.async(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return t.abrupt('return', this.getRoomNameListOnServer());

                    case 1:
                    case 'end':
                      return t.stop();
                  }
              },
              null,
              this,
              null,
              Promise
            );
          },
        },
        {
          key: 'updateLocalServerRoomNames',
          value: function (t) {
            if (!t) return [];

            for (var n = [], o = 0; o < t.length; o++) n.push(t[o].name);

            return n;
          },
        },
        {
          key: 'updateRoomNameMapping',
          value: function (t) {
            var n = this;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (!(module393.apiLevel < 146 && module393.isMiApp)) {
                        o.next = 2;
                        break;
                      }

                      return o.abrupt('return');

                    case 2:
                      if (!('android' == module12.Platform.OS && module393.MiApiLevel < module393.androidRoomApiLevel && module393.isMiApp)) {
                        o.next = 4;
                        break;
                      }

                      return o.abrupt('return');

                    case 4:
                      return o.abrupt(
                        'return',
                        this.getRoomNameList()
                          .then(function (t) {
                            n.roomNameList = t;
                            n.allServerNames = n.updateLocalServerRoomNames(t);
                          })
                          .then(function () {
                            return n.getRoomNameMapping();
                          })
                          .then(function (o) {
                            n.roomNameMapping = o.result;
                            if (t) t();
                            module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                              data: module419.EventKeys.RoomNameMappingDidReceive,
                            });
                          })
                          .catch(function (n) {
                            console.log('updateRoomNameFailed: ' + ('object' == typeof n ? JSON.stringify(n) : n));
                            if (t) t(n);
                          })
                      );

                    case 5:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              this,
              null,
              Promise
            );
          },
        },
        {
          key: 'getCleanSequence',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      n.prev = 0;
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(module415.default.getCleanSequence());

                    case 3:
                      t = n.sent;
                      this.cleanSequence = t.result;
                      console.log('getCleanSequence - ' + JSON.stringify(t));
                      module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module419.EventKeys.CleanSequenceDidReceive,
                      });
                      n.next = 12;
                      break;

                    case 9:
                      n.prev = 9;
                      n.t0 = n.catch(0);
                      console.log('getCleanSequence  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                    case 12:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              this,
              [[0, 9]],
              Promise
            );
          },
        },
        {
          key: 'getMapRotateDeg',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      n.prev = 0;
                      n.next = 3;
                      return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.MapRotateAngle));

                    case 3:
                      if ((t = n.sent)) this.mapRotateAngle = JSON.parse(t);
                      n.next = 10;
                      break;

                    case 7:
                      n.prev = 7;
                      n.t0 = n.catch(0);
                      console.log('MM get mapDeg failed - ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                    case 10:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              this,
              [[0, 7]],
              Promise
            );
          },
        },
        {
          key: 'AutoIdentifyRoomTag',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      if (((n.prev = 0), this.parseRoomTagForSV || !this.preCheckInferZoneTagStatus() || !this.AllRoomNoTagged())) {
                        n.next = 7;
                        break;
                      }

                      this.parseRoomTagForSV = true;
                      n.next = 5;
                      return regeneratorRuntime.default.awrap(module419.GetStorageKey(module419.StorageKeys.AutoIdentifyRoomTag));

                    case 5:
                      if ((t = n.sent) && 'true' === t) {
                        this.RefrashMapData = true;
                        this.getMap(true);
                      }

                    case 7:
                      n.next = 12;
                      break;

                    case 9:
                      n.prev = 9;
                      n.t0 = n.catch(0);
                      console.log('MM autoRoomTag failed - ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                    case 12:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              this,
              [[0, 9]],
              Promise
            );
          },
        },
        {
          key: 'checkAllRoomTagged',
          value: function () {
            var t,
              n,
              o = null == (t = this.mapData) ? undefined : null == (n = t.map) ? undefined : n.colorData;
            if (!o || 'object' != typeof o || o.length <= 0) return false;

            for (var s = [], u = 0; u < o.length; u++) o[u] > 0 && s.push(u);

            var l = this.roomNameMapping;
            if (!l || l.length <= 0) return false;
            if (l.length != s.length) return false;

            for (var c = 0; c < l.length; c++) {
              if (l[c].length < 3 || l[c][2] <= 0) return false;
              var p = l[c][0];
              if (-1 == s.indexOf(p)) return false;
            }

            return true;
          },
        },
        {
          key: 'AllRoomNoTagged',
          value: function () {
            if (!this.roomNameMapping) return true;

            for (var t = 0; t < this.roomNameMapping.length; t++) if (3 == this.roomNameMapping[t].length && this.roomNameMapping[t][2] > 0) return false;

            return true;
          },
        },
        {
          key: 'preCheckInferZoneTagStatus',
          value: function () {
            if (module391.default.isShareUser() || !module423.DMM.isTopazSV) return false;
            if (!module390.default.isSupportRoomTag() || !module390.default.isSupportFurniture()) return false;
            return !(
              !module381.RSM.mapSaveEnabled ||
              -1 == module381.RSM.currentMapId ||
              module381.RSM.isRunning ||
              module381.RSM.mapStatus != module381.MapStatus.Has_WithSegments ||
              !this.roomNameMapping ||
              !this.mapData
            );
          },
        },
        {
          key: 'getMapCurrentNames',
          value: function () {
            var t = this.roomNameMapping,
              n = this.roomNameList;
            if (null == t || null == n) return [];

            for (var o = [], s = [], u = 0; u < t.length; u++) o.push(t[u][1]);

            for (var l = 0; l < n.length; l++) -1 != o.indexOf(n[l].roomId) && s.push(n[l].name);

            return s;
          },
        },
        {
          key: 'SmartParseZoneByPos',
          value: function (t, n) {
            for (
              var o = function (t, n, o) {
                  var s = Math.floor(o) - t.data.top,
                    u = Math.floor(n) - t.data.left;
                  return t.data.offset + t.data.width * s + u;
                },
                s = function (t, n, o) {
                  if (t[n]) {
                    if (-1 == t[n].indexOf(o)) t[n].push(o);
                  } else t[n] = [o];
                },
                u = {},
                l = function (l) {
                  var c = n[l];
                  if (5 != c.length) return 'continue';
                  var p = c[0],
                    f = c[1],
                    h = c[2],
                    v = c[3],
                    M = c[4],
                    y = o(t, p, h),
                    S = o(t, f, h),
                    b = o(t, p, v),
                    D = o(t, f, v),
                    k = t.data.data[y],
                    x = t.data.data[S],
                    N = t.data.data[b],
                    R = t.data.data[D];

                  if (true & k && true & x && true & N && true & R) {
                    var O = k >>> 3;

                    if (O == x >>> 3 && O == N >>> 3 && O == R >>> 3 && 0 != O) {
                      s(u, O, M);
                      return 'continue';
                    }
                  }

                  for (var w = {}, I = h; I <= v; I++)
                    for (var C = p; C <= f; C++) {
                      var F = t.data.data[o(t, C, I)];

                      if (0 != (7 & F)) {
                        var _ = F >>> 3;

                        if (0 != _) w[_] = w[_] ? ++w[_] : 1;
                      }
                    }

                  var T = Object.keys(w);
                  if (0 == T.length) return 'continue';
                  var E = T[0];
                  T.map(function (t) {
                    if (w[t] > w[E] && t != E) E = t;
                  });
                  s(u, E, M);
                },
                c = 0;
              c < n.length;
              c++
            )
              l(c);

            return u;
          },
        },
        {
          key: 'inferZoneTagByFurnitureType',
          value: function (t) {
            for (var n, o, s = null == (n = this.mapData) ? undefined : null == (o = n.map) ? undefined : o.centerInfo, u = {}, l = Object.keys(t), c = 0; c < l.length; c++) {
              var p = t[l[c]];
              if (-1 != p.indexOf(module1055.FurnitureType.FT_BED)) u[l[c]] = 1;
              else if (-1 != p.indexOf(module1055.FurnitureType.FT_SOFA) || -1 != p.indexOf(module1055.FurnitureType.FT_TVCABINET)) u[l[c]] = 6;
              else if (-1 != p.indexOf(module1055.FurnitureType.FT_DINNERTABLE)) u[l[c]] = 13;
              else if (-1 != p.indexOf(module1055.FurnitureType.FT_TOILET) && s && s[l[c]] && 0.05 * s[l[c]].count * 0.05 < 6) u[l[c]] = 15;
            }

            return u;
          },
        },
        {
          key: 'smartInferZoneTag',
          value: function (t) {
            if (0 == t.length) return null;
            var n = this.mapData;
            if (!n.map.data || !n.map.data.data) return null;
            var o = this.SmartParseZoneByPos(n.map, t);
            return this.inferZoneTagByFurnitureType(o);
          },
        },
        {
          key: 'updateTagInfoForMap',
          value: function (t) {
            var n,
              o,
              s,
              l,
              c,
              f,
              h,
              v,
              M,
              y,
              S,
              b,
              k,
              x,
              N,
              R,
              O,
              w,
              I,
              C,
              F = this;
            return regeneratorRuntime.default.async(
              function (_) {
                for (;;)
                  switch ((_.prev = _.next)) {
                    case 0:
                      if (t) {
                        _.next = 2;
                        break;
                      }

                      return _.abrupt('return');

                    case 2:
                      n = this.roomNameMapping.concat();
                      o = this.roomNameList.concat();
                      s = this.getMapCurrentNames();
                      l = [];
                      c = [];

                      f = function (t, n, o, s) {
                        if (module393.isMiApp)
                          t.push({
                            miRoomId: o,
                            robotRoomId: n,
                            robotTagId: s,
                          });
                        else
                          t.push({
                            iotRoomId: o,
                            robotRoomId: n,
                            robotTagId: s,
                          });
                      };

                      h = function (t) {
                        return n.findIndex(function (n) {
                          return n[0] == t;
                        });
                      };

                      v = function (t) {
                        var n = o.findIndex(function (n) {
                          return n.name == t;
                        });
                        return -1 == n ? '' : o[n].roomId;
                      };

                      M = function (t) {
                        for (var n = t, o = 0; (-1 != c.indexOf(n) || -1 != s.indexOf(n)) && ((n = 0 == o ? t : '' + t + o), 20 != ++o); );

                        return n;
                      };

                      y = Object.keys(t);
                      S = 0;

                    case 12:
                      if (!(S < y.length)) {
                        _.next = 44;
                        break;
                      }

                      if (((b = parseInt(y[S])), (k = t[y[S]]), -2 != (x = h(b)) && 0 != b)) {
                        _.next = 17;
                        break;
                      }

                      return _.abrupt('continue', 41);

                    case 17:
                      if (-1 == x) {
                        _.next = 22;
                        break;
                      }

                      if (3 == n[x].length && n[x][2] > 0) k = n[x][2];
                      f(l, b, n[x][1], k);
                      _.next = 41;
                      break;

                    case 22:
                      if ((R = null == (N = module1055.RoomTagInfo[k]) ? undefined : N.name)) {
                        _.next = 25;
                        break;
                      }

                      return _.abrupt('continue', 41);

                    case 25:
                      if (((R = M(R)), 0 != (O = v(R)).length)) {
                        _.next = 39;
                        break;
                      }

                      _.prev = 28;
                      _.next = 31;
                      return regeneratorRuntime.default.awrap(module393.addNewRoomWithName(R));

                    case 31:
                      w = _.sent;
                      O = w.roomId;
                      _.next = 39;
                      break;

                    case 35:
                      _.prev = 35;
                      _.t0 = _.catch(28);
                      console.warn('newName failed ' + ('object' == typeof _.t0 ? JSON.stringify(_.t0) : _.t0));
                      return _.abrupt('continue', 41);

                    case 39:
                      f(l, b, O, k);
                      c.push(R);

                    case 41:
                      S++;
                      _.next = 12;
                      break;

                    case 44:
                      for (
                        I = function (t) {
                          var o = n[t][0];

                          if (
                            -1 ==
                            y.findIndex(function (t) {
                              return parseInt(t) == o;
                            })
                          ) {
                            var s = 3 == n[t].length ? n[t][2] : 0;
                            s = 'string' == typeof s ? parseInt(s) : s;
                            f(l, o, n[t][1], s);
                          }
                        },
                          C = 0;
                        C < n.length;
                        C++
                      )
                        I(C);

                      module415.default
                        .nameSegment(l)
                        .then(function () {
                          F.updateRoomNameMapping(function (t) {
                            if (t) console.log('auto setTag updateMap error: ' + ('object' == typeof error ? JSON.stringify(error) : error));
                          });
                        })
                        .catch(function (t) {
                          console.log('auto setTag error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                        });

                    case 47:
                    case 'end':
                      return _.stop();
                  }
              },
              null,
              this,
              [[28, 35]],
              Promise
            );
          },
        },
        {
          key: 'checkAllRoomNoFloor',
          value: function () {
            var t, n, o;
            return (
              !(null == (t = this.mapData) ? undefined : null == (n = t.floorMap) ? undefined : null == (o = n.data) ? undefined : o.length) ||
              -1 ==
                this.mapData.floorMap.data.findIndex(function (t) {
                  return 0 != t;
                })
            );
          },
        },
        {
          key: 'getMapAfterSaveMap',
          value: function () {
            if (!module390.default.isSupportIncrementalMap()) this.getMap(true);
          },
        },
      ],
      [
        {
          key: 'sharedManager',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.MapManager = q;
var B = q.sharedManager();
exports.MM = B;
