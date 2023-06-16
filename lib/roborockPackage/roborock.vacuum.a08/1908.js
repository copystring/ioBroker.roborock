require('./1910');

var regeneratorRuntime = require('regenerator-runtime'),
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
    var s = b(n);
    if (s && s.has(t)) return s.get(t);
    var o = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(o, c, l);
        else o[c] = t[c];
      }

    o.default = t;
    if (s) s.set(t, o);
    return o;
  })(require('react')),
  module12 = require('./12'),
  module1909 = require('./1909'),
  module381 = require('./381'),
  module1911 = require('./1911'),
  module407 = require('./407'),
  module377 = require('./377'),
  module1913 = require('./1913'),
  module411 = require('./411'),
  module483 = require('./483'),
  module506 = require('./506'),
  module383 = require('./383');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    s = new WeakMap();
  return (b = function (t) {
    return t ? s : n;
  })(t);
}

function D() {
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

require('./1853');

require('./503');

var module1249 = require('./1249'),
  module491 = require('./491').strings,
  module936 = require('./936'),
  R = 0,
  B = (function (t) {
    module7.default(O, t);

    var module506 = O,
      b = D(),
      B = function () {
        var t,
          n = module11.default(module506);

        if (b) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var n;
      module4.default(this, O);
      (n = B.call(this, t)).datazSource = new module483.default.DataSource({
        rowHasChanged: function (t, n) {
          return t != n;
        },
        sectionHeaderHasChanged: function (t, n) {
          return t !== n;
        },
      });
      n.host = module936.areaServerMap[module377.RobotStatusManager.sharedManager().serverCode].host;
      n.state = {
        progress: -1,
        currentPalyingVoiceId: 0,
        currentUsedVoiceId: 0,
        currentUsedVoiceVersion: 0,
        currentDownloadVoiceId: 0,
        data: {
          special: [],
          normal: [],
        },
        dataSpecial: [],
        refreshing: false,
        loading: true,
        requestFailed: false,
      };
      n.downloading = false;
      return n;
    }

    module5.default(O, [
      {
        key: 'componentDidMount',
        value: function () {
          this.getInitData();
        },
      },
      {
        key: 'getInitData',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    this.setState(
                      {
                        loading: true,
                        requestFailed: false,
                      },
                      function () {
                        if (t.loadingView) t.loadingView.showWithText();
                      }
                    );
                    s.prev = 1;
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(this.getCurrentSoundPackage());

                  case 4:
                    s.next = 6;
                    return regeneratorRuntime.default.awrap(this.fetchListData(true));

                  case 6:
                    s.next = 8;
                    return regeneratorRuntime.default.awrap(this.getProgess());

                  case 8:
                    this.timer = module1249.setInterval(this.getProgess.bind(this), 1e3);
                    this.finishLoading(false);
                    R = 0;
                    s.next = 16;
                    break;

                  case 13:
                    s.prev = 13;
                    s.t0 = s.catch(1);
                    this.retry();

                  case 16:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[1, 13]],
            Promise
          );
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
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module1911.default.stopPlay());

                  case 2:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'getCurrentSoundPackage',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.next = 2;
                    return regeneratorRuntime.default.awrap(module407.default.getCurrentSoundPackage());

                  case 2:
                    t = s.sent;
                    console.log('getCurrentSoundPackage - ' + JSON.stringify(t));
                    this.setState({
                      currentUsedVoiceId: t.result[0].sid_in_use,
                      currentUsedVoiceVersion: t.result[0].sid_version,
                      refreshing: false,
                    });

                  case 5:
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
        key: 'fetchListData',
        value: function (t) {
          var s;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (
                      (this.setState({
                        refreshing: true,
                      }),
                      !t)
                    ) {
                      o.next = 7;
                      break;
                    }

                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module1911.default.getListDataFromLocal());

                  case 4:
                    o.t0 = o.sent;
                    o.next = 10;
                    break;

                  case 7:
                    o.next = 9;
                    return regeneratorRuntime.default.awrap(module1911.default.getListDataFromServer());

                  case 9:
                    o.t0 = o.sent;

                  case 10:
                    if (((s = o.t0), !t || (s && (s.special.length || s.normal.length)))) {
                      o.next = 15;
                      break;
                    }

                    o.next = 14;
                    return regeneratorRuntime.default.awrap(this.fetchListData(false));

                  case 14:
                    return o.abrupt('return');

                  case 15:
                    this.setState({
                      data: s || {},
                      refreshing: false,
                    });
                    console.log('soundPackage page list data - ' + JSON.stringify(s));

                  case 17:
                  case 'end':
                    return o.stop();
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            s = React.default.createElement(module381.RequestRetryView, {
              onPressButton: function () {
                R = 0;
                t.getInitData();
              },
            });
          if (this.state.requestFailed) return s;
          var o = React.default.createElement(
            module12.View,
            {
              style: [
                L.containter,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module381.Spinner, null)
          );
          return this.state.loading
            ? o
            : React.default.createElement(
                module12.View,
                {
                  style: [
                    L.containter,
                    {
                      backgroundColor: n.settingBackgroundColor,
                    },
                  ],
                },
                React.default.createElement(module483.default, {
                  style: L.listView,
                  showsVerticalScrollIndicator: false,
                  refreshControl: React.default.createElement(module12.RefreshControl, {
                    refreshing: this.state.refreshing,
                    onRefresh: function () {
                      return t._refresh();
                    },
                  }),
                  automaticallyAdjustContentInsets: false,
                  dataSource: this.datazSource.cloneWithRowsAndSections(this.state.data),
                  enableEmptySections: true,
                  renderSectionHeader: this._renderSectionHeader.bind(this),
                  renderHeader: this._renderHeader.bind(this),
                  renderRow: function (n, s, o) {
                    return t._renderRow(n, o);
                  },
                })
              );
        },
      },
      {
        key: '_renderHeader',
        value: function () {
          var t = this;
          return React.default.createElement(module1913.default, {
            ref: function (n) {
              return (t.volumeAdjustView = n);
            },
          });
        },
      },
      {
        key: '_renderSectionHeader',
        value: function (t, n) {
          if (!t || !t.length) return React.default.createElement(module12.View, null);
          var s = this.context.theme,
            o = module491.soundpackage_select_sound_title;
          if ('special' == n) o = module491.soundpackage_select_special_sound_title;
          return React.default.createElement(
            module12.View,
            {
              style: {
                backgroundColor: s.settingBackgroundColor,
              },
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  L.tint,
                  {
                    color: s.soundPackage.sliderTextColor,
                    marginBottom: 5,
                    marginTop: 15,
                  },
                ],
              },
              o
            )
          );
        },
      },
      {
        key: '_renderRow',
        value: function (t, n) {
          return React.default.createElement(module1909.default, {
            progress: t.voice_id == this.state.currentDownloadVoiceId ? this.state.progress : -1,
            data: t,
            rowId: n,
            showTopLine: 0 == n,
            isTopLongLine: 0 == n,
            showBottomLine: true,
            isBottomLoneLine: (n == this.state.data.special.length - 1 && this.isSpecialVoice(t)) || n == this.state.data.normal.length - 1,
            onPressUseButton: this._onPressUseButton.bind(this, t),
            voiceDidBeginPlay: this._voiceDidBeginPlay.bind(this),
            voiceDidFinishPlay: this._voiceDidFinishPlay.bind(this),
            selected: this.state.currentUsedVoiceId == t.voice_id,
            update: this.state.currentUsedVoiceId == t.voice_id && this.state.currentUsedVoiceVersion < t.version,
            playing: this.state.currentPalyingVoiceId == t.voice_id,
            onPressPlayError: this.onPressPlayError.bind(this),
          });
        },
      },
      {
        key: 'isSpecialVoice',
        value: function (t) {
          return t.voice_id > 2e3;
        },
      },
      {
        key: '_refresh',
        value: function () {
          this.getCurrentSoundPackage();
          this.fetchListData(false);
          this.volumeAdjustView.getInitialValue();
        },
      },
      {
        key: '_onPressUseButton',
        value: function (t) {
          var module4, o;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!this.downloading) {
                      u.next = 3;
                      break;
                    }

                    globals.showToast(module491.localization_strings_Setting_SoundPackagePage_4);
                    return u.abrupt('return');

                  case 3:
                    this.downloading = true;
                    u.prev = 4;
                    module4 = t.default
                      ? {
                          sid: t.voice_id,
                          default: t.default,
                          sver: t.version,
                        }
                      : {
                          sid: t.voice_id,
                          url: 'https://' + this.host + t.voice_pkg_url.split('.com')[1],
                          md5: t.voice_pkg_md5,
                          sver: t.version,
                        };
                    this.setState({
                      progress: 0,
                      currentDownloadVoiceId: t.voice_id,
                    });
                    u.next = 9;
                    return regeneratorRuntime.default.awrap(module407.default.setSoundPackage(module4));

                  case 9:
                    o = u.sent;
                    console.log('setSoundPackage -para - ' + JSON.stringify(module4) + ' - res - ' + JSON.stringify(o));
                    module383.LogEventStatus('sound_package_status', module4);
                    this.timer = module1249.setInterval(this.getProgess.bind(this), 1e3);
                    u.next = 19;
                    break;

                  case 15:
                    u.prev = 15;
                    u.t0 = u.catch(4);
                    this.downloading = false;
                    console.log(u.t0);

                  case 19:
                  case 'end':
                    return u.stop();
                }
            },
            null,
            this,
            [[4, 15]],
            Promise
          );
        },
      },
      {
        key: 'getProgess',
        value: function () {
          var t, s, o, u, c, l, f, module1909;
          return regeneratorRuntime.default.async(
            function (v) {
              for (;;)
                switch ((v.prev = v.next)) {
                  case 0:
                    v.prev = 0;
                    v.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getSoundPackageProgress());

                  case 3:
                    if (
                      ((t = v.sent),
                      console.log('progess - ' + JSON.stringify(t)),
                      (s = t.result[0]),
                      (o = s.progress),
                      (u = s.state),
                      (c = s.error),
                      (l = s.sid_in_progress),
                      (f = l > 0) &&
                        ((this.downloading = true),
                        this.setState({
                          progress: o / 100,
                          currentDownloadVoiceId: l,
                        })),
                      4 != u)
                    ) {
                      v.next = 16;
                      break;
                    }

                    module1249.clearInterval(this.timer);
                    this.downloading = false;
                    this.setState({
                      progress: -1,
                      currentDownloadVoiceId: -1,
                    });
                    module1909 = module491.sound_package_installed_failed;
                    if (!(13 != c && 2 != c)) module1909 = module491.sound_package_download_failed;
                    globals.showToast(module1909);
                    return v.abrupt('return');

                  case 16:
                    if (!(100 != o && 3 != u && f)) {
                      module1249.clearInterval(this.timer);
                      this.downloading = false;

                      if (this.state.currentDownloadVoiceId > 0) {
                        this.setState({
                          progress: -1,
                          currentUsedVoiceId: this.state.currentDownloadVoiceId,
                          currentUsedVoiceVersion: 99999,
                        });
                        module377.RobotStatusManager.sharedManager().soundPackageShouldShowRedDot = false;
                        module12.DeviceEventEmitter.emit(module411.NotificationKeys.RedDotDidChange, {
                          name: 'update_sound_package',
                          value: false,
                        });
                      }
                    }

                    v.next = 22;
                    break;

                  case 19:
                    v.prev = 19;
                    v.t0 = v.catch(0);
                    console.log('progess error - ' + JSON.stringify(v.t0));

                  case 22:
                  case 'end':
                    return v.stop();
                }
            },
            null,
            this,
            [[0, 19]],
            Promise
          );
        },
      },
      {
        key: '_voiceDidBeginPlay',
        value: function (t) {
          this.setState({
            currentPalyingVoiceId: t,
          });
        },
      },
      {
        key: '_voiceDidFinishPlay',
        value: function (t) {
          this.setState({
            currentPalyingVoiceId: 0,
          });
        },
      },
      {
        key: 'finishLoading',
        value: function (t) {
          this.setState({
            requestFailed: t,
          });
          if (this.state.loading)
            this.setState({
              loading: false,
            });
        },
      },
      {
        key: 'retry',
        value: function () {
          var t = this;

          if (R < 3) {
            R++;
            setTimeout(function () {
              t.getInitData();
            }, 1e3);
          } else
            this.setState({
              refreshing: false,
              requestFailed: true,
            });
        },
      },
      {
        key: 'onPressPlayError',
        value: function () {
          globals.showToast(module491.robot_communication_exception);
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = B;
B.contextType = module506.AppConfigContext;
var L = module12.StyleSheet.create({
  containter: {
    flex: 1,
    marginTop: module936.NavigationBarHeight,
  },
  tint: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.4)',
    marginHorizontal: 20,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  listView: {
    marginBottom: 20,
  },
});
