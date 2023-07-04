var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2037 = require('./2037'),
  module416 = require('./416'),
  module381 = require('./381'),
  module1193 = require('./1193'),
  module387 = require('./387');

function S() {
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

var module393 = require('./393'),
  module510 = require('./510').strings,
  R = (function (t) {
    module9.default(w, t);

    var module1193 = w,
      R = S(),
      v = function () {
        var t,
          o = module12.default(module1193);

        if (R) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function w() {
      module6.default(this, w);
      return v.apply(this, arguments);
    }

    module7.default(w, [
      {
        key: 'render',
        value: function () {
          var t = this,
            o = React.default.createElement(
              module13.View,
              {
                style: k.top,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: {
                    fontSize: 13,
                    color: '#9B9B9B',
                    textAlign: 'center',
                  },
                },
                module510.remote_control_prompt
              )
            ),
            n = this.context.theme;
          this.state = {
            spotAnimating: false,
            cleanAnimating: false,
            chargeAnimating: false,
            spotDisabled: false,
            chargeDisabled: false,
            bottomButtonsIgnorePress: false,
          };
          return React.default.createElement(
            module13.View,
            {
              style: k.containter,
            },
            this.props.parent.state.isLocal ? null : o,
            React.default.createElement(
              module13.View,
              {
                style: [
                  k.bottom,
                  {
                    backgroundColor: n.remoteControl.bottomBackgroundColor,
                  },
                ],
              },
              React.default.createElement(module2037.default, {
                accessibilityKey: 'remote_btn_1',
                image: n.remoteControl.spotImg,
                text: module510.localization_strings_Common_Constants_12,
                onPress: function () {
                  return t._spot();
                },
                animating: this.state.spotAnimating,
                disabled: this.state.spotDisabled,
                ignorePress: this.state.bottomButtonsIgnorePress,
                imageStyle: {
                  tintColor: module393.isDarkMode() ? 'xmwhite' : null,
                },
              }),
              React.default.createElement(module2037.default, {
                accessibilityKey: 'remote_btn_3',
                image: n.remoteControl.chargeImg,
                text: module510.localization_strings_Main_MainPage_1,
                onPress: function () {
                  return t._charge();
                },
                animating: this.state.chargeAnimating,
                disabled: this.state.chargeDisabled,
                ignorePress: this.state.bottomButtonsIgnorePress,
                imageStyle: {
                  tintColor: module393.isDarkMode() ? 'xmwhite' : null,
                },
              })
            )
          );
        },
      },
      {
        key: '_spot',
        value: function () {
          var t,
            n,
            s = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      (module387.LogEventCommon('tap_clean_area'),
                      this._startSpotAnimation(),
                      (t = module381.RobotStatusManager.sharedManager().state) != module381.RobotState.UPDATING)
                    ) {
                      c.next = 8;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_13);

                    this._stopSpotAnimation();

                    c.next = 43;
                    break;

                  case 8:
                    if (t != module381.RobotState.SPOT_CLEAN) {
                      c.next = 13;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_19);

                    this._stopSpotAnimation();

                    c.next = 43;
                    break;

                  case 13:
                    if (t != module381.RobotState.CHARGING && t != module381.RobotState.FULL_CHARGE) {
                      c.next = 18;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_20);

                    this._stopSpotAnimation();

                    c.next = 43;
                    break;

                  case 18:
                    if (
                      t != module381.RobotState.CLEAN &&
                      t != module381.RobotState.BACK_TO_DOCK &&
                      t != module381.RobotState.GOTO_TARGET &&
                      t != module381.RobotState.ZONED_CLEAN
                    ) {
                      c.next = 26;
                      break;
                    }

                    n = module510.home_dialog_begin_new_clean;
                    if (t == module381.RobotState.BACK_TO_DOCK) n = module510.home_dialog_begin_new_clean;
                    if (t == module381.RobotState.GOTO_TARGET) n = module510.home_dialog_begin_new_clean;
                    if (t == module381.RobotState.ZONED_CLEAN) n = module510.home_dialog_begin_new_clean;
                    globals.Alert.alert('', n, [
                      {
                        text: module510.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          s._stopSpotAnimation();
                        },
                      },
                      {
                        text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    t.prev = 0;
                                    t.next = 3;
                                    return regeneratorRuntime.default.awrap(module416.default.pause());

                                  case 3:
                                    setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (t) {
                                          for (;;)
                                            switch ((t.prev = t.next)) {
                                              case 0:
                                                t.next = 2;
                                                return regeneratorRuntime.default.awrap(module416.default.spot());

                                              case 2:
                                              case 'end':
                                                return t.stop();
                                            }
                                        },
                                        null,
                                        null,
                                        null,
                                        Promise
                                      );
                                    }, 1500);
                                    s.props.parent.toMainPage();
                                    t.next = 11;
                                    break;

                                  case 7:
                                    t.prev = 7;
                                    t.t0 = t.catch(0);

                                    s._stopSpotAnimation();

                                    globals.showToast(module510.robot_communication_exception);

                                  case 11:
                                  case 'end':
                                    return t.stop();
                                }
                            },
                            null,
                            null,
                            [[0, 7]],
                            Promise
                          );
                        },
                      },
                    ]);
                    c.next = 43;
                    break;

                  case 26:
                    if (t != module381.RobotState.REMOTE) {
                      c.next = 42;
                      break;
                    }

                    c.prev = 27;
                    this.props.parent._isRemoteStarted = false;

                    this.props.parent._stopMoveTimer(true);

                    c.next = 32;
                    return regeneratorRuntime.default.awrap(module416.default.spot());

                  case 32:
                    this._stopSpotAnimation();

                    this.props.parent.toMainPage();
                    c.next = 40;
                    break;

                  case 36:
                    c.prev = 36;
                    c.t0 = c.catch(27);
                    globals.showToast(module510.robot_communication_exception);

                    this._stopSpotAnimation();

                  case 40:
                    c.next = 43;
                    break;

                  case 42:
                    try {
                      module416.default.spot();
                      this.props.parent.toMainPage();
                    } catch (t) {
                      globals.showToast(module510.robot_communication_exception);

                      this._stopSpotAnimation();
                    }

                  case 43:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[27, 36]],
            Promise
          );
        },
      },
      {
        key: '_charge',
        value: function () {
          var t,
            n,
            s = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      (module387.LogEventCommon('tap_to_charge'),
                      this._startChargeAnimation(),
                      (t = module381.RobotStatusManager.sharedManager().state) != module381.RobotState.UPDATING)
                    ) {
                      c.next = 8;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_13);

                    this._stopChargeAnimation();

                    c.next = 52;
                    break;

                  case 8:
                    if (t != module381.RobotState.BACK_TO_DOCK) {
                      c.next = 13;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_40);

                    this._stopChargeAnimation();

                    c.next = 52;
                    break;

                  case 13:
                    if (t != module381.RobotState.CHARGING && t != module381.RobotState.FULL_CHARGE) {
                      c.next = 18;
                      break;
                    }

                    globals.showToast(module510.localization_strings_Setting_RemoteControlPage_41);

                    this._stopChargeAnimation();

                    c.next = 52;
                    break;

                  case 18:
                    if (t != module381.RobotState.CLEAN && t != module381.RobotState.SPOT_CLEAN && t != module381.RobotState.GOTO_TARGET && t != module381.RobotState.ZONED_CLEAN) {
                      c.next = 26;
                      break;
                    }

                    n = module510.home_dialog_begin_new_back_charge;
                    if (t == module381.RobotState.CLEAN) n = module510.home_dialog_begin_new_back_charge;
                    if (t == module381.RobotState.GOTO_TARGET) n = module510.home_dialog_begin_new_back_charge;
                    if (t == module381.RobotState.ZONED_CLEAN) n = module510.home_dialog_begin_new_clean;
                    globals.Alert.alert('', n, [
                      {
                        text: module510.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          s._stopChargeAnimation();
                        },
                      },
                      {
                        text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    t.prev = 0;
                                    t.next = 3;
                                    return regeneratorRuntime.default.awrap(module416.default.pause());

                                  case 3:
                                    setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (t) {
                                          for (;;)
                                            switch ((t.prev = t.next)) {
                                              case 0:
                                                t.next = 2;
                                                return regeneratorRuntime.default.awrap(module416.default.charge());

                                              case 2:
                                              case 'end':
                                                return t.stop();
                                            }
                                        },
                                        null,
                                        null,
                                        null,
                                        Promise
                                      );
                                    }, 1500);
                                    s.props.parent.toMainPage();
                                    t.next = 11;
                                    break;

                                  case 7:
                                    t.prev = 7;
                                    t.t0 = t.catch(0);
                                    globals.showToast(module510.robot_communication_exception);

                                    s._stopChargeAnimation();

                                  case 11:
                                  case 'end':
                                    return t.stop();
                                }
                            },
                            null,
                            null,
                            [[0, 7]],
                            Promise
                          );
                        },
                      },
                    ]);
                    c.next = 52;
                    break;

                  case 26:
                    if (t != module381.RobotState.REMOTE) {
                      c.next = 42;
                      break;
                    }

                    c.prev = 27;
                    this.props.parent._isRemoteStarted = false;

                    this.props.parent._stopMoveTimer();

                    c.next = 32;
                    return regeneratorRuntime.default.awrap(module416.default.charge());

                  case 32:
                    this._stopChargeAnimation();

                    this.props.parent.toMainPage();
                    c.next = 40;
                    break;

                  case 36:
                    c.prev = 36;
                    c.t0 = c.catch(27);
                    globals.showToast(module510.robot_communication_exception);

                    this._stopChargeAnimation();

                  case 40:
                    c.next = 52;
                    break;

                  case 42:
                    c.prev = 42;
                    c.next = 45;
                    return regeneratorRuntime.default.awrap(module416.default.charge());

                  case 45:
                    this.props.parent.toMainPage();
                    c.next = 52;
                    break;

                  case 48:
                    c.prev = 48;
                    c.t1 = c.catch(42);
                    globals.showToast(module510.robot_communication_exception);

                    this._stopChargeAnimation();

                  case 52:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [
              [27, 36],
              [42, 48],
            ],
            Promise
          );
        },
      },
      {
        key: '_startSpotAnimation',
        value: function () {
          if (!this.state.bottomButtonsIgnorePress)
            this.setState({
              spotAnimating: true,
              bottomButtonsIgnorePress: true,
            });
        },
      },
      {
        key: '_stopSpotAnimation',
        value: function () {
          this.setState({
            spotAnimating: false,
            bottomButtonsIgnorePress: false,
          });
        },
      },
      {
        key: '_startCleanAnimation',
        value: function () {
          if (!this.state.bottomButtonsIgnorePress)
            this.setState({
              cleanAnimating: true,
              bottomButtonsIgnorePress: true,
            });
        },
      },
      {
        key: '_stopCleanAnimation',
        value: function () {
          this.setState({
            cleanAnimating: false,
            bottomButtonsIgnorePress: false,
          });
        },
      },
      {
        key: '_startChargeAnimation',
        value: function () {
          if (!this.state.bottomButtonsIgnorePress)
            this.setState({
              chargeAnimating: true,
              bottomButtonsIgnorePress: true,
            });
        },
      },
      {
        key: '_stopChargeAnimation',
        value: function () {
          this.setState({
            chargeAnimating: false,
            bottomButtonsIgnorePress: false,
          });
        },
      },
    ]);
    return w;
  })(React.default.Component);

exports.default = R;
R.contextType = module1193.AppConfigContext;
module13.Dimensions.get('screen');
var k = module13.StyleSheet.create({
  containter: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 0,
    alignSelf: 'stretch',
    height: 133,
    paddingTop: 20,
    paddingHorizontal: 40,
  },
  top: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35,
    paddingHorizontal: 20,
  },
});
