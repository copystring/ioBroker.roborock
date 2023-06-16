var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  y = ['style'];

function v() {
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

var b = (function (t) {
  module7.default(k, t);

  var b = k,
    R = v(),
    P = function () {
      var t,
        l = module11.default(b);

      if (R) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(l, arguments, n);
      } else t = l.apply(this, arguments);

      return module9.default(this, t);
    };

  function k() {
    module4.default(this, k);
    return P.apply(this, arguments);
  }

  module5.default(k, [
    {
      key: 'render',
      value: function () {
        if ('android' === module12.Platform.OS && module12.Platform.Version >= 21) {
          var t = this.props,
            o = t.style,
            u = module55.default(t, y);
          return React.default.createElement(
            module12.TouchableNativeFeedback,
            module21.default({}, u, {
              style: null,
              background: module12.TouchableNativeFeedback.Ripple(this.props.pressColor, this.props.borderless),
            }),
            React.default.createElement(
              module12.View,
              {
                style: o,
              },
              React.default.Children.only(this.props.children)
            )
          );
        }

        return React.default.createElement(module12.TouchableOpacity, this.props, this.props.children);
      },
    },
  ]);
  return k;
})(React.default.Component);

exports.default = b;
b.defaultProps = {
  borderless: false,
  pressColor: 'rgba(0, 0, 0, .32)',
};
