require('./2026');

var module49 = require('./49'),
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
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(s, c, l);
        else s[c] = t[c];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module377 = require('./377'),
  module415 = require('./415'),
  module387 = require('./387'),
  module2027 = require('./2027');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function R(t, n) {
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

function w(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      R(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function v() {
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

require('./389');

module12.StatusBar.currentHeight;

var module491 = require('./491').strings,
  module2036 = (function (t) {
    module7.default(w, t);

    var module49 = w,
      b = v(),
      R = function () {
        var t,
          o = module11.default(module49);

        if (b) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function w(t) {
      var n;
      module4.default(this, w);
      (n = R.call(this, t)).state = {};
      return n;
    }

    module5.default(w, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'update',
        value: function () {
          this.forceUpdate();
        },
      },
      {
        key: 'onPressTitle',
        value: function () {
          if (globals.PressTitleAction) globals.PressTitleAction();
        },
      },
      {
        key: 'render',
        value: function () {
          this.state.rate;
          var t = this.props,
            n = t.isPortrait,
            o = t.shouldShowUI,
            s = t.isRemoteLaunching,
            u = s ? module491.localization_strings_Setting_RemoteControlPage_61 : module377.RSM.isLocating ? module491.map_locating : module377.RSM.stateName,
            c = n ? 10 : 10 + module387.default.iOSAndroidReturn(module387.default.isIphoneX() ? 24 : 0, 0);
          return React.default.createElement(
            module12.View,
            {
              style: [D.containter, this.props.style],
            },
            n
              ? React.default.createElement(module381.PureImageButton, {
                  funcId: 'backButton',
                  image: require('./2029'),
                  imageWidth: 24,
                  imageHeight: 24,
                  onPress: this.props.onPressBackButton,
                  style: [
                    D.backButton,
                    globals.isRTL
                      ? {
                          right: c,
                        }
                      : {
                          left: c,
                        },
                  ],
                })
              : React.default.createElement(module12.View, null),
            n
              ? React.default.createElement(module381.PureImageButton, {
                  funcId: 'settingButton',
                  image: require('./2030'),
                  imageWidth: 30,
                  imageHeight: 30,
                  hitSlop: {
                    top: 15,
                    left: 15,
                    bottom: 15,
                    right: 15,
                  },
                  onPress: this.props.onPressSettingButton,
                  style: [
                    D.settingButton,
                    globals.isRTL
                      ? {
                          left: 14,
                        }
                      : {
                          right: 14,
                        },
                  ],
                })
              : React.default.createElement(module12.View, null),
            !n && o
              ? React.default.createElement(
                  module12.View,
                  {
                    style: [D.rightViews],
                  },
                  React.default.createElement(module381.PureImageButton, {
                    funcId: 'miniScreenButton',
                    image: require('./2031'),
                    imageWidth: 35,
                    imageHeight: 35,
                    onPress: this.props.miniScreen,
                    style: [D.miniScreenButton],
                  }),
                  module415.DMM.isTopazSV || module415.DMM.isTanosSV
                    ? React.default.createElement(module381.PureImageButton, {
                        funcId: 'soundOffButton',
                        image: this.props.robotMic ? require('./2032') : require('./2033'),
                        imageWidth: 45,
                        imageHeight: 45,
                        onPress: this.props.onPressSoundOffButton,
                        style: [
                          D.voiceRecordButton,
                          {
                            marginRight: 20,
                          },
                        ],
                      })
                    : null,
                  (!module415.DMM.isTopazSV && !module415.DMM.isTanosSV) || this.props.screenRecording
                    ? null
                    : React.default.createElement(module381.PureImageButton, {
                        funcId: 'screenRecordingButton',
                        image: require('./2034'),
                        imageWidth: 45,
                        imageHeight: 45,
                        onPress: this.props.onPressScreenRecordingButton,
                        style: [
                          D.voiceRecordButton,
                          {
                            marginRight: 20,
                          },
                        ],
                      }),
                  (module415.DMM.isTopazSV || module415.DMM.isTanosSV) && this.props.screenRecording
                    ? React.default.createElement(module2027.default, {
                        funcId: 'screenRecordingButton',
                        onPress: this.props.onPressScreenRecordingButton,
                        style: [
                          D.timeButton,
                          {
                            marginRight: 20,
                          },
                        ],
                        stopRecordVideo: this.props.stopRecordVideo,
                      })
                    : null,
                  module415.DMM.isTopazSV || module415.DMM.isTanosSV
                    ? React.default.createElement(module381.PureImageButton, {
                        funcId: 'screenShotButton',
                        image: require('./2035'),
                        imageWidth: 45,
                        imageHeight: 45,
                        onPress: this.props.onPressScreenShotButton,
                        style: [
                          D.voiceRecordButton,
                          {
                            marginRight: 20,
                          },
                        ],
                      })
                    : null,
                  React.default.createElement(module381.PureButton, {
                    funcId: 'definitionButton',
                    title: this.props.currentDefinition,
                    textColor: 'white',
                    fontSize: 14,
                    onPress: this.props.onPressDefinitionButton,
                    style: [
                      D.definitionButton,
                      {
                        marginRight: 20,
                      },
                    ],
                  }),
                  module415.DMM.isTanosV
                    ? React.default.createElement(module381.PureImageButton, {
                        funcId: 'voiceRecordButton',
                        image: require('./2036'),
                        imageWidth: 45,
                        imageHeight: 45,
                        onPress: this.props.onPressVoiceRecordButton,
                        style: [
                          D.voiceRecordButton,
                          {
                            marginRight: 20,
                          },
                        ],
                      })
                    : null
                )
              : React.default.createElement(module12.View, null),
            React.default.createElement(
              module12.TouchableOpacity,
              {
                activeOpacity: 1,
                onPress: this.onPressTitle.bind(this),
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    D.status,
                    {
                      maxWidth: module12.Dimensions.get('window').width - 160,
                    },
                  ],
                },
                u
              )
            )
          );
        },
      },
    ]);
    return w;
  })(React.Component);

exports.default = module2036;
var D = module12.StyleSheet.create({
  containter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  settingButton: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  backButton: {
    position: 'absolute',
    width: 30,
    height: 30,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  status: w(
    {
      color: 'white',
      fontSize: module387.default.iOSAndroidReturn(17, 16),
    },
    module387.default.textShadow()
  ),
  right: {
    position: 'absolute',
    flexDirection: 'row',
  },
  rate: w(
    {
      fontSize: 14,
      color: 'white',
      marginRight: 10,
    },
    module387.default.textShadow()
  ),
  battery: {},
  rightViews: {
    position: 'absolute',
    height: 30,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    flex: 1,
  },
  definitionButton: {
    alignSelf: 'center',
    minWidth: 34,
    height: 22,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 2,
  },
  miniScreenButton: {
    alignSelf: 'center',
    width: 35,
    height: 35,
  },
  voiceRecordButton: {
    alignSelf: 'center',
    width: 45,
    height: 45,
  },
  timeButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e22920',
    borderRadius: 3.33,
    height: 22.5,
    width: 45,
  },
});
