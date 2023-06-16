var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, s) {
    if (!s && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = b(s);
    if (o && o.has(t)) return o.get(t);
    var n = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(n, u, c);
        else n[u] = t[u];
      }

    n.default = t;
    if (o) o.set(t, n);
    return n;
  })(require('react')),
  module12 = require('./12'),
  module1949 = require('./1949'),
  module407 = require('./407'),
  module390 = require('./390'),
  module411 = require('./411'),
  module381 = require('./381'),
  module409 = require('./409'),
  module383 = require('./383'),
  module506 = require('./506');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var s = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : s;
  })(t);
}

function M() {
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

var module491 = require('./491').strings,
  module481 = require('./481'),
  O = 0,
  T = 30,
  B = (function (t) {
    module7.default(I, t);

    var module506 = I,
      b = M(),
      B = function () {
        var t,
          s = module11.default(module506);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, o);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t) {
      var s;
      module4.default(this, I);
      (s = B.call(this, t)).mode = (s.props.navigation.state.params && s.props.navigation.state.params.mode) || 0;
      s.state = {
        title: '',
        status: 'normal',
        locked: false,
        message: s.mode == O ? module491.draw_new_gestue_password_tip : module491.input_gestue_password_tip,
        timeCount: T,
      };
      s.password = null;
      s.oldPassword = null;
      s.isSetModeFirstlyInput = true;
      s.isOldPasswordVerified = false;
      return s;
    }

    module5.default(I, [
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.props.navigation.state.params.enabledTitleBarUpdate) this.props.navigation.state.params.enabledTitleBarUpdate();
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = [module491.title_password, module491.verify_gesture_password, module491.disable_gesture_password, module491.modify_password];
          this.props.navigation.setParams({
            title: t[this.mode],
          });
        },
      },
      {
        key: 'onStart',
        value: function () {},
      },
      {
        key: 'checkPassword',
        value: function (t, o) {
          var n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.checkSecPassword(module481(t)));

                  case 3:
                    n = l.sent;
                    console.log('checkSecPassword - ' + JSON.stringify(n));
                    module390.MC.gesturePassword = module481(t);
                    this.isOldPasswordVerified = true;
                    if (o) o(t);
                    l.next = 14;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(0);
                    if (l.t0.data.error && -10010 == l.t0.data.error.code) this.lock();
                    else this.handleWrongPassword('timeout' == l.t0.data.error ? module491.robot_communication_exception : module491.password_is_incorrect_tip);
                    module409.Log.log(
                      module409.LogTypes.Monitor,
                      'checkSecPasswordcheckSecPassword  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0),
                      module409.InfoColors.Fail
                    );

                  case 14:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
      {
        key: 'handleWrongPassword',
        value: function (t) {
          var s = this;
          this.setState({
            status: 'wrong',
            message: t,
          });
          setTimeout(function () {
            s.setState({
              status: 'normal',
            });
            if (s.gesturePassword) s.gesturePassword.resetActive();
          }, 500);
        },
      },
      {
        key: 'onEnd',
        value: function (t) {
          console.log('password - ' + t);
          if (t.length < 4) this.handleWrongPassword(module491.gesture_password_at_least_four_length);
          else {
            if (this.mode == O) this.handleSetMode(t);
            if (1 == this.mode) this.handleCheckMode(t);
            if (2 == this.mode) this.handleCloseMode(t);
            if (3 == this.mode) this.handleModifyMode(t);
          }
        },
      },
      {
        key: 'handleSetNewPassword',
        value: function (t, s) {
          if (this.isSetModeFirstlyInput) {
            this.password = t;
            this.isSetModeFirstlyInput = false;
            if (this.gesturePassword) this.gesturePassword.resetActive();
            this.setState({
              status: 'normal',
              message: module491.please_draw_again,
            });
          } else if (t != this.password) this.handleWrongPassword(module491.password_is_not_same_with_older);
          else this.rpcUpdatePassword(true, this.oldPassword, this.password, s);
        },
      },
      {
        key: 'rpcUpdatePassword',
        value: function (t, o, n, l) {
          var module9;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module407.default.setSecPassword({
                        enable_password: t ? 1 : 0,
                        old_password: o ? module481(o) : '',
                        new_password: n ? module481(n) : '',
                      })
                    );

                  case 3:
                    module9 = c.sent;
                    console.log('setSecPassword - ' + JSON.stringify(module9));
                    c.next = 7;
                    return regeneratorRuntime.default.awrap(
                      module411.SetStorageKey(module411.StorageKeys.HasSetInitialGesturePassword, module411.StorageKeys.HasSetInitialGesturePassword)
                    );

                  case 7:
                    module390.MC.gesturePassword = module481(n);
                    if (l) l();
                    c.next = 14;
                    break;

                  case 11:
                    c.prev = 11;
                    c.t0 = c.catch(0);
                    console.log('setSecPassword  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

                  case 14:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            null,
            [[0, 11]],
            Promise
          );
        },
      },
      {
        key: 'handleSetMode',
        value: function (t) {
          var s = this,
            o = this.props.navigation.state.params && this.props.navigation.state.params.didSetPassword;
          this.handleSetNewPassword(
            t,
            o ||
              function () {
                return s.toastThenBack(module491.gesture_password_set_successfully_tip);
              }
          );
        },
      },
      {
        key: 'handleCheckMode',
        value: function (t) {
          var s = this;
          this.checkPassword(t, function (t) {
            s.props.navigation.navigate('MonitorPage', {
              monitorPageUnmount: function () {
                if (s.props.navigation.state.params && s.props.navigation.state.params.monitorPageUnmount) s.props.navigation.state.params.monitorPageUnmount();
              },
            });
          });
        },
      },
      {
        key: 'handleCloseMode',
        value: function (t) {
          var s = this;
          this.checkPassword(t, function (t) {
            s.rpcUpdatePassword(false, t, '', function () {
              return s.toastThenBack(module491.disable_gesture_password_successfully_tip);
            });
          });
        },
      },
      {
        key: 'toastThenBack',
        value: function (t) {
          var s = this;
          console.log('toastThenBack ', t);
          globals.showToast(t);
          setTimeout(function () {
            s.props.navigation.pop();
          }, 1e3);
        },
      },
      {
        key: 'handleModifyMode',
        value: function (t) {
          var s = this;
          if (this.isOldPasswordVerified)
            this.handleSetNewPassword(t, function () {
              s.toastThenBack(module491.modify_gesture_password_successfully_tip);
            });
          else
            this.checkPassword(t, function (t) {
              s.oldPassword = t;
              if (s.gesturePassword) s.gesturePassword.resetActive();
              s.setState({
                state: 'normal',
                message: module491.begin_draw_new_gesture_password,
              });
            });
        },
      },
      {
        key: 'getBottomButton',
        value: function () {
          var t = this.context.theme,
            s = (this.props.navigation.state.params && this.props.navigation.state.params.skip) || null,
            o = this.props.navigation.state.params && this.props.navigation.state.params.shouldShowSkip,
            n = this.mode == O && this.isSetModeFirstlyInput && o,
            l = this.mode != O && !this.isOldPasswordVerified;
          return (
            (n || l) &&
            React.default.createElement(module381.PureButton, {
              style: [
                E.bottomButton,
                {
                  backgroundColor: t.monitor.backgroundColor,
                },
              ],
              textColor: t.monitor.passwordMsg,
              title: n ? module491.title_skip : module491.forget_password,
              onPress: n ? s : this.forgetPassword.bind(this),
            })
          );
        },
      },
      {
        key: 'lock',
        value: function () {
          var t = this;
          if (this.gesturePassword) this.gesturePassword.resetActive();
          this.setState({
            locked: true,
          });
          this.timer = setInterval(function () {
            if (t.state.timeCount > 0)
              t.setState({
                timeCount: t.state.timeCount - 1,
              });
            else {
              clearInterval(t.timer);
              t.timer = null;
              t.setState({
                timeCount: T,
                locked: false,
              });
            }
          }, 1e3);
        },
      },
      {
        key: 'forgetPassword',
        value: function () {
          var t = this;
          if (this.alert)
            this.alert.customAlert(
              '',
              module491.reset_gesture_password_tip,
              function () {
                var o;
                return regeneratorRuntime.default.async(
                  function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          n.prev = 0;
                          n.next = 3;
                          return regeneratorRuntime.default.awrap(module407.default.resetSecPassword());

                        case 3:
                          o = n.sent;
                          console.log('resetSecPassword - ' + JSON.stringify(o));
                          t.toastThenBack(module491.disable_gesture_password_successfully_tip);
                          n.next = 11;
                          break;

                        case 8:
                          n.prev = 8;
                          n.t0 = n.catch(0);
                          console.log('resetSecPassword  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                        case 11:
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
              null,
              {
                confirmColor: '#007AFF',
              }
            );
          module383.LogEventStat(module383.LogEventMap.RealTimeForgetPassword);
        },
      },
      {
        key: 'getLockView',
        value: function () {
          var t = this.context.theme;
          return (
            this.state.locked &&
            React.default.createElement(
              module12.View,
              {
                style: E.lockView,
              },
              React.default.createElement(module12.Image, {
                source: t.monitor.gestureLock,
                style: E.lockIcon,
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    paddingHorizontal: 20,
                    marginTop: 20,
                    color: t.monitor.passwordMsg,
                    fontSize: 24,
                  },
                },
                module491.video_func_is_locked
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    paddingHorizontal: 20,
                    marginTop: 16,
                    color: t.monitor.passwordMsg,
                    fontSize: 16,
                  },
                },
                module491.retry_after_30_seconds,
                ' - ',
                this.state.timeCount
              )
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: [
                E.container,
                {
                  backgroundColor: this.context.theme.monitor.backgroundColor,
                },
              ],
            },
            !this.state.locked &&
              React.default.createElement(module1949.default, {
                ref: function (s) {
                  t.gesturePassword = s;
                },
                title: module491.gesture_password_title,
                status: this.state.status,
                message: this.state.message,
                wrongColor: '#007aff',
                rightColor: '#007aff',
                onStart: this.onStart.bind(this),
                onEnd: function (s) {
                  return t.onEnd(s);
                },
              }),
            this.getBottomButton(),
            this.getLockView(),
            React.default.createElement(module381.AlertView, {
              ref: function (s) {
                return (t.alert = s);
              },
              isModal: true,
            })
          );
        },
      },
    ]);
    return I;
  })(React.Component);

exports.default = B;
B.contextType = module506.AppConfigContext;
var E = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bottomButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 35,
  },
  lockView: {
    marginTop: -200,
    alignItems: 'center',
    alignSelf: 'center',
  },
  lockIcon: {
    width: 40,
    height: 40,
  },
});
