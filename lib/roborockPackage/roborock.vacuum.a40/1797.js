var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module9 = require('./9'),
  module11 = require('./11'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module414 = require('./414'),
  module1397 = require('./1397'),
  module390 = require('./390'),
  module12 = require('./12'),
  module381 = require('./381'),
  module1329 = require('./1329'),
  module418 = require('./418'),
  module1798 = require('./1798');

function D(t) {
  var n = R();
  return function () {
    var u,
      c = module11.default(t);

    if (n) {
      var f = module11.default(this).constructor;
      u = Reflect.construct(c, arguments, f);
    } else u = c.apply(this, arguments);

    return module9.default(this, u);
  };
}

function R() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module393 = require('./393'),
  module389 = require('./389'),
  module500 = require('./500').strings,
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
  A = (function () {
    function t() {
      module4.default(this, t);
    }

    module5.default(t, null, [
      {
        key: 'syncSmartSceneIfNeeded',
        value: function () {
          var t, module23, module7, module9, l;
          return regeneratorRuntime.default.async(
            function (f) {
              for (;;)
                switch ((f.prev = f.next)) {
                  case 0:
                    if (module390.default.isSupportSmartScene() && module393.isSmartSceneSupported() && module393.isOwner() && 2 == module393.iotType) {
                      f.next = 4;
                      break;
                    }

                    console.log('SmartScene is not supported.');
                    return f.abrupt('return');

                  case 4:
                    console.log('SmartSceneDebug SyncSmartScene willGetScenes');
                    f.next = 7;
                    return regeneratorRuntime.default.awrap(module414.default.getScenes());

                  case 7:
                    module23 = f.sent;
                    console.log('SmartSceneDebug SyncSmartScene GetScenes ' + JSON.stringify(module23));
                    module7 = null != (t = module23.result) ? t : [];
                    module9 = module7.map(function (t) {
                      return t.tid;
                    });
                    module381.RSM.validTids = module9;
                    console.log('SmartSceneDebug SyncSmartScene syncTidList ' + JSON.stringify(module9));
                    f.next = 15;
                    return regeneratorRuntime.default.awrap(module393.syncSmartSceneInfo(module9));

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
    ]);
    module5.default(t, [
      {
        key: 'getData',
        value: function () {},
      },
      {
        key: 'stopRobot',
        value: function () {
          return module414.default.stop();
        },
      },
      {
        key: 'mapSaveSwitch',
        value: function (t) {
          var n = t ? 1 : 0,
            u = module390.default.isMultiFloorSupported()
              ? {
                  lab_status: n,
                }
              : n;
          return new module1798.default(function (n, o) {
            module414.default
              .setLabStatus(u)
              .then(function () {
                module381.RSM.mapSaveEnabled = t;
                module12.DeviceEventEmitter.emit(module418.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module418.EventKeys.MapSaveSwitchChanged,
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
            module414.default
              .deleteSelectMap(n)
              .then(function (l) {
                t.syncSmartSceneIfNeeded();
                module418
                  .DelStorageKey(module418.StorageKeys.ARMapPathPrefixKey + '_' + n)
                  .then(function () {
                    var t;
                    console.log('Delete AR Map succeeded');

                    if ((null == (t = module1329.MM.mapRotateAngle) ? undefined : t.hasOwnProperty(n + '')) && module1329.MM.mapRotateAngle[n]) {
                      module1329.MM.mapRotateAngle[n] = 0;
                      module418
                        .SetStorageKey(module418.StorageKeys.MapRotateAngle, JSON.stringify(module1329.MM.mapRotateAngle))
                        .then(function () {
                          console.log('update mapDeg succeeded');
                          u();
                        })
                        .catch(function (t) {
                          console.log('update mapDeg error');
                          o(t);
                        });
                    } else u(l);
                  })
                  .catch(function (t) {
                    console.log('Delete AR Map error: $');
                    o(t);
                  });
              })
              .catch(function (t) {
                o(t);
              });
          });
        },
      },
    ]);
    return t;
  })();

exports.MapListDataProvider = A;

var L = (function (t) {
  module7.default(o, t);
  var n = D(o);

  function o() {
    module4.default(this, o);
    return n.apply(this, arguments);
  }

  module5.default(o, [
    {
      key: 'getData',
      value: function () {
        return new module1798.default(function (t, n) {
          module414.default
            .getRecoverMaps()
            .then(function (n) {
              var u = n.result,
                o = u.map(function (t) {
                  return {
                    id: t[0],
                    time: t[1],
                    name: module500.reset_map_item_title + ' | ' + (3 == t[0] ? module500.manual_edit_map : module500.auto_update_map),
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
        var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
        return new module1798.default(function (u, o) {
          var l = {
            map_index: t,
          };
          if (module390.default.isSupportBackupMap()) l.is_bak = n ? 1 : 0;
          module393.getMapData(module389.Methods.GetRecoverMap, l, function (t, n) {
            if (n.result && 'unknown_method' == n.result) o(O);
            else if (t) u(n);
            else o(x);
          });
        });
      },
    },
    {
      key: 'loadMap',
      value: function (t) {
        return module414.default.recoverMap(t);
      },
    },
    {
      key: 'resetMap',
      value: function () {
        return module414.default.resetMap();
      },
    },
  ]);
  return o;
})(A);

exports.SingleMapDataProvider = L;

var E = (function (t) {
  module7.default(l, t);
  var o = D(l);

  function l() {
    module4.default(this, l);
    return o.apply(this, arguments);
  }

  module5.default(l, [
    {
      key: 'getData',
      value: function () {
        return new module1798.default(function (t, u) {
          module414.default
            .getMultiMapsList()
            .then(function (u) {
              console.log('MultiFloorPage: ' + JSON.stringify(u) + ' ' + module381.RSM.currentMapId);
              var o = module23.default(u.result, 1)[0],
                l = o.map_info
                  .map(function (t) {
                    return {
                      id: t.mapFlag,
                      time: t.add_time,
                      name: t.name ? module1397.FloorMapPageUtils.getRealName(t.name) : '' + module500.floor_map_default_name_prefix + (t.mapFlag + 1),
                      length: t.length,
                    };
                  })
                  .sort(function (t, n) {
                    return t.id == module381.RSM.currentMapId ? -1 : n.id == module381.RSM.currentMapId ? 1 : n.time - t.time;
                  });
              t(l);
            })
            .catch(function (t) {
              u(t);
            });
        });
      },
    },
    {
      key: 'quickCreateMap',
      value: function () {
        return new module1798.default(function (t, n) {
          module414.default
            .quickCreateMap()
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
      key: 'createNewMap',
      value: function () {
        return new module1798.default(function (t, n) {
          module414.default
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
          module414.default
            .manualSegmentMap(
              module390.default.isMultiFloorSupported()
                ? {
                    map_flag: t,
                  }
                : []
            )
            .then(function (t) {
              A.syncSmartSceneIfNeeded();
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
          ? new module1798.default(function (t, n) {
              module414.default
                .setLabStatus({
                  lab_status: 3,
                })
                .then(function (n) {
                  console.log('SetLabStatus3Success: ' + JSON.stringify(n));
                  module381.RSM.multiFloorEnabled = true;
                  t(n);
                })
                .catch(function (t) {
                  n(t);
                });
            })
          : new module1798.default(function (t, n) {
              module414.default
                .setLabStatus({
                  lab_status: 1,
                  reserve_map: module1329.MM.maps[0].id,
                })
                .then(function (n) {
                  console.log('SetLabStatus1Success: ' + JSON.stringify(n));
                  module381.RSM.multiFloorEnabled = false;
                  module1329.MM.getMultiMaps();
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
        return module414.default.nameMultiMap([
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
        return module414.default.loadMultiMap(t);
      },
    },
    {
      key: 'getMapData',
      value: function (t) {
        var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
        return new module1798.default(function (u, o) {
          var l = n && module390.default.isSupportBackupMap() ? [t, 1] : [t],
            c =
              n && module390.default.isSupportBackupMap()
                ? {
                    map_index: t,
                    is_bak: 1,
                  }
                : {
                    map_index: t,
                  },
            f = module393.isMiApp ? l : c;
          module393.getMapData(module389.Methods.GetMultiMap, f, function (t, n) {
            if (t) u(n);
            else {
              console.log('LoadMap: Error: ' + JSON.stringify(n));
              o(x);
            }
          });
        });
      },
    },
    {
      key: 'backupMap',
      value: function (t) {
        return module414.default.manualBackupMap(t);
      },
    },
    {
      key: 'recoverMultiMap',
      value: function (t) {
        return module414.default.recoverMultiMap(t);
      },
    },
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
  ]);
  return l;
})(A);

exports.MultiMapDataProvider = E;
