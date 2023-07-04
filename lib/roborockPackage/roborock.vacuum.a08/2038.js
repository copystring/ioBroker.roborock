require('./389');

var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = T(o);
    if (n && n.has(t)) return n.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
        else s[l] = t[l];
      }

    s.default = t;
    if (n) n.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module1233 = require('./1233'),
  module381 = require('./381'),
  module411 = require('./411'),
  module1231 = require('./1231'),
  module377 = require('./377'),
  module407 = require('./407'),
  module409 = require('./409'),
  module387 = require('./387'),
  module506 = require('./506'),
  module383 = require('./383');

function T(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (T = function (t) {
    return t ? n : o;
  })(t);
}

function E(t, o) {
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

function k(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      E(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      E(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function C() {
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

module12.StatusBar.currentHeight;

var module936 = require('./936'),
  module491 = require('./491').strings,
  D = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  B = function (t) {
    return t ? module12.Dimensions.get('screen').height : module12.Dimensions.get('window').height;
  },
  j = function () {
    return 0.6 * D(true);
  },
  A = 120,
  I = (function (t) {
    module7.default(E, t);

    var module49 = E,
      module506 = C(),
      T = function () {
        var t,
          o = module11.default(module49);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var o;
      module4.default(this, E);
      (o = T.call(this, t)).state = {
        isMax: false,
        animationShowExtraUI: true,
      };
      o.animatedWidth = new module12.Animated.Value(A);
      return o;
    }

    module5.default(E, [
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.mapListener) this.mapListener.remove();
        },
      },
      {
        key: 'testLocalMap',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.t0 = JSON;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module411.GetStorageKey('tttt_map_data'));

                  case 3:
                    n.t1 = n.sent;
                    t = n.t0.parse.call(n.t0, n.t1);
                    if (this.mapView) this.mapView.setState(k({}, t));

                  case 6:
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
        key: 'componentDidMount',
        value: function () {
          var t = this;
          if (this.mapView)
            this.mapView.setState(
              k(
                k({}, module1231.MM.mapData),
                {},
                {
                  robotStatus: module377.RSM.state,
                }
              )
            );
          if (this.mapView) this.mapView.setMapObjectVisible(this.props.isPortrait || this.state.isMax);
          this.mapListener = module12.DeviceEventEmitter.addListener(module411.NotificationKeys.MapDidUpdate, function (o) {
            if (t.mapView)
              t.mapView.setState(
                k(
                  k({}, module1231.MM.mapData),
                  {},
                  {
                    robotStatus: module377.RSM.state,
                  }
                )
              );
          });
        },
      },
      {
        key: 'maxsize',
        value: function () {
          var t = this;
          if (this.props.userDidOperate) this.props.userDidOperate();
          this.setState(
            {
              isMax: true,
              animationShowExtraUI: true,
            },
            function () {
              if (t.mapView)
                t.mapView.setState(
                  k(
                    k({}, module1231.MM.mapData),
                    {},
                    {
                      robotStatus: module377.RSM.state,
                    }
                  )
                );
              if (t.mapView) t.mapView.setMapObjectVisible(true);
              module12.Animated.timing(t.animatedWidth, {
                toValue: j(),
                duration: 150,
                bounciness: 0,
              }).start();
            }
          );
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
                toValue: A,
                duration: 10,
              }).start(function () {
                t.setState(
                  {
                    isMax: false,
                  },
                  function () {
                    if (t.mapView)
                      t.mapView.setState(
                        k(
                          k({}, module1231.MM.mapData),
                          {},
                          {
                            robotStatus: module377.RSM.state,
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
            inputRange: [A, u],
            outputRange: [A, l],
          });
          var t = this,
            o = this.context.theme,
            n = this.props.isPortrait,
            s = this.state.isMax,
            u = j(),
            l = B(),
            c = this.animatedWidth.interpolate({
              inputRange: [A, u],
              outputRange: [0.8, 1],
            }),
            p = {
              width: this.animatedWidth,
              height: s ? u : A,
            },
            S = n ? module12.View : module12.Animated.View,
            y = n || (s && this.state.animationShowExtraUI),
            w = React.default.createElement(
              S,
              {
                style: [L.container, n ? null : L.landscapeContainer, n ? null : p],
              },
              y &&
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      L.top,
                      {
                        top: n ? 30 : 18,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        L.title,
                        {
                          maxWidth: n ? '90%' : '80%',
                        },
                      ],
                    },
                    module377.RSM.state == module377.RobotState.GOTO_TARGET ? module491.rubys_main_subtitle_goto_target : module491.rubys_main_goto_click_text
                  ),
                  !n &&
                    React.default.createElement(module381.PureImageButton, {
                      hitSlop: {
                        top: 30,
                        bottom: 30,
                        left: 30,
                        right: 30,
                      },
                      image: o.monitor.closeMap,
                      imageWidth: 35,
                      imageHeight: 35,
                      style: L.closeButton,
                      onPress: function () {
                        return t.minsize();
                      },
                    })
                ),
              (function () {
                var n = React.default.createElement(module1233.MapView, {
                    style: {
                      flex: 1,
                      justifyContent: 'center',
                      alignSelf: 'stretch',
                      backgroundColor: y ? o.monitor.backgroundColor : 'rgba(0,0,0,0.3)',
                    },
                    parent: t,
                    ref: function (o) {
                      return (t.mapView = o);
                    },
                    top: y ? 70 : 5,
                    left: y ? 20 : 5,
                    right: y ? 20 : 5,
                    bottom: y ? module936.AppBarMarginBottom + 16 : 5,
                    mapMode: module936.MAP_MODE_GOTO_EDIT,
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
                          module383.LogEventCommon('tap_mini_map');
                          t.maxsize();
                        },
                      },
                      React.default.createElement(module12.View, {
                        style: L.smallMapMask,
                      })
                    )
                  );
                return y ? n : s;
              })(),
              y &&
                React.default.createElement(module381.TopImageButton, {
                  style: [
                    L.gotoButton,
                    {
                      right: 14 + (module387.default.isIphoneX() && !n ? 24 : 0),
                      bottom: module387.default.iOSAndroidReturn(12, 16) + (module387.default.isIphoneX() ? 24 : 0),
                    },
                  ],
                  imageWidth: 56,
                  imageHeight: 56,
                  fontSize: 12,
                  textTop: 7,
                  title: module377.RSM.state == module377.RobotState.GOTO_TARGET ? module491.localization_strings_Common_Constants_11 : module491.rubys_main_button_text_goto_cmd,
                  image: module377.RSM.state == module377.RobotState.GOTO_TARGET ? this.context.theme.mapGoTo.pauseImg : this.context.theme.mapGoTo.goToImg,
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
            O = s ? 0 : module936.AppBarMarginTop + 24,
            R = {
              width: s ? D(false) : A,
              height: s ? B(true) : A,
              opacity: s ? c : 1,
              borderRadius: s ? 0 : 8,
              marginTop: s ? 0 : 20,
              marginLeft: s ? 0 : O,
            },
            T = React.default.createElement(
              module12.Animated.View,
              {
                style: [L.landscapeMask, R],
              },
              w
            );
          return n ? w : T;
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
            n,
            s,
            u,
            l = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (!module377.RSM.voiceChat) {
                      c.next = 3;
                      break;
                    }

                    this.showMsg(module491.voice_chat_title2);
                    return c.abrupt('return');

                  case 3:
                    if (
                      (this.props.userDidOperate && this.props.userDidOperate(),
                      (t = this.mapView ? this.mapView.getGotoTarget() : null),
                      (n = function (t, n) {
                        var s;
                        return regeneratorRuntime.default.async(
                          function (u) {
                            for (;;)
                              switch ((u.prev = u.next)) {
                                case 0:
                                  u.prev = 0;
                                  u.next = 3;
                                  return regeneratorRuntime.default.awrap(module407.default.gotoTarget(t));

                                case 3:
                                  s = u.sent;
                                  module377.RSM.state;
                                  module377.RobotState.GOTO_TARGET;
                                  l.forceUpdate();
                                  module409.Log.log(module409.LogTypes.Monitor, 'gotoTarget - ' + JSON.stringify(s) + ' - fromOtherStatus:' + n, module409.InfoColors.Success);
                                  u.next = 12;
                                  break;

                                case 9:
                                  u.prev = 9;
                                  u.t0 = u.catch(0);
                                  module409.Log.log(
                                    module409.LogTypes.Monitor,
                                    'gotoTarget - ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0) + ' - fromOtherStatus:' + n,
                                    module409.InfoColors.Fail
                                  );

                                case 12:
                                case 'end':
                                  return u.stop();
                              }
                          },
                          null,
                          null,
                          [[0, 9]],
                          Promise
                        );
                      }),
                      (s = function (t) {
                        var n;
                        return regeneratorRuntime.default.async(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  t.prev = 0;
                                  t.next = 3;
                                  return regeneratorRuntime.default.awrap(module407.default.pause());

                                case 3:
                                  n = t.sent;
                                  module377.RSM.state;
                                  module377.RobotState.PAUSE;
                                  l.forceUpdate();
                                  module409.Log.log(module409.LogTypes.Monitor, 'gotoTarget stop - ' + JSON.stringify(n), module409.InfoColors.Success);
                                  if (l.gotoButton) l.gotoButton.stop();
                                  t.next = 13;
                                  break;

                                case 10:
                                  t.prev = 10;
                                  t.t0 = t.catch(0);
                                  module409.Log.log(
                                    module409.LogTypes.Monitor,
                                    'gotoTarget stop - ' + ('object' == typeof t.t0 ? JSON.stringify(t.t0) : t.t0),
                                    module409.InfoColors.Fail
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

                    this.showMsg(module491.rubys_main_goto_click_text);
                    return c.abrupt('return');

                  case 10:
                    u = {
                      BACK_TO_DOCK: module491.localization_strings_abort_current_task_and_start_goto,
                      ZONED_CLEAN: module491.localization_strings_abort_current_task_and_start_goto,
                      SPOT_CLEAN: module491.localization_strings_abort_current_task_and_start_goto,
                      REMOTE: module491.localization_strings_abort_current_task_and_start_goto,
                    };
                    if (!u[module377.RSM.state]) module491.localization_strings_abort_current_task_and_start_goto;
                    if (
                      module377.RSM.state == module377.RobotState.CLEAN ||
                      module377.RSM.state == module377.RobotState.BACK_TO_DOCK ||
                      module377.RSM.state == module377.RobotState.ZONED_CLEAN ||
                      module377.RSM.state == module377.RobotState.SPOT_CLEAN ||
                      module377.RSM.state == module377.RobotState.REMOTE ||
                      module377.RSM.state == module377.RobotState.SEGMENT_CLEAN
                    ) {
                      if (this.props.askShouldRunCmd)
                        this.props.askShouldRunCmd(function (o) {
                          if (o) n(t, true);
                        }, 'goto');
                    } else if (module377.RSM.state == module377.RobotState.GOTO_TARGET) s();
                    else n(t);

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
    return E;
  })(React.Component);

exports.default = I;
I.contextType = module506.AppConfigContext;
var L = module12.StyleSheet.create({
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
    width: A,
    height: A,
    left: 0,
    top: 0,
  },
  top: {
    position: 'absolute',
    width: '100%',
    minHeight: 30,
    top: 30,
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
    maxWidth: 100,
    height: 90,
    position: 'absolute',
    bottom: 16 + module936.AppBarMarginBottom,
    right: 20,
  },
});
