var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module414 = require('./414'),
  module385 = require('./385'),
  module419 = require('./419'),
  module391 = require('./391'),
  module415 = require('./415'),
  module390 = require('./390'),
  module1120 = require('./1120'),
  module1268 = require('./1268'),
  module1055 = require('./1055'),
  module1134 = require('./1134'),
  module1270 = require('./1270'),
  module1271 = require('./1271'),
  module394 = require('./394'),
  module1121 = require('./1121'),
  module387 = require('./387'),
  module1122 = require('./1122');

function Z(t, n) {
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

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      Z(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      Z(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function L() {
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

var module1265 = require('./1265'),
  module1340 = require('./1340'),
  module505 = require('./505').strings,
  z = -999,
  j = (function (t) {
    module7.default(Z, t);

    var n = Z,
      module50 = L(),
      A = function () {
        var t,
          s = module11.default(n);

        if (module50) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, u);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function Z(t) {
      var n;
      module4.default(this, Z);
      (n = A.call(this, t)).state = {
        mapStatus: module381.RSM.mapStatus,
        hasEditedMap: false,
      };
      n.saveMapId = z;
      return n;
    }

    module5.default(Z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
          this.carpetRect = this.props.navigation.getParam('carpetRect', null);
          this.stuckPoint = this.props.navigation.getParam('stuckPoint', null);
          this.cliffZone = this.props.navigation.getParam('cliffZone', null);
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.configNavibar();
                    this.initMapView();
                    this.registListeners();
                    this.showGuideViewIfNeeded();
                    module414.MM.getMap(true);

                  case 5:
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
        key: 'componentWillUnmount',
        value: function () {
          this.removeListeners();
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = this.state.mapStatus != module381.MapStatus.None && this.state.mapStatus != module381.MapStatus.Has_WithoutSegments && this.state.hasEditedMap,
            o = module1271.default.confirmButton(this.onNavigationSavePress.bind(this), n, function (n) {
              t.mapSaveButton = n;
            }),
            s = module1271.default.guideButton(
              this.onNavigationGuidePress.bind(this),
              function (n) {
                t.guideButton = n;
              },
              false
            );
          module1271.default.setNavigation(this, globals.isRTL ? [o, s] : [s, o], this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.MapDidUpdate, function (n) {
            var o;
            if (!(null == (o = t.mapView)))
              o.setState(
                R(
                  R({}, module414.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
            });
          });
          this.mapEditDidChange = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.MapEditDidChange, function (n) {
            t.setSaveButtonEnable();
          });
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t;
          if (!(null == (t = this.mapView))) t.setState(R({}, module414.MM.mapData));
        },
      },
      {
        key: 'showGuideViewIfNeeded',
        value: function () {
          var t,
            n,
            o = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    t = module419.StorageKeys.VirtualWallbyGuide;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey(t));

                  case 3:
                    if (((n = u.sent), !!n)) {
                      u.next = 9;
                      break;
                    }

                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module419.SetStorageKey(t, t));

                  case 8:
                    module1340.setTimeout(function () {
                      var t;
                      if (!(null == (t = o.newSwitchGuideView))) t.show();
                    }, 50);

                  case 9:
                  case 'end':
                    return u.stop();
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
        key: 'removeListeners',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
          if (this.backListener) this.backListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
          if (this.mapEditDidChange) this.mapEditDidChange.remove();
        },
      },
      {
        key: 'trySavingChanges',
        value: function () {
          var t,
            n = this,
            o = 0;

          if ((this.mapView && (o = null == (t = this.mapView) ? undefined : t.checkAnyInChargerOrRobot()), 0 != o)) {
            var s,
              u = 1 == o ? module505.existing_wall_fbz_in_robot : module505.existing_wall_fbz_in_charger,
              l = {
                text: module505.map_edit_no_save,
              },
              c = {
                text: module505.map_edit_button_text_save,
                onPress: function () {
                  module1340.setTimeout(function () {
                    return n.saveChanges();
                  }, 300);
                },
              };
            if (!(null == (s = globals.Alert))) s.alert(u, '', [l, c]);
          } else this.saveChanges();
        },
      },
      {
        key: 'saveChanges',
        value: function () {
          var t = this,
            n = module381.RSM.currentMapId,
            o = this.state.mapStatus != module381.MapStatus.None && module414.MM.maps.length >= 1 && -1 == n && module381.RSM.multiFloorEnabled,
            s = (this.mapView && this.mapView.getFBZParams()) || [],
            u = (this.mapView && this.mapView.getWallsParams()) || [];
          if (!(null == s && null == u))
            module390.default.isMultiFloorSupported()
              ? o
                ? module1340.setTimeout(function () {
                    return t.mapSaveView && t.mapSaveView.show();
                  }, 300)
                : 1 == module414.MM.maps.length && 1 == module414.MM.mapCountMax
                ? -1 == n
                  ? this.singleFloorSaveNewMapActionSheet.show()
                  : ((n = module414.MM.maps[0].id), this.startMapSave(n, u, s))
                : this.startMapSave(n, u, s)
              : this.startMapSave(n, u, s);
        },
      },
      {
        key: 'saveChangesOnMultiFloor',
        value: function (t) {
          var n, o;
          if (this.mapSaveView) this.mapSaveView.hide();
          var s = (null == (n = this.mapView) ? undefined : n.getFBZParams()) || [],
            u = (null == (o = this.mapView) ? undefined : o.getWallsParams()) || [];

          if (null != s || null != u) {
            var l = undefined === t ? -1 : t;
            this.startMapSave(l, u, s);
          }
        },
      },
      {
        key: 'startMapSave',
        value: function (t, n, o) {
          var s = this;
          this.saveMapId = t;
          module1340.setTimeout(function () {
            return s.startLoading();
          }, 300);
          module1340.setTimeout(function () {
            return module414.MM.saveMapWallFbzData(false, t, n, o, s.onMapSaveCompleted.bind(s));
          }, 500);
        },
      },
      {
        key: 'tryQuiting',
        value: function () {
          var t = this;

          if (this.state.hasEditedMap) {
            var n,
              o = {
                text: module505.map_edit_no_save,
                onPress: function () {
                  module387.LogEventCommon('quit_cancel');
                  t.quit();
                },
              },
              s = {
                text: module505.map_edit_button_text_save,
                onPress: function () {
                  module387.LogEventCommon('quit_confirm');
                  module1340.setTimeout(function () {
                    t.trySavingChanges();
                  }, 500);
                },
              };
            if (!(null == (n = globals.Alert))) n.alert(module505.map_edit_save_current_action, '', [o, s]);
          } else this.quit();
        },
      },
      {
        key: 'quit',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    module1271.default.endEditMap();
                    this.props.navigation.pop();

                  case 2:
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
        key: 'saveCliffZone',
        value: function () {
          var t, n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (((n = null == (t = this.mapView) ? undefined : t.getCliffZones()), !(this.saveMapId != z && (null == n ? undefined : n.length) >= 0))) {
                      o.next = 5;
                      break;
                    }

                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module414.MM.saveSmartCliffForbidden(this.saveMapId, n));

                  case 4:
                    return o.abrupt('return', o.sent);

                  case 5:
                    return o.abrupt('return', true);

                  case 6:
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
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this;
          if (t) t = this.saveCliffZone();
          if (t)
            this.setState(
              {
                hasEditedMap: false,
              },
              function () {
                var t, o;
                if (!(null == (t = n.mapView))) t.clearAllFBZEditFocus();
                if (!(null == (o = n.mapView))) o.clearAllNewAddedFBZFlag();
                module1340.setTimeout(function () {
                  module414.MM.getMapAfterSaveMap();
                  n.quit();
                }, 1e3);
                module12.DeviceEventEmitter.emit(module419.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module419.EventKeys.FBZSettingsDidChange,
                });
              }
            );
          else this.showToast(module505.robot_communication_exception);
          this.saveMapId = z;
          this.endLoading();
        },
      },
      {
        key: 'onNavigationBackPress',
        value: function () {
          this.tryQuiting();
        },
      },
      {
        key: 'onNavigationSavePress',
        value: function () {
          this.trySavingChanges();
        },
      },
      {
        key: 'onNavigationGuidePress',
        value: function () {
          var t;
          if (!(null == (t = this.newSwitchGuideView))) t.show();
        },
      },
      {
        key: 'onPressAddZoneButton',
        value: function () {
          var t,
            n,
            o,
            u = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!(null == (t = this.mapView) ? undefined : t.isAllFBZReachMaxNum())) {
                      l.next = 4;
                      break;
                    }

                    this.showToast(module505.map_edit_forbidden_zone_exceed_limit);
                    l.next = 18;
                    break;

                  case 4:
                    if (!(null == (n = this.mapView) ? undefined : n.isFBZEditZonesReachMaxNum())) {
                      l.next = 8;
                      break;
                    }

                    this.showToast(module505.map_edit_forbidden_zone_exceed_limit);
                    l.next = 18;
                    break;

                  case 8:
                    if (!(null == (o = this.mapView))) o.addAllFBZone();
                    setTimeout(function () {
                      var t;
                      return null == (t = u.mapView) ? undefined : t.checkAnyInChargerOrRobot();
                    }, 200);
                    l.prev = 10;
                    l.next = 13;
                    return regeneratorRuntime.default.awrap(module415.default.startEditMap());

                  case 13:
                    l.next = 18;
                    break;

                  case 15:
                    l.prev = 15;
                    l.t0 = l.catch(10);
                    console.log('add no go zone: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 18:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[10, 15]],
            Promise
          );
        },
      },
      {
        key: 'onPressAddMoppingFBZoneButton',
        value: function () {
          var t,
            n,
            o = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!(null == (t = this.mapView) ? undefined : t.isMoppingFBZReachMaxNum())) {
                      u.next = 4;
                      break;
                    }

                    this.showToast(module505.map_edit_forbidden_zone_exceed_limit);
                    u.next = 18;
                    break;

                  case 4:
                    if (!(null == (n = this.mapView) ? undefined : n.isFBZEditZonesReachMaxNum())) {
                      u.next = 8;
                      break;
                    }

                    this.showToast(module505.map_edit_forbidden_zone_exceed_limit);
                    u.next = 18;
                    break;

                  case 8:
                    if (this.mapView) this.mapView.addMoppingFBZone();
                    setTimeout(function () {
                      var t;
                      return null == (t = o.mapView) ? undefined : t.checkAnyInChargerOrRobot();
                    }, 200);
                    u.prev = 10;
                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module415.default.startEditMap());

                  case 13:
                    u.next = 18;
                    break;

                  case 15:
                    u.prev = 15;
                    u.t0 = u.catch(10);
                    console.log('add new mfbz: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 18:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[10, 15]],
            Promise
          );
        },
      },
      {
        key: 'onPressAddVirtualWallButton',
        value: function () {
          var t,
            n,
            o = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!this.mapView || !this.mapView.isWallReachMaxNum()) {
                      u.next = 4;
                      break;
                    }

                    this.showToast(module505.map_edit_virtual_wall_exceed_limit);
                    u.next = 18;
                    break;

                  case 4:
                    if (!(null == (t = this.mapView) ? undefined : t.isFBZEditZonesReachMaxNum())) {
                      u.next = 8;
                      break;
                    }

                    this.showToast(module505.map_edit_forbidden_zone_exceed_limit);
                    u.next = 18;
                    break;

                  case 8:
                    if (!(null == (n = this.mapView))) n.addAllFBWall();
                    setTimeout(function () {
                      var t;
                      return null == (t = o.mapView) ? undefined : t.checkAnyInChargerOrRobot();
                    }, 200);
                    u.prev = 10;
                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module415.default.startEditMap());

                  case 13:
                    u.next = 18;
                    break;

                  case 15:
                    u.prev = 15;
                    u.t0 = u.catch(10);
                    console.log('add new wall error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                  case 18:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[10, 15]],
            Promise
          );
        },
      },
      {
        key: 'onPressAddCleaningFBZoneButton',
        value: function () {
          var t,
            n,
            o,
            u = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!(null == (t = this.mapView) ? undefined : t.isCleanFBZReachMaxNum())) {
                      l.next = 4;
                      break;
                    }

                    this.showToast(module505.map_edit_forbidden_zone_exceed_limit);
                    l.next = 18;
                    break;

                  case 4:
                    if (!(null == (n = this.mapView) ? undefined : n.isFBZEditZonesReachMaxNum())) {
                      l.next = 8;
                      break;
                    }

                    this.showToast(module505.map_edit_forbidden_zone_exceed_limit);
                    l.next = 18;
                    break;

                  case 8:
                    if (!(null == (o = this.mapView))) o.addCleaningFBZone();
                    setTimeout(function () {
                      var t;
                      return null == (t = u.mapView) ? undefined : t.checkAnyInChargerOrRobot();
                    }, 200);
                    l.prev = 10;
                    l.next = 13;
                    return regeneratorRuntime.default.awrap(module415.default.startEditMap());

                  case 13:
                    l.next = 18;
                    break;

                  case 15:
                    l.prev = 15;
                    l.t0 = l.catch(10);
                    console.log('add new mfbz: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                  case 18:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[10, 15]],
            Promise
          );
        },
      },
      {
        key: 'setSaveButtonEnable',
        value: function () {
          if (!(this.state.mapStatus == module381.MapStatus.None || this.state.hasEditedMap)) {
            this.setState({
              hasEditedMap: true,
            });
            if (this.mapSaveButton) this.mapSaveButton.setEnabled(true);
          }
        },
      },
      {
        key: 'startLoading',
        value: function () {
          if (this.loadingView) this.loadingView.showWithText(module505.rubys_main_diag_update_map);
        },
      },
      {
        key: 'endLoading',
        value: function () {
          if (this.loadingView) this.loadingView.hide();
        },
      },
      {
        key: 'showToast',
        value: function (t) {
          globals.showToast(t);
        },
      },
      {
        key: 'onTapSingleFloorSaveConfirm',
        value: function () {
          if (module381.RSM.isRunning)
            module1122.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module505.robot_communication_exception);
            });
          else this.requestMultiFloorFeature(true);
        },
      },
      {
        key: 'onTapSingleFloorSaveActionSheet',
        value: function (t) {
          if (t == module414.CurrentMapId) this.singleFloorSaveNewMapAlert.show();
          else {
            var n = (this.mapView && this.mapView.getFBZParams()) || [],
              o = (this.mapView && this.mapView.getWallsParams()) || [];
            if (null == n && null == o) return;
            var s = undefined === t ? -1 : t;
            this.startMapSave(s, o, n);
          }
          this.singleFloorSaveNewMapActionSheet.hide();
        },
      },
      {
        key: 'requestMultiFloorFeature',
        value: function (t) {
          var n = this;
          this.startLoading();
          this.toggleMultiMapFeature(t)
            .then(function () {
              var t = (n.mapView && n.mapView.getFBZParams()) || [],
                o = (n.mapView && n.mapView.getWallsParams()) || [];
              n.startMapSave(module414.CurrentMapId, o, t);
            })
            .catch(function (o) {
              n.setState({
                multiFloorEnabled: !t,
              });
              globals.showToast(module505.robot_communication_exception);
            })
            .finally(function () {
              n.endLoading();
            });
        },
      },
      {
        key: 'toggleMultiMapFeature',
        value: function (t) {
          console.log('WillToggleMultiMapFeature: ' + t);
          return t
            ? new module1270.default(function (t, n) {
                module415.default
                  .setLabStatus({
                    lab_status: 3,
                  })
                  .then(function (n) {
                    console.log('SetLabStatus3Success: ' + JSON.stringify(n));
                    module381.RSM.multiFloorEnabled = true;
                    module414.MM.getMultiMaps();
                    t(n);
                  })
                  .catch(function (t) {
                    n(t);
                  });
              })
            : new module1270.default(function (t, n) {
                module415.default
                  .setLabStatus({
                    lab_status: 1,
                    reserve_map: module414.MM.maps[0].id,
                  })
                  .then(function (n) {
                    console.log('SetLabStatus1Success: ' + JSON.stringify(n));
                    module381.RSM.multiFloorEnabled = false;
                    module414.MM.getMultiMaps();
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
          return module415.default.manualSegmentMap(
            module390.default.isMultiFloorSupported()
              ? {
                  map_flag: t,
                }
              : []
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module1055.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              parent: this,
              style: module1271.MapEditCommonStyles.map,
              left: module1271.MapEditCommonStyles.mapLeft,
              right: module1271.MapEditCommonStyles.mapRight,
              top: module1271.MapEditCommonStyles.mapTop,
              bottom: module1271.MapEditCommonStyles.mapBottom,
              initFBZone: this.carpetRect,
              initStuckPt: this.stuckPoint,
              initCliffZone: this.cliffZone,
              mapMode: module1265.MAP_MODE_MAP_EDIT,
              zonesHasEdited: this.state.hasEditedMap,
            }),
            s = this.state.mapStatus == module381.MapStatus.None ? module1271.default.getNoMapTipView(this.state.mapStatus) : o,
            u = React.default.createElement(module1134.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapActionSheet = n);
              },
              mode: module1134.MapSaveActionSheetMode.SingleFloorWithoutSave,
              handleSaveMap: function (n) {
                return t.onTapSingleFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            l = React.default.createElement(module1134.SingleFloorSaveNewMapAlert, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapAlert = n);
              },
              onPressConfirm: function () {
                return t.onTapSingleFloorSaveConfirm.apply(t, []);
              },
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1271.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            s,
            React.default.createElement(module1120.default, {
              type: module1120.MenuType.Menu_Fbz,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressAddZoneButton: this.onPressAddZoneButton.bind(this),
              onPressAddMoppingFBZoneButton: this.onPressAddMoppingFBZoneButton.bind(this),
              onPressAddVirtualWallButton: this.onPressAddVirtualWallButton.bind(this),
              onPressAddCleaningFBZoneButton: this.onPressAddCleaningFBZoneButton.bind(this),
            }),
            React.default.createElement(module1134.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.mapSaveView = n);
              },
              handleSaveMap: this.saveChangesOnMultiFloor.bind(this),
            }),
            React.default.createElement(module1268.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.forbiddenZone,
              topTitle: module505.map_edit_virtual_wall_and_forbidden_zone_title,
              context: module390.default.isMopForbiddenSupported()
                ? module505.map_edit_virtual_wall_and_forbidden_zone_info1 + '\n' + module505.map_edit_virtual_wall_and_forbidden_zone_info2
                : module505.map_edit_virtual_wall_and_forbidden_zone_info3,
              hintText: module505.map_edit_guide_wall_tip_line2,
              buttonInfo: [module505.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['map_edit_virtual_wall_guide_ok'],
            }),
            u,
            l,
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_forbidden_view_loading',
              closeAccessibilityLabelKey: 'map_edit_forbidden_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module505.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return Z;
  })(React.Component);

exports.default = j;
j.contextType = module1121.AppConfigContext;
