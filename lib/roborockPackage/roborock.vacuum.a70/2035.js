var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1211 = require('./1211'),
  module381 = require('./381'),
  module416 = require('./416'),
  module2036 = require('./2036'),
  module2038 = require('./2038'),
  module2040 = require('./2040'),
  module2041 = require('./2041'),
  module2042 = require('./2042'),
  module385 = require('./385'),
  module1193 = require('./1193'),
  module2043 = require('./2043'),
  module2044 = require('./2044'),
  module387 = require('./387'),
  module390 = require('./390');

function T(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function E(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      T(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      T(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function D() {
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

var module510 = require('./510').strings,
  module393 = require('./393'),
  module1414 = require('./1414'),
  module389 = require('./389'),
  module1485 = require('./1485'),
  j = 0,
  F = 0,
  J = module390.default.isNewRemoteViewSupported(),
  B = module1211.createSwitchNavigator(
    {
      KeyView: J ? module2043.default : module2041.default,
      JoyStickView: J ? module2044.default : module2042.default,
    },
    {
      initialRouteName: 'KeyView',
    }
  ),
  K = (function (t) {
    module9.default(x, t);

    var module50 = x,
      module2041 = D(),
      M = function () {
        var t,
          n = module12.default(module50);

        if (module2041) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      var o;
      module6.default(this, x);

      (o = M.call(this, t))._backAction = function () {
        o.props.navigation.pop();
      };

      o._handleAppStateChange = function (t) {
        if ('inactive' === t || 'background' === t) o._stopMoveTimer(0);
        else if ('active' === t) o.checkLocal();
      };

      o.state = {
        activeControlViewIndex: F,
        loadingVisible: false,
        noteVisible: false,
        isLocal: true,
      };
      console.log('Remote control page constructor---\x3e');
      o.controlViewStack = null;
      o.ignoreAsyncCallback = false;
      o.startTimerID = 0;
      o.noteTimerID = 0;
      o._isRemoteStarted = false;
      o._isActive = false;
      o._isCheckingRemoteCondition = false;
      o.motionParam = {
        omega: 0,
        velocity: 0,
        seqnum: 0,
        duration: o.state.activeControlViewIndex == F ? 1e3 : 1500,
      };
      return o;
    }

    module7.default(x, [
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme;
          console.log('Remote control page  render ----\x3e ');
          var n = React.default.createElement(
            module13.View,
            {
              style: {
                flex: 1,
                backgroundColor: o.settingBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module385.Spinner, null)
          );
          return this.state.loading
            ? n
            : React.default.createElement(
                module13.View,
                {
                  style: [
                    G.container,
                    {
                      backgroundColor: o.remoteControl.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(module2038.default, {
                  activeControlViewIndex: this.state.activeControlViewIndex,
                  onActiveControlViewChange: function (o) {
                    return t._onActiveControlViewChange(o);
                  },
                }),
                React.default.createElement(
                  module13.View,
                  {
                    style: G.controlView,
                  },
                  React.default.createElement(module2040.default, {
                    visible: this.state.noteVisible,
                  }),
                  React.default.createElement(B, {
                    screenProps: {
                      updateMotionParam: this._updateMotionParam.bind(this),
                      startMotion: this._startMotion.bind(this),
                      stopMotion: this._stopMotion.bind(this),
                      startSendMove: this._startSendMove.bind(this),
                      stopSendMove: this._stopSendMove.bind(this),
                    },
                    ref: function (o) {
                      return (t.controlViewStack = o);
                    },
                  })
                ),
                React.default.createElement(module2036.default, {
                  ref: function (o) {
                    return (t.bottomView = o);
                  },
                  parent: this,
                })
              );
        },
      },
      {
        key: '_startSendMove',
        value: function () {
          this._isActive = true;
        },
      },
      {
        key: '_stopSendMove',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this._isActive = false;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.remoteStop());

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
        key: 'componentDidMount',
        value: function () {
          var t = this;
          console.log('Remote control page componentDidMount---\x3e');
          this._isMounted = true;

          this._checkAppVersion();

          module1485.readRemoteControlModeFlag(function (o) {
            if (o) {
              var n = parseInt(o);
              if (n === F || 1 === n) t._onActiveControlViewChange(n);
              else t._onActiveControlViewChange(F);
            }
          });
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.remoteControl.backgroundColor,
            title: module510.localization_strings_Setting_index_23,
            hiddenBottomLine: true,
          });

          this._pauseRobot();

          module13.AppState.addEventListener('change', this._handleAppStateChange);
        },
      },
      {
        key: '_pauseRobot',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.pause());

                  case 3:
                    t.next = 8;
                    break;

                  case 5:
                    t.prev = 5;
                    t.t0 = t.catch(0);
                    console.log('pause  error: ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0));

                  case 8:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            [[0, 5]],
            Promise
          );
        },
      },
      {
        key: '_checkFirmwareVersionFromCacheFirstly',
        value: function () {
          this._checkLocalPing();
        },
      },
      {
        key: '_checkLocalPing',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.setState({
                      loadingVisible: module393.isMiApp,
                    });
                    console.log('\u5f00\u59cb\u68c0\u67e5 _checkLocalPing');
                    module393.localPingWithCallback(function (o) {
                      console.log('\u68c0\u67e5 localPing \u7ed3\u679c\u8fd4\u56de');

                      if (t._isMounted) {
                        t.setState(
                          {
                            loadingVisible: false,
                            isLocal: o,
                          },
                          function () {
                            if (!o) t.showNotLocalMsg();
                          }
                        );
                        t.ignoreAsyncCallback;
                      } else console.log('\u68c0\u67e5 localPing \u7ed3\u679c\u8fd4\u56de --\u5c1d\u8bd5\u4fee\u6539 state \u5728\u6ca1\u6709\u88c5\u8f7d\u7ec4\u4ef6\u4e0a \u76f4\u63a5return');
                    });

                  case 3:
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
        key: 'showNotLocalMsg',
        value: function () {
          globals.Alert.alert(
            module510.remote_control_prompt,
            '',
            [
              {
                text: module510.localization_strings_Setting_RemoteControlPage_51,
                onPress: function () {},
              },
            ],
            {
              cancelable: false,
            }
          );
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          console.log('Remote control page componentWillUnmount---\x3e');
          this._isMounted = false;

          this._stopMotion(0, true);

          module1485.saveRemoteControlModeFlag(this.state.activeControlViewIndex);
          module13.AppState.removeEventListener('change', this._handleAppStateChange);
          this.props.navigation.pop('RemoteControlPageNew');
        },
      },
      {
        key: '_onActiveControlViewChange',
        value: function (t) {
          var o, s;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (this.state.activeControlViewIndex !== t) {
                      n.next = 2;
                      break;
                    }

                    return n.abrupt('return');

                  case 2:
                    this._isActive = false;
                    this.setState({
                      activeControlViewIndex: t,
                    });
                    o = t == F ? 1e3 : 1500;
                    this.motionParam = E(
                      E({}, this.motionParam),
                      {},
                      {
                        duration: o,
                      }
                    );
                    s = module1211.NavigationActions.navigate({
                      routeName: t === F ? 'KeyView' : 'JoyStickView',
                    });
                    console.log('Remote control page _onActiveControlViewChange');
                    module387.LogEventStatus('remote_control_method', {
                      methodIndex: t,
                    });
                    this.controlViewStack.dispatch(s);

                  case 10:
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
        key: '_onModalCancel',
        value: function () {
          this.setState({
            loadingVisible: false,
          });
          this.ignoreAsyncCallback = true;
          this.props.navigation.pop();
        },
      },
      {
        key: '_checkAppVersion',
        value: function () {
          var t = this;

          if (module393.apiLevel < 110) {
            this._setloadingVisible(false);

            globals.Alert.alert(module510.localization_strings_Setting_RemoteControlPage_49, module510.localization_strings_Setting_RemoteControlPage_50, [
              {
                text: module510.localization_strings_Setting_RemoteControlPage_51,
                onPress: function () {
                  return t.props.navigation.pop();
                },
              },
            ]);
          } else this._checkFirmwareVersionFromCacheFirstly();
        },
      },
      {
        key: 'showAlertMsg',
        value: function (t, o) {
          globals.Alert.alert(t, '', [
            {
              text: o,
              onPress: function () {},
            },
          ]);
        },
      },
      {
        key: '_setloadingVisible',
        value: function (t) {
          this.setState({
            loadingVisible: t,
          });
        },
      },
      {
        key: '_setNoteVisible',
        value: function (t) {
          this.setState({
            noteVisible: t,
          });
        },
      },
      {
        key: '_ShowNoteForMoment',
        value: function (t) {
          var o = this;

          if (this.noteTimerID > 0) {
            module1414.clearTimeout(this.noteTimerID);
            this.noteTimerID = 0;
          }

          this._setNoteVisible(true);

          this.noteTimerID = module1414.setTimeout(function () {
            o._setNoteVisible(false);

            o.noteTimerID = 0;
          }, t);
        },
      },
      {
        key: '_sendCommandMove',
        value: function () {
          var t, o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (this._isActive) {
                      s.next = 2;
                      break;
                    }

                    return s.abrupt('return');

                  case 2:
                    (t = JSON.parse(JSON.stringify(this.motionParam))).seqnum += 1;
                    this.motionParam = t;
                    s.prev = 5;
                    s.next = 8;
                    return regeneratorRuntime.default.awrap(module416.default.remoteMove(t));

                  case 8:
                    o = s.sent;
                    console.warn('remote move - ' + JSON.stringify(o) + ' - ' + JSON.stringify(t));
                    s.next = 15;
                    break;

                  case 12:
                    s.prev = 12;
                    s.t0 = s.catch(5);
                    console.warn('remote move  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                  case 15:
                    console.log('move: ', this.motionParam);

                  case 16:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[5, 12]],
            Promise
          );
        },
      },
      {
        key: 'remoteMove',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
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
        key: '_startMoveTimer',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (
                      ((this._isActive = true),
                      console.log('_startMoveTimer'),
                      (t = function () {
                        if (o.startTimerID <= 0)
                          o.startTimerID = module1414.setInterval(function () {
                            return o._sendCommandMove();
                          }, 400);
                      }),
                      !(this.startTimerID <= 0) || this._isRemoteStarted)
                    ) {
                      s.next = 19;
                      break;
                    }

                    this._ShowNoteForMoment(6e3);

                    console.log('AppRemoteControlStart');
                    s.prev = 6;
                    s.next = 9;
                    return regeneratorRuntime.default.awrap(module416.default.remoteStart());

                  case 9:
                    if ((s.sent, !this.ignoreAsyncCallback)) {
                      s.next = 12;
                      break;
                    }

                    return s.abrupt('return');

                  case 12:
                    this._isRemoteStarted = true;
                    t();
                    s.next = 19;
                    break;

                  case 16:
                    s.prev = 16;
                    s.t0 = s.catch(6);
                    console.log(' AppRemoteControlStart error : ' + s.t0);

                  case 19:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[6, 16]],
            Promise
          );
        },
      },
      {
        key: '_clearTimer',
        value: function () {
          if (this.startTimerID > 0) {
            module1414.clearInterval(this.startTimerID);
            this.startTimerID = 0;

            this._setNoteVisible(false);
          }
        },
      },
      {
        key: '_stopMoveTimer',
        value: function (t) {
          console.log('_stoptMoveTimer');

          if (this.startTimerID > 0) {
            module1414.clearInterval(this.startTimerID);
            this.startTimerID = 0;

            this._setNoteVisible(false);
          }

          if (this._isRemoteStarted) this.remoteEnd(t);
        },
      },
      {
        key: 'remoteEnd',
        value: function (t) {
          var o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (((this._isRemoteStarted = false), (s.prev = 1), (s.t0 = !t), !s.t0)) {
                      s.next = 6;
                      break;
                    }

                    s.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.remoteEnd());

                  case 6:
                    if (((j = 0), !this.ignoreAsyncCallback)) {
                      s.next = 9;
                      break;
                    }

                    return s.abrupt('return');

                  case 9:
                    this._setNoteVisible(false);

                    s.next = 15;
                    break;

                  case 12:
                    s.prev = 12;
                    s.t1 = s.catch(1);
                    if (j < 8)
                      setTimeout(function () {
                        j++;
                        o.remoteEnd();
                      }, 1e3);
                    else globals.showToast(module510.robot_communication_exception);

                  case 15:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[1, 12]],
            Promise
          );
        },
      },
      {
        key: '_checkRemoteControlCondition',
        value: function (t) {
          var o = this;

          if ((console.log('_isCheckingRemoteCondition:', this._isCheckingRemoteCondition, module510.robot_communication_exception), !this._isCheckingRemoteCondition)) {
            this._isCheckingRemoteCondition = true;
            console.log('_isCheckingRemoteCondition: set to true');
            var n = module381.RobotStatusManager.sharedManager().state;
            if (n == module381.RobotState.SPOT_CLEAN)
              globals.Alert.alert('', module510.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module510.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module389.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module381.RobotState.CLEAN || n == module381.RobotState.SEGMENT_CLEAN)
              globals.Alert.alert('', module510.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module510.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module389.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module381.RobotState.BACK_TO_DOCK)
              globals.Alert.alert('', module510.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module510.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module389.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module381.RobotState.GOTO_TARGET)
              globals.Alert.alert('', module510.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module510.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module389.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module381.RobotState.ZONED_CLEAN)
              globals.Alert.alert('', module510.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module510.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module389.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module381.RobotState.REMOTE) {
              t();
              this._isCheckingRemoteCondition = false;
            } else if (n == module381.RobotState.UPDATING) {
              this._isCheckingRemoteCondition = false;
              globals.showToast(module510.localization_strings_Setting_RemoteControlPage_13);
            } else {
              t();
              this._isCheckingRemoteCondition = false;
            }
          }
        },
      },
      {
        key: 'sendCmd',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.pause());

                  case 3:
                    if ((t.sent, !this.ignoreAsyncCallback)) {
                      t.next = 6;
                      break;
                    }

                    return t.abrupt('return');

                  case 6:
                    this._delayedSuccessCallback();

                    t.next = 13;
                    break;

                  case 9:
                    t.prev = 9;
                    t.t0 = t.catch(0);
                    this._isCheckingRemoteCondition = false;
                    globals.showToast(module510.robot_communication_exception);

                  case 13:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: '_delayedSuccessCallback',
        value: function () {
          var t = this;
          module1414.setTimeout(function () {
            t._startMoveTimer();
          }, 800);
          module1414.setTimeout(function () {
            t._isCheckingRemoteCondition = false;
            console.log('_isCheckingRemoteCondition: false');
          }, 3e3);
        },
      },
      {
        key: '_updateMotionParam',
        value: function (t, o) {
          this.motionParam = E(
            E({}, this.motionParam),
            {},
            {
              velocity: t,
              omega: o,
            }
          );
          console.log('motionParam:', this.motionParam);
        },
      },
      {
        key: '_startMotion',
        value: function () {
          console.log('_startMotion');

          this._checkRemoteControlCondition(this._startMoveTimer.bind(this));
        },
      },
      {
        key: '_stopMotion',
        value: function (t) {
          this._isActive = false;

          this._stopMoveTimer(t);

          console.log('_stopMotion');
          if (this.bottomView)
            this.bottomView.setState({
              spotDisabled: false,
              chargeDisabled: false,
            });
        },
      },
      {
        key: 'checkLocal',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    module393.localPingWithCallback(function (o) {
                      console.log('\u68c0\u67e5 localPing \u7ed3\u679c\u8fd4\u56de');
                      if (!o) t.showNotLocalMsg();
                    });

                  case 1:
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
      },
      {
        key: 'toMainPage',
        value: function () {
          this.props.navigation.navigate('MainPage');
        },
      },
      {
        key: 'onPressTitle',
        value: function () {
          if (globals.PressTitleAction) globals.PressTitleAction();
        },
      },
    ]);
    return x;
  })(React.default.Component);

exports.default = K;
K.contextType = module1193.AppConfigContext;
K.navigationOptions = {
  header: React.default.createElement(module13.View, null),
};
var G = module13.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  controlView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
