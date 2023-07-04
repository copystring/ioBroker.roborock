var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module4 = require('./4'),
  module5 = require('./5'),
  module407 = require('./407'),
  module1245 = require('./1245'),
  module386 = require('./386'),
  module12 = require('./12'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module411 = require('./411'),
  module1802 = require('./1802');

function w(t) {
  var n = b();
  return function () {
    var u,
      o = module11.default(t);

    if (n) {
      var f = module11.default(this).constructor;
      u = Reflect.construct(o, arguments, f);
    } else u = o.apply(this, arguments);

    return module9.default(this, u);
  };
}

function b() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module389 = require('./389'),
  module385 = require('./385'),
  module491 = require('./491').strings,
  P = 0,
  F = 1,
  O = {
    code: -1,
    msg: 'PluginNeedsUpdate',
  },
  x = {
    code: -999,
    msg: 'UnknownError',
  },
  L = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(
      t,
      [
        {
          key: 'getData',
          value: function () {},
        },
        {
          key: 'stopRobot',
          value: function () {
            return module407.default.stop();
          },
        },
        {
          key: 'mapSaveSwitch',
          value: function (t) {
            var n = t ? 1 : 0,
              u = module386.default.isMultiFloorSupported()
                ? {
                    lab_status: n,
                  }
                : n;
            return new module1802.default(function (n, o) {
              module407.default
                .setLabStatus(u)
                .then(function () {
                  module377.RSM.mapSaveEnabled = t;
                  module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                    data: module411.EventKeys.MapSaveSwitchChanged,
                  });
                  n(t);
                })
                .catch(function (t) {
                  o(t);
                });
            });
          },
        },
        {
          key: 'deleteMap',
          value: function (n) {
            return new Promise(function (u, o) {
              module407.default
                .deleteSelectMap(n)
                .then(function (n) {
                  t.syncSmartSceneIfNeeded();
                  u(n);
                })
                .catch(function (t) {
                  o(t);
                });
            });
          },
        },
      ],
      [
        {
          key: 'syncSmartSceneIfNeeded',
          value: function () {
            var t, module22, module7, module9, l;
            return regeneratorRuntime.default.async(
              function (f) {
                for (;;)
                  switch ((f.prev = f.next)) {
                    case 0:
                      if (module386.default.isSupportSmartScene() && module389.isSmartSceneSupported() && module389.isOwner() && 2 == module389.iotType) {
                        f.next = 4;
                        break;
                      }

                      console.log('SmartScene is not supported.');
                      return f.abrupt('return');

                    case 4:
                      console.log('SmartSceneDebug SyncSmartScene willGetScenes');
                      f.next = 7;
                      return regeneratorRuntime.default.awrap(module407.default.getScenes());

                    case 7:
                      module22 = f.sent;
                      console.log('SmartSceneDebug SyncSmartScene GetScenes ' + JSON.stringify(module22));
                      module7 = null != (t = module22.result) ? t : [];
                      module9 = module7.map(function (t) {
                        return t.tid;
                      });
                      module377.RSM.validTids = module9;
                      console.log('SmartSceneDebug SyncSmartScene syncTidList ' + JSON.stringify(module9));
                      f.next = 15;
                      return regeneratorRuntime.default.awrap(module389.syncSmartSceneInfo(module9));

                    case 15:
                      l = f.sent;
                      console.log('SmartSceneDebug SyncSmartScene syncSmartSceneInfo ' + JSON.stringify(l));

                    case 17:
                    case 'end':
                      return f.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          },
        },
      ]
    );
    return t;
  })();

exports.MapListDataProvider = L;

var E = (function (t) {
  module7.default(u, t);
  var n = w(u);

  function u() {
    module4.default(this, u);
    return n.apply(this, arguments);
  }

  module5.default(u, [
    {
      key: 'getData',
      value: function () {
        return new module1802.default(function (t, n) {
          module407.default
            .getRecoverMaps()
            .then(function (n) {
              var u = n.result,
                o = u.map(function (t) {
                  return {
                    id: t[0],
                    time: t[1],
                    name: module491.reset_map_item_title + ' | ' + (3 == t[0] ? module491.manual_edit_map : module491.auto_update_map),
                  };
                });
              o.sort(function (t, n) {
                return 3 != t.id && (3 == n.id || t.time < n.time);
              }).splice(2);
              console.log('RequestMapsOriginData:' + JSON.stringify(u));
              t(o);
            })
            .catch(function (t) {
              n(t);
            });
        });
      },
    },
    {
      key: 'editMapName',
      value: function (t, n, u) {
        return new Promise(function (t, n) {
          n('Function is not availiable on single floor skus.');
        });
      },
    },
    {
      key: 'getMapData',
      value: function (t) {
        return new module1802.default(function (n, u) {
          module389.getMapData(
            module385.Methods.GetRecoverMap,
            {
              map_index: t,
            },
            function (t, o) {
              if (o.result && 'unknown_method' == o.result) u(O);
              else if (t) n(o);
              else u(x);
            }
          );
        });
      },
    },
    {
      key: 'loadMap',
      value: function (t) {
        return module407.default.recoverMap(t);
      },
    },
    {
      key: 'resetMap',
      value: function () {
        return module407.default.resetMap();
      },
    },
  ]);
  return u;
})(L);

exports.SingleMapDataProvider = E;

var I = (function (t) {
  module7.default(c, t);
  var n = w(c);

  function c() {
    module4.default(this, c);
    return n.apply(this, arguments);
  }

  module5.default(c, [
    {
      key: 'supportFeatures',
      get: function () {
        return [P, F];
      },
    },
    {
      key: 'isSupportNaviQA',
      get: function () {
        return this.supportFeatures.includes(P);
      },
    },
    {
      key: 'getData',
      value: function () {
        return new module1802.default(function (t, n) {
          module407.default
            .getMultiMapsList()
            .then(function (n) {
              console.log('MultiFloorPage: ' + JSON.stringify(n) + ' ' + module377.RSM.currentMapId);
              var o = module22.default(n.result, 1)[0],
                c = o.map_info
                  .map(function (t) {
                    return {
                      id: t.mapFlag,
                      time: t.add_time,
                      name: t.name ? module1245.FloorMapPageUtils.getRealName(t.name) : '' + module491.floor_map_default_name_prefix + (t.mapFlag + 1),
                      length: t.length,
                    };
                  })
                  .sort(function (t, n) {
                    return t.id == module377.RSM.currentMapId ? -1 : n.id == module377.RSM.currentMapId ? 1 : n.time - t.time;
                  });
              t(c);
            })
            .catch(function (t) {
              n(t);
            });
        });
      },
    },
    {
      key: 'createNewMap',
      value: function () {
        return new module1802.default(function (t, n) {
          module407.default
            .createNewFloorMap()
            .then(function (n) {
              t(n);
            })
            .catch(function (t) {
              n(t);
            });
        });
      },
    },
    {
      key: 'manualSegmentMap',
      value: function (t) {
        return new Promise(function (n, u) {
          module407.default
            .manualSegmentMap(
              module386.default.isMultiFloorSupported()
                ? {
                    map_flag: t,
                  }
                : []
            )
            .then(function (t) {
              L.syncSmartSceneIfNeeded();
              n(t);
            })
            .catch(function (t) {
              u(t);
            });
        });
      },
    },
    {
      key: 'toggleMultiMapFeature',
      value: function (t) {
        console.log('WillToggleMultiMapFeature: ' + t);
        return t
          ? new module1802.default(function (t, n) {
              module407.default
                .setLabStatus({
                  lab_status: 3,
                })
                .then(function (n) {
                  console.log('SetLabStatus3Success: ' + JSON.stringify(n));
                  module377.RSM.multiFloorEnabled = true;
                  t(n);
                })
                .catch(function (t) {
                  n(t);
                });
            })
          : new module1802.default(function (t, n) {
              module407.default
                .setLabStatus({
                  lab_status: 1,
                  reserve_map: module1231.MM.maps[0].id,
                })
                .then(function (n) {
                  console.log('SetLabStatus1Success: ' + JSON.stringify(n));
                  module377.RSM.multiFloorEnabled = false;
                  module1231.MM.getMultiMaps();
                  t(n);
                })
                .catch(function (t) {
                  n(t);
                });
            });
      },
    },
    {
      key: 'editMapName',
      value: function (t, n, u) {
        return module407.default.nameMultiMap([
          {
            multi_map: t,
            name: n,
            length: u,
          },
        ]);
      },
    },
    {
      key: 'loadMap',
      value: function (t) {
        return module407.default.loadMultiMap(t);
      },
    },
    {
      key: 'getMapData',
      value: function (t) {
        return new module1802.default(function (n, u) {
          var o = module389.isMiApp
            ? [t]
            : {
                map_index: t,
              };
          module389.getMapData(module385.Methods.GetMultiMap, o, function (t, o) {
            if (t) n(o);
            else u(x);
          });
        });
      },
    },
  ]);
  return c;
})(L);

exports.MultiMapDataProvider = I;
