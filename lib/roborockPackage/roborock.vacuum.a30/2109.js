var module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

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

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      y(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      y(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function v() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var w = 0;
exports.DirectionMiddle = w;
exports.DirectionLeft = 1;
var O = 2;
exports.DirectionRight = O;

var b = function () {
    return module12.Dimensions.get('window').width;
  },
  D = function () {
    return module12.Dimensions.get('window').height;
  },
  j = 60,
  x = (function (t) {
    module7.default(x, t);

    var n = x,
      module50 = v(),
      y = function () {
        var t,
          u = module11.default(n);

        if (module50) {
          var c = module11.default(this).constructor;
          t = Reflect.construct(u, arguments, c);
        } else t = u.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      var n;
      module4.default(this, x);
      (n = y.call(this, t)).state = {};
      var o = t.direction,
        c = b(),
        s = D(),
        l = (o == w ? b() : D()) / 2;
      n.maxDepth = o == w ? 120 : 200;
      n.minRadius = (3600 + l * l) / 120;
      var f = n.minRadius ** 2 - l ** 2;
      n.maxRadius = f ** 0.5 + n.maxDepth;
      console.log('w', l, 'minRadius', n.minRadius, 'maxRadius', n.maxRadius);
      n.animatedRadius = new module12.Animated.Value(n.minRadius);
      n.animatedOpacity = new module12.Animated.Value(0);
      n.animatedMargin = new module12.Animated.Value(-(2 * n.minRadius - j));
      var p = [
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
      n.margin = p[o];
      var v =
          o == O
            ? {
                top: 0,
                right: 0,
              }
            : {
                top: 0,
                left: 0,
              },
        M =
          o == w
            ? {
                alignItems: 'center',
              }
            : o == O
            ? {
                justifyContent: 'center',
                alignItems: 'flex-end',
              }
            : {
                justifyContent: 'center',
              };
      n.positionStyle = R(
        R(
          {
            width: c,
            height: s,
          },
          v
        ),
        M
      );
      return n;
    }

    module5.default(x, [
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
              style: [M.containter, this.positionStyle],
            },
            React.default.createElement(module12.Animated.View, {
              style: [
                M.circle,
                R(
                  R({}, this.margin),
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
    return x;
  })(React.Component);

exports.BumperView = x;
x.defaultProps = {
  direction: w,
};
var M = module12.StyleSheet.create({
  containter: {
    position: 'absolute',
    zIndex: 2,
  },
  circle: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
