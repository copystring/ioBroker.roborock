var regeneratorRuntime = require('regenerator-runtime'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module387 = require('./387'),
  module390 = require('./390'),
  module407 = require('./407'),
  module377 = require('./377'),
  module506 = require('./506'),
  module1067 = require('./1067');

function v(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function _(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      v(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      v(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function E() {
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

require('./385');

require('./1366');

require('./1853');

var module491 = require('./491').strings,
  module389 = require('./389'),
  module936 = require('./936'),
  module1249 = require('./1249'),
  k = (function (t) {
    module7.default(j, t);

    var module49 = j,
      module506 = E(),
      v = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function j(t) {
      var n;
      module4.default(this, j);
      (n = v.call(this, t)).state = {
        spinner: false,
      };
      return n;
    }

    module5.default(j, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          if (this.state.spinner)
            React.default.createElement(module12.ActivityIndicator, {
              hidden: 'true',
              size: 'small',
            });
          else React.default.createElement(module12.View, null);

          var t = this,
            n = this.context.theme,
            o = _(
              _(
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
                  marginTop: 20,
                  marginLeft: 50,
                },
              }
            );

          return React.default.createElement(
            module12.View,
            {
              style: [
                V.container,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: V.syncTopView,
              },
              React.default.createElement(
                module12.View,
                {
                  style: V.imgView,
                },
                React.default.createElement(module12.Image, {
                  source: n.syncTimezone.robotImg,
                  resizeMode: 'contain',
                  style: V.imgStyle,
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      V.title,
                      {
                        color: n.syncTimezone.hintTitle,
                      },
                    ],
                  },
                  module491.setting_timezone_title
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      V.subTitle,
                      {
                        color: n.syncTimezone.hintSubTitle,
                      },
                    ],
                  },
                  module387.default.timeZoneChange(module390.default.sharedCache().robotTimeZone)
                )
              ),
              React.default.createElement(
                module12.View,
                {
                  style: V.imgView,
                },
                React.default.createElement(module12.Image, {
                  source: n.syncTimezone.phoneImg,
                  resizeMode: 'contain',
                  style: V.imgStyle,
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      V.title,
                      {
                        color: n.syncTimezone.hintTitle,
                      },
                    ],
                  },
                  module491.setting_timezone_phone
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      V.subTitle,
                      {
                        color: n.syncTimezone.hintSubTitle,
                      },
                    ],
                  },
                  module387.default.timeZoneChange(module390.default.sharedCache().phoneTimeZone)
                )
              )
            ),
            React.default.createElement(
              module12.View,
              {
                style: V.syncBottomView,
              },
              React.default.createElement(
                module12.Text,
                {
                  numberOfLines: 3,
                  style: [
                    V.hint,
                    {
                      color: n.syncTimezone.hintTitle,
                    },
                  ],
                },
                module491.setting_timezone_text
              ),
              React.default.createElement(
                module12.Text,
                {
                  numberOfLines: 20,
                  style: [
                    V.hint2,
                    {
                      color: n.syncTimezone.hintSubTitle,
                    },
                  ],
                },
                module389.isMiApp ? module491.setting_timezone_remark : module491.setting_timezone_remark_owner
              ),
              React.default.createElement(
                module1067.BoxShadow,
                {
                  setting: o,
                },
                React.default.createElement(
                  module381.GradientView,
                  {
                    colors: ['#72B4FE', '#3777F7'],
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: V.syncBtn,
                  },
                  React.default.createElement(module381.PureButton, {
                    funcId: 'sync_timezone_btn',
                    style: {
                      backgroundColor: 'transparent',
                    },
                    textColor: 'white',
                    fontSize: 16,
                    title: module491.setting_timezone_button,
                    onPress: function () {
                      return t.onSyncTimezone();
                    },
                  })
                )
              )
            ),
            React.default.createElement(module381.AlertView, {
              ref: function (n) {
                return (t.alert = n);
              },
            })
          );
        },
      },
      {
        key: 'onSyncTimezone',
        value: function () {
          var t,
            o = this;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    if (!this.state.spinner) {
                      l.next = 2;
                      break;
                    }

                    return l.abrupt('return');

                  case 2:
                    this.setState({
                      spinner: true,
                    });
                    l.prev = 3;
                    l.next = 6;
                    return regeneratorRuntime.default.awrap(module389.getPhoneTimezone());

                  case 6:
                    t = l.sent;
                    module377.RobotStatusManager.sharedManager().timeZone = t;
                    l.next = 10;
                    return regeneratorRuntime.default.awrap(module407.default.setTimezone(t));

                  case 10:
                    globals.showToast(module491.localization_strings_Main_MainPage_8);
                    module1249.setTimeout(function () {
                      o.setState({
                        spinner: false,
                      });
                      o.props.navigation.goBack();
                      o.props.navigation.state.params.parent.getRobotTimezone();
                    }, 1e3);
                    l.next = 20;
                    break;

                  case 15:
                    l.prev = 15;
                    l.t0 = l.catch(3);
                    globals.showToast(module491.robot_communication_exception);
                    this.setState({
                      spinner: false,
                    });
                    console.log('setTimezone  error: ' + l.t0);

                  case 20:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            [[3, 15]],
            Promise
          );
        },
      },
    ]);
    return j;
  })(React.default.PureComponent);

exports.default = k;
k.contextType = module506.AppConfigContext;
var V = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    marginBottom: 0,
    marginTop: module936.NavigationBarHeight,
  },
  hint: {
    width: module12.Dimensions.get('window').width - 120,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
  },
  hint2: {
    width: module12.Dimensions.get('window').width - 80,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.4)',
    marginTop: 10,
    textAlign: 'center',
  },
  imgView: {
    flex: 1,
    justifyContent: 'center',
  },
  imgStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  syncTopView: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  syncBottomView: {
    flex: 3,
  },
  syncBtn: {
    alignSelf: 'center',
    minWidth: module12.Dimensions.get('window').width - 100,
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});
