var module22 = require('./22'),
  module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module1287 = require('./1287');

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
    timing: module13.Animated.spring,
    tension: 300,
    friction: 35,
  },
  R = (function (t) {
    module9.default(S, t);

    var n = S,
      module50 = w(),
      y = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var p = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, p);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function S(t) {
      var n;
      module6.default(this, S);

      (n = y.call(this, t))._isMovingHorizontally = function (t, n) {
        return Math.abs(n.dx) > Math.abs(2 * n.dy) && Math.abs(n.vx) > Math.abs(2 * n.vy);
      };

      n._canMoveScreen = function (t, o) {
        if (false === n.props.swipeEnabled) return false;
        var s = n.props.navigationState.routes;
        return n._isMovingHorizontally(t, o) && ((o.dx >= M && n._currentIndex > 0) || (o.dx <= -12 && n._currentIndex < s.length - 1));
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
          h = n.props.swipeVelocityThreshold,
          f = undefined === h ? 0.15 : h;
        if (n.props.onSwipeEnd) n.props.onSwipeEnd();
        if ('android' === module13.Platform.OS) f /= 1e6;
        var v = 'number' == typeof n._pendingIndex ? n._pendingIndex : n._currentIndex,
          y = v;

        if (Math.abs(o.dx) > Math.abs(o.dy) && Math.abs(o.vx) > Math.abs(o.vy) && (Math.abs(o.dx) > c || Math.abs(o.vx) > f)) {
          y = Math.round((0 ** (v - o.dx / Math.abs(o.dx))) ** (p.routes.length - 1));
          n._currentIndex = y;
        }

        if (!(isFinite(y) && n.props.canJumpToTab(n.props.navigationState.routes[y]))) y = v;

        n._transitionTo(y);
      };

      n._transitionTo = function (t) {
        var o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
          s = -t * n.props.layout.width;

        if (false === n.props.animationEnabled || false === o) {
          n.props.panX.setValue(0);
          return void n.props.offsetX.setValue(s);
        }

        var u = P.timing,
          l = module56.default(P, ['timing']);
        module13.Animated.parallel([
          u(
            n.props.panX,
            _(
              _({}, l),
              {},
              {
                toValue: 0,
              }
            )
          ),
          u(
            n.props.offsetX,
            _(
              _({}, l),
              {},
              {
                toValue: s,
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

    module7.default(S, [
      {
        key: 'componentWillMount',
        value: function () {
          this._panResponder = module13.PanResponder.create({
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
            n = t.panX,
            s = t.offsetX,
            p = t.navigationState,
            u = t.layout,
            l = t.children,
            c = u.width,
            h = p.routes,
            f = c * (h.length - 1),
            y = module13.Animated.add(n, s).interpolate({
              inputRange: [-f, 0],
              outputRange: [-f, 0],
              extrapolate: 'clamp',
            });
          return React.createElement(
            module13.Animated.View,
            module22.default(
              {
                style: [
                  O.sheet,
                  c
                    ? {
                        width: h.length * c,
                        transform: [
                          {
                            translateX: y,
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
                module13.View,
                {
                  key: p.routes[n].key,
                  testID: p.routes[n].testID,
                  style: c
                    ? {
                        width: c,
                      }
                    : n === p.index
                    ? module13.StyleSheet.absoluteFill
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
R.propTypes = _(
  _({}, module1287.PagerRendererPropType),
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
var O = module13.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
