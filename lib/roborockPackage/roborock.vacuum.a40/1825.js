var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module381 = require('./381'),
  module1826 = require('./1826'),
  module422 = require('./422'),
  module385 = require('./385'),
  module1161 = require('./1161'),
  module515 = require('./515'),
  module414 = require('./414'),
  module426 = require('./426');

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

function _(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      R(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function x() {
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

var module500 = require('./500').strings,
  module12 = require('./12'),
  D = module12.StyleSheet,
  P = module12.Text,
  O = module12.View,
  B = module12.Dimensions,
  T = module12.ScrollView,
  module1404 = require('./1404'),
  module1507 = require('./1507').Errors,
  module1153 = require('./1153'),
  module1828 = require('./1828'),
  A = B.get('window'),
  H = (function (t) {
    module7.default(E, t);

    var module50 = E,
      module515 = x(),
      R = function () {
        var t,
          n = module11.default(module50);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = R.call(this, t)).state = {
        code: t.navigation.state.params.code,
        width: 0,
        height: 0,
        countryCode: 'de',
      };
      n.isUnmount = false;
      n.host = module1153.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
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
          module1828.getCountryInfo(function (n, o) {
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
            l = module426.DockErrorImageMap[module381.RSM.originDockType],
            c = l && l[126],
            u = module422.DMM.errorImages.map[17],
            f = module381.RSM.originDockType && this.state.code > 125 && c ? c : u,
            C = l && l[this.state.code],
            b = module422.DMM.errorImages.map[this.state.code],
            R = module381.RSM.originDockType && C ? C : b,
            x = this.state.code < 100 || 644 == this.state.code ? R : f;

          return React.default.createElement(
            O,
            {
              style: [
                U.container,
                {
                  backgroundColor: n.errorPage.backgroundColor,
                },
              ],
            },
            React.default.createElement(
              O,
              {
                style: {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                onLayout: function (n) {
                  if (!t.isUnmount) t.setState(n.nativeEvent.layout);
                },
              },
              React.default.createElement(module1826.default, {
                style: U.imgStyle,
                uri: 'https://' + this.host + x,
              })
            ),
            React.default.createElement(
              P,
              {
                style: U.errorTitle,
              },
              module1507()[this.state.code][1]
            ),
            React.default.createElement(
              T,
              {
                style: U.errorContentContainer,
                alwaysBounceVertical: false,
                scrollEnabled: true,
                showsVerticalScrollIndicator: false,
              },
              React.default.createElement(
                O,
                {
                  style: U.errorViewContentContainer,
                },
                React.default.createElement(
                  P,
                  {
                    style: U.errorContent,
                  },
                  module1507()[this.state.code][3]
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
                    ? module500.localization_strings_Main_Error_Constants_1 + ':' + this.state.code + ' ' + module1507()[this.state.code][4]
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
                  module422.DMM.isGarnet && module381.RSM.dockErrorStatus > 0 ? module500.error_dock_error_detail : ''
                )
              )
            ),
            this.showResolvedButton() &&
              React.default.createElement(
                module1161.BoxShadow,
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
                      U.handleBtn,
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
                    title: module500.error_resolved,
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
                      module422.DMM.isGarnet &&
                      module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None &&
                      (module381.RSM.isPureMoppingMode() || module381.RSM.isCleanMopMoppingMode()) &&
                      !module381.RSM.isPureMopping() &&
                      !module381.RSM.isCleanMopMopping() &&
                      module381.RSM.state != module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER &&
                      module381.RSM.state != module381.RobotState.WASHING_DUSTER;
                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module414.default.resolveError(this.state.code));

                  case 4:
                    if (t) this.resumeMoppingAlert();
                    else
                      module1404.setTimeout(function () {
                        o.props.navigation.goBack();
                      }, 1e3);
                    s.next = 12;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(1);
                    globals.showToast(module500.robot_communication_exception);
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
              module500.robot_cmd_resume_mopping_alert,
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
                            module414.default.start([
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
                          return regeneratorRuntime.default.awrap(module414.default.resumeSegmentClean());

                        case 10:
                          s.next = 15;
                          break;

                        case 12:
                          if (module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.Zone_Clean) {
                            s.next = 15;
                            break;
                          }

                          s.next = 15;
                          return regeneratorRuntime.default.awrap(module414.default.resumeZoneClean());

                        case 15:
                          s.next = 20;
                          break;

                        case 17:
                          s.prev = 17;
                          s.t0 = s.catch(1);
                          console.log('resetSecPassword  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                        case 20:
                          module1404.setTimeout(function () {
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
                          return regeneratorRuntime.default.awrap(module414.default.stop());

                        case 2:
                          module1404.setTimeout(function () {
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
                confirmTitle: module500.robot_cmd_resume_mopping,
              }
            );
        },
      },
    ]);
    return E;
  })(React.default.Component);

exports.default = H;
H.contextType = module515.AppConfigContext;
var U = D.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: module1153.NavigationBarHeight,
    backgroundColor: 'white',
  },
  animation: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  errorTitle: {
    width: A.width - 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    color: '#3384FF',
  },
  errorViewContentContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
  },
  errorContentContainer: {
    flex: 0.5,
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
    width: module422.DMM.errorImages.size.width,
    height: module422.DMM.errorImages.size.height,
    resizeMode: 'contain',
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
