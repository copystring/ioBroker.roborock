require('./386');

require('./394');

var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module1496 = require('./1496'),
  module1200 = require('./1200'),
  module1506 = require('./1506');

function x(t, n) {
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

function T(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      x(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      x(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

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

require('./393');

var module510 = require('./510').strings,
  module1344 = require('./1344'),
  P = (function (t) {
    module9.default(x, t);

    var n = x,
      module50 = C(),
      O = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      var n;
      module6.default(this, x);
      (n = O.call(this, t)).state = {
        shouldShow: false,
        isOverTimer: false,
      };
      n.isHide = true;
      return n;
    }

    module7.default(x, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this.clearTimer();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme;
          return React.default.createElement(
            module1506.default,
            {
              isModal: false,
              showNavbar: true,
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {},
              style: {
                borderRadius: module1344.AppBorderRadius,
              },
            },
            React.default.createElement(
              module13.View,
              {
                style: {
                  height: '100%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              },
              React.default.createElement(
                module13.View,
                module22.default(
                  {
                    style: T(
                      T({}, k.loadingBox),
                      {},
                      {
                        backgroundColor: t.loading.boxColor,
                      }
                    ),
                  },
                  module391.default.getAccessibilityLabel(this.props.loadingAccessibilityLabelKey)
                ),
                React.default.createElement(module1496.default, null),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      k.text,
                      {
                        color: t.loading.textColor,
                      },
                    ],
                  },
                  this.state.text || module510.localization_strings_Common_Constants_19
                )
              )
            )
          );
        },
      },
      {
        key: 'showWithText',
        value: function (t) {
          this.isHide = false;
          this.setState({
            shouldShow: true,
            isOverTimer: false,
            text: t,
          });
        },
      },
      {
        key: 'showWithTextAndOverTimer',
        value: function (t, n) {
          var o = this;
          this.isHide = false;
          this.setState({
            shouldShow: true,
            isOverTimer: true,
            text: t,
          });
          this.timer = setTimeout(function () {
            if (!o.isHide) {
              o.hide();
              setTimeout(function () {
                if (o.props.onOverTimer) o.props.onOverTimer();
              }, 100);
            }
          }, n);
        },
      },
      {
        key: 'hide',
        value: function () {
          this.isHide = true;
          this.setState({
            shouldShow: false,
          });
          this.clearTimer();
        },
      },
      {
        key: 'onPressCancel',
        value: function () {
          this.hide();
          if (this.props.onPressCancel) this.props.onPressCancel();
        },
      },
      {
        key: 'clearTimer',
        value: function () {
          clearTimeout(this.timer);
          this.timer = null;
        },
      },
    ]);
    return x;
  })(React.Component);

exports.default = P;
P.contextType = module1200.AppConfigContext;
P.defaultProps = {
  isModal: false,
};
var k = module13.StyleSheet.create({
  loadingBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    width: 150,
    paddingHorizontal: 15,
    height: 100,
  },
  text: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
  },
});
