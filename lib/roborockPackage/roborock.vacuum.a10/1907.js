require('./407');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var s = L(o);
    if (s && s.has(t)) return s.get(t);
    var n = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var p in t)
      if ('default' !== p && Object.prototype.hasOwnProperty.call(t, p)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, p) : null;
        if (c && (c.get || c.set)) Object.defineProperty(n, p, c);
        else n[p] = t[p];
      }

    n.default = t;
    if (s) s.set(t, n);
    return n;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1908 = require('./1908'),
  module387 = require('./387'),
  module1909 = require('./1909'),
  module377 = require('./377'),
  module506 = require('./506'),
  module383 = require('./383');

function L(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    s = new WeakMap();
  return (L = function (t) {
    return t ? s : o;
  })(t);
}

function S() {
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
  module934 = require('./934'),
  module1366 = require('./1366'),
  x = (function (t) {
    module7.default(B, t);

    var module506 = B,
      L = S(),
      x = function () {
        var t,
          o = module11.default(module506);

        if (L) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var o;
      module4.default(this, B);
      (o = x.call(this, t)).state = {
        playing: false,
        selected: false,
      };
      return o;
    }

    module5.default(B, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          this.applyPropsToState(t);
        },
      },
      {
        key: 'applyPropsToState',
        value: function (t) {
          if (!(t.playing == this.state.playing && t.selected == this.state.selected && t.progress == this.state.progress && t.update == this.state.update))
            this.setState({
              playing: t.playing,
              selected: t.selected,
              progress: t.progress,
              update: t.update,
            });
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.applyPropsToState(this.props);
          if (module389.isMiApp)
            module389.AudioEvent.audioPlayerDidFinishPlaying.addListener(function (o) {
              t.setState({
                playing: false,
              });
              if (t.props.voiceDidFinishPlay) t.props.voiceDidFinishPlay(t.props.data.voice_id);
            });
          else
            this.audioPlayerDidFinishPlayingListener = module12.DeviceEventEmitter.addListener(module389.audioPlayerDidFinishPlayingEvent, function (o) {
              if (o.playId == t.props.data.voice_id) {
                t.setState({
                  playing: false,
                });
                if (t.props.voiceDidFinishPlay) t.props.voiceDidFinishPlay(t.props.data.voice_id);
              }
            });
          module12.AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          if (this.audioPlayerDidFinishPlayingListener) this.audioPlayerDidFinishPlayingListener.remove();
          module12.AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
        },
      },
      {
        key: '_handleAppStateChange',
        value: function (t) {
          if (this.state.playing) {
            this._onPressPlayButton();

            console.log('appState did change - ' + t);
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.soundPackage,
            o = this.state.selected ? '#3384FF' : t.rightButtonColor,
            s = this.state.update ? '#18CA6C' : o,
            n = this.state.update ? '#18CA6C' : this.state.selected ? '#3384FF' : t.rightButtonColor,
            l = this.state.update
              ? module491.soundpackage_update
              : this.state.selected
              ? module491.localization_strings_Setting_SoundPackagePage_3
              : module491.localization_strings_Setting_SoundPackagePage_2,
            p = React.default.createElement(module381.PureButton, {
              funcId: 'sound_package_use_' + this.props.rowId,
              title: l,
              textColor: n,
              style: [
                E.rightButton,
                globals.isRTL
                  ? {
                      left: 15,
                    }
                  : {
                      right: 15,
                    },
                {
                  borderColor: s,
                },
              ],
              onPress: this._onPressUseButton.bind(this),
            }),
            c = React.default.createElement(module1908.default, {
              progress: this.state.progress,
              style: E.progressView,
            }),
            v = this.state.progress >= 0 && this.state.progress < 1 ? c : p,
            P = 'https://' + module934.areaServerMap[module377.RSM.serverCode].host + this.props.data.bg_pic.split('.com')[1],
            w = '';

          if (this.props.data.validEndTime) {
            var b = module1366.convertTimeFromSourceZoneToPhoneZoneByTimestamp(this.props.data.validEndTime, 0);
            w = module491.soundpackage_valid_end_time_title + ' ' + b.year + '.' + b.month + '.' + b.day;
            if (b.year >= 2099) w = module491.soundpackage_valid_end_time_title + ' ' + module491.voice_package_end_validtime_forever;
          }

          var L = React.default.createElement(
              module12.View,
              {
                style: E.coverWrap,
              },
              React.default.createElement(module12.Image, {
                source: {
                  uri: P,
                },
                style: E.cover,
              }),
              React.default.createElement(module381.PureImageButton, {
                image: this.state.playing ? t.pauseIcon : t.playIcon,
                style: E.playButton,
                imageWidth: 22,
                imageHeight: 22,
                hitSlop: {
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15,
                },
                onPress: this._onPressPlayButton.bind(this),
                imageStyle: {
                  tintColor: module389.isDarkMode() ? 'xmwhite' : null,
                },
              })
            ),
            S = React.default.createElement(
              module12.View,
              {
                style: E.textWrap,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    E.title,
                    {
                      color: t.itemTitleColor,
                    },
                  ],
                },
                ' ',
                this.props.data.voice_title
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    E.desc,
                    {
                      color: t.itemDetailColor,
                    },
                  ],
                },
                this.props.data.voice_sub_title
              ),
              this.props.data.validEndTime &&
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      E.desc,
                      {
                        color: t.itemDetailColor,
                        fontSize: 11,
                      },
                    ],
                  },
                  w
                )
            ),
            x = React.default.createElement(
              module12.View,
              {
                style: E.left,
              },
              globals.isRTL && S,
              globals.isRTL && L,
              !globals.isRTL && L,
              !globals.isRTL && S
            ),
            B = React.default.createElement(
              module12.View,
              {
                style: E.right,
              },
              v
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                E.wrap,
                {
                  backgroundColor: t.itemBackgroundColor,
                },
              ],
            },
            this.props.showTopLine &&
              React.default.createElement(module12.View, {
                style: [
                  E.topLine,
                  {
                    backgroundColor: t.lineColor,
                    marginLeft: this.props.isTopLongLine ? 0 : 20,
                  },
                ],
              }),
            globals.isRTL && B,
            globals.isRTL && x,
            !globals.isRTL && x,
            !globals.isRTL && B,
            this.props.showBottomLine &&
              React.default.createElement(module12.View, {
                style: [
                  E.bottomLine,
                  {
                    backgroundColor: t.lineColor,
                    marginLeft: this.props.isBottomLoneLine ? 0 : 20,
                  },
                ],
              })
          );
        },
      },
      {
        key: '_onPressPlayButton',
        value: function () {
          var t, module4, module5;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (((t = module1909.default.wavFileName(this.props.data.voice_id, this.props.data.version)), !this.state.playing)) {
                      l.next = 16;
                      break;
                    }

                    l.prev = 2;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module1909.default.stopPlay());

                  case 5:
                    this.setState({
                      playing: false,
                    });
                    if (this.props.voiceDidFinishPlay) this.props.voiceDidFinishPlay(this.props.data.voice_id);
                    l.next = 14;
                    break;

                  case 10:
                    l.prev = 10;
                    l.t0 = l.catch(2);
                    if (this.props.voiceDidFinishPlay) this.props.voiceDidFinishPlay(this.props.data.voice_id);
                    console.log('SoundPackageListItemView stop error : ' + JSON.stringify(l.t0));

                  case 14:
                    l.next = 43;
                    break;

                  case 16:
                    l.prev = 16;
                    l.next = 19;
                    return regeneratorRuntime.default.awrap(
                      module1909.default.startPlay(t, {
                        playId: this.props.data.voice_id,
                        audioPlayerUid: this.props.data.voice_id,
                      })
                    );

                  case 19:
                    module383.LogEventCommon('play_voice', {
                      voiceId: this.props.data.voice_id,
                    });
                    this.setState({
                      playing: true,
                    });
                    if (this.props.voiceDidBeginPlay) this.props.voiceDidBeginPlay(this.props.data.voice_id);
                    l.next = 43;
                    break;

                  case 25:
                    l.prev = 25;
                    l.t1 = l.catch(16);
                    l.prev = 27;
                    module4 = module934.areaServerMap[module377.RSM.serverCode].cdnHost;
                    module5 = 'https://' + module4 + this.props.data.voice_pre_listen.split('.com')[1];
                    l.next = 32;
                    return regeneratorRuntime.default.awrap(module387.default.asyncDownloadFile(module5, t));

                  case 32:
                    l.next = 35;
                    return regeneratorRuntime.default.awrap(
                      module1909.default.startPlay(t, {
                        playId: this.props.data.voice_id,
                        audioPlayerUid: this.props.data.voice_id,
                      })
                    );

                  case 35:
                    this.setState({
                      playing: true,
                    });
                    if (this.props.voiceDidBeginPlay) this.props.voiceDidBeginPlay(this.props.data.voice_id);
                    l.next = 43;
                    break;

                  case 39:
                    l.prev = 39;
                    l.t2 = l.catch(27);
                    console.log('Sound play error : ' + JSON.stringify(l.t2));
                    if (this.props.onPressPlayError) this.props.onPressPlayError();

                  case 43:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [
              [2, 10],
              [16, 25],
              [27, 39],
            ],
            Promise
          );
        },
      },
      {
        key: '_onPressUseButton',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!this.state.selected || this.state.update) {
                      t.next = 2;
                      break;
                    }

                    return t.abrupt('return');

                  case 2:
                    if (this.props.onPressUseButton) this.props.onPressUseButton();

                  case 3:
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

exports.default = x;
x.contextType = module506.AppConfigContext;
var E = module12.StyleSheet.create({
  wrap: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  left: {
    flexDirection: 'row',
  },
  coverWrap: {
    marginLeft: globals.isRTL ? 10 : 15,
    marginRight: globals.isRTL ? 15 : 10,
    justifyContent: 'center',
  },
  cover: {
    width: 56,
    height: 56,
  },
  playButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  },
  textWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  desc: {
    marginTop: 5,
    marginLeft: 4,
    fontSize: 13,
    color: 'rgba(0,0,0,0.4)',
    textAlign: globals.isRTL ? 'right' : 'left',
    maxWidth: module12.Dimensions.get('window').width - 220,
  },
  right: {
    justifyContent: 'center',
  },
  rightButton: {
    position: 'absolute',
    height: 32,
    backgroundColor: 'transparent',
    borderColor: '#3384FF',
    borderWidth: 0.8,
    borderRadius: 16,
    paddingHorizontal: 15,
    minWidth: 75,
  },
  progressView: {
    marginLeft: 15,
    marginRight: 15,
  },
  topLine: {
    width: module12.Dimensions.get('window').width,
    height: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomLine: {
    width: module12.Dimensions.get('window').width,
    height: 0.8,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
