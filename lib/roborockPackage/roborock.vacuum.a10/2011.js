require('./390');

require('./415');

var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module49 = require('./49'),
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
    var o = D(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var l = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (l && (l.get || l.set)) Object.defineProperty(s, u, l);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module407 = require('./407'),
  module381 = require('./381'),
  module506 = require('./506'),
  module377 = require('./377');

require('./1065');

function D(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (D = function (t) {
    return t ? o : n;
  })(t);
}

function O(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function M(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      O(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      O(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
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

var module491 = require('./491').strings,
  module1925 = (function (t) {
    module7.default(O, t);

    var module49 = O,
      module506 = S(),
      D = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var n;
      module4.default(this, O);
      (n = D.call(this, t)).state = {
        airDryMode: 0,
      };
      return n;
    }

    module5.default(O, [
      {
        key: 'componentDidMount',
        value: function () {
          this.getAirDryMode();
        },
      },
      {
        key: 'getMenus',
        value: function () {
          return [
            {
              title: module491.robot_setting_air_dry_title,
              bottomDetail: module491.robot_setting_air_dry_desc,
              funcId: 'setting_air_dry_settings',
              shouldShowSwitch: true,
              switchOn: this.state.airDryMode > 0,
              switchValueChanged: this.onAirDrySwitchValueChanged.bind(this),
              shouldShowBottomLine: false,
              visible: true,
              shouldShowTopLongLine: true,
              shouldShowBottomLine: true,
              shouldShowBottomLongLine: true,
              detailWidth: 350,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          M(
            M(
              {
                width: module12.Dimensions.get('window').width - 100,
                height: 45,
                radius: 22,
              },
              n.shadowConfig
            ),
            {},
            {
              style: {
                marginBottom: 20,
                marginLeft: 50,
              },
            }
          );
          console.log('thme', this.context.theme);
          var s = this.getMenus().map(function (t, n) {
            return t.visible
              ? t.title
                ? React.default.createElement(
                    module381.SettingListItemView,
                    module21.default({}, t, {
                      key: n,
                      fontSize: 16,
                      titleColor: 'rgba(0,0,0,0.8)',
                    })
                  )
                : React.default.createElement(module12.View, {
                    style: j.section,
                    key: n,
                  })
              : null;
          });
          return React.default.createElement(
            module12.View,
            {
              style: [
                j.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  j.top,
                  {
                    backgroundColor: n.componentBackgroundColor,
                  },
                ],
              },
              React.default.createElement(module12.Image, {
                resizeMode: 'contain',
                style: j.banner,
                source: require('./1925'),
              })
            ),
            s,
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            })
          );
        },
      },
      {
        key: 'getAirDryMode',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.getFanMotorWorkTimeout());

                  case 3:
                    t = o.sent;
                    this.setState({
                      airDryMode: t.result[0],
                    });
                    console.log('getAirDryMode', t);
                    o.next = 11;
                    break;

                  case 8:
                    o.prev = 8;
                    o.t0 = o.catch(0);
                    console.log('getAirDryMode  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

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
        key: 'onAirDrySwitchValueChanged',
        value: function (t) {
          var module21, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    module21 = 360;
                    this.setState({
                      airDryMode: t ? module21 : 0,
                    });
                    c.next = 5;
                    return regeneratorRuntime.default.awrap(module407.default.setFanMotorWorkTimeout(t ? module21 : 0));

                  case 5:
                    s = c.sent;
                    if (module377.RSM.isAirDrying && !t) globals.showToast(module491.setting_air_dry_close_prompt);
                    console.log('onAirDrySwitchValueChanged ' + t + ' ' + module377.RSM.isAirDrying, s);
                    c.next = 15;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    console.log('onAirDrySwitchValueChanged ' + t + '  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));
                    this.setState({
                      airDryMode: t ? 0 : this.state.airDryMode,
                    });
                    globals.showToast(module491.robot_communication_exception);

                  case 15:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
      {
        key: 'stopAirDir',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    this.alert.alert(module491.setting_stop_air_dry_desc, '', [
                      {
                        text: module491.localization_strings_Main_MainPage_11,
                        onPress: function () {},
                      },
                      {
                        text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                        onPress: function () {
                          t.stopAirDirAction();
                        },
                      },
                    ]);

                  case 1:
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
        key: 'stopAirDirAction',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.prev = 0;
                    o.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.stopAirdryMop());

                  case 3:
                    t = o.sent;
                    console.log('stopAirDirAction res : ' + JSON.stringify(t));
                    o.next = 10;
                    break;

                  case 7:
                    o.prev = 7;
                    o.t0 = o.catch(0);
                    globals.showToast(module491.robot_communication_exception);

                  case 10:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            null,
            [[0, 7]],
            Promise
          );
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = module1925;
module1925.contextType = module506.AppConfigContext;
var j = module12.StyleSheet.create({
  containter: {
    flex: 1,
  },
  banner: {
    width: module12.Dimensions.get('window').width,
    height: 0.5333333333333333 * module12.Dimensions.get('window').width,
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
  },
  section: {
    paddingVertical: 5,
  },
  stopAirDirBottomView: {
    position: 'absolute',
    bottom: 50,
    left: 0,
  },
  stopAirDirBtn: {
    alignSelf: 'center',
    minWidth: module12.Dimensions.get('window').width - 100,
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});
