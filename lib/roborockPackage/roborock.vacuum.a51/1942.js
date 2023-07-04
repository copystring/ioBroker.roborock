var module50 = require('./50'),
  module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module1941 = require('./1941');

function O(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function A(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      O(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      O(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function C() {
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

var j = module13.Animated.createAnimatedComponent(module1941.default),
  D = (function (t) {
    module9.default(O, t);

    var module50 = O,
      PropTypes = C(),
      b = function () {
        var t,
          o = module12.default(module50);

        if (PropTypes) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function O(t) {
      var n;
      module6.default(this, O);
      (n = b.call(this, t)).state = {
        fillAnimation: new module13.Animated.Value(t.prefill),
      };
      if (t.onFillChange)
        n.state.fillAnimation.addListener(function (n) {
          var o = n.value;
          return t.onFillChange(o);
        });
      return n;
    }

    module7.default(O, [
      {
        key: 'componentDidMount',
        value: function () {
          this.animate();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t) {
          if (t.fill !== this.props.fill) this.animate();
        },
      },
      {
        key: 'reAnimate',
        value: function (t, n, o, l) {
          var u = this;
          this.setState(
            {
              fillAnimation: new module13.Animated.Value(t),
            },
            function () {
              return u.animate(n, o, l);
            }
          );
        },
      },
      {
        key: 'animate',
        value: function (t, n, o) {
          var l = t >= 0 ? t : this.props.fill,
            u = n || this.props.duration,
            f = o || this.props.easing,
            s = this.props.useNativeDriver,
            p = this.props.delay,
            c = module13.Animated.timing(this.state.fillAnimation, {
              useNativeDriver: s,
              toValue: l,
              easing: f,
              duration: u,
              delay: p,
            });
          c.start(this.props.onAnimationComplete);
          return c;
        },
      },
      {
        key: 'animateColor',
        value: function () {
          return this.props.tintColorSecondary
            ? this.state.fillAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: [this.props.tintColor, this.props.tintColorSecondary],
              })
            : this.props.tintColor;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = module56.default(t, ['fill', 'prefill']);
          return React.default.createElement(
            j,
            module22.default({}, n, {
              fill: this.state.fillAnimation,
              tintColor: this.animateColor(),
            })
          );
        },
      },
    ]);
    return O;
  })(React.default.PureComponent);

exports.default = D;
D.propTypes = A(
  A({}, module1941.default.propTypes),
  {},
  {
    prefill: PropTypes.default.number,
    duration: PropTypes.default.number,
    easing: PropTypes.default.func,
    onAnimationComplete: PropTypes.default.func,
    useNativeDriver: PropTypes.default.bool,
    delay: PropTypes.default.number,
  }
);
D.defaultProps = {
  duration: 500,
  easing: module13.Easing.out(module13.Easing.ease),
  prefill: 0,
  useNativeDriver: false,
  delay: 0,
};
