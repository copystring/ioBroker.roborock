var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module49 = require('./49'),
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

    var o = _(n);

    if (o && o.has(t)) return o.get(t);
    var u = {},
      p = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = p ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1034 = require('./1034'),
  module2075 = require('./2075'),
  module387 = require('./387'),
  O = ['padding', 'paddingVertical', 'paddingHorizontal', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
  L = ['forceInset', 'isLandscape', 'style'];

function _(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (_ = function (t) {
    return t ? o : n;
  })(t);
}

function S(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function j(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      S(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      S(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function P(t) {
  var n = R();
  return function () {
    var o,
      u = module11.default(t);

    if (n) {
      var p = module11.default(this).constructor;
      o = Reflect.construct(u, arguments, p);
    } else o = u.apply(this, arguments);

    return module9.default(this, o);
  };
}

function R() {
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

((undefined === T ? {} : T).reactNativeVersion || {}).minor;

var B = 375,
  M = 812,
  k = module12.Dimensions.get('window'),
  E = k.height,
  I = k.width,
  T = module12.NativeModules.PlatformConstants,
  D = function () {
    return module387.default.isIphoneX();
  },
  x = !('ios' !== module12.Platform.OS || D() || (E > I && I < 768) || (I > E && E < 768)),
  A = null,
  W = function (t) {
    return null !== A ? A : 'android' === module12.Platform.OS ? (globals.Expo ? globals.Expo.Constants.statusBarHeight : 0) : D() ? (t ? 0 : 44) : x ? 20 : t ? 0 : 20;
  },
  C = function (t) {
    if (!t.includes('%')) return 0;
    var n = parseFloat(t) / 100;
    return isNaN(n) ? 0 : n;
  },
  H = (function (t, ...args) {
    module7.default(s, t);
    var u = P(s);

    function s() {
      var t;
      module4.default(this, s);
      (t = u.call(this, ...args)).state = {
        touchesTop: true,
        touchesBottom: true,
        touchesLeft: true,
        touchesRight: true,
        orientation: null,
        viewWidth: 0,
        viewHeight: 0,
      };

      t._onLayout = function (...args) {
        if (t._isMounted && t.view) {
          var p = t.props.isLandscape,
            c = t.state.orientation,
            f = p ? 'landscape' : 'portrait';

          if (!c || c !== f) {
            var s = p ? M : B,
              l = p ? B : M;

            t.view._component.measureInWindow(function (n, u, p, c) {
              var h;

              if (t.view) {
                var v = u,
                  y = n;
                if (v >= l) v %= l;
                else if (v < 0) v = (v % l) + l;
                if (y >= s) y %= s;
                else if (y < 0) y = (y % s) + s;
                var w = 0 === v,
                  b = v + c >= l,
                  O = 0 === y,
                  L = y + p >= s;
                t.setState({
                  touchesTop: w,
                  touchesBottom: b,
                  touchesLeft: O,
                  touchesRight: L,
                  orientation: f,
                  viewWidth: p,
                  viewHeight: c,
                });
                if (t.props.onLayout) (h = t.props).onLayout.apply(h, args);
              }
            });
          }
        }
      };

      t._getSafeAreaStyle = function () {
        var n = t.state,
          o = n.touchesTop,
          u = n.touchesBottom,
          p = n.touchesLeft,
          c = n.touchesRight,
          f = t.props,
          s = f.forceInset,
          l = t._getViewStyles(),
          h = l.paddingTop,
          v = l.paddingBottom,
          y = l.paddingLeft,
          w = l.paddingRight,
          b = j(
            j({}, l.viewStyle),
            {},
            {
              paddingTop: o ? t._getInset('top') : 0,
              paddingBottom: u ? t._getInset('bottom') : 0,
              paddingLeft: p ? t._getInset('left') : 0,
              paddingRight: c ? t._getInset('right') : 0,
            }
          );

        if (s)
          Object.keys(s).forEach(function (n) {
            var o = s[n];

            switch (('always' === o && (o = t._getInset(n)), 'never' === o && (o = 0), n)) {
              case 'horizontal':
                b.paddingLeft = o;
                b.paddingRight = o;
                break;

              case 'vertical':
                b.paddingTop = o;
                b.paddingBottom = o;
                break;

              case 'left':
              case 'right':
              case 'top':
              case 'bottom':
                var u = 'padding' + n[0].toUpperCase() + n.slice(1);
                b[u] = o;
            }
          });
        if (b.height && 'number' == typeof b.height) b.height += b.paddingTop + b.paddingBottom;
        if (b.width && 'number' == typeof b.width) b.width += b.paddingLeft + b.paddingRight;
        b.paddingTop = b.paddingTop ** h;
        b.paddingBottom = b.paddingBottom ** v;
        b.paddingLeft = b.paddingLeft ** y;
        b.paddingRight = b.paddingRight ** w;
        return b;
      };

      t._getViewStyles = function () {
        var n = t.state.viewWidth,
          u = module12.StyleSheet.flatten(t.props.style || {}),
          p = u.padding,
          c = undefined === p ? 0 : p,
          f = u.paddingVertical,
          s = undefined === f ? c : f,
          l = u.paddingHorizontal,
          h = undefined === l ? c : l,
          y = u.paddingTop,
          w = undefined === y ? s : y,
          b = u.paddingBottom,
          L = undefined === b ? s : b,
          _ = u.paddingLeft,
          S = undefined === _ ? h : _,
          j = u.paddingRight,
          P = undefined === j ? h : j,
          R = module55.default(u, O);
        if ('number' != typeof w) w = C(w) * n;
        if ('number' != typeof L) L = C(L) * n;
        if ('number' != typeof S) S = C(S) * n;
        if ('number' != typeof P) P = C(P) * n;
        return {
          paddingTop: w,
          paddingBottom: L,
          paddingLeft: S,
          paddingRight: P,
          viewStyle: R,
        };
      };

      t._getInset = function (n) {
        var o = t.props.isLandscape;

        switch (n) {
          case 'horizontal':
          case 'right':
          case 'left':
            return o && D() ? 44 : 0;

          case 'vertical':
          case 'top':
            return W(o);

          case 'bottom':
            return D() ? (o ? 24 : 34) : 0;
        }
      };

      return t;
    }

    module5.default(s, [
      {
        key: 'componentDidMount',
        value: function () {
          this._isMounted = true;

          this._onLayout();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this._isMounted = false;
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function () {
          this._onLayout();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            u = this.props,
            p = module55.default(u, L),
            c = this._getSafeAreaStyle();

          return React.default.createElement(
            module12.Animated.View,
            module21.default(
              {
                ref: function (n) {
                  return (t.view = n);
                },
                pointerEvents: 'box-none',
              },
              p,
              {
                onLayout: this._onLayout,
                style: c,
              }
            )
          );
        },
      },
    ]);
    return s;
  })(React.Component);

H.setStatusBarHeight = function (t) {
  A = t;
};

var V = module2075.default(H),
  N = V;
exports.default = N;

exports.withSafeArea = function () {
  var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {};
  return function (n) {
    var o = (function (o) {
      module7.default(s, o);
      var u = P(s);

      function s() {
        module4.default(this, s);
        return u.apply(this, arguments);
      }

      module5.default(s, [
        {
          key: 'componentDidMount',
          value: function () {
            var t = this;
            module12.DeviceEventEmitter.addListener('SafeAreaDidChange', function () {
              t.forceUpdate();
            });
          },
        },
        {
          key: 'render',
          value: function () {
            return React.default.createElement(
              V,
              {
                style: {
                  flex: 1,
                },
                forceInset: t,
              },
              React.default.createElement(n, this.props)
            );
          },
        },
      ]);
      return s;
    })(React.Component);

    return module1034.default(o, n);
  };
};
