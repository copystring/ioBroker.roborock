var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module22 = require('./22'),
  PropTypes = require('prop-types'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var l = s ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, f, l);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  A = ['count'];

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
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

var module906 = require('./906')
    .default.version.split('.')
    .map(function (t) {
      return Number(t);
    }),
  P = module22.default(module906, 2),
  w = P[0],
  j = P[1],
  C = !w && j >= 45,
  D = (function (t) {
    module7.default(O, t);

    var module22 = O,
      PropTypes = k(),
      b = function () {
        var t,
          n = module11.default(module22);

        if (PropTypes) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var n;
      module4.default(this, O);
      (n = b.call(this, t)).renderComponent = n.renderComponent.bind(module6.default(n));
      n.startAnimation = n.startAnimation.bind(module6.default(n));
      n.stopAnimation = n.stopAnimation.bind(module6.default(n));
      n.state = {
        progress: new module12.Animated.Value(0),
      };
      n.mounted = false;
      return n;
    }

    module5.default(O, [
      {
        key: 'startAnimation',
        value: function () {
          var t = (arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {}).finished,
            n = this.state.progress,
            o = this.props,
            u = o.interaction,
            s = o.animationEasing,
            f = o.animationDuration;

          if (this.mounted && false !== t) {
            var l = module12.Animated.timing(n, {
              duration: f,
              easing: s,
              useNativeDriver: true,
              isInteraction: u,
              toValue: 1,
            });
            if (C) module12.Animated.loop(l).start();
            else {
              n.setValue(0);
              l.start(this.startAnimation);
            }
            this.setState({
              animation: l,
            });
          }
        },
      },
      {
        key: 'stopAnimation',
        value: function () {
          var t = this.state.animation;

          if (null != t) {
            t.stop();
            this.setState({
              animation: null,
            });
          }
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          var t = this.props.animating;
          this.mounted = true;
          if (t) this.startAnimation();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mounted = false;
        },
      },
      {
        key: 'componentWillReceiveProps',
        value: function (t) {
          var n = this.props.animating;
          if (n ^ t.animating) n ? this.stopAnimation() : this.startAnimation();
        },
      },
      {
        key: 'renderComponent',
        value: function (t, n) {
          var o = this.state.progress,
            u = this.props,
            s = u.renderComponent,
            f = u.count;
          return 'function' == typeof s
            ? s({
                index: n,
                count: f,
                progress: o,
              })
            : null;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            o = t.count,
            u = module55.default(t, A);
          return React.default.createElement(module12.Animated.View, u, Array.from(new Array(o), this.renderComponent));
        },
      },
    ]);
    return O;
  })(React.PureComponent);

exports.default = D;
D.defaultProps = {
  animationEasing: module12.Easing.linear,
  animationDuration: 1200,
  animating: true,
  interaction: true,
  count: 1,
};
D.propTypes = {
  animationEasing: PropTypes.default.func,
  animationDuration: PropTypes.default.number,
  animating: PropTypes.default.bool,
  interaction: PropTypes.default.bool,
  renderComponent: PropTypes.default.func,
  count: PropTypes.default.number,
};
