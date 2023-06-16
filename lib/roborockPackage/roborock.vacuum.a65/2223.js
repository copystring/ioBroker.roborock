require('./391');

var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module416 = require('./416'),
  base64js = require('base64-js'),
  module400 = require('./400'),
  module1200 = require('./1200'),
  module387 = require('./387');

function w() {
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

var P,
  module393 = require('./393'),
  module510 = require('./510').strings,
  module499 = require('./499'),
  module2224 = module393.isRecordSupported() ? require('./2224') : module13.View,
  M = module13.NativeModules.RRRecorder,
  O = 0,
  module2225 = (function (t) {
    module9.default(C, t);

    var n = C,
      module1200 = w(),
      module2226 = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function C(t, n) {
      var o;
      module6.default(this, C);

      (o = module2226.call(this, t))._onVolumeChanged = function (t) {
        var n = t.nativeEvent;

        if (o.state.recording) {
          if (o.props.didOperate) o.props.didOperate();
          o.recordToastShow(parseInt(0.08 * n.volume));
        }
      };

      o._onError = function (t) {
        t.nativeEvent;
      };

      o._onEndOfSpeech = function (t) {
        var n = t.nativeEvent;

        if (n.state) {
          o.reloadData();
          o.robotPlayAudio(n.data.id);
        }
      };

      o.handleLayout = function () {
        var t = module13.findNodeHandle(o.record);
        module13.UIManager.measure(t, function (t, n, s, c, u, l) {
          o.recordPageX = u;
          o.recordPageY = l;
        });
      };

      o.state = {
        recording: false,
        text: module510.long_press_to_send_voice,
        icon: n.theme.monitor.recordImg,
        volume: 0,
        error: '',
        hasPermission: false,
      };
      isLandscape = false;
      return o;
    }

    module7.default(C, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.Gesture = {
            onStartShouldSetResponder: function (t) {
              return true;
            },
            onMoveShouldSetResponder: function (t) {
              return true;
            },
            onResponderGrant: function (n) {
              module387.LogEventCommon('touch_down_record_voice', {
                isPortrait: !t.props.isLandscape,
              });
              O = new Date().getTime();
              if (module393.isRecordSupported() && 2 == module393.iotType)
                M.getRecordPermission()
                  .then(function (n) {
                    if ('yes' == n) t._recordStart();
                    else if ('android' == module13.Platform.OS || 'undecided' == n) t._requestRecordPermission();
                    else t._recordSetting();
                  })
                  .catch();
              else t.props.alertOwner.showNotReadyTip();
            },
            onResponderReject: function (t) {},
            onResponderMove: function (n) {
              console.log('this.recordPageY : ' + t.recordPageY);
              if (n.nativeEvent.pageY < t.recordPageY) console.log('evt.nativeEvent.pageY : ' + n.nativeEvent.pageY);
            },
            onResponderRelease: function (n) {
              var o;

              if (
                (t.recordToastHide(),
                t.setState({
                  text: module510.long_press_to_send_voice,
                  icon: t.props.isLandscape ? require('./2225') : t.context.theme.monitor.recordImg,
                }),
                clearTimeout(P),
                t.state.recording)
              ) {
                o = n.nativeEvent.pageY < t.recordPageY;
                if (new Date().getTime() - O < 1e3) o = true;

                t._cancel(o);
              }
            },
            onResponderTerminationRequest: function (t) {
              return true;
            },
            onResponderTerminate: function (t) {},
          };
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          if (module393.isRecordSupported()) this._setMaxCount(10);
          if (this.props.isLandscape)
            this.setState({
              icon: require('./2225'),
              UpperDistance: 34,
            });
        },
      },
      {
        key: '_recordSetting',
        value: function () {
          var t = this;
          if (this.props.alertOwner)
            this.props.alertOwner.alert.alert(module510.ask_if_go_record_setting, '', [
              {
                text: module510.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  t._goRecordSetting();
                },
              },
            ]);
        },
      },
      {
        key: '_goRecordSetting',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(M.goRecordSetting());

                  case 3:
                    t.next = 9;
                    break;

                  case 6:
                    t.prev = 6;
                    t.t0 = t.catch(0);
                    console.error(t.t0);

                  case 9:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            [[0, 6]],
            Promise
          );
        },
      },
      {
        key: '_requestRecordPermission',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(M.requestRecordPermission());

                  case 3:
                    if ('no' == t.sent && 'android' == module13.Platform.OS) this._recordSetting();
                    t.next = 10;
                    break;

                  case 7:
                    t.prev = 7;
                    t.t0 = t.catch(0);
                    console.error(t.t0);

                  case 10:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[0, 7]],
            Promise
          );
        },
      },
      {
        key: '_setMaxCount',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(M.setMaxCount(t));

                  case 3:
                    n.next = 9;
                    break;

                  case 6:
                    n.prev = 6;
                    n.t0 = n.catch(0);
                    console.error(n.t0);

                  case 9:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            [[0, 6]],
            Promise
          );
        },
      },
      {
        key: '_recordStart',
        value: function () {
          var t = this;
          this.setState({
            text: module510.let_go_of_send_up_slide_to_cancel,
            icon: this.props.isLandscape ? require('./2226') : this.context.theme.monitor.recordSelImg,
          });

          this._start();

          P = setTimeout(function () {
            if (t.state.recording) {
              t.setState({
                recording: false,
                text: module510.long_press_to_send_voice,
                icon: t.props.isLandscape ? require('./2225') : t.context.theme.monitor.recordImg,
              });
              t.recordToastHide();

              t._stop();
            }
          }, 15e3);
        },
      },
      {
        key: '_start',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!this.state.recording) {
                      t.next = 2;
                      break;
                    }

                    return t.abrupt('return');

                  case 2:
                    this.setState({
                      recording: true,
                    });
                    t.prev = 3;
                    t.next = 6;
                    return regeneratorRuntime.default.awrap(M.start());

                  case 6:
                    t.next = 14;
                    break;

                  case 9:
                    t.prev = 9;
                    t.t0 = t.catch(3);
                    this.recordToastHide();
                    this.setState({
                      recording: false,
                      text: module510.long_press_to_send_voice,
                      icon: this.props.isLandscape ? require('./2225') : this.context.theme.monitor.recordImg,
                    });
                    if ('-2000' == t.t0.code) globals.showToast(module510.microphone_is_occupied);

                  case 14:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[3, 9]],
            Promise
          );
        },
      },
      {
        key: '_cancel',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (this.state.recording) {
                      n.next = 2;
                      break;
                    }

                    return n.abrupt('return');

                  case 2:
                    if (!t) {
                      n.next = 14;
                      break;
                    }

                    this.setState({
                      recording: false,
                    });
                    n.prev = 4;
                    n.next = 7;
                    return regeneratorRuntime.default.awrap(M.cancel());

                  case 7:
                    n.next = 13;
                    break;

                  case 10:
                    n.prev = 10;
                    n.t0 = n.catch(4);
                    console.error(n.t0);

                  case 13:
                    return n.abrupt('return');

                  case 14:
                    this._stop();

                  case 15:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[4, 10]],
            Promise
          );
        },
      },
      {
        key: '_stop',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.setState({
                      recording: false,
                    });
                    t.prev = 1;
                    t.next = 4;
                    return regeneratorRuntime.default.awrap(M.stop());

                  case 4:
                    t.next = 10;
                    break;

                  case 7:
                    t.prev = 7;
                    t.t0 = t.catch(1);
                    console.error(t.t0);

                  case 10:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[1, 7]],
            Promise
          );
        },
      },
      {
        key: 'reloadData',
        value: function () {
          if (this.props.reloadData) this.props.reloadData();
        },
      },
      {
        key: 'recordToastHide',
        value: function () {
          if (this.props.recordToastHide) this.props.recordToastHide();
        },
      },
      {
        key: 'recordToastShow',
        value: function (t) {
          if (this.props.recordToastShow) this.props.recordToastShow(t);
        },
      },
      {
        key: 'robotPlayAudio',
        value: function (t) {
          var n, module22, module6, module7, module9, module11, module12, React, module13, module1200;
          return regeneratorRuntime.default.async(
            function (b) {
              for (;;)
                switch ((b.prev = b.next)) {
                  case 0:
                    if (this.pubKey) {
                      b.next = 5;
                      break;
                    }

                    b.next = 3;
                    return regeneratorRuntime.default.awrap(module416.default.getRandomPubKey());

                  case 3:
                    n = b.sent;
                    this.pubKey = n.result.pub_key;

                  case 5:
                    b.next = 7;
                    return regeneratorRuntime.default.awrap(M.getRecordData(t));

                  case 7:
                    module22 = b.sent;
                    module6 = L(module499(module499(module22)).substring(0, 16));
                    module7 = L(module499(module22).substring(0, 16));
                    module9 = base64js.toByteArray(module22);
                    module11 = module400.encryptBytesWithAesKey(module9, module6, module7);
                    module12 = module400.encryptBytesWithPublicKey(module7.concat(module6), JSON.stringify(this.pubKey));
                    React = base64js.fromByteArray(module12.concat(module11));
                    b.prev = 14;
                    module13 = {
                      security: {
                        cipher_suite: 1,
                      },
                      audio: React,
                    };
                    module1200 = JSON.parse(JSON.stringify(module13));
                    b.next = 19;
                    return regeneratorRuntime.default.awrap(module416.default.playAudio(module1200));

                  case 19:
                    globals.showToast(module510.send_voice_success);
                    b.next = 45;
                    break;

                  case 23:
                    if (((b.prev = 23), (b.t0 = b.catch(14)), -10001 != b.t0.data.error.code)) {
                      b.next = 28;
                      break;
                    }

                    globals.showToast(module510.playing_now_please_try_again_later);
                    return b.abrupt('return');

                  case 28:
                    if (-10001 != b.t0.data.error) {
                      b.next = 32;
                      break;
                    }

                    globals.showToast(module510.playing_now_please_try_again_later);
                    return b.abrupt('return');

                  case 32:
                    if (-10007 != b.t0.data.error.code) {
                      b.next = 37;
                      break;
                    }

                    this.pubKey = null;
                    this.robotPlayAudio(t);
                    return b.abrupt('return');

                  case 37:
                    if (-10007 != b.t0.data.error) {
                      b.next = 42;
                      break;
                    }

                    this.pubKey = null;
                    this.robotPlayAudio(t);
                    return b.abrupt('return');

                  case 42:
                    globals.showToast(module510.send_voice_fail);
                    console.log('playAudio  error: ' + ('object' == typeof b.t0 ? JSON.stringify(b.t0) : b.t0));

                  case 45:
                  case 'end':
                    return b.stop();
                }
            },
            null,
            this,
            [[14, 23]],
            Promise
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = this.props.style;
          return React.default.createElement(
            module13.View,
            module22.default(
              {
                style: s,
              },
              this.Gesture,
              {
                onLayout: this.handleLayout,
                ref: function (n) {
                  return (t.record = n);
                },
              }
            ),
            React.default.createElement(
              module2224,
              module22.default({}, this.props, {
                ref: function (n) {
                  return (t.root = n);
                },
                onVolumeChanged: this._onVolumeChanged,
                onError: this._onError,
                onEndOfSpeech: this._onEndOfSpeech,
              })
            ),
            React.default.createElement(module13.Image, {
              source: this.state.icon,
              style: this.props.isLandscape ? A.landscapeMicStyles : A.defaultMicStyles,
            }),
            React.default.createElement(
              module13.Text,
              {
                numberOfLines: 2,
                style: [
                  A.defaultTextStyles,
                  {
                    color: n.monitor.tabTitleSelColor,
                  },
                ],
              },
              this.props.isLandscape ? '' : this.state.text
            )
          );
        },
      },
    ]);
    return C;
  })(React.Component);

function L(t) {
  for (var n = [], o = 0, s = t.length; o < s; ++o) n.push(t.charCodeAt(o));

  return n;
}

exports.default = module2225;
module2225.contextType = module1200.AppConfigContext;
var A = module13.StyleSheet.create({
  defaultMicStyles: {
    top: -15,
    height: 126,
    width: 126,
  },
  defaultTextStyles: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    bottom: 20,
    width: module13.Dimensions.get('screen').width - 30,
    textAlign: 'center',
  },
  micStyles: {
    bottom: -20,
    height: (180 * module13.Dimensions.get('screen').width) / 375,
    width: module13.Dimensions.get('screen').width,
  },
  landscapeMicStyles: {
    height: 38,
    width: 81,
    alignSelf: 'center',
  },
});
