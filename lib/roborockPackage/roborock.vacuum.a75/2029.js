var regeneratorRuntime = require('regenerator-runtime'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module391 = require('./391'),
  module394 = require('./394'),
  module416 = require('./416'),
  module381 = require('./381'),
  module1199 = require('./1199'),
  module1408 = require('./1408');

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
        module50.default(t, n, l[n]);
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./1958');

var module510 = require('./510').strings,
  module393 = require('./393'),
  module1343 = require('./1343'),
  module1420 = require('./1420'),
  j = (function (t) {
    module9.default(k, t);

    var module50 = k,
      module1199 = E(),
      v = function () {
        var t,
          n = module12.default(module50);

        if (module1199) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function k(t) {
      var n;
      module6.default(this, k);
      (n = v.call(this, t)).state = {
        spinner: false,
      };
      return n;
    }

    module7.default(k, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.props.navigation.setParams({
            navBarBackgroundColor: this.context.theme.settingBackgroundColor,
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'render',
        value: function () {
          if (this.state.spinner)
            React.default.createElement(module13.ActivityIndicator, {
              hidden: 'true',
              size: 'small',
            });
          else React.default.createElement(module13.View, null);

          var t = this,
            n = this.context.theme,
            o = _(
              _(
                {
                  width: module13.Dimensions.get('window').width - 100,
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
            module13.View,
            {
              style: [
                B.container,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(
              module13.View,
              {
                style: B.syncTopView,
              },
              React.default.createElement(
                module13.View,
                {
                  style: B.imgView,
                },
                React.default.createElement(module13.Image, {
                  source: n.syncTimezone.robotImg,
                  resizeMode: 'contain',
                  style: B.imgStyle,
                }),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      B.title,
                      {
                        color: n.syncTimezone.hintTitle,
                      },
                    ],
                  },
                  module510.setting_timezone_title
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      B.subTitle,
                      {
                        color: n.syncTimezone.hintSubTitle,
                      },
                    ],
                  },
                  module391.default.timeZoneChange(module394.default.sharedCache().robotTimeZone)
                )
              ),
              React.default.createElement(
                module13.View,
                {
                  style: B.imgView,
                },
                React.default.createElement(module13.Image, {
                  source: n.syncTimezone.phoneImg,
                  resizeMode: 'contain',
                  style: B.imgStyle,
                }),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      B.title,
                      {
                        color: n.syncTimezone.hintTitle,
                      },
                    ],
                  },
                  module510.setting_timezone_phone
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      B.subTitle,
                      {
                        color: n.syncTimezone.hintSubTitle,
                      },
                    ],
                  },
                  module391.default.timeZoneChange(module394.default.sharedCache().phoneTimeZone)
                )
              )
            ),
            React.default.createElement(
              module13.View,
              {
                style: B.syncBottomView,
              },
              React.default.createElement(
                module13.Text,
                {
                  numberOfLines: 3,
                  style: [
                    B.hint,
                    {
                      color: n.syncTimezone.hintTitle,
                    },
                  ],
                },
                module510.setting_timezone_text
              ),
              React.default.createElement(
                module13.Text,
                {
                  numberOfLines: 20,
                  style: [
                    B.hint2,
                    {
                      color: n.syncTimezone.hintSubTitle,
                    },
                  ],
                },
                module393.isMiApp ? module510.setting_timezone_remark : module510.setting_timezone_remark_owner
              ),
              React.default.createElement(
                module1408.BoxShadow,
                {
                  setting: o,
                },
                React.default.createElement(
                  module385.GradientView,
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
                    style: [
                      B.syncBtn,
                      {
                        minWidth: module13.Dimensions.get('window').width - 100,
                      },
                    ],
                  },
                  React.default.createElement(module385.PureButton, {
                    funcId: 'sync_timezone_btn',
                    style: {
                      backgroundColor: 'transparent',
                    },
                    textColor: 'white',
                    fontSize: 16,
                    title: module510.setting_timezone_button,
                    onPress: function () {
                      return t.onSyncTimezone();
                    },
                  })
                )
              )
            )
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
                    return regeneratorRuntime.default.awrap(module393.getPhoneTimezone());

                  case 6:
                    t = l.sent;
                    module381.RobotStatusManager.sharedManager().timeZone = t;
                    l.next = 10;
                    return regeneratorRuntime.default.awrap(module416.default.setTimezone(t));

                  case 10:
                    globals.showToast(module510.localization_strings_Main_MainPage_8);
                    module1420.setTimeout(function () {
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
                    globals.showToast(module510.robot_communication_exception);
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
    return k;
  })(React.default.PureComponent);

exports.default = j;
j.contextType = module1199.AppConfigContext;
var B = module13.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    marginBottom: 0,
    marginTop: module1343.NavigationBarHeight,
  },
  hint: {
    marginHorizontal: 60,
    alignSelf: 'stretch',
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
  },
  hint2: {
    marginHorizontal: 40,
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
    minHeight: 45,
    borderRadius: 26,
    backgroundColor: '#3777F7',
    justifyContent: 'center',
  },
});
