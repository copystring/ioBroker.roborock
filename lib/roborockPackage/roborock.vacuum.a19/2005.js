require('./411');

require('./386');

require('./377');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
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
    var n = T(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
        else l[u] = t[u];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module407 = require('./407'),
  module390 = require('./390'),
  module506 = require('./506');

function T(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (T = function (t) {
    return t ? n : o;
  })(t);
}

function M() {
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
  module385 = require('./385'),
  k = 0,
  b = (function (t) {
    module7.default(C, t);

    var module506 = C,
      T = M(),
      b = function () {
        var t,
          o = module11.default(module506);

        if (T) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var o;
      module4.default(this, C);
      (o = b.call(this, t)).state = {
        carpetPressurizeSwitch: false,
        titleSelected: module390.default.sharedCache().washTowelMode,
        loading: true,
        requestFailed: false,
        refreshing: false,
      };
      return o;
    }

    module5.default(C, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    this.props.navigation.setParams({
                      title: module491.wash_towel_title,
                    });
                    this.initData(false);

                  case 2:
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
        key: 'getMenus',
        value: function () {
          var t = this;
          return [
            {
              title: module491.wash_towel_mode_title_1,
              funcId: 'wash_towel_mode_1',
              onPress: function () {
                return t.onChangeWashTowelMode(module385.WashTowelModeMap.WashTowelModeQuick);
              },
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeQuick,
              shouldShowRightArrow: false,
            },
            {
              title: module491.wash_towel_mode_title_2,
              funcId: 'wash_towel_mode_2',
              onPress: function () {
                return t.onChangeWashTowelMode(module385.WashTowelModeMap.WashTowelModeDaily);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeDaily,
              shouldShowRightArrow: false,
            },
            {
              title: module491.wash_towel_mode_title_3,
              funcId: 'wash_towel_mode_3',
              onPress: function () {
                return t.onChangeWashTowelMode(module385.WashTowelModeMap.WashTowelModeDeep);
              },
              visible: true,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              selected: this.state.titleSelected == module385.WashTowelModeMap.WashTowelModeDeep,
              shouldShowRightArrow: false,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme,
            l = React.default.createElement(module381.RequestRetryView, {
              onPressButton: function () {
                k = 0;
                t.initData(false);
              },
            });
          if (this.state.requestFailed) return l;
          var s = React.default.createElement(
            module12.View,
            {
              style: [
                x.containterView,
                {
                  backgroundColor: o.settingBackgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ],
            },
            React.default.createElement(module381.Spinner, null)
          );
          if (this.state.loading) return s;
          var u = this.getMenus().map(function (t, o) {
            return t.visible
              ? t.title
                ? React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, t, {
                      key: o,
                      fontSize: 16,
                      rightImgStyle: x.rightImgStyle,
                      bottomDetailWidth: module12.Dimensions.get('window').width - 60,
                      rightCenter: false,
                      isDetailCenter: false,
                      rightSrc: null,
                    })
                  )
                : t.sectionTitle.length > 0 &&
                  React.default.createElement(
                    module12.Text,
                    {
                      style: x.sectionTitle,
                      key: o,
                    },
                    t.sectionTitle
                  )
              : null;
          });
          return React.default.createElement(
            module12.View,
            {
              style: [
                x.containter,
                {
                  backgroundColor: o.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.ScrollView,
              {
                style: x.containterScroll,
                showsVerticalScrollIndicator: false,
                refreshControl: React.default.createElement(module12.RefreshControl, {
                  refreshing: this.state.refreshing,
                  onRefresh: function () {
                    k = 0;
                    t.initData(true);
                  },
                }),
              },
              React.default.createElement(module12.View, {
                style: x.section,
              }),
              React.default.createElement(
                module12.View,
                {
                  style: x.infoTextView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      x.infoText,
                      {
                        color: this.context.theme.settingListItem.detailColor,
                      },
                    ],
                  },
                  module491.wash_towel_mode_title
                )
              ),
              u
            )
          );
        },
      },
      {
        key: 'initData',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.setState({
                      loading: !t,
                      requestFailed: false,
                      refreshing: t,
                    });
                    n.prev = 1;
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(this.getWashTowelModeStatus());

                  case 4:
                    this.setState({
                      refreshing: false,
                    });
                    this.finishLoading(false);
                    k = 0;
                    n.next = 13;
                    break;

                  case 9:
                    n.prev = 9;
                    n.t0 = n.catch(1);
                    console.log('initData - ' + JSON.stringify(n.t0));
                    this.retry(t);

                  case 13:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[1, 9]],
            Promise
          );
        },
      },
      {
        key: 'retry',
        value: function (t) {
          var o = this;

          if (k < 3) {
            k++;
            setTimeout(function () {
              console.warn('retryTimes:' + k);
              o.initData(t);
            }, 1e3);
          } else
            this.setState({
              requestFailed: true,
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
        key: 'onChangeWashTowelMode',
        value: function (t) {
          var module21, l;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    module21 = this.state.mode;
                    this.setState({
                      titleSelected: t,
                    });
                    s.prev = 2;
                    s.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setWashTowelParams(t));

                  case 5:
                    l = s.sent;
                    module390.default.sharedCache().washTowelMode = t;
                    console.log('onChangeWashTowelMode: ' + JSON.stringify(l));
                    s.next = 15;
                    break;

                  case 10:
                    s.prev = 10;
                    s.t0 = s.catch(2);
                    globals.showToast(module491.robot_communication_exception);
                    this.setState({
                      titleSelected: module21,
                    });
                    console.log(s.t0);

                  case 15:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[2, 10]],
            Promise
          );
        },
      },
      {
        key: 'getWashTowelModeStatus',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getWashTowel());

                  case 3:
                    t = n.sent;
                    console.log('getWashTowelModeStatus: ' + JSON.stringify(t));
                    this.setState({
                      titleSelected: t.result.mode,
                    });
                    n.next = 12;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    globals.showToast(module491.robot_communication_exception);
                    console.log(n.t0);

                  case 12:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            [[0, 8]],
            Promise
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = b;
b.contextType = module506.AppConfigContext;
var x = module12.StyleSheet.create({
  containterView: {
    flex: 1,
  },
  containter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containterScroll: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 65,
  },
  infoTextView: {
    backgroundColor: 'transparent',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
  },
  rightImgStyle: {
    width: 22,
    height: 22,
    marginTop: -5,
  },
  ignoreCarpetStyle: {
    position: 'absolute',
    minWidth: 0,
    minHeight: 0,
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 30,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
  },
  section: {
    paddingVertical: 7,
  },
});
