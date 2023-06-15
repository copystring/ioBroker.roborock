var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module385 = require('./385'),
  React = require('react'),
  module13 = require('./13'),
  module2012 = require('./2012'),
  module381 = require('./381'),
  module416 = require('./416'),
  module1193 = require('./1193');

function y() {
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

var k = (function (t) {
  module9.default(b, t);

  var module1193 = b,
    k = y(),
    I = function () {
      var t,
        n = module12.default(module1193);

      if (k) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function b(t) {
    var n;
    module6.default(this, b);
    (n = I.call(this, t)).actions = [x.CN, x.TW, x.US, x.DE, x.KR, x.RU, x.JP];
    n.actionSheetView = null;
    n.state = {
      items: [],
      location: n.deviceLocation,
      showInputDialog: false,
      volume: null,
      currentUsedVoiceId: null,
      currentUsedVoiceVersion: null,
    };
    return n;
  }

  module7.default(b, [
    {
      key: 'componentDidMount',
      value: function () {
        this.configNavigationBar();
        this.fetchSoundPackageList(this.deviceLocation);
        this.getVolume();
      },
    },
    {
      key: 'configNavigationBar',
      value: function () {
        this.props.navigation.setParams({
          title: '\u8bed\u97f3\u5305\u6d4b\u8bd5',
        });
      },
    },
    {
      key: 'getVolume',
      value: function () {
        var t;
        return regeneratorRuntime.default.async(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  n.next = 2;
                  return regeneratorRuntime.default.awrap(module416.default.getSoundVolume());

                case 2:
                  t = n.sent;
                  this.setState({
                    volume: parseInt(t.result[0]),
                  });

                case 4:
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
      key: 'render',
      value: function () {
        var t,
          n,
          l,
          s,
          u,
          c = this,
          h = {
            marginVertical: 10,
            marginHorizontal: 20,
            color: this.context.theme.mainTextColor,
          };
        return React.default.createElement(
          module13.View,
          {
            style: {
              flex: 1,
              backgroundColor: this.context.theme.pageBackgroundColor,
            },
          },
          React.default.createElement(module385.SettingListItemView, {
            title: '\u97f3\u91cf\u8bbe\u7f6e',
            detail: '' + (null == this.state.volume ? '\u672a\u83b7\u53d6\u5230\u673a\u5668\u97f3\u91cf' : this.state.volume),
            shouldShowRightArrow: true,
            visible: true,
            onPress: function () {
              c.setState({
                showInputDialog: true,
              });
            },
          }),
          React.default.createElement(module385.SettingListItemView, {
            title: '\u5730\u533a\u9009\u62e9',
            detail: this.state.location,
            shouldShowRightArrow: true,
            visible: true,
            shouldShowBottomLine: false,
            onPress: function () {
              var t;
              if (!(null == (t = c.actionSheetView) || null == t.show)) t.show();
            },
          }),
          this.deviceLocation == this.state.location &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                module13.Text,
                {
                  style: h,
                },
                '\u5f53\u524d\u8bed\u97f3'
              ),
              React.default.createElement(module385.SettingListItemView, {
                title:
                  null !=
                  (t =
                    null ==
                    (n = this.state.items.find(function (t) {
                      return t.voice_id == c.state.currentUsedVoiceId;
                    }))
                      ? undefined
                      : n.voice_title)
                    ? t
                    : 'Unknown',
                detail:
                  '\u672c\u5730\u7248\u672c' +
                  (null != (l = this.state.currentUsedVoiceVersion) ? l : 'Unknown') +
                  ' \uff5c \u670d\u52a1\u5668\u7248\u672c' +
                  (null !=
                  (s =
                    null ==
                    (u = this.state.items.find(function (t) {
                      return t.voice_id == c.state.currentUsedVoiceId;
                    }))
                      ? undefined
                      : u.version)
                    ? s
                    : 'Unknown'),
                detailWidth: 300,
                shouldShowRightArrow: false,
                visible: true,
                shouldShowBottomLine: false,
              })
            ),
          this.state.items.length > 0
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(
                  module13.Text,
                  {
                    style: h,
                  },
                  '\u53ef\u5207\u6362\u8bed\u97f3'
                ),
                React.default.createElement(
                  module13.ScrollView,
                  {
                    contentContainerStyle: {
                      paddingBottom: 20,
                    },
                  },
                  this.state.items.map(function (t, n) {
                    return React.default.createElement(module385.SettingListItemView, {
                      title: t.voice_title,
                      detail: '\u670d\u52a1\u5668\u7248\u672c' + t.version,
                      detailWidth: 300,
                      shouldShowRightArrow: false,
                      visible: true,
                      shouldShowBottomLine: n != c.state.items.length - 1,
                    });
                  })
                )
              )
            : React.default.createElement(
                module13.Text,
                {
                  style: h,
                },
                '\u65e0\u53ef\u5207\u6362\u8bed\u97f3'
              ),
          React.default.createElement(module385.InputDialog, {
            visible: this.state.showInputDialog,
            title: '\u97f3\u91cf\u8bbe\u7f6e',
            inputPlaceholder: '\u8bf7\u8f93\u5165\u97f3\u91cf: 0-100',
            inputDefaultValue: null == this.state.volume ? '\u6682\u672a\u83b7\u53d6\u5230\u8bbe\u5907\u97f3\u91cf' : this.state.volume,
            onPressConfirmButton: function (t) {
              var n;
              return regeneratorRuntime.default.async(
                function (l) {
                  for (;;)
                    switch ((l.prev = l.next)) {
                      case 0:
                        if (
                          (c.setState({
                            showInputDialog: false,
                          }),
                          !((n = parseInt(t).toFixed(0)) < 0 || n > 100))
                        ) {
                          l.next = 5;
                          break;
                        }

                        globals.Toast.show('\u97f3\u91cf\u8303\u56f4\u4e3a0-100');
                        return l.abrupt('return');

                      case 5:
                        l.prev = 5;
                        l.next = 8;
                        return regeneratorRuntime.default.awrap(module416.default.setSoundVolume(n));

                      case 8:
                        c.setState({
                          volume: n,
                        });
                        globals.showToast('\u8bbe\u7f6e\u6210\u529f');
                        l.next = 15;
                        break;

                      case 12:
                        l.prev = 12;
                        l.t0 = l.catch(5);
                        globals.showToast('\u8bbe\u7f6e\u5931\u8d25');

                      case 15:
                      case 'end':
                        return l.stop();
                    }
                },
                null,
                null,
                [[5, 12]],
                Promise
              );
            },
            onPressCancelButton: function () {
              return c.setState({
                showInputDialog: false,
              });
            },
          }),
          React.default.createElement(module385.ActionSheetView, {
            ref: function (t) {
              return (c.actionSheetView = t);
            },
            enabled: true,
            mode: 'action',
            actions: this.actions,
            didSelectRow: function (t) {
              var n;
              if (!(null == (n = c.actionSheetView) || null == n.hide)) n.hide();
              c.fetchSoundPackageList(c.actions[t]);
            },
            onPressCancel: function () {
              var t;
              if (!(null == (t = c.actionSheetView) || null == t.hide)) t.hide();
            },
          })
        );
      },
    },
    {
      key: 'fetchSoundPackageList',
      value: function (t) {
        var l,
          s = this;
        return regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  u.next = 2;
                  return regeneratorRuntime.default.awrap(module416.default.getCurrentSoundPackage());

                case 2:
                  l = u.sent;
                  console.log('getCurrentSoundPackage - ' + JSON.stringify(l));
                  this.setState({
                    currentUsedVoiceId: l.result[0].sid_in_use,
                    currentUsedVoiceVersion: l.result[0].sid_version,
                  });
                  module2012.default
                    .getListDataFromServer(t)
                    .then(function (o) {
                      var l,
                        u,
                        c = null != (l = null == o ? undefined : o.normal) ? l : [],
                        h = null != (u = null == o ? undefined : o.special) ? u : [];
                      c.push.apply(c, module31.default(h));
                      var f = c.map(function (t) {
                        return new P(t);
                      });
                      s.setState({
                        items: f,
                        location: t,
                      });
                      globals.showToast('\u83b7\u53d6\u8bed\u97f3\u5305\u914d\u7f6e\u6210\u529f');
                    })
                    .catch(function (t) {
                      globals.showToast('\u83b7\u53d6\u8bed\u97f3\u5305\u914d\u7f6e\u5931\u8d25');
                    });

                case 6:
                case 'end':
                  return u.stop();
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
      key: 'deviceLocation',
      get: function () {
        var t = module381.RSM.deviceLocation;
        return 'cn' == t ? x.CN : t;
      },
    },
  ]);
  return b;
})(React.default.Component);

exports.default = k;
k.contextType = module1193.AppConfigContext;

var x = {
    CN: 'prc',
    TW: 'tw',
    US: 'us',
    DE: 'de',
    KR: 'kr',
    RU: 'ru',
    JP: 'jp',
  },
  P = function t(n) {
    module6.default(this, t);
    this.voice_id = n.voice_id;
    this.applicable = n.applicable;
    this.lang = n.lang;
    this.voice_pri = n.voice_pri;
    this.voice_title = n.voice_title;
    this.voice_sub_title = n.voice_sub_title;
    this.picUrl = n.picUrl;
    this.uploadTime = n.uploadTime;
    this.version = n.version;
    this.voice_pkg_url = n.voice_pkg_url;
    this.bg_pic = n.bg_pic;
    this.voice_pre_listen = n.voice_pre_listen;
    this.voice_pkg_md5 = n.voice_pkg_md5;
  };

exports.SoundItem = P;
