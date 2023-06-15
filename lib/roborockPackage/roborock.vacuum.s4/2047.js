var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = R(require('react')),
  module12 = require('./12'),
  module2048 = require('./2048'),
  module1911 = require('./1911'),
  module407 = require('./407'),
  base64js = R(require('base64-js')),
  module396 = R(require('./396')),
  module387 = require('./387'),
  module2052 = require('./2052'),
  module506 = require('./506'),
  module383 = require('./383');

function D(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (D = function (t) {
    return t ? o : n;
  })(t);
}

function R(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = D(n);
  if (o && o.has(t)) return o.get(t);
  var s = {},
    l = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var u = l ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (u && (u.get || u.set)) Object.defineProperty(s, c, u);
      else s[c] = t[c];
    }

  s.default = t;
  if (o) o.set(t, s);
  return s;
}

function E() {
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

var module491 = require('./491').strings,
  module481 = require('./481'),
  module389 = require('./389'),
  L = module12.NativeModules.RRRecorder,
  O = '',
  M = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  C = (function (t) {
    module7.default(C, t);

    var module506 = C,
      D = E(),
      R = function () {
        var t,
          n = module11.default(module506);

        if (D) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = R.call(this, t)).state = {
        base64: '',
        data: [],
        error: '',
        playing: false,
        loadImgIndex: 2,
        hasRecord: true,
        shouldShowRecordToast: false,
        soundVolume: 0,
      };
      isLandscape = false;
      n._renderVoice = n._renderVoice.bind(module6.default(n));
      return n;
    }

    module5.default(C, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;

          if (module389.isRecordSupported()) {
            this.getData(true);
            setTimeout(function () {
              if (t.listView) t.listView.scrollToEnd();
            }, 1e3);
          }
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.audioPlayerDidFinishPlayingListener = module12.DeviceEventEmitter.addListener(module389.audioPlayerDidFinishPlayingEvent, function (n) {
            if (t.timer) clearInterval(t.timer);
            t.setState({
              playing: false,
              loadImgIndex: 2,
            });
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (this.timer) clearInterval(this.timer);
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module1911.default.stopPlay());

                  case 3:
                    if (this.audioPlayerDidFinishPlayingListener) this.audioPlayerDidFinishPlayingListener.remove();

                  case 4:
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
      {
        key: 'functiontimetrans',
        value: function (t) {
          return (
            ((t = new Date(1 * t)).getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1) +
            '/' +
            ((t.getDate() < 10 ? '0' + t.getDate() : t.getDate()) + ' ') +
            ((t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) + ':') +
            (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes())
          );
        },
      },
      {
        key: 'loadingImgs',
        value: function () {
          return [this.context.theme.monitor.recordPlay1, this.context.theme.monitor.recordPlay2, this.context.theme.monitor.recordPlay3];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(
              module12.View,
              {
                style: K.record,
              },
              React.default.createElement(module2048.default, {
                style: K.recordMic,
                isLandscape: false,
                reloadData: this.reloadData.bind(this),
                alertOwner: this.props.alertOwner,
                recordToastHide: this.recordToastHide.bind(this),
                recordToastShow: this.recordToastShow.bind(this),
              })
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                K.container,
                {
                  backgroundColor: n.monitor.backgroundColor,
                },
              ],
            },
            React.default.createElement(module12.FlatList, {
              ref: function (n) {
                return (t.listView = n);
              },
              extraData: this.state,
              data: this.state.data,
              renderItem: this._renderVoice,
              style: [
                this.props.isLandscape ? K.landscapeList : K.list,
                this.props.isLandscape
                  ? {
                      width: 0.515 * M(true),
                    }
                  : {
                      width: M() > 500 ? 414 : M(),
                    },
              ],
              keyExtractor: function (t) {
                return t.id;
              },
            }),
            this.state.hasRecord
              ? null
              : React.default.createElement(
                  module12.View,
                  {
                    style: this.props.isLandscape ? K.landscapeList : K.list,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        K.noRecord,
                        {
                          color: n.monitor.tabTitleSelColor,
                        },
                      ],
                    },
                    module491.no_recording_is_available
                  )
                ),
            !this.props.isLandscape && o,
            !this.props.isLandscape && this.state.shouldShowRecordToast
              ? React.default.createElement(module2052.default, {
                  ref: function (n) {
                    return (t.recordToastView = n);
                  },
                  soundVolume: this.state.soundVolume,
                  isLandscape: this.props.isLandscape,
                })
              : null
          );
        },
      },
      {
        key: '_renderVoice',
        value: function (t) {
          var n = this,
            s = t.item;
          theme = this.context.theme;
          var l = O == s.id,
            c = (this.props.isLandscape ? 0.515 * M(true) : M() > 500 ? 414 : M()) - 40,
            u = (68 * c) / 335,
            f = Math.ceil(s.duration) > 15 ? 15 : Math.ceil(s.duration),
            h = l && this.state.playing;
          return React.default.createElement(
            module12.View,
            {
              style: K.itemContainer,
            },
            React.default.createElement(
              module12.TouchableOpacity,
              module21.default({}, module387.default.getAccessibilityLabel('playVoice_' + s.id), {
                style: {
                  flex: 1,
                },
                onPress: function () {
                  O = s.id;

                  n._onPressPlayButton(s.path, s.id, l);
                },
                onLongPress: function () {
                  n.deleteRecordWithId(s.id);
                },
              }),
              React.default.createElement(
                module12.ImageBackground,
                {
                  resizeMode: 'stretch',
                  style: [
                    K.backImage,
                    {
                      marginLeft: 20,
                      height: u,
                      width: c,
                    },
                  ],
                  source: h ? theme.monitor.bubbleSel : theme.monitor.bubbleDefault,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: K.leftView,
                  },
                  h
                    ? React.default.createElement(module12.Image, {
                        style: K.voiceImage,
                        source: this.loadingImgs()[this.state.loadImgIndex],
                      })
                    : React.default.createElement(module12.Image, {
                        style: K.voiceImage,
                        source: theme.monitor.recordPlayDef,
                      }),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        K.time,
                        {
                          color: h ? '#ffffff' : theme.monitor.tabTitleSelColor,
                        },
                      ],
                    },
                    f + '\u2033'
                  )
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: K.rightView,
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        K.date,
                        {
                          color: h ? 'rgba(255,255,255,0.6)' : theme.monitor.timeColor,
                        },
                      ],
                    },
                    this.functiontimetrans(s.time)
                  ),
                  React.default.createElement(module12.View, {
                    style: [
                      K.line,
                      {
                        backgroundColor: h ? 'rgba(255,255,255,0.6)' : theme.monitor.timeColor,
                      },
                    ],
                  }),
                  React.default.createElement(
                    module12.TouchableOpacity,
                    module21.default({}, module387.default.getAccessibilityLabel('sendVoiceAgain_' + s.id), {
                      hitSlop: {
                        top: 30,
                        bottom: 30,
                        left: 30,
                        right: 30,
                      },
                      onPress: function () {
                        module383.LogEventCommon('tap_send_voice_again', {
                          voiceId: s.id,
                          isPortrait: !n.props.isLandscape,
                        });
                        n.robotPlayAudio(s.id);
                      },
                    }),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          K.button,
                          module12.Platform.select({
                            ios: {
                              lineHeight: u,
                            },
                            android: {
                              height: u,
                            },
                          }),
                          {
                            color: h ? '#ffffff' : theme.monitor.sendButton,
                          },
                        ],
                      },
                      module491.send_voice_again
                    )
                  )
                )
              )
            )
          );
        },
      },
      {
        key: 'reloadData',
        value: function () {
          this.getData(true);
        },
      },
      {
        key: 'recordToastHide',
        value: function () {
          this.setState({
            shouldShowRecordToast: false,
          });
        },
      },
      {
        key: 'recordToastShow',
        value: function (t) {
          this.setState({
            shouldShowRecordToast: true,
            soundVolume: t,
          });
        },
      },
      {
        key: '_onPressPlayButton',
        value: function (t, o, s) {
          var l = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    if (this.state.playing) {
                      if (this.timer) clearInterval(this.timer);
                      this.setState({
                        playing: false,
                        loadImgIndex: 2,
                      });
                      module1911.default
                        .stopPlay()
                        .then(function (n) {
                          if (!s) l._startPlay(t, o);
                        })
                        .catch();
                    } else this._startPlay(t, o);

                  case 1:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: '_startPlay',
        value: function (t, o) {
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this._playAnimation();

                    this.setState({
                      playing: true,
                    });
                    s.prev = 2;
                    s.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module1911.default.startPlay(t, {
                        playId: o,
                      })
                    );

                  case 5:
                    s.next = 12;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(2);
                    if (this.timer) clearInterval(this.timer);
                    console.log('Sound play error : ' + JSON.stringify(s.t0));

                  case 12:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[2, 8]],
            Promise
          );
        },
      },
      {
        key: '_stopPlay',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (this.timer) clearInterval(this.timer);
                    this.setState({
                      playing: false,
                      loadImgIndex: 2,
                    });
                    t.prev = 2;
                    t.next = 5;
                    return regeneratorRuntime.default.awrap(module1911.default.stopPlay());

                  case 5:
                    t.next = 11;
                    break;

                  case 8:
                    t.prev = 8;
                    t.t0 = t.catch(2);
                    console.log('SoundPackageListItemView stop error : ' + JSON.stringify(t.t0));

                  case 11:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            [[2, 8]],
            Promise
          );
        },
      },
      {
        key: '_playAnimation',
        value: function () {
          var t = this;
          if (this.state.playing) {
            if (this.timer) clearInterval(this.timer);
          } else
            this.timer = setInterval(function () {
              var n = t.state.loadImgIndex + 1;
              n %= t.loadingImgs().length;
              t.setState({
                loadImgIndex: n,
              });
              console.log('i==', n);
            }, 200);
        },
      },
      {
        key: 'getData',
        value: function (t) {
          var o,
            s,
            l = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(L.getRecords());

                  case 3:
                    o = c.sent;
                    s = o.length > 0;
                    this.setState(
                      {
                        hasRecord: s,
                        data: o.reverse(),
                      },
                      function () {
                        if (t)
                          setTimeout(function () {
                            if (l.listView) l.listView.scrollToEnd();
                          }, 10);
                      }
                    );
                    c.next = 11;
                    break;

                  case 8:
                    c.prev = 8;
                    c.t0 = c.catch(0);
                    console.error(c.t0);

                  case 11:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'deleteRecordWithId',
        value: function (t) {
          var n = this;
          if (this.props.alertOwner)
            this.props.alertOwner.alert.alert(module491.whether_to_delete_the_recorded, '', [
              {
                text: module491.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                onPress: function () {
                  n.delRecord(t);
                },
              },
            ]);
        },
      },
      {
        key: 'delRecord',
        value: function (t) {
          var o;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    s.next = 3;
                    return regeneratorRuntime.default.awrap(L.delRecord(t));

                  case 3:
                    o = s.sent;
                    this.setState({
                      error: o,
                    });
                    this.getData(false);
                    s.next = 11;
                    break;

                  case 8:
                    s.prev = 8;
                    s.t0 = s.catch(0);
                    console.error(s.t0);

                  case 11:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
      {
        key: 'robotPlayAudio',
        value: function (t) {
          var o, module4, module5, module6, module7, module9, module11, React, module12, module2048;
          return regeneratorRuntime.default.async(
            function (b) {
              for (;;)
                switch ((b.prev = b.next)) {
                  case 0:
                    if (this.pubKey) {
                      b.next = 6;
                      break;
                    }

                    b.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getRandomPubKey());

                  case 3:
                    o = b.sent;
                    this.pubKey = o.result.pub_key;
                    console.log('this.getRandomPubKey() - ' + JSON.stringify(this.pubKey));

                  case 6:
                    b.next = 8;
                    return regeneratorRuntime.default.awrap(L.getRecordData(t));

                  case 8:
                    module4 = b.sent;
                    console.log('resbase64 - ' + module4);
                    module5 = B(module481(module481(module4)).substring(0, 16));
                    console.log('aesKey - ' + module5);
                    module6 = B(module481(module4).substring(0, 16));
                    module7 = base64js.toByteArray(module4);
                    module9 = module396.encryptBytesWithAesKey(module7, module5, module6);
                    module11 = module396.encryptBytesWithPublicKey(module6.concat(module5), JSON.stringify(this.pubKey));
                    React = base64js.fromByteArray(module11.concat(module9));
                    console.log('enctyptedByteRes - ' + module9);
                    console.log('ivaesKey - ' + module6.concat(module5));
                    console.log('this.pubKey() - ' + JSON.stringify(this.pubKey));
                    console.log('encryptedAes - ' + module11);
                    console.log('encryptedAes.concat(enctyptedByteRes - ' + module11.concat(module9).len);
                    console.log('preparedData - ' + React);
                    console.log('toByteArraypreparedData - ' + base64js.toByteArray(React));
                    b.prev = 24;
                    module12 = {
                      security: {
                        cipher_suite: 1,
                      },
                      audio: React,
                    };
                    module2048 = JSON.parse(JSON.stringify(module12));
                    console.log('playAudio - ' + JSON.stringify(module2048));
                    b.next = 30;
                    return regeneratorRuntime.default.awrap(module407.default.playAudio(module2048));

                  case 30:
                    globals.showToast(module491.send_voice_success);
                    b.next = 56;
                    break;

                  case 34:
                    if (((b.prev = 34), (b.t0 = b.catch(24)), -10001 != b.t0.data.error.code)) {
                      b.next = 39;
                      break;
                    }

                    globals.showToast(module491.playing_now_please_try_again_later);
                    return b.abrupt('return');

                  case 39:
                    if (-10001 != b.t0.data.error) {
                      b.next = 43;
                      break;
                    }

                    globals.showToast(module491.playing_now_please_try_again_later);
                    return b.abrupt('return');

                  case 43:
                    if (-10017 != b.t0.data.error.code) {
                      b.next = 48;
                      break;
                    }

                    this.pubKey = null;
                    this.robotPlayAudio(t);
                    return b.abrupt('return');

                  case 48:
                    if (-10017 != b.t0.data.error) {
                      b.next = 53;
                      break;
                    }

                    this.pubKey = null;
                    this.robotPlayAudio(t);
                    return b.abrupt('return');

                  case 53:
                    globals.showToast(module491.send_voice_fail);
                    console.log('playAudio  error: ' + ('object' == typeof b.t0 ? JSON.stringify(b.t0) : b.t0));

                  case 56:
                  case 'end':
                    return b.stop();
                }
            },
            null,
            this,
            [[24, 34]],
            Promise
          );
        },
      },
    ]);
    return C;
  })(React.Component);

function B(t) {
  for (var n = [], o = 0, s = t.length; o < s; ++o) n.push(t.charCodeAt(o));

  return n;
}

exports.default = C;
C.contextType = module506.AppConfigContext;
var K = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  recordMic: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImage: {
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'stretch',
    justifyContent: 'space-between',
    top: 5,
  },
  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 40,
  },
  voiceImage: {
    height: 18,
    width: 18,
  },
  time: {
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'center',
    color: '#000000',
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 24,
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
  },
  line: {
    width: 1,
    height: 13,
    marginHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  button: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  list: {
    flex: 1,
  },
  landscapeList: {
    flex: 1,
    marginBottom: 20,
  },
  record: {
    alignSelf: 'center',
  },
  noRecord: {
    alignSelf: 'center',
    fontSize: 12,
    color: 'rgba(0,0,0,0.3)',
  },
});
