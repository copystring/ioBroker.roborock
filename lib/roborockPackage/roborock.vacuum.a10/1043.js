var module21 = require('./21'),
  module49 = require('./49'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
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
    var o = S(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      p = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var l = p ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (l && (l.get || l.set)) Object.defineProperty(s, u, l);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1039 = require('./1039'),
  x = ['timing'];

function S(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (S = function (t) {
    return t ? o : n;
  })(t);
}

function _(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function w(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      _(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      _(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function M() {
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

var O = 12,
  P = {
    timing: module12.Animated.spring,
    tension: 300,
    friction: 35,
  },
  T = (function (t, ...args) {
    module7.default(S, t);

    var module49 = S,
      PropTypes = M(),
      b = function () {
        var t,
          n = module11.default(module49);

        if (PropTypes) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function S() {
      var t;
      module4.default(this, S);
      (t = b.call(this, ...args))._currentIndex = t.props.navigationState.index;

      t._isMovingHorizontally = function (t, n) {
        return Math.abs(n.dx) > Math.abs(2 * n.dy) && Math.abs(n.vx) > Math.abs(2 * n.vy);
      };

      t._canMoveScreen = function (n, o) {
        if (false === t.props.swipeEnabled) return false;
        var s = t.props.navigationState.routes;
        return t._isMovingHorizontally(n, o) && ((o.dx >= O && t._currentIndex > 0) || (o.dx <= -12 && t._currentIndex < s.length - 1));
      };

      t._startGesture = function () {
        if (t.props.onSwipeStart) t.props.onSwipeStart();
        t.props.panX.stopAnimation();
      };

      t._respondToGesture = function (n, o) {
        var s = t.props.navigationState,
          p = s.routes,
          u = s.index;
        if (!((o.dx > 0 && u <= 0) || (o.dx < 0 && u >= p.length - 1))) t.props.panX.setValue(o.dx);
      };

      t._finishGesture = function (n, o) {
        var s = t.props,
          p = s.navigationState,
          u = s.layout,
          l = s.swipeDistanceThreshold,
          c = undefined === l ? u.width / 1.75 : l,
          f = t.props.swipeVelocityThreshold,
          h = undefined === f ? 0.15 : f;
        if (t.props.onSwipeEnd) t.props.onSwipeEnd();
        if ('android' === module12.Platform.OS) h /= 1e6;
        var v = 'number' == typeof t._pendingIndex ? t._pendingIndex : t._currentIndex,
          b = v;

        if (Math.abs(o.dx) > Math.abs(o.dy) && Math.abs(o.vx) > Math.abs(o.vy) && (Math.abs(o.dx) > c || Math.abs(o.vx) > h)) {
          b = Math.round((0 ** (v - o.dx / Math.abs(o.dx))) ** (p.routes.length - 1));
          t._currentIndex = b;
        }

        if (
          !(
            isFinite(b) &&
            t.props.canJumpToTab({
              route: t.props.navigationState.routes[b],
            })
          )
        )
          b = v;

        t._transitionTo(b);
      };

      t._transitionTo = function (n) {
        var o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
          p = -n * t.props.layout.width,
          u = t.props.navigationState.routes[n];

        if (false === t.props.animationEnabled || false === o) {
          t.props.panX.setValue(0);
          t.props.offsetX.setValue(p);
          return void t.props.jumpTo(u.key);
        }

        var l = P.timing,
          c = module55.default(P, x);
        module12.Animated.parallel([
          l(
            t.props.panX,
            w(
              w({}, c),
              {},
              {
                toValue: 0,
              }
            )
          ),
          l(
            t.props.offsetX,
            w(
              w({}, c),
              {},
              {
                toValue: p,
              }
            )
          ),
        ]).start(function (n) {
          if (n.finished) {
            t.props.jumpTo(u.key);
            if (t.props.onAnimationEnd) t.props.onAnimationEnd();
            t._pendingIndex = null;
          }
        });
        t._pendingIndex = n;
      };

      t._panResponder = module12.PanResponder.create({
        onMoveShouldSetPanResponder: t._canMoveScreen,
        onMoveShouldSetPanResponderCapture: t._canMoveScreen,
        onPanResponderGrant: t._startGesture,
        onPanResponderMove: t._respondToGesture,
        onPanResponderTerminate: t._finishGesture,
        onPanResponderRelease: t._finishGesture,
        onPanResponderTerminationRequest: function () {
          return true;
        },
      });
      return t;
    }

    module5.default(S, [
      {
        key: 'componentDidUpdate',
        value: function (t) {
          this._currentIndex = this.props.navigationState.index;
          if (t.navigationState.routes.length !== this.props.navigationState.routes.length || t.layout.width !== this.props.layout.width)
            this._transitionTo(this.props.navigationState.index, false);
          else if (t.navigationState.index !== this.props.navigationState.index) this._transitionTo(this.props.navigationState.index);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props,
            s = o.panX,
            p = o.offsetX,
            u = o.navigationState,
            l = o.layout,
            c = o.children,
            f = l.width,
            v = u.routes,
            b = f * (v.length - 1),
            x = module12.Animated.multiply(
              module12.Animated.add(s, p).interpolate({
                inputRange: [-b, 0],
                outputRange: [-b, 0],
                extrapolate: 'clamp',
              }),
              module12.I18nManager.isRTL ? -1 : 1
            );
          return React.createElement(
            module12.Animated.View,
            module21.default(
              {
                style: [
                  R.sheet,
                  f
                    ? {
                        width: v.length * f,
                        transform: [
                          {
                            translateX: x,
                          },
                        ],
                      }
                    : null,
                ],
              },
              this._panResponder.panHandlers
            ),
            React.Children.map(c, function (n, o) {
              var s = u.routes[o],
                p = o === u.index;
              return React.createElement(
                module12.View,
                {
                  key: s.key,
                  testID: t.props.getTestID({
                    route: s,
                  }),
                  style: f
                    ? {
                        width: f,
                      }
                    : p
                    ? module12.StyleSheet.absoluteFill
                    : null,
                },
                p || f ? n : null
              );
            })
          );
        },
      },
    ]);
    return S;
  })(React.Component);

exports.default = T;
T.propTypes = w(
  w({}, module1039.PagerRendererPropType),
  {},
  {
    swipeDistanceThreshold: PropTypes.default.number,
    swipeVelocityThreshold: PropTypes.default.number,
  }
);
T.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  initialLayout: {
    height: 0,
    width: 0,
  },
};
var R = module12.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
