require('./925');

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module377 = require('./377'),
  module1815 = require('./1815'),
  module415 = require('./415'),
  module381 = require('./381'),
  module1065 = require('./1065'),
  module506 = require('./506'),
  module407 = require('./407');

function M(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      M(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      M(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function _() {
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

require('./1817');

require('./1844').Surface;

require('./389');

require('./1268').Palette;

require('./1850');

B.get();

var module491 = require('./491').strings,
  module12 = require('./12'),
  k = module12.StyleSheet,
  P = module12.Text,
  O = module12.View,
  B = module12.PixelRatio,
  j = module12.Dimensions,
  T = module12.ScrollView,
  module1247 = require('./1247'),
  module1360 = require('./1360').Errors,
  module934 = require('./934'),
  module1851 = require('./1851'),
  I = j.get('window'),
  H = (function (t) {
    module7.default(E, t);

    var module49 = E,
      module506 = _(),
      M = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = M.call(this, t)).state = {
        code: t.navigation.state.params.code,
        width: 0,
        height: 0,
        countryCode: 'de',
      };
      n.isUnmount = false;
      n.host = module934.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].host;
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
          module1851.getCountryInfo(function (n, o) {
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
            o = R(
              R(
                {
                  width: j.get('window').width - 100,
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
            );
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
              React.default.createElement(module1815.default, {
                style: U.imgStyle,
                uri: 'https://' + this.host + module415.DMM.errorImages.map[this.state.code],
              })
            ),
            React.default.createElement(
              P,
              {
                style: U.errorTitle,
              },
              module1360()[this.state.code][1]
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
                  module1360()[this.state.code][3]
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
                    ? module491.localization_strings_Main_Error_Constants_1 + ':' + this.state.code + ' ' + module1360()[this.state.code][4]
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
                  module415.DMM.isGarnet && module377.RSM.dockErrorStatus > 0 ? module491.error_dock_error_detail : ''
                )
              )
            ),
            this.showResolvedButton() &&
              React.default.createElement(
                module1065.BoxShadow,
                {
                  setting: o,
                },
                React.default.createElement(
                  module381.GradientView,
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
                    style: U.handleBtn,
                  },
                  React.default.createElement(module381.PureButton, {
                    funcId: 'sync_timezone_btn',
                    style: {
                      backgroundColor: 'transparent',
                    },
                    textColor: 'white',
                    fontSize: 16,
                    title: module491.error_resolved,
                    onPress: function () {
                      return t.onResolveError();
                    },
                  })
                )
              ),
            React.default.createElement(module381.AlertView, {
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
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    t =
                      module415.DMM.isGarnet &&
                      module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.None &&
                      (module377.RSM.isPureMoppingMode() || module377.RSM.isCleanMopMoppingMode()) &&
                      !module377.RSM.isPureMopping() &&
                      !module377.RSM.isCleanMopMopping() &&
                      module377.RSM.state != module377.RobotState.BACK_TO_DOCK_WASHING_DUSTER &&
                      module377.RSM.state != module377.RobotState.WASHING_DUSTER;
                    l.prev = 1;
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module407.default.resolveError(this.state.code));

                  case 4:
                    if (t) this.resumeMoppingAlert();
                    else
                      module1247.setTimeout(function () {
                        o.props.navigation.goBack();
                      }, 1e3);
                    l.next = 12;
                    break;

                  case 8:
                    l.prev = 8;
                    l.t0 = l.catch(1);
                    globals.showToast(module491.robot_communication_exception);
                    console.log('onResolveError  error: ' + l.t0);

                  case 12:
                  case 'end':
                    return l.stop();
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
          return module377.RSM.dockErrorStatus > 0;
        },
      },
      {
        key: 'resumeMoppingAlert',
        value: function () {
          var t = this;
          if (this.alert)
            this.alert.customAlert(
              '',
              module491.robot_cmd_resume_mopping_alert,
              function () {
                var o;
                return regeneratorRuntime.default.async(
                  function (l) {
                    for (;;)
                      switch ((l.prev = l.next)) {
                        case 0:
                          if (
                            ((o = {
                              2: 1,
                              6: 2,
                            }),
                            (l.prev = 1),
                            module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.Global_Clean)
                          ) {
                            l.next = 7;
                            break;
                          }

                          l.next = 5;
                          return regeneratorRuntime.default.awrap(
                            module407.default.start([
                              {
                                clean_mop: o[module377.RSM.clean_mop_status],
                              },
                            ])
                          );

                        case 5:
                          l.next = 15;
                          break;

                        case 7:
                          if (module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.Segment_Clean) {
                            l.next = 12;
                            break;
                          }

                          l.next = 10;
                          return regeneratorRuntime.default.awrap(module407.default.resumeSegmentClean());

                        case 10:
                          l.next = 15;
                          break;

                        case 12:
                          if (module377.RSM.cleanResumeFlag != module377.CleanResumeFlag.Zone_Clean) {
                            l.next = 15;
                            break;
                          }

                          l.next = 15;
                          return regeneratorRuntime.default.awrap(module407.default.resumeZoneClean());

                        case 15:
                          l.next = 20;
                          break;

                        case 17:
                          l.prev = 17;
                          l.t0 = l.catch(1);
                          console.log('resetSecPassword  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

                        case 20:
                          module1247.setTimeout(function () {
                            t.props.navigation.goBack();
                          }, 1e3);

                        case 21:
                        case 'end':
                          return l.stop();
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
                          return regeneratorRuntime.default.awrap(module407.default.stop());

                        case 2:
                          module1247.setTimeout(function () {
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
                confirmTitle: module491.robot_cmd_resume_mopping,
              }
            );
        },
      },
    ]);
    return E;
  })(React.default.Component);

exports.default = H;
H.contextType = module506.AppConfigContext;
var U = k.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: module934.NavigationBarHeight,
    backgroundColor: 'white',
  },
  animation: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  errorTitle: {
    width: I.width - 20,
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
    width: module415.DMM.errorImages.size.width,
    height: module415.DMM.errorImages.size.height,
    resizeMode: 'contain',
  },
  handleBtn: {
    position: 'absolute',
    alignSelf: 'center',
    minWidth: j.get('window').width - 100,
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
    marginBottom: 30,
  },
});
