var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

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
  module9.default(P, t);

  var v = P,
    b = y(),
    R = function () {
      var t,
        l = module12.default(v);

      if (b) {
        var n = module12.default(this).constructor;
        t = Reflect.construct(l, arguments, n);
      } else t = l.apply(this, arguments);

      return module11.default(this, t);
    };

  function P() {
    module6.default(this, P);
    return R.apply(this, arguments);
  }

  module7.default(P, [
    {
      key: 'render',
      value: function () {
        if ('android' === module13.Platform.OS && module13.Platform.Version >= 21) {
          var t = this.props,
            u = t.style,
            o = module56.default(t, ['style']);
          return React.default.createElement(
            module13.TouchableNativeFeedback,
            module22.default({}, o, {
              style: null,
              background: module13.TouchableNativeFeedback.Ripple(this.props.pressColor, this.props.borderless),
            }),
            React.default.createElement(
              module13.View,
              {
                style: u,
              },
              React.default.Children.only(this.props.children)
            )
          );
        }

        return React.default.createElement(module13.TouchableOpacity, this.props, this.props.children);
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
