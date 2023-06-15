require('./393');

var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1055 = require('./1055'),
  module385 = require('./385'),
  module419 = require('./419'),
  module414 = require('./414'),
  module381 = require('./381'),
  module415 = require('./415'),
  module417 = require('./417'),
  module391 = require('./391'),
  module1121 = require('./1121'),
  module387 = require('./387'),
  module390 = require('./390');

function C(t, o) {
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

function D(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      C(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      C(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function V() {
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

module12.StatusBar.currentHeight;

var module1265 = require('./1265'),
  module505 = require('./505').strings,
  I = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  A = function (t) {
    return t ? module12.Dimensions.get('screen').height : module12.Dimensions.get('window').height;
  },
  B = function () {
    return 0.6 * I(true);
  },
  L = 120,
  j = (function (t) {
    module7.default(C, t);

    var o = C,
      module50 = V(),
      x = function () {
        var t,
          n = module11.default(o);

        if (module50) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var o;
      module4.default(this, C);
      (o = x.call(this, t)).state = {
        isMax: false,
        animationShowExtraUI: true,
      };
      o.animatedWidth = new module12.Animated.Value(L);
      return o;
    }

    module5.default(C, [
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
          if (this.statusListener) this.statusListener.remove();
        },
      },
      {
        key: 'testLocalMap',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.t0 = JSON;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module419.GetStorageKey('tttt_map_data'));

                  case 3:
                    o.t1 = o.sent;
                    t = o.t0.parse.call(o.t0, o.t1);
                    if (this.mapView) this.mapView.setState(D({}, t));

                  case 6:
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
        key: 'componentDidMount',
        value: function () {
          var t = this;
          if (this.mapView)
            this.mapView.setState(
              D(
                D({}, module414.MM.mapData),
                {},
                {
                  robotStatus: module381.RSM.state,
                }
              )
            );
          if (this.mapView) this.mapView.setMapObjectVisible(this.props.isPortrait || this.state.isMax);
          this.mapListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.MapDidUpdate, function (o) {
            if (t.mapView)
              t.mapView.setState(
                D(
                  D({}, module414.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
          });
          this.statusListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.RobotStatusDidUpdate, function (o) {
            t.forceUpdate();
          });
        },
      },
      {
        key: 'maxsize',
        value: function () {
          var t = this;

          if (!module381.RSM.voiceChat || module390.default.isSupportRemoteControlInCall()) {
            if (this.props.userDidOperate) this.props.userDidOperate();
            this.setState(
              {
                isMax: true,
                animationShowExtraUI: true,
              },
              function () {
                if (t.mapView)
                  t.mapView.setState(
                    D(
                      D({}, module414.MM.mapData),
                      {},
                      {
                        robotStatus: module381.RSM.state,
                      }
                    )
                  );
                if (t.mapView) t.mapView.setMapObjectVisible(true);
                module12.Animated.timing(t.animatedWidth, {
                  toValue: B(),
                  duration: 150,
                  bounciness: 0,
                }).start();
              }
            );
          } else this.showMsg(module505.voice_chat_title2);
        },
      },
      {
        key: 'minsize',
        value: function () {
          var t = this;
          this.showExtraUI = false;
          this.state.animationShowExtraUI = false;
          if (this.props.userDidOperate) this.props.userDidOperate();
          this.setState(
            {
              animationShowExtraUI: false,
            },
            function () {
              module12.Animated.timing(t.animatedWidth, {
                toValue: L,
                duration: 10,
              }).start(function () {
                t.setState(
                  {
                    isMax: false,
                  },
                  function () {
                    if (t.mapView)
                      t.mapView.setState(
                        D(
                          D({}, module414.MM.mapData),
                          {},
                          {
                            robotStatus: module381.RSM.state,
                          }
                        )
                      );
                    if (t.mapView) t.mapView.setMapObjectVisible(false);
                  }
                );
              });
            }
          );
        },
      },
      {
        key: 'render',
        value: function () {
          this.animatedWidth.interpolate({
            inputRange: [L, u],
            outputRange: [L, l],
          });
          var t = this,
            o = this.context.theme,
            n = this.props.isPortrait,
            s = this.state.isMax,
            u = B(),
            l = A(),
            c = this.animatedWidth.interpolate({
              inputRange: [L, u],
              outputRange: [0.8, 1],
            }),
            p = {
              width: this.animatedWidth,
              height: s ? u : L,
            },
            f = n ? module12.View : module12.Animated.View,
            M = n || (s && this.state.animationShowExtraUI),
            w = React.default.createElement(
              f,
              {
                style: [z.container, n ? null : z.landscapeContainer, n ? null : p],
              },
              M &&
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      z.top,
                      n
                        ? {
                            bottom: 50,
                          }
                        : {
                            top: 18,
                          },
                    ],
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        z.title,
                        {
                          maxWidth: n ? '90%' : '80%',
                        },
                      ],
                    },
                    module381.RSM.state == module381.RobotState.GOTO_TARGET ? module505.rubys_main_subtitle_goto_target : module505.rubys_main_goto_click_text
                  ),
                  !n &&
                    React.default.createElement(module385.PureImageButton, {
                      funcId: 'map_button',
                      hitSlop: {
                        top: 30,
                        bottom: 30,
                        left: 30,
                        right: 30,
                      },
                      image: o.monitor.closeMap,
                      imageWidth: 35,
                      imageHeight: 35,
                      style: z.closeButton,
                      onPress: function () {
                        return t.minsize();
                      },
                    })
                ),
              (function () {
                var n = React.default.createElement(module1055.MapView, {
                    style: {
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'stretch',
                      backgroundColor: M ? o.monitor.backgroundColor : 'rgba(0,0,0,0.3)',
                    },
                    parent: t,
                    ref: function (o) {
                      return (t.mapView = o);
                    },
                    top: M ? 70 : 5,
                    left: M ? 20 : 5,
                    right: M ? 20 : 5,
                    bottom: M ? module1265.AppBarMarginBottom + 16 : 5,
                    mapMode: module1265.MAP_MODE_GOTO_EDIT,
                  }),
                  s = React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flex: 1,
                      },
                    },
                    n,
                    React.default.createElement(
                      module12.TouchableWithoutFeedback,
                      {
                        onPress: function () {
                          module387.LogEventCommon('tap_mini_map');
                          t.maxsize();
                        },
                      },
                      React.default.createElement(module12.View, {
                        style: z.smallMapMask,
                      })
                    )
                  );
                return M ? n : s;
              })(),
              M &&
                React.default.createElement(module385.TopImageButton, {
                  style: [
                    z.gotoButton,
                    {
                      right: 14 + (module391.default.isIphoneX() && !n ? 24 : 0),
                      bottom: module391.default.iOSAndroidReturn(12, 16) + (module391.default.isIphoneX() ? 24 : 0),
                    },
                  ],
                  imageWidth: 40,
                  imageHeight: 40,
                  fontSize: 12,
                  textTop: 7,
                  title: module381.RSM.state == module381.RobotState.GOTO_TARGET ? module505.localization_strings_Common_Constants_11 : module505.rubys_main_button_text_goto_cmd,
                  image: module381.RSM.state == module381.RobotState.GOTO_TARGET ? this.context.theme.mapGoTo.pauseImg : this.context.theme.mapGoTo.goToImg,
                  selectedColor: o.mapEdit.selectedTextColor,
                  textColor: '#9B9B9B',
                  funcId: 'map_go_to',
                  logParams: {
                    isPortrait: n,
                  },
                  ref: function (o) {
                    return (t.gotoButton = o);
                  },
                  onPress: this.onPressButton.bind(this),
                })
            ),
            O = s ? 0 : module1265.AppBarMarginTop + 24,
            R = {
              width: s ? I(true) : L,
              height: s ? A(true) : L,
              opacity: s ? c : 1,
              borderRadius: s ? 0 : 8,
              marginTop: s ? 0 : 20,
              marginLeft: s ? 0 : O,
            },
            x = React.default.createElement(
              module12.Animated.View,
              {
                style: [z.landscapeMask, R],
              },
              w
            );
          return n ? w : x;
        },
      },
      {
        key: 'showMsg',
        value: function (t) {
          if (this.props.toastMsg) this.props.toastMsg(t);
        },
      },
      {
        key: 'onPressButton',
        value: function () {
          var t,
            o,
            s,
            u,
            l = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (!module381.RSM.voiceChat || module390.default.isSupportRemoteControlInCall()) {
                      c.next = 3;
                      break;
                    }

                    this.showMsg(module505.voice_chat_title2);
                    return c.abrupt('return');

                  case 3:
                    if (
                      (this.props.userDidOperate && this.props.userDidOperate(),
                      (t = this.mapView ? this.mapView.getGotoTarget() : null),
                      (o = function (t, o) {
                        var s;
                        return regeneratorRuntime.default.async(
                          function (u) {
                            for (;;)
                              switch ((u.prev = u.next)) {
                                case 0:
                                  u.prev = 0;
                                  u.next = 3;
                                  return regeneratorRuntime.default.awrap(module415.default.gotoTarget(t));

                                case 3:
                                  s = u.sent;
                                  module381.RSM.state;
                                  module381.RobotState.GOTO_TARGET;
                                  l.forceUpdate();
                                  module417.Log.log(module417.LogTypes.Monitor, 'gotoTarget - ' + JSON.stringify(s) + ' - fromOtherStatus:' + o, module417.InfoColors.Success);
                                  l.minsize();
                                  u.next = 13;
                                  break;

                                case 10:
                                  u.prev = 10;
                                  u.t0 = u.catch(0);
                                  module417.Log.log(
                                    module417.LogTypes.Monitor,
                                    'gotoTarget - ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0) + ' - fromOtherStatus:' + o,
                                    module417.InfoColors.Fail
                                  );

                                case 13:
                                case 'end':
                                  return u.stop();
                              }
                          },
                          null,
                          null,
                          [[0, 10]],
                          Promise
                        );
                      }),
                      (s = function (t) {
                        var o;
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  t.prev = 0;
                                  t.next = 3;
                                  return regeneratorRuntime.default.awrap(module415.default.pause());

                                case 3:
                                  o = t.sent;
                                  module381.RSM.state;
                                  module381.RobotState.PAUSE;
                                  l.forceUpdate();
                                  module417.Log.log(module417.LogTypes.Monitor, 'gotoTarget stop - ' + JSON.stringify(o), module417.InfoColors.Success);
                                  if (l.gotoButton) l.gotoButton.stop();
                                  t.next = 13;
                                  break;

                                case 10:
                                  t.prev = 10;
                                  t.t0 = t.catch(0);
                                  module417.Log.log(
                                    module417.LogTypes.Monitor,
                                    'gotoTarget stop - ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0),
                                    module417.InfoColors.Fail
                                  );

                                case 13:
                                case 'end':
                                  return t.stop();
                              }
                          },
                          null,
                          null,
                          [[0, 10]],
                          Promise
                        );
                      }),
                      t)
                    ) {
                      c.next = 10;
                      break;
                    }

                    this.showMsg(module505.rubys_main_goto_click_text);
                    return c.abrupt('return');

                  case 10:
                    u = {
                      BACK_TO_DOCK: module505.localization_strings_abort_current_task_and_start_goto,
                      ZONED_CLEAN: module505.localization_strings_abort_current_task_and_start_goto,
                      SPOT_CLEAN: module505.localization_strings_abort_current_task_and_start_goto,
                      REMOTE: module505.localization_strings_abort_current_task_and_start_goto,
                    };
                    if (!u[module381.RSM.state]) module505.localization_strings_abort_current_task_and_start_goto;
                    if (
                      module381.RSM.state == module381.RobotState.CLEAN ||
                      module381.RSM.state == module381.RobotState.BACK_TO_DOCK ||
                      module381.RSM.state == module381.RobotState.ZONED_CLEAN ||
                      module381.RSM.state == module381.RobotState.SPOT_CLEAN ||
                      module381.RSM.state == module381.RobotState.REMOTE ||
                      module381.RSM.state == module381.RobotState.SEGMENT_CLEAN
                    ) {
                      if (this.props.askShouldRunCmd)
                        this.props.askShouldRunCmd(function (n) {
                          if (n) o(t, true);
                        }, 'goto');
                    } else if (module381.RSM.state == module381.RobotState.GOTO_TARGET) s();
                    else o(t);

                  case 13:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = j;
j.contextType = module1121.AppConfigContext;
var z = module12.StyleSheet.create({
  container: {
    flex: 1,
  },
  landscapeMask: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  landscapeContainer: {},
  smallMapMask: {
    position: 'absolute',
    width: L,
    height: L,
    left: 0,
    top: 0,
  },
  top: {
    position: 'absolute',
    width: '100%',
    height: 40,
    zIndex: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    width: 35,
    height: 35,
  },
  gotoButton: {
    zIndex: 7,
    maxWidth: 100,
    height: 90,
    position: 'absolute',
    bottom: 16 + module1265.AppBarMarginBottom,
    right: 20,
  },
});
