require('./1888');

var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1887 = require('./1887'),
  module385 = require('./385'),
  module1889 = require('./1889'),
  module414 = require('./414'),
  module381 = require('./381'),
  module1891 = require('./1891'),
  module418 = require('./418'),
  module491 = require('./491'),
  module515 = require('./515'),
  module387 = require('./387'),
  module1894 = require('./1894');

function x() {
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

require('./1828');

require('./512');

var module1404 = require('./1404'),
  module500 = require('./500').strings,
  module1153 = require('./1153'),
  L = 0,
  C = (function (t) {
    module7.default(E, t);

    var n = E,
      module515 = x(),
      C = function () {
        var t,
          s = module11.default(n);

        if (module515) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, o);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = C.call(this, t)).dataSource = new module491.default.DataSource({
        rowHasChanged: function (t, n) {
          return t != n;
        },
        sectionHeaderHasChanged: function (t, n) {
          return t !== n;
        },
      });
      n.host = module1153.areaServerMap[module381.RobotStatusManager.sharedManager().serverCode].host;
      n.state = {
        progress: -1,
        currentPalyingVoiceId: 0,
        currentUsedVoiceId: 0,
        currentUsedVoiceVersion: 0,
        currentDownloadVoiceId: 0,
        data: {
          special: [],
          normal: [],
          factoryTest: [],
        },
        refreshing: false,
        loading: true,
        requestFailed: false,
      };
      n.downloading = false;
      n.pressTitleCount = 0;
      return n;
    }

    module5.default(E, [
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
            onPressTitle: this.onPressTitle.bind(this),
          });
          this.getInitData();
        },
      },
      {
        key: 'getInitData',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
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
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getCurrentSoundPackage());

                  case 4:
                    n.next = 6;
                    return regeneratorRuntime.default.awrap(this.fetchListData(false));

                  case 6:
                    n.next = 8;
                    return regeneratorRuntime.default.awrap(this.getProgess());

                  case 8:
                    this.timer = module1404.setInterval(this.getProgess.bind(this), 1e3);
                    this.finishLoading(false);
                    L = 0;
                    n.next = 16;
                    break;

                  case 13:
                    n.prev = 13;
                    n.t0 = n.catch(1);
                    this.retry();

                  case 16:
                  case 'end':
                    return n.stop();
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
                    return regeneratorRuntime.default.awrap(module1889.default.stopPlay());

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
        key: 'onPressTitle',
        value: function () {
          var t = this;

          if ((console.log('onPressTitle'), this.pressTitleCount++, this.pressTitleCount >= 5)) {
            this.pressTitleCount = 0;
            var n = JSON.parse(JSON.stringify(this.packageData));
            this.setState(
              {
                data: n || {},
              },
              function () {
                setTimeout(function () {
                  var n;
                  return null == t ? undefined : null == (n = t.listView) ? undefined : n.scrollToEnd();
                }, 300);
              }
            );
          }
        },
      },
      {
        key: 'getCurrentSoundPackage',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module414.default.getCurrentSoundPackage());

                  case 2:
                    t = n.sent;
                    console.log('getCurrentSoundPackage - ' + JSON.stringify(t));
                    this.setState({
                      currentUsedVoiceId: t.result[0].sid_in_use,
                      currentUsedVoiceVersion: t.result[0].sid_version,
                      refreshing: false,
                    });

                  case 5:
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
        key: 'fetchListData',
        value: function (t) {
          var n, o;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (
                      (this.setState({
                        refreshing: true,
                      }),
                      !t)
                    ) {
                      c.next = 7;
                      break;
                    }

                    c.next = 4;
                    return regeneratorRuntime.default.awrap(module1889.default.getListDataFromLocal());

                  case 4:
                    c.t0 = c.sent;
                    c.next = 10;
                    break;

                  case 7:
                    c.next = 9;
                    return regeneratorRuntime.default.awrap(module1889.default.getListDataFromServer());

                  case 9:
                    c.t0 = c.sent;

                  case 10:
                    if (((n = c.t0), !t || (n && (n.special.length || n.normal.length)))) {
                      c.next = 15;
                      break;
                    }

                    c.next = 14;
                    return regeneratorRuntime.default.awrap(this.fetchListData(false));

                  case 14:
                    return c.abrupt('return');

                  case 15:
                    this.packageData = n;
                    delete (o = JSON.parse(JSON.stringify(this.packageData))).factoryTest;
                    this.setState({
                      data: o || {},
                      refreshing: false,
                    });
                    console.log('soundPackage page list data - ' + JSON.stringify(n));

                  case 20:
                  case 'end':
                    return c.stop();
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
            s = React.default.createElement(module385.RequestRetryView, {
              onPressButton: function () {
                L = 0;
                t.getInitData();
              },
            });
          if (this.state.requestFailed) return s;
          var o = React.default.createElement(
            module12.View,
            {
              style: [
                U.containter,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module385.Spinner, null)
          );
          return this.state.loading
            ? o
            : React.default.createElement(
                module12.View,
                {
                  style: [
                    U.containter,
                    {
                      backgroundColor: n.settingBackgroundColor,
                    },
                  ],
                },
                React.default.createElement(module491.default, {
                  style: U.listView,
                  ref: function (n) {
                    return (t.listView = n);
                  },
                  showsVerticalScrollIndicator: false,
                  refreshControl: React.default.createElement(module12.RefreshControl, {
                    refreshing: this.state.refreshing,
                    onRefresh: function () {
                      return t._refresh();
                    },
                  }),
                  automaticallyAdjustContentInsets: false,
                  dataSource: this.dataSource.cloneWithRowsAndSections(this.state.data),
                  enableEmptySections: true,
                  renderSectionHeader: this._renderSectionHeader.bind(this),
                  renderHeader: this._renderHeader.bind(this),
                  renderRow: function (n, s, o) {
                    return t._renderRow(n, s, o);
                  },
                })
              );
        },
      },
      {
        key: '_renderHeader',
        value: function () {
          var t = this;
          return React.default.createElement(module1891.default, {
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
            o = module500.soundpackage_select_sound_title;
          if ('special' == n) o = module500.soundpackage_select_special_sound_title;
          else if ('factoryTest' == n) o = '\u6d4b\u8bd5\u8bed\u97f3';
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
                  U.tint,
                  {
                    color: s.soundPackage.sliderTextColor,
                    marginBottom: 10,
                    marginTop: 20,
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
        value: function (t, n, s) {
          return 'normal' == n
            ? React.default.createElement(module1894.default, {
                progress: t.voice_id == this.state.currentDownloadVoiceId ? this.state.progress : -1,
                data: t,
                rowId: s,
                showBottomLine: s != this.state.data.normal.length - 1,
                isBottomLoneLine: false,
                onPressUseButton: this._onPressUseButton.bind(this, t),
                selected: this.state.currentUsedVoiceId == t.voice_id,
                update: this.state.currentUsedVoiceId == t.voice_id && this.state.currentUsedVoiceVersion < t.version,
                playing: this.state.currentPalyingVoiceId == t.voice_id,
                borderStyle: [
                  {
                    borderTopLeftRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderTopRightRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderBottomLeftRadius: s == this.state.data.normal.length - 1 ? 8 : 0,
                  },
                  {
                    borderBottomRightRadius: s == this.state.data.normal.length - 1 ? 8 : 0,
                  },
                ],
              })
            : 'special' == n
            ? React.default.createElement(module1887.default, {
                progress: t.voice_id == this.state.currentDownloadVoiceId ? this.state.progress : -1,
                data: t,
                rowId: s,
                showTopLine: false,
                isTopLongLine: false,
                showBottomLine: s != this.state.data.special.length - 1,
                isBottomLoneLine: false,
                onPressUseButton: this._onPressUseButton.bind(this, t),
                voiceDidBeginPlay: this._voiceDidBeginPlay.bind(this),
                voiceDidFinishPlay: this._voiceDidFinishPlay.bind(this),
                selected: this.state.currentUsedVoiceId == t.voice_id,
                update: this.state.currentUsedVoiceId == t.voice_id && this.state.currentUsedVoiceVersion < t.version,
                playing: this.state.currentPalyingVoiceId == t.voice_id,
                onPressPlayError: this.onPressPlayError.bind(this),
                borderStyle: [
                  {
                    borderTopLeftRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderTopRightRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderBottomLeftRadius: s == this.state.data.special.length - 1 ? 8 : 0,
                  },
                  {
                    borderBottomRightRadius: s == this.state.data.special.length - 1 ? 8 : 0,
                  },
                ],
              })
            : 'factoryTest' == n
            ? React.default.createElement(module1894.default, {
                progress: t.voice_id == this.state.currentDownloadVoiceId ? this.state.progress : -1,
                data: t,
                rowId: s,
                showBottomLine: s != this.state.data.normal.length - 1,
                isBottomLoneLine: false,
                onPressUseButton: this._onPressUseButton.bind(this, t),
                selected: this.state.currentUsedVoiceId == t.voice_id,
                update: this.state.currentUsedVoiceId == t.voice_id && this.state.currentUsedVoiceVersion < t.version,
                playing: this.state.currentPalyingVoiceId == t.voice_id,
                borderStyle: [
                  {
                    borderTopLeftRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderTopRightRadius: 0 == s ? 8 : 0,
                  },
                  {
                    borderBottomLeftRadius: s == this.state.data.normal.length - 1 ? 8 : 0,
                  },
                  {
                    borderBottomRightRadius: s == this.state.data.normal.length - 1 ? 8 : 0,
                  },
                ],
              })
            : undefined;
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
          var n, o;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (!this.downloading) {
                      c.next = 3;
                      break;
                    }

                    globals.showToast(module500.localization_strings_Setting_SoundPackagePage_4);
                    return c.abrupt('return');

                  case 3:
                    this.downloading = true;
                    c.prev = 4;
                    n = t.default
                      ? {
                          sid: t.voice_id,
                          default: t.default,
                          sver: t.version,
                        }
                      : {
                          sid: t.voice_id,
                          url:
                            9999 != t.voice_id
                              ? 'https://' + this.host + t.voice_pkg_url.split('.com')[1]
                              : 'https://' + this.host + t.voice_pkg_url.split('.com')[1].split('package/')[0] + 'package/',
                          md5: t.voice_pkg_md5,
                          sver: t.version,
                        };
                    this.setState({
                      progress: 0,
                      currentDownloadVoiceId: t.voice_id,
                    });
                    c.next = 9;
                    return regeneratorRuntime.default.awrap(module414.default.setSoundPackage(n));

                  case 9:
                    o = c.sent;
                    console.log('setSoundPackage -para - ' + JSON.stringify(n) + ' - res - ' + JSON.stringify(o));
                    module387.LogEventStatus('sound_package_status', n);
                    this.timer = module1404.setInterval(this.getProgess.bind(this), 1e3);
                    c.next = 19;
                    break;

                  case 15:
                    c.prev = 15;
                    c.t0 = c.catch(4);
                    this.downloading = false;
                    console.log(c.t0);

                  case 19:
                  case 'end':
                    return c.stop();
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
          var t, n, o, c, u, l, h, React;
          return regeneratorRuntime.default.async(
            function (v) {
              for (;;)
                switch ((v.prev = v.next)) {
                  case 0:
                    v.prev = 0;
                    v.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getSoundPackageProgress());

                  case 3:
                    if (
                      ((t = v.sent),
                      console.log('progess - ' + JSON.stringify(t)),
                      (n = t.result[0]),
                      (o = n.progress),
                      (c = n.state),
                      (u = n.error),
                      (l = n.sid_in_progress),
                      (h = l > 0) &&
                        ((this.downloading = true),
                        this.setState({
                          progress: o / 100,
                          currentDownloadVoiceId: l,
                        })),
                      4 != c)
                    ) {
                      v.next = 16;
                      break;
                    }

                    module1404.clearInterval(this.timer);
                    this.downloading = false;
                    this.setState({
                      progress: -1,
                      currentDownloadVoiceId: -1,
                    });
                    React = module500.sound_package_installed_failed;
                    if (!(13 != u && 2 != u)) React = module500.sound_package_download_failed;
                    globals.showToast(React);
                    return v.abrupt('return');

                  case 16:
                    if (!(100 != o && 3 != c && h)) {
                      module1404.clearInterval(this.timer);
                      this.downloading = false;

                      if (this.state.currentDownloadVoiceId > 0) {
                        this.setState({
                          progress: -1,
                        });
                        if (9999 == this.state.currentDownloadVoiceId) globals.showToast('\u4e0b\u8f7d\u6210\u529f');
                        else
                          this.setState({
                            currentUsedVoiceId: this.state.currentDownloadVoiceId,
                            currentUsedVoiceVersion: 99999,
                          });
                        module381.RobotStatusManager.sharedManager().soundPackageShouldShowRedDot = false;
                        module12.DeviceEventEmitter.emit(module418.NotificationKeys.RedDotDidChange, {
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

          if (L < 3) {
            L++;
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
          globals.showToast(module500.robot_communication_exception);
        },
      },
    ]);
    return E;
  })(React.Component);

exports.default = C;
C.contextType = module515.AppConfigContext;
var U = module12.StyleSheet.create({
  containter: {
    flex: 1,
    marginTop: module1153.NavigationBarHeight,
  },
  tint: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.4)',
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  listView: {
    marginBottom: 20,
    marginHorizontal: 15,
  },
});
