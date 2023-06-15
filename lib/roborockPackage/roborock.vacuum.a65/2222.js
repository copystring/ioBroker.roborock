var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2223 = require('./2223'),
  module2024 = require('./2024'),
  module416 = require('./416'),
  base64js = require('base64-js'),
  module400 = require('./400'),
  module391 = require('./391'),
  module2227 = require('./2227'),
  module1200 = require('./1200'),
  module387 = require('./387');

function R() {
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

var module510 = require('./510').strings,
  module499 = require('./499'),
  module393 = require('./393'),
  A = module13.NativeModules.RRRecorder,
  L = '',
  C = function (t) {
    return t ? module13.Dimensions.get('screen').width : module13.Dimensions.get('window').width;
  },
  M = (function (t) {
    module9.default(B, t);

    var n = B,
      module1200 = R(),
      M = function () {
        var t,
          o = module12.default(n);

        if (module1200) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function B(t) {
      var n;
      module6.default(this, B);
      (n = M.call(this, t)).state = {
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
      n._renderVoice = n._renderVoice.bind(module8.default(n));
      return n;
    }

    module7.default(B, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;

          if (module393.isRecordSupported()) {
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
          this.audioPlayerDidFinishPlayingListener = module13.DeviceEventEmitter.addListener(module393.audioPlayerDidFinishPlayingEvent, function (n) {
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
                    return regeneratorRuntime.default.awrap(module2024.default.stopPlay());

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
              module13.View,
              {
                style: K.record,
              },
              React.default.createElement(module2223.default, {
                style: K.recordMic,
                isLandscape: false,
                reloadData: this.reloadData.bind(this),
                alertOwner: this.props.alertOwner,
                recordToastHide: this.recordToastHide.bind(this),
                recordToastShow: this.recordToastShow.bind(this),
              })
            );
          return React.default.createElement(
            module13.View,
            {
              style: [
                K.container,
                {
                  backgroundColor: n.monitor.backgroundColor,
                },
              ],
            },
            React.default.createElement(module13.FlatList, {
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
                      width: 0.515 * C(true),
                    }
                  : {
                      width: C() > 500 ? 414 : C(),
                    },
              ],
              keyExtractor: function (t) {
                return t.id;
              },
            }),
            this.state.hasRecord
              ? null
              : React.default.createElement(
                  module13.View,
                  {
                    style: this.props.isLandscape ? K.landscapeList : K.list,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: [
                        K.noRecord,
                        {
                          color: n.monitor.tabTitleSelColor,
                        },
                      ],
                    },
                    module510.no_recording_is_available
                  )
                ),
            !this.props.isLandscape && o,
            !this.props.isLandscape && this.state.shouldShowRecordToast
              ? React.default.createElement(module2227.default, {
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
          var l = L == s.id,
            c = (this.props.isLandscape ? 0.515 * C(true) : C() > 500 ? 414 : C()) - 40,
            u = (68 * c) / 335,
            f = Math.ceil(s.duration) > 15 ? 15 : Math.ceil(s.duration),
            h = l && this.state.playing;
          return React.default.createElement(
            module13.View,
            {
              style: K.itemContainer,
            },
            React.default.createElement(
              module13.TouchableOpacity,
              module22.default({}, module391.default.getAccessibilityLabel('playVoice_' + s.id), {
                style: {
                  flex: 1,
                },
                onPress: function () {
                  L = s.id;

                  n._onPressPlayButton(s.path, s.id, l);
                },
                onLongPress: function () {
                  n.deleteRecordWithId(s.id);
                },
              }),
              React.default.createElement(
                module13.ImageBackground,
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
                  module13.View,
                  {
                    style: K.leftView,
                  },
                  h
                    ? React.default.createElement(module13.Image, {
                        style: K.voiceImage,
                        source: this.loadingImgs()[this.state.loadImgIndex],
                      })
                    : React.default.createElement(module13.Image, {
                        style: K.voiceImage,
                        source: theme.monitor.recordPlayDef,
                      }),
                  React.default.createElement(
                    module13.Text,
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
                  module13.View,
                  {
                    style: K.rightView,
                  },
                  React.default.createElement(
                    module13.Text,
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
                  React.default.createElement(module13.View, {
                    style: [
                      K.line,
                      {
                        backgroundColor: h ? 'rgba(255,255,255,0.6)' : theme.monitor.timeColor,
                      },
                    ],
                  }),
                  React.default.createElement(
                    module13.TouchableOpacity,
                    module22.default({}, module391.default.getAccessibilityLabel('sendVoiceAgain_' + s.id), {
                      hitSlop: {
                        top: 30,
                        bottom: 30,
                        left: 30,
                        right: 30,
                      },
                      onPress: function () {
                        module387.LogEventCommon('tap_send_voice_again', {
                          voiceId: s.id,
                          isPortrait: !n.props.isLandscape,
                        });
                        n.robotPlayAudio(s.id);
                      },
                    }),
                    React.default.createElement(
                      module13.Text,
                      {
                        style: [
                          K.button,
                          module13.Platform.select({
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
                      module510.send_voice_again
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
        value: function (t, n, o) {
          var l = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    if (this.state.playing) {
                      if (this.timer) clearInterval(this.timer);
                      this.setState({
                        playing: false,
                        loadImgIndex: 2,
                      });
                      module2024.default
                        .stopPlay()
                        .then(function (s) {
                          if (!o) l._startPlay(t, n);
                        })
                        .catch();
                    } else this._startPlay(t, n);

                  case 1:
                  case 'end':
                    return s.stop();
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
        value: function (t, n) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this._playAnimation();

                    this.setState({
                      playing: true,
                    });
                    o.prev = 2;
                    o.next = 5;
                    return regeneratorRuntime.default.awrap(
                      module2024.default.startPlay(t, {
                        playId: n,
                      })
                    );

                  case 5:
                    o.next = 12;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(2);
                    if (this.timer) clearInterval(this.timer);
                    console.log('Sound play error : ' + JSON.stringify(o.t0));

                  case 12:
                  case 'end':
                    return o.stop();
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
                    return regeneratorRuntime.default.awrap(module2024.default.stopPlay());

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
          var n,
            o,
            l = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(A.getRecords());

                  case 3:
                    n = c.sent;
                    o = n.length > 0;
                    this.setState(
                      {
                        hasRecord: o,
                        data: n.reverse(),
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
            this.props.alertOwner.alert.alert(module510.whether_to_delete_the_recorded, '', [
              {
                text: module510.localization_strings_Main_MainPage_11,
                onPress: function () {},
              },
              {
                text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
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
          var n;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(A.delRecord(t));

                  case 3:
                    n = o.sent;
                    this.setState({
                      error: n,
                    });
                    this.getData(false);
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.error(o.t0);

                  case 11:
                  case 'end':
                    return o.stop();
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
          var n, module22, module6, module7, module8, module9, module11, module12, React, module13;
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
                    return regeneratorRuntime.default.awrap(module416.default.getRandomPubKey());

                  case 3:
                    n = b.sent;
                    this.pubKey = n.result.pub_key;
                    console.log('this.getRandomPubKey() - ' + JSON.stringify(this.pubKey));

                  case 6:
                    b.next = 8;
                    return regeneratorRuntime.default.awrap(A.getRecordData(t));

                  case 8:
                    module22 = b.sent;
                    console.log('resbase64 - ' + module22);
                    module6 = O(module499(module499(module22)).substring(0, 16));
                    console.log('aesKey - ' + module6);
                    module7 = O(module499(module22).substring(0, 16));
                    module8 = base64js.toByteArray(module22);
                    module9 = module400.encryptBytesWithAesKey(module8, module6, module7);
                    module11 = module400.encryptBytesWithPublicKey(module7.concat(module6), JSON.stringify(this.pubKey));
                    module12 = base64js.fromByteArray(module11.concat(module9));
                    console.log('enctyptedByteRes - ' + module9);
                    console.log('ivaesKey - ' + module7.concat(module6));
                    console.log('this.pubKey() - ' + JSON.stringify(this.pubKey));
                    console.log('encryptedAes - ' + module11);
                    console.log('encryptedAes.concat(enctyptedByteRes - ' + module11.concat(module9).len);
                    console.log('preparedData - ' + module12);
                    console.log('toByteArraypreparedData - ' + base64js.toByteArray(module12));
                    b.prev = 24;
                    React = {
                      security: {
                        cipher_suite: 1,
                      },
                      audio: module12,
                    };
                    module13 = JSON.parse(JSON.stringify(React));
                    console.log('playAudio - ' + JSON.stringify(module13));
                    b.next = 30;
                    return regeneratorRuntime.default.awrap(module416.default.playAudio(module13));

                  case 30:
                    globals.showToast(module510.send_voice_success);
                    b.next = 56;
                    break;

                  case 34:
                    if (((b.prev = 34), (b.t0 = b.catch(24)), -10001 != b.t0.data.error.code)) {
                      b.next = 39;
                      break;
                    }

                    globals.showToast(module510.playing_now_please_try_again_later);
                    return b.abrupt('return');

                  case 39:
                    if (-10001 != b.t0.data.error) {
                      b.next = 43;
                      break;
                    }

                    globals.showToast(module510.playing_now_please_try_again_later);
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
                    globals.showToast(module510.send_voice_fail);
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
    return B;
  })(React.Component);

function O(t) {
  for (var n = [], o = 0, s = t.length; o < s; ++o) n.push(t.charCodeAt(o));

  return n;
}

exports.default = M;
M.contextType = module1200.AppConfigContext;
var K = module13.StyleSheet.create({
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
