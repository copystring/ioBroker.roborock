var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module1193 = require('./1193');

function w() {
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
  P = 0,
  x = (function (t) {
    module9.default(W, t);

    var n = W,
      module1193 = w(),
      x = function () {
        var t,
          o = module12.default(n);

        if (module1193) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function W(t) {
      var n;
      module6.default(this, W);

      (n = x.call(this, t))._onPressSetMopBackPWM = function () {
        n.setState({
          shouldShowInputDialog: true,
        });
      };

      n._cancelInput = function () {
        n.setState({
          shouldShowInputDialog: false,
        });
      };

      n.unMount = false;
      n.state = {
        shouldShowInputDialog: false,
        PWMValue: 0,
        loading: true,
        requestFailed: false,
        refreshing: false,
      };
      return n;
    }

    module7.default(W, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this.unMount = true;
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
                    this.props.navigation.setParams({
                      title: '\u5730\u6bef\u6e05\u6d01\u8bbe\u7f6e',
                    });
                    this.initData(false);

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
        key: 'getMenus',
        value: function () {
          return [
            {
              title: '\u4e0a\u6869\u62d6\u5e03\u8f6c\u901f\uff08%\uff09',
              detail: this.state.PWMValue + ' ',
              shouldShowRightArrow: true,
              onPress: this._onPressSetMopBackPWM,
              visible: true,
              shouldShowBottomLine: true,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                P = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return n;
          var s = React.default.createElement(
            module13.View,
            {
              style: [
                V.containterView,
                {
                  backgroundColor: this.theme.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          if (this.state.loading) return s;
          var u = this.getMenus().map(function (t, n) {
            return t.visible
              ? React.default.createElement(
                  module385.SettingListItemView,
                  module22.default({}, t, {
                    key: n,
                    titleColor: 'rgba(0,0,0,0.8)',
                  })
                )
              : React.default.createElement(module13.View, {
                  key: n,
                });
          });
          return React.default.createElement(
            module13.View,
            {
              style: [
                V.containter,
                {
                  backgroundColor: this.theme.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.ScrollView,
              {
                style: V.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module13.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    P = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(module13.View, {
                style: V.section,
              }),
              u
            ),
            React.default.createElement(module385.InputDialog, {
              visible: this.state.shouldShowInputDialog,
              maxLength: 10,
              title: '\u4e0a\u6869\u62d6\u5e03\u8f6c\u901f\uff08%\uff09',
              inputPlaceholder: '0~100',
              inputDefaultValue: this.state.PWMValue,
              onPressConfirmButton: function (n) {
                t._confirmInputPWM(n);
              },
              onPressCancelButton: this._cancelInput,
            })
          );
        },
      },
      {
        key: 'initData',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getMopBackPWM());

                  case 4:
                    if (!this.unMount)
                      this.setState({
                        refreshing: false,
                      });
                    if (!this.unMount) this.finishLoading(false);
                    P = 0;
                    n.next = 13;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(1);
                    console.log('initData - ' + JSON.stringify(n.t0));
                    this.retry(t);

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 9]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var n = this;
          if (!this.unMount)
            P < 3
              ? (P++,
                setTimeout(function () {
                  console.warn('retryTimes:' + P);
                  n.initData(t);
                }, 1e3))
              : this.setState({
                  requestFailed: true,
                });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
          });
          if (this.state.loading)
            this.setState({
              loading: false,
            });
        },
      },
      {
        key: '_confirmInputPWM',
        value: function (t) {
          var n = parseInt(t);

          if (n) {
            this.setMopBackPWM(n);
            this.setState({
              shouldShowInputDialog: false,
            });
          } else globals.showToast('\u8bf7\u8f93\u5165\u6b63\u786e\u683c\u5f0f\u6570\u636e');
        },
      },
      {
        key: 'setMopBackPWM',
        value: function (t) {
          var n, o;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    n = {
                      pwm: t,
                    };
                    u.prev = 1;
                    u.next = 4;
                    return regeneratorRuntime.default.awrap(module416.default.setMopBackPWM(n));

                  case 4:
                    o = u.sent;
                    this.setState({
                      PWMValue: t,
                    });
                    console.log('setMopBackPWM: ' + JSON.stringify(o));
                    u.next = 13;
                    break;

                  case 9:
                    u.prev = 9;
                    u.t0 = u.catch(1);
                    globals.showToast(module510.robot_communication_exception);
                    console.log(u.t0);

                  case 13:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[1, 9]],
            Promise
          );
        },
      },
      {
        key: 'getMopBackPWM',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getMopBackPWM());

                  case 3:
                    t = n.sent;
                    console.log('getMopBackPWM: ' + JSON.stringify(t));
                    if (!this.unMount)
                      this.setState({
                        PWMValue: t.result.pwm,
                      });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module510.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return W;
  })(React.Component);

exports.default = x;
x.contextType = module1193.AppConfigContext;
var V = module13.StyleSheet.create({
  containterView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containterScroll: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 65,
  },
  infoTextView: {
    backgroundColor: 'transparent',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
    transform: [],
  },
  section: {
    paddingVertical: 7,
  },
});
