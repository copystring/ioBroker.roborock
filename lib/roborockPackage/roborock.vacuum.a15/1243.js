var module22 = require('./22'),
  module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1239 = require('./1239');

function b(t, n) {
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

function _(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      b(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function w() {
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

var M = 12,
  P = {
    timing: module12.Animated.spring,
    tension: 300,
    friction: 35,
  },
  T = (function (t, ...args) {
    module7.default(S, t);

    var n = S,
      module50 = w(),
      y = function () {
        var t,
          o = module11.default(n);

        if (module50) {
          var p = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, p);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function S() {
      var t;
      module4.default(this, S);
      (t = y.call(this, ...args))._currentIndex = t.props.navigationState.index;

      t._isMovingHorizontally = function (t, n) {
        return Math.abs(n.dx) > Math.abs(2 * n.dy) && Math.abs(n.vx) > Math.abs(2 * n.vy);
      };

      t._canMoveScreen = function (n, o) {
        if (false === t.props.swipeEnabled) return false;
        var s = t.props.navigationState.routes;
        return t._isMovingHorizontally(n, o) && ((o.dx >= M && t._currentIndex > 0) || (o.dx <= -12 && t._currentIndex < s.length - 1));
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
          y = v;

        if (Math.abs(o.dx) > Math.abs(o.dy) && Math.abs(o.vx) > Math.abs(o.vy) && (Math.abs(o.dx) > c || Math.abs(o.vx) > h)) {
          y = Math.round((0 ** (v - o.dx / Math.abs(o.dx))) ** (p.routes.length - 1));
          t._currentIndex = y;
        }

        if (
          !(
            isFinite(y) &&
            t.props.canJumpToTab({
              route: t.props.navigationState.routes[y],
            })
          )
        )
          y = v;

        t._transitionTo(y);
      };

      t._transitionTo = function (n) {
        var o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
          s = -n * t.props.layout.width,
          u = t.props.navigationState.routes[n];

        if (false === t.props.animationEnabled || false === o) {
          t.props.panX.setValue(0);
          t.props.offsetX.setValue(s);
          return void t.props.jumpTo(u.key);
        }

        var l = P.timing,
          c = module56.default(P, ['timing']);
        module12.Animated.parallel([
          l(
            t.props.panX,
            _(
              _({}, c),
              {},
              {
                toValue: 0,
              }
            )
          ),
          l(
            t.props.offsetX,
            _(
              _({}, c),
              {},
              {
                toValue: s,
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
            n = this.props,
            s = n.panX,
            p = n.offsetX,
            u = n.navigationState,
            l = n.layout,
            c = n.children,
            f = l.width,
            h = u.routes,
            y = f * (h.length - 1),
            S = module12.Animated.multiply(
              module12.Animated.add(s, p).interpolate({
                inputRange: [-y, 0],
                outputRange: [-y, 0],
                extrapolate: 'clamp',
              }),
              module12.I18nManager.isRTL ? -1 : 1
            );
          return React.createElement(
            module12.Animated.View,
            module22.default(
              {
                style: [
                  R.sheet,
                  f
                    ? {
                        width: h.length * f,
                        transform: [
                          {
                            translateX: S,
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
T.propTypes = _(
  _({}, module1239.PagerRendererPropType),
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
