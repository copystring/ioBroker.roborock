var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = R(require('react')),
  module12 = require('./12'),
  module377 = require('./377'),
  module1231 = require('./1231'),
  module1935 = require('./1935'),
  module381 = require('./381'),
  module411 = require('./411'),
  module387 = require('./387'),
  module407 = require('./407'),
  module386 = require('./386'),
  module1326 = R(require('./1326')),
  module1808 = require('./1808'),
  module1233 = require('./1233'),
  module1243 = require('./1243'),
  module1802 = require('./1802'),
  module1344 = R(require('./1344')),
  module390 = require('./390'),
  module506 = require('./506'),
  module383 = require('./383'),
  module1261 = require('./1261');

function T(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (T = function (t) {
    return t ? o : n;
  })(t);
}

function R(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = T(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    u = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var l in t)
    if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
      var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
      if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
      else s[l] = t[l];
    }

  s.default = t;
  if (o) o.set(t, s);
  return s;
}

function L(t, n) {
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

function Z(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      L(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      L(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function j() {
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

var module936 = require('./936'),
  module1249 = require('./1249'),
  module491 = require('./491').strings,
  I = (function (t) {
    module7.default(R, t);

    var module49 = R,
      module506 = j(),
      T = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = T.call(this, t)).state = {
        mapStatus: module377.RSM.mapStatus,
        hasEditedMap: false,
      };
      return n;
    }

    module5.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
          this.carpetRect = this.props.navigation.getParam('carpetRect', null);
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
                    module1231.MM.getMap(true);

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
            n = this.state.mapStatus != module377.MapStatus.None && this.state.mapStatus != module377.MapStatus.Has_WithoutSegments && this.state.hasEditedMap,
            o = module1344.default.confirmButton(this.onNavigationSavePress.bind(this), n, function (n) {
              t.mapSaveButton = n;
            }),
            s = module1344.default.guideButton(
              this.onNavigationGuidePress.bind(this),
              function (n) {
                t.guideButton = n;
              },
              false
            );
          module1344.default.setNavigation(this, globals.isRTL ? [o, s] : [s, o], this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'registListeners',
        value: function () {
          var t = this;
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
            var o;
            if (!(null == (o = t.mapView)))
              o.setState(
                Z(
                  Z({}, module1231.MM.mapData),
                  {},
                  {
                    robotStatus: module377.RSM.state,
                  }
                )
              );
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module377.RSM.mapStatus,
            });
          });
          this.mapEditDidChange = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapEditDidChange, function (n) {
            t.setSaveButtonEnable();
          });
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t;
          if (!(null == (t = this.mapView))) t.setState(Z({}, module1231.MM.mapData));
        },
      },
      {
        key: 'showGuideViewIfNeeded',
        value: function () {
          var t,
            o,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    t = module411.StorageKeys.VirtualWallbyGuide;
                    u.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(t));

                  case 3:
                    if (((o = u.sent), !!o)) {
                      u.next = 9;
                      break;
                    }

                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(t, t));

                  case 8:
                    module1249.setTimeout(function () {
                      if (s.newSwitchGuideView) s.newSwitchGuideView.show();
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
          var t = this,
            n = 0;

          if ((this.mapView && (n = this.mapView.checkAnyInChargerOrRobot()), 0 != n)) {
            var o = 1 == n ? module491.existing_wall_fbz_in_robot : module491.existing_wall_fbz_in_charger,
              s = {
                text: module491.map_edit_no_save,
              },
              u = {
                text: module491.map_edit_button_text_save,
                onPress: function () {
                  module1249.setTimeout(function () {
                    return t.saveChanges();
                  }, 300);
                },
              };
            this.alert.alert(o, '', [s, u]);
          } else this.saveChanges();
        },
      },
      {
        key: 'saveChanges',
        value: function () {
          var t = this,
            n = module377.RSM.currentMapId,
            o = this.state.mapStatus != module377.MapStatus.None && module1231.MM.maps.length >= 1 && -1 == n && module377.RSM.multiFloorEnabled,
            s = (this.mapView && this.mapView.getFBZParams()) || [],
            u = (this.mapView && this.mapView.getWallsParams()) || [];
          if (!(null == s && null == u))
            module386.default.isMultiFloorSupported()
              ? o
                ? module1249.setTimeout(function () {
                    return t.mapSaveView && t.mapSaveView.show();
                  }, 300)
                : 1 == module1231.MM.maps.length && 1 == module1231.MM.mapCountMax
                ? -1 == n
                  ? this.singleFloorSaveNewMapActionSheet.show()
                  : ((n = module1231.MM.maps[0].id), this.startMapSave(n, u, s))
                : this.startMapSave(n, u, s)
              : this.startMapSave(n, u, s);
        },
      },
      {
        key: 'saveChangesOnMultiFloor',
        value: function (t) {
          if (this.mapSaveView) this.mapSaveView.hide();
          var n = (this.mapView && this.mapView.getFBZParams()) || [],
            o = (this.mapView && this.mapView.getWallsParams()) || [];

          if (null != n || null != o) {
            var s = undefined === t ? -1 : t;
            this.startMapSave(s, o, n);
          }
        },
      },
      {
        key: 'startMapSave',
        value: function (t, n, o) {
          var s = this;
          module1249.setTimeout(function () {
            return s.startLoading();
          }, 300);
          module1249.setTimeout(function () {
            return module1231.MM.saveMap(false, t, n, o, s.onMapSaveCompleted.bind(s));
          }, 500);
        },
      },
      {
        key: 'tryQuiting',
        value: function () {
          var t = this;

          if (this.state.hasEditedMap) {
            var n = {
                text: module491.map_edit_no_save,
                onPress: function () {
                  module383.LogEventCommon('quit_cancel');
                  t.quit();
                },
              },
              o = {
                text: module491.map_edit_button_text_save,
                onPress: function () {
                  module383.LogEventCommon('quit_confirm');
                  module1249.setTimeout(function () {
                    t.trySavingChanges();
                  }, 500);
                },
              };
            this.alert.alert(module491.map_edit_save_current_action, '', [n, o]);
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
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.endEditMap());

                  case 3:
                    t.next = 8;
                    break;

                  case 5:
                    t.prev = 5;
                    t.t0 = t.catch(0);
                    console.log('end edit map error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                  case 8:
                    this.props.navigation.pop();

                  case 9:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 5]],
            Promise
          );
        },
      },
      {
        key: 'onMapSaveCompleted',
        value: function (t) {
          var n = this;
          if (t)
            this.setState(
              {
                hasEditedMap: false,
              },
              function () {
                if (n.mapView) n.mapView.clearAllFBZEditFocus();
                if (n.mapView) n.mapView.clearAllNewAddedFBZFlag();
                module1249.setTimeout(function () {
                  module1231.MM.getMap(true);
                  n.quit();
                }, 1e3);
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                  data: module411.EventKeys.FBZSettingsDidChange,
                });
              }
            );
          else this.showToast(module491.robot_communication_exception);
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
          if (this.newSwitchGuideView) this.newSwitchGuideView.show();
        },
      },
      {
        key: 'onPressAddZoneButton',
        value: function () {
          var t,
            o,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (null == (t = this.mapView) || !t.isAllFBZReachMaxNum()) {
                      u.next = 4;
                      break;
                    }

                    this.showToast(module491.map_edit_forbidden_zone_exceed_limit);
                    u.next = 18;
                    break;

                  case 4:
                    if (null == (o = this.mapView) || !o.isFBZEditZonesReachMaxNum()) {
                      u.next = 8;
                      break;
                    }

                    this.showToast(module491.map_edit_forbidden_zone_exceed_limit);
                    u.next = 18;
                    break;

                  case 8:
                    if (this.mapView) this.mapView.enableAddingNogoMode(function () {});
                    setTimeout(function () {
                      return s.mapView.checkAnyInChargerOrRobot();
                    }, 200);
                    u.prev = 10;
                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module407.default.startEditMap());

                  case 13:
                    u.next = 18;
                    break;

                  case 15:
                    u.prev = 15;
                    u.t0 = u.catch(10);
                    console.log('add no go zone: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

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
        key: 'onPressAddMoppingFBZoneButton',
        value: function () {
          var t,
            o,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (null == (t = this.mapView) || !t.isMoppingFBZReachMaxNum()) {
                      u.next = 4;
                      break;
                    }

                    this.showToast(module491.map_edit_forbidden_zone_exceed_limit);
                    u.next = 18;
                    break;

                  case 4:
                    if (null == (o = this.mapView) || !o.isFBZEditZonesReachMaxNum()) {
                      u.next = 8;
                      break;
                    }

                    this.showToast(module491.map_edit_forbidden_zone_exceed_limit);
                    u.next = 18;
                    break;

                  case 8:
                    if (this.mapView) this.mapView.addMoppingFBZone();
                    setTimeout(function () {
                      return s.mapView.checkAnyInChargerOrRobot();
                    }, 200);
                    u.prev = 10;
                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module407.default.startEditMap());

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
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (!this.mapView || !this.mapView.isWallReachMaxNum()) {
                      s.next = 4;
                      break;
                    }

                    this.showToast(module491.map_edit_virtual_wall_exceed_limit);
                    s.next = 18;
                    break;

                  case 4:
                    if (null == (t = this.mapView) || !t.isFBZEditZonesReachMaxNum()) {
                      s.next = 8;
                      break;
                    }

                    this.showToast(module491.map_edit_forbidden_zone_exceed_limit);
                    s.next = 18;
                    break;

                  case 8:
                    if (this.mapView) this.mapView.enableAddingWallMode(function () {});
                    setTimeout(function () {
                      return o.mapView.checkAnyInChargerOrRobot();
                    }, 200);
                    s.prev = 10;
                    s.next = 13;
                    return regeneratorRuntime.default.awrap(module407.default.startEditMap());

                  case 13:
                    s.next = 18;
                    break;

                  case 15:
                    s.prev = 15;
                    s.t0 = s.catch(10);
                    console.log('add new wall error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 18:
                  case 'end':
                    return s.stop();
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
            o,
            s,
            u = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (null == (t = this.mapView) || !t.isCleanFBZReachMaxNum()) {
                      l.next = 4;
                      break;
                    }

                    this.showToast(module491.map_edit_forbidden_zone_exceed_limit);
                    l.next = 18;
                    break;

                  case 4:
                    if (null == (o = this.mapView) || !o.isFBZEditZonesReachMaxNum()) {
                      l.next = 8;
                      break;
                    }

                    this.showToast(module491.map_edit_forbidden_zone_exceed_limit);
                    l.next = 18;
                    break;

                  case 8:
                    if (!(null == (s = this.mapView))) s.addCleaningFBZone();
                    setTimeout(function () {
                      return u.mapView.checkAnyInChargerOrRobot();
                    }, 200);
                    l.prev = 10;
                    l.next = 13;
                    return regeneratorRuntime.default.awrap(module407.default.startEditMap());

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
          if (!(this.state.mapStatus == module377.MapStatus.None || this.state.hasEditedMap)) {
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
          if (this.loadingView) this.loadingView.showWithText(module491.rubys_main_diag_update_map);
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
          if (module377.RSM.isRunning)
            module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
              globals.showToast(module491.robot_communication_exception);
            });
          else this.requestMultiFloorFeature(true);
        },
      },
      {
        key: 'onTapSingleFloorSaveActionSheet',
        value: function (t) {
          if (t == module1231.CurrentMapId) this.singleFloorSaveNewMapAlert.show();
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
              n.startMapSave(module1231.CurrentMapId, o, t);
            })
            .catch(function (o) {
              n.setState({
                multiFloorEnabled: !t,
              });
              globals.showToast(module491.robot_communication_exception);
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
            ? new module1802.default(function (t, n) {
                module407.default
                  .setLabStatus({
                    lab_status: 3,
                  })
                  .then(function (n) {
                    console.log('SetLabStatus3Success: ' + JSON.stringify(n));
                    module377.RSM.multiFloorEnabled = true;
                    module1231.MM.getMultiMaps();
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
        key: 'manualSegmentMap',
        value: function (t) {
          return module407.default.manualSegmentMap(
            module386.default.isMultiFloorSupported()
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
            o = React.default.createElement(module1233.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              parent: this,
              style: module1344.MapEditCommonStyles.map,
              left: module1344.MapEditCommonStyles.mapLeft,
              right: module1344.MapEditCommonStyles.mapRight,
              top: module1344.MapEditCommonStyles.mapTop,
              bottom: module1344.MapEditCommonStyles.mapBottom,
              initFBZone: this.carpetRect,
              mapMode: module936.MAP_MODE_MAP_EDIT,
              zonesHasEdited: this.state.hasEditedMap,
            }),
            s = this.state.mapStatus == module377.MapStatus.None ? module1344.default.getNoMapTipView(this.state.mapStatus) : o,
            u = React.default.createElement(module1243.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.singleFloorSaveNewMapActionSheet = n);
              },
              mode: module1243.MapSaveActionSheetMode.SingleFloorWithoutSave,
              handleSaveMap: function (n) {
                return t.onTapSingleFloorSaveActionSheet.apply(t, [n]);
              },
            }),
            l = React.default.createElement(module1935.SingleFloorSaveNewMapAlert, {
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
                module1344.MapEditCommonStyles.root,
                {
                  height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            s,
            React.default.createElement(module1326.default, {
              type: module1326.MenuType.Menu_Fbz,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressAddZoneButton: this.onPressAddZoneButton.bind(this),
              onPressAddMoppingFBZoneButton: this.onPressAddMoppingFBZoneButton.bind(this),
              onPressAddVirtualWallButton: this.onPressAddVirtualWallButton.bind(this),
              onPressAddCleaningFBZoneButton: this.onPressAddCleaningFBZoneButton.bind(this),
            }),
            React.default.createElement(module1243.MapSaveActionSheetView, {
              ref: function (n) {
                return (t.mapSaveView = n);
              },
              handleSaveMap: this.saveChangesOnMultiFloor.bind(this),
            }),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            React.default.createElement(module1808.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.forbiddenZone,
              topTitle: module491.map_edit_virtual_wall_and_forbidden_zone_title,
              context: module1344.default.isMopForbiddenSupported()
                ? module491.map_edit_virtual_wall_and_forbidden_zone_info1 + '\n' + module491.map_edit_virtual_wall_and_forbidden_zone_info2
                : module491.map_edit_virtual_wall_and_forbidden_zone_info3,
              hintText: module491.map_edit_guide_wall_tip_line2,
              buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['map_edit_virtual_wall_guide_ok'],
            }),
            u,
            l,
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_forbidden_view_loading',
              closeAccessibilityLabelKey: 'map_edit_forbidden_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onOverTimer: function () {
                globals.showToast(module491.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = I;
I.contextType = module506.AppConfigContext;
