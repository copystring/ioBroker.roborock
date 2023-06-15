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
  module1015 = require('./1015'),
  b = ['timing'];

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

function O(t, n) {
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

function S(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      O(Object(s), true).forEach(function (o) {
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      O(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function _() {
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
    tension: 75,
    friction: 25,
  },
  j = (function (t, ...args) {
    module7.default(w, t);

    var module49 = w,
      PropTypes = _(),
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
        if (n.nativeEvent.state === o.State.BEGIN) t.props.onSwipeStart && t.props.onSwipeStart();
        else if (n.nativeEvent.state === o.State.END) {
          if (t.props.onSwipeEnd) t.props.onSwipeEnd();
          var s = t.props,
            p = s.navigationState,
            l = s.layout,
            u = s.swipeDistanceThreshold,
            c = undefined === u ? l.width / 1.75 : u,
            f = s.swipeVelocityThreshold,
            v = undefined === f ? 150 : f,
            h = n.nativeEvent,
            y = h.translationX,
            b = h.translationY,
            w = h.velocityX,
            O = h.velocityY,
            S = 'number' == typeof t._pendingIndex ? t._pendingIndex : p.index,
            _ = S;
          if (Math.abs(y) > Math.abs(b) && Math.abs(w) > Math.abs(O) && (Math.abs(y) > c || Math.abs(w) > v)) _ = Math.round((0 ** (S - y / Math.abs(y))) ** (p.routes.length - 1));
          if (!(isFinite(_) && t.props.canJumpToTab(t.props.navigationState.routes[_]))) _ = S;

          t._transitionTo(_, w);
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
            S(
              S({}, c),
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
            S(
              S({}, c),
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
            v = p.width,
            y = l.routes,
            b = v * (y.length - 1),
            w = module12.Animated.add(o, s).interpolate({
              inputRange: [-b, 0],
              outputRange: [-b, 0],
              extrapolate: 'clamp',
            });
          return (
            <n.PanGestureHandler
              enabled={0 !== p.width && false !== u}
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
                    x.sheet,
                    v
                      ? {
                          width: y.length * v,
                          transform: [
                            {
                              translateX: w,
                            },
                          ],
                        }
                      : null,
                  ],
                },
                React.Children.map(c, function (t, n) {
                  return React.createElement(
                    module12.View,
                    {
                      key: l.routes[n].key,
                      testID: l.routes[n].testID,
                      style: v
                        ? {
                            width: v,
                          }
                        : n === l.index
                        ? module12.StyleSheet.absoluteFill
                        : null,
                    },
                    n === l.index || v ? t : null
                  );
                })
              )}
            </n.PanGestureHandler>
          );
        },
      },
    ]);
    return w;
  })(React.Component);

exports.default = j;
j.propTypes = S(
  S({}, module1015.PagerRendererPropType),
  {},
  {
    swipeDistanceThreshold: PropTypes.default.number,
    swipeVelocityThreshold: PropTypes.default.number,
    GestureHandler: PropTypes.default.object,
  }
);
j.defaultProps = {
  GestureHandler: globals.__expo && globals.__expo.DangerZone ? globals.__expo.DangerZone.GestureHandler : undefined,
  canJumpToTab: function () {
    return true;
  },
};
var x = module12.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});
