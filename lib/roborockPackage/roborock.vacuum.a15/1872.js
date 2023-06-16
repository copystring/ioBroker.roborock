var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module381 = require('./381'),
  module1873 = require('./1873'),
  module423 = require('./423'),
  module385 = require('./385'),
  module1328 = require('./1328'),
  module1121 = require('./1121'),
  module415 = require('./415'),
  module427 = require('./427');

function w(t, n) {
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

function _(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      w(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function k() {
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

B.get('window');

var module505 = require('./505').strings,
  module12 = require('./12'),
  D = module12.StyleSheet,
  P = module12.Text,
  O = module12.View,
  B = module12.Dimensions,
  T = module12.ScrollView,
  module1340 = require('./1340'),
  module1557 = require('./1557').Errors,
  module1265 = require('./1265'),
  module1875 = require('./1875'),
  A = (function (t) {
    module7.default(E, t);

    var module50 = E,
      module1121 = k(),
      w = function () {
        var t,
          n = module11.default(module50);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = w.call(this, t)).state = {
        code: t.navigation.state.params.code,
        width: 0,
        height: 0,
        countryCode: 'de',
      };
      n.isUnmount = false;
      n.host = module1265.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
      return n;
    }

    module5.default(E, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.isUnmount = true;
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          module1875.getCountryInfo(function (n, o) {
            if (n && !t.isUnmount)
              t.setState({
                countryCode: o.countryCode,
              });
          });
        },
      },
      {
        key: 'openBuyLink',
        value: function () {
          this.props.navigation.navigate('BuyCompassPage', {});
        },
      },
      {
        key: 'renderBuyCompassHint',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = B.get('window').width - 100,
            s = _(
              _(
                {
                  width: o,
                  height: 45,
                  radius: 22,
                },
                n.shadowConfig
              ),
              {},
              {
                style: {
                  left: 50,
                  bottom: 40,
                  position: 'absolute',
                },
              }
            ),
            l = module427.DockErrorImageMap[module381.RSM.originDockType],
            c = l && l[126],
            u = module423.DMM.errorImages.map[17],
            f = module381.RSM.originDockType && this.state.code > 125 && c ? c : u,
            C = l && l[this.state.code],
            b = module423.DMM.errorImages.map[51 == this.state.code ? 14 : this.state.code],
            w = module381.RSM.originDockType && C ? C : b,
            k = this.state.code < 100 || 644 == this.state.code ? w : f;

          return React.default.createElement(
            O,
            {
              style: [
                H.container,
                {
                  backgroundColor: n.errorPage.backgroundColor,
                },
              ],
            },
            React.default.createElement(
              O,
              {
                style: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                onLayout: function (n) {
                  if (!t.isUnmount) t.setState(n.nativeEvent.layout);
                },
              },
              React.default.createElement(module1873.default, {
                style: H.imgStyle,
                resizeMode: 'contain',
                uri: 'https://' + this.host + k,
              })
            ),
            React.default.createElement(
              P,
              {
                style: H.errorTitle,
              },
              module1557()[this.state.code][1]
            ),
            React.default.createElement(
              T,
              {
                style: H.errorContentContainer,
                alwaysBounceVertical: false,
                scrollEnabled: true,
                showsVerticalScrollIndicator: false,
              },
              React.default.createElement(
                O,
                {
                  style: H.errorViewContentContainer,
                },
                React.default.createElement(
                  P,
                  {
                    style: H.errorContent,
                  },
                  module1557()[this.state.code][3]
                ),
                React.default.createElement(
                  P,
                  {
                    style: {
                      alignSelf: 'center',
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: n.errorPage.detailColor,
                      lineHeight: 24,
                    },
                  },
                  this.state.code >= 100 && this.state.code <= 255
                    ? module505.localization_strings_Main_Error_Constants_1 + ':' + this.state.code + ' ' + module1557()[this.state.code][4]
                    : ''
                ),
                React.default.createElement(
                  P,
                  {
                    style: {
                      alignSelf: 'center',
                      fontSize: 15,
                      color: '#9e9e9e',
                    },
                  },
                  module423.DMM.isGarnet && module381.RSM.dockErrorStatus > 0 ? module505.error_dock_error_detail : ''
                )
              )
            ),
            this.showResolvedButton() &&
              React.default.createElement(
                module1328.BoxShadow,
                {
                  setting: s,
                },
                React.default.createElement(
                  module385.GradientView,
                  {
                    colors: ['#72B4FE', '#3777F7'],
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: [
                      H.handleBtn,
                      {
                        minWidth: o,
                      },
                    ],
                  },
                  React.default.createElement(module385.PureButton, {
                    funcId: 'sync_timezone_btn',
                    style: {
                      backgroundColor: 'transparent',
                    },
                    textColor: 'white',
                    fontSize: 16,
                    title: module505.error_resolved,
                    onPress: function () {
                      return t.onResolveError();
                    },
                  })
                )
              ),
            React.default.createElement(module385.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
              isModal: true,
            })
          );
        },
      },
      {
        key: 'onResolveError',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    t =
                      module423.DMM.isGarnet &&
                      module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None &&
                      (module381.RSM.isPureMoppingMode() || module381.RSM.isCleanMopMoppingMode()) &&
                      !module381.RSM.isPureMopping() &&
                      !module381.RSM.isCleanMopMopping() &&
                      module381.RSM.state != module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER &&
                      module381.RSM.state != module381.RobotState.WASHING_DUSTER;
                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module415.default.resolveError(this.state.code));

                  case 4:
                    if (t) this.resumeMoppingAlert();
                    else
                      module1340.setTimeout(function () {
                        o.props.navigation.goBack();
                      }, 1e3);
                    s.next = 12;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(1);
                    globals.showToast(module505.robot_communication_exception);
                    console.log('onResolveError  error: ' + s.t0);

                  case 12:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[1, 8]],
            Promise
          );
        },
      },
      {
        key: 'showResolvedButton',
        value: function () {
          return module381.RSM.dockErrorStatus > 0;
        },
      },
      {
        key: 'resumeMoppingAlert',
        value: function () {
          var t = this;
          if (this.alert)
            this.alert.customAlert(
              '',
              module505.robot_cmd_resume_mopping_alert,
              function () {
                var o;
                return regeneratorRuntime.default.async(
                  function (s) {
                    for (;;)
                      switch ((s.prev = s.next)) {
                        case 0:
                          if (
                            ((o = {
                              2: 1,
                              6: 2,
                            }),
                            (s.prev = 1),
                            module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.Global_Clean)
                          ) {
                            s.next = 7;
                            break;
                          }

                          s.next = 5;
                          return regeneratorRuntime.default.awrap(
                            module415.default.start([
                              {
                                clean_mop: o[module381.RSM.clean_mop_status],
                              },
                            ])
                          );

                        case 5:
                          s.next = 15;
                          break;

                        case 7:
                          if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.Segment_Clean) {
                            s.next = 12;
                            break;
                          }

                          s.next = 10;
                          return regeneratorRuntime.default.awrap(module415.default.resumeSegmentClean());

                        case 10:
                          s.next = 15;
                          break;

                        case 12:
                          if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.Zone_Clean) {
                            s.next = 15;
                            break;
                          }

                          s.next = 15;
                          return regeneratorRuntime.default.awrap(module415.default.resumeZoneClean());

                        case 15:
                          s.next = 20;
                          break;

                        case 17:
                          s.prev = 17;
                          s.t0 = s.catch(1);
                          console.log('resetSecPassword  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                        case 20:
                          module1340.setTimeout(function () {
                            t.props.navigation.goBack();
                          }, 1e3);

                        case 21:
                        case 'end':
                          return s.stop();
                      }
                  },
                  null,
                  null,
                  [[1, 17]],
                  Promise
                );
              },
              function () {
                return regeneratorRuntime.default.async(
                  function (o) {
                    for (;;)
                      switch ((o.prev = o.next)) {
                        case 0:
                          o.next = 2;
                          return regeneratorRuntime.default.awrap(module415.default.stop());

                        case 2:
                          module1340.setTimeout(function () {
                            t.props.navigation.goBack();
                          }, 1e3);

                        case 3:
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
              {
                confirmTitle: module505.robot_cmd_resume_mopping,
              }
            );
        },
      },
    ]);
    return E;
  })(React.default.Component);

exports.default = A;
A.contextType = module1121.AppConfigContext;
var H = D.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  errorTitle: {
    marginHorizontal: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#3384FF',
  },
  errorViewContentContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
  },
  errorContentContainer: {
    alignSelf: 'center',
    marginHorizontal: 40,
    marginTop: 10,
    marginBottom: 100,
  },
  errorContent: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#9e9e9e',
    lineHeight: 24,
  },
  imgStyle: {
    width: module423.DMM.errorImages.size.width,
    height: module423.DMM.errorImages.size.height,
  },
  handleBtn: {
    position: 'absolute',
    alignSelf: 'center',
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
    marginBottom: 30,
  },
});
