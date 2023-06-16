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
    var o = k(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module903 = require('./903'),
  module920 = require('./920'),
  P = ['style', 'size', 'size'];

function k(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (k = function (t) {
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

function z(t) {
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

var A = (function (t) {
  module7.default(R, t);

  var module49 = R,
    PropTypes = C(),
    k = function () {
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
    (n = k.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
    return n;
  }

  module5.default(R, [
    {
      key: 'renderComponent',
      value: function (t) {
        for (
          var n = t.index,
            o = t.count,
            u = t.progress,
            c = this.props,
            l = c.size,
            p = c.color,
            s = {
              transform: [
                {
                  rotate: (360 * n) / o + 'deg',
                },
              ],
            },
            y = Array.from(new Array(o + 1), function (t, n) {
              return n / o;
            }),
            O = Array.from(new Array(o), function (t, n) {
              return (1 - n * (1 / (o - 1))) ** 0;
            }),
            b = 0;
          b < n;
          b++
        )
          O.unshift(O.pop());

        O.unshift.apply(O, module30.default(O.slice(-1)));
        var j = {
          width: l / 10,
          height: l / 4,
          borderRadius: l / 20,
          backgroundColor: p,
          opacity: u.interpolate({
            inputRange: y,
            outputRange: O,
          }),
        };
        return React.default.createElement(
          module12.Animated.View,
          {
            style: [module920.default.layer, s],
            key: n,
          },
          React.default.createElement(module12.Animated.View, {
            style: j,
          })
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.style,
          f = t.size,
          c = t.size,
          l = module55.default(t, P);
        return React.default.createElement(
          module12.View,
          {
            style: [module920.default.container, n],
          },
          React.default.createElement(
            module903.default,
            module21.default(
              {
                style: {
                  width: f,
                  height: c,
                },
                renderComponent: this.renderComponent,
              },
              l
            )
          )
        );
      },
    },
  ]);
  return R;
})(React.PureComponent);

exports.default = A;
A.defaultProps = {
  color: 'rgb(0, 0, 0)',
  count: 12,
  size: 40,
};
A.propTypes = z(
  z({}, module903.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
