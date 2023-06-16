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
  module905 = require('./905'),
  module916 = require('./916'),
  j = ['style', 'size'];

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
  module7.default(R, t);

  var module49 = R,
    PropTypes = C(),
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
      key: 'renderBlock',
      value: function (t) {
        var n = t.index,
          o = t.count,
          u = t.progress,
          l = this.props,
          c = l.size,
          f = {
            position: 'absolute',
            top: c / 2 - c / 16,
            left: c / 2 + c / 16 + ((n - 2) * c) / 4,
            width: c / 8,
            height: c / 8,
            borderRadius: c / 16,
            backgroundColor: l.color,
            transform: [
              {
                translateX: u.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, c / (module12.I18nManager.isRTL ? 4 : -4)],
                }),
              },
              {
                scale:
                  o === n + 1
                    ? u.interpolate({
                        inputRange: [0, 0.67, 1],
                        outputRange: [0, 1, 1],
                      })
                    : 1,
              },
            ],
          };
        if (o === n + 1)
          f.opacity = u.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange: [0, 1, 1],
          });
        return React.default.createElement(module12.Animated.View, {
          style: f,
          key: n,
        });
      },
    },
    {
      key: 'renderComponent',
      value: function (t) {
        var n = t.index,
          o = t.count,
          u = t.progress,
          l = this.props,
          c = l.size,
          f = l.color;
        if (n > 1)
          return this.renderBlock({
            index: n,
            count: o,
            progress: u,
          });
        var p = {
            position: 'absolute',
            top: c / 4,
            left: 0,
            width: c / 2,
            height: c / 2,
            transform: [
              {
                rotate: u.interpolate({
                  inputRange: [0, 0.67, 1],
                  outputRange: n ^ module12.I18nManager.isRTL ? ['0deg', '45deg', '0deg'] : ['0deg', '-45deg', '0deg'],
                }),
              },
            ],
          },
          s = {
            width: c / 2,
            height: c / 4,
            overflow: 'hidden',
          },
          y = {
            width: c / 2,
            height: c / 2,
            borderRadius: c / 4,
            backgroundColor: f,
          };

        if (n) {
          s.top = c / 4;
          y.top = -c / 4;
        }

        return React.default.createElement(
          module12.Animated.View,
          {
            style: p,
            key: n,
          },
          React.default.createElement(
            module12.View,
            {
              style: s,
              collapsable: false,
            },
            React.default.createElement(module12.Animated.View, {
              style: y,
            })
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
          c = module55.default(t, j);
        return React.default.createElement(
          module12.View,
          {
            style: [module916.default.container, n],
          },
          React.default.createElement(
            module905.default,
            module21.default(
              {
                style: {
                  width: 1.25 * l,
                  height: l,
                },
                renderComponent: this.renderComponent,
              },
              c,
              {
                count: 5,
              }
            )
          )
        );
      },
    },
  ]);
  return R;
})(React.PureComponent);

exports.default = E;
E.defaultProps = {
  animationDuration: 600,
  color: 'rgb(0, 0, 0)',
  size: 48,
};
E.propTypes = k(
  k({}, module905.default.propTypes),
  {},
  {
    color: PropTypes.default.string,
    size: PropTypes.default.number,
  }
);
