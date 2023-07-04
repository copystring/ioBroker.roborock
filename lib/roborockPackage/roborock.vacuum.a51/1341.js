var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module416 = require('./416'),
  module1208 = require('./1208'),
  module390 = require('./390'),
  module13 = require('./13'),
  module381 = require('./381'),
  module415 = require('./415'),
  module420 = require('./420'),
  module1342 = require('./1342');

function D(t) {
  var n = R();
  return function () {
    var u,
      l = module12.default(t);

    if (n) {
      var f = module12.default(this).constructor;
      u = Reflect.construct(l, arguments, f);
    } else u = l.apply(this, arguments);

    return module11.default(this, u);
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
  module510 = require('./510').strings,
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
      module6.default(this, t);
    }

    module7.default(t, null, [
      {
        key: 'syncSmartSceneIfNeeded',
        value: function () {
          var t, module23, module9, module11, c;
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
                    return regeneratorRuntime.default.awrap(module416.default.getScenes());

                  case 7:
                    module23 = f.sent;
                    console.log('SmartSceneDebug SyncSmartScene GetScenes ' + JSON.stringify(module23));
                    module9 = null != (t = module23.result) ? t : [];
                    module11 = module9.map(function (t) {
                      return t.tid;
                    });
                    module381.RSM.validTids = module11;
                    console.log('SmartSceneDebug SyncSmartScene syncTidList ' + JSON.stringify(module11));
                    f.next = 15;
                    return regeneratorRuntime.default.awrap(module393.syncSmartSceneInfo(module11));

                  case 15:
                    c = f.sent;
                    console.log('SmartSceneDebug SyncSmartScene syncSmartSceneInfo ' + JSON.stringify(c));

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
    module7.default(t, [
      {
        key: 'getData',
        value: function () {},
      },
      {
        key: 'stopRobot',
        value: function () {
          return module416.default.stop();
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
          return new module1342.default(function (n, o) {
            module416.default
              .setLabStatus(u)
              .then(function () {
                module381.RSM.mapSaveEnabled = t;
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module420.EventKeys.MapSaveSwitchChanged,
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
            module416.default
              .deleteSelectMap(n)
              .then(function (c) {
                if (n == module381.RSM.currentMapId) module415.MM.clearMapData();
                t.syncSmartSceneIfNeeded();
                module420
                  .DelStorageKey(module420.StorageKeys.ARMapPathPrefixKey + '_' + n)
                  .then(function () {
                    var t;
                    console.log('Delete AR Map succeeded');

                    if ((null == (t = module415.MM.mapRotateAngle) ? undefined : t.hasOwnProperty(n + '')) && module415.MM.mapRotateAngle[n]) {
                      module415.MM.mapRotateAngle[n] = 0;
                      module420
                        .SetStorageKey(module420.StorageKeys.MapRotateAngle, JSON.stringify(module415.MM.mapRotateAngle))
                        .then(function () {
                          console.log('update mapDeg succeeded');
                          u();
                        })
                        .catch(function (t) {
                          console.log('update mapDeg error');
                          o(t);
                        });
                    } else u(c);
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
  module9.default(o, t);
  var n = D(o);

  function o() {
    module6.default(this, o);
    return n.apply(this, arguments);
  }

  module7.default(o, [
    {
      key: 'getData',
      value: function () {
        return new module1342.default(function (t, n) {
          module416.default
            .getRecoverMaps()
            .then(function (n) {
              var u = n.result,
                o = u.map(function (t) {
                  return {
                    id: t[0],
                    time: t[1],
                    name: module510.reset_map_item_title + ' | ' + (3 == t[0] ? module510.manual_edit_map : module510.auto_update_map),
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
        return new module1342.default(function (u, o) {
          var c = {
            map_index: t,
          };
          if (module390.default.isSupportBackupMap()) c.is_bak = n ? 1 : 0;
          module393.getMapData(module389.Methods.GetRecoverMap, c, function (t, n) {
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
        return module416.default.recoverMap(t);
      },
    },
    {
      key: 'resetMap',
      value: function () {
        return module416.default.resetMap();
      },
    },
  ]);
  return o;
})(A);

exports.SingleMapDataProvider = L;

var E = (function (t) {
  module9.default(c, t);
  var o = D(c);

  function c() {
    module6.default(this, c);
    return o.apply(this, arguments);
  }

  module7.default(c, [
    {
      key: 'getData',
      value: function () {
        return new module1342.default(function (t, u) {
          module416.default
            .getMultiMapsList()
            .then(function (u) {
              console.log('MultiFloorPage: ' + JSON.stringify(u) + ' ' + module381.RSM.currentMapId);
              var o = module23.default(u.result, 1)[0],
                c = o.map_info
                  .map(function (t) {
                    return {
                      id: t.mapFlag,
                      time: t.add_time,
                      name: t.name ? module1208.FloorMapPageUtils.getRealName(t.name) : '' + module510.floor_map_default_name_prefix + (t.mapFlag + 1),
                      length: t.length,
                    };
                  })
                  .sort(function (t, n) {
                    return t.id == module381.RSM.currentMapId ? -1 : n.id == module381.RSM.currentMapId ? 1 : n.time - t.time;
                  });
              t(c);
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
        return new module1342.default(function (t, n) {
          module416.default
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
        return new module1342.default(function (t, n) {
          module416.default
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
          module416.default
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
          ? new module1342.default(function (t, n) {
              module416.default
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
          : new module1342.default(function (t, n) {
              module416.default
                .setLabStatus({
                  lab_status: 1,
                  reserve_map: module415.MM.maps[0].id,
                })
                .then(function (n) {
                  console.log('SetLabStatus1Success: ' + JSON.stringify(n));
                  module381.RSM.multiFloorEnabled = false;
                  module415.MM.getMultiMaps();
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
        return module416.default.nameMultiMap([
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
        return module416.default.loadMultiMap(t);
      },
    },
    {
      key: 'getMapData',
      value: function (t) {
        var n = arguments.length > 1 && undefined !== arguments[1] && arguments[1];
        return new module1342.default(function (u, o) {
          var c = n && module390.default.isSupportBackupMap() ? [t, 1] : [t],
            l =
              n && module390.default.isSupportBackupMap()
                ? {
                    map_index: t,
                    is_bak: 1,
                  }
                : {
                    map_index: t,
                  },
            f = module393.isMiApp ? c : l;
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
        return module416.default.manualBackupMap(t);
      },
    },
    {
      key: 'recoverMultiMap',
      value: function (t) {
        return module416.default.recoverMultiMap(t);
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
  return c;
})(A);

exports.MultiMapDataProvider = E;
