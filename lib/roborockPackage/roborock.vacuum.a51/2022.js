var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2023 = require('./2023'),
  module385 = require('./385'),
  module1118 = require('./1118'),
  module416 = require('./416'),
  module415 = require('./415'),
  module420 = require('./420'),
  module381 = require('./381'),
  module1193 = require('./1193'),
  module1343 = require('./1343'),
  module390 = require('./390');

function R(t, n) {
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
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      R(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function G() {
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

var module389 = require('./389'),
  module510 = require('./510').strings,
  module1641 = require('./1641'),
  module1632 = require('./1632').getToast,
  module1414 = require('./1414'),
  A = (function (t) {
    module9.default(R, t);

    var n = R,
      module50 = G(),
      E = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      var n;
      module6.default(this, R);
      (n = E.call(this, t)).state = {
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

    module7.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          module415.MM.shouldForceStart = true;
          module415.MM.start();
          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onLeftButtonPress();
            return true;
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n,
            o = this;
          if (!(null == (t = this.mapView))) t.enterGotoEditMode();
          if (!(null == (n = this.mapView))) n.setState(P({}, module415.MM.mapData));

          this._wakeupRobot();

          this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (t) {
            var n;
            if (!(null == (n = o.mapView)))
              n.setState(
                P(
                  P({}, module415.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
          });
          this.statusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (t) {
            o.checkButtonStatus();
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
          if (module390.default.isEggModeSupported()) this.renderNavRightButton();
        },
      },
      {
        key: 'renderNavRightButton',
        value: function () {
          var t = this,
            module2024 = React.default.createElement(module385.PureImageButton, {
              funcId: 'egg_entrance',
              style: {
                marginRight: 10,
              },
              image: require('./2024'),
              onPress: function () {
                t.isInEggMode = true;
                t.props.navigation.navigate('EggPage', {
                  startGetMap: false,
                });
              },
              imageWidth: 40,
              imageHeight: 40,
              enabled: true,
              imageStyle: {
                resizeMode: 'contain',
                width: 24,
                height: 24,
              },
            });
          this.props.navigation.setParams({
            rightItems: [module2024],
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mapListener.remove();
          this.statusListener.remove();
          this.specialToastListener.remove();
          this.robotEventListener.remove();
          module415.MM.shouldForceStart = false;
          module415.MM.stop();
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
            if (module381.RSM.isRunning) t.resetIsGoingTimer();
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
                tip: module510.rubys_main_goto_click_text,
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
            module13.View,
            {
              style: [
                N.containter,
                {
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            React.default.createElement(module1118.MapView, {
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
              bottom: module1343.MapEditCommonStyles.mapBottom,
              left: 10,
              right: 10,
            }),
            React.default.createElement(
              module13.View,
              {
                style: [
                  N.floatWrapView,
                  {
                    marginBottom: 0,
                  },
                ],
              },
              React.default.createElement(module1641, {
                ref: function (n) {
                  return (t.eventToast = n);
                },
              })
            ),
            React.default.createElement(module2023.default, {
              menu: this.state.menu,
              ref: function (n) {
                return (t.editMenu = n);
              },
              onPressCancelGotoButton: this._onPressCancelGotoButton.bind(this),
              onPressSpotCleanButton: this._onPressSpotCleanButton.bind(this),
              onPressGotoButton: this._onPressGotoButton.bind(this),
              onPressPauseGotoButton: this._onPressPauseGotoButton.bind(this),
            }),
            React.default.createElement(module385.AlertView, {
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (this.editMenu.state.isGoing) {
                      n.next = 4;
                      break;
                    }

                    if (this.mapView) this.mapView.removeTarget();
                    this.props.navigation.pop();
                    return n.abrupt('return');

                  case 4:
                    if (module381.RSM.state != module381.RobotState.GOTO_TARGET) {
                      n.next = 9;
                      break;
                    }

                    this.alert.alert('', module510.rubys_main_goto_cancel_alet, [
                      {
                        text: module510.localization_strings_Main_MainPage_11,
                        onPress: function () {},
                      },
                      {
                        text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (n) {
                              for (;;)
                                switch ((n.prev = n.next)) {
                                  case 0:
                                    n.prev = 0;
                                    if (t.editMenu)
                                      t.editMenu.setState({
                                        isGoing: false,
                                      });
                                    n.next = 4;
                                    return regeneratorRuntime.default.awrap(module416.default.gotoTargetStop());

                                  case 4:
                                    t.lastInGotoStatus = false;
                                    n.next = 12;
                                    break;

                                  case 8:
                                    n.prev = 8;
                                    n.t0 = n.catch(0);
                                    globals.showToast(module510.robot_communication_exception);
                                    if (t.editMenu)
                                      t.editMenu.setState({
                                        isGoing: true,
                                      });

                                  case 12:
                                  case 'end':
                                    return n.stop();
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
                    n.next = 19;
                    break;

                  case 9:
                    n.prev = 9;
                    n.next = 12;
                    return regeneratorRuntime.default.awrap(module416.default.gotoTargetStop());

                  case 12:
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: false,
                      });
                    n.next = 19;
                    break;

                  case 16:
                    n.prev = 16;
                    n.t0 = n.catch(9);
                    globals.showToast(module510.robot_communication_exception);

                  case 19:
                  case 'end':
                    return n.stop();
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
            n,
            s,
            u = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      ((t = module381.RSM.state),
                      (n = module381.RSM.robotFeatures.findIndex(function (t) {
                        return 115 == t;
                      })),
                      t != module381.RobotState.UPDATING)
                    ) {
                      c.next = 6;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_13);
                    c.next = 43;
                    break;

                  case 6:
                    if (t != module381.RobotState.SPOT_CLEAN) {
                      c.next = 10;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_19);
                    c.next = 43;
                    break;

                  case 10:
                    if (t != module381.RobotState.CHARGING) {
                      c.next = 14;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_20);
                    c.next = 43;
                    break;

                  case 14:
                    if (t != module381.RobotState.GOTO_TARGET || 1 != n) {
                      c.next = 26;
                      break;
                    }

                    c.prev = 15;
                    c.next = 18;
                    return regeneratorRuntime.default.awrap(module416.default.spot());

                  case 18:
                    this.props.navigation.popToTop();
                    c.next = 24;
                    break;

                  case 21:
                    c.prev = 21;
                    c.t0 = c.catch(15);
                    globals.showToast(module510.robot_communication_exception);

                  case 24:
                    c.next = 43;
                    break;

                  case 26:
                    if (
                      t != module381.RobotState.CLEAN &&
                      t != module381.RobotState.BACK_TO_DOCK &&
                      t != module381.RobotState.GOTO_TARGET &&
                      t != module381.RobotState.ZONED_CLEAN &&
                      t != module381.RobotState.QUICK_BUILDING_MAP
                    ) {
                      c.next = 34;
                      break;
                    }

                    s = module510.home_dialog_begin_new_clean;
                    if (t == module381.RobotState.BACK_TO_DOCK) s = module510.home_dialog_begin_new_clean;
                    if (t == module381.RobotState.GOTO_TARGET) s = module510.home_dialog_begin_new_clean;
                    if (t == module381.RobotState.ZONED_CLEAN) s = module510.home_dialog_begin_new_clean;
                    this.alert.alert('', s, [
                      {
                        text: module510.localization_strings_Main_MainPage_11,
                        onPress: function () {},
                      },
                      {
                        text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    t.prev = 0;
                                    t.next = 3;
                                    return regeneratorRuntime.default.awrap(module416.default.pause());

                                  case 3:
                                    module1414.setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (t) {
                                          for (;;)
                                            switch ((t.prev = t.next)) {
                                              case 0:
                                                t.prev = 0;
                                                t.next = 3;
                                                return regeneratorRuntime.default.awrap(module416.default.spot());

                                              case 3:
                                                u.props.navigation.popToTop();
                                                t.next = 9;
                                                break;

                                              case 6:
                                                t.prev = 6;
                                                t.t0 = t.catch(0);
                                                globals.showToast(module510.robot_communication_exception);

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
                                    globals.showToast(module510.robot_communication_exception);

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
                    return regeneratorRuntime.default.awrap(module416.default.spot());

                  case 37:
                    this.props.navigation.popToTop();
                    c.next = 43;
                    break;

                  case 40:
                    c.prev = 40;
                    c.t1 = c.catch(34);
                    globals.showToast(module510.robot_communication_exception);

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
            n,
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

                    globals.showToast(module510.rubys_main_goto_click_text);
                    return c.abrupt('return');

                  case 5:
                    if ((n = module381.RSM.state) != module381.RobotState.UPDATING) {
                      c.next = 10;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_13);
                    c.next = 29;
                    break;

                  case 10:
                    if (
                      n != module381.RobotState.CLEAN &&
                      n != module381.RobotState.BACK_TO_DOCK &&
                      n != module381.RobotState.ZONED_CLEAN &&
                      n != module381.RobotState.SPOT_CLEAN &&
                      n != module381.RobotState.REMOTE &&
                      n != module381.RobotState.SEGMENT_CLEAN &&
                      n != module381.RobotState.QUICK_BUILDING_MAP
                    ) {
                      c.next = 19;
                      break;
                    }

                    s = module510.localization_strings_abort_current_task_and_start_goto;
                    if (n == module381.RobotState.BACK_TO_DOCK) s = module510.localization_strings_abort_current_task_and_start_goto;
                    if (n == module381.RobotState.ZONED_CLEAN) s = module510.localization_strings_abort_current_task_and_start_goto;
                    if (n == module381.RobotState.SPOT_CLEAN) s = module510.localization_strings_abort_current_task_and_start_goto;
                    if (n == module381.RobotState.REMOTE) s = module510.localization_strings_abort_current_task_and_start_goto;
                    this.alert.alert('', s, [
                      {
                        text: module510.localization_strings_Main_MainPage_11,
                        onPress: function () {},
                      },
                      {
                        text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (s) {
                              for (;;)
                                switch ((s.prev = s.next)) {
                                  case 0:
                                    if (((s.prev = 0), n != module381.RobotState.REMOTE)) {
                                      s.next = 6;
                                      break;
                                    }

                                    s.next = 4;
                                    return regeneratorRuntime.default.awrap(module416.default.remoteEnd());

                                  case 4:
                                    s.next = 8;
                                    break;

                                  case 6:
                                    s.next = 8;
                                    return regeneratorRuntime.default.awrap(module416.default.pause());

                                  case 8:
                                    module1414.setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (n) {
                                          for (;;)
                                            switch ((n.prev = n.next)) {
                                              case 0:
                                                n.prev = 0;
                                                if (u.editMenu)
                                                  u.editMenu.setState({
                                                    isGoing: true,
                                                    tip: module510.rubys_main_subtitle_goto_target,
                                                  });
                                                n.next = 4;
                                                return regeneratorRuntime.default.awrap(module381.RSM.waitUntilStateIsNotLocked());

                                              case 4:
                                                n.next = 6;
                                                return regeneratorRuntime.default.awrap(module416.default.gotoTarget(t));

                                              case 6:
                                                n.next = 12;
                                                break;

                                              case 8:
                                                n.prev = 8;
                                                n.t0 = n.catch(0);
                                                globals.showToast(module510.robot_communication_exception);
                                                if (u.editMenu)
                                                  u.editMenu.setState({
                                                    isGoing: false,
                                                    tip: module510.rubys_main_subtitle_goto_target,
                                                  });

                                              case 12:
                                              case 'end':
                                                return n.stop();
                                            }
                                        },
                                        null,
                                        null,
                                        [[0, 8]],
                                        Promise
                                      );
                                    }, 2e3);
                                    s.next = 15;
                                    break;

                                  case 11:
                                    s.prev = 11;
                                    s.t0 = s.catch(0);
                                    if (u.editMenu)
                                      u.editMenu.setState({
                                        isGoing: false,
                                        tip: module510.rubys_main_subtitle_goto_target,
                                      });
                                    globals.showToast(module510.robot_communication_exception);

                                  case 15:
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
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: true,
                        tip: module510.rubys_main_subtitle_goto_target,
                      });
                    c.next = 23;
                    return regeneratorRuntime.default.awrap(module416.default.gotoTarget(t));

                  case 23:
                    c.next = 29;
                    break;

                  case 25:
                    c.prev = 25;
                    c.t0 = c.catch(19);
                    globals.showToast(module510.robot_communication_exception);
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: false,
                        tip: module510.rubys_main_subtitle_goto_target,
                      });

                  case 29:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[19, 25]],
            Promise
          );
        },
      },
      {
        key: '_onPressPauseGotoButton',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (this.editMenu) this.editMenu.setGoToButonEnabled(false);
                    setTimeout(function () {
                      if (t.editMenu) t.editMenu.setGoToButonEnabled(true);
                    }, 2e3);
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: false,
                        tip: module510.rubys_main_goto_click_text,
                      });
                    n.prev = 3;
                    n.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.pause());

                  case 6:
                    if (this.mapView) this.mapView.targetDroped = true;
                    n.next = 13;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(3);
                    console.log('Failed to send ' + module389.Methods.AppPause);
                    if (this.editMenu)
                      this.editMenu.setState({
                        isGoing: true,
                        tip: module510.rubys_main_subtitle_goto_target,
                      });

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[3, 9]],
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
                    return regeneratorRuntime.default.awrap(module416.default.appWakeupRobot());

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
          if (module381.RSM.state == module381.RobotState.WAITING && this.isInEggMode) {
            if (this.editMenu)
              this.editMenu.setState({
                isGoing: false,
                tip: module510.rubys_main_goto_click_text,
              });
            if (this.editMenu) this.editMenu.setCleanButonEnabled(false);
            this.isInEggMode = false;
          }

          if (module381.RSM.state == module381.RobotState.GOTO_TARGET && this.editMenu) this.editMenu.setCleanButonEnabled(true);
        },
      },
      {
        key: 'registerToastListener',
        value: function () {
          var t = this;
          this.specialToastListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.DidReceiveSpecialEvent, function (n) {
            var o = n.data;
            t.toastInfo = o;
            if ('goto_target_succ' != o) {
              if (!('target_not_reachable' != o && 'relocate_fail' != o))
                t.editMenu &&
                  t.editMenu.setState({
                    isGoing: false,
                    tip: module510.rubys_main_toast_goto_not_finish,
                  });
            } else if (t.editMenu)
              t.editMenu.setState({
                isGoing: false,
                tip: module510.rubys_main_toast_goto_finish,
              });
          });
        },
      },
      {
        key: 'renderToastView',
        value: function () {
          if (this.state.shouldShowToast) {
            var t = module381.RSM.currentToast || '';
            return (
              (module1632()[t] || false) &&
              React.default.createElement(module1641, {
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
          this.robotEventListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.EventToastChange, function (n) {
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
            n = module381.RSM.state;
          if (n == module381.RobotState.GOTO_TARGET) {
            if (n == module381.RobotState.GOTO_TARGET)
              this.alert.alert('', module510.rubys_main_goto_cancel_alet, [
                {
                  text: module510.localization_strings_Main_MainPage_11,
                  onPress: function () {},
                },
                {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    return regeneratorRuntime.default.async(
                      function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              n.prev = 0;
                              t.props.navigation.pop();
                              n.next = 4;
                              return regeneratorRuntime.default.awrap(module416.default.gotoTargetStop());

                            case 4:
                              n.next = 10;
                              break;

                            case 7:
                              n.prev = 7;
                              n.t0 = n.catch(0);
                              globals.showToast(module510.robot_communication_exception);

                            case 10:
                            case 'end':
                              return n.stop();
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
      {
        key: 'isGoing',
        get: function () {
          return this.editMenu && this.editMenu.state.isGoing;
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = A;
A.contextType = module1193.AppConfigContext;
var N = module13.StyleSheet.create({
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
