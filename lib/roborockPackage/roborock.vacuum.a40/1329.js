var module50 = require('./50'),
  module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module414 = require('./414'),
  module418 = require('./418'),
  module12 = require('./12'),
  module390 = require('./390'),
  module381 = require('./381'),
  module416 = require('./416'),
  module391 = require('./391'),
  module516 = require('./516'),
  module1330 = require('./1330'),
  module422 = require('./422'),
  module394 = require('./394');

function k(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function R(t) {
  for (var s = 1; s < arguments.length; s++) {
    var o = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      k(Object(o), true).forEach(function (s) {
        module50.default(t, s, o[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      k(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

var O = null,
  module393 = require('./393'),
  base64js = require('base64-js'),
  module411 = require('./411').JsExecutor,
  module500 = require('./500').strings;

exports.CurrentMapId = -1;

var E = (function () {
  function t() {
    var n = this;
    module4.default(this, t);

    if (!O) {
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
      module12.DeviceEventEmitter.addListener(module418.NotificationKeys.DidReceiveSpecialEvent, function (t) {
        if (t.data == module418.EventKeys.MapSaveSwitchChanged) n.getMultiMaps();
      });
      module12.DeviceEventEmitter.addListener(module418.NotificationKeys.RobotStatusDidUpdate, function (t) {
        n.AutoIdentifyRoomTag();
      });
      this.getSapMapBeautifyFlag();
      O = this;
    }

    return O;
  }

  module5.default(
    t,
    [
      {
        key: '_getMap',
        value: function () {
          return new Promise(function (t, n) {
            module393.getMapData('get_map_v1', {}, function (s, o) {
              if (s) t(o);
              else
                n({
                  error: 'getMap error',
                  data: o || 'unknow reason',
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
          this.MinDelayForRequestMap = 1;
        },
      },
      {
        key: 'quitEasterEggModel',
        value: function () {
          this.MinDelayForRequestMap = 2;
        },
      },
      {
        key: 'createJsExecutor',
        value: function (t) {
          var n = this,
            module1492 = require('./1492');

          module411
            .createJsExecutor(module1492)
            .then(function (s) {
              n.executor = s;
              if (t) t();
            })
            .catch(function (t) {
              console.log('initially create executor failed');
            });
        },
      },
      {
        key: 'getMap',
        value: function (t) {
          var n,
            u,
            c,
            l,
            p = this;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    if (!module381.RSM.isLocating) {
                      f.next = 2;
                      break;
                    }

                    return f.abrupt('return');

                  case 2:
                    if (
                      ((n = (new Date() - this.lastUpdateTime) / 1e3),
                      !(u = this.lastMapRequestHasHandled && (n >= this.MinDelayForRequestMap || !!t)) &&
                        this.lastMapRequestHasHandled &&
                        n >= 0.3 &&
                        this.forceGetMapNext &&
                        ((u = true), (this.forceGetMapNext = false)),
                      u)
                    ) {
                      f.next = 8;
                      break;
                    }

                    if (t && module393.isMiApp) this.forceGetMapNext = true;
                    return f.abrupt('return');

                  case 8:
                    if (
                      (module416.Log.log(module416.LogTypes.LoopMap, 'begin request map,last updateTime ' + this.lastUpdateTime + ',timeAfterLastUpdate ' + n),
                      (this.lastMapRequestHasHandled = false),
                      (f.prev = 10),
                      (c = null),
                      (l = null),
                      !module422.DMM.isSapphirePlus)
                    ) {
                      f.next = 20;
                      break;
                    }

                    f.next = 15;
                    return regeneratorRuntime.default.awrap(this._getMapForSP());

                  case 15:
                    l = f.sent;
                    c = base64js.fromByteArray(l);
                    this.originBase64MapData = c;
                    f.next = 25;
                    break;

                  case 20:
                    f.next = 22;
                    return regeneratorRuntime.default.awrap(this._getMap());

                  case 22:
                    c = f.sent;
                    this.originBase64MapData = c;
                    l = base64js.toByteArray(c);

                  case 25:
                    if ((module416.Log.log(module416.LogTypes.LoopMap, 'Got mapData, will parse Data', module416.InfoColors.Success), this.executor)) {
                      f.next = 30;
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
                                return regeneratorRuntime.default.awrap(p.getMap());

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

                  case 30:
                    this.executor
                      .execute('parse', c, globals.app.state.theme != module516.Themes.light, module422.DMM.isSapphirePlus, module394.MC.sapMapBeautify, globals.isEgg)
                      .then(function (t) {
                        var n = 'object' == typeof t ? t : JSON.parse(t);
                        p.parsedMapData = JSON.parse(JSON.stringify(n));
                        if (n && n.map && n.map.data)
                          module22.default(n.map.data, {
                            data: l,
                          });
                        p.useMapResult(n);
                      })
                      .catch(function (t, n) {
                        module416.Log.log(module416.LogTypes.LoopMap, 'js executor parse map failed  -' + t + ' - ' + n, module416.InfoColors.Fail);
                        p.lastMapRequestHasHandled = true;
                      });
                    f.next = 37;
                    break;

                  case 33:
                    f.prev = 33;
                    f.t0 = f.catch(10);
                    this.lastMapRequestHasHandled = true;
                    module416.Log.log(module416.LogTypes.LoopMap, 'getMap  error: ' + ('object' == typeof f.t0 ? JSON.stringify(f.t0) : f.t0), module416.InfoColors.Fail);

                  case 37:
                  case 'end':
                    return f.stop();
                }
            },
            null,
            this,
            [[10, 33]],
            Promise
          );
        },
      },
      {
        key: 'getByteArray',
        value: function (t, n) {
          if (n <= 0) return base64js.toByteArray(t);
          var s = 3 - (n % 3);
          if (4 * (n += 3 === s ? 0 : s) >= 3 * t.length) return base64js.toByteArray(t);
          var o = n / 3;
          return base64js.toByteArray(t.substring(0, 4 * (o + s)));
        },
      },
      {
        key: 'useMapResult',
        value: function (t) {
          if (!t.map || isNaN(t.map.width) || isNaN(t.map.height) || isNaN(t.map.top) || isNaN(t.map.left)) {
            this.lastUpdateTime = new Date().getTime();
            module416.Log.log(module416.LogTypes.LoopMap, 'map is parsed,but got invalid map', module416.InfoColors.Fail);
            return void (this.lastMapRequestHasHandled = true);
          }

          if (!t.charger) t.charger = null;
          if (!t.target) t.target = {};
          if (!t.pathGotoPlan) t.pathGotoPlan = {};
          if (!t.pathGoto) t.pathGoto = {};
          if (!t.zones) t.zones = {};
          if (!t.fbzs) t.fbzs = {};
          if (!t.mfbzs) t.mfbzs = {};
          if (!t.walls) t.walls = {};
          if (!t.clfbzs) t.clfbzs = {};
          if (!t.obstacles && t.obstaclesOld) t.obstacles = t.obstaclesOld;
          if (!t.ignoredObstacles && t.ignoredObstaclesOld) t.ignoredObstacles = t.ignoredObstaclesOld;
          if (!t.mopPath) t.mopPath = {};
          if (!t.cfbzs) t.cfbzs = {};
          if (!t.smartZones) t.smartZones = {};
          if (!t.customCarpet) t.customCarpet = {};
          if (!t.floorMap) t.floorMap = {};
          if (!t.furnitures) t.furnitures = {};
          if (!t.enemies) t.enemies = {};
          this.mapData = t;
          if (t.carpetMap && t.carpetMap.capCount && t.carpetMap.capCount > 0) this.hasCarpetMap = true;
          module12.DeviceEventEmitter.emit(module418.NotificationKeys.MapDidUpdate);
          this.lastMapRequestHasHandled = true;
          this.lastUpdateTime = new Date().getTime();
          module416.Log.log(module416.LogTypes.LoopMap, 'map is parsed successully,map did update', module416.InfoColors.Success);
        },
      },
      {
        key: 'start',
        value: function () {
          var t, module50;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (((t = (!this.isStopedByStatus && !this.isStopedBySettingPage) || this.shouldForceStart), !this.isRunning() || !t)) {
                      s.next = 3;
                      break;
                    }

                    return s.abrupt('return');

                  case 3:
                    if (t) {
                      s.next = 6;
                      break;
                    }

                    this.stop();
                    return s.abrupt('return');

                  case 6:
                    this.lastMapRequestHasHandled = true;
                    module50 = this;
                    this.timer = setInterval(function () {
                      return regeneratorRuntime.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                t.next = 2;
                                return regeneratorRuntime.default.awrap(module50.getMap());

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
                    s.next = 11;
                    return regeneratorRuntime.default.awrap(this.getMapRotateDeg());

                  case 11:
                    s.next = 13;
                    return regeneratorRuntime.default.awrap(this.getMap());

                  case 13:
                    s.next = 15;
                    return regeneratorRuntime.default.awrap(this.updateRoomNameMapping());

                  case 15:
                  case 'end':
                    return s.stop();
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
        key: 'saveMap',
        value: function (t, n, s, u, c) {
          var module418, f;
          return regeneratorRuntime.default.async(
            function (v) {
              for (;;)
                switch ((v.prev = v.next)) {
                  case 0:
                    v.prev = 0;
                    module418 = s.concat(u);
                    if (module390.default.isMultiFloorSupported())
                      module418 = t
                        ? module418.concat([
                            [100, n],
                            [200, 0],
                          ])
                        : module418.concat([[100, n]]);
                    console.log('saveMap isHome ' + t + ' - ' + JSON.stringify(module418));
                    v.next = 7;
                    return regeneratorRuntime.default.awrap(module414.default.saveMap(module418));

                  case 7:
                    f = v.sent;
                    console.log('saveMap isHome ' + t + ' - ' + JSON.stringify(f));
                    if (c) c(true);
                    this.getMultiMaps();
                    v.next = 17;
                    break;

                  case 13:
                    v.prev = 13;
                    v.t0 = v.catch(0);
                    if (c) c(false);
                    console.log('saveMap isHome ' + t + '  error: ' + ('object' == typeof v.t0 ? JSON.stringify(v.t0) : v.t0));

                  case 17:
                  case 'end':
                    return v.stop();
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
        value: function (t, n, s) {
          var module4, c;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    p.prev = 0;
                    module4 = {
                      map_index: t,
                      zone_data: n,
                    };
                    console.log('saveCarpetIgnoreZone ' + JSON.stringify(module4));
                    p.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.saveCarpetIgnoreZone(module4));

                  case 5:
                    c = p.sent;
                    console.log('saveCarpetIgnoreZone ' + JSON.stringify(c));
                    if (s) s(true);
                    this.getMultiMaps();
                    p.next = 15;
                    break;

                  case 11:
                    p.prev = 11;
                    p.t0 = p.catch(0);
                    if (s) s(false);
                    console.log('saveCarpetIgnoreZone error: ' + ('object' == typeof p.t0 ? JSON.stringify(p.t0) : p.t0));

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
        key: 'saveCarpetAddedZone',
        value: function (t, n, s, u) {
          var module5, p;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    f.prev = 0;
                    module5 = {
                      map_index: t,
                      type: n,
                      zone_data: s,
                    };
                    console.log('saveCarpetAddedZone ' + JSON.stringify(module5));
                    f.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.saveCarpetAddedZone(module5));

                  case 5:
                    p = f.sent;
                    console.log('saveCarpetAddedZone ' + JSON.stringify(p));
                    if (u) u(true);
                    this.getMultiMaps();
                    f.next = 15;
                    break;

                  case 11:
                    f.prev = 11;
                    f.t0 = f.catch(0);
                    if (u) u(false);
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
          var module22,
            module4,
            c,
            p = arguments;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    module22 = !(p.length > 2 && undefined !== p[2]) || p[2];
                    f.prev = 1;
                    module4 = {
                      map_flag: t,
                      data: n,
                    };
                    f.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.saveFurnitureEditZones(module4));

                  case 5:
                    c = f.sent;
                    console.log('saveFurnitureEditZones ' + JSON.stringify(module4) + ', res = ' + JSON.stringify(c));
                    if (module22) this.getMultiMaps();
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
                    return regeneratorRuntime.default.awrap(module414.default.getCustomCleanMode());

                  case 3:
                    t = n.sent;
                    this.customCleanModes = t.result;
                    console.log('getCustomCleanMode - ' + JSON.stringify(t));
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.SegmentCustomModeDidReceive,
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
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!this.isRequestingMultiMaps) {
                      u.next = 2;
                      break;
                    }

                    return u.abrupt('return');

                  case 2:
                    u.prev = 2;
                    this.isRequestingMultiMaps = true;
                    u.next = 6;
                    return regeneratorRuntime.default.awrap(module414.default.getMultiMaps());

                  case 6:
                    t = u.sent;
                    this.isRequestingMultiMaps = false;
                    this.mapCountMax = t.result[0].max_multi_map;
                    this.maps = t.result[0].map_info.map(function (t, n) {
                      return R(
                        R({}, t),
                        {},
                        {
                          name: t.name.length > 0 ? module391.default.specDecode(t.name) : '' + module500.floor_map_default_name_prefix + (t.mapFlag + 1),
                          id: t.mapFlag,
                        }
                      );
                    });
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.MultiMapsDidReceive,
                    });
                    this.hasGotMultiMap = true;
                    u.next = 19;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(2);
                    this.isRequestingMultiMaps = false;

                    if (-97 == (null == u.t0 ? undefined : null == (n = u.t0.data) ? undefined : n.error)) {
                      console.log('Mijia two rpc interval should be greater than 1000 ms, will retry in 1000 ms');
                      setTimeout(function () {
                        s.getMultiMaps();
                      }, 1e3);
                    }

                    console.log('getMultiMaps  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 19:
                  case 'end':
                    return u.stop();
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
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.SapMapBeautifyFlag));

                  case 2:
                    if ((t = n.sent)) {
                      n.next = 9;
                      break;
                    }

                    n.next = 6;
                    return regeneratorRuntime.default.awrap(module418.SetStorageKey(module418.StorageKeys.SapMapBeautifyFlag, 'on'));

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
                    return regeneratorRuntime.default.awrap(module414.default.getRoomNameMappingInfo());

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
            module393.getRoomList(function (s, o) {
              if (s) t(o);
              else n(o);
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

          for (var n = [], s = 0; s < t.length; s++) n.push(t[s].name);

          return n;
        },
      },
      {
        key: 'updateRoomNameMapping',
        value: function (t) {
          var n = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!(module393.apiLevel < 146 && module393.isMiApp)) {
                      s.next = 2;
                      break;
                    }

                    return s.abrupt('return');

                  case 2:
                    if (!('android' == module12.Platform.OS && module393.MiApiLevel < module393.androidRoomApiLevel && module393.isMiApp)) {
                      s.next = 4;
                      break;
                    }

                    return s.abrupt('return');

                  case 4:
                    return s.abrupt(
                      'return',
                      this.getRoomNameList()
                        .then(function (t) {
                          n.roomNameList = t;
                          n.allServerNames = n.updateLocalServerRoomNames(t);
                        })
                        .then(function () {
                          return n.getRoomNameMapping();
                        })
                        .then(function (s) {
                          n.roomNameMapping = s.result;
                          if (t) t();
                          module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                            data: module418.EventKeys.RoomNameMappingDidReceive,
                          });
                        })
                        .catch(function (n) {
                          console.log('updateRoomNameFailed: ' + ('object' == typeof n ? JSON.stringify(n) : n));
                          if (t) t(n);
                        })
                    );

                  case 5:
                  case 'end':
                    return s.stop();
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
                    return regeneratorRuntime.default.awrap(module414.default.getCleanSequence());

                  case 3:
                    t = n.sent;
                    this.cleanSequence = t.result;
                    console.log('getCleanSequence - ' + JSON.stringify(t));
                    module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module418.EventKeys.CleanSequenceDidReceive,
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
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.MapRotateAngle));

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
                    return regeneratorRuntime.default.awrap(module418.GetStorageKey(module418.StorageKeys.AutoIdentifyRoomTag));

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
            s = null == (t = this.mapData) ? undefined : null == (n = t.map) ? undefined : n.colorData;
          if (!s || 'object' != typeof s || s.length <= 0) return false;

          for (var o = [], u = 0; u < s.length; u++) s[u] > 0 && o.push(u);

          var c = this.roomNameMapping;
          if (!c || c.length <= 0) return false;
          if (c.length != o.length) return false;

          for (var l = 0; l < c.length; l++) {
            if (c[l].length < 3 || c[l][2] <= 0) return false;
            var p = c[l][0];
            if (-1 == o.indexOf(p)) return false;
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
          if (module391.default.isShareUser() || !module422.DMM.isTopazSV) return false;
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

          for (var s = [], o = [], u = 0; u < t.length; u++) s.push(t[u][1]);

          for (var c = 0; c < n.length; c++) -1 != s.indexOf(n[c].roomId) && o.push(n[c].name);

          return o;
        },
      },
      {
        key: 'SmartParseZoneByPos',
        value: function (t, n) {
          for (
            var s = function (t, n, s) {
                var o = Math.floor(s) - t.data.top,
                  u = Math.floor(n) - t.data.left;
                return t.data.offset + t.data.width * o + u;
              },
              o = function (t, n, s) {
                if (t[n]) {
                  if (-1 == t[n].indexOf(s)) t[n].push(s);
                } else t[n] = [s];
              },
              u = {},
              c = function (c) {
                var l = n[c];
                if (5 != l.length) return 'continue';
                var p = l[0],
                  f = l[1],
                  h = l[2],
                  v = l[3],
                  y = l[4],
                  M = s(t, p, h),
                  b = s(t, f, h),
                  S = s(t, p, v),
                  x = s(t, f, v),
                  N = t.data.data[M],
                  k = t.data.data[b],
                  R = t.data.data[S],
                  O = t.data.data[x];

                if (true & N && true & k && true & R && true & O) {
                  var w = N >>> 3;

                  if (w == k >>> 3 && w == R >>> 3 && w == O >>> 3 && 0 != w) {
                    o(u, w, y);
                    return 'continue';
                  }
                }

                for (var T = {}, D = h; D <= v; D++)
                  for (var C = p; C <= f; C++) {
                    var E = t.data.data[s(t, C, D)];

                    if (0 != (7 & E)) {
                      var I = E >>> 3;
                      if (0 != I) T[I] = T[I] ? ++T[I] : 1;
                    }
                  }

                var P = Object.keys(T);
                if (0 == P.length) return 'continue';
                var F = P[0];
                P.map(function (t) {
                  if (T[t] > T[F] && t != F) F = t;
                });
                o(u, F, y);
              },
              l = 0;
            l < n.length;
            l++
          )
            c(l);

          return u;
        },
      },
      {
        key: 'inferZoneTagByFurnitureType',
        value: function (t) {
          for (var n, s, o = null == (n = this.mapData) ? undefined : null == (s = n.map) ? undefined : s.centerInfo, u = {}, c = Object.keys(t), l = 0; l < c.length; l++) {
            var p = t[c[l]];
            if (-1 != p.indexOf(module1330.FurnitureType.FT_BED)) u[c[l]] = 1;
            else if (-1 != p.indexOf(module1330.FurnitureType.FT_SOFA) || -1 != p.indexOf(module1330.FurnitureType.FT_TVCABINET)) u[c[l]] = 6;
            else if (-1 != p.indexOf(module1330.FurnitureType.FT_DINNERTABLE)) u[c[l]] = 13;
            else if (-1 != p.indexOf(module1330.FurnitureType.FT_TOILET) && o && o[c[l]] && 0.05 * o[c[l]].count * 0.05 < 6) u[c[l]] = 15;
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
          var s = this.SmartParseZoneByPos(n.map, t);
          return this.inferZoneTagByFurnitureType(s);
        },
      },
      {
        key: 'updateTagInfoForMap',
        value: function (t) {
          var n,
            s,
            u,
            c,
            p,
            f,
            h,
            v,
            y,
            M,
            b,
            x,
            N,
            k,
            R,
            O,
            T,
            D,
            C,
            E,
            I = this;
          return regeneratorRuntime.default.async(
            function (P) {
              for (;;)
                switch ((P.prev = P.next)) {
                  case 0:
                    if (t) {
                      P.next = 2;
                      break;
                    }

                    return P.abrupt('return');

                  case 2:
                    n = this.roomNameMapping.concat();
                    s = this.roomNameList.concat();
                    u = this.getMapCurrentNames();
                    c = [];
                    p = [];

                    f = function (t, n, s, o) {
                      if (module393.isMiApp)
                        t.push({
                          miRoomId: s,
                          robotRoomId: n,
                          robotTagId: o,
                        });
                      else
                        t.push({
                          iotRoomId: s,
                          robotRoomId: n,
                          robotTagId: o,
                        });
                    };

                    h = function (t) {
                      return n.findIndex(function (n) {
                        return n[0] == t;
                      });
                    };

                    v = function (t) {
                      var n = s.findIndex(function (n) {
                        return n.name == t;
                      });
                      return -1 == n ? '' : s[n].roomId;
                    };

                    y = function (t) {
                      for (var n = t, s = 0; (-1 != p.indexOf(n) || -1 != u.indexOf(n)) && ((n = 0 == s ? t : '' + t + s), 20 != ++s); );

                      return n;
                    };

                    M = Object.keys(t);
                    b = 0;

                  case 12:
                    if (!(b < M.length)) {
                      P.next = 44;
                      break;
                    }

                    if (((x = parseInt(M[b])), (N = t[M[b]]), -2 != (k = h(x)) && 0 != x)) {
                      P.next = 17;
                      break;
                    }

                    return P.abrupt('continue', 41);

                  case 17:
                    if (-1 == k) {
                      P.next = 22;
                      break;
                    }

                    if (3 == n[k].length && n[k][2] > 0) N = n[k][2];
                    f(c, x, n[k][1], N);
                    P.next = 41;
                    break;

                  case 22:
                    if ((O = null == (R = module1330.RoomTagInfo[N]) ? undefined : R.name)) {
                      P.next = 25;
                      break;
                    }

                    return P.abrupt('continue', 41);

                  case 25:
                    if (((O = y(O)), 0 != (T = v(O)).length)) {
                      P.next = 39;
                      break;
                    }

                    P.prev = 28;
                    P.next = 31;
                    return regeneratorRuntime.default.awrap(module393.addNewRoomWithName(O));

                  case 31:
                    D = P.sent;
                    T = D.roomId;
                    P.next = 39;
                    break;

                  case 35:
                    P.prev = 35;
                    P.t0 = P.catch(28);
                    console.warn('newName failed ' + ('object' == typeof P.t0 ? JSON.stringify(P.t0) : P.t0));
                    return P.abrupt('continue', 41);

                  case 39:
                    f(c, x, T, N);
                    p.push(O);

                  case 41:
                    b++;
                    P.next = 12;
                    break;

                  case 44:
                    for (
                      C = function (t) {
                        var s = n[t][0];

                        if (
                          -1 ==
                          M.findIndex(function (t) {
                            return parseInt(t) == s;
                          })
                        ) {
                          var o = 3 == n[t].length ? n[t][2] : 0;
                          o = 'string' == typeof o ? parseInt(o) : o;
                          f(c, s, n[t][1], o);
                        }
                      },
                        E = 0;
                      E < n.length;
                      E++
                    )
                      C(E);

                    module414.default
                      .nameSegment(c)
                      .then(function () {
                        I.updateRoomNameMapping(function (t) {
                          if (t) console.log('auto setTag updateMap error: ' + ('object' == typeof error ? JSON.stringify(error) : error));
                        });
                      })
                      .catch(function (t) {
                        console.log('auto setTag error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                      });

                  case 47:
                  case 'end':
                    return P.stop();
                }
            },
            null,
            this,
            [[28, 35]],
            Promise
          );
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

exports.MapManager = E;
var I = E.sharedManager();
exports.MM = I;
