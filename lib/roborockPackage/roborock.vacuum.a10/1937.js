require('./902');

require('./1225');

require('./1938');

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module936 = require('./936'),
  module387 = require('./387'),
  module377 = require('./377'),
  module390 = require('./390'),
  module407 = require('./407'),
  module1939 = require('./1939'),
  module1941 = require('./1941'),
  module1943 = require('./1943'),
  module1944 = require('./1944'),
  module1945 = require('./1945'),
  module381 = require('./381'),
  module506 = require('./506'),
  module1946 = require('./1946'),
  module1947 = require('./1947'),
  module415 = require('./415'),
  module383 = require('./383');

function I(t, o) {
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
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      I(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      I(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function O() {
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

module12.Dimensions.get('window');

require('./934');

var module491 = require('./491').strings,
  module389 = require('./389'),
  module1247 = require('./1247'),
  module385 = require('./385'),
  module503 = require('./503'),
  W = 0,
  F = 0,
  J =
    module415.DMM.isTanos ||
    module415.DMM.isTanosV ||
    module415.DMM.isTanosE ||
    module415.DMM.isTanosS ||
    module415.DMM.isTanosSPlus ||
    module415.DMM.isGarnet ||
    module415.DMM.isTopazS ||
    module415.DMM.isTanosSV,
  H = module936.createSwitchNavigator(
    {
      KeyView: J ? module1946.default : module1944.default,
      JoyStickView: J ? module1947.default : module1945.default,
    },
    {
      initialRouteName: 'KeyView',
    }
  ),
  K = (function (t) {
    module7.default(M, t);

    var module49 = M,
      module387 = O(),
      v = function () {
        var t,
          o = module11.default(module49);

        if (module387) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function M(t) {
      var o;
      module4.default(this, M);

      (o = v.call(this, t))._backAction = function () {
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

    module5.default(M, [
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme;
          console.log('Remote control page  render ----\x3e ');
          var n = React.default.createElement(
            module12.View,
            {
              style: {
                flex: 1,
                backgroundColor: o.settingBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module381.Spinner, null)
          );
          return this.state.loading
            ? n
            : React.default.createElement(
                module12.View,
                {
                  style: [
                    G.container,
                    {
                      backgroundColor: o.remoteControl.backgroundColor,
                    },
                  ],
                },
                React.default.createElement(module1941.default, {
                  activeControlViewIndex: this.state.activeControlViewIndex,
                  onActiveControlViewChange: function (o) {
                    return t._onActiveControlViewChange(o);
                  },
                }),
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      flex: 1,
                      alignItems: 'stretch',
                      justifyContent: 'flex-start',
                    },
                  },
                  React.default.createElement(module1943.default, {
                    visible: this.state.noteVisible,
                  }),
                  React.default.createElement(H, {
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
                React.default.createElement(module1939.default, {
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
                    return regeneratorRuntime.default.awrap(module407.default.remoteStop());

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

          module503.readRemoteControlModeFlag(function (o) {
            if (o) {
              var n = parseInt(o);
              if (n === F || 1 === n) t._onActiveControlViewChange(n);
              else t._onActiveControlViewChange(F);
            }
          });
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.remoteControl.backgroundColor,
            title: module491.localization_strings_Setting_index_23,
            hiddenBottomLine: true,
          });

          this._pauseRobot();

          module12.AppState.addEventListener('change', this._handleAppStateChange);
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
                    return regeneratorRuntime.default.awrap(module407.default.pause());

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
                      loadingVisible: module389.isMiApp,
                    });
                    console.log('\u5f00\u59cb\u68c0\u67e5 _checkLocalPing');
                    module389.localPingWithCallback(function (o) {
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
            module491.remote_control_prompt,
            '',
            [
              {
                text: module491.localization_strings_Setting_RemoteControlPage_51,
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

          module503.saveRemoteControlModeFlag(this.state.activeControlViewIndex);
          module12.AppState.removeEventListener('change', this._handleAppStateChange);
          this.props.navigation.pop('RemoteControlPageNew');
        },
      },
      {
        key: '_onActiveControlViewChange',
        value: function (t) {
          var n, s;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (this.state.activeControlViewIndex !== t) {
                      o.next = 2;
                      break;
                    }

                    return o.abrupt('return');

                  case 2:
                    this._isActive = false;
                    this.setState({
                      activeControlViewIndex: t,
                    });
                    n = t == F ? 1e3 : 1500;
                    this.motionParam = E(
                      E({}, this.motionParam),
                      {},
                      {
                        duration: n,
                      }
                    );
                    s = module936.NavigationActions.navigate({
                      routeName: t === F ? 'KeyView' : 'JoyStickView',
                    });
                    console.log('Remote control page _onActiveControlViewChange');
                    module383.LogEventStatus('remote_control_method', {
                      methodIndex: t,
                    });
                    this.controlViewStack.dispatch(s);

                  case 10:
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

          if (module389.apiLevel < 110) {
            this._setloadingVisible(false);

            globals.Alert.alert(module491.localization_strings_Setting_RemoteControlPage_49, module491.localization_strings_Setting_RemoteControlPage_50, [
              {
                text: module491.localization_strings_Setting_RemoteControlPage_51,
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
            module1247.clearTimeout(this.noteTimerID);
            this.noteTimerID = 0;
          }

          this._setNoteVisible(true);

          this.noteTimerID = module1247.setTimeout(function () {
            o._setNoteVisible(false);

            o.noteTimerID = 0;
          }, t);
        },
      },
      {
        key: '_sendCommandMove',
        value: function () {
          var t, n;
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
                    return regeneratorRuntime.default.awrap(module407.default.remoteMove(t));

                  case 8:
                    n = s.sent;
                    console.warn('remote move - ' + JSON.stringify(n) + ' - ' + JSON.stringify(t));
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
            n = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (
                      ((this._isActive = true),
                      console.log('_startMoveTimer'),
                      (t = function () {
                        if (n.startTimerID <= 0)
                          n.startTimerID = module1247.setInterval(function () {
                            return n._sendCommandMove();
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
                    return regeneratorRuntime.default.awrap(module407.default.remoteStart());

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
            module1247.clearInterval(this.startTimerID);
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
            module1247.clearInterval(this.startTimerID);
            this.startTimerID = 0;

            this._setNoteVisible(false);
          }

          if (this._isRemoteStarted) this.remoteEnd();
        },
      },
      {
        key: 'remoteEnd',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this._isRemoteStarted = false;
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.remoteEnd());

                  case 4:
                    if ((n.sent, (W = 0), !this.ignoreAsyncCallback)) {
                      n.next = 8;
                      break;
                    }

                    return n.abrupt('return');

                  case 8:
                    this._setNoteVisible(false);

                    n.next = 14;
                    break;

                  case 11:
                    n.prev = 11;
                    n.t0 = n.catch(1);
                    if (W < 8)
                      setTimeout(function () {
                        W++;
                        t.remoteEnd();
                      }, 1e3);
                    else globals.showToast(module491.robot_communication_exception);

                  case 14:
                  case 'end':
                    return n.stop();
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
        key: '_checkRemoteControlCondition',
        value: function (t) {
          var o = this;

          if ((console.log('_isCheckingRemoteCondition:', this._isCheckingRemoteCondition, module491.robot_communication_exception), !this._isCheckingRemoteCondition)) {
            this._isCheckingRemoteCondition = true;
            console.log('_isCheckingRemoteCondition: set to true');
            var n = module377.RobotStatusManager.sharedManager().state;
            if (n == module377.RobotState.SPOT_CLEAN)
              globals.Alert.alert('', module491.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module491.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module385.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module377.RobotState.CLEAN || n == module377.RobotState.SEGMENT_CLEAN)
              globals.Alert.alert('', module491.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module491.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module385.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module377.RobotState.BACK_TO_DOCK)
              globals.Alert.alert('', module491.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module491.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module385.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module377.RobotState.GOTO_TARGET)
              globals.Alert.alert('', module491.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module491.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module385.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module377.RobotState.ZONED_CLEAN)
              globals.Alert.alert('', module491.localization_strings_abort_current_task_and_start_remote, [
                {
                  text: module491.localization_strings_Main_MainPage_11,
                  onPress: function () {
                    o._isCheckingRemoteCondition = false;
                  },
                },
                {
                  text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  onPress: function () {
                    o.sendCmd(module385.Methods.AppPause);
                  },
                },
              ]);
            else if (n == module377.RobotState.REMOTE) {
              t();
              this._isCheckingRemoteCondition = false;
            } else if (n == module377.RobotState.UPDATING) {
              this._isCheckingRemoteCondition = false;
              globals.showToast(module491.localization_strings_Setting_RemoteControlPage_13);
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
                    return regeneratorRuntime.default.awrap(module407.default.pause());

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
                    globals.showToast(module491.robot_communication_exception);

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
          module1247.setTimeout(function () {
            t._startMoveTimer();
          }, 800);
          module1247.setTimeout(function () {
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
                    module389.localPingWithCallback(function (o) {
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
    return M;
  })(React.default.Component);

exports.default = K;
K.contextType = module506.AppConfigContext;
K.navigationOptions = {
  header: React.default.createElement(module12.View, null),
};
module12.Dimensions.get('screen');
var G = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    width: module12.Dimensions.get('window').width,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: (module12.StatusBar.currentHeight || 0) + 44,
    top: 0,
  },
  backbutton: {
    position: 'absolute',
    left: 12,
    width: 30,
    height: 30,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  backimage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  headtitle: {
    width: module12.Dimensions.get('window').width - 108,
    height: 44,
    alignItems: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 44,
    fontSize: module387.default.scaledPixel(module387.default.iOSAndroidReturn(17.6, 15)),
    color: '#000000cc',
  },
  remoteControlKeyView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  remoteControlKeyViewImageBackground: {
    width: '85%',
    aspectRatio: 1,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  remoteControlJoyStickView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  topButtonView: {
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  topButton: {
    borderRadius: 22,
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  topButtonChecked: {
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },
  topButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.75,
  },
  topButtonTextChecked: {
    fontWeight: 'bold',
    opacity: 0.9,
  },
  bottomButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  bottomButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  bottomButtonTouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  bottomButtonImageWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  bottomButtonImage: {
    opacity: 1,
    width: 32,
    height: 32,
    resizeMode: 'stretch',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  bottomButtonImageDisabled: {
    opacity: 0.5,
  },
  bottomButtonText: {
    color: '#000',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  bottomButtonTextDisabled: {
    color: 'darkgrey',
  },
  modal: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: 'rgba(00, 00, 00, 0.6)',
    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
  },
  cancelDialog: {
    width: module12.Dimensions.get('window').width - 20,
    height: 74,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    bottom: 20,
    marginHorizontal: 10,
  },
  spinner: {
    marginLeft: 10,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  text: {
    flex: 1,
    marginLeft: 62,
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)',
  },
  cancel: {
    marginRight: 20,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'rgba(240, 240, 240, 0.8)',
    borderWidth: 1,
    borderRadius: 10,
  },
  noteView: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  noteText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 25,
  },
  indicator: {
    position: 'absolute',
    left: 27,
    height: 20,
    alignSelf: 'center',
  },
});
