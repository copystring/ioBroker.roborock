var module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module1294 = require('./1294');

function S(t, n) {
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
      S(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      S(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function D() {
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

var _ = {
    timing: module13.Animated.spring,
    tension: 75,
    friction: 25,
  },
  x = (function (t, ...args) {
    module9.default(b, t);

    var n = b,
      module50 = D(),
      v = function () {
        var t,
          s = module12.default(n);

        if (module50) {
          var p = module12.default(this).constructor;
          t = Reflect.construct(s, arguments, p);
        } else t = s.apply(this, arguments);

        return module11.default(this, t);
      };

    function b() {
      var t;
      module6.default(this, b);

      (t = v.call(this, ...args))._handleHandlerStateChange = function (n) {
        var o = t.props.GestureHandler;
        if (n.nativeEvent.state === o.State.BEGIN) t.props.onSwipeStart && t.props.onSwipeStart();
        else if (n.nativeEvent.state === o.State.END) {
          if (t.props.onSwipeEnd) t.props.onSwipeEnd();
          var s = t.props,
            p = s.navigationState,
            l = s.layout,
            u = s.swipeDistanceThreshold,
            c = undefined === u ? l.width / 1.75 : u,
            f = s.swipeVelocityThreshold,
            h = undefined === f ? 150 : f,
            v = n.nativeEvent,
            y = v.translationX,
            b = v.translationY,
            S = v.velocityX,
            w = v.velocityY,
            D = 'number' == typeof t._pendingIndex ? t._pendingIndex : p.index,
            _ = D;
          if (Math.abs(y) > Math.abs(b) && Math.abs(S) > Math.abs(w) && (Math.abs(y) > c || Math.abs(S) > h)) _ = Math.round((0 ** (D - y / Math.abs(y))) ** (p.routes.length - 1));
          if (!(isFinite(_) && t.props.canJumpToTab(t.props.navigationState.routes[_]))) _ = D;

          t._transitionTo(_, S);
        }
      };

      t._transitionTo = function (n, o) {
        var p = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2],
          l = -n * t.props.layout.width;

        if (false === t.props.animationEnabled || false === p) {
          t.props.panX.setValue(0);
          return void t.props.offsetX.setValue(l);
        }

        var u = _.timing,
          c = module56.default(_, ['timing']),
          f = t.props.useNativeDriver;
        module13.Animated.parallel([
          u(
            t.props.panX,
            w(
              w({}, c),
              {},
              {
                toValue: 0,
                velocity: o,
                useNativeDriver: f,
              }
            )
          ),
          u(
            t.props.offsetX,
            w(
              w({}, c),
              {},
              {
                toValue: l,
                velocity: o,
                useNativeDriver: f,
              }
            )
          ),
        ]).start(function (o) {
          if (o.finished) {
            var s = t.props.navigationState.routes[n];
            t.props.jumpTo(s.key);
            if (t.props.onAnimationEnd) t.props.onAnimationEnd();
            t._pendingIndex = null;
          }
        });
        t._pendingIndex = n;
      };

      return t;
    }

    module7.default(b, [
      {
        key: 'componentDidUpdate',
        value: function (t) {
          if (t.navigationState.routes !== this.props.navigationState.routes || t.layout.width !== this.props.layout.width)
            this._transitionTo(this.props.navigationState.index, undefined, false);
          else if (t.navigationState.index !== this.props.navigationState.index) this._transitionTo(this.props.navigationState.index);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.GestureHandler,
            o = t.panX,
            s = t.offsetX,
            p = t.layout,
            l = t.navigationState,
            u = t.swipeEnabled,
            c = t.children,
            f = p.width,
            v = l.routes,
            b = f * (v.length - 1),
            S = module13.Animated.add(o, s).interpolate({
              inputRange: [-b, 0],
              outputRange: [-b, 0],
              extrapolate: 'clamp',
            });
          return (
            <n.PanGestureHandler
              enabled={0 !== p.width && false !== u}
              minDeltaX={10}
              onGestureEvent={module13.Animated.event(
                [
                  {
                    nativeEvent: {
                      translationX: this.props.panX,
                    },
                  },
                ],
                {
                  useNativeDriver: this.props.useNativeDriver,
                }
              )}
              onHandlerStateChange={this._handleHandlerStateChange}
            >
              {React.createElement(
                module13.Animated.View,
                {
                  style: [
                    E.sheet,
                    f
                      ? {
                          width: v.length * f,
                          transform: [
                            {
                              translateX: S,
                            },
                          ],
                        }
                      : null,
                  ],
                },
                React.Children.map(c, function (t, n) {
                  return React.createElement(
                    module13.View,
                    {
                      key: l.routes[n].key,
                      testID: l.routes[n].testID,
                      style: f
                        ? {
                            width: f,
                          }
                        : n === l.index
                        ? module13.StyleSheet.absoluteFill
                        : null,
                    },
                    n === l.index || f ? t : null
                  );
                })
              )}
            </n.PanGestureHandler>
          );
        },
      },
    ]);
    return b;
  })(React.Component);

exports.default = x;
x.propTypes = w(
  w({}, module1294.PagerRendererPropType),
  {},
  {
    swipeDistanceThreshold: PropTypes.default.number,
    swipeVelocityThreshold: PropTypes.default.number,
    GestureHandler: PropTypes.default.object,
  }
);
x.defaultProps = {
  GestureHandler: globals.__expo && globals.__expo.DangerZone ? globals.__expo.DangerZone.GestureHandler : undefined,
  canJumpToTab: function () {
    return true;
  },
};
var E = module13.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
