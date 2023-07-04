var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = M(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, l, c);
        else s[l] = t[l];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module377 = require('./377'),
  module387 = require('./387'),
  module386 = require('./386'),
  module383 = require('./383');

function M(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (M = function (t) {
    return t ? o : n;
  })(t);
}

function B() {
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

var module491 = require('./491').strings,
  module2015 = (function (t) {
    module7.default(y, t);

    var module387 = y,
      M = B(),
      module2017 = function () {
        var t,
          n = module11.default(module387);

        if (M) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function y(t) {
      var n;
      module4.default(this, y);
      (n = module2017.call(this, t)).state = {};
      return n;
    }

    module5.default(y, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'getCleanButtonImage',
        value: function () {
          return module377.RSM.isCleaning() ? require('./2015') : require('./2016');
        },
      },
      {
        key: 'getCleanButtonTitle',
        value: function () {
          return module377.RSM.isCleaning() ? module491.localization_strings_Common_Constants_11 : module491.localization_strings_Main_MainPage_3;
        },
      },
      {
        key: 'getChargeButtonImage',
        value: function () {
          return module377.RSM.state == module377.RobotState.BACK_TO_DOCK ? require('./2015') : require('./2017');
        },
      },
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              style: [v.containter, this.props.style],
            },
            module386.default.isRecordAllowed() ? this._renderNew() : this._renderOld()
          );
        },
      },
      {
        key: '_renderOld',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            null,
            React.default.createElement(module381.TopImageButton, {
              funcId: 'auctionMenu_cleanButton',
              image: this.getCleanButtonImage(),
              imageWidth: 50,
              imageHeight: 50,
              textTop: 5,
              fontSize: 12,
              textColor: '#fff',
              title: module491.localization_strings_Main_MainPage_3,
              style: [v.button, v.cleanButton],
              shouldShowShadow: true,
              ref: function (n) {
                return (t.cleanButton = n);
              },
              onPress: this.onPressCleanButton.bind(this),
            }),
            React.default.createElement(module381.TopImageButton, {
              funcId: 'auctionMenu_chargeButton',
              image: this.getChargeButtonImage(),
              imageWidth: 50,
              imageHeight: 50,
              title: module491.localization_strings_Main_MainPage_1,
              textTop: 5,
              fontSize: 12,
              textColor: '#fff',
              style: [v.button, v.chargeButton],
              shouldShowShadow: true,
              ref: function (n) {
                return (t.chargeButton = n);
              },
              onPress: this.onPressChargeButton.bind(this),
            })
          );
        },
      },
      {
        key: '_renderNew',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            null,
            React.default.createElement(module381.TopImageButton, {
              funcId: 'auctionMenu_chargeButton',
              image: this.getChargeButtonImage(),
              imageWidth: 56,
              imageHeight: 56,
              style: [v.newButton, v.newChargeButton],
              ref: function (n) {
                return (t.chargeButton = n);
              },
              onPress: this.onPressChargeButton.bind(this),
            }),
            React.default.createElement(module381.TopImageButton, {
              funcId: 'auctionMenu_cleanButton',
              image: this.getCleanButtonImage(),
              imageWidth: 56,
              imageHeight: 56,
              style: [v.newButton, v.newCleanButton],
              ref: function (n) {
                return (t.cleanButton = n);
              },
              onPress: this.onPressCleanButton.bind(this),
            })
          );
        },
      },
      {
        key: 'onPressCleanButton',
        value: function () {
          var t = this;
          if (module377.RSM.voiceChat) globals.showToast(module491.voice_chat_title2);
          else {
            if (
              module377.RSM.state == module377.RobotState.BACK_TO_DOCK ||
              module377.RSM.state == module377.RobotState.REMOTE ||
              module377.RSM.state == module377.RobotState.GOTO_TARGET
            ) {
              if (this.props.askShouldRunCmd)
                this.props.askShouldRunCmd(function (n) {
                  if (n) t.handleClean();
                }, 'clean');
            } else this.handleClean();
            module383.LogEventStat(module383.LogEventMap.RealTimeCleanButton);
          }
        },
      },
      {
        key: 'handleClean',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (this.props.willRunCmd) this.props.willRunCmd();
                    if (this.cleanButton) this.cleanButton.startAnimation();
                    t.prev = 2;
                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module377.RSM.getStatus());

                  case 5:
                    if (
                      (module377.RSM.state == module377.RobotState.MALFUNCTIONING && (module377.RSM.state = module377.RobotState.PAUSE),
                      !module377.RSM.isReadyToNewClean() &&
                        module377.RSM.state != module377.RobotState.REMOTE &&
                        module377.RSM.state != module377.RobotState.BACK_TO_DOCK &&
                        module377.RSM.state != module377.RobotState.GOTO_TARGET)
                    ) {
                      t.next = 13;
                      break;
                    }

                    t.next = 9;
                    return regeneratorRuntime.default.awrap(RobotApi.start());

                  case 9:
                    module377.RSM.state = module377.RobotState.CLEAN;
                    module377.RSM.cleanResumeFlag = module377.CleanResumeFlag.Global_Clean;
                    t.next = 36;
                    break;

                  case 13:
                    if (!module377.RSM.isSegmentCleanTaskShouldResume()) {
                      t.next = 19;
                      break;
                    }

                    t.next = 16;
                    return regeneratorRuntime.default.awrap(RobotApi.resumeSegmentClean());

                  case 16:
                    module377.RSM.state = module377.RobotState.SEGMENT_CLEAN;
                    t.next = 36;
                    break;

                  case 19:
                    if (!module377.RSM.isGlobalCleanTaskShouldResume()) {
                      t.next = 25;
                      break;
                    }

                    t.next = 22;
                    return regeneratorRuntime.default.awrap(RobotApi.start());

                  case 22:
                    module377.RSM.state = module377.RobotState.CLEAN;
                    t.next = 36;
                    break;

                  case 25:
                    if (!module377.RSM.isZoneCleanTaskShouldResume()) {
                      t.next = 31;
                      break;
                    }

                    t.next = 28;
                    return regeneratorRuntime.default.awrap(RobotApi.resumeZoneClean());

                  case 28:
                    module377.RSM.state = module377.RobotState.ZONED_CLEAN;
                    t.next = 36;
                    break;

                  case 31:
                    if (!module377.RSM.isCleaning()) {
                      t.next = 36;
                      break;
                    }

                    t.next = 34;
                    return regeneratorRuntime.default.awrap(RobotApi.pause());

                  case 34:
                    if (!t.sent) {
                      t.next = 36;
                      break;
                    }

                    module377.RSM.state = module377.RSM.state == module377.RobotState.SPOT_CLEAN ? module377.RobotState.WAITING : module377.RobotState.PAUSE;

                  case 36:
                    if (this.cleanButton) this.cleanButton.endAnimation();
                    this.forceUpdate();
                    module377.RSM.lockMotionStatus();
                    if (module377.RSM.isCleaning()) {
                      if (this.props.robotStartMove) this.props.robotStartMove();
                    } else if (this.props.robotStop) this.props.robotStop();
                    t.next = 46;
                    break;

                  case 42:
                    t.prev = 42;
                    t.t0 = t.catch(2);
                    if (this.cleanButton) this.cleanButton.endAnimation();
                    console.log('onPressCleanButton error : ' + typeof t.t0 == Object ? JSON.stringify(t.t0) : t.t0);

                  case 46:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[2, 42]],
            Promise
          );
        },
      },
      {
        key: 'onPressChargeButton',
        value: function () {
          var t = this;
          if (module377.RSM.voiceChat) globals.showToast(module491.voice_chat_title2);
          else {
            console.log('onPressChargeButton - ' + JSON.stringify(module377.RSM));

            if (
              module377.RSM.isCleaning() ||
              module377.RSM.isCleanTaskShouldResume() ||
              module377.RSM.state == module377.RobotState.REMOTE ||
              module377.RSM.state == module377.RobotState.GOTO_TARGET
            ) {
              console.log('askShouldRunCmd');
              if (this.props.askShouldRunCmd)
                this.props.askShouldRunCmd(function (n) {
                  if (n) t.handleCharge();
                }, 'charge');
            } else this.handleCharge();

            module383.LogEventStat(module383.LogEventMap.RealTimeRechargeButton);
          }
        },
      },
      {
        key: 'onPressVoiceRecordButton',
        value: function () {
          if (this.props.onPressVoiceRecordButton) this.props.onPressVoiceRecordButton();
        },
      },
      {
        key: 'onPressSendVoiceButton',
        value: function () {
          if (this.props.onPressSendVoiceButton) this.props.onPressSendVoiceButton();
        },
      },
      {
        key: 'handleCharge',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (this.props.willRunCmd) this.props.willRunCmd();
                    if (this.chargeButton) this.chargeButton.startAnimation();
                    t.prev = 2;
                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module377.RSM.getStatus());

                  case 5:
                    if (
                      (module377.RSM.state == module377.RobotState.MALFUNCTIONING && (module377.RSM.state = module377.RobotState.PAUSE),
                      !(
                        module377.RSM.isCleaning() ||
                        module377.RSM.isCleanTaskShouldResume() ||
                        module377.RSM.isReadyToCmd() ||
                        module377.RSM.state == module377.RobotState.PAUSE ||
                        module377.RSM.state == module377.RobotState.REMOTE ||
                        module377.RSM.state == module377.RobotState.GOTO_TARGET
                      ))
                    ) {
                      t.next = 14;
                      break;
                    }

                    t.next = 9;
                    return regeneratorRuntime.default.awrap(RobotApi.charge());

                  case 9:
                    if (!t.sent) {
                      t.next = 12;
                      break;
                    }

                    module377.RSM.state = module377.RobotState.BACK_TO_DOCK;
                    module377.RSM.backDockResumeFlag = module377.BackDockResumeFlag.Has;

                  case 12:
                    t.next = 20;
                    break;

                  case 14:
                    if (module377.RSM.state != module377.RobotState.BACK_TO_DOCK) {
                      t.next = 20;
                      break;
                    }

                    t.next = 17;
                    return regeneratorRuntime.default.awrap(RobotApi.pause());

                  case 17:
                    if (!t.sent) {
                      t.next = 20;
                      break;
                    }

                    module377.RSM.state = module377.RobotState.PAUSE;
                    module377.RSM.backDockResumeFlag = module377.BackDockResumeFlag.Has;

                  case 20:
                    if (this.chargeButton) this.chargeButton.endAnimation();
                    this.forceUpdate();
                    module377.RSM.lockMotionStatus();
                    console.log('ActionMenu.handleCharge');
                    if (module377.RSM.state == module377.RobotState.BACK_TO_DOCK) {
                      if (this.props.robotStartMove) this.props.robotStartMove();
                    } else if (this.props.robotStop) this.props.robotStop();
                    t.next = 31;
                    break;

                  case 27:
                    t.prev = 27;
                    t.t0 = t.catch(2);
                    if (this.chargeButton) this.chargeButton.endAnimation();
                    console.log('onPressChargeButton error : ' + ('string' == typeof t.t0 ? t.t0 : JSON.stringify(t.t0)));

                  case 31:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[2, 27]],
            Promise
          );
        },
      },
    ]);
    return y;
  })(React.Component);

exports.default = module2015;
var v = module12.StyleSheet.create({
  containter: {
    flexDirection: 'column',
    minWidth: 220,
    height: 250,
    justifyContent: 'flex-end',
  },
  newButton: {
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    width: 52,
    height: 70,
  },
  cleanButton: {
    right: 20 + (module387.default.isIphoneX() ? 24 : 0),
    bottom: module387.default.iOSAndroidReturn(module387.default.scaledPixel(160), 145),
  },
  voiceRecordButton: {
    right: 22,
    bottom: 128,
  },
  chargeButton: {
    right: 20 + (module387.default.isIphoneX() ? 24 : 0),
    bottom: module387.default.iOSAndroidReturn(module387.default.scaledPixel(70), 55),
  },
  sendVoiceButton: {
    width: 66,
    height: 90,
    right: 18,
    bottom: 18,
  },
  newCleanButton: {
    right: 20,
    bottom: 24,
  },
  newChargeButton: {
    right: 20,
    bottom: 102,
  },
});
