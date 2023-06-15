var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1125 = require('./1125'),
  module416 = require('./416'),
  module415 = require('./415'),
  module420 = require('./420'),
  module381 = require('./381'),
  module1200 = require('./1200'),
  module2148 = require('./2148');

require('./2149');

function B(t, n) {
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

function E(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      B(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      B(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
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
  module1344 = require('./1344'),
  C = (function (t) {
    module9.default(B, t);

    var n = B,
      module50 = P(),
      y = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var c = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, c);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function B(t) {
      var n;
      module6.default(this, B);
      (n = y.call(this, t)).state = {};
      n.startGetMap = n.props.navigation.getParam('startGetMap', true);
      return n;
    }

    module7.default(B, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          globals.isEgg = true;

          if (this.startGetMap) {
            module415.MM.shouldForceStart = true;
            module415.MM.start();
          }

          this.backListener = module13.BackHandler.addEventListener(module13.BackHandler.DEVICE_BACK_EVENT, function () {
            t.onPressBackButton();
            return true;
          });
          module13.AppState.addEventListener('change', this.handleAppStateChange.bind(this));
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t,
            n,
            s = this;
          module415.MM.getMap(true);
          this.mapListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDidUpdate, function (t) {
            var n;
            if (!(null == (n = s.mapView)))
              n.setState(
                E(
                  E({}, module415.MM.mapData),
                  {},
                  {
                    robotStatus: module381.RSM.state,
                  }
                )
              );
          });
          this.statusListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (t) {
            s.updateUI();
            s.props.navigation.setParams({
              subTitle: module381.RSM.stateName,
            });
          });
          this.props.navigation.setParams({
            title: module510.egg_page_title,
            navBarBackgroundColor: this.context.theme.mapEdit.backgroundColor,
            onPressLeft: this.onPressBackButton.bind(this),
            hiddenBottomLine: true,
          });
          this.updateUI();
          var c = module381.RSM.cleanResumeFlag != module381.CleanResumeFlag.None || module381.RSM.backDockResumeFlag != module381.BackDockResumeFlag.None,
            u = module510.defender_mode_introduction,
            l = module510.start_egg_attack_with_other_task_tip,
            p = '' + u + (c ? l : '');
          if (module381.RSM.state != module381.RobotState.EGG_ATTACK)
            null == (t = globals) ||
              null == (n = t.Alert) ||
              n.customAlert(
                '',
                p,
                function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            s.onPressAttackButton();

                          case 1:
                          case 'end':
                            return t.stop();
                        }
                    },
                    null,
                    null,
                    null,
                    Promise
                  );
                },
                function () {
                  return regeneratorRuntime.default.async(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            s.onPressBackButton();

                          case 1:
                          case 'end':
                            return t.stop();
                        }
                    },
                    null,
                    null,
                    null,
                    Promise
                  );
                },
                {
                  confirmTitle: module510.egg_attack_start_title,
                  contentAlignment: globals.isRTL ? 'right' : 'left',
                }
              );
        },
      },
      {
        key: 'handleAppStateChange',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (((n = 'inactive' == t || 'background' == t), (s.t0 = n && module381.RSM.state == module381.RobotState.EGG_ATTACK), !s.t0)) {
                      s.next = 5;
                      break;
                    }

                    s.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.stop());

                  case 5:
                    clearInterval(this.eggTimer);

                  case 6:
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
        key: 'componentWillUnmount',
        value: function () {
          globals.isEgg = false;
          module415.MM.getMap(true);
          this.mapListener.remove();
          this.statusListener.remove();

          if (this.startGetMap) {
            module415.MM.shouldForceStart = false;
            module415.MM.stop();
          }

          if (this.backListener) this.backListener.remove();
          if (this.eggTimer) clearInterval(this.eggTimer);
          module13.AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
        },
      },
      {
        key: 'updateUI',
        value: function () {
          var t = 'start',
            n = 'start';
          if (module381.RSM.state == module381.RobotState.CHARGING || module381.RSM.state == module381.RobotState.FULL_CHARGE) t = 'start';
          else if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK) t = 'stop';
          else if (module381.RSM.state == module381.RobotState.EGG_ATTACK) n = 'stop';
          console.log('egg mode', t, n, this.state.dockButton, this.state.attackButtonMode);

          if (!(this.state.dockButtonMode == t && this.state.attackButtonMode == n)) {
            this.setState({
              dockButtonMode: t,
              attackButtonMode: n,
            });
            this.props.navigation.setParams({
              subTitle: module381.RSM.stateName,
            });
          }

          if (module381.RSM.state == module381.RobotState.EGG_ATTACK) module415.MM.enterEasterEggModel();
          else module415.MM.quitEasterEggModel();
        },
      },
      {
        key: 'keepEggMode',
        value: function () {
          this.eggTimer = setInterval(function () {
            var t;
            return regeneratorRuntime.default.async(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      n.next = 2;
                      return regeneratorRuntime.default.awrap(module416.default.eggKeep());

                    case 2:
                      t = n.sent;
                      console.log('keep egg', t);

                    case 4:
                    case 'end':
                      return n.stop();
                  }
              },
              null,
              null,
              null,
              Promise
            );
          }, 3e4);
        },
      },
      {
        key: 'onPressAttackButton',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (((n.prev = 0), console.log(this.menu), null == this || this.menu.attackButton().startAnimation(), module381.RSM.state != module381.RobotState.EGG_ATTACK)) {
                      n.next = 11;
                      break;
                    }

                    n.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.stop());

                  case 6:
                    t = n.sent;
                    module381.RSM.preMockState = module381.RobotState.WAITING;
                    if (this.eggTimer) clearInterval(this.eggTimer);
                    n.next = 16;
                    break;

                  case 11:
                    n.next = 13;
                    return regeneratorRuntime.default.awrap(module416.default.startEggAttack());

                  case 13:
                    t = n.sent;
                    module381.RSM.preMockState = module381.RobotState.EGG_ATTACK;
                    this.keepEggMode();

                  case 16:
                    module381.RSM.preMockMotionStatus();
                    this.updateUI();
                    console.log('onPressAttackButton', t);
                    n.next = 25;
                    break;

                  case 22:
                    n.prev = 22;
                    n.t0 = n.catch(0);
                    console.log('onPressAttackButton error', n.t0);

                  case 25:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 22]],
            Promise
          );
        },
      },
      {
        key: 'onPressDockButton',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (
                      (console.log('onPressDockButton', this.menu),
                      (n.prev = 1),
                      null == this || this.menu.dockButton().startAnimation(),
                      module381.RSM.state != module381.RobotState.BACK_TO_DOCK)
                    ) {
                      n.next = 10;
                      break;
                    }

                    n.next = 6;
                    return regeneratorRuntime.default.awrap(module416.default.stop());

                  case 6:
                    t = n.sent;
                    module381.RSM.preMockState = module381.RobotState.WAITING;
                    n.next = 14;
                    break;

                  case 10:
                    n.next = 12;
                    return regeneratorRuntime.default.awrap(module416.default.charge());

                  case 12:
                    t = n.sent;
                    module381.RSM.preMockState = module381.RobotState.BACK_TO_DOCK;

                  case 14:
                    if (!(null == this)) this.menu.dockButton().endAnimation();
                    module381.RSM.preMockMotionStatus();
                    this.updateUI();
                    console.log('onPressDockButton', t);
                    n.next = 25;
                    break;

                  case 21:
                    n.prev = 21;
                    n.t0 = n.catch(1);
                    if (!(null == this)) this.menu.dockButton().endAnimation();
                    console.log('onPressDockButton error', n.t0);

                  case 25:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 21]],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          return React.default.createElement(
            module13.View,
            {
              style: [
                x.containter,
                {
                  backgroundColor: n.mapEdit.backgroundColor,
                },
              ],
            },
            React.default.createElement(module2148.default, {
              ref: function (n) {
                return (t.menu = n);
              },
              dockButtonMode: this.state.dockButtonMode,
              attackButtonMode: this.state.attackButtonMode,
              onPressAttackButton: this.onPressAttackButton.bind(this),
              onPressDockButton: this.onPressDockButton.bind(this),
            }),
            React.default.createElement(module1125.MapView, {
              style: x.mapStyle,
              parent: this,
              popBoxType: 'none',
              ref: function (n) {
                return (t.mapView = n);
              },
              top: 40,
              bottom: 40,
              left: 10,
              right: 10,
              mapMode: module1344.MAP_MODE_EASTER_EGG,
            })
          );
        },
      },
      {
        key: 'onPressBackButton',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if ((module415.MM.quitEasterEggModel(), (t.t0 = module381.RSM.state == module381.RobotState.EGG_ATTACK), !t.t0)) {
                      t.next = 5;
                      break;
                    }

                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module416.default.stop());

                  case 5:
                    this.props.navigation.pop();

                  case 6:
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
    ]);
    return B;
  })(React.Component);

exports.default = C;
C.contextType = module1200.AppConfigContext;
var x = module13.StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
});
