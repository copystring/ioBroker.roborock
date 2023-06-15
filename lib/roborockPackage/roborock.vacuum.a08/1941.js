var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1942 = require('./1942'),
  module407 = require('./407'),
  module377 = require('./377'),
  module506 = require('./506'),
  module383 = require('./383');

function A() {
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

var module389 = require('./389'),
  module491 = require('./491').strings,
  R = (function (t) {
    module7.default(y, t);

    var module506 = y,
      R = A(),
      v = function () {
        var t,
          o = module11.default(module506);

        if (R) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function y() {
      module4.default(this, y);
      return v.apply(this, arguments);
    }

    module5.default(y, [
      {
        key: 'render',
        value: function () {
          var t = this,
            o = React.default.createElement(
              module12.View,
              {
                style: k.top,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    fontSize: 13,
                    color: '#9B9B9B',
                    textAlign: 'center',
                  },
                },
                module491.remote_control_prompt
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
            module12.View,
            {
              style: k.containter,
            },
            this.props.parent.state.isLocal ? null : o,
            React.default.createElement(
              module12.View,
              {
                style: [
                  k.bottom,
                  {
                    backgroundColor: n.remoteControl.bottomBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: k.bottomButtonView,
                },
                React.default.createElement(module1942.default, {
                  accessibilityKey: 'remote_btn_1',
                  image: n.remoteControl.spotImg,
                  text: module491.localization_strings_Common_Constants_12,
                  onPress: function () {
                    return t._spot();
                  },
                  animating: this.state.spotAnimating,
                  disabled: this.state.spotDisabled,
                  ignorePress: this.state.bottomButtonsIgnorePress,
                  imageStyle: {
                    tintColor: module389.isDarkMode() ? 'xmwhite' : null,
                  },
                }),
                React.default.createElement(module1942.default, {
                  accessibilityKey: 'remote_btn_3',
                  image: n.remoteControl.chargeImg,
                  text: module491.localization_strings_Main_MainPage_1,
                  onPress: function () {
                    return t._charge();
                  },
                  animating: this.state.chargeAnimating,
                  disabled: this.state.chargeDisabled,
                  ignorePress: this.state.bottomButtonsIgnorePress,
                  imageStyle: {
                    tintColor: module389.isDarkMode() ? 'xmwhite' : null,
                  },
                })
              )
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
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (
                      (module383.LogEventCommon('tap_clean_area'),
                      this._startSpotAnimation(),
                      (t = module377.RobotStatusManager.sharedManager().state) != module377.RobotState.UPDATING)
                    ) {
                      p.next = 8;
                      break;
                    }

                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.localization_strings_Setting_RemoteControlPage_13,
                      });

                    this._stopSpotAnimation();

                    p.next = 43;
                    break;

                  case 8:
                    if (t != module377.RobotState.SPOT_CLEAN) {
                      p.next = 13;
                      break;
                    }

                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.localization_strings_Setting_RemoteControlPage_19,
                      });

                    this._stopSpotAnimation();

                    p.next = 43;
                    break;

                  case 13:
                    if (t != module377.RobotState.CHARGING && t != module377.RobotState.FULL_CHARGE) {
                      p.next = 18;
                      break;
                    }

                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.localization_strings_Setting_RemoteControlPage_20,
                      });

                    this._stopSpotAnimation();

                    p.next = 43;
                    break;

                  case 18:
                    if (
                      t != module377.RobotState.CLEAN &&
                      t != module377.RobotState.BACK_TO_DOCK &&
                      t != module377.RobotState.GOTO_TARGET &&
                      t != module377.RobotState.ZONED_CLEAN
                    ) {
                      p.next = 26;
                      break;
                    }

                    n = module491.home_dialog_begin_new_clean;
                    if (t == module377.RobotState.BACK_TO_DOCK) n = module491.home_dialog_begin_new_clean;
                    if (t == module377.RobotState.GOTO_TARGET) n = module491.home_dialog_begin_new_clean;
                    if (t == module377.RobotState.ZONED_CLEAN) n = module491.home_dialog_begin_new_clean;
                    globals.Alert.alert('', n, [
                      {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          s._stopSpotAnimation();
                        },
                      },
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    t.prev = 0;
                                    t.next = 3;
                                    return regeneratorRuntime.default.awrap(module407.default.pause());

                                  case 3:
                                    setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (t) {
                                          for (;;)
                                            switch ((t.prev = t.next)) {
                                              case 0:
                                                t.next = 2;
                                                return regeneratorRuntime.default.awrap(module407.default.spot());

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

                                    if (s.props.parent.toast)
                                      s.props.parent.toast.setState({
                                        text: module491.robot_communication_exception,
                                      });

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
                    p.next = 43;
                    break;

                  case 26:
                    if (t != module377.RobotState.REMOTE) {
                      p.next = 42;
                      break;
                    }

                    p.prev = 27;
                    this.props.parent._isRemoteStarted = false;

                    this.props.parent._stopMoveTimer();

                    p.next = 32;
                    return regeneratorRuntime.default.awrap(module407.default.spot());

                  case 32:
                    this._stopSpotAnimation();

                    this.props.parent.toMainPage();
                    p.next = 40;
                    break;

                  case 36:
                    p.prev = 36;
                    p.t0 = p.catch(27);
                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.robot_communication_exception,
                      });

                    this._stopSpotAnimation();

                  case 40:
                    p.next = 43;
                    break;

                  case 42:
                    try {
                      module407.default.spot();
                      this.props.parent.toMainPage();
                    } catch (t) {
                      if (this.props.parent.toast)
                        this.props.parent.toast.setState({
                          text: module491.robot_communication_exception,
                        });

                      this._stopSpotAnimation();
                    }

                  case 43:
                  case 'end':
                    return p.stop();
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
            function (p) {
              for (;;)
                switch ((p.prev = p.next)) {
                  case 0:
                    if (
                      (module383.LogEventCommon('tap_to_charge'),
                      this._startChargeAnimation(),
                      (t = module377.RobotStatusManager.sharedManager().state) != module377.RobotState.UPDATING)
                    ) {
                      p.next = 8;
                      break;
                    }

                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.localization_strings_Setting_RemoteControlPage_13,
                      });

                    this._stopChargeAnimation();

                    p.next = 52;
                    break;

                  case 8:
                    if (t != module377.RobotState.BACK_TO_DOCK) {
                      p.next = 13;
                      break;
                    }

                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.localization_strings_Setting_RemoteControlPage_40,
                      });

                    this._stopChargeAnimation();

                    p.next = 52;
                    break;

                  case 13:
                    if (t != module377.RobotState.CHARGING && t != module377.RobotState.FULL_CHARGE) {
                      p.next = 18;
                      break;
                    }

                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.localization_strings_Setting_RemoteControlPage_41,
                      });

                    this._stopChargeAnimation();

                    p.next = 52;
                    break;

                  case 18:
                    if (t != module377.RobotState.CLEAN && t != module377.RobotState.SPOT_CLEAN && t != module377.RobotState.GOTO_TARGET && t != module377.RobotState.ZONED_CLEAN) {
                      p.next = 26;
                      break;
                    }

                    n = module491.home_dialog_begin_new_back_charge;
                    if (t == module377.RobotState.CLEAN) n = module491.home_dialog_begin_new_back_charge;
                    if (t == module377.RobotState.GOTO_TARGET) n = module491.home_dialog_begin_new_back_charge;
                    if (t == module377.RobotState.ZONED_CLEAN) n = module491.home_dialog_begin_new_clean;
                    globals.Alert.alert('', n, [
                      {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {
                          s._stopChargeAnimation();
                        },
                      },
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          return regeneratorRuntime.default.async(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    t.prev = 0;
                                    t.next = 3;
                                    return regeneratorRuntime.default.awrap(module407.default.pause());

                                  case 3:
                                    setTimeout(function () {
                                      return regeneratorRuntime.default.async(
                                        function (t) {
                                          for (;;)
                                            switch ((t.prev = t.next)) {
                                              case 0:
                                                t.next = 2;
                                                return regeneratorRuntime.default.awrap(module407.default.charge());

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
                                    if (s.props.parent.toast)
                                      s.props.parent.toast.setState({
                                        text: module491.robot_communication_exception,
                                      });

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
                    p.next = 52;
                    break;

                  case 26:
                    if (t != module377.RobotState.REMOTE) {
                      p.next = 42;
                      break;
                    }

                    p.prev = 27;
                    this.props.parent._isRemoteStarted = false;

                    this.props.parent._stopMoveTimer();

                    p.next = 32;
                    return regeneratorRuntime.default.awrap(module407.default.charge());

                  case 32:
                    this._stopChargeAnimation();

                    this.props.parent.toMainPage();
                    p.next = 40;
                    break;

                  case 36:
                    p.prev = 36;
                    p.t0 = p.catch(27);
                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.robot_communication_exception,
                      });

                    this._stopChargeAnimation();

                  case 40:
                    p.next = 52;
                    break;

                  case 42:
                    p.prev = 42;
                    p.next = 45;
                    return regeneratorRuntime.default.awrap(module407.default.charge());

                  case 45:
                    this.props.parent.toMainPage();
                    p.next = 52;
                    break;

                  case 48:
                    p.prev = 48;
                    p.t1 = p.catch(42);
                    if (this.props.parent.toast)
                      this.props.parent.toast.setState({
                        text: module491.robot_communication_exception,
                      });

                    this._stopChargeAnimation();

                  case 52:
                  case 'end':
                    return p.stop();
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
    return y;
  })(React.default.Component);

exports.default = R;
R.contextType = module506.AppConfigContext;
var v = module12.Dimensions.get('screen'),
  k = module12.StyleSheet.create({
    containter: {
      justifyContent: 'flex-end',
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'center',
      bottom: 0,
      width: v.width,
      height: 133,
    },
    bottomButtonView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: v.width - 100,
      top: 20,
    },
    top: {
      position: 'absolute',
      flexDirection: 'row',
      left: 0,
      width: v.width,
      justifyContent: 'center',
      alignItems: 'center',
      top: -35,
      paddingHorizontal: 20,
    },
  });
