var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module415 = require('./415'),
  module1120 = require('./1120'),
  module381 = require('./381'),
  module420 = require('./420'),
  module385 = require('./385'),
  module416 = require('./416'),
  module391 = require('./391'),
  module390 = require('./390'),
  module1192 = require('./1192'),
  module1340 = require('./1340'),
  module1118 = require('./1118'),
  module382 = require('./382'),
  module1343 = require('./1343'),
  module394 = require('./394'),
  module1193 = require('./1193'),
  module387 = require('./387'),
  module424 = require('./424');

function T(t, n) {
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

function W(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      T(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      T(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function K() {
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

var module1337 = require('./1337'),
  module1414 = require('./1414'),
  module510 = require('./510').strings,
  j = (function (t) {
    module9.default(T, t);

    var n = T,
      module50 = K(),
      L = function () {
        var t,
          s = module12.default(n);

        if (module50) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, u);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function T(t) {
      var n;
      module6.default(this, T);

      (n = L.call(this, t)).onNavigationGuidePress = function () {
        if (n.newSwitchGuideView) n.newSwitchGuideView.show();
      };

      n.setSmartMode = function () {
        var t, o, l, c, p, f, M, h, v, w, C, y, b, k, x;
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  if ((p = null == (t = module415.MM.mapData) ? undefined : null == (o = t.map) ? undefined : o.colorData) && 'object' == typeof p) {
                    s.next = 3;
                    break;
                  }

                  return s.abrupt('return');

                case 3:
                  if (((f = module424.DMM.isGarnet ? 1 : 0), (M = []), (h = []), module415.MM.roomNameMapping && module415.MM.roomNameMapping.length > 0))
                    for (v = module415.MM.roomNameMapping.concat(), w = 0; w < v.length; w++)
                      3 == v[w].length &&
                        v[w][2] > 0 &&
                        ((C = v[w][0]),
                        (y = v[w][2]),
                        (b = module1120.RoomTagInfo[y]) &&
                          'object' == typeof b &&
                          ((k = {
                            segment: parseInt(C),
                          }),
                          module22.default(k, {
                            fan_power: b.fan_power,
                            water_box_mode: b.warter_mode,
                            mop_mode: 300,
                            mop_template_id: f,
                          }),
                          M.push(k),
                          h.push(C)));
                  x = null == (l = module415.MM.mapData) ? undefined : null == (c = l.floorMap) ? undefined : c.data;
                  Object.keys(p).forEach(function (t) {
                    var n = parseInt(t);

                    if (p[t] > 0 && -1 == h.indexOf(n)) {
                      var o = {
                        segment: n,
                      };
                      if (x && 3 == x[t])
                        module22.default(o, {
                          fan_power: 101,
                          water_box_mode: 202,
                          mop_mode: 300,
                          mop_template_id: f,
                        });
                      else
                        module22.default(o, {
                          fan_power: 102,
                          water_box_mode: 202,
                          mop_mode: 300,
                          mop_template_id: f,
                        });
                      M.push(o);
                    }
                  });

                  if (M.length > 0) {
                    n.cleanWaterModeMaps = M;
                    n.trySavingChanges(true);
                  }

                case 9:
                case 'end':
                  return s.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      n.onNavigationSavePress = function () {
        module1414.setTimeout(function () {
          return n.trySavingChanges();
        }, 300);
      };

      n.handleSelectedBlocksDidChange = function (t) {
        n.selectedSegements = t;
        module1414.setTimeout(function () {
          if (n.mapSaveButton) n.mapSaveButton.setEnabled(true);
        }, 50);
      };

      n.didTapBlockInCustomMode = function (t) {
        var o, s;
        n.showCustomModeViewForSegment(t);
        n.currentSelectedBlockId = t;
        if (!(null == (o = n.editMenu))) o.hideSmartCustomGuide();
        if (!(null == (s = n.editMenu))) s.showModeSetMenu();
      };

      n.onResetButtonPressed = function () {
        var t, o, u;
        return regeneratorRuntime.default.async(
          function (l) {
            for (;;)
              switch ((l.prev = l.next)) {
                case 0:
                  try {
                    o = {
                      text: module510.localization_strings_Main_MainPage_11,
                    };
                    u = {
                      text: module510.rubys_location_confirm_button_confirm,
                      onPress: function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  n.resetCleanMode();

                                case 1:
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
                    };
                    if (!(null == (t = globals.Alert))) t.alert('', module510.reset_clean_mode_prompt, [o, u]);
                  } catch (t) {
                    console.log('resetCleanSequence  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                  }

                case 1:
                case 'end':
                  return l.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      n.onPressSmartModeButton = function () {
        var t = {
            text: module510.localization_strings_Main_MainPage_11,
          },
          o = {
            text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: n.setSmartMode,
          };
        globals.Alert.alert(module510.map_edit_mode_smart_tip, '', [t, o]);
      };

      n.onPressCustomModeButton = function () {
        var t,
          o = (null == (t = n.mapView) ? undefined : t.getCurrentSelectBlock()) || [];
        if (1 == o.length) n.showCustomModeViewForSegment(o[0]);
      };

      n.onPressConfirmButtonForCustom = function () {
        n.editMenu.hideConfirmMenu();
        n.trySavingChanges();
      };

      n.onPressCancelButtonForCustom = function () {
        var t, o;
        if (!(null == (t = n.mapView))) t.resetSelectBlocks();
        n.cleanWaterModeMaps = module415.MM.customCleanModes;
        if (!(null == (o = n.mapView))) o.setAllCleanMopMode(n.cleanWaterModeMaps.concat());
      };

      var o = (n.props.navigation.state.params || {}).action;
      n.state = {
        action: o,
        hasEditedCustomMode: false,
        mapStatus: module381.RSM.mapStatus,
        isResetCustomModeEnable: false,
      };
      n.currentSelectedBlockId = -1;
      n.cleanWaterModeMaps = module415.MM.customCleanModes;
      n.originalCleanWaterModeMaps = module415.MM.customCleanModes;
      n.showSmartMenu = n.initShowSmartSet();
      return n;
    }

    module7.default(T, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onNavigationBackPress();
            return true;
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.configNavibar();
          this.initMapView();
          this.registListeners();
          setTimeout(function () {
            t.checkResetMode();
          }, 50);
          this.showGuideViewIfNeeded();
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
            n = module1343.default.guideButton(this.onNavigationGuidePress, function (n) {
              t.guideButton = n;
            }),
            o = module1343.default.confirmButton(this.onNavigationSavePress, false, function (n) {
              t.mapSaveButton = n;
            }),
            s = this.showSmartMenu ? [n] : [o];
          module1343.default.setNavigation(this, globals.isRTL ? s.reverse() : s, this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t, n;
          if (!(null == (t = this.mapView))) t.setState(W({}, module415.MM.mapData));
          if (!(null == (n = this.mapView))) n.setAllCleanMopMode(module415.MM.customCleanModes);
        },
      },
      {
        key: 'initShowSmartSet',
        value: function () {
          return module390.default.isSupportFloorEdit() && module390.default.isSupportRoomTag();
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
                    if (module381.RSM.mapStatus != module381.MapStatus.None && module381.RSM.mapStatus != module381.MapStatus.Has_WithoutSegments) {
                      u.next = 2;
                      break;
                    }

                    return u.abrupt('return');

                  case 2:
                    t = module420.StorageKeys.CustomModebyGuide;
                    u.next = 5;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(t));

                  case 5:
                    if (((n = u.sent), !!n)) {
                      u.next = 11;
                      break;
                    }

                    u.next = 10;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(t, t));

                  case 10:
                    module1414.setTimeout(function () {
                      var t, n;
                      if (!(null == (t = o.newSwitchGuideView))) t.show();
                      if (o.showSmartMenu) null == (n = o.editMenu) || n.showSmartCustomGuide(module510.smart_custom_mode_guide_tip_text);
                    }, 50);

                  case 11:
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
        key: 'registListeners',
        value: function () {
          var t = this,
            n = this.mapView;
          this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (t) {
            if (n)
              n.setState(
                W(
                  W({}, module415.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
          });
          this.cleanModeListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (t) {
            if (t.data == module420.EventKeys.SegmentCustomModeDidReceive && n) n.setAllCleanMopMode(module415.MM.customCleanModes);
          });
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module381.RSM.mapStatus,
            });
          });
        },
      },
      {
        key: 'removeListeners',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
          if (this.backListener) this.backListener.remove();
          if (this.cleanModeListener) this.cleanModeListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
        },
      },
      {
        key: 'checkResetMode',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module415.MM.getCustomCleanMode());

                  case 2:
                    t = module415.MM.customCleanModes;
                    module387.LogEventStatus('custom_mode_info', {
                      mode: module415.MM.customCleanModes,
                    });
                    if (t && t.length > 0) this.setSaveModeButtonEnabled();

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
        key: 'trySavingChanges',
        value: function () {
          var t,
            n = this,
            o = arguments;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((t = o.length > 0 && undefined !== o[0] && o[0]), this.checkDataValid())) {
                      u.next = 5;
                      break;
                    }

                    this.showToast(module510.map_edit_split_restriction_num);
                    return u.abrupt('return');

                  case 5:
                    if (!module390.default.isSupportCustomModeInCleaning()) {
                      u.next = 8;
                      break;
                    }

                    u.next = 8;
                    return regeneratorRuntime.default.awrap(module416.default.startEditMap());

                  case 8:
                    module1414.setTimeout(function () {
                      return n.saveChanges(t);
                    }, 100);

                  case 9:
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
        key: 'saveChanges',
        value: function () {
          var t,
            n = arguments;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = n.length > 0 && undefined !== n[0] && n[0];
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(this.setCustomCleanMode());

                  case 3:
                    if (!this.checkIsCustomMode(t)) {
                      o.next = 6;
                      break;
                    }

                    o.next = 6;
                    return regeneratorRuntime.default.awrap(this.setModeCompleted(t));

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
        key: 'setModeCompleted',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (t || this.showSmartMenu) {
                      n.next = 4;
                      break;
                    }

                    this.quit();
                    n.next = 13;
                    break;

                  case 4:
                    n.prev = 4;
                    n.next = 7;
                    return regeneratorRuntime.default.awrap(module415.MM.getCustomCleanMode());

                  case 7:
                    this.cleanWaterModeMaps = module415.MM.customCleanModes;
                    this.originalCleanWaterModeMaps = module415.MM.customCleanModes;
                    n.next = 13;
                    break;

                  case 11:
                    n.prev = 11;
                    n.t0 = n.catch(4);

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[4, 11]],
            Promise
          );
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
                    if (module390.default.isSupportCustomModeInCleaning()) module1343.default.endEditMap();
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
        key: 'checkDataValid',
        value: function () {
          var t, n;
          if ((null == (t = this.cleanWaterModeMaps) ? undefined : t.length) > 16) return false;
          if (
            (null == (n = this.mapView) ? undefined : n.getExistingBlocks()).length > 16 &&
            -1 !=
              this.cleanWaterModeMaps.findIndex(function (t) {
                return t.segment < 16;
              })
          )
            return false;
          return true;
        },
      },
      {
        key: 'setCustomCleanMode',
        value: function () {
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    module1414.setTimeout(function () {
                      return n.startLoading();
                    }, 100);
                    o.prev = 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module416.default.setCustomCleanMode(this.cleanWaterModeMaps));

                  case 4:
                    this.endLoading();
                    if (!(null == (t = this.mapView))) t.setAllCleanMopMode(this.cleanWaterModeMaps.concat());
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.SegmentCustomModeDidChange,
                    });
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.MapSegmentsDidChange,
                    });
                    o.next = 14;
                    break;

                  case 10:
                    o.prev = 10;
                    o.t0 = o.catch(1);
                    this.endLoading();
                    this.showToast(module510.robot_communication_exception);

                  case 14:
                  case 'end':
                    return o.stop();
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
        key: 'checkIsCustomMode',
        value: function () {
          var t = this,
            n = arguments.length > 0 && undefined !== arguments[0] && arguments[0],
            o = module381.RSM.fanPower,
            u = module381.RSM.waterBoxMode,
            l = module381.RSM.mopMode;

          if (!module382.isModeCustomized(o, u, l)) {
            var c;
            this.syncCustomMode();
            var p = {
              text: module510.localization_strings_Setting_RemoteControlPage_51,
              onPress: function () {
                return regeneratorRuntime.default.async(
                  function (o) {
                    for (;;)
                      switch ((o.prev = o.next)) {
                        case 0:
                          module387.LogEventCommon('sync_confirm');
                          t.setModeCompleted(n);

                        case 2:
                        case 'end':
                          return o.stop();
                      }
                  },
                  null,
                  null,
                  null,
                  Promise
                );
              },
            };
            if (!(null == (c = globals.Alert))) c.alert('', module510.custom_mode_sync_title, [p]);
            return false;
          }

          return true;
        },
      },
      {
        key: 'syncCustomMode',
        value: function () {
          var t, n, o;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((t = 106), (n = 204), (o = 302), (u.prev = 3), !module390.default.isShakeMopSetSupported())) {
                      u.next = 10;
                      break;
                    }

                    u.next = 7;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanMopMode(t, n, o));

                  case 7:
                    module381.RSM.mopMode = o;
                    u.next = 19;
                    break;

                  case 10:
                    if (!module381.RSM.isSupportFeature(118)) {
                      u.next = 15;
                      break;
                    }

                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanMotorMode(t, n));

                  case 13:
                    u.next = 19;
                    break;

                  case 15:
                    u.next = 17;
                    return regeneratorRuntime.default.awrap(module416.default.setCustomMode(t));

                  case 17:
                    u.next = 19;
                    return regeneratorRuntime.default.awrap(module416.default.setWaterBoxMode(n));

                  case 19:
                    module381.RSM.fanPower = t;
                    module381.RSM.waterBoxMode = n;
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.CleanWaterModeDidChange,
                      modes: {
                        cleanMode: t,
                        waterMode: n,
                        mopMode: o,
                      },
                    });
                    u.next = 27;
                    break;

                  case 24:
                    u.prev = 24;
                    u.t0 = u.catch(3);
                    this.showToast(module510.robot_communication_exception);

                  case 27:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[3, 24]],
            Promise
          );
        },
      },
      {
        key: 'showCustomModeViewForSegment',
        value: function (t) {
          var n = this.cleanWaterModeMaps.find(function (n) {
              return n.segment == t;
            }),
            o = module424.DMM.isGarnet ? (null == n ? undefined : n.mop_template_id) : (null == n ? undefined : n.mop_mode) || 300;
          if (this.customModeView) this.customModeView.show(n ? n.fan_power : 102, n ? n.water_box_mode : 202, o);
        },
      },
      {
        key: 'resetCleanMode',
        value: function () {
          var t,
            n,
            o,
            u,
            l,
            c = this;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (
                      (module1414.setTimeout(function () {
                        return c.startLoading();
                      }, 100),
                      (p.prev = 1),
                      !module390.default.isSupportCustomModeInCleaning())
                    ) {
                      p.next = 5;
                      break;
                    }

                    p.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.startEditMap());

                  case 5:
                    p.next = 7;
                    return regeneratorRuntime.default.awrap(module416.default.setCustomCleanMode([]));

                  case 7:
                    if (!module381.RSM.hasCustomMode()) {
                      p.next = 45;
                      break;
                    }

                    p.t0 = parseInt;
                    p.next = 12;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.CleanMode));

                  case 12:
                    p.t1 = p.sent;
                    t = p.t0(p.t1);
                    p.t2 = parseInt;
                    p.next = 17;
                    return regeneratorRuntime.default.awrap(module420.GetStorageKey(module420.StorageKeys.WaterMode));

                  case 17:
                    if (
                      ((p.t3 = p.sent),
                      (n = p.t2(p.t3)),
                      (106 != t && 108 != t) || (t = 101),
                      204 == n && (n = 201),
                      (o = t || 101),
                      (u = n || 201),
                      (l = 300),
                      !module390.default.isShakeMopSetSupported())
                    ) {
                      p.next = 29;
                      break;
                    }

                    p.next = 27;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanMopMode(o, u, l));

                  case 27:
                    p.next = 38;
                    break;

                  case 29:
                    if (!module381.RSM.isSupportFeature(118)) {
                      p.next = 34;
                      break;
                    }

                    p.next = 32;
                    return regeneratorRuntime.default.awrap(module416.default.setCleanMotorMode(o, u));

                  case 32:
                    p.next = 38;
                    break;

                  case 34:
                    p.next = 36;
                    return regeneratorRuntime.default.awrap(module416.default.setCustomMode(o));

                  case 36:
                    p.next = 38;
                    return regeneratorRuntime.default.awrap(module416.default.setWaterBoxMode(u));

                  case 38:
                    p.next = 40;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.CleanMode, o + ''));

                  case 40:
                    p.next = 42;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.WaterMode, u + ''));

                  case 42:
                    p.next = 44;
                    return regeneratorRuntime.default.awrap(module420.SetStorageKey(module420.StorageKeys.MopMode, l + ''));

                  case 44:
                    module13.DeviceEventEmitter.emit(module420.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module420.EventKeys.SegmentCustomModeDidChange,
                      modes: {
                        cleanMode: o,
                        waterMode: u,
                        mopMode: l,
                      },
                    });

                  case 45:
                    this.endLoading();
                    p.next = 48;
                    return regeneratorRuntime.default.awrap(this.setModeCompleted(false));

                  case 48:
                    p.next = 54;
                    break;

                  case 50:
                    p.prev = 50;
                    p.t4 = p.catch(1);
                    this.endLoading();
                    this.showToast(module510.robot_communication_exception);

                  case 54:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[1, 50]],
            Promise
          );
        },
      },
      {
        key: 'onNavigationBackPress',
        value: function () {
          var t = this;

          if (module1343.default.isEditedByArrays(this.originalCleanWaterModeMaps, this.cleanWaterModeMaps)) {
            var n,
              o = {
                text: module510.map_edit_no_save,
                onPress: function () {
                  module387.LogEventCommon('save_hint_cancel');
                  t.quit();
                },
              },
              s = {
                text: module510.map_edit_button_text_save,
                onPress: function () {
                  module387.LogEventCommon('save_hint_confirm');
                  module1414.setTimeout(function () {
                    t.trySavingChanges();
                  }, 500);
                },
              };
            if (!(null == (n = globals.Alert))) n.alert(module510.map_edit_save_current_action, '', [o, s]);
          } else this.quit();
        },
      },
      {
        key: 'onCustomModeViewConfirm',
        value: function (t, n, o) {
          var s = this;
          if (this.mapView) this.mapView.setSingleCleanMopMode(this.currentSelectedBlockId, t, n, o);
          var u = this.cleanWaterModeMaps.findIndex(function (t) {
              return t.segment == s.currentSelectedBlockId;
            }),
            l = this.cleanWaterModeMaps.concat();
          if (-1 != u) l.splice(u, 1);
          l.push({
            segment: this.currentSelectedBlockId,
            fan_power: t,
            water_box_mode: n || 202,
            mop_mode: o,
            mop_template_id: null == o ? undefined : o.id,
          });
          this.cleanWaterModeMaps = l;
        },
      },
      {
        key: 'onCloseCustomView',
        value: function () {
          if (this.mapView) this.mapView.resetSelectBlocks();
        },
      },
      {
        key: 'setSaveModeButtonEnabled',
        value: function () {
          if (!(this.state.mapStatus == module381.MapStatus.None || this.state.hasEditedCustomMode)) {
            this.setState({
              hasEditedCustomMode: true,
              isResetCustomModeEnable: true,
            });
            this.configNavibar();
            if (this.mapSaveButton) this.mapSaveButton.setEnabled(true);
            if (this.resetButton) this.resetButton.setEnabled(true);
          }
        },
      },
      {
        key: 'startLoading',
        value: function () {
          if (this.loadingView) this.loadingView.showWithText(module510.rubys_main_diag_update_map);
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module1118.MapView, {
              style: module1343.MapEditCommonStyles.map,
              ref: function (n) {
                return (t.mapView = n);
              },
              parent: this,
              left: module1343.MapEditCommonStyles.mapLeft,
              right: module1343.MapEditCommonStyles.mapRight,
              top: module1343.MapEditCommonStyles.mapTop,
              bottom: module391.default.isIphoneX() ? 130 : 110,
              mapMode: module1337.MAP_MODE_MAP_EDIT,
              inBlockMode: true,
              hideAccessory: true,
              blockBubbleShowInfo: module1118.BlockBubbleShowInfo.DISPLAYNAME | module1118.BlockBubbleShowInfo.CLEANMODE,
              selectedBlocksDidChange: this.handleSelectedBlocksDidChange,
              didTapBlockInCustomMode: this.didTapBlockInCustomMode,
            }),
            s = React.default.createElement(module1192.default, {
              type: module1192.MenuType.Menu_Mode,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressGuideButton: this.onNavigationGuidePress,
            }),
            u = React.default.createElement(module1192.default, {
              type: module1192.MenuType.Menu_Mode_Smart,
              ref: function (n) {
                return (t.editMenu = n);
              },
              hasConfirmMenu: true,
              onPressSmartModeButton: this.onPressSmartModeButton,
              onPressCleanModeButton: this.onResetButtonPressed,
              onPressCustomModeButton: this.onPressCustomModeButton,
              onPressConfirmButtonForCustom: this.onPressConfirmButtonForCustom,
              onPressCancelButtonForCustom: this.onPressCancelButtonForCustom,
            }),
            l = this.showSmartMenu ? u : s,
            c =
              this.state.mapStatus == module381.MapStatus.None || this.state.mapStatus == module381.MapStatus.Has_WithoutSegments
                ? module1343.default.getNoMapTipView(this.state.mapStatus)
                : o,
            p = this.state.isResetCustomModeEnable && this.state.mapStatus != module381.MapStatus.None && this.state.mapStatus != module381.MapStatus.Has_WithoutSegments;
          p = !this.showSmartMenu && p;
          var f = this.state.isResetCustomModeEnable,
            M = module1343.default.resetButton(module510.reset_clean_mode_button_title, f, this.onResetButtonPressed);
          return React.default.createElement(
            module13.View,
            {
              style: [
                module1343.MapEditCommonStyles.root,
                {
                  height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            c,
            l,
            React.default.createElement(module382.ModeSettingPanel, {
              ref: function (n) {
                t.customModeView = n;
              },
              isInMapEditPage: true,
              shouldShowCustomSwitch: false,
              didSetMode: this.onCustomModeViewConfirm.bind(this),
              onPressMore: function () {
                t.customModeView.hide();
                t.props.navigation.navigate('MopModeListPage', {
                  title: module510.custom_mode_panel_more_mode_title,
                });
              },
            }),
            p && M,
            React.default.createElement(module1340.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: module390.default.isSupportWaterMode() ? n.guideImages.mode : n.guideImages.modeWithoutWater,
              topTitle: module510.tanos_custom_mode_title,
              context: module510.tanos_custom_mode_des_info,
              buttonInfo: [module510.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['custom_mode_guide_ok'],
            }),
            React.default.createElement(module385.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_zone_mode_view_loading',
              closeAccessibilityLabelKey: 'map_edit_zone_mode_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onPressCancel: function () {},
              onOverTimer: function () {
                globals.showToast(module510.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return T;
  })(React.Component);

exports.default = j;
j.contextType = module1193.AppConfigContext;
