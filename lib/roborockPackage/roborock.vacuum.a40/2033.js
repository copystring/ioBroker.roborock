require('./2034');

var module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module381 = require('./381'),
  module422 = require('./422'),
  module391 = require('./391'),
  module2035 = require('./2035'),
  module2037 = require('./2037'),
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

function V() {
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

var module500 = require('./500').strings,
  module2046 = (function (t) {
    module7.default(v, t);

    var n = v,
      module50 = V(),
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
            u = n.isRemoteLaunching,
            l = n.calling,
            c = u ? module500.localization_strings_Setting_RemoteControlPage_61 : module381.RSM.isLocating ? module500.map_locating : module381.RSM.stateName,
            h = o ? 10 : 10 + module391.default.iOSAndroidReturn(module391.default.isIphoneX() ? 24 : 0, 0),
            I = module422.DMM.isTopazSV_CN && 'cn' == module381.RSM.countryCode && 'cn' == module381.RSM.deviceLocation,
            v = module422.DMM.isTopazSV || module422.DMM.isTanosSV,
            V = module381.RSM.isChargingOnDock();
          return React.default.createElement(
            module12.View,
            {
              style: [
                E.containter,
                this.props.style,
                this.state.showChatVolume && {
                  height: 150,
                },
              ],
            },
            o
              ? React.default.createElement(module385.PureImageButton, {
                  funcId: 'backButton',
                  image: require('./1994'),
                  imageWidth: 24,
                  imageHeight: 24,
                  onPress: this.props.onPressBackButton,
                  style: [
                    E.backButton,
                    globals.isRTL
                      ? {
                          right: h,
                        }
                      : {
                          left: h,
                        },
                  ],
                })
              : React.default.createElement(module12.View, null),
            o
              ? React.default.createElement(module385.PureImageButton, {
                  funcId: 'settingButton',
                  image: require('./2039'),
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
                    E.settingButton,
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
                    style: [E.rightViews],
                  },
                  React.default.createElement(module385.PureImageButton, {
                    funcId: 'miniScreenButton',
                    image: require('./2040'),
                    imageWidth: 35,
                    imageHeight: 35,
                    onPress: this.props.miniScreen,
                    style: [E.rightItemButton],
                  }),
                  v && I && !V && module390.default.isSupportSetVolumeInCall()
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
                          image: require('./2041'),
                          imageWidth: 35,
                          imageHeight: 35,
                          onPress: this.setChatVolume.bind(this),
                          style: [E.rightItemButton],
                        }),
                        this.state.showChatVolume && s
                          ? React.default.createElement(module2037.default, {
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
                  v && l && !V
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'soundOffButton',
                        image: this.props.robotMic ? require('./2042') : require('./2043'),
                        imageWidth: 35,
                        imageHeight: 35,
                        onPress: this.props.onPressSoundOffButton,
                        style: [
                          E.rightItemButton,
                          {
                            marginRight: 10,
                          },
                        ],
                      })
                    : null,
                  v && !this.props.screenRecording && I && !V
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'screen_recording_botton_click',
                        image: require('./2044'),
                        imageWidth: 35,
                        imageHeight: 35,
                        onPress: this.props.onPressScreenRecordingButton,
                        style: [
                          E.rightItemButton,
                          {
                            marginRight: 10,
                          },
                        ],
                      })
                    : null,
                  v && this.props.screenRecording && I && !V
                    ? React.default.createElement(
                        module12.View,
                        {
                          style: {
                            justifyContent: 'center',
                            height: 45,
                          },
                        },
                        React.default.createElement(module2035.default, {
                          onPress: this.props.onPressScreenRecordingButton,
                          style: [
                            E.timeButton,
                            {
                              marginRight: 10,
                            },
                          ],
                          stopRecordVideo: this.props.stopRecordVideo,
                        })
                      )
                    : null,
                  v && I && !V
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'screen_snapshop_button_click',
                        image: require('./2045'),
                        imageWidth: 35,
                        imageHeight: 35,
                        onPress: this.props.onPressScreenShotButton,
                        style: [
                          E.rightItemButton,
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
                        E.definitionButton,
                        {
                          marginRight: 10,
                        },
                      ],
                    })
                  ),
                  module422.DMM.isTanosV
                    ? React.default.createElement(module385.PureImageButton, {
                        funcId: 'voiceRecordButton',
                        image: require('./2046'),
                        imageWidth: 45,
                        imageHeight: 45,
                        onPress: this.props.onPressVoiceRecordButton,
                        style: [
                          E.rightItemButton,
                          {
                            marginRight: 10,
                          },
                        ],
                      })
                    : null
                )
              : React.default.createElement(module12.View, null),
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
                    E.status,
                    {
                      maxWidth: module12.Dimensions.get('window').width - 160,
                    },
                  ],
                },
                c
              )
            )
          );
        },
      },
    ]);
    return v;
  })(React.Component);

exports.default = module2046;
var E = module12.StyleSheet.create({
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
    {
      color: 'white',
      fontSize: module391.default.iOSAndroidReturn(17, 16),
    },
    module391.default.textShadow()
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
