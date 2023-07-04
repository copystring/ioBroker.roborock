module12.NativeModules.RRPluginSDK;

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module407 = require('./407'),
  module411 = require('./411'),
  module12 = require('./12'),
  module386 = require('./386'),
  module377 = require('./377'),
  module409 = require('./409'),
  module387 = require('./387'),
  module507 = require('./507'),
  x = null,
  module389 = require('./389'),
  base64js = require('base64-js'),
  module404 = require('./404').JsExecutor,
  module491 = require('./491').strings;

exports.CurrentMapId = -1;

var w = (function () {
  function t() {
    var n = this;
    module4.default(this, t);

    if (!x) {
      this.lastUpdateTime = 0;
      this.lastMapRequestHasHandled = true;
      this.customCleanModes = [];
      this.isStopedByStatus = false;
      this.shouldForceStart = false;
      this.isStopedBySettingPage = false;
      this.roomNameMapping = null;
      this.roomNameList = null;
      this.mapCountMax = 2;
      this.maps = [];
      this.cleanSequence = [];
      this.mapRotateAngle = {};
      module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (t) {
        if (t.data == module411.EventKeys.MapSaveSwitchChanged) n.getMultiMaps();
      });
      x = this;
    }

    return x;
  }

  module5.default(
    t,
    [
      {
        key: '_getMap',
        value: function () {
          return new Promise(function (t, n) {
            module389.getMapData('get_map_v1', {}, function (s, o) {
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
        key: 'createJsExecutor',
        value: function (t) {
          var n = this,
            module1230 = require('./1230');

          module404
            .createJsExecutor(module1230)
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
          var o,
            u,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (!module377.RSM.isLocating) {
                      p.next = 2;
                      break;
                    }

                    return p.abrupt('return');

                  case 2:
                    if (((o = (new Date() - this.lastUpdateTime) / 1e3), this.lastMapRequestHasHandled && (o >= 2 || !!t))) {
                      p.next = 6;
                      break;
                    }

                    return p.abrupt('return');

                  case 6:
                    module409.Log.log(module409.LogTypes.LoopMap, 'begin request map,last updateTime ' + this.lastUpdateTime + ',timeAfterLastUpdate ' + o);
                    this.lastMapRequestHasHandled = false;
                    p.prev = 8;
                    p.next = 11;
                    return regeneratorRuntime.default.awrap(this._getMap());

                  case 11:
                    if (
                      ((u = p.sent),
                      (this.originBase64MapData = u),
                      (c = base64js.toByteArray(u)),
                      module409.Log.log(module409.LogTypes.LoopMap, 'Got mapData, will parse Data', module409.InfoColors.Success),
                      this.executor)
                    ) {
                      p.next = 19;
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
                                return regeneratorRuntime.default.awrap(l.getMap());

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
                    return p.abrupt('return');

                  case 19:
                    this.executor
                      .execute('parse', u, globals.app.state.theme != module507.Themes.light)
                      .then(function (t) {
                        var n = 'object' == typeof t ? t : JSON.parse(t);
                        l.parsedMapData = JSON.parse(JSON.stringify(n));
                        if (n && n.map && n.map.data)
                          module21.default(n.map.data, {
                            data: c,
                          });
                        l.useMapResult(n);
                      })
                      .catch(function (t, n) {
                        module409.Log.log(module409.LogTypes.LoopMap, 'js executor parse map failed  -' + t + ' - ' + n, module409.InfoColors.Fail);
                        l.lastMapRequestHasHandled = true;
                      });
                    p.next = 26;
                    break;

                  case 22:
                    p.prev = 22;
                    p.t0 = p.catch(8);
                    this.lastMapRequestHasHandled = true;
                    module409.Log.log(module409.LogTypes.LoopMap, 'getMap  error: ' + ('object' == typeof p.t0 ? JSON.stringify(p.t0) : p.t0), module409.InfoColors.Fail);

                  case 26:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[8, 22]],
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
            module409.Log.log(module409.LogTypes.LoopMap, 'map is parsed,but got invalid map', module409.InfoColors.Fail);
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
          this.mapData = t;
          if (t.carpetMap && t.carpetMap.capCount && t.carpetMap.capCount > 0) this.hasCarpetMap = true;
          module12.DeviceEventEmitter.emit(module411.NotificationKeys.MapDidUpdate);
          this.lastMapRequestHasHandled = true;
          this.lastUpdateTime = new Date().getTime();
          module409.Log.log(module409.LogTypes.LoopMap, 'map is parsed successully,map did update', module409.InfoColors.Success);
        },
      },
      {
        key: 'start',
        value: function () {
          var t, module21;
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
                    module21 = this;
                    this.timer = setInterval(function () {
                      return regeneratorRuntime.default.async(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                t.next = 2;
                                return regeneratorRuntime.default.awrap(module21.getMap());

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
                    o.next = 11;
                    return regeneratorRuntime.default.awrap(this.getMapRotateDeg());

                  case 11:
                    o.next = 13;
                    return regeneratorRuntime.default.awrap(this.getMap());

                  case 13:
                    o.next = 15;
                    return regeneratorRuntime.default.awrap(this.updateRoomNameMapping());

                  case 15:
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
        key: 'saveMap',
        value: function (t, s, o, u, l) {
          var module12, v;
          return regeneratorRuntime.default.async(
            function (h) {
              for (;;)
                switch ((h.prev = h.next)) {
                  case 0:
                    h.prev = 0;
                    module12 = o.concat(u);
                    if (module386.default.isMultiFloorSupported())
                      module12 = t
                        ? module12.concat([
                            [100, s],
                            [200, 0],
                          ])
                        : module12.concat([[100, s]]);
                    console.log('saveMap isHome ' + t + ' - ' + JSON.stringify(module12));
                    h.next = 7;
                    return regeneratorRuntime.default.awrap(module407.default.saveMap(module12));

                  case 7:
                    v = h.sent;
                    console.log('saveMap isHome ' + t + ' - ' + JSON.stringify(v));
                    if (l) l(true);
                    this.getMultiMaps();
                    h.next = 17;
                    break;

                  case 13:
                    h.prev = 13;
                    h.t0 = h.catch(0);
                    if (l) l(false);
                    console.log('saveMap isHome ' + t + '  error: ' + ('object' == typeof h.t0 ? JSON.stringify(h.t0) : h.t0));

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
        value: function (t, s, o) {
          var module5, l;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    p.prev = 0;
                    module5 = {
                      map_index: t,
                      zone_data: s,
                    };
                    console.log('saveCarpetIgnoreZone ' + JSON.stringify(module5));
                    p.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.saveCarpetIgnoreZone(module5));

                  case 5:
                    l = p.sent;
                    console.log('saveCarpetIgnoreZone ' + JSON.stringify(l));
                    if (o) o(true);
                    this.getMultiMaps();
                    p.next = 15;
                    break;

                  case 11:
                    p.prev = 11;
                    p.t0 = p.catch(0);
                    if (o) o(false);
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
        value: function (t, s, o, u) {
          var module411, p;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    f.prev = 0;
                    module411 = {
                      map_index: t,
                      type: s,
                      zone_data: o,
                    };
                    console.log('saveCarpetAddedZone ' + JSON.stringify(module411));
                    f.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.saveCarpetAddedZone(module411));

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
        value: function (t, s, o) {
          var module5, l;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    p.prev = 0;
                    module5 = {
                      map_flag: t,
                      data: s,
                    };
                    p.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.saveFurnitureEditZones(module5));

                  case 4:
                    l = p.sent;
                    console.log('saveFurnitureEditZones ' + JSON.stringify(module5) + ', res = ' + JSON.stringify(l));
                    if (o) o(true);
                    this.getMultiMaps();
                    p.next = 14;
                    break;

                  case 10:
                    p.prev = 10;
                    p.t0 = p.catch(0);
                    if (o) o(false);
                    console.log('saveFurnitureEditZones error: ' + ('object' == typeof p.t0 ? JSON.stringify(p.t0) : p.t0));

                  case 14:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
      {
        key: 'getCustomCleanMode',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getCustomCleanMode());

                  case 3:
                    t = s.sent;
                    this.customCleanModes = t.result;
                    console.log('getCustomCleanMode - ' + JSON.stringify(t));
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.SegmentCustomModeDidReceive,
                    });
                    s.next = 12;
                    break;

                  case 9:
                    s.prev = 9;
                    s.t0 = s.catch(0);
                    console.log('getCustomCleanMode  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 12:
                  case 'end':
                    return s.stop();
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
            if (n.id == module377.RSM.currentMapId) t = n.name;
          });
          return module387.default.reuduceEnterString(t);
        },
      },
      {
        key: 'getMultiMaps',
        value: function () {
          var t,
            s,
            o = this;
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
                    return regeneratorRuntime.default.awrap(module407.default.getMultiMaps());

                  case 6:
                    t = u.sent;
                    this.isRequestingMultiMaps = false;
                    this.mapCountMax = t.result[0].max_multi_map;
                    this.maps = t.result[0].map_info.map(function (t, n) {
                      return {
                        name: t.name.length > 0 ? module387.default.specDecode(t.name) : '' + module491.floor_map_default_name_prefix + (t.mapFlag + 1),
                        id: t.mapFlag,
                      };
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MultiMapsDidReceive,
                    });
                    console.log('getMultiMaps - ' + JSON.stringify(t));
                    u.next = 19;
                    break;

                  case 14:
                    u.prev = 14;
                    u.t0 = u.catch(2);
                    this.isRequestingMultiMaps = false;

                    if (-97 == (null == u.t0 ? undefined : null == (s = u.t0.data) ? undefined : s.error)) {
                      console.log('Mijia two rpc interval should be greater than 1000 ms, will retry in 1000 ms');
                      setTimeout(function () {
                        o.getMultiMaps();
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
                    return regeneratorRuntime.default.awrap(module407.default.getRoomNameMappingInfo());

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
            module389.getRoomList(function (s, o) {
              if (s) t(o);
              else
                n({
                  error: 'error: ' + method,
                  data: json || 'unknow reason',
                });
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
        key: 'updateRoomNameMapping',
        value: function (t) {
          var s = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (!(module389.apiLevel < 146 && module389.isMiApp)) {
                      n.next = 2;
                      break;
                    }

                    return n.abrupt('return');

                  case 2:
                    if (!('android' == module12.Platform.OS && module389.MiApiLevel < module389.androidRoomApiLevel && module389.isMiApp)) {
                      n.next = 4;
                      break;
                    }

                    return n.abrupt('return');

                  case 4:
                    return n.abrupt(
                      'return',
                      this.getRoomNameList()
                        .then(function (t) {
                          s.roomNameList = t;
                        })
                        .then(function () {
                          return s.getRoomNameMapping();
                        })
                        .then(function (n) {
                          s.roomNameMapping = n.result;
                          if (t) t();
                          module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                            data: module411.EventKeys.RoomNameMappingDidReceive,
                          });
                        })
                        .catch(function (n) {
                          console.log('GetRoomNameInfoFailed.');
                          if (t) t(n);
                        })
                    );

                  case 5:
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
        key: 'getCleanSequence',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getCleanSequence());

                  case 3:
                    t = s.sent;
                    this.cleanSequence = t.result;
                    console.log('getCleanSequence - ' + JSON.stringify(t));
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanSequenceDidReceive,
                    });
                    s.next = 12;
                    break;

                  case 9:
                    s.prev = 9;
                    s.t0 = s.catch(0);
                    console.log('getCleanSequence  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 12:
                  case 'end':
                    return s.stop();
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
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.MapRotateAngle));

                  case 3:
                    if ((t = s.sent)) this.mapRotateAngle = JSON.parse(t);
                    s.next = 10;
                    break;

                  case 7:
                    s.prev = 7;
                    s.t0 = s.catch(0);
                    console.log('MM get mapDeg failed - ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 10:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 7]],
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

exports.MapManager = w;
var C = w.sharedManager();
exports.MM = C;
