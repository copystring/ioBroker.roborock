var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module1508 = require('./1508'),
  module418 = require('./418'),
  module390 = require('./390'),
  module515 = require('./515'),
  module387 = require('./387');

function b() {
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

var module500 = require('./500').strings,
  module389 = require('./389'),
  module1938 = (function (t) {
    module7.default(R, t);

    var o = R,
      module515 = b(),
      module1938 = function () {
        var t,
          n = module11.default(o);

        if (module515) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var o;
      module4.default(this, R);
      (o = module1938.call(this, t)).state = {
        titleSelected: module1508.default.realVideoSetting,
      };
      o.isChanging = false;
      return o;
    }

    module5.default(R, [
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
            title: module500.realtime_video_title,
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'getMenus',
        value: function () {
          var t = this;
          return [
            {
              title: module500.realtime_video_title_1,
              funcId: 'video_setting_1',
              bottomDetail: module500.realtime_video_sub_title_3_1,
              onPress: function () {
                return t.onChangeMode(module389.VideoSettingMap().VideoSettingNotDisturb);
              },
              visible: module390.default.isSupportDisturbInVideoSetting(),
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              bottomDetailWidth: module12.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.VideoSettingMap().VideoSettingNotDisturb,
              shouldShowRightArrow: this.state.titleSelected == module389.VideoSettingMap().VideoSettingNotDisturb,
              rightSrc: require('./1938'),
            },
            {
              title: module500.realtime_video_title_2,
              funcId: 'video_setting_2',
              bottomDetail: module500.realtime_video_sub_title_3_5,
              bottomDetailWidth: module12.Dimensions.get('window').width - 70,
              onPress: function () {
                return t.onChangeMode(module389.VideoSettingMap().VideoSettingLightlyDisturb);
              },
              visible: module390.default.isSupportDisturbInVideoSetting(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.VideoSettingMap().VideoSettingLightlyDisturb,
              shouldShowRightArrow: this.state.titleSelected == module389.VideoSettingMap().VideoSettingLightlyDisturb,
              rightSrc: require('./1938'),
            },
            {
              title: module500.realtime_video_title_3,
              funcId: 'video_setting_3',
              bottomDetail: module500.realtime_video_sub_title_3_6,
              bottomDetailWidth: module12.Dimensions.get('window').width - 70,
              onPress: function () {
                return t.onChangeMode(module389.VideoSettingMap().VideoSettingStrongReminder);
              },
              visible: true,
              shouldShowTopLongLine: !module390.default.isSupportDisturbInVideoSetting(),
              shouldShowBottomLine: false,
              selected: this.state.titleSelected == module389.VideoSettingMap().VideoSettingStrongReminder,
              shouldShowRightArrow: this.state.titleSelected == module389.VideoSettingMap().VideoSettingStrongReminder,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            o = this.getMenus().map(function (t, module1938) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: module1938,
                        fontSize: 16,
                        rightImgStyle: M.rightImgStyle,
                        width: module12.Dimensions.get('window').width - 30,
                        rightSrc: require('./1938'),
                        isRightImgRotate: false,
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.Text,
                      {
                        style: M.sectionTitle,
                        key: module1938,
                      },
                      t.sectionTitle
                    )
                : null;
            });
          return React.default.createElement(
            module12.ScrollView,
            {
              style: [
                M.containter,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
              showsVerticalScrollIndicator: false,
            },
            React.default.createElement(
              module12.View,
              {
                style: M.containter,
              },
              React.default.createElement(
                module12.View,
                {
                  style: M.infoTextView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      M.infoText,
                      {
                        color: t.settingListItem.detailColor,
                      },
                    ],
                  },
                  module500.realtime_video_info
                )
              ),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginHorizontal: 15,
                  },
                },
                o
              )
            )
          );
        },
      },
      {
        key: 'onChangeMode',
        value: function (t) {
          var o = this;

          if (!this.isChanging) {
            this.isChanging = true;
            var n = this.state.mode;
            this.setState({
              titleSelected: t,
            });
            module1508.default.updateRealTimeVideoSetting(t, function (l) {
              o.isChanging = false;

              if (l) {
                module387.LogEventStatus('realtime_video_setting', {
                  mode: t,
                });
                module12.DeviceEventEmitter.emit(module418.NotificationKeys.RealTimeVideoSettingChange, {
                  data: t,
                });
              } else {
                globals.showToast(module500.robot_communication_exception);
                o.setState({
                  titleSelected: n,
                });
              }
            });
          }
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = module1938;
module1938.contextType = module515.AppConfigContext;
var M = module12.StyleSheet.create({
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
    width: 22,
    height: 22,
    marginTop: -5,
  },
});
