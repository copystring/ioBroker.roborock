require('./394');

require('./390');

var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module416 = require('./416'),
  module1199 = require('./1199'),
  module381 = require('./381'),
  module420 = require('./420');

function S(t, n) {
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
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      S(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      S(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function P() {
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
  C = (function (t) {
    module9.default(S, t);

    var n = S,
      module50 = P(),
      b = function () {
        var t,
          l = module12.default(n);

        if (module50) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(l, arguments, s);
        } else t = l.apply(this, arguments);

        return module11.default(this, t);
      };

    function S(t) {
      var n;
      module6.default(this, S);
      (n = b.call(this, t)).state = {
        isWaterDraining: n.isWaterDraining,
      };
      return n;
    }

    module7.default(S, [
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
          this.props.navigation.setParams({
            title: module510.left_water_drain_page_title,
          });
          this.robotStatusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            t.setState({
              isWaterDraining: t.isWaterDraining,
            });
          });
        },
      },
      {
        key: 'onPressDrainButton',
        value: function () {
          var t,
            n,
            o,
            s,
            u,
            c,
            f = this;
          return regeneratorRuntime.default.async(
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (!module381.RSM.isChargingOnDock()) {
                      p.next = 17;
                      break;
                    }

                    p.prev = 1;
                    if (!(null == this || null == (t = this.loadingView))) t.showWithText();
                    p.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.appAmethystDrainLeftWater());

                  case 5:
                    n = p.sent;
                    console.log('onPressDrainButton send rpc', n);
                    setTimeout(function () {
                      var t;
                      if (!(null == f || null == (t = f.loadingView))) t.hide();
                      f.props.navigation.popToTop();
                    }, 2e3);
                    p.next = 15;
                    break;

                  case 10:
                    p.prev = 10;
                    p.t0 = p.catch(1);
                    if (!(null == this || null == (o = this.loadingView))) o.hide();
                    if (!(null == (s = globals))) s.showToast(module510.robot_communication_exception);
                    console.log('onPressDrainButton error', p.t0);

                  case 15:
                    p.next = 18;
                    break;

                  case 17:
                    if (!(null == (u = globals) || null == (c = u.Alert)))
                      c.customAlert(
                        null,
                        module510.alert_pause_current_task_then_drain,
                        function () {},
                        function () {},
                        {
                          confirmTitle: module510.localization_strings_Setting_RemoteControlPage_51,
                          titleColor: this.context.theme.navTitleColor,
                          confirmColor: '#007AFF',
                          shouldShowCancel: false,
                        }
                      );

                  case 18:
                  case 'end':
                    return p.stop();
                }
            },
            null,
            this,
            [[1, 10]],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.updownWaterPage,
            o = n.titleColor,
            l = n.descColor,
            s = n.buttonBackgroundColors,
            u = module510.drain_left_water_tip1,
            c = module510.drain_left_water_tip2,
            f = module510.drain_left_water_tip3,
            p = module510.drain_left_water_tip4,
            w = !this.isWaterDraining;
          return React.default.createElement(
            module13.View,
            {
              style: {
                flex: 1,
                backgroundColor: this.context.theme.pageBackgroundColor,
              },
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  marginHorizontal: 20,
                },
              },
              React.default.createElement(
                module13.View,
                {
                  style: {
                    marginTop: 20,
                  },
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      fontSize: 16,
                      color: o,
                    },
                  },
                  module510.drain_left_water_title
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      fontSize: 12,
                      marginTop: 20,
                      color: l,
                      lineHeight: 24,
                    },
                  },
                  u + '\n' + c + '\n' + f + '\n' + p
                )
              ),
              React.default.createElement(
                module385.GradientView,
                {
                  colors: w ? s : ['#9B9B9B', '#9B9B9B'],
                  start: {
                    x: 0,
                    y: 0,
                  },
                  end: {
                    x: 1,
                    y: 0,
                  },
                  style: x(
                    x({}, k.button),
                    {},
                    {
                      opacity: w ? 1 : 0.5,
                    }
                  ),
                },
                React.default.createElement(module385.PureButton, {
                  funcId: 'left_water_drain_button',
                  enabled: w,
                  textStyle: {
                    opacity: 1,
                  },
                  style: {
                    backgroundColor: 'transparent',
                    height: 40,
                  },
                  textColor: 'white',
                  fontSize: 16,
                  title: this.isWaterDraining ? module510.left_water_is_draining : module510.start_drain_left_water,
                  onPress: this.onPressDrainButton.bind(this),
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
        key: 'isWaterDraining',
        get: function () {
          return module381.RSM.state == module381.RobotState.WASHING_DUSTER && 0 != module381.RSM.washingMode && 9 == module381.RSM.washingMode;
        },
      },
    ]);
    return S;
  })(React.Component);

exports.default = C;
C.contextType = module1199.AppConfigContext;
var k = module13.StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
});
