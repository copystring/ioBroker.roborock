var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = N(require('react')),
  module12 = require('./12'),
  module1229 = require('./1229'),
  module377 = require('./377'),
  module411 = require('./411'),
  module381 = require('./381'),
  module407 = require('./407'),
  module387 = require('./387'),
  module386 = require('./386'),
  module1324 = N(require('./1324')),
  module1806 = require('./1806'),
  module1231 = require('./1231'),
  module378 = require('./378'),
  module1342 = N(require('./1342')),
  module390 = require('./390'),
  module506 = require('./506'),
  module383 = require('./383'),
  module415 = require('./415');

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (O = function (t) {
    return t ? o : n;
  })(t);
}

function N(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = O(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    u = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var l = u ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (l && (l.get || l.set)) Object.defineProperty(s, c, l);
      else s[c] = t[c];
    }

  s.default = t;
  if (o) o.set(t, s);
  return s;
}

function W(t, n) {
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

function K(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      W(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      W(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function T() {
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

var module934 = require('./934'),
  module1247 = require('./1247'),
  module491 = require('./491').strings,
  F = (function (t) {
    module7.default(N, t);

    var module49 = N,
      module506 = T(),
      O = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function N(t) {
      var o;
      module4.default(this, N);

      (o = O.call(this, t)).onNavigationGuidePress = function () {
        if (o.newSwitchGuideView) o.newSwitchGuideView.show();
      };

      o.setSmartMode = function () {
        var t, u, c, l, p, f, h, M;
        return regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  if ((p = null == (t = module1229.MM.mapData) ? undefined : null == (u = t.map) ? undefined : u.colorData) && 'object' == typeof p) {
                    n.next = 3;
                    break;
                  }

                  return n.abrupt('return');

                case 3:
                  f = null == (c = module1229.MM.mapData) ? undefined : null == (l = c.floorMap) ? undefined : l.data;
                  h = true;
                  if (!(f && 'object' == typeof f)) h = false;
                  M = [];
                  Object.keys(p).forEach(function (t) {
                    if (p[t] > 0) {
                      var n = {
                        segment: parseInt(t),
                      };
                      if (!h || !f[t] || (3 != f[t] && 4 != f[t]))
                        module21.default(n, {
                          fan_power: 102,
                          water_box_mode: 202,
                          mop_mode: 300,
                          mop_template_id: 1,
                        });
                      else if (3 == f[t])
                        module21.default(n, {
                          fan_power: 101,
                          water_box_mode: 201,
                          mop_mode: 300,
                          mop_template_id: 1,
                        });
                      else if (4 == f[t])
                        module21.default(n, {
                          fan_power: 102,
                          water_box_mode: 202,
                          mop_mode: 300,
                          mop_template_id: 1,
                        });
                      M.push(n);
                    }
                  });
                  o.cleanWaterModeMaps = M;
                  o.trySavingChanges();

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
      };

      o.onNavigationSavePress = function () {
        module1247.setTimeout(function () {
          return o.trySavingChanges();
        }, 300);
      };

      o.handleSelectedBlocksDidChange = function (t) {
        o.selectedSegements = t;
        module1247.setTimeout(function () {
          if (o.mapSaveButton) o.mapSaveButton.setEnabled(true);
        }, 50);
      };

      o.didTapBlockInCustomMode = function (t) {
        o.showCustomModeViewForSegment(t);
        o.currentSelectedBlockId = t;
        o.editMenu.showModeSetMenu();
      };

      o.onResetButtonPressed = function () {
        var t, s;
        return regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  try {
                    t = {
                      text: module491.localization_strings_Main_MainPage_11,
                    };
                    s = {
                      text: module491.rubys_location_confirm_button_confirm,
                      onPress: function () {
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  o.resetCleanMode();

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
                    o.alert.alert('', module491.reset_clean_mode_prompt, [t, s]);
                  } catch (t) {
                    console.log('resetCleanSequence  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                  }

                case 1:
                case 'end':
                  return u.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      o.onPressSmartModeButton = function () {
        var t = {
            text: module491.localization_strings_Main_MainPage_11,
          },
          n = {
            text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
            onPress: o.setSmartMode,
          };
        globals.Alert.alert(module491.map_edit_mode_smart_tip, '', [t, n]);
      };

      o.onPressCustomModeButton = function () {
        for (var t = 0, n = -1, s = 0; s < o.mapView.state.selectBlockList.length; s++) 0 != o.mapView.state.selectBlockList[s] && ((n = o.mapView.state.selectBlockList[s]), t++);

        if (1 == t) o.showCustomModeViewForSegment(n);
      };

      o.onPressConfirmButtonForCustom = function () {
        o.editMenu.hideConfirmMenu();
        o.trySavingChanges();
      };

      o.onPressCancelButtonForCustom = function () {
        var t, n;
        if (!(null == (t = o.mapView))) t.resetSelectBlocks();
        o.cleanWaterModeMaps = module1229.MM.customCleanModes;
        if (!(null == (n = o.mapView))) n.setAllCleanMopMode(o.cleanWaterModeMaps.concat());
      };

      var c = (o.props.navigation.state.params || {}).action;
      o.state = {
        action: c,
        hasEditedCustomMode: false,
        showShowResetMode: false,
        mapStatus: module377.RSM.mapStatus,
        isResetCustomModeEnable: false,
      };
      o.currentSelectedBlockId = -1;
      o.cleanWaterModeMaps = module1229.MM.customCleanModes;
      o.originalCleanWaterModeMaps = module1229.MM.customCleanModes;
      return o;
    }

    module5.default(N, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
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
          this.setState({
            showShowResetMode: true,
          });
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
            n = module1342.default.guideButton(this.onNavigationGuidePress, function (n) {
              t.guideButton = n;
            }),
            o = module1342.default.confirmButton(this.onNavigationSavePress, false, function (n) {
              t.mapSaveButton = n;
            }),
            s = module386.default.isSupportFloorEdit() ? [n] : [o];
          module1342.default.setNavigation(this, globals.isRTL ? s.reverse() : s, this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'initMapView',
        value: function () {
          var t, n;
          if (!(null == (t = this.mapView))) t.setState(K({}, module1229.MM.mapData));
          if (!(null == (n = this.mapView))) n.setAllCleanMopMode(module1229.MM.customCleanModes);
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
                    t = module411.StorageKeys.CustomModebyGuide;
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
                    module1247.setTimeout(function () {
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
        key: 'registListeners',
        value: function () {
          var t = this,
            n = this.mapView;
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (t) {
            if (n)
              n.setState(
                K(
                  K({}, module1229.MM.mapData),
                  {},
                  {
                    robotStatus: module377.RSM.state,
                  }
                )
              );
          });
          this.cleanModeListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (t) {
            if (t.data == module411.EventKeys.SegmentCustomModeDidReceive && n) n.setAllCleanMopMode(module1229.MM.customCleanModes);
          });
          this.robotStatusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              mapStatus: module377.RSM.mapStatus,
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module1229.MM.getCustomCleanMode());

                  case 2:
                    t = module1229.MM.customCleanModes;
                    module383.LogEventStatus('custom_mode_info', {
                      mode: module1229.MM.customCleanModes,
                    });
                    if (t && t.length > 0) this.setSaveModeButtonEnabled();

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
        key: 'trySavingChanges',
        value: function () {
          if (!this.checkAllSegmentsMode(false)) this.checkAllSegmentsMode(true);
          this.saveChanges();
        },
      },
      {
        key: 'saveChanges',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(this.setCustomCleanMode());

                  case 2:
                    if (this.checkIsCustomMode()) this.props.navigation.pop();

                  case 3:
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
        key: 'checkAllSegmentsMode',
        value: function (t) {
          var n = this,
            o = true;
          this.mapView.getExistingBlocks().forEach(function (s) {
            if (
              !n.cleanWaterModeMaps.find(function (t) {
                return t.segment == s;
              })
            ) {
              o = false;
              if (t)
                n.cleanWaterModeMaps.push({
                  segment: s,
                  fan_power: 102,
                  water_box_mode: 202,
                  mop_mode: 300,
                  mop_template_id: 1,
                });
            }
          });
          return o;
        },
      },
      {
        key: 'setCustomCleanMode',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    module1247.setTimeout(function () {
                      return t.startLoading();
                    }, 100);
                    o.prev = 1;
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomCleanMode(this.cleanWaterModeMaps));

                  case 4:
                    this.endLoading();
                    if (this.mapView) this.mapView.setAllCleanMopMode(this.cleanWaterModeMaps.concat());
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.SegmentCustomModeDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MapSegmentsDidChange,
                    });
                    o.next = 15;
                    break;

                  case 11:
                    o.prev = 11;
                    o.t0 = o.catch(1);
                    this.endLoading();
                    this.showToast(module491.robot_communication_exception);

                  case 15:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[1, 11]],
            Promise
          );
        },
      },
      {
        key: 'checkIsCustomMode',
        value: function () {
          var t = this,
            o = module377.RSM.fanPower,
            s = module377.RSM.waterBoxMode,
            u = module377.RSM.mopMode;

          if (!module378.isModeCustomized(o, s, u)) {
            this.syncCustomMode();
            var c = {
              text: module491.localization_strings_Setting_RemoteControlPage_51,
              onPress: function () {
                return regeneratorRuntime.default.async(
                  function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          module383.LogEventCommon('sync_confirm');
                          t.props.navigation.pop();

                        case 2:
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
            };
            this.alert.alert('', module491.custom_mode_sync_title, [c]);
            return false;
          }

          return true;
        },
      },
      {
        key: 'syncCustomMode',
        value: function () {
          var t, o, s;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (((t = 106), (o = 204), (s = 302), (u.prev = 3), !module386.default.isShakeMopSetSupported())) {
                      u.next = 10;
                      break;
                    }

                    u.next = 7;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMopMode(t, o, s));

                  case 7:
                    module377.RSM.mopMode = s;
                    u.next = 21;
                    break;

                  case 10:
                    if (!module377.RSM.isSupportFeature(118)) {
                      u.next = 15;
                      break;
                    }

                    u.next = 13;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMotorMode(t, o));

                  case 13:
                    u.next = 21;
                    break;

                  case 15:
                    u.next = 17;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomMode(t));

                  case 17:
                    u.next = 20;
                    return regeneratorRuntime.default.awrap(module407.default.setWaterBoxMode(o));

                  case 20:
                    u.sent;

                  case 21:
                    module377.RSM.fanPower = t;
                    module377.RSM.waterBoxMode = o;
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanWaterModeDidChange,
                      modes: {
                        cleanMode: t,
                        waterMode: o,
                        mopMode: s,
                      },
                    });
                    u.next = 29;
                    break;

                  case 26:
                    u.prev = 26;
                    u.t0 = u.catch(3);
                    this.showToast(module491.robot_communication_exception);

                  case 29:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[3, 26]],
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
            o = module415.DMM.isGarnet ? (null == n ? undefined : n.mop_template_id) : (null == n ? undefined : n.mop_mode) || 300;
          if (this.customModeView) this.customModeView.show(n ? n.fan_power : 102, n ? n.water_box_mode : 202, o);
        },
      },
      {
        key: 'resetCleanMode',
        value: function () {
          var t,
            o,
            s,
            u,
            c,
            l = this;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    module1247.setTimeout(function () {
                      return l.startLoading();
                    }, 100);
                    p.prev = 1;
                    p.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomCleanMode([]));

                  case 4:
                    if ((p.sent, !module377.RSM.hasCustomMode())) {
                      p.next = 43;
                      break;
                    }

                    p.t0 = parseInt;
                    p.next = 10;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.CleanMode));

                  case 10:
                    p.t1 = p.sent;
                    t = p.t0(p.t1);
                    p.t2 = parseInt;
                    p.next = 15;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(module411.StorageKeys.WaterMode));

                  case 15:
                    if (
                      ((p.t3 = p.sent),
                      (o = p.t2(p.t3)),
                      106 == t && (t = 101),
                      204 == o && (o = 201),
                      (s = t || 101),
                      (u = o || 201),
                      (c = 300),
                      !module386.default.isShakeMopSetSupported())
                    ) {
                      p.next = 27;
                      break;
                    }

                    p.next = 25;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMopMode(s, u, c));

                  case 25:
                    p.next = 36;
                    break;

                  case 27:
                    if (!module377.RSM.isSupportFeature(118)) {
                      p.next = 32;
                      break;
                    }

                    p.next = 30;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanMotorMode(s, u));

                  case 30:
                    p.next = 36;
                    break;

                  case 32:
                    p.next = 34;
                    return regeneratorRuntime.default.awrap(module407.default.setCustomMode(s));

                  case 34:
                    p.next = 36;
                    return regeneratorRuntime.default.awrap(module407.default.setWaterBoxMode(u));

                  case 36:
                    p.next = 38;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.CleanMode, s + ''));

                  case 38:
                    p.next = 40;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.WaterMode, u + ''));

                  case 40:
                    p.next = 42;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(module411.StorageKeys.MopMode, c + ''));

                  case 42:
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.SegmentCustomModeDidChange,
                      modes: {
                        cleanMode: s,
                        waterMode: u,
                        mopMode: c,
                      },
                    });

                  case 43:
                    this.endLoading();
                    this.props.navigation.pop();
                    p.next = 51;
                    break;

                  case 47:
                    p.prev = 47;
                    p.t4 = p.catch(1);
                    this.endLoading();
                    this.showToast(module491.robot_communication_exception);

                  case 51:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[1, 47]],
            Promise
          );
        },
      },
      {
        key: 'onNavigationBackPress',
        value: function () {
          var t = this;

          if (module1342.default.isEditedByArrays(this.originalCleanWaterModeMaps, this.cleanWaterModeMaps)) {
            var n = {
                text: module491.map_edit_no_save,
                onPress: function () {
                  module383.LogEventCommon('save_hint_cancel');
                  t.props.navigation.pop();
                },
              },
              o = {
                text: module491.map_edit_button_text_save,
                onPress: function () {
                  module383.LogEventCommon('save_hint_confirm');
                  module1247.setTimeout(function () {
                    t.trySavingChanges();
                  }, 500);
                },
              };
            this.alert.alert(module491.map_edit_save_current_action, '', [n, o]);
          } else this.props.navigation.pop();
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
            c = this.cleanWaterModeMaps.concat();
          if (-1 != u) c.splice(u, 1);
          c.push({
            segment: this.currentSelectedBlockId,
            fan_power: t,
            water_box_mode: n || 202,
            mop_mode: o,
            mop_template_id: null == o ? undefined : o.id,
          });
          this.cleanWaterModeMaps = c;
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
          if (!(this.state.mapStatus == module377.MapStatus.None || this.state.hasEditedCustomMode)) {
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(module1231.MapView, {
              style: module1342.MapEditCommonStyles.map,
              ref: function (n) {
                return (t.mapView = n);
              },
              parent: this,
              left: module1342.MapEditCommonStyles.mapLeft,
              right: module1342.MapEditCommonStyles.mapRight,
              top: module1342.MapEditCommonStyles.mapTop,
              bottom: module387.default.isIphoneX() ? 130 : 110,
              mapMode: module934.MAP_MODE_MAP_EDIT,
              inBlockMode: true,
              hideAccessory: true,
              blockBubbleShowInfo: module1231.BlockBubbleShowInfo.CLEANMODE,
              selectedBlocksDidChange: this.handleSelectedBlocksDidChange,
              didTapBlockInCustomMode: this.didTapBlockInCustomMode,
              didTapWhenNoBlock: function () {
                t.setState({
                  showShowResetMode: false,
                });
              },
            }),
            s = React.default.createElement(module1324.default, {
              type: module1324.MenuType.Menu_Mode,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressGuideButton: this.onNavigationGuidePress,
            }),
            u = React.default.createElement(module1324.default, {
              type: module1324.MenuType.Menu_Mode_Smart,
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
            c = module386.default.isSupportFloorEdit() ? u : s,
            l =
              this.state.mapStatus == module377.MapStatus.None || this.state.mapStatus == module377.MapStatus.Has_WithoutSegments
                ? module1342.default.getNoMapTipView(this.state.mapStatus)
                : o,
            p = this.state.isResetCustomModeEnable && this.state.mapStatus != module377.MapStatus.None && this.state.mapStatus != module377.MapStatus.Has_WithoutSegments;
          p = !module386.default.isSupportFloorEdit() && p;
          var f = this.state.isResetCustomModeEnable,
            v = module1342.default.resetButton(module491.reset_clean_mode_button_title, f, this.onResetButtonPressed);
          return React.default.createElement(
            module12.View,
            {
              style: [
                module1342.MapEditCommonStyles.root,
                {
                  height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            l,
            c,
            React.default.createElement(module378.ModeSettingPanel, {
              ref: function (n) {
                t.customModeView = n;
              },
              isInMapEditPage: true,
              shouldShowCustomSwitch: false,
              onPressCloseButton: this.onCloseCustomView.bind(this),
              didSetMode: this.onCustomModeViewConfirm.bind(this),
              onPressMore: function () {
                t.customModeView.hide();
                t.props.navigation.navigate('MopModeListPage', {
                  title: module491.custom_mode_panel_more_mode_title,
                });
              },
            }),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            p && v,
            React.default.createElement(module1806.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.mode,
              topTitle: module491.tanos_custom_mode_title,
              context: module491.tanos_custom_mode_des_info,
              buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['custom_mode_guide_ok'],
            }),
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_zone_mode_view_loading',
              closeAccessibilityLabelKey: 'map_edit_zone_mode_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              onPressCancel: function () {},
              onOverTimer: function () {
                globals.showToast(module491.map_object_ignore_failed);
              },
              showButton: true,
            })
          );
        },
      },
    ]);
    return N;
  })(React.Component);

exports.default = F;
F.contextType = module506.AppConfigContext;
