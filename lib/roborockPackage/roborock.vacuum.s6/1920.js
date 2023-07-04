require('./390');

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = y(n);
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
  })(require('react')),
  module12 = require('./12'),
  module1921 = require('./1921'),
  module381 = require('./381'),
  module1233 = require('./1233'),
  module407 = require('./407'),
  module1231 = require('./1231'),
  module411 = require('./411'),
  module377 = require('./377'),
  module506 = require('./506'),
  module1344 = require('./1344');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function E(t, n) {
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

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      E(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      E(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function R() {
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

require('./389');

require('./1853');

var module385 = require('./385'),
  module491 = require('./491').strings,
  module1371 = require('./1371'),
  module1362 = require('./1362').getToast,
  module1249 = require('./1249'),
  D = (function (t) {
    module7.default(E, t);

    var module49 = E,
      module506 = R(),
      y = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = y.call(this, t)).state = {
        menu: t.menu,
        menuMode: t.menuMode,
        robotStatus: 0,
        shouldShowToast: false,
      };
      currentRobotStatus = 0;
      lastInGotoStatus = false;
      invalidMapSequenceNum = 0;
      hasOperated = false;
      return n;
    }

    module5.default(E, [
      {
        key: 'isGoing',
        get: function () {
          return this.editMenu && this.editMenu.state.isGoing;
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          module1231.MapManager.sharedManager().shouldForceStart = true;
          module1231.MapManager.sharedManager().start();
          this.backListener = module12.BackHandler.addEventListener(module12.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onLeftButtonPress();
            return true;
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n = this;
          if (!(null == (t = this.mapView))) t.enterGotoEditMode();
          if (this.mapView) this.mapView.setState(P({}, module1231.MapManager.sharedManager().mapData));

          this._wakeupRobot();

          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (t) {
            if (n.mapView)
              n.mapView.setState(
                P(
                  P({}, module1231.MapManager.sharedManager().mapData),
                  {},
                  {
                    robotStatus: module377.RobotStatusManager.sharedManager().state,
                  }
                )
              );
          });
          this.statusListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (t) {
            n.checkButtonStatus();
          });
          this.registerToastListener();
          this.registerEventToastListener();
          if (this.editMenu) this.editMenu.setCleanButonEnabled(false);
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.mapEdit.backgroundColor,
            onPressLeft: this.onLeftButtonPress.bind(this),
            hiddenBottomLine: true,
          });
          this.startCheckRunningTimer.bind(this);
          this.resetIsGoingTimer.bind(this);
          this.startIsGoingTimer.bind(this);
          this.startCheckRunningTimer();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mapListener.remove();
          this.statusListener.remove();
          this.specialToastListener.remove();
          this.robotEventListener.remove();
          module1231.MapManager.sharedManager().shouldForceStart = false;
          module1231.MapManager.sharedManager().stop();
          if (this.backListener) this.backListener.remove();
          if (this.isGoingTimer) clearTimeout(this.isGoingTimer);
          if (this.checkRunningTimer) clearTimeout(this.checkRunningTimer);
          this.isGoingTimer = null;
          this.checkRunningTimer = null;
        },
      },
      {
        key: 'startCheckRunningTimer',
        value: function () {
          var t = this;
          this.checkRunningTimer = setInterval(function () {
            if (module377.RSM.isRunning) t.resetIsGoingTimer();
          }, 1e3);
        },
      },
      {
        key: 'startIsGoingTimer',
        value: function () {
          var t = this;
          this.isGoingTimer = setTimeout(function () {
            if (t.editMenu)
              t.editMenu.setState({
                isGoing: false,
                tip: module491.rubys_main_goto_click_text,
              });
          }, 5e3);
        },
      },
      {
        key: 'resetIsGoingTimer',
        value: function () {
          if (this.isGoingTimer) {
            clearTimeout(this.isGoingTimer);
            this.isGoingTimer = null;
            this.startIsGoingTimer();
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          return React.default.createElement(
            module12.View,
            {
              style: [
                A.containter,
                {
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            React.default.createElement(module1233.MapView, {
              style: {
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
              },
              parent: this,
              popBoxType: 'none',
              ref: function (n) {
                return (t.mapView = n);
              },
              top: 40,
              bottom: module1344.MapEditCommonStyles.mapBottom,
              left: 10,
              right: 10,
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  A.floatWrapView,
                  {
                    marginBottom: 0,
                  },
                ],
              },
              React.default.createElement(module1371, {
                ref: function (n) {
                  return (t.eventToast = n);
                },
              })
            ),
            React.default.createElement(module1921.default, {
              menu: this.state.menu,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressCancelGotoButton: this._onPressCancelGotoButton.bind(this),
              onPressSpotCleanButton: this._onPressSpotCleanButton.bind(this),
              onPressGotoButton: this._onPressGotoButton.bind(this),
              onPressPauseGotoButton: this._onPressPauseGotoButton.bind(this),
            }),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            })
          );
        },
      },
      {
        key: '_onPressCancelGotoButton',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (this.editMenu.state.isGoing) {
                      o.next = 4;
                      break;
                    }

                    if (this.mapView) this.mapView.removeTarget();
                    this.props.navigation.pop();
                    return o.abrupt('return');

                  case 4:
                    if (module377.RobotStatusManager.sharedManager().state != module377.RobotState.GOTO_TARGET) {
                      o.next = 9;
                      break;
                    }

                    this.alert.alert('', module491.rubys_main_goto_cancel_alet, [
                      {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {},
                      },
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (o) {
                              for (;;)
                                switch ((o.prev = o.next)) {
                                  case 0:
                                    o.prev = 0;
                                    o.next = 3;
                                    return regeneratorRuntime.default.awrap(module407.default.gotoTargetStop());

                                  case 3:
                                    if (t.editMenu)
                                      t.editMenu.setState({
                                        isGoing: false,
                                      });
                                    t.lastInGotoStatus = false;
                                    o.next = 11;
                                    break;

                                  case 8:
                                    o.prev = 8;
                                    o.t0 = o.catch(0);
                                    globals.showToast(module491.robot_communication_exception);

                                  case 11:
                                  case 'end':
                                    return o.stop();
                                }
                            },
                            null,
                            null,
                            [[0, 8]],
                            Promise
                          );
                        },
                      },
                    ]);
                    o.next = 19;
                    break;

                  case 9:
                    o.prev = 9;
                    o.next = 12;
                    return regeneratorRuntime.default.awrap(module407.default.gotoTargetStop());

                  case 12:
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: false,
                      });
                    o.next = 19;
                    break;

                  case 16:
                    o.prev = 16;
                    o.t0 = o.catch(9);
                    globals.showToast(module491.robot_communication_exception);

                  case 19:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            [[9, 16]],
            Promise
          );
        },
      },
      {
        key: '_onPressSpotCleanButton',
        value: function () {
          var t,
            o,
            s,
            u = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      ((t = module377.RobotStatusManager.sharedManager().state),
                      (o = module377.RobotStatusManager.sharedManager().robotFeatures.findIndex(function (t) {
                        return 115 == t;
                      })),
                      t != module377.RobotState.UPDATING)
                    ) {
                      c.next = 6;
                      break;
                    }

                    globals.showToast(module491.localization_strings_Setting_RemoteControlPage_13);
                    c.next = 43;
                    break;

                  case 6:
                    if (t != module377.RobotState.SPOT_CLEAN) {
                      c.next = 10;
                      break;
                    }

                    globals.showToast(module491.localization_strings_Setting_RemoteControlPage_19);
                    c.next = 43;
                    break;

                  case 10:
                    if (t != module377.RobotState.CHARGING) {
                      c.next = 14;
                      break;
                    }

                    globals.showToast(module491.localization_strings_Setting_RemoteControlPage_20);
                    c.next = 43;
                    break;

                  case 14:
                    if (t != module377.RobotState.GOTO_TARGET || 1 != o) {
                      c.next = 26;
                      break;
                    }

                    c.prev = 15;
                    c.next = 18;
                    return regeneratorRuntime.default.awrap(module407.default.spot());

                  case 18:
                    this.props.navigation.popToTop();
                    c.next = 24;
                    break;

                  case 21:
                    c.prev = 21;
                    c.t0 = c.catch(15);
                    globals.showToast(module491.robot_communication_exception);

                  case 24:
                    c.next = 43;
                    break;

                  case 26:
                    if (
                      t != module377.RobotState.CLEAN &&
                      t != module377.RobotState.BACK_TO_DOCK &&
                      t != module377.RobotState.GOTO_TARGET &&
                      t != module377.RobotState.ZONED_CLEAN
                    ) {
                      c.next = 34;
                      break;
                    }

                    s = module491.home_dialog_begin_new_clean;
                    if (t == module377.RobotState.BACK_TO_DOCK) s = module491.home_dialog_begin_new_clean;
                    if (t == module377.RobotState.GOTO_TARGET) s = module491.home_dialog_begin_new_clean;
                    if (t == module377.RobotState.ZONED_CLEAN) s = module491.home_dialog_begin_new_clean;
                    this.alert.alert('', s, [
                      {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {},
                      },
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    t.prev = 0;
                                    t.next = 3;
                                    return regeneratorRuntime.default.awrap(module407.default.pause());

                                  case 3:
                                    module1249.setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (t) {
                                          for (;;)
                                            switch ((t.prev = t.next)) {
                                              case 0:
                                                t.prev = 0;
                                                t.next = 3;
                                                return regeneratorRuntime.default.awrap(module407.default.spot());

                                              case 3:
                                                u.props.navigation.popToTop();
                                                t.next = 9;
                                                break;

                                              case 6:
                                                t.prev = 6;
                                                t.t0 = t.catch(0);
                                                globals.showToast(module491.robot_communication_exception);

                                              case 9:
                                              case 'end':
                                                return t.stop();
                                            }
                                        },
                                        null,
                                        null,
                                        [[0, 6]],
                                        Promise
                                      );
                                    }, 3e3);
                                    t.next = 9;
                                    break;

                                  case 6:
                                    t.prev = 6;
                                    t.t0 = t.catch(0);
                                    globals.showToast(module491.robot_communication_exception);

                                  case 9:
                                  case 'end':
                                    return t.stop();
                                }
                            },
                            null,
                            null,
                            [[0, 6]],
                            Promise
                          );
                        },
                      },
                    ]);
                    c.next = 43;
                    break;

                  case 34:
                    c.prev = 34;
                    c.next = 37;
                    return regeneratorRuntime.default.awrap(module407.default.spot());

                  case 37:
                    this.props.navigation.popToTop();
                    c.next = 43;
                    break;

                  case 40:
                    c.prev = 40;
                    c.t1 = c.catch(34);
                    globals.showToast(module491.robot_communication_exception);

                  case 43:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [
              [15, 21],
              [34, 40],
            ],
            Promise
          );
        },
      },
      {
        key: '_onPressGotoButton',
        value: function () {
          var t,
            o,
            s,
            u = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (((t = null), this.mapView && (t = this.mapView.getGotoTarget()), null != t)) {
                      c.next = 5;
                      break;
                    }

                    globals.showToast(module491.rubys_main_goto_click_text);
                    return c.abrupt('return');

                  case 5:
                    if ((o = module377.RobotStatusManager.sharedManager().state) != module377.RobotState.UPDATING) {
                      c.next = 10;
                      break;
                    }

                    globals.showToast(module491.localization_strings_Setting_RemoteControlPage_13);
                    c.next = 29;
                    break;

                  case 10:
                    if (
                      o != module377.RobotState.CLEAN &&
                      o != module377.RobotState.BACK_TO_DOCK &&
                      o != module377.RobotState.ZONED_CLEAN &&
                      o != module377.RobotState.SPOT_CLEAN &&
                      o != module377.RobotState.REMOTE &&
                      o != module377.RobotState.SEGMENT_CLEAN
                    ) {
                      c.next = 19;
                      break;
                    }

                    s = module491.localization_strings_abort_current_task_and_start_goto;
                    if (o == module377.RobotState.BACK_TO_DOCK) s = module491.localization_strings_abort_current_task_and_start_goto;
                    if (o == module377.RobotState.ZONED_CLEAN) s = module491.localization_strings_abort_current_task_and_start_goto;
                    if (o == module377.RobotState.SPOT_CLEAN) s = module491.localization_strings_abort_current_task_and_start_goto;
                    if (o == module377.RobotState.REMOTE) s = module491.localization_strings_abort_current_task_and_start_goto;
                    this.alert.alert('', s, [
                      {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {},
                      },
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (s) {
                              for (;;)
                                switch ((s.prev = s.next)) {
                                  case 0:
                                    if (((s.prev = 0), o != module377.RobotState.REMOTE)) {
                                      s.next = 6;
                                      break;
                                    }

                                    s.next = 4;
                                    return regeneratorRuntime.default.awrap(module407.default.remoteEnd());

                                  case 4:
                                    s.next = 8;
                                    break;

                                  case 6:
                                    s.next = 8;
                                    return regeneratorRuntime.default.awrap(module407.default.pause());

                                  case 8:
                                    module1249.setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (o) {
                                          for (;;)
                                            switch ((o.prev = o.next)) {
                                              case 0:
                                                o.prev = 0;
                                                o.next = 3;
                                                return regeneratorRuntime.default.awrap(module377.RSM.waitUntilStateIsNotLocked());

                                              case 3:
                                                o.next = 5;
                                                return regeneratorRuntime.default.awrap(module407.default.gotoTarget(t));

                                              case 5:
                                                if (u.editMenu)
                                                  u.editMenu.setState({
                                                    isGoing: true,
                                                    tip: module491.rubys_main_subtitle_goto_target,
                                                  });
                                                u.startIsGoingTimer();
                                                o.next = 12;
                                                break;

                                              case 9:
                                                o.prev = 9;
                                                o.t0 = o.catch(0);
                                                globals.showToast(module491.robot_communication_exception);

                                              case 12:
                                              case 'end':
                                                return o.stop();
                                            }
                                        },
                                        null,
                                        null,
                                        [[0, 9]],
                                        Promise
                                      );
                                    }, 2e3);
                                    s.next = 14;
                                    break;

                                  case 11:
                                    s.prev = 11;
                                    s.t0 = s.catch(0);
                                    globals.showToast(module491.robot_communication_exception);

                                  case 14:
                                  case 'end':
                                    return s.stop();
                                }
                            },
                            null,
                            null,
                            [[0, 11]],
                            Promise
                          );
                        },
                      },
                    ]);
                    c.next = 29;
                    break;

                  case 19:
                    c.prev = 19;
                    c.next = 22;
                    return regeneratorRuntime.default.awrap(module407.default.gotoTarget(t));

                  case 22:
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: true,
                        tip: module491.rubys_main_subtitle_goto_target,
                      });
                    this.startIsGoingTimer();
                    c.next = 29;
                    break;

                  case 26:
                    c.prev = 26;
                    c.t0 = c.catch(19);
                    globals.showToast(module491.robot_communication_exception);

                  case 29:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[19, 26]],
            Promise
          );
        },
      },
      {
        key: '_onPressPauseGotoButton',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.pause());

                  case 3:
                    if (this.mapView) this.mapView.targetDroped = true;
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: false,
                      });
                    t.next = 10;
                    break;

                  case 7:
                    t.prev = 7;
                    t.t0 = t.catch(0);
                    console.log('Failed to send ' + module385.Methods.AppPause);

                  case 10:
                  case 'end':
                    return t.stop();
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
        key: '_wakeupRobot',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.appWakeupRobot());

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
      },
      {
        key: 'checkButtonStatus',
        value: function () {
          if (module377.RobotStatusManager.sharedManager().state == module377.RobotState.GOTO_TARGET) {
            if (this.editMenu)
              this.editMenu.setState({
                isGoing: true,
                tip: module491.rubys_main_subtitle_goto_target,
              });

            if (!this.hasOperated) {
              if (this.editMenu) this.editMenu.setCleanButonEnabled(true);
              this.hasOperated = true;
            }
          } else if (this.editMenu)
            this.editMenu.setState({
              isGoing: false,
            });
        },
      },
      {
        key: 'registerToastListener',
        value: function () {
          var t = this;
          this.specialToastListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            var o = n.data;
            if ('goto_target_succ' != o) {
              if (!('target_not_reachable' != o))
                t.editMenu &&
                  t.editMenu.setState({
                    tip: module491.rubys_main_toast_goto_not_finish,
                  });
            } else if (t.editMenu)
              t.editMenu.setState({
                tip: module491.rubys_main_toast_goto_finish,
              });
          });
        },
      },
      {
        key: 'renderToastView',
        value: function () {
          if (this.state.shouldShowToast) {
            var t = module377.RobotStatusManager.sharedManager().currentToast || '';
            return (
              (module1362()[t] || false) &&
              React.default.createElement(module1371, {
                event: t,
              })
            );
          }
        },
      },
      {
        key: 'registerEventToastListener',
        value: function () {
          var t = this;
          this.robotEventListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.EventToastChange, function (n) {
            t.showEventToast(n);
          });
        },
      },
      {
        key: 'showEventToast',
        value: function (t) {
          var n = t.data;
          if ((Toast[n] || false) && this.eventToast) this.eventToast.show(n);
        },
      },
      {
        key: 'showToast',
        value: function () {
          if (!this.state.shouldShowToast)
            this.setState({
              shouldShowToast: true,
            });
        },
      },
      {
        key: 'dismissToast',
        value: function () {
          if (this.state.shouldShowToast)
            this.setState({
              shouldShowToast: false,
            });
        },
      },
      {
        key: 'onLeftButtonPress',
        value: function () {
          var t = this,
            o = module377.RobotStatusManager.sharedManager().state;
          if (o == module377.RobotState.GOTO_TARGET) {
            if (o == module377.RobotState.GOTO_TARGET)
              this.alert.alert('', module491.rubys_main_goto_cancel_alet, [
                {
                  text: module491.localization_strings_Main_MainPage_11,
                  onPress: function () {},
                },
                {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    return regeneratorRuntime.default.async(
                      function (o) {
                        for (;;)
                          switch ((o.prev = o.next)) {
                            case 0:
                              o.prev = 0;
                              o.next = 3;
                              return regeneratorRuntime.default.awrap(module407.default.gotoTargetStop());

                            case 3:
                              t.props.navigation.pop();
                              o.next = 10;
                              break;

                            case 7:
                              o.prev = 7;
                              o.t0 = o.catch(0);
                              globals.showToast(module491.robot_communication_exception);

                            case 10:
                            case 'end':
                              return o.stop();
                          }
                      },
                      null,
                      null,
                      [[0, 7]],
                      Promise
                    );
                  },
                },
              ]);
          } else this.props.navigation.pop();
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = D;
D.contextType = module506.AppConfigContext;
var A = module12.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white',
  },
  floatWrapView: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    height: 0,
    marginBottom: 0,
  },
});
