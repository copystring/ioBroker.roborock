var module49 = require('./49'),
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
    var o = w(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      p = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var u = p ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, l, u);
        else s[l] = t[l];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1041 = require('./1041'),
  b = ['timing'];

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

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

function O(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      S(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      S(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function j() {
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

var D = {
    timing: module12.Animated.spring,
    tension: 68,
    friction: 12,
  },
  E = (function (t, ...args) {
    module7.default(w, t);

    var module49 = w,
      PropTypes = j(),
      y = function () {
        var t,
          o = module11.default(module49);

        if (PropTypes) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function w() {
      var t;
      module4.default(this, w);

      (t = y.call(this, ...args))._handleHandlerStateChange = function (n) {
        var o = t.props.GestureHandler;
        if (n.nativeEvent.state === o.State.BEGAN) t.props.onSwipeStart && t.props.onSwipeStart();
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
            w = v.velocityX,
            S = v.velocityY,
            O = 'number' == typeof t._pendingIndex ? t._pendingIndex : p.index,
            j = O;
          if (Math.abs(y) > Math.abs(b) && Math.abs(w) > Math.abs(S) && (Math.abs(y) > c || Math.abs(w) > h)) j = Math.round((0 ** (O - y / Math.abs(y))) ** (p.routes.length - 1));
          if (!(isFinite(j) && t.props.canJumpToTab(t.props.navigationState.routes[j]))) j = O;

          t._transitionTo(j, w);
        }
      };

      t._transitionTo = function (n, s) {
        var p = !(arguments.length > 2 && undefined !== arguments[2]) || arguments[2],
          l = -n * t.props.layout.width;

        if (false === t.props.animationEnabled || false === p) {
          t.props.panX.setValue(0);
          return void t.props.offsetX.setValue(l);
        }

        var u = D.timing,
          c = module55.default(D, b),
          f = t.props.useNativeDriver;
        module12.Animated.parallel([
          u(
            t.props.panX,
            O(
              O({}, c),
              {},
              {
                toValue: 0,
                velocity: s,
                useNativeDriver: f,
              }
            )
          ),
          u(
            t.props.offsetX,
            O(
              O({}, c),
              {},
              {
                toValue: l,
                velocity: s,
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

    module5.default(w, [
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
            y = l.width,
            b = u.routes,
            w = y * (b.length - 1),
            S =
              b.length > 1
                ? module12.Animated.add(s, p).interpolate({
                    inputRange: [-w, 0],
                    outputRange: [-w, 0],
                    extrapolate: 'clamp',
                  })
                : 0;
          return (
            <o.PanGestureHandler
              enabled={0 !== l.width && false !== c}
              minDeltaX={10}
              onGestureEvent={module12.Animated.event(
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
                module12.Animated.View,
                {
                  style: [
                    P.sheet,
                    y
                      ? {
                          width: b.length * y,
                          transform: [
                            {
                              translateX: S,
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
                    module12.View,
                    {
                      key: s.key,
                      testID: t.props.getTestID({
                        route: s,
                      }),
                      accessibilityElementsHidden: !p,
                      importantForAccessibility: p ? 'auto' : 'no-hide-descendants',
                      style: y
                        ? {
                            width: y,
                          }
                        : p
                        ? module12.StyleSheet.absoluteFill
                        : null,
                    },
                    p || y ? n : null
                  );
                })
              )}
            </o.PanGestureHandler>
          );
        },
      },
    ]);
    return w;
  })(React.Component);

exports.default = E;
E.propTypes = O(
  O({}, module1041.PagerRendererPropType),
  {},
  {
    swipeDistanceThreshold: PropTypes.default.number,
    swipeVelocityThreshold: PropTypes.default.number,
    GestureHandler: PropTypes.default.object,
  }
);
E.defaultProps = {
  canJumpToTab: function () {
    return true;
  },
};
var P = module12.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
