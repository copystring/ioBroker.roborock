var module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module1318 = require('./1318');

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

var E = {
    timing: module13.Animated.spring,
    tension: 68,
    friction: 12,
  },
  O = (function (t, ...args) {
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
        if (n.nativeEvent.state === o.State.BEGAN) t.props.onSwipeStart && t.props.onSwipeStart();
        else if (n.nativeEvent.state === o.State.END) {
          if (t.props.onSwipeEnd) t.props.onSwipeEnd();
          var s = t.props,
            p = s.navigationState,
            l = s.layout,
            u = s.swipeDistanceThreshold,
            c = undefined === u ? l.width / 1.75 : u,
            h = s.swipeVelocityThreshold,
            f = undefined === h ? 150 : h,
            v = n.nativeEvent,
            y = v.translationX,
            b = v.translationY,
            S = v.velocityX,
            w = v.velocityY,
            D = 'number' == typeof t._pendingIndex ? t._pendingIndex : p.index,
            E = D;
          if (Math.abs(y) > Math.abs(b) && Math.abs(S) > Math.abs(w) && (Math.abs(y) > c || Math.abs(S) > f)) E = Math.round((0 ** (D - y / Math.abs(y))) ** (p.routes.length - 1));
          if (!(isFinite(E) && t.props.canJumpToTab(t.props.navigationState.routes[E]))) E = D;

          t._transitionTo(E, S);
        }
      };

      t._transitionTo = function (n, o) {
        var p = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2],
          l = -n * t.props.layout.width;

        if (false === t.props.animationEnabled || false === p) {
          t.props.panX.setValue(0);
          return void t.props.offsetX.setValue(l);
        }

        var u = E.timing,
          c = module56.default(E, ['timing']),
          h = t.props.useNativeDriver;
        module13.Animated.parallel([
          u(
            t.props.panX,
            w(
              w({}, c),
              {},
              {
                toValue: 0,
                velocity: o,
                useNativeDriver: h,
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
                useNativeDriver: h,
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
          if (t.navigationState.routes.length !== this.props.navigationState.routes.length || t.layout.width !== this.props.layout.width)
            this._transitionTo(this.props.navigationState.index, undefined, false);
          else if (t.navigationState.index !== this.props.navigationState.index && this.props.navigationState.index !== this._pendingIndex)
            this._transitionTo(this.props.navigationState.index);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props,
            o = n.GestureHandler,
            s = n.panX,
            p = n.offsetX,
            l = n.layout,
            u = n.navigationState,
            c = n.swipeEnabled,
            h = n.children,
            v = l.width,
            b = u.routes,
            S = v * (b.length - 1),
            w =
              b.length > 1
                ? module13.Animated.add(s, p).interpolate({
                    inputRange: [-S, 0],
                    outputRange: [-S, 0],
                    extrapolate: 'clamp',
                  })
                : 0;
          return (
            <o.PanGestureHandler
              enabled={0 !== l.width && false !== c}
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
                    x.sheet,
                    v
                      ? {
                          width: b.length * v,
                          transform: [
                            {
                              translateX: w,
                            },
                          ],
                        }
                      : null,
                  ],
                },
                React.Children.map(h, function (n, o) {
                  var s = u.routes[o],
                    p = o === u.index;
                  return React.createElement(
                    module13.View,
                    {
                      key: s.key,
                      testID: t.props.getTestID({
                        route: s,
                      }),
                      accessibilityElementsHidden: !p,
                      importantForAccessibility: p ? 'auto' : 'no-hide-descendants',
                      style: v
                        ? {
                            width: v,
                          }
                        : p
                        ? module13.StyleSheet.absoluteFill
                        : null,
                    },
                    p || v ? n : null
                  );
                })
              )}
            </o.PanGestureHandler>
          );
        },
      },
    ]);
    return b;
  })(React.Component);

exports.default = O;
O.propTypes = w(
  w({}, module1318.PagerRendererPropType),
  {},
  {
    swipeDistanceThreshold: PropTypes.default.number,
    swipeVelocityThreshold: PropTypes.default.number,
    GestureHandler: PropTypes.default.object,
  }
);
O.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
};
var x = module13.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
