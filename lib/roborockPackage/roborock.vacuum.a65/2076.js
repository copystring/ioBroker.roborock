var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module1640 = require('./1640'),
  module420 = require('./420'),
  module390 = require('./390'),
  module1200 = require('./1200'),
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

var module510 = require('./510').strings,
  module389 = require('./389'),
  module2077 = (function (t) {
    module9.default(R, t);

    var o = R,
      module1200 = b(),
      module2077 = function () {
        var t,
          n = module12.default(o);

        if (module1200) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      var o;
      module6.default(this, R);
      (o = module2077.call(this, t)).state = {
        titleSelected: module1640.default.realVideoSetting,
      };
      o.isChanging = false;
      return o;
    }

    module7.default(R, [
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
            title: module510.realtime_video_title,
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
              title: module510.realtime_video_title_1,
              funcId: 'video_setting_1',
              bottomDetail: module510.realtime_video_sub_title_3_1,
              onPress: function () {
                return t.onChangeMode(module389.VideoSettingMap().VideoSettingNotDisturb);
              },
              visible: module390.default.isSupportDisturbInVideoSetting(),
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              bottomDetailWidth: module13.Dimensions.get('window').width - 70,
              selected: this.state.titleSelected == module389.VideoSettingMap().VideoSettingNotDisturb,
              shouldShowRightArrow: this.state.titleSelected == module389.VideoSettingMap().VideoSettingNotDisturb,
              rightSrc: require('./2077'),
            },
            {
              title: module510.realtime_video_title_2,
              funcId: 'video_setting_2',
              bottomDetail: module510.realtime_video_sub_title_3_5,
              bottomDetailWidth: module13.Dimensions.get('window').width - 70,
              onPress: function () {
                return t.onChangeMode(module389.VideoSettingMap().VideoSettingLightlyDisturb);
              },
              visible: module390.default.isSupportDisturbInVideoSetting(),
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
              selected: this.state.titleSelected == module389.VideoSettingMap().VideoSettingLightlyDisturb,
              shouldShowRightArrow: this.state.titleSelected == module389.VideoSettingMap().VideoSettingLightlyDisturb,
              rightSrc: require('./2077'),
            },
            {
              title: module510.realtime_video_title_3,
              funcId: 'video_setting_3',
              bottomDetail: module510.realtime_video_sub_title_3_6,
              bottomDetailWidth: module13.Dimensions.get('window').width - 70,
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
            o = this.getMenus().map(function (t, module2077) {
              return t.visible
                ? t.title
                  ? React.default.createElement(
                      module385.SettingListItemView,
                      module22.default({}, t, {
                        key: module2077,
                        fontSize: 16,
                        rightImgStyle: M.rightImgStyle,
                        width: module13.Dimensions.get('window').width - 30,
                        rightSrc: require('./2077'),
                        isRightImgRotate: false,
                      })
                    )
                  : t.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module13.Text,
                      {
                        style: M.sectionTitle,
                        key: module2077,
                      },
                      t.sectionTitle
                    )
                : null;
            });
          return React.default.createElement(
            module13.ScrollView,
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
              module13.View,
              {
                style: M.containter,
              },
              React.default.createElement(
                module13.View,
                {
                  style: M.infoTextView,
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      M.infoText,
                      {
                        color: t.settingListItem.detailColor,
                      },
                    ],
                  },
                  module510.realtime_video_info
                )
              ),
              React.default.createElement(
                module13.View,
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
            module1640.default.updateRealTimeVideoSetting(t, function (l) {
              o.isChanging = false;

              if (l) {
                module387.LogEventStatus('realtime_video_setting', {
                  mode: t,
                });
                module13.DeviceEventEmitter.emit(module420.NotificationKeys.RealTimeVideoSettingChange, {
                  data: t,
                });
              } else {
                globals.showToast(module510.robot_communication_exception);
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

exports.default = module2077;
module2077.contextType = module1200.AppConfigContext;
var M = module13.StyleSheet.create({
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
