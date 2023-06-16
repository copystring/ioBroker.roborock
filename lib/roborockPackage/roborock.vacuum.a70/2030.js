require('./416');

require('./1633');

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module385 = require('./385'),
  module381 = require('./381'),
  module420 = require('./420'),
  module387 = require('./387'),
  module1193 = require('./1193');

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

require('./393');

require('./1337');

var module510 = require('./510').strings,
  R = (function (t) {
    module9.default(L, t);

    var n = L,
      module1193 = b(),
      R = function () {
        var t,
          o = module12.default(n);

        if (module1193) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function L(t) {
      var n;
      module6.default(this, L);
      (n = R.call(this, t)).state = {};
      n.mounted = false;
      return n;
    }

    module7.default(L, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mounted = false;
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.mounted = true;
          this.props.navigation.setParams({
            title: module510.common_setting_secure_setting,
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
          module13.DeviceEventEmitter.addListener(module420.NotificationKeys.RobotStatusDidUpdate, function (n) {
            if (t.mounted) t.forceUpdate();
          });
        },
      },
      {
        key: 'getMenus',
        value: function () {
          var t = this,
            n = module391.default.ScreenWidth - 100;
          return [
            {
              title: module381.RSM.secPasswordEnabled ? module510.disable_gesture_password : module510.enable_gesture_password,
              bottomDetail: module381.RSM.secPasswordEnabled ? null : module510.need_password_everytime,
              funcId: 'camera_setting_security_switch_password',
              onPress: function () {
                return t.openOrClosePassword();
              },
              style: {
                paddingVertical: module381.RSM.secPasswordEnabled ? 10 : 0,
              },
              visible: true,
              bottomDetailWidth: n,
              shouldShowTopLongLine: false,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
            },
            {
              title: module510.modify_password,
              style: {
                paddingVertical: 10,
              },
              titleArrowOpacity: module381.RSM.secPasswordEnabled ? 1 : 0.5,
              detailColor: '#007AFF',
              visible: true,
              funcId: 'camera_setting_security_modify_password',
              onPress: function () {
                return t.modifyPassword();
              },
              shouldShowBottomLine: false,
            },
          ];
        },
      },
      {
        key: 'openOrClosePassword',
        value: function () {
          this.props.navigation.navigate('GesturePasswordPage', {
            mode: module381.RSM.secPasswordEnabled ? 2 : 0,
          });
        },
      },
      {
        key: 'modifyPassword',
        value: function () {
          if (module381.RSM.secPasswordEnabled) {
            this.props.navigation.navigate('GesturePasswordPage', {
              mode: 3,
            });
            module387.LogEventStat(module387.LogEventMap.RealTimeUpdatePassword);
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            n = this.getMenus().map(function (t, n) {
              return t.visible && t.title
                ? React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      key: n,
                      fontSize: 16,
                    })
                  )
                : null;
            });
          return React.default.createElement(
            module13.View,
            {
              style: [
                k.containter,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.View,
              {
                style: k.selectionView,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    k.sectionTitle,
                    {
                      color: t.settingListItem.titleColor,
                    },
                  ],
                  key: 111,
                },
                module510.title_password
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
              n
            )
          );
        },
      },
    ]);
    return L;
  })(React.Component);

exports.default = R;
R.contextType = module1193.AppConfigContext;
var k = module13.StyleSheet.create({
  containter: {
    flex: 1,
  },
  indicatorButton: {
    width: 110,
    height: 110,
  },
  top: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginVertical: 20,
  },
  section: {
    paddingVertical: 10,
  },
  sectionTitle: {
    marginTop: 20,
    paddingVertical: 15,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    flex: 1,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  selectionView: {
    flexDirection: 'row',
  },
});
