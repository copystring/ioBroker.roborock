var module49 = require('./49'),
  module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
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
    var o = P(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module903 = require('./903'),
  module918 = require('./918'),
  w = ['style', 'size', 'size'];

function P(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (P = function (t) {
    return t ? o : n;
  })(t);
}

function R(t, n) {
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
      R(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      R(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function z() {
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
  module7.default(R, t);

  var module49 = R,
    PropTypes = z(),
    P = function () {
      var t,
        o = module11.default(module49);

      if (PropTypes) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function R(t) {
    var n;
    module4.default(this, R);
    (n = P.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
    return n;
  }

  module5.default(R, [
    {
      key: 'renderComponent',
      value: function (t) {
        var n = t.index,
          o = t.count,
          u = t.progress,
          l = this.props,
          c = l.size,
          f = l.minScale,
          p = l.maxScale,
          s = l.color,
          y = (60 * l.animationDuration) / 1e3,
          b = n / (o - 1),
          h = module12.Easing.bezier(0.5, b, 0.5, 1),
          w = Array.from(new Array(y), function (t, n) {
            return n / (y - 1);
          }),
          P = Array.from(new Array(y), function (t, n) {
            return 360 * h(n / (y - 1)) + 'deg';
          }),
          R = {
            transform: [
              {
                rotate: u.interpolate({
                  inputRange: w,
                  outputRange: P,
                }),
              },
            ],
          },
          k = {
            width: c / 5,
            height: c / 5,
            borderRadius: c / 10,
            backgroundColor: s,
            transform: [
              {
                scale: u.interpolate({
                  inputRange: [0, 1],
                  outputRange: [p - (p - f) * b, f + (p - f) * b],
                }),
              },
            ],
          };
        return React.default.createElement(
          module12.Animated.View,
          {
            style: [module918.default.layer, R],
            key: n,
          },
          React.default.createElement(module12.Animated.View, {
            style: k,
          })
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.style,
          l = t.size,
          c = t.size,
          f = module55.default(t, w);
        return React.default.createElement(
          module12.View,
          {
            style: [module918.default.container, n],
          },
          React.default.createElement(
            module903.default,
            module21.default(
              {
                style: {
                  width: l,
                  height: c,
                },
                renderComponent: this.renderComponent,
              },
              f
            )
          )
        );
      },
    },
  ]);
  return R;
})(React.PureComponent);

exports.default = D;
D.defaultProps = {
  animationDuration: 1600,
  color: 'rgb(0, 0, 0)',
  count: 5,
  size: 40,
  minScale: 0.2,
  maxScale: 1,
};
D.propTypes = k(
  k({}, module903.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
    minScale: PropTypes.default.number,
    maxScale: PropTypes.default.number,
  }
);
