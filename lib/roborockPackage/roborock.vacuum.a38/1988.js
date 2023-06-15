var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module414 = require('./414'),
  module385 = require('./385'),
  module515 = require('./515'),
  module381 = require('./381');

require('./1161');

function S(t, n) {
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
      S(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      S(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function A() {
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
  module1989 = (function (t) {
    module7.default(S, t);

    var n = S,
      module50 = A(),
      _ = function () {
        var t,
          o = module11.default(n);

        if (module50) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function S(t) {
      var n;
      module4.default(this, S);
      (n = _.call(this, t)).state = {
        airDryMode: 0,
      };
      return n;
    }

    module5.default(S, [
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
              title: module500.robot_setting_air_dry_title,
              bottomDetail: module500.robot_setting_air_dry_desc,
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
          var t = this.context.theme,
            n = module12.Dimensions.get('window').width;
          M(
            M(
              {
                width: n - 100,
                height: 45,
                radius: 22,
              },
              t.shadowConfig
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
          var o = this.getMenus().map(function (t, n) {
            return t.visible
              ? t.title
                ? React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      key: n,
                      fontSize: 16,
                      titleColor: 'rgba(0,0,0,0.8)',
                    })
                  )
                : React.default.createElement(module12.View, {
                    style: x.section,
                    key: n,
                  })
              : null;
          });
          return React.default.createElement(
            module12.View,
            {
              style: [
                x.containter,
                {
                  backgroundColor: t.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  x.top,
                  {
                    backgroundColor: t.componentBackgroundColor,
                  },
                ],
              },
              React.default.createElement(module12.Image, {
                resizeMode: 'contain',
                style: {
                  width: n,
                  height: 0.5333333333333333 * n,
                },
                source: require('./1989'),
              })
            ),
            o
          );
        },
      },
      {
        key: 'getAirDryMode',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.getFanMotorWorkTimeout());

                  case 3:
                    t = n.sent;
                    this.setState({
                      airDryMode: t.result[0],
                    });
                    console.log('getAirDryMode', t);
                    n.next = 11;
                    break;

                  case 8:
                    n.prev = 8;
                    n.t0 = n.catch(0);
                    console.log('getAirDryMode  error: ' + ('object' == typeof n.t0 ? JSON.stringify(n.t0) : n.t0));

                  case 11:
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
      {
        key: 'onAirDrySwitchValueChanged',
        value: function (t) {
          var n, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    n = 360;
                    this.setState({
                      airDryMode: t ? n : 0,
                    });
                    c.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.setFanMotorWorkTimeout(t ? n : 0));

                  case 5:
                    s = c.sent;
                    if (module381.RSM.isAirDrying && !t) globals.showToast(module500.setting_air_dry_close_prompt);
                    console.log('onAirDrySwitchValueChanged ' + t + ' ' + module381.RSM.isAirDrying, s);
                    c.next = 15;
                    break;

                  case 10:
                    c.prev = 10;
                    c.t0 = c.catch(0);
                    console.log('onAirDrySwitchValueChanged ' + t + '  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));
                    this.setState({
                      airDryMode: t ? 0 : this.state.airDryMode,
                    });
                    globals.showToast(module500.robot_communication_exception);

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
          var t,
            n = this;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (!(null == (t = globals.Alert)))
                      t.alert(module500.setting_stop_air_dry_desc, '', [
                        {
                          text: module500.localization_strings_Main_MainPage_11,
                          onPress: function () {},
                        },
                        {
                          text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
                          onPress: function () {
                            n.stopAirDirAction();
                          },
                        },
                      ]);

                  case 1:
                  case 'end':
                    return o.stop();
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
        key: 'stopAirDirAction',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module414.default.stopAirdryMop());

                  case 3:
                    t = n.sent;
                    console.log('stopAirDirAction res : ' + JSON.stringify(t));
                    n.next = 10;
                    break;

                  case 7:
                    n.prev = 7;
                    n.t0 = n.catch(0);
                    globals.showToast(module500.robot_communication_exception);

                  case 10:
                  case 'end':
                    return n.stop();
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
    return S;
  })(React.Component);

exports.default = module1989;
module1989.contextType = module515.AppConfigContext;
var x = module12.StyleSheet.create({
  containter: {
    flex: 1,
  },
  top: {
    alignSelf: 'stretch',
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
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});
