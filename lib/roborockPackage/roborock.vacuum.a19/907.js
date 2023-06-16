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
  module905 = require('./905'),
  module908 = require('./908'),
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
            l = this.props,
            c = l.size,
            p = l.color,
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
              return 1.2 - (0.5 * n) / (o - 1);
            }),
            b = 0;
          b < n;
          b++
        )
          O.unshift(O.pop());

        O.unshift.apply(O, module30.default(O.slice(-1)));
        var j = {
          margin: c / 20,
          backgroundColor: p,
          width: c / 5,
          height: c / 5,
          borderRadius: c / 10,
          transform: [
            {
              scale: u.interpolate({
                inputRange: y,
                outputRange: O,
              }),
            },
          ],
        };
        return React.default.createElement(
          module12.Animated.View,
          {
            style: [module908.default.layer, s],
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
          l = t.size,
          c = module55.default(t, P);
        return React.default.createElement(
          module12.View,
          {
            style: [module908.default.container, n],
          },
          React.default.createElement(
            module905.default,
            module21.default(
              {
                style: {
                  width: f,
                  height: l,
                },
                renderComponent: this.renderComponent,
              },
              c
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
  count: 8,
  size: 40,
};
A.propTypes = z(
  z({}, module905.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
