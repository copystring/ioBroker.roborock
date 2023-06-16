var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1888 = require('./1888'),
  module391 = require('./391'),
  module1889 = require('./1889'),
  module381 = require('./381'),
  module515 = require('./515'),
  module387 = require('./387');

function C() {
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
  module500 = require('./500').strings,
  module1153 = require('./1153'),
  module1513 = require('./1513'),
  D = (function (t) {
    module7.default(F, t);

    var s = F,
      module515 = C(),
      D = function () {
        var t,
          o = module11.default(s);

        if (module515) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function F(t) {
      var s;
      module4.default(this, F);
      (s = D.call(this, t)).state = {
        playing: false,
        selected: false,
      };
      return s;
    }

    module5.default(F, [
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
          if (module393.isMiApp)
            module393.AudioEvent.audioPlayerDidFinishPlaying.addListener(function (s) {
              t.setState({
                playing: false,
              });
              if (t.props.voiceDidFinishPlay) t.props.voiceDidFinishPlay(t.props.data.voice_id);
            });
          else
            this.audioPlayerDidFinishPlayingListener = module12.DeviceEventEmitter.addListener(module393.audioPlayerDidFinishPlayingEvent, function (s) {
              if (s.playId == t.props.data.voice_id) {
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
            s = module12.Dimensions.get('window').width - 220,
            o = this.state.selected ? '#3384FF' : t.rightButtonColor,
            n = this.state.update ? '#18CA6C' : o,
            l = this.state.update ? '#18CA6C' : this.state.selected ? '#3384FF' : t.rightButtonColor,
            p = this.state.update
              ? module500.soundpackage_update
              : this.state.selected
              ? module500.localization_strings_Setting_SoundPackagePage_3
              : module500.localization_strings_Setting_SoundPackagePage_2,
            c = React.default.createElement(module385.PureButton, {
              funcId: 'sound_package_use_' + this.props.rowId,
              title: p,
              textColor: l,
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
                  borderColor: n,
                },
              ],
              onPress: this._onPressUseButton.bind(this),
            }),
            u = React.default.createElement(module1888.default, {
              progress: this.state.progress,
              style: E.progressView,
            }),
            _ = this.state.progress >= 0 && this.state.progress < 1 ? u : c,
            P = 'https://' + module1153.areaServerMap[module381.RSM.serverCode].host + this.props.data.bg_pic.split('.com')[1],
            S = '';

          if (this.props.data.validEndTime) {
            var b = module1513.convertTimeFromSourceZoneToPhoneZoneByTimestamp(this.props.data.validEndTime, 0);
            S = module500.soundpackage_valid_end_time_title + ' ' + b.year + '.' + b.month + '.' + b.day;
            if (b.year >= 2099) S = module500.soundpackage_valid_end_time_title + ' ' + module500.voice_package_end_validtime_forever;
          }

          var C = React.default.createElement(
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
              React.default.createElement(module385.PureImageButton, {
                funcId: 'sound_package_playing_' + this.props.rowId,
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
                  tintColor: module393.isDarkMode() ? 'xmwhite' : null,
                },
              })
            ),
            D = React.default.createElement(
              module12.View,
              {
                style: [
                  E.textWrap,
                  {
                    maxWidth: s,
                  },
                ],
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
                  numberOfLines: 1,
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
                  numberOfLines: 1,
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
                  S
                )
            ),
            F = React.default.createElement(
              module12.View,
              {
                style: E.left,
              },
              globals.isRTL && D,
              globals.isRTL && C,
              !globals.isRTL && C,
              !globals.isRTL && D
            ),
            R = React.default.createElement(
              module12.View,
              {
                style: E.right,
              },
              _
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                E.wrap,
                {
                  backgroundColor: t.itemBackgroundColor,
                },
                this.props.borderStyle,
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
            globals.isRTL && R,
            globals.isRTL && F,
            !globals.isRTL && F,
            !globals.isRTL && R,
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
          var t, s, module4;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (((t = module1889.default.wavFileName(this.props.data.voice_id, this.props.data.version)), !this.state.playing)) {
                      l.next = 16;
                      break;
                    }

                    l.prev = 2;
                    l.next = 5;
                    return regeneratorRuntime.default.awrap(module1889.default.stopPlay());

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
                      module1889.default.startPlay(t, {
                        playId: this.props.data.voice_id,
                        audioPlayerUid: this.props.data.voice_id,
                      })
                    );

                  case 19:
                    module387.LogEventCommon('play_voice', {
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
                    s = module1153.areaServerMap[module381.RSM.serverCode].cdnHost;
                    module4 = 'https://' + s + this.props.data.voice_pre_listen.split('.com')[1];
                    l.next = 32;
                    return regeneratorRuntime.default.awrap(module391.default.asyncDownloadFile(module4, t));

                  case 32:
                    l.next = 35;
                    return regeneratorRuntime.default.awrap(
                      module1889.default.startPlay(t, {
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
    return F;
  })(React.Component);

exports.default = D;
D.contextType = module515.AppConfigContext;
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
    height: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomLine: {
    height: 0.8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
