require('./387');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = w(require('react')),
  module12 = require('./12'),
  module407 = require('./407'),
  base64js = w(require('base64-js')),
  module396 = w(require('./396')),
  module506 = require('./506'),
  module383 = require('./383');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function w(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = b(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    c = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var u in t)
    if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
      var l = c ? Object.getOwnPropertyDescriptor(t, u) : null;
      if (l && (l.get || l.set)) Object.defineProperty(s, u, l);
      else s[u] = t[u];
    }

  s.default = t;
  if (o) o.set(t, s);
  return s;
}

function P() {
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

var k,
  module389 = require('./389'),
  module491 = require('./491').strings,
  module481 = require('./481'),
  module2048 = module389.isRecordSupported() ? require('./2048') : module12.View,
  M = module12.NativeModules.RRRecorder,
  D = 0,
  module2049 = (function (t) {
    module7.default(module2050, t);

    var module506 = module2050,
      b = P(),
      w = function () {
        var t,
          n = module11.default(module506);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function module2050(t, n) {
      var o;
      module4.default(this, module2050);

      (o = w.call(this, t))._onVolumeChanged = function (t) {
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
        var t = module12.findNodeHandle(o.record);
        module12.UIManager.measure(t, function (t, n, s, c, u, l) {
          o.recordPageX = u;
          o.recordPageY = l;
        });
      };

      o.state = {
        recording: false,
        text: module491.long_press_to_send_voice,
        icon: n.theme.monitor.recordImg,
        volume: 0,
        error: '',
        hasPermission: false,
      };
      isLandscape = false;
      return o;
    }

    module5.default(module2050, [
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
              module383.LogEventCommon('touch_down_record_voice', {
                isPortrait: !t.props.isLandscape,
              });
              D = new Date().getTime();
              if (module389.isRecordSupported() && 2 == module389.iotType)
                M.getRecordPermission()
                  .then(function (n) {
                    if ('yes' == n) t._recordStart();
                    else if ('android' == module12.Platform.OS || 'undecided' == n) t._requestRecordPermission();
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
                  text: module491.long_press_to_send_voice,
                  icon: t.props.isLandscape ? require('./2049') : t.context.theme.monitor.recordImg,
                }),
                clearTimeout(k),
                t.state.recording)
              ) {
                o = n.nativeEvent.pageY < t.recordPageY;
                if (new Date().getTime() - D < 1e3) o = true;

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
          if (module389.isRecordSupported()) this._setMaxCount(10);
          if (this.props.isLandscape)
            this.setState({
              icon: require('./2049'),
              UpperDistance: 34,
            });
        },
      },
      {
        key: '_recordSetting',
        value: function () {
          var t = this;
          if (this.props.alertOwner)
            this.props.alertOwner.alert.alert(module491.ask_if_go_record_setting, '', [
              {
                text: module491.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
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
                    if ('no' == t.sent && 'android' == module12.Platform.OS) this._recordSetting();
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(M.setMaxCount(t));

                  case 3:
                    o.next = 9;
                    break;

                  case 6:
                    o.prev = 6;
                    o.t0 = o.catch(0);
                    console.error(o.t0);

                  case 9:
                  case 'end':
                    return o.stop();
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
            text: module491.let_go_of_send_up_slide_to_cancel,
            icon: this.props.isLandscape ? require('./2050') : this.context.theme.monitor.recordSelImg,
          });

          this._start();

          k = setTimeout(function () {
            if (t.state.recording) {
              t.setState({
                recording: false,
                text: module491.long_press_to_send_voice,
                icon: t.props.isLandscape ? require('./2049') : t.context.theme.monitor.recordImg,
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
                      text: module491.long_press_to_send_voice,
                      icon: this.props.isLandscape ? require('./2049') : this.context.theme.monitor.recordImg,
                    });
                    if ('-2000' == t.t0.code) globals.showToast(module491.microphone_is_occupied);

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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (this.state.recording) {
                      o.next = 2;
                      break;
                    }

                    return o.abrupt('return');

                  case 2:
                    if (!t) {
                      o.next = 14;
                      break;
                    }

                    this.setState({
                      recording: false,
                    });
                    o.prev = 4;
                    o.next = 7;
                    return regeneratorRuntime.default.awrap(M.cancel());

                  case 7:
                    o.next = 13;
                    break;

                  case 10:
                    o.prev = 10;
                    o.t0 = o.catch(4);
                    console.error(o.t0);

                  case 13:
                    return o.abrupt('return');

                  case 14:
                    this._stop();

                  case 15:
                  case 'end':
                    return o.stop();
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
          var o, module4, module5, module7, module9, module11, React, module12, module506, module383;
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
                    return regeneratorRuntime.default.awrap(module407.default.getRandomPubKey());

                  case 3:
                    o = b.sent;
                    this.pubKey = o.result.pub_key;

                  case 5:
                    b.next = 7;
                    return regeneratorRuntime.default.awrap(M.getRecordData(t));

                  case 7:
                    module4 = b.sent;
                    module5 = A(module481(module481(module4)).substring(0, 16));
                    module7 = A(module481(module4).substring(0, 16));
                    module9 = base64js.toByteArray(module4);
                    module11 = module396.encryptBytesWithAesKey(module9, module5, module7);
                    React = module396.encryptBytesWithPublicKey(module7.concat(module5), JSON.stringify(this.pubKey));
                    module12 = base64js.fromByteArray(React.concat(module11));
                    b.prev = 14;
                    module506 = {
                      security: {
                        cipher_suite: 1,
                      },
                      audio: module12,
                    };
                    module383 = JSON.parse(JSON.stringify(module506));
                    b.next = 19;
                    return regeneratorRuntime.default.awrap(module407.default.playAudio(module383));

                  case 19:
                    globals.showToast(module491.send_voice_success);
                    b.next = 45;
                    break;

                  case 23:
                    if (((b.prev = 23), (b.t0 = b.catch(14)), -10001 != b.t0.data.error.code)) {
                      b.next = 28;
                      break;
                    }

                    globals.showToast(module491.playing_now_please_try_again_later);
                    return b.abrupt('return');

                  case 28:
                    if (-10001 != b.t0.data.error) {
                      b.next = 32;
                      break;
                    }

                    globals.showToast(module491.playing_now_please_try_again_later);
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
                    globals.showToast(module491.send_voice_fail);
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
            module12.View,
            module21.default(
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
              module2048,
              module21.default({}, this.props, {
                ref: function (n) {
                  return (t.root = n);
                },
                onVolumeChanged: this._onVolumeChanged,
                onError: this._onError,
                onEndOfSpeech: this._onEndOfSpeech,
              })
            ),
            React.default.createElement(module12.Image, {
              source: this.state.icon,
              style: this.props.isLandscape ? C.landscapeMicStyles : C.defaultMicStyles,
            }),
            React.default.createElement(
              module12.Text,
              {
                numberOfLines: 2,
                style: [
                  C.defaultTextStyles,
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
    return module2050;
  })(React.Component);

function A(t) {
  for (var n = [], o = 0, s = t.length; o < s; ++o) n.push(t.charCodeAt(o));

  return n;
}

exports.default = module2049;
module2049.contextType = module506.AppConfigContext;
var C = module12.StyleSheet.create({
  defaultMicStyles: {
    top: -15,
    height: 126,
    width: 126,
  },
  defaultTextStyles: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    bottom: 20,
    width: module12.Dimensions.get('screen').width - 30,
    textAlign: 'center',
  },
  micStyles: {
    bottom: -20,
    height: (180 * module12.Dimensions.get('screen').width) / 375,
    width: module12.Dimensions.get('screen').width,
  },
  landscapeMicStyles: {
    height: 38,
    width: 81,
    alignSelf: 'center',
  },
});
