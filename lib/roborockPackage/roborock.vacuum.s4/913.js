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

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (c && (c.get || c.set)) Object.defineProperty(u, f, c);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module905 = require('./905'),
  module914 = require('./914'),
  j = ['style', 'size', 'size'];

function P(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (P = function (t) {
    return t ? o : n;
  })(t);
}

function E(t, n) {
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

function A(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      E(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      E(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function R() {
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

var z = (function (t) {
  module7.default(E, t);

  var module49 = E,
    PropTypes = R(),
    P = function () {
      var t,
        o = module11.default(module49);

      if (PropTypes) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function E(t) {
    var n;
    module4.default(this, E);
    (n = P.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
    return n;
  }

  module5.default(E, [
    {
      key: 'renderComponent',
      value: function (t) {
        var n = t.index,
          o = t.progress,
          u = this.props,
          l = u.size,
          f = u.color,
          c = (60 * u.animationDuration) / 1e3,
          s = module12.Easing.bezier(0.4, 0, 0.7, 1),
          p = Array.from(new Array(c), function (t, n) {
            return n / (c - 1);
          }),
          y = Array.from(new Array(c), function (t, o) {
            var u = (2 * o) / (c - 1),
              l = n ? 345 : -165;
            if (u > 1) u = 2 - u;
            return 150 * (n ? -1 : 1) * s(u) + l + 'deg';
          }),
          h = {
            width: l,
            height: l,
            transform: [
              {
                rotate: o.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['45deg', '765deg'],
                }),
              },
            ],
          },
          w = {
            width: l,
            height: l,
            transform: [
              {
                translateY: n ? -l / 2 : 0,
              },
              {
                rotate: o.interpolate({
                  inputRange: p,
                  outputRange: y,
                }),
              },
            ],
          },
          j = {
            width: l,
            height: l / 2,
            overflow: 'hidden',
          },
          P = n
            ? {
                top: l / 2,
              }
            : null,
          E = {
            width: l,
            height: l,
            borderColor: f,
            borderWidth: l / 10,
            borderRadius: l / 2,
          };
        return React.default.createElement(
          module12.Animated.View,
          {
            style: module914.default.layer,
            key: n,
          },
          React.default.createElement(
            module12.Animated.View,
            {
              style: h,
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: [j, P],
                collapsable: false,
              },
              React.default.createElement(
                module12.Animated.View,
                {
                  style: w,
                },
                React.default.createElement(
                  module12.Animated.View,
                  {
                    style: j,
                    collapsable: false,
                  },
                  React.default.createElement(module12.Animated.View, {
                    style: E,
                  })
                )
              )
            )
          )
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.style,
          l = t.size,
          f = t.size,
          c = module55.default(t, j);
        return React.default.createElement(
          module12.View,
          {
            style: [module914.default.container, n],
          },
          React.default.createElement(
            module905.default,
            module21.default(
              {
                style: {
                  width: l,
                  height: f,
                },
                renderComponent: this.renderComponent,
              },
              c,
              {
                count: 2,
              }
            )
          )
        );
      },
    },
  ]);
  return E;
})(React.PureComponent);

exports.default = z;
z.defaultProps = {
  animationDuration: 2400,
  color: 'rgb(0, 0, 0)',
  size: 40,
};
z.propTypes = A(
  A({}, module905.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
