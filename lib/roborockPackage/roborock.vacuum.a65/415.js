var module50 = require('./50'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module416 = require('./416'),
  module420 = require('./420'),
  module13 = require('./13'),
  module390 = require('./390'),
  module381 = require('./381'),
  module418 = require('./418'),
  module391 = require('./391'),
  module520 = require('./520'),
  module1125 = require('./1125'),
  module424 = require('./424'),
  module394 = require('./394'),
  module1486 = require('./1486'),
  module1483 = require('./1483'),
  module1488 = require('./1488'),
  module395 = require('./395');

function C(t, n) {
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

function F(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      C(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function O(t, n) {
  var o;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (o = T(t)) || (n && t && 'number' == typeof t.length)) {
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

function T(t, n) {
  if (t) {
    if ('string' == typeof t) return E(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? E(t, n) : undefined;
  }
}

function E(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, s = new Array(n); o < n; o++) s[o] = t[o];

  return s;
}

var P = null,
  module393 = require('./393'),
  base64js = require('base64-js'),
  module412 = require('./412').JsExecutor,
  module510 = require('./510').strings;

exports.CurrentMapId = -1;

var q = module393.isMiApp ? 1500 : 1200,
  B = (function () {
    function t() {
      var n = this;
      module6.default(this, t);

      if (!P) {
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
        this.checkForeCount = 0;
        this.mapNonce = -1;
        this.dataInstMap = new Map();
        this.lastDiffTime = 0;
        this.diffReceiveSucTime = 0;
        this.mapDiffCount = 20;
        this.diffInfo = '';
        module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (t) {
          if (t.data == module420.EventKeys.MapSaveSwitchChanged) {
            n.getMultiMaps();
            if (!module381.RSM.mapSaveEnabled) n.clearMapData();
          }
        });
        module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (t) {
          n.AutoIdentifyRoomTag();
          n.checkMapCleanData();
        });
        this.getSapMapBeautifyFlag();
        P = this;
      }

      return P;
    }

    module7.default(
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
              module1489 = require('./1489');

            module412
              .createJsExecutor(module1489)
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

            module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapDidUpdate);
          },
        },
        {
          key: 'checkMapCleanData',
          value: function () {
            var t, n;
            if (module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None && module390.default.isSupportIncrementalMap())
              (null == (t = this.mapData.blocks) ? undefined : null == (n = t.blocks) ? undefined : n.length) > 0 &&
                ((this.mapData.blocks = {}), module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapDidUpdate));
          },
        },
        {
          key: '_checkShouldRequestMap',
          value: function () {
            var t = arguments.length > 0 && undefined !== arguments[0] && arguments[0],
              n = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
            if (module381.RSM.isLocating) return false;
            var o = (new Date() - this.lastUpdateTime) / 1e3,
              s = this.lastMapRequestHasHandled && (o >= this.MinDelayForRequestMap || !!t);

            if (!s && this.lastMapRequestHasHandled && o >= 0.3 && this.forceGetMapNext) {
              s = true;
              this.forceGetMapNext = false;
            }

            if (s) {
              if (n) this._setMapLog('_checkShouldRequestMap return true, timeInterval - ' + o, module418.InfoColors.Normal, false);
              return true;
            } else {
              if (t && module393.isMiApp) this.forceGetMapNext = true;
              return false;
            }
          },
        },
        {
          key: 'getMap',
          value: function () {
            var t,
              n,
              o,
              s,
              c = this,
              p = arguments;
            return regeneratorRuntime.default.async(
              function (f) {
                for (;;)
                  switch ((f.prev = f.next)) {
                    case 0:
                      if (((t = p.length > 0 && undefined !== p[0] && p[0]), (n = p.length > 1 && undefined !== p[1] ? p[1] : -1), this._checkShouldRequestMap(t, true))) {
                        f.next = 4;
                        break;
                      }

                      return f.abrupt('return');

                    case 4:
                      if (
                        (this._setMapLog('getMap begin request map, lastUpdateTime ' + this.lastUpdateTime + ', nonce = ' + n),
                        this.mapRequestTotalCount++,
                        module393.isMiApp &&
                          module390.default.isLowFrequencyMapForMiSupported() &&
                          (this.mapRequestTotalCount >= 60 && (this.MinDelayForRequestMap = 3), this.mapRequestTotalCount >= 240 && (this.MinDelayForRequestMap = 4)),
                        (this.lastMapRequestHasHandled = false),
                        (f.prev = 8),
                        (o = null),
                        (s = null),
                        !module424.DMM.isSapphirePlus)
                      ) {
                        f.next = 18;
                        break;
                      }

                      f.next = 13;
                      return regeneratorRuntime.default.awrap(this._getMapForSP());

                    case 13:
                      s = f.sent;
                      o = base64js.fromByteArray(s);
                      this.originBase64MapData = o;
                      f.next = 23;
                      break;

                    case 18:
                      f.next = 20;
                      return regeneratorRuntime.default.awrap(this._getMap(n));

                    case 20:
                      o = f.sent;
                      this.originBase64MapData = o;
                      s = base64js.toByteArray(o);

                    case 23:
                      if ((this._setMapLog('getMap Got mapData, will parse', module418.InfoColors.Success), this.executor)) {
                        f.next = 28;
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
                                  return regeneratorRuntime.default.awrap(c.getMap());

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
                      return f.abrupt('return');

                    case 28:
                      this.executor
                        .execute('parse', o, globals.app.state.theme != module520.Themes.light, module424.DMM.isSapphirePlus, module394.MC.sapMapBeautify, globals.isEgg)
                        .then(function (t) {
                          var n = 'object' == typeof t ? t : JSON.parse(t);
                          c.parsedMapData = JSON.parse(JSON.stringify(n));
                          if (n && n.map && n.map.data)
                            module22.default(n.map.data, {
                              data: s,
                            });

                          c._useMapResult(n);
                        })
                        .catch(function (t, n) {
                          c._setMapLog('getMap js executor parse map failed  -' + t + ' - ' + n, module418.InfoColors.Fail);

                          c._dealMapGetFailed();
                        });
                      f.next = 35;
                      break;

                    case 31:
                      f.prev = 31;
                      f.t0 = f.catch(8);

                      this._dealMapGetFailed();

                      this._setMapLog('getMap  error: ' + ('object' == typeof f.t0 ? JSON.stringify(f.t0) : f.t0), module418.InfoColors.Fail);

                    case 35:
                    case 'end':
                      return f.stop();
                  }
              },
              null,
              this,
              [[8, 31]],
              Promise
            );
          },
        },
        {
          key: '_useMapResult',
          value: function (t) {
            if (!t.map || isNaN(t.map.width) || isNaN(t.map.height) || isNaN(t.map.top) || isNaN(t.map.left)) {
              this.lastUpdateTime = new Date().getTime();

              this._setMapLog('map is parsed failed, invalid map', module418.InfoColors.Fail);

              return void this._dealMapGetFailed();
            }

            var n, o;
            if (
              ((t.charger = t.charger || null),
              (t.target = t.target || {}),
              (t.pathGotoPlan = t.pathGotoPlan || {}),
              (t.fbzs = t.fbzs || {}),
              (t.mfbzs = t.mfbzs || {}),
              (t.walls = t.walls || {}),
              (t.clfbzs = t.clfbzs || {}),
              (t.cfbzs = t.cfbzs || {}),
              (t.smartZones = t.smartZones || {}),
              (t.customCarpet = t.customCarpet || {}),
              (t.dsfbz = t.dsfbz || {}),
              (t.stuckpts = t.stuckpts || {}),
              (t.clffbz = t.clffbz || {}),
              (t.smartds = t.smartds || {}),
              (t.floorMap = t.floorMap || {}),
              (t.furnitures = t.furnitures || {}),
              module390.default.isSupportIncrementalMap())
            )
              (null == (n = t.nonceData) ? undefined : null == (o = n.data) ? undefined : o.length) > 0 ? this._parseMapDynamiceData(t) : this._parseInitDynamicData(t);
            else {
              if (!t.obstacles && t.obstaclesOld) t.obstacles = t.obstaclesOld;
              if (!t.ignoredObstacles && t.ignoredObstaclesOld) t.ignoredObstacles = t.ignoredObstaclesOld;
              t.extZones = t.extZones || {};
              t.blocks = t.blocks || {};
              t.zones = t.zones || {};
              t.mopPath = t.mopPath || {};
              t.enemies = t.enemies || {};
            }
            this.zoneChanged = this._checkZoneChanged(t);
            this.mapData = t;
            this.hasGetMap = true;
            if (t.carpetMap && t.carpetMap.capCount && t.carpetMap.capCount > 0) this.hasCarpetMap = true;
            module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapDidUpdate);
            this.lastMapRequestHasHandled = true;
            this.lastUpdateTime = new Date().getTime();

            this._setMapLog('map is parsed successully,map did update', module418.InfoColors.Success);
          },
        },
        {
          key: '_dealMapGetFailed',
          value: function () {
            this.lastMapRequestHasHandled = true;
            module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapDidUpdate);
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
            for (var n, o = O(this.dataInstMap); !(n = o()).done; ) {
              var u = n.value,
                l = module23.default(u, 2),
                c = l[0],
                p = l[1];
              if (p && -1 != p.snapShot)
                if (3 === c) {
                  var f, h;
                  t.mopPath = t.mopPath || {};
                  var v = (null == (f = t.path) ? undefined : null == (h = f.points) ? undefined : h.length) || 0;
                  p.initData(t, p.snapShot, v);
                } else {
                  var M = module1125.MapDyTypeMap.get(c);

                  if (M) {
                    var y = module23.default(M, 2),
                      S = y[0],
                      D = y[1];
                    if (S && D)
                      (function () {
                        var n = t[S] || {},
                          o = 0;
                        D.forEach(function (t) {
                          var s;
                          o += (n && (null == (s = n[t]) ? undefined : s.length)) || 0;
                        });
                        p.initData(n, p.snapShot, o);
                      })();
                  }
                }
            }
          },
        },
        {
          key: '_parseMapDynamiceData',
          value: function (t) {
            var n = this;

            this._setMapLog('_parseMapDynamiceData ' + t.nonceData.data, module418.InfoColors.Normal, false);

            t.nonceData.data.forEach(function (o) {
              var u = module23.default(o, 2),
                l = u[0],
                c = u[1];

              if (35 != l) {
                var p = module1125.MapDyTypeMap.get(l);

                if (p && !(p.length < 2)) {
                  if (!n.dataInstMap.has(l)) {
                    var f = p[p.length - 1];
                    n.dataInstMap.set(l, new module1488.MapDataConfig(l, f));
                  }

                  var h = n.dataInstMap.get(l),
                    v = 0;

                  if (3 === l) {
                    var M, y;
                    v = (null == (M = t.path) ? undefined : null == (y = M.points) ? undefined : y.length) || 0;

                    if (h.nonce != c || h.start < v) {
                      t.mopPath = t.mopPath || {};
                      h.initData(t, c, v);
                    }
                  } else {
                    var S = module23.default(p, 2),
                      D = S[0],
                      b = S[1];

                    if (D && b) {
                      var x = t[D] || {};
                      b.forEach(function (t) {
                        var n;
                        v += (x && (null == (n = x[t]) ? undefined : n.length)) || 0;
                      });
                      if (h.nonce != c || h.start < v) h.initData(x, c, v);
                    }
                  }
                }
              } else n.mapNonce = c;
            });
          },
        },
        {
          key: 'parseMapSnapshot',
          value: function (t, n) {
            var o = this;

            if (((this.mapNonce = n), t)) {
              var s = Object.keys(t);
              if (!(s.length <= 0))
                s.forEach(function (n) {
                  n = parseInt(n);
                  if (!o.dataInstMap.has(n)) o.dataInstMap.set(n, new module1488.MapDataConfig(n));
                  var s = o.dataInstMap.get(n);
                  s.snapShot = t[n].nonce;
                  if (0 === s.maxAskLen && 'number' == typeof t[n].limit_len) s.maxAskLen = t[n].limit_len;
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
              u,
              c,
              p = this;
            return regeneratorRuntime.default.async(
              function (h) {
                for (;;)
                  switch ((h.prev = h.next)) {
                    case 0:
                      if (-1 != this.mapNonce && this.lastMapRequestHasHandled && !module381.RSM.isLocating) {
                        h.next = 2;
                        break;
                      }

                      return h.abrupt('return');

                    case 2:
                      if (((t = (new Date().getTime() - this.lastDiffTime) / 1e3), !(module393.isMiApp && t < 1.4))) {
                        h.next = 5;
                        break;
                      }

                      return h.abrupt('return');

                    case 5:
                      if (module393.isMiApp || !(t < 1.2)) {
                        h.next = 7;
                        break;
                      }

                      return h.abrupt('return');

                    case 7:
                      if (!(this._delayDiffMap() && t <= 2)) {
                        h.next = 9;
                        break;
                      }

                      return h.abrupt('return');

                    case 9:
                      this._setMapLog('get_dynamic_map_diff begin currnetTime = ' + t, module418.InfoColors.Normal, false);

                      h.prev = 10;
                      this.lastDiffTime = new Date().getTime();
                      h.next = 14;
                      return regeneratorRuntime.default.awrap(
                        module416.default.getMapDiffDynamic({
                          nonce: this.mapNonce,
                          round: new Date().getTime(),
                        })
                      );

                    case 14:
                      n = h.sent;
                      this.diffReceiveSucTime = new Date().getTime();
                      o = n.result;
                      s = false;
                      u = false;
                      c = -1;
                      if (o)
                        1 === o.result && o.nonce && o.nonce != this.mapNonce
                          ? ((c = o.nonce), module393.isMiApp || ((c = -1), (u = true)), (s = true))
                          : 2 === o.result
                          ? (module393.isMiApp || (u = true), (s = true))
                          : 0 === o.result && o.nonce == this.mapNonce && o.diff && ((s = this._checkMapDiff(o.diff)), (u = true));
                      if (u) this._checkMapObjDiff(o.diff);

                      if (s && this.lastMapRequestHasHandled && this._checkShouldRequestMap()) {
                        this._setMapLog('get_dynamic_map_diff getMap', module418.InfoColors.Normal, false);

                        this.getMap(false, c);
                      }

                      h.next = 27;
                      break;

                    case 22:
                      h.prev = 22;
                      h.t0 = h.catch(10);

                      if ((new Date() - this.diffReceiveSucTime) / 1e3 > 7 && module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None) {
                        setTimeout(function () {
                          p.getMap();
                        }, 1e3);
                        this.diffReceiveSucTime = new Date().getTime();
                      }

                      this._setMapLog('get_dynamic_map_diff error: ' + ('object' == typeof h.t0 ? JSON.stringify(h.t0) : h.t0), module418.InfoColors.Fail, false);

                    case 27:
                    case 'end':
                      return h.stop();
                  }
              },
              null,
              this,
              [[10, 22]],
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
                  ['2', z.mapDiffCount],
                  ['5', 1],
                  ['17', z.mapDiffCount],
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
                      module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapDynamicDiffInfoChange);
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
            var s = false;
            o.forEach(function (o) {
              o = parseInt(o);
              var u = n.dataInstMap.get(o);

              if (u && t[o]) {
                if (3 === o && t[o].data && undefined !== t[o].start && t[o].len)
                  n._parseMapDynamicData(t[o], o) == module1488.updateRes.hasUpdate && n._updateMapDataDynamic(n.mapData, o);
                var l = u.dealDiff(t[o]);
                if (l == module1488.diffRes.getDiff) n.getMapDataDynamic(u.toJSONString, o);
                else if (l == module1488.diffRes.resetDiff) n._updateMapDataDynamic(n.mapData, o);
                else if (l == module1488.diffRes.getMap) s = true;
              }
            });
            if (s && this._checkShouldRequestMap())
              setTimeout(function () {
                n.getMap();
              }, 500);
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
                t.path = F({}, o.data.path);
              } else {
                var s = module1125.MapDyTypeMap.get(n);
                if (s && s[0]) t[s[0]] = o.data;
              }
            module13.DeviceEventEmitter.emit(module420.NotificationKeys.MapDidUpdate);
          },
        },
        {
          key: 'getMapDataDynamic',
          value: function (t, n) {
            var o,
              s,
              u,
              c,
              p,
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

                      this._setMapLog('getMapDynamic params: ' + JSON.stringify(t) + ', time= ' + new Date().getTime() / 1e3);

                      v.next = 7;
                      return regeneratorRuntime.default.awrap(module416.default.getMapDataDynamic(t));

                    case 7:
                      if ((s = v.sent) && s.result && 0 !== s.result.nonce) {
                        v.next = 10;
                        break;
                      }

                      return v.abrupt('return');

                    case 10:
                      u = s.result;

                      this._setMapLog('getMapDynamic res: ' + JSON.stringify(u) + ', time= ' + new Date().getTime() / 1e3);

                      if (u)
                        (c = this._parseMapDynamicData(u, u.data_id)) == module1488.updateRes.hasUpdate || (c == module1488.updateRes.reUpdate && !o)
                          ? this._updateMapDataDynamic(this.mapData, n)
                          : c == module1488.updateRes.reUpdate && o && (p = this.dataInstMap.get(u.data_id)) && this.getMapDataDynamic(p.toJSONString, n, false);
                      v.next = 18;
                      break;

                    case 15:
                      v.prev = 15;
                      v.t0 = v.catch(3);

                      this._setMapLog('getMapDynamic error: ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0), module418.InfoColors.Fail, false);

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
            var o = base64js.toByteArray(t.data);
            if (!module395.default.validate_single_payload(o)) return module1488.updateRes.noUpdate;
            var s,
              u,
              l = module1486.parseDynamicData(o);
            if (!l) return module1488.updateRes.noUpdate;
            if (undefined !== l.floorMap)
              l.floorMap = this._generateFloorMap(null == (s = this.mapData) ? undefined : s.map, l.floorMap, null == (u = this.mapData.floorMap) ? undefined : u.direction);
            var c = this.dataInstMap.get(n);
            return c ? c.updateData(t, l) : module1488.updateRes.noUpdate;
          },
        },
        {
          key: '_generateFloorMap',
          value: function (t, n, o) {
            if (!t || !t.top || t.isEmpty || !n.data) return {};
            var s = {
                width: t.width,
                height: t.height,
                top: t.top + 0.5 - t.data.top,
                left: t.left + 0.5 - t.data.left,
              },
              u = module1483.convertFloorDataToImage(n.data, s, t.data, o);
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
                          }, q)
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
          key: 'backToForeground',
          value: function () {
            var t = this;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      if (module393.isSupportMqttStatusCheck()) {
                        n.next = 3;
                        break;
                      }

                      setTimeout(function () {
                        return t.start();
                      }, 1e3);
                      return n.abrupt('return');

                    case 3:
                      if (!this.checkForeTimer)
                        this.checkForeTimer = setInterval(function () {
                          var n;
                          return regeneratorRuntime.default.async(
                            function (o) {
                              for (;;)
                                switch ((o.prev = o.next)) {
                                  case 0:
                                    if ((t.checkForeCount++, !(t.checkForeCount > 5))) {
                                      o.next = 4;
                                      break;
                                    }

                                    t._resetCheckForeTimer();

                                    return o.abrupt('return');

                                  case 4:
                                    o.prev = 4;
                                    o.next = 7;
                                    return regeneratorRuntime.default.awrap(module393.getMqttConnectStatus());

                                  case 7:
                                    n = o.sent;

                                    t._setMapLog('backToForeground mqtt status = ' + n);

                                    if (n) t._resetCheckForeTimer();
                                    o.next = 15;
                                    break;

                                  case 12:
                                    o.prev = 12;
                                    o.t0 = o.catch(4);

                                    t._setMapLog('backToForeground error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                                  case 15:
                                  case 'end':
                                    return o.stop();
                                }
                            },
                            null,
                            null,
                            [[4, 12]],
                            Promise
                          );
                        }, 1e3);

                    case 4:
                    case 'end':
                      return n.stop();
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
          key: '_resetCheckForeTimer',
          value: function () {
            clearInterval(this.checkForeTimer);
            this.checkForeTimer = null;
            this.checkForeCount = 0;
            this.start();
          },
        },
        {
          key: '_setMapLog',
          value: function (t) {
            var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : module418.InfoColors.Normal;
            if (!(arguments.length > 2 && undefined !== arguments[2]) || arguments[2]) module418.Log.log(module418.LogTypes.LoopMap, t, n);
          },
        },
        {
          key: 'saveMapWallFbzData',
          value: function (t, n, o, s, u) {
            var module6, p;
            return regeneratorRuntime.default.async(
              function (h) {
                for (;;)
                  switch ((h.prev = h.next)) {
                    case 0:
                      h.prev = 0;
                      module6 = o.concat(s);
                      if (module390.default.isMultiFloorSupported())
                        module6 = t
                          ? module6.concat([
                              [100, n],
                              [200, 0],
                            ])
                          : module6.concat([[100, n]]);
                      console.log('saveMapWallFbzData isHome ' + t + ' - ' + JSON.stringify(module6));
                      h.next = 7;
                      return regeneratorRuntime.default.awrap(module416.default.saveMap(module6));

                    case 7:
                      p = h.sent;
                      console.log('saveMapWallFbzData isHome ' + t + ' - ' + JSON.stringify(p));
                      if (u) u(true);
                      this.getMultiMaps();
                      h.next = 17;
                      break;

                    case 13:
                      h.prev = 13;
                      h.t0 = h.catch(0);
                      if (u) u(false);
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
            var module23, u;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module23 = {
                        map_index: t,
                        zone_data: n,
                      };
                      console.log('saveCarpetIgnoreZone ' + JSON.stringify(module23));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module416.default.saveCarpetIgnoreZone(module23));

                    case 5:
                      u = c.sent;
                      console.log('saveCarpetIgnoreZone ' + JSON.stringify(u));
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
            var module22, c;
            return regeneratorRuntime.default.async(
              function (p) {
                for (;;)
                  switch ((p.prev = p.next)) {
                    case 0:
                      p.prev = 0;
                      module22 = {
                        map_index: t,
                        type: n,
                        zone_data: o,
                      };
                      console.log('saveCarpetAddedZone ' + JSON.stringify(module22));
                      p.next = 5;
                      return regeneratorRuntime.default.awrap(module416.default.saveCarpetAddedZone(module22));

                    case 5:
                      c = p.sent;
                      console.log('saveCarpetAddedZone ' + JSON.stringify(c));
                      if (s) s(true);
                      this.getMultiMaps();
                      p.next = 15;
                      break;

                    case 11:
                      p.prev = 11;
                      p.t0 = p.catch(0);
                      if (s) s(false);
                      console.log('saveCarpetAddedZone error: ' + ('object' == typeof p.t0 ? JSON.stringify(p.t0) : p.t0));

                    case 15:
                    case 'end':
                      return p.stop();
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
            var module50,
              module23,
              u,
              c = arguments;
            return regeneratorRuntime.default.async(
              function (p) {
                for (;;)
                  switch ((p.prev = p.next)) {
                    case 0:
                      module50 = !(c.length > 2 && undefined !== c[2]) || c[2];
                      p.prev = 1;
                      module23 = {
                        map_flag: t,
                        data: n,
                      };
                      p.next = 5;
                      return regeneratorRuntime.default.awrap(module416.default.saveFurnitureEditZones(module23));

                    case 5:
                      u = p.sent;
                      console.log('saveFurnitureEditZones ' + JSON.stringify(module23) + ', res = ' + JSON.stringify(u));
                      if (module50) this.getMultiMaps();
                      p.next = 13;
                      break;

                    case 10:
                      p.prev = 10;
                      p.t0 = p.catch(1);
                      console.log('saveFurnitureEditZones error: ' + ('object' == typeof p.t0 ? JSON.stringify(p.t0) : p.t0));

                    case 13:
                    case 'end':
                      return p.stop();
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
            var module23, u;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module23 = {
                        map_index: t,
                        zone_data: n,
                      };
                      console.log('saveDoorSillBlocks ' + JSON.stringify(module23));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module416.default.saveDoorSillBlocks(module23));

                    case 5:
                      u = c.sent;
                      console.log('saveDoorSillBlocks ' + JSON.stringify(u));
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
            var module23, u;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module23 = {
                        map_index: t,
                        zones: n,
                      };
                      console.log('saveSmartDoorSill ' + JSON.stringify(module23));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module416.default.saveSmartDoorSills(module23));

                    case 5:
                      u = c.sent;
                      console.log('saveSmartDoorSill ' + JSON.stringify(u));
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
            var module23, u;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      c.prev = 0;
                      module23 = {
                        map_index: t,
                        point_data: n,
                      };
                      console.log('saveSetIgnoreStuckPt ' + JSON.stringify(module23));
                      c.next = 5;
                      return regeneratorRuntime.default.awrap(module416.default.setIgnoreStuckPoint(module23));

                    case 5:
                      u = c.sent;
                      console.log('saveSetIgnoreStuckPt ' + JSON.stringify(u));
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
            var module23,
              module22,
              module6,
              p = arguments;
            return regeneratorRuntime.default.async(
              function (h) {
                for (;;)
                  switch ((h.prev = h.next)) {
                    case 0:
                      module23 = !(p.length > 3 && undefined !== p[3]) || p[3];
                      h.prev = 1;
                      module22 = {
                        map_index: t,
                        zones: n,
                      };
                      console.log('saveSmartCliffFbz ' + JSON.stringify(module22));
                      h.next = 6;
                      return regeneratorRuntime.default.awrap(module416.default.setCliffForbidden(module22));

                    case 6:
                      module6 = h.sent;
                      console.log('saveSmartCliffFbz ' + JSON.stringify(module6));
                      if (o) o(true);
                      if (module23) this.getMultiMaps();
                      return h.abrupt('return', module6);

                    case 13:
                      h.prev = 13;
                      h.t0 = h.catch(1);
                      if (o) o(false);
                      this.logFailInfo('saveSmartCliffFbz', h.t0);
                      return h.abrupt('return', false);

                    case 18:
                    case 'end':
                      return h.stop();
                  }
              },
              null,
              this,
              [[1, 13]],
              Promise
            );
          },
        },
        {
          key: 'logFailInfo',
          value: function (t, n) {
            module418.Log.log(module418.LogTypes.RPC, t + ' error: ' + ('object' == typeof n ? JSON.stringify(n) : n), module418.InfoColors.Fail);
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
                      return regeneratorRuntime.default.awrap(module416.default.getCustomCleanMode());

                    case 3:
                      t = n.sent;
                      this.customCleanModes = t.result;
                      console.log('getCustomCleanMode - ' + JSON.stringify(t));
                      module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module420.EventKeys.SegmentCustomModeDidReceive,
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
                      return regeneratorRuntime.default.awrap(module416.default.getMultiMaps());

                    case 6:
                      t = s.sent;
                      this.isRequestingMultiMaps = false;
                      this.mapCountMax = t.result[0].max_multi_map;
                      this.maps = t.result[0].map_info.map(function (t, n) {
                        return F(
                          F({}, t),
                          {},
                          {
                            name: t.name.length > 0 ? module391.default.specDecode(t.name) : '' + module510.floor_map_default_name_prefix + (t.mapFlag + 1),
                            id: t.mapFlag,
                          }
                        );
                      });
                      module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module420.EventKeys.MultiMapsDidReceive,
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
                      return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.SapMapBeautifyFlag));

                    case 2:
                      if ((t = n.sent)) {
                        n.next = 9;
                        break;
                      }

                      n.next = 6;
                      return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.SapMapBeautifyFlag, 'on'));

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
                      return regeneratorRuntime.default.awrap(module416.default.getRoomNameMappingInfo());

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
                      if (!('android' == module13.Platform.OS && module393.MiApiLevel < module393.androidRoomApiLevel && module393.isMiApp)) {
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
                            module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                              data: module420.EventKeys.RoomNameMappingDidReceive,
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
                      return regeneratorRuntime.default.awrap(module416.default.getCleanSequence());

                    case 3:
                      t = n.sent;
                      this.cleanSequence = t.result;
                      console.log('getCleanSequence - ' + JSON.stringify(t));
                      module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                        data: module420.EventKeys.CleanSequenceDidReceive,
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
                      return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.MapRotateAngle));

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
                      return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.AutoIdentifyRoomTag));

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
            if (module391.default.isShareUser()) return false;
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
                    D = o(t, p, v),
                    b = o(t, f, v),
                    k = t.data.data[y],
                    x = t.data.data[S],
                    N = t.data.data[D],
                    R = t.data.data[b];

                  if (true & k && true & x && true & N && true & R) {
                    var _ = k >>> 3;

                    if (_ == x >>> 3 && _ == N >>> 3 && _ == R >>> 3 && 0 != _) {
                      s(u, _, M);
                      return 'continue';
                    }
                  }

                  for (var w = {}, I = h; I <= v; I++)
                    for (var C = p; C <= f; C++) {
                      var F = t.data.data[o(t, C, I)];

                      if (0 != (7 & F)) {
                        var O = F >>> 3;
                        if (0 != O) w[O] = w[O] ? ++w[O] : 1;
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
              if (-1 != p.indexOf(module1125.FurnitureType.FT_BED)) u[l[c]] = 1;
              else if (-1 != p.indexOf(module1125.FurnitureType.FT_SOFA) || -1 != p.indexOf(module1125.FurnitureType.FT_TVCABINET)) u[l[c]] = 6;
              else if (-1 != p.indexOf(module1125.FurnitureType.FT_DINNERTABLE)) u[l[c]] = 13;
              else if (-1 != p.indexOf(module1125.FurnitureType.FT_TOILET) && s && s[l[c]] && 0.05 * s[l[c]].count * 0.05 < 6) u[l[c]] = 15;
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
              u,
              c,
              p,
              h,
              v,
              M,
              y,
              S,
              D,
              b,
              x,
              N,
              R,
              _,
              w,
              I,
              C,
              F = this;

            return regeneratorRuntime.default.async(
              function (O) {
                for (;;)
                  switch ((O.prev = O.next)) {
                    case 0:
                      if (t) {
                        O.next = 2;
                        break;
                      }

                      return O.abrupt('return');

                    case 2:
                      n = this.roomNameMapping.concat();
                      o = this.roomNameList.concat();
                      s = this.getMapCurrentNames();
                      u = [];
                      c = [];

                      p = function (t, n, o, s) {
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
                        O.next = 44;
                        break;
                      }

                      if (((D = parseInt(y[S])), (b = t[y[S]]), -2 != (x = h(D)) && 0 != D)) {
                        O.next = 17;
                        break;
                      }

                      return O.abrupt('continue', 41);

                    case 17:
                      if (-1 == x) {
                        O.next = 22;
                        break;
                      }

                      if (3 == n[x].length && n[x][2] > 0) b = n[x][2];
                      p(u, D, n[x][1], b);
                      O.next = 41;
                      break;

                    case 22:
                      if ((R = null == (N = module1125.RoomTagInfo[b]) ? undefined : N.name)) {
                        O.next = 25;
                        break;
                      }

                      return O.abrupt('continue', 41);

                    case 25:
                      if (((R = M(R)), 0 != (_ = v(R)).length)) {
                        O.next = 39;
                        break;
                      }

                      O.prev = 28;
                      O.next = 31;
                      return regeneratorRuntime.default.awrap(module393.addNewRoomWithName(R));

                    case 31:
                      w = O.sent;
                      _ = w.roomId;
                      O.next = 39;
                      break;

                    case 35:
                      O.prev = 35;
                      O.t0 = O.catch(28);
                      console.warn('newName failed ' + ('object' == typeof O.t0 ? JSON.stringify(O.t0) : O.t0));
                      return O.abrupt('continue', 41);

                    case 39:
                      p(u, D, _, b);
                      c.push(R);

                    case 41:
                      S++;
                      O.next = 12;
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
                            p(u, o, n[t][1], s);
                          }
                        },
                          C = 0;
                        C < n.length;
                        C++
                      )
                        I(C);

                      module416.default
                        .nameSegment(u)
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
                      return O.stop();
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
          key: 'getNoEditFurnitureCount',
          value: function () {
            var t,
              o,
              s,
              u = this.mapData.furnitures,
              l = 0,
              c = (null == u ? undefined : null == (t = u.data) ? undefined : t.length) > 0 ? u.data.concat() : [];
            if ((null == (o = u.hide) ? undefined : o.length) > 0)
              (((null == (s = u.hide) ? undefined : s.length) == u.num && 0 == c.length) || module394.MC.showAllFurnitureModel) && c.push.apply(c, module31.default(u.hide));
            c.map(function (t) {
              if (t.length >= 12 && 0 == t[11] && t[9] != module1125.FurnitureType.FT_TOILET) l++;
            });
            return l;
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
            var t = this;

            if (!module390.default.isSupportIncrementalMap() || this._delayDiffMap()) {
              this.getMap(true);
              if (module393.isMiApp && !this.isRunning())
                setTimeout(function () {
                  t.getMap();
                }, 5e3);
            } else if (module390.default.isSupportIncrementalMap() && !this.isRunning()) {
              this.checkMapDiff();
              if (module393.isMiApp)
                setTimeout(function () {
                  t.checkMapDiff();
                }, 2e3);
            }
          },
        },
        {
          key: '_delayDiffMap',
          value: function () {
            return !(module393.isMiApp || (module381.RSM.state != module381.RobotState.PAUSE && module381.RSM.isRunning));
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

exports.MapManager = B;
var z = B.sharedManager();
exports.MM = z;
