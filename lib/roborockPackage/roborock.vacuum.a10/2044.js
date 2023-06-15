var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var l = c ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, s, l);
        else u[s] = t[s];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
    return t ? o : n;
  })(t);
}

function y(t, n) {
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

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      y(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      y(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function O() {
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

var R = 0;
exports.DirectionMiddle = R;
exports.DirectionLeft = 1;
var w = 2;
exports.DirectionRight = w;

var b = function () {
    return module12.Dimensions.get('window').width;
  },
  j = function () {
    return module12.Dimensions.get('window').height;
  },
  D = 60,
  M = (function (t) {
    module7.default(M, t);

    var module49 = M,
      h = O(),
      y = function () {
        var t,
          o = module11.default(module49);

        if (h) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function M(t) {
      var n;
      module4.default(this, M);
      (n = y.call(this, t)).state = {};
      var u = t.direction,
        c = b(),
        s = j(),
        l = (u == R ? b() : j()) / 2;
      n.maxDepth = u == R ? 120 : 200;
      n.minRadius = (3600 + l * l) / 120;
      var f = n.minRadius ** 2 - l ** 2;
      n.maxRadius = f ** 0.5 + n.maxDepth;
      console.log('w', l, 'minRadius', n.minRadius, 'maxRadius', n.maxRadius);
      n.animatedRadius = new module12.Animated.Value(n.minRadius);
      n.animatedOpacity = new module12.Animated.Value(0);
      n.animatedMargin = new module12.Animated.Value(-(2 * n.minRadius - D));
      var h = [
        {
          marginTop: n.animatedMargin,
        },
        {
          marginLeft: n.animatedMargin,
        },
        {
          marginRight: n.animatedMargin,
        },
      ];
      n.margin = h[u];
      var O =
          u == w
            ? {
                top: 0,
                right: 0,
              }
            : {
                top: 0,
                left: 0,
              },
        P =
          u == R
            ? {
                alignItems: 'center',
              }
            : u == w
            ? {
                justifyContent: 'center',
                alignItems: 'flex-end',
              }
            : {
                justifyContent: 'center',
              };
      n.positionStyle = v(
        v(
          {
            width: c,
            height: s,
          },
          O
        ),
        P
      );
      return n;
    }

    module5.default(M, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.animate();
        },
      },
      {
        key: 'animate',
        value: function () {
          var t = module12.Animated.timing(this.animatedRadius, {
              toValue: this.maxRadius,
              duration: 1200,
            }),
            n = module12.Animated.timing(this.animatedMargin, {
              toValue: -(2 * this.maxRadius - this.maxDepth),
              duration: 1200,
            }),
            o = module12.Animated.timing(this.animatedOpacity, {
              toValue: 1,
              duration: 1200,
            }),
            u = module12.Animated.parallel([t, o, n]),
            c = module12.Animated.timing(this.animatedOpacity, {
              toValue: 0,
              duration: 300,
            }),
            s = module12.Animated.sequence([u, c]);
          module12.Animated.loop(s, {
            interations: -1,
          }).start();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.animatedRadius.interpolate({
            inputRange: [this.minRadius, this.maxRadius],
            outputRange: [2 * this.minRadius, 2 * this.maxRadius],
          });
          return React.default.createElement(
            module12.View,
            {
              style: [P.containter, this.positionStyle],
            },
            React.default.createElement(module12.Animated.View, {
              style: [
                P.circle,
                v(
                  v({}, this.margin),
                  {},
                  {
                    opacity: this.animatedOpacity,
                    width: t,
                    height: t,
                    borderRadius: this.animatedRadius,
                  }
                ),
              ],
            })
          );
        },
      },
    ]);
    return M;
  })(React.Component);

exports.BumperView = M;
M.defaultProps = {
  direction: R,
};
var P = module12.StyleSheet.create({
  containter: {
    position: 'absolute',
    zIndex: 2,
  },
  circle: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
