var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1121 = require('./1121'),
  module385 = require('./385');

function C() {
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

require('./1265');

var module505 = require('./505').strings,
  x = (function (t) {
    module7.default(k, t);

    var n = k,
      module1121 = C(),
      x = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);

      (n = x.call(this, t)).onPressSubmit = function () {
        var t, l;
        return regeneratorRuntime.default.async(
          function (u) {
            for (;;)
              switch ((u.prev = u.next)) {
                case 0:
                  if (!(n.state.high.length <= 0)) {
                    u.next = 3;
                    break;
                  }

                  globals.showToast('\u8bf7\u8f93\u5165\u8fdb\u5730\u6bef\u589e\u538b\u9608\u503c');
                  return u.abrupt('return');

                case 3:
                  if (!(n.state.integral.length <= 0)) {
                    u.next = 6;
                    break;
                  }

                  globals.showToast('\u8bf7\u8f93\u5165\u8fc7\u6d41\u9608\u503c');
                  return u.abrupt('return');

                case 6:
                  if (!(n.state.low.length <= 0)) {
                    u.next = 9;
                    break;
                  }

                  globals.showToast('\u8bf7\u8f93\u5165\u9000\u51fa\u5730\u6bef\u589e\u538b\u9608\u503c');
                  return u.abrupt('return');

                case 9:
                  u.prev = 9;
                  t = {
                    enable: 1,
                    current_high: n.state.high,
                    current_integral: n.state.integral,
                    current_low: n.state.low,
                    stall_time: 10,
                  };
                  u.next = 13;
                  return regeneratorRuntime.default.awrap(RobotApi.setCarpetMode(t));

                case 13:
                  l = u.sent;
                  console.log('_onCarpetPressurizeSwitchValueChanged:' + JSON.stringify(l));
                  u.next = 21;
                  break;

                case 17:
                  u.prev = 17;
                  u.t0 = u.catch(9);
                  globals.showToast(module505.robot_communication_exception);
                  console.log(u.t0);

                case 21:
                case 'end':
                  return u.stop();
              }
          },
          null,
          null,
          [[9, 17]],
          Promise
        );
      };

      n.state = {
        high: '',
        integral: '',
        low: '',
      };
      return n;
    }

    module5.default(k, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = {
              backgroundColor: n.feedbackPage.inputBackgroundColor,
              color: n.feedbackPage.textColor,
            },
            l = React.default.createElement(module12.TextInput, {
              onChangeText: function (n) {
                return t.setState({
                  high: n,
                });
              },
              value: this.state.high,
              style: [v.nameInputStyle, o],
              clearButtonMode: 'while-editing',
              placeholder: '\u8bf7\u8f93\u5165\u8fdb\u5730\u6bef\u589e\u538b\u9608\u503c',
              placeholderTextColor: n.feedbackPage.inputPlaceholderColor,
            }),
            u = React.default.createElement(module12.TextInput, {
              onChangeText: function (n) {
                return t.setState({
                  integral: n,
                });
              },
              value: this.state.integral,
              style: [v.nameInputStyle, o],
              clearButtonMode: 'while-editing',
              placeholder: '\u8bf7\u8f93\u5165\u8fc7\u6d41\u9608\u503c',
              placeholderTextColor: n.feedbackPage.inputPlaceholderColor,
            }),
            c = React.default.createElement(module12.TextInput, {
              onChangeText: function (n) {
                return t.setState({
                  low: n,
                });
              },
              value: this.state.low,
              style: [v.nameInputStyle, o],
              clearButtonMode: 'while-editing',
              placeholder: '\u8bf7\u8f93\u5165\u9000\u51fa\u5730\u6bef\u589e\u538b\u9608\u503c',
              placeholderTextColor: n.feedbackPage.inputPlaceholderColor,
            });
          return React.default.createElement(
            module12.View,
            {
              style: [
                v.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            l,
            u,
            c,
            React.default.createElement(module385.PureButton, {
              style: v.buttonStyle,
              textColor: 'white',
              title: '\u786e\u5b9a',
              onPress: this.onPressSubmit,
            })
          );
        },
      },
    ]);
    return k;
  })(React.Component);

exports.default = x;
x.contextType = module1121.AppConfigContext;
var v = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    width: 270,
    backgroundColor: 'transparent',
  },
  nameInputStyle: {
    paddingLeft: 19,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    height: 48,
    marginTop: 15,
  },
  buttonStyle: {
    height: 40,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#3384ff',
    margin: 10,
  },
});
