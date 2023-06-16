require('./394');

var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module1193 = require('./1193'),
  module390 = require('./390'),
  module381 = require('./381'),
  module420 = require('./420');

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

function R(t, n) {
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

function x(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      R(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

var module510 = require('./510').strings;

function T(t) {
  var n = t.funcId,
    o = t.title,
    l = t.desc,
    u = t.buttonTitle,
    s = t.enabled,
    c = t.onPress,
    f = t.titleColor,
    p = t.descColor,
    _ = t.gradientColors,
    S = t.cardBackground;
  return React.default.createElement(
    module13.View,
    {
      style: x(
        x({}, B.controlView),
        {},
        {
          backgroundColor: S,
        }
      ),
    },
    React.default.createElement(
      module13.Text,
      {
        style: x(
          x({}, B.controlViewTitle),
          {},
          {
            color: f,
          }
        ),
      },
      o
    ),
    React.default.createElement(
      module13.Text,
      {
        style: x(
          x({}, B.controlViewDesc),
          {},
          {
            color: p,
          }
        ),
      },
      l
    ),
    React.default.createElement(
      module385.GradientView,
      {
        colors: s ? _ : ['#9B9B9B', '#9B9B9B'],
        start: {
          x: 0,
          y: 0,
        },
        end: {
          x: 1,
          y: 0,
        },
        style: x(
          x({}, B.button),
          {},
          {
            opacity: s ? 1 : 0.5,
          }
        ),
      },
      React.default.createElement(module385.PureButton, {
        funcId: n,
        enabled: s,
        textStyle: {
          opacity: 1,
        },
        style: {
          backgroundColor: 'transparent',
          height: 40,
        },
        textColor: 'white',
        fontSize: 16,
        title: u,
        onPress: c,
      })
    )
  );
}

var P = (function (t) {
  module9.default(R, t);

  var n = R,
    module50 = C(),
    S = function () {
      var t,
        o = module12.default(n);

      if (module50) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function R(t) {
    var n;
    module6.default(this, R);
    (n = S.call(this, t)).state = {
      isSelfCleaning: n.isSelfCleaning,
      isWaterDraining: n.isWaterDraining,
    };
    return n;
  }

  module7.default(R, [
    {
      key: 'componentWillUnmount',
      value: function () {
        var t, n;
        if (!(null == this || null == (t = this.loadingView))) t.hide();
        if (!(null == this || null == (n = this.robotStatusListener))) n.remove();
      },
    },
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
          t.setState({
            isSelfCleaning: t.isSelfCleaning,
            isWaterDraining: t.isWaterDraining,
          });
        });
      },
    },
    {
      key: 'waitUntilUnlockedThenDo',
      value: function (t) {
        var n = setTimeout(function () {
            throw new Error('waitUntilUnlockedThenDo has timeout 8s');
          }, 8e3),
          o = setInterval(function () {
            if (
              module381.RSM.state != module381.RobotState.LOCKED &&
              module381.RSM.cleanResumeFlag == module381.CleanResumeFlag.None &&
              module381.RSM.backDockResumeFlag == module381.BackDockResumeFlag.None &&
              !module381.RSM.isLocating &&
              module381.RSM.state != module381.RobotState.GOTO_TARGET
            ) {
              clearInterval(o);
              clearTimeout(n);
              if (t) t();
            }
          }, 1e3);
      },
    },
    {
      key: 'onPressSelfCleanButton',
      value: function () {
        var t,
          n,
          l,
          u = this;
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  t = function (t) {
                    var n, l, s, c;
                    return regeneratorRuntime.default.async(
                      function (f) {
                        for (;;)
                          switch ((f.prev = f.next)) {
                            case 0:
                              if (
                                ((f.prev = 0), null == u || null == (n = u.loadingView) || n.showWithText(), (f.t0 = module381.RSM.state == module381.RobotState.SLEEPING), !f.t0)
                              ) {
                                f.next = 6;
                                break;
                              }

                              f.next = 6;
                              return regeneratorRuntime.default.awrap(module416.default.appWakeupRobot());

                            case 6:
                              if (((f.t1 = t), !f.t1)) {
                                f.next = 10;
                                break;
                              }

                              f.next = 10;
                              return regeneratorRuntime.default.awrap(module416.default.stop());

                            case 10:
                              l = function () {
                                var t;
                                return regeneratorRuntime.default.async(
                                  function (n) {
                                    for (;;)
                                      switch ((n.prev = n.next)) {
                                        case 0:
                                          n.next = 2;
                                          return regeneratorRuntime.default.awrap(module416.default.appAmethystSelfCheck());

                                        case 2:
                                          t = n.sent;
                                          console.log('onPressSelfCleanButton send rpc', t);
                                          setTimeout(function () {
                                            var t;
                                            if (!(null == u || null == (t = u.loadingView))) t.hide();
                                            u.props.navigation.popToTop();
                                          }, 2e3);

                                        case 5:
                                        case 'end':
                                          return n.stop();
                                      }
                                  },
                                  null,
                                  null,
                                  null,
                                  Promise
                                );
                              };

                              if (t) u.waitUntilUnlockedThenDo(l);
                              else l();
                              f.next = 19;
                              break;

                            case 14:
                              f.prev = 14;
                              f.t2 = f.catch(0);
                              if (!(null == u || null == (s = u.loadingView))) s.hide();
                              if (!(null == (c = globals))) c.showToast(module510.robot_communication_exception);
                              console.log('onPressSelfCleanButton error', f.t2);

                            case 19:
                            case 'end':
                              return f.stop();
                          }
                      },
                      null,
                      null,
                      [[0, 14]],
                      Promise
                    );
                  };

                  if (module381.RSM.isRunning) {
                    if (!(null == (n = globals) || null == (l = n.Alert)))
                      l.customAlert(
                        null,
                        module510.alert_pause_current_task_then_selfclean,
                        function () {
                          return t(true);
                        },
                        function () {},
                        {
                          titleColor: this.context.theme.navTitleColor,
                          confirmColor: '#007AFF',
                        }
                      );
                  } else t();

                case 2:
                case 'end':
                  return s.stop();
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
      key: 'onPressDrainButton',
      value: function () {
        var t,
          n,
          l,
          u = this;
        return regeneratorRuntime.default.async(
          function (s) {
            for (;;)
              switch ((s.prev = s.next)) {
                case 0:
                  t = function (t) {
                    var n, l, s, c;
                    return regeneratorRuntime.default.async(
                      function (f) {
                        for (;;)
                          switch ((f.prev = f.next)) {
                            case 0:
                              if (
                                ((f.prev = 0), null == u || null == (n = u.loadingView) || n.showWithText(), (f.t0 = module381.RSM.state == module381.RobotState.SLEEPING), !f.t0)
                              ) {
                                f.next = 6;
                                break;
                              }

                              f.next = 6;
                              return regeneratorRuntime.default.awrap(module416.default.appWakeupRobot());

                            case 6:
                              if (((f.t1 = t), !f.t1)) {
                                f.next = 10;
                                break;
                              }

                              f.next = 10;
                              return regeneratorRuntime.default.awrap(module416.default.stop());

                            case 10:
                              l = function () {
                                var t;
                                return regeneratorRuntime.default.async(
                                  function (n) {
                                    for (;;)
                                      switch ((n.prev = n.next)) {
                                        case 0:
                                          n.next = 2;
                                          return regeneratorRuntime.default.awrap(module416.default.appAmethystDrainWater());

                                        case 2:
                                          t = n.sent;
                                          console.log('onPressDrainButton send rpc', t);
                                          setTimeout(function () {
                                            var t;
                                            if (!(null == u || null == (t = u.loadingView))) t.hide();
                                            u.props.navigation.popToTop();
                                          }, 2e3);

                                        case 5:
                                        case 'end':
                                          return n.stop();
                                      }
                                  },
                                  null,
                                  null,
                                  null,
                                  Promise
                                );
                              };

                              if (t) u.waitUntilUnlockedThenDo(l);
                              else l();
                              f.next = 19;
                              break;

                            case 14:
                              f.prev = 14;
                              f.t2 = f.catch(0);
                              if (!(null == u || null == (s = u.loadingView))) s.hide();
                              if (!(null == (c = globals))) c.showToast(module510.robot_communication_exception);
                              console.log('onPressDrainButton error', f.t2);

                            case 19:
                            case 'end':
                              return f.stop();
                          }
                      },
                      null,
                      null,
                      [[0, 14]],
                      Promise
                    );
                  };

                  if (module381.RSM.isRunning) {
                    if (!(null == (n = globals) || null == (l = n.Alert)))
                      l.customAlert(
                        null,
                        module510.alert_pause_current_task_then_drain,
                        function () {
                          return t(true);
                        },
                        function () {},
                        {
                          titleColor: this.context.theme.navTitleColor,
                          confirmColor: '#007AFF',
                        }
                      );
                  } else t();

                case 2:
                case 'end':
                  return s.stop();
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
      key: 'render',
      value: function () {
        var t = this,
          n = this.context.theme.updownWaterPage,
          o = this.state,
          l = o.isSelfCleaning,
          u = o.isWaterDraining;
        return React.default.createElement(
          module13.View,
          {
            style: {
              flex: 1,
              backgroundColor: this.context.theme.pageBackgroundColor,
            },
          },
          React.default.createElement(module13.Image, {
            source: n.background,
            style: x(
              x({}, B.background),
              {},
              {
                backgroundColor: this.context.theme.pageBackgroundColor,
              }
            ),
          }),
          React.default.createElement(
            module13.View,
            {
              style: x(
                x({}, B.cardWrap),
                {},
                {
                  top: 230,
                  height: module13.Dimensions.get('window').height - 230,
                  backgroundColor: 'transparent',
                }
              ),
            },
            React.default.createElement(
              module13.ScrollView,
              null,
              React.default.createElement(T, {
                title: module510.water_updown_self_clean_title,
                desc: module510.water_updown_self_clean_desc,
                buttonTitle: l ? module510.washing_mode_updown_water_selfcleaning : module510.water_updown_self_clean_button_title,
                gradientColors: n.buttonBackgroundColors,
                titleColor: n.titleColor,
                descColor: n.descColor,
                cardBackground: n.cardBackground,
                funcId: 'water_updown_self_clean_button',
                enabled: !l,
                onPress: this.onPressSelfCleanButton.bind(this),
              }),
              module381.RSM.isO4Dock() &&
                module390.default.isWaterUpDownDrainSupported() &&
                React.default.createElement(T, {
                  title: module510.water_updown_drain_title,
                  desc: module510.water_updown_drain_desc,
                  buttonTitle: u ? module510.washing_mode_updown_water_drain : module510.water_updown_drain_button_title,
                  gradientColors: n.buttonBackgroundColors,
                  titleColor: n.titleColor,
                  descColor: n.descColor,
                  cardBackground: n.cardBackground,
                  funcId: 'water_updown_drain_button',
                  enabled: !u,
                  onPress: this.onPressDrainButton.bind(this),
                }),
              React.default.createElement(module13.View, {
                style: {
                  height: 100,
                },
              })
            )
          ),
          React.default.createElement(module385.ALoadingView, {
            ref: function (n) {
              t.loadingView = n;
            },
          })
        );
      },
    },
    {
      key: 'isSelfCleaning',
      get: function () {
        return module381.RSM.state == module381.RobotState.WASHING_DUSTER && 0 != module381.RSM.washingMode && 6 == module381.RSM.washingMode;
      },
    },
    {
      key: 'isWaterDraining',
      get: function () {
        return module381.RSM.state == module381.RobotState.WASHING_DUSTER && 0 != module381.RSM.washingMode && 7 == module381.RSM.washingMode;
      },
    },
  ]);
  return R;
})(React.Component);

exports.default = P;
P.contextType = module1193.AppConfigContext;
var B = module13.StyleSheet.create({
  background: {
    position: 'absolute',
    top: -100,
    width: module13.Dimensions.get('window').width,
    height: (560 * module13.Dimensions.get('window').width) / 375,
    zIndex: 0,
  },
  cardWrap: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  controlView: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'transparent',
    borderRadius: 14,
    marginTop: 30,
  },
  controlViewTitle: {
    fontSize: 16,
    marginBottom: 15,
  },
  controlViewDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#9B9B9B',
  },
  button: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
