var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module49 = require('./49'),
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
  module924 = require('./924'),
  j = ['style', 'size', 'size'];

function P(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (P = function (t) {
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

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      M(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      M(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function E() {
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

var k = (function (t) {
  module7.default(R, t);

  var PropTypes = R,
    P = E(),
    M = function () {
      var t,
        n = module11.default(PropTypes);

      if (P) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R(t) {
    var n;
    module4.default(this, R);
    (n = M.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
    return n;
  }

  module5.default(R, [
    {
      key: 'renderComponent',
      value: function (t) {
        module49.default(module21, y ? 'backgroundColor' : 'borderColor', p);
        module49.default(module21, 'transform', [
          {
            scale: l.interpolate({
              inputRange: [0, 1 - s ** o, 1],
              outputRange: [0, 0, 1],
            }),
          },
        ]);
        module49.default(
          module21,
          'opacity',
          l.interpolate({
            inputRange: [0, 1 - s ** o, 1],
            outputRange: [1, 1, 0],
          })
        );
        var module21 = {
            height: c,
            width: c,
            borderRadius: c / 2,
            borderWidth: y ? 0 : Math.floor(c / 20),
          },
          o = t.index,
          l = t.progress,
          f = this.props,
          c = f.size,
          p = f.color,
          s = f.waveFactor,
          y = 'fill' === f.waveMode,
          b = module21;
        return React.default.createElement(
          module12.Animated.View,
          {
            style: module924.default.layer,
            key: o,
          },
          React.default.createElement(module12.Animated.View, {
            style: b,
          })
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.style,
          l = t.size,
          f = t.size,
          c = module55.default(t, j);
        return React.default.createElement(
          module12.View,
          {
            style: [module924.default.container, u],
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
              c
            )
          )
        );
      },
    },
  ]);
  return R;
})(React.PureComponent);

exports.default = k;
k.defaultProps = {
  animationEasing: module12.Easing.out(module12.Easing.ease),
  animationDuration: 1600,
  waveFactor: 0.54,
  waveMode: 'fill',
  color: 'rgb(0, 0, 0)',
  count: 4,
  size: 40,
};
k.propTypes = R(
  R({}, module905.default.propTypes),
  {},
  {
    waveFactor: PropTypes.default.number,
    waveMode: PropTypes.default.oneOf(['fill', 'outline']),
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
