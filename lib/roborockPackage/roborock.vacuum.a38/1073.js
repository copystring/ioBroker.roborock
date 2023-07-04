var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

function y() {
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

var v = (function (t) {
  module7.default(P, t);

  var v = P,
    b = y(),
    R = function () {
      var t,
        l = module11.default(v);

      if (b) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(l, arguments, n);
      } else t = l.apply(this, arguments);

      return module9.default(this, t);
    };

  function P() {
    module4.default(this, P);
    return R.apply(this, arguments);
  }

  module5.default(P, [
    {
      key: 'render',
      value: function () {
        if ('android' === module12.Platform.OS && module12.Platform.Version >= 21) {
          var t = this.props,
            u = t.style,
            o = module56.default(t, ['style']);
          return React.default.createElement(
            module12.TouchableNativeFeedback,
            module22.default({}, o, {
              style: null,
              background: module12.TouchableNativeFeedback.Ripple(this.props.pressColor, this.props.borderless),
            }),
            React.default.createElement(
              module12.View,
              {
                style: u,
              },
              React.default.Children.only(this.props.children)
            )
          );
        }

        return React.default.createElement(module12.TouchableOpacity, this.props, this.props.children);
      },
    },
  ]);
  return P;
})(React.default.Component);

exports.default = v;
v.defaultProps = {
  borderless: false,
  pressColor: 'rgba(0, 0, 0, .32)',
};
