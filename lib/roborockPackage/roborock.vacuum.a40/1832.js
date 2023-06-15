var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385');

function y(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (o)
      c = c.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, c);
  }

  return n;
}

function b(t) {
  for (var n = 1; n < arguments.length; n++) {
    var c = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      y(Object(c), true).forEach(function (n) {
        module50.default(t, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      y(Object(c)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(c, o));
      });
  }

  return t;
}

function v() {
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
  O = (function (t) {
    module7.default(j, t);

    var module50 = j,
      y = v(),
      O = function () {
        var t,
          n = module11.default(module50);

        if (y) {
          var c = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, c);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function j(t) {
      var o;
      module4.default(this, j);
      (o = O.call(this, t)).state = {
        shouldShow: false,
        randomCode: '',
      };
      return o;
    }

    module5.default(j, [
      {
        key: 'render',
        value: function () {
          var t = this,
            o = React.default.createElement(
              module12.Text,
              {
                style: b(
                  b({}, P.code),
                  {},
                  {
                    marginRight: globals.isRTL ? 20 : 0,
                  }
                ),
              },
              module500.random_code + ':' + this.state.randomCode
            ),
            n = React.default.createElement(module385.PureButton, {
              funcId: 'random_code_copy',
              title: module500.debug_info_copy_all,
              textColor: '#EB0029',
              style: b(
                b({}, P.copyButton),
                {},
                {
                  marginLeft: globals.isRTL ? 20 : 0,
                }
              ),
              onPress: this.onPressCopyButton.bind(this),
            }),
            c = React.default.createElement(
              module12.TouchableWithoutFeedback,
              {
                onPress: function () {
                  t.setState({
                    shouldShow: false,
                  });
                },
              },
              React.default.createElement(
                module12.View,
                {
                  style: P.container,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: P.wrap,
                    pointerEvents: 'box-none',
                  },
                  globals.isRTL ? n : o,
                  globals.isRTL ? o : n
                )
              )
            );
          return React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {
                console.log('closed');
              },
            },
            c
          );
        },
      },
      {
        key: 'onPressCopyButton',
        value: function () {
          var t = this;
          module12.Clipboard.setString(this.state.randomCode);
          globals.showToast(module500.debug_info_copy_success);
          setTimeout(function () {
            t.setState({
              shouldShow: false,
            });
          }, 1e3);
        },
      },
    ]);
    return j;
  })(React.default.PureComponent);

exports.default = O;
var P = module12.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(00, 00, 00, 0.4)',
    justifyContent: 'flex-end',
  },
  wrap: {
    alignSelf: 'stretch',
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  code: {
    marginLeft: 20,
    color: 'rgba(0,0,0,0.8)',
  },
  copyButton: {
    marginRight: 20,
    marginTop: 33,
    width: 61,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EB0029',
  },
});
