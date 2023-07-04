var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2057 = require('./2057'),
  module416 = require('./416'),
  module394 = require('./394'),
  module420 = require('./420'),
  module385 = require('./385'),
  module418 = require('./418'),
  module387 = require('./387'),
  module1199 = require('./1199');

function C() {
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
  module499 = require('./499'),
  T = 0,
  B = 30,
  E = (function (t) {
    module9.default(O, t);

    var s = O,
      module1199 = C(),
      E = function () {
        var t,
          o = module12.default(s);

        if (module1199) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function O(t) {
      var s;
      module6.default(this, O);
      (s = E.call(this, t)).mode = (s.props.navigation.state.params && s.props.navigation.state.params.mode) || 0;
      s.state = {
        title: '',
        status: 'normal',
        locked: false,
        message: s.mode == T ? module510.draw_new_gestue_password_tip : module510.input_gestue_password_tip,
        timeCount: B,
      };
      s.password = null;
      s.oldPassword = null;
      s.isSetModeFirstlyInput = true;
      s.isOldPasswordVerified = false;
      return s;
    }

    module7.default(O, [
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
          var t = [module510.title_password, module510.verify_gesture_password, module510.disable_gesture_password, module510.modify_password];
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
        value: function (t, s) {
          var n;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    l.prev = 0;
                    l.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.checkSecPassword(module499(t)));

                  case 3:
                    n = l.sent;
                    console.log('checkSecPassword - ' + JSON.stringify(n));
                    module394.MC.gesturePassword = module499(t);
                    this.isOldPasswordVerified = true;
                    if (s) s(t);
                    l.next = 14;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(0);
                    if (l.t0.data.error && -10010 == l.t0.data.error.code) this.lock();
                    else this.handleWrongPassword('timeout' == l.t0.data.error ? module510.robot_communication_exception : module510.password_is_incorrect_tip);
                    module418.Log.log(
                      module418.LogTypes.Monitor,
                      'checkSecPasswordcheckSecPassword  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0),
                      module418.InfoColors.Fail
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
          }, 500);
        },
      },
      {
        key: 'onEnd',
        value: function (t) {
          console.log('password - ' + t);
          if (t.length < 4) this.handleWrongPassword(module510.gesture_password_at_least_four_length);
          else {
            if (this.mode == T) this.handleSetMode(t);
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
            this.setState({
              status: 'normal',
              message: module510.please_draw_again,
            });
          } else if (t != this.password) this.handleWrongPassword(module510.password_is_not_same_with_older);
          else this.rpcUpdatePassword(true, this.oldPassword, this.password, s);
        },
      },
      {
        key: 'rpcUpdatePassword',
        value: function (t, s, n, l) {
          var module9;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(
                      module416.default.setSecPassword({
                        enable_password: t ? 1 : 0,
                        old_password: s ? module499(s) : '',
                        new_password: n ? module499(n) : '',
                      })
                    );

                  case 3:
                    module9 = c.sent;
                    console.log('setSecPassword - ' + JSON.stringify(module9));
                    c.next = 7;
                    return regeneratorRuntime.default.awrap(
                      module420.SetStorageKey(module420.StorageKeys.HasSetInitialGesturePassword, module420.StorageKeys.HasSetInitialGesturePassword)
                    );

                  case 7:
                    module394.MC.gesturePassword = module499(n);
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
                return s.toastThenBack(module510.gesture_password_set_successfully_tip);
              }
          );
        },
      },
      {
        key: 'handleCheckMode',
        value: function (t) {
          var s = this;
          this.checkPassword(t, function (t) {
            var o, n, l, u;
            if (!(null == s || null == (o = s.props) || null == (n = o.navigation) || null == (l = n.state) || null == (u = l.params))) u.navigateToMonitorPage();
          });
        },
      },
      {
        key: 'handleCloseMode',
        value: function (t) {
          var s = this;
          this.checkPassword(t, function (t) {
            s.rpcUpdatePassword(false, t, '', function () {
              return s.toastThenBack(module510.disable_gesture_password_successfully_tip);
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
              s.toastThenBack(module510.modify_gesture_password_successfully_tip);
            });
          else
            this.checkPassword(t, function (t) {
              s.oldPassword = t;
              s.setState({
                state: 'normal',
                message: module510.begin_draw_new_gesture_password,
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
            n = this.mode == T && this.isSetModeFirstlyInput && o,
            l = this.mode != T && !this.isOldPasswordVerified;
          return (
            (n || l) &&
            React.default.createElement(module385.PureButton, {
              style: [
                I.bottomButton,
                {
                  backgroundColor: t.monitor.backgroundColor,
                },
              ],
              textColor: t.monitor.passwordMsg,
              title: n ? module510.title_skip : module510.forget_password,
              onPress: n ? s : this.forgetPassword.bind(this),
              funcId: 'forget_password',
            })
          );
        },
      },
      {
        key: 'lock',
        value: function () {
          var t = this;
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
                timeCount: B,
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
              module510.reset_gesture_password_tip,
              function () {
                var s;
                return regeneratorRuntime.default.async(
                  function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          n.prev = 0;
                          n.next = 3;
                          return regeneratorRuntime.default.awrap(module416.default.resetSecPassword());

                        case 3:
                          s = n.sent;
                          console.log('resetSecPassword - ' + JSON.stringify(s));
                          t.toastThenBack(module510.disable_gesture_password_successfully_tip);
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
          module387.LogEventStat(module387.LogEventMap.RealTimeForgetPassword);
        },
      },
      {
        key: 'getLockView',
        value: function () {
          var t = this.context.theme;
          return (
            this.state.locked &&
            React.default.createElement(
              module13.View,
              {
                style: I.lockView,
              },
              React.default.createElement(module13.Image, {
                source: t.monitor.gestureLock,
                style: I.lockIcon,
              }),
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    paddingHorizontal: 20,
                    marginTop: 20,
                    color: t.monitor.passwordMsg,
                    fontSize: 24,
                  },
                },
                module510.video_func_is_locked
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    paddingHorizontal: 20,
                    marginTop: 16,
                    color: t.monitor.passwordMsg,
                    fontSize: 16,
                  },
                },
                module510.retry_after_30_seconds,
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
            module13.View,
            {
              style: [
                I.container,
                {
                  backgroundColor: this.context.theme.monitor.backgroundColor,
                },
              ],
            },
            !this.state.locked &&
              React.default.createElement(module2057.default, {
                ref: function (s) {
                  t.gesturePassword = s;
                },
                title: module510.gesture_password_title,
                status: this.state.status,
                message: this.state.message,
                wrongColor: '#007aff',
                rightColor: '#007aff',
                onStart: this.onStart.bind(this),
                onEnd: function (s) {
                  return t.onEnd(s);
                },
                interval: 500,
              }),
            this.getBottomButton(),
            this.getLockView(),
            React.default.createElement(module385.AlertView, {
              ref: function (s) {
                return (t.alert = s);
              },
              isModal: true,
            })
          );
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = E;
E.contextType = module1199.AppConfigContext;
var I = module13.StyleSheet.create({
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
