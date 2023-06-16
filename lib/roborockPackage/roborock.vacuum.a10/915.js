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
    var o = w(n);
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
  module916 = require('./916'),
  P = ['style', 'size', 'size'];

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
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

function E(t) {
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

function k() {
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
  module7.default(R, t);

  var module49 = R,
    PropTypes = k(),
    w = function () {
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
    (n = w.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
    return n;
  }

  module5.default(R, [
    {
      key: 'renderComponent',
      value: function (t) {
        var n = t.index,
          o = t.progress,
          u = this.props,
          l = u.size,
          c = {
            height: l,
            width: l,
            borderRadius: l / 2,
            backgroundColor: u.color,
            transform: [
              {
                scale: o.interpolate({
                  inputRange: [0, 0.67, 1],
                  outputRange: n ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1],
                }),
              },
            ],
            opacity: o.interpolate({
              inputRange: [0, 0.67, 1],
              outputRange: n ? [1, 1, 1] : [0.5, 0.5, 0],
            }),
          };
        return React.default.createElement(
          module12.Animated.View,
          {
            style: module916.default.layer,
            key: n,
          },
          React.default.createElement(module12.Animated.View, {
            style: c,
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
          f = module55.default(t, P);
        return React.default.createElement(
          module12.View,
          {
            style: [module916.default.container, n],
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
              f,
              {
                count: 2,
              }
            )
          )
        );
      },
    },
  ]);
  return R;
})(React.PureComponent);

exports.default = z;
z.defaultProps = {
  animationEasing: module12.Easing.out(module12.Easing.ease),
  color: 'rgb(0, 0, 0)',
  size: 40,
};
z.propTypes = E(
  E({}, module903.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
