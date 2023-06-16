var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module381 = require('./381'),
  module391 = require('./391'),
  module390 = require('./390'),
  module387 = require('./387');

function B() {
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

var module500 = require('./500').strings,
  module2029 = (function (t) {
    module7.default(T, t);

    var n = T,
      module391 = B(),
      module2031 = function () {
        var t,
          o = module11.default(n);

        if (module391) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var n;
      module4.default(this, T);
      (n = module2031.call(this, t)).state = {};
      return n;
    }

    module5.default(T, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'getCleanButtonImage',
        value: function () {
          return module381.RSM.isCleaning() ? require('./2029') : require('./2030');
        },
      },
      {
        key: 'getCleanButtonTitle',
        value: function () {
          return module381.RSM.isCleaning() ? module500.localization_strings_Common_Constants_11 : module500.localization_strings_Main_MainPage_3;
        },
      },
      {
        key: 'getChargeButtonImage',
        value: function () {
          return module381.RSM.state == module381.RobotState.BACK_TO_DOCK ? require('./2029') : require('./2031');
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
            module390.default.isRecordAllowed() ? this._renderNew() : this._renderOld()
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
            React.default.createElement(module385.TopImageButton, {
              funcId: 'auctionMenu_cleanButton',
              image: this.getCleanButtonImage(),
              imageWidth: 50,
              imageHeight: 50,
              textTop: 5,
              fontSize: 12,
              textColor: '#fff',
              title: module500.localization_strings_Main_MainPage_3,
              style: [v.button, v.cleanButton],
              shouldShowShadow: true,
              ref: function (n) {
                return (t.cleanButton = n);
              },
              onPress: this.onPressCleanButton.bind(this),
            }),
            React.default.createElement(module385.TopImageButton, {
              funcId: 'auctionMenu_chargeButton',
              image: this.getChargeButtonImage(),
              imageWidth: 50,
              imageHeight: 50,
              title: module500.localization_strings_Main_MainPage_1,
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
            React.default.createElement(module385.TopImageButton, {
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
            React.default.createElement(module385.TopImageButton, {
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
          if (module381.RSM.voiceChat) globals.showToast(module500.voice_chat_title2);
          else {
            if (
              module381.RSM.state == module381.RobotState.BACK_TO_DOCK ||
              module381.RSM.state == module381.RobotState.REMOTE ||
              module381.RSM.state == module381.RobotState.GOTO_TARGET
            ) {
              if (this.props.askShouldRunCmd)
                this.props.askShouldRunCmd(function (n) {
                  if (n) t.handleClean();
                }, 'clean');
            } else this.handleClean();
            module387.LogEventStat(module387.LogEventMap.RealTimeCleanButton);
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
                    return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

                  case 5:
                    if (
                      (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.state = module381.RobotState.PAUSE),
                      !module381.RSM.isReadyToNewClean() &&
                        module381.RSM.state != module381.RobotState.REMOTE &&
                        module381.RSM.state != module381.RobotState.BACK_TO_DOCK &&
                        module381.RSM.state != module381.RobotState.GOTO_TARGET)
                    ) {
                      t.next = 13;
                      break;
                    }

                    t.next = 9;
                    return regeneratorRuntime.default.awrap(RobotApi.start());

                  case 9:
                    module381.RSM.state = module381.RobotState.CLEAN;
                    module381.RSM.cleanResumeFlag = module381.CleanResumeFlag.Global_Clean;
                    t.next = 36;
                    break;

                  case 13:
                    if (!module381.RSM.isSegmentCleanTaskShouldResume()) {
                      t.next = 19;
                      break;
                    }

                    t.next = 16;
                    return regeneratorRuntime.default.awrap(RobotApi.resumeSegmentClean());

                  case 16:
                    module381.RSM.state = module381.RobotState.SEGMENT_CLEAN;
                    t.next = 36;
                    break;

                  case 19:
                    if (!module381.RSM.isGlobalCleanTaskShouldResume()) {
                      t.next = 25;
                      break;
                    }

                    t.next = 22;
                    return regeneratorRuntime.default.awrap(RobotApi.start());

                  case 22:
                    module381.RSM.state = module381.RobotState.CLEAN;
                    t.next = 36;
                    break;

                  case 25:
                    if (!module381.RSM.isZoneCleanTaskShouldResume()) {
                      t.next = 31;
                      break;
                    }

                    t.next = 28;
                    return regeneratorRuntime.default.awrap(RobotApi.resumeZoneClean());

                  case 28:
                    module381.RSM.state = module381.RobotState.ZONED_CLEAN;
                    t.next = 36;
                    break;

                  case 31:
                    if (!module381.RSM.isCleaning()) {
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

                    module381.RSM.state = module381.RSM.state == module381.RobotState.SPOT_CLEAN ? module381.RobotState.WAITING : module381.RobotState.PAUSE;

                  case 36:
                    if (this.cleanButton) this.cleanButton.endAnimation();
                    this.forceUpdate();
                    module381.RSM.lockMotionStatus();
                    if (module381.RSM.isCleaning()) {
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
          if (module381.RSM.voiceChat) globals.showToast(module500.voice_chat_title2);
          else {
            console.log('onPressChargeButton - ' + JSON.stringify(module381.RSM));

            if (
              module381.RSM.isCleaning() ||
              module381.RSM.isCleanTaskShouldResume() ||
              module381.RSM.state == module381.RobotState.REMOTE ||
              module381.RSM.state == module381.RobotState.GOTO_TARGET
            ) {
              console.log('askShouldRunCmd');
              if (this.props.askShouldRunCmd)
                this.props.askShouldRunCmd(function (n) {
                  if (n) t.handleCharge();
                }, 'charge');
            } else this.handleCharge();

            module387.LogEventStat(module387.LogEventMap.RealTimeRechargeButton);
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
                    return regeneratorRuntime.default.awrap(module381.RSM.getStatus());

                  case 5:
                    if (
                      (module381.RSM.state == module381.RobotState.MALFUNCTIONING && (module381.RSM.state = module381.RobotState.PAUSE),
                      !(
                        module381.RSM.isCleaning() ||
                        module381.RSM.isCleanTaskShouldResume() ||
                        module381.RSM.isReadyToCmd() ||
                        module381.RSM.state == module381.RobotState.PAUSE ||
                        module381.RSM.state == module381.RobotState.REMOTE ||
                        module381.RSM.state == module381.RobotState.GOTO_TARGET
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

                    module381.RSM.state = module381.RobotState.BACK_TO_DOCK;
                    module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.Has;

                  case 12:
                    t.next = 20;
                    break;

                  case 14:
                    if (module381.RSM.state != module381.RobotState.BACK_TO_DOCK) {
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

                    module381.RSM.state = module381.RobotState.PAUSE;
                    module381.RSM.backDockResumeFlag = module381.BackDockResumeFlag.Has;

                  case 20:
                    if (this.chargeButton) this.chargeButton.endAnimation();
                    this.forceUpdate();
                    module381.RSM.lockMotionStatus();
                    console.log('ActionMenu.handleCharge');
                    if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK) {
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
    return T;
  })(React.Component);

exports.default = module2029;
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
    right: 20 + (module391.default.isIphoneX() ? 24 : 0),
    bottom: module391.default.iOSAndroidReturn(module391.default.scaledPixel(160), 145),
  },
  voiceRecordButton: {
    right: 22,
    bottom: 128,
  },
  chargeButton: {
    right: 20 + (module391.default.isIphoneX() ? 24 : 0),
    bottom: module391.default.iOSAndroidReturn(module391.default.scaledPixel(70), 55),
  },
  sendVoiceButton: {
    width: 66,
    height: 90,
    right: 18,
    bottom: 18,
  },
  newCleanButton: {
    right: 20,
    bottom: 102,
  },
  newChargeButton: {
    right: 20,
    bottom: 24,
  },
});
