require('./407');

require('./1924');

require('./1361');

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
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  module381 = require('./381'),
  module377 = require('./377'),
  module411 = require('./411'),
  module383 = require('./383'),
  module506 = require('./506');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function S() {
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

require('./934');

var module491 = require('./491').strings,
  k = (function (t) {
    module7.default(R, t);

    var module506 = R,
      b = S(),
      k = function () {
        var t,
          n = module11.default(module506);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = k.call(this, t)).state = {};
      n.mounted = false;
      return n;
    }

    module5.default(R, [
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
            title: module491.common_setting_secure_setting,
          });
          module12.DeviceEventEmitter.addListener(module411.NotificationKeys.RobotStatusDidUpdate, function (n) {
            if (t.mounted) t.forceUpdate();
          });
        },
      },
      {
        key: 'getMenus',
        value: function () {
          var t = this,
            n = module387.default.ScreenWidth - 100;
          return [
            {
              sectionTitle: module491.title_password,
              visible: true,
            },
            {
              title: module377.RSM.secPasswordEnabled ? module491.disable_gesture_password : module491.enable_gesture_password,
              bottomDetail: module377.RSM.secPasswordEnabled ? null : module491.need_password_everytime,
              funcId: 'camera_setting_security_switch_password',
              onPress: function () {
                return t.openOrClosePassword();
              },
              style: {
                paddingVertical: module377.RSM.secPasswordEnabled ? 10 : 0,
              },
              visible: true,
              bottomDetailWidth: n,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: false,
            },
            {
              title: module491.modify_password,
              style: {
                paddingVertical: 10,
              },
              titleArrowOpacity: module377.RSM.secPasswordEnabled ? 1 : 0.5,
              detailColor: '#007AFF',
              visible: true,
              funcId: 'camera_setting_security_modify_password',
              onPress: function () {
                return t.modifyPassword();
              },
              shouldShowBottomLongLine: true,
            },
          ];
        },
      },
      {
        key: 'openOrClosePassword',
        value: function () {
          this.props.navigation.navigate('GesturePasswordPage', {
            mode: module377.RSM.secPasswordEnabled ? 2 : 0,
          });
        },
      },
      {
        key: 'modifyPassword',
        value: function () {
          if (module377.RSM.secPasswordEnabled) {
            this.props.navigation.navigate('GesturePasswordPage', {
              mode: 3,
            });
            module383.LogEventStat(module383.LogEventMap.RealTimeUpdatePassword);
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            o = this.getMenus().map(function (o, s) {
              return o.visible
                ? o.title
                  ? React.default.createElement(
                      module381.SettingListItemView,
                      module21.default({}, o, {
                        key: s,
                        fontSize: 16,
                      })
                    )
                  : o.sectionTitle.length > 0 &&
                    React.default.createElement(
                      module12.View,
                      {
                        style: E.selectionView,
                      },
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            E.sectionTitle,
                            {
                              color: t.settingListItem.titleColor,
                            },
                          ],
                          key: s,
                        },
                        o.sectionTitle
                      )
                    )
                : null;
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                E.containter,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            o
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = k;
k.contextType = module506.AppConfigContext;
var E = module12.StyleSheet.create({
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
