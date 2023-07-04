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
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var l = c ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, f, l);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module905 = require('./905'),
  module912 = require('./912'),
  P = ['style'];

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

function k(t, n) {
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

function R(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      k(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      k(Object(u)).forEach(function (n) {
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

var E = (function (t) {
  module7.default(k, t);

  var module49 = k,
    PropTypes = C(),
    w = function () {
      var t,
        o = module11.default(module49);

      if (PropTypes) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function k(t) {
    var n;
    module4.default(this, k);
    (n = w.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
    return n;
  }

  module5.default(k, [
    {
      key: 'renderComponent',
      value: function (t) {
        var n = t.index,
          o = t.count,
          u = t.progress,
          c = this.props,
          f = c.size,
          l = {
            width: f,
            height: f,
            margin: f / 2,
            borderRadius: f / 2,
            backgroundColor: c.color,
            transform: [
              {
                scale: u.interpolate({
                  inputRange: [0, (n + 0.5) / (o + 1), (n + 1) / (o + 1), (n + 1.5) / (o + 1), 1],
                  outputRange: [1, 1.36, 1.56, 1.06, 1],
                }),
              },
            ],
          };
        return React.default.createElement(module12.Animated.View, {
          style: l,
          key: n,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.style,
          c = module55.default(t, P);
        return React.default.createElement(
          module905.default,
          module21.default(
            {
              style: [module912.default.container, n],
              renderComponent: this.renderComponent,
            },
            c
          )
        );
      },
    },
  ]);
  return k;
})(React.PureComponent);

exports.default = E;
E.defaultProps = {
  animationEasing: module12.Easing.inOut(module12.Easing.ease),
  color: 'rgb(0, 0, 0)',
  count: 4,
  size: 16,
};
E.propTypes = R(
  R({}, module905.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
