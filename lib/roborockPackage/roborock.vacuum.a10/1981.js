var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = V(require('react')),
  module12 = require('./12'),
  module377 = require('./377'),
  module1229 = require('./1229'),
  module411 = require('./411'),
  module381 = require('./381'),
  module387 = require('./387'),
  module407 = require('./407'),
  module1324 = V(require('./1324')),
  module1806 = require('./1806'),
  module1231 = require('./1231'),
  module1342 = V(require('./1342')),
  module390 = require('./390'),
  module506 = require('./506'),
  module383 = require('./383');

function x(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    s = new WeakMap();
  return (x = function (t) {
    return t ? s : n;
  })(t);
}

function V(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var s = x(n);
  if (s && s.has(t)) return s.get(t);
  var o = {},
    c = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var u in t)
    if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
      var l = c ? Object.getOwnPropertyDescriptor(t, u) : null;
      if (l && (l.get || l.set)) Object.defineProperty(o, u, l);
      else o[u] = t[u];
    }

  o.default = t;
  if (s) s.set(t, o);
  return o;
}

function R(t, n) {
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

function B(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      R(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function D() {
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

var module1247 = require('./1247'),
  module491 = require('./491').strings,
  T = (function (t) {
    module7.default(V, t);

    var module49 = V,
      module506 = D(),
      x = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function V(t) {
      var n;
      module4.default(this, V);
      (n = x.call(this, t)).state = {
        mapStatus: module377.RSM.mapStatus,
        isResetOrderEnable: false,
        shouldShowResetOrderButton: true,
        showShowResetMode: false,
      };
      n.selectedSegements = [];
      n.blockOperated = false;
      n.originalSelectedSegements = [];
      n.hasSetOriginalSelectedSegements = false;
      return n;
    }

    module5.default(V, [
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
          this.configNavibar();
          this.initMapView();
          this.registListeners();
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
        key: 'initMapView',
        value: function () {
          module1342.default.initMapViewConfig(this.mapView, module1231.MapModelInCleanMode.Segment_Clean_Sequential_Edit);
        },
      },
      {
        key: 'showGuideViewIfNeeded',
        value: function () {
          var t,
            s,
            o = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    t = module411.StorageKeys.CleanSequencebyGuide;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey(t));

                  case 3:
                    if (((s = c.sent), !!s)) {
                      c.next = 9;
                      break;
                    }

                    c.next = 8;
                    return regeneratorRuntime.default.awrap(module411.SetStorageKey(t, t));

                  case 8:
                    module1247.setTimeout(function () {
                      if (o.newSwitchGuideView) o.newSwitchGuideView.show();
                    }, 50);

                  case 9:
                  case 'end':
                    return c.stop();
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
          var t = this;
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (n) {
            if (t.mapView)
              t.mapView.setState(
                B(
                  B({}, module1229.MM.mapData),
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
          this.cleanSequenceListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            if (n.data == module411.EventKeys.CleanSequenceDidReceive && t.mapView) t.mapView.setCleanSequence(module1229.MM.cleanSequence.concat(), false);
          });
        },
      },
      {
        key: 'removeListeners',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
          if (this.backListener) this.backListener.remove();
          if (this.cleanSequenceListener) this.cleanSequenceListener.remove();
          if (this.robotStatusListener) this.robotStatusListener.remove();
        },
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = this,
            n = [
              module1342.default.confirmButton(this.onNavigationSavePress.bind(this), false, function (n) {
                t.mapSaveButton = n;
              }),
            ];
          module1342.default.setNavigation(this, globals.isRTL ? n.reverse() : n, this.onNavigationBackPress.bind(this));
        },
      },
      {
        key: 'onNavigationGuidePress',
        value: function () {
          if (this.newSwitchGuideView) this.newSwitchGuideView.show();
        },
      },
      {
        key: 'onResetOrder',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    this.alert.hide();
                    this.startLoading();
                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanSequence([]));

                  case 5:
                    this.endLoading();
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanSequenceDidChange,
                    });
                    this.props.navigation.pop();
                    t.next = 15;
                    break;

                  case 11:
                    t.prev = 11;
                    t.t0 = t.catch(0);
                    this.endLoading();
                    this.showToast(module491.robot_communication_exception);

                  case 15:
                  case 'end':
                    return t.stop();
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
        key: 'trySavingCleanOrder',
        value: function () {
          var t = this;
          if (this.checkAllSegmentsOrdered()) this.saveCleanOrder();
          else {
            var s = {
                text: module491.localization_strings_Main_MainPage_11,
                onPress: function () {
                  module383.LogEventCommon('segements_not_set_for_all_cancel');
                },
              },
              o = {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  return regeneratorRuntime.default.async(
                    function (s) {
                      for (;;)
                        switch ((s.prev = s.next)) {
                          case 0:
                            module383.LogEventCommon('segements_not_set_for_all_confirm');
                            s.next = 3;
                            return regeneratorRuntime.default.awrap(t.saveCleanOrder());

                          case 3:
                          case 'end':
                            return s.stop();
                        }
                    },
                    null,
                    null,
                    null,
                    Promise
                  );
                },
              };
            this.alert.alert('', module491.clean_sequence_not_set_for_all_segments_tip, [s, o]);
          }
        },
      },
      {
        key: 'saveCleanOrder',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!this.blockOperated && 0 == this.selectedSegements) {
                      t.next = 20;
                      break;
                    }

                    t.prev = 1;
                    this.alert.hide();
                    this.startLoading();
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(module407.default.setCleanSequence(this.selectedSegements));

                  case 6:
                    this.endLoading();
                    if (this.mapView) this.mapView.resetSelectBlocks();
                    this.blockOperated = false;
                    this.selectedSegements = [];
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.CleanSequenceDidChange,
                    });
                    module12.DeviceEventEmitter.emit(module411.NotificationKeys.DidReceiveSpecialEvent, {
                      data: module411.EventKeys.MapSegmentsDidChange,
                    });
                    this.props.navigation.pop();
                    t.next = 20;
                    break;

                  case 16:
                    t.prev = 16;
                    t.t0 = t.catch(1);
                    this.endLoading();
                    this.showToast(module491.robot_communication_exception);

                  case 20:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[1, 16]],
            Promise
          );
        },
      },
      {
        key: 'checkAllSegmentsOrdered',
        value: function () {
          return this.mapView.getExistingBlocks().length == this.selectedSegements.length;
        },
      },
      {
        key: 'onNavigationSavePress',
        value: function () {
          this.trySavingCleanOrder();
        },
      },
      {
        key: 'onNavigationBackPress',
        value: function () {
          var t = this;

          if (module1342.default.isEditedByArrays(this.originalSelectedSegements, this.selectedSegements)) {
            var n = {
                text: module491.map_edit_no_save,
                onPress: function () {
                  module383.LogEventCommon('save_hint_cancel');
                  t.props.navigation.pop();
                },
              },
              s = {
                text: module491.map_edit_button_text_save,
                onPress: function () {
                  module383.LogEventCommon('save_hint_confirm');
                  module1247.setTimeout(function () {
                    t.trySavingCleanOrder();
                  }, 500);
                },
              };
            this.alert.alert(module491.map_edit_save_current_action, '', [n, s]);
          } else this.props.navigation.pop();
        },
      },
      {
        key: 'onResetButtonPress',
        value: function () {
          var t,
            s,
            o = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    try {
                      t = {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          module383.LogEventCommon('reset_clean_orders_cancel');
                        },
                      };
                      s = {
                        text: module491.rubys_location_confirm_button_confirm,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    module383.LogEventCommon('reset_clean_orders_confirm');
                                    o.onResetOrder();

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
                        },
                      };
                      this.alert.alert('', module491.reset_order_prompt, [t, s]);
                    } catch (t) {
                      this.endLoading();
                    }

                  case 1:
                  case 'end':
                    return c.stop();
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
        key: 'onSelectedBlocksChanged',
        value: function (t) {
          var n = this;

          if (!this.hasSetOriginalSelectedSegements) {
            this.originalSelectedSegements = t.concat();
            this.hasSetOriginalSelectedSegements = true;
          }

          this.selectedSegements = t;
          var s = 0 != this.selectedSegements.length && this.originalSelectedSegements.length > 0;
          module1247.setTimeout(function () {
            n.setState({
              isResetOrderEnable: s,
            });
            n.configNavibar();
            if (n.resetButton) n.resetButton.setEnabled(s);
            if (n.mapSaveButton) n.mapSaveButton.setEnabled(n.blockOperated || n.originalSelectedSegements.length > 0);
            n.blockOperated = true;
          }, 50);
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
            s = React.default.createElement(module1231.MapView, {
              ref: function (n) {
                t.mapView = n;
              },
              style: module1342.MapEditCommonStyles.map,
              parent: this,
              left: module1342.MapEditCommonStyles.mapLeft,
              right: module1342.MapEditCommonStyles.mapRight,
              top: module1342.MapEditCommonStyles.mapTop,
              bottom: module387.default.isIphoneX() ? 130 : 110,
              selectedBlocksDidChange: this.onSelectedBlocksChanged.bind(this),
              didTapWhenNoBlock: function () {
                t.setState({
                  shouldShowResetOrderButton: false,
                  showShowResetMode: false,
                });
              },
            }),
            o =
              this.state.mapStatus == module377.MapStatus.None || this.state.mapStatus == module377.MapStatus.Has_WithoutSegments
                ? module1342.default.getNoMapTipView(this.state.mapStatus)
                : s,
            c = this.state.isResetOrderEnable && this.state.mapStatus != module377.MapStatus.None && this.state.mapStatus != module377.MapStatus.Has_WithoutSegments,
            u = module1342.default.resetButton(module491.reset_order_button_title, this.state.isResetOrderEnable, this.onResetButtonPress.bind(this));
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
            o,
            React.default.createElement(module1324.default, {
              type: module1324.MenuType.Menu_Order,
              onPressGuideButton: function () {
                t.onNavigationGuidePress();
              },
            }),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            }),
            c && u,
            React.default.createElement(module1806.default, {
              ref: function (n) {
                t.newSwitchGuideView = n;
              },
              isModal: true,
              parent: this,
              bgImage: n.guideImages.order,
              topTitle: module491.map_edit_bottom_menu_order_title,
              context: module491.map_edit_bottom_menu_order_info1,
              buttonInfo: [module491.localization_strings_Setting_RemoteControlPage_51],
              buttonFuncId: ['map_edit_order_guide_ok'],
            }),
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'map_edit_zone_order_view_loading',
              closeAccessibilityLabelKey: 'map_edit_zone_order_view_loading_close',
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
    return V;
  })(React.Component);

exports.default = T;
T.contextType = module506.AppConfigContext;
