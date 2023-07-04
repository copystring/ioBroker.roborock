var module49 = require('./49'),
  module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module30 = require('./30'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  PropTypes = require('prop-types'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = R(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = f ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, l, c);
        else u[l] = t[l];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module903 = require('./903'),
  module908 = require('./908'),
  P = ['style'];

function R(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (R = function (t) {
    return t ? o : n;
  })(t);
}

function M(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function k(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      M(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      M(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function C() {
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

var D = (function (t) {
  module7.default(M, t);

  var module49 = M,
    PropTypes = C(),
    R = function () {
      var t,
        o = module11.default(module49);

      if (PropTypes) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function M(t) {
    var n;
    module4.default(this, M);
    (n = R.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
    return n;
  }

  module5.default(M, [
    {
      key: 'outputRange',
      value: function (t, n, o, u) {
        for (
          var l = Array.from(new Array(u), function (n, o) {
              return t * Math.abs(Math.cos((Math.PI * o) / (u - 1)));
            }),
            c = 0;
          c < n * (u / o);
          c++
        )
          l.unshift(l.pop());

        l.unshift.apply(l, module30.default(l.slice(-1)));
        return l;
      },
    },
    {
      key: 'renderComponent',
      value: function (t) {
        var n = t.index,
          o = t.count,
          u = t.progress,
          f = this.props,
          l = f.color,
          c = f.size,
          p = (60 * f.animationDuration) / 1e3,
          s = 0;

        do {
          s += o;
        } while (s < p);

        var y = Array.from(new Array(s + 1), function (t, n) {
            return n / s;
          }),
          h = Math.floor(c / 5),
          b = Math.floor(c / 2),
          w = Math.ceil(h / 2),
          j = {
            height: c,
            width: h,
            marginHorizontal: w,
          },
          P = {
            width: h,
            height: b,
            backgroundColor: l,
            borderTopLeftRadius: w,
            borderTopRightRadius: w,
            transform: [
              {
                translateY: u.interpolate({
                  inputRange: y,
                  outputRange: this.outputRange(+(b - w) / 2, n, o, s),
                }),
              },
            ],
          },
          R = {
            width: h,
            height: b,
            backgroundColor: l,
            borderBottomLeftRadius: w,
            borderBottomRightRadius: w,
            transform: [
              {
                translateY: u.interpolate({
                  inputRange: y,
                  outputRange: this.outputRange(-(b - w) / 2, n, o, s),
                }),
              },
            ],
          };
        return React.default.createElement(
          module12.View,
          {
            style: j,
            key: n,
          },
          React.default.createElement(module12.Animated.View, {
            style: P,
          }),
          React.default.createElement(module12.Animated.View, {
            style: R,
          })
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.style,
          f = module55.default(t, P);
        return React.default.createElement(
          module903.default,
          module21.default(
            {
              style: [module908.default.container, n],
              renderComponent: this.renderComponent,
            },
            f
          )
        );
      },
    },
  ]);
  return M;
})(React.PureComponent);

exports.default = D;
D.defaultProps = {
  count: 3,
  color: 'rgb(0, 0, 0)',
  size: 40,
};
D.propTypes = k(
  k({}, module903.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
