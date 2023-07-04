require('./387');

require('./407');

require('./377');

require('./1926');

require('./390');

var module21 = require('./21'),
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
    var o = w(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, s, c);
        else l[s] = t[s];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module1363 = require('./1363'),
  module411 = require('./411'),
  module386 = require('./386'),
  module506 = require('./506'),
  module383 = require('./383');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

function V() {
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

require('./936');

var module491 = require('./491').strings,
  module385 = require('./385'),
  T = (function (t) {
    module7.default(C, t);

    var module506 = C,
      w = V(),
      T = function () {
        var t,
          n = module11.default(module506);

        if (w) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = T.call(this, t)).state = {
        titleSelected: module1363.default.realVideoSetting,
      };
      n.isChanging = false;
      return n;
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
          this.props.navigation.setParams({
            title: module491.realtime_video_title,
          });
        },
      },
      {
        key: 'getMenus',
        value: function () {
          var t = this;
          return [
            {
              title: module491.realtime_video_title_1,
              funcId: 'video_setting_1',
              bottomDetail: module491.realtime_video_sub_title_3_1,
              onPress: function () {
                return t.onChangeMode(module385.VideoSettingMap().VideoSettingNotDisturb);
              },
              visible: module386.default.isSupportDisturbInVideoSetting(),
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.VideoSettingMap().VideoSettingNotDisturb,
              shouldShowRightArrow: false,
              rightSrc: null,
            },
            {
              title: module491.realtime_video_title_2,
              funcId: 'video_setting_2',
              bottomDetail: '1.' + module491.realtime_video_sub_title_3_1 + '\n2.' + module491.realtime_video_sub_title_3_2 + '\n3.' + module491.realtime_video_sub_title_3_3,
              onPress: function () {
                return t.onChangeMode(module385.VideoSettingMap().VideoSettingLightlyDisturb);
              },
              visible: module386.default.isSupportDisturbInVideoSetting(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module385.VideoSettingMap().VideoSettingLightlyDisturb,
              shouldShowRightArrow: false,
              rightSrc: null,
            },
            {
              title: module491.realtime_video_title_3,
              funcId: 'video_setting_3',
              bottomDetail:
                '1.' +
                module491.realtime_video_sub_title_3_1 +
                '\n2.' +
                module491.realtime_video_sub_title_3_2 +
                '\n3.' +
                module491.realtime_video_sub_title_3_3 +
                '\n4.' +
                module491.realtime_video_sub_title_3_4,
              onPress: function () {
                return t.onChangeMode(module385.VideoSettingMap().VideoSettingStrongReminder);
              },
              visible: true,
              shouldShowTopLongLine: !module386.default.isSupportDisturbInVideoSetting(),
              shouldShowBottomLine: false,
              shouldShowBottomLongLine: true,
              selected: this.state.titleSelected == module385.VideoSettingMap().VideoSettingStrongReminder,
              shouldShowRightArrow: false,
              rightSrc: null,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            o = this.getMenus().map(function (t, o) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, t, {
                        key: o,
                        fontSize: 16,
                        rightImgStyle: D.rightImgStyle,
                        bottomDetailWidth: module12.Dimensions.get('window').width - 40,
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: D.sectionTitle,
                        key: o,
                      },
                      t.sectionTitle
                    )
                : null;
            });
          return React.default.createElement(
            module12.ScrollView,
            {
              style: [
                D.containter,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
              showsVerticalScrollIndicator: false,
            },
            React.default.createElement(
              module12.View,
              {
                style: D.containter,
              },
              React.default.createElement(
                module12.View,
                {
                  style: D.infoTextView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      D.infoText,
                      {
                        color: t.settingListItem.detailColor,
                      },
                    ],
                  },
                  module491.realtime_video_info
                )
              ),
              o
            )
          );
        },
      },
      {
        key: 'onChangeMode',
        value: function (t) {
          var n = this;

          if (!this.isChanging) {
            this.isChanging = true;
            var o = this.state.mode;
            this.setState({
              titleSelected: t,
            });
            module1363.default.updateRealTimeVideoSetting(t, function (l) {
              n.isChanging = false;

              if (l) {
                module383.LogEventStatus('realtime_video_setting', {
                  mode: t,
                });
                module12.DeviceEventEmitter.emit(module411.NotificationKeys.RealTimeVideoSettingChange, {
                  data: t,
                });
              } else {
                globals.showToast(module491.robot_communication_exception);
                n.setState({
                  titleSelected: o,
                });
              }
            });
          }
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = T;
T.contextType = module506.AppConfigContext;
var D = module12.StyleSheet.create({
  containter: {
    flex: 1,
  },
  infoTextView: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  infoText: {
    color: 'rgba(0,0,0,0.3)',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 10,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  rightImgStyle: {
    width: 30,
    height: 30,
  },
});
