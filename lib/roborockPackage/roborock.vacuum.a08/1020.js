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
  module1017 = require('./1017'),
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
  R = (function (t) {
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

    function S(t) {
      var n;
      module4.default(this, S);

      (n = b.call(this, t))._isMovingHorizontally = function (t, n) {
        return Math.abs(n.dx) > Math.abs(2 * n.dy) && Math.abs(n.vx) > Math.abs(2 * n.vy);
      };

      n._canMoveScreen = function (t, o) {
        if (false === n.props.swipeEnabled) return false;
        var s = n.props.navigationState.routes;
        return n._isMovingHorizontally(t, o) && ((o.dx >= O && n._currentIndex > 0) || (o.dx <= -12 && n._currentIndex < s.length - 1));
      };

      n._startGesture = function () {
        if (n.props.onSwipeStart) n.props.onSwipeStart();
        n.props.panX.stopAnimation();
      };

      n._respondToGesture = function (t, o) {
        var s = n.props.navigationState,
          p = s.routes,
          u = s.index;
        if (!((o.dx > 0 && u <= 0) || (o.dx < 0 && u >= p.length - 1))) n.props.panX.setValue(o.dx);
      };

      n._finishGesture = function (t, o) {
        var s = n.props,
          p = s.navigationState,
          u = s.layout,
          l = s.swipeDistanceThreshold,
          c = undefined === l ? u.width / 1.75 : l,
          f = n.props.swipeVelocityThreshold,
          h = undefined === f ? 0.15 : f;
        if (n.props.onSwipeEnd) n.props.onSwipeEnd();
        if ('android' === module12.Platform.OS) h /= 1e6;
        var v = 'number' == typeof n._pendingIndex ? n._pendingIndex : n._currentIndex,
          b = v;

        if (Math.abs(o.dx) > Math.abs(o.dy) && Math.abs(o.vx) > Math.abs(o.vy) && (Math.abs(o.dx) > c || Math.abs(o.vx) > h)) {
          b = Math.round((0 ** (v - o.dx / Math.abs(o.dx))) ** (p.routes.length - 1));
          n._currentIndex = b;
        }

        if (!(isFinite(b) && n.props.canJumpToTab(n.props.navigationState.routes[b]))) b = v;

        n._transitionTo(b);
      };

      n._transitionTo = function (t) {
        var o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
          p = -t * n.props.layout.width;

        if (false === n.props.animationEnabled || false === o) {
          n.props.panX.setValue(0);
          return void n.props.offsetX.setValue(p);
        }

        var u = P.timing,
          l = module55.default(P, x);
        module12.Animated.parallel([
          u(
            n.props.panX,
            w(
              w({}, l),
              {},
              {
                toValue: 0,
              }
            )
          ),
          u(
            n.props.offsetX,
            w(
              w({}, l),
              {},
              {
                toValue: p,
              }
            )
          ),
        ]).start(function (o) {
          if (o.finished) {
            var s = n.props.navigationState.routes[t];
            n.props.jumpTo(s.key);
            if (n.props.onAnimationEnd) n.props.onAnimationEnd();
            n._pendingIndex = null;
          }
        });
        n._pendingIndex = t;
      };

      n._currentIndex = n.props.navigationState.index;
      return n;
    }

    module5.default(S, [
      {
        key: 'componentWillMount',
        value: function () {
          this._panResponder = module12.PanResponder.create({
            onMoveShouldSetPanResponder: this._canMoveScreen,
            onMoveShouldSetPanResponderCapture: this._canMoveScreen,
            onPanResponderGrant: this._startGesture,
            onPanResponderMove: this._respondToGesture,
            onPanResponderTerminate: this._finishGesture,
            onPanResponderRelease: this._finishGesture,
            onPanResponderTerminationRequest: function () {
              return true;
            },
          });
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t) {
          this._currentIndex = this.props.navigationState.index;
          if (t.navigationState.routes !== this.props.navigationState.routes || t.layout.width !== this.props.layout.width)
            this._transitionTo(this.props.navigationState.index, false);
          else if (t.navigationState.index !== this.props.navigationState.index) this._transitionTo(this.props.navigationState.index);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            o = t.panX,
            s = t.offsetX,
            p = t.navigationState,
            u = t.layout,
            l = t.children,
            c = u.width,
            f = p.routes,
            v = c * (f.length - 1),
            b = module12.Animated.add(o, s).interpolate({
              inputRange: [-v, 0],
              outputRange: [-v, 0],
              extrapolate: 'clamp',
            });
          return React.createElement(
            module12.Animated.View,
            module21.default(
              {
                style: [
                  j.sheet,
                  c
                    ? {
                        width: f.length * c,
                        transform: [
                          {
                            translateX: b,
                          },
                        ],
                      }
                    : null,
                ],
              },
              this._panResponder.panHandlers
            ),
            React.Children.map(l, function (t, n) {
              return React.createElement(
                module12.View,
                {
                  key: p.routes[n].key,
                  testID: p.routes[n].testID,
                  style: c
                    ? {
                        width: c,
                      }
                    : n === p.index
                    ? module12.StyleSheet.absoluteFill
                    : null,
                },
                n === p.index || c ? t : null
              );
            })
          );
        },
      },
    ]);
    return S;
  })(React.Component);

exports.default = R;
R.propTypes = w(
  w({}, module1017.PagerRendererPropType),
  {},
  {
    swipeDistanceThreshold: PropTypes.default.number,
    swipeVelocityThreshold: PropTypes.default.number,
  }
);
R.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
  initialLayout: {
    height: 0,
    width: 0,
  },
};
var j = module12.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
