require('./2088');

var module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module381 = require('./381'),
  module423 = require('./423'),
  module391 = require('./391'),
  module2089 = require('./2089'),
  module2091 = require('./2091'),
  module390 = require('./390');

function I(t, n) {
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

function v(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      I(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      I(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function E() {
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

require('./393');

module12.StatusBar.currentHeight;

var module505 = require('./505').strings,
  module2100 = (function (t) {
    module7.default(v, t);

    var n = v,
      module50 = E(),
      I = function () {
        var t,
          s = module11.default(n);

        if (module50) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, u);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function v(t) {
      var n;
      module4.default(this, v);
      (n = I.call(this, t)).state = {
        showChatVolume: false,
      };
      return n;
    }

    module5.default(v, [
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
        key: 'setChatVolume',
        value: function () {
          this.setState({
            showChatVolume: !this.state.showChatVolume,
          });
        },
      },
      {
        key: 'checkSliderShouldHide',
        value: function () {
          this.setState({
            showChatVolume: false,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          this.state.rate;
          var t = this,
            n = this.props,
            o = n.isPortrait,
            s = n.shouldShowUI,
            u = n.calling,
            l = module381.RSM.isLocating ? module505.map_locating : module381.RSM.stateName,
            c = o ? 10 : 10 + module391.default.iOSAndroidReturn(module391.default.isIphoneX() ? 24 : 0, 0),
            h = 'cn' == module381.RSM.countryCode && 'cn' == module381.RSM.deviceLocation,
            I = module390.default.isVideoLiveCallSupported() && h,
            v = module381.RSM.isChargingOnDock();
          return React.default.createElement(
            module12.View,
            {
              style: [
                V.containter,
                this.props.style,
                this.state.showChatVolume && !o
                  ? {
                      height: 150,
                    }
                  : {},
              ],
            },
            React.default.createElement(
              module12.TouchableOpacity,
              {
                style: !o && {
                  alignSelf: 'flex-start',
                  top: 10,
                },
                activeOpacity: 1,
                onPress: this.onPressTitle.bind(this),
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    V.status,
                    {
                      maxWidth: o ? 160 : 260,
                    },
                  ],
                },
                l
              )
            ),
            o
              ? React.default.createElement(module385.PureImageButton, {
                  funcId: 'backButton',
                  image: require('./2045'),
                  imageWidth: 24,
                  imageHeight: 24,
                  onPress: this.props.onPressBackButton,
                  style: [
                    V.backButton,
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
            o
              ? React.default.createElement(module385.PureImageButton, {
                  funcId: 'settingButton',
                  image: require('./2093'),
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
                    V.settingButton,
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
            !o && s
              ? React.default.createElement(
                  module12.View,
                  {
                    style: [V.rightViews],
                  },
                  React.default.createElement(module385.PureImageButton, {
                    funcId: 'miniScreenButton',
                    image: require('./2094'),
                    imageWidth: 35,
                    imageHeight: 35,
                    onPress: this.props.miniScreen,
                    style: [V.rightItemButton],
                  }),
                  u && module390.default.isSupportSetVolumeInCall()
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: {
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginRight: 10,
                          },
                        },
                        React.default.createElement(module385.PureImageButton, {
                          funcId: 'record_robot_volume_botton_click',
                          image: require('./2095'),
                          imageWidth: 35,
                          imageHeight: 35,
                          onPress: this.setChatVolume.bind(this),
                          style: [V.rightItemButton],
                        }),
                        this.state.showChatVolume && !o && s
                          ? React.default.createElement(module2091.default, {
                              checkSliderShouldHide: function () {
                                return t.checkSliderShouldHide();
                              },
                              style: {
                                height: 100,
                              },
                            })
                          : null
                      )
                    : null,
                  module390.default.isVideoLiveCallSupported() && u && !v
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'soundOffButton',
                        image: this.props.robotMic ? require('./2096') : require('./2097'),
                        imageWidth: 35,
                        imageHeight: 35,
                        onPress: this.props.onPressSoundOffButton,
                        style: [
                          V.rightItemButton,
                          {
                            marginRight: 10,
                          },
                        ],
                      })
                    : null,
                  !I || this.props.screenRecording || v
                    ? null
                    : React.default.createElement(module385.PureImageButton, {
                        funcId: 'screen_recording_botton_click',
                        image: require('./2098'),
                        imageWidth: 35,
                        imageHeight: 35,
                        onPress: this.props.onPressScreenRecordingButton,
                        style: [
                          V.rightItemButton,
                          {
                            marginRight: 10,
                          },
                        ],
                      }),
                  I && this.props.screenRecording && !v
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: {
                            justifyContent: 'center',
                            height: 45,
                          },
                        },
                        React.default.createElement(module2089.default, {
                          onPress: this.props.onPressScreenRecordingButton,
                          style: [
                            V.timeButton,
                            {
                              marginRight: 10,
                            },
                          ],
                          didExceedLimitedDuration: this.props.stopRecordVideo,
                        })
                      )
                    : null,
                  I && !v
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'screen_snapshop_button_click',
                        image: require('./2099'),
                        imageWidth: 35,
                        imageHeight: 35,
                        onPress: this.props.onPressScreenShotButton,
                        style: [
                          V.rightItemButton,
                          {
                            marginRight: 10,
                          },
                        ],
                      })
                    : null,
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        justifyContent: 'center',
                        height: 45,
                      },
                    },
                    React.default.createElement(module385.PureButton, {
                      funcId: 'definitionButton',
                      title: this.props.currentDefinition,
                      textColor: 'white',
                      fontSize: 14,
                      onPress: this.props.onPressDefinitionButton,
                      style: [
                        V.definitionButton,
                        {
                          marginRight: 10,
                        },
                      ],
                    })
                  ),
                  module423.DMM.isTanosV
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'voiceRecordButton',
                        image: require('./2100'),
                        imageWidth: 45,
                        imageHeight: 45,
                        onPress: this.props.onPressVoiceRecordButton,
                        style: [
                          V.rightItemButton,
                          {
                            marginRight: 10,
                          },
                        ],
                      })
                    : null
                )
              : React.default.createElement(module12.View, null)
          );
        },
      },
    ]);
    return v;
  })(React.Component);

exports.default = module2100;
var V = module12.StyleSheet.create({
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
  status: v(
    v(
      {
        color: 'white',
        fontSize: module391.default.iOSAndroidReturn(16, 15),
      },
      module391.default.textShadow()
    ),
    {},
    {
      textAlign: 'center',
    }
  ),
  right: {
    position: 'absolute',
    flexDirection: 'row',
  },
  rate: v(
    {
      fontSize: 14,
      color: 'white',
      marginRight: 10,
    },
    module391.default.textShadow()
  ),
  battery: {},
  rightViews: {
    position: 'absolute',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    right: 20,
    top: 0,
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
  rightItemButton: {
    width: 45,
    height: 45,
  },
  timeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e22920',
    borderRadius: 3.33,
    height: 22.5,
    width: 45,
  },
});
