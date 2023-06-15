var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1127 = require('./1127'),
  module1147 = require('./1147');

function L(t, n) {
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

function O(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      L(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      L(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function _(t) {
  var n = S();
  return function () {
    var o,
      u = module11.default(t);

    if (n) {
      var s = module11.default(this).constructor;
      o = Reflect.construct(u, arguments, s);
    } else o = u.apply(this, arguments);

    return module9.default(this, o);
  };
}

function S() {
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

((undefined === T ? {} : T).reactNativeVersion || {}).minor;

var R = 375,
  P = 812,
  B = module12.Dimensions.get('window'),
  j = B.height,
  I = B.width,
  T = module12.NativeModules.PlatformConstants,
  M =
    'web' !== module12.Platform.OS && (('ios' === module12.Platform.OS && ((j === P && I === R) || (j === R && I === P))) || (896 === j && 414 === I) || (414 === j && 896 === I)),
  k = !('ios' !== module12.Platform.OS || M || (j > I && I < 768) || (I > j && j < 768)),
  x = null,
  E = function (t) {
    return null !== x ? x : 'android' === module12.Platform.OS ? (globals.Expo ? globals.Expo.Constants.statusBarHeight : 0) : M ? (t ? 0 : 44) : k ? 20 : t ? 0 : 20;
  },
  A = function (t) {
    if (!t.includes('%')) return 0;
    var n = parseFloat(t) / 100;
    return isNaN(n) ? 0 : n;
  },
  D = (function (t, ...args) {
    module7.default(s, t);

    var n = _(s);

    function s() {
      var t;
      module4.default(this, s);
      (t = n.call(this, ...args)).state = {
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
          var s = t.props.isLandscape,
            p = t.state.orientation,
            c = s ? 'landscape' : 'portrait';

          if (!p || p !== c) {
            var f = s ? P : R,
              l = s ? R : P;

            t.view._component.measureInWindow(function (n, u, s, p) {
              var h;

              if (t.view) {
                var v = u,
                  y = n;
                if (v >= l) v %= l;
                else if (v < 0) v = (v % l) + l;
                if (y >= f) y %= f;
                else if (y < 0) y = (y % f) + f;
                var w = 0 === v,
                  b = v + p >= l,
                  L = 0 === y,
                  O = y + s >= f;
                t.setState({
                  touchesTop: w,
                  touchesBottom: b,
                  touchesLeft: L,
                  touchesRight: O,
                  orientation: c,
                  viewWidth: s,
                  viewHeight: p,
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
          s = n.touchesLeft,
          p = n.touchesRight,
          c = t.props,
          f = c.forceInset,
          l = t._getViewStyles(),
          h = l.paddingTop,
          v = l.paddingBottom,
          y = l.paddingLeft,
          w = l.paddingRight,
          b = O(
            O({}, l.viewStyle),
            {},
            {
              paddingTop: o ? t._getInset('top') : 0,
              paddingBottom: u ? t._getInset('bottom') : 0,
              paddingLeft: s ? t._getInset('left') : 0,
              paddingRight: p ? t._getInset('right') : 0,
            }
          );

        if (f)
          Object.keys(f).forEach(function (n) {
            var o = f[n];

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
          o = module12.StyleSheet.flatten(t.props.style || {}),
          s = o.padding,
          p = undefined === s ? 0 : s,
          c = o.paddingVertical,
          f = undefined === c ? p : c,
          l = o.paddingHorizontal,
          h = undefined === l ? p : l,
          v = o.paddingTop,
          w = undefined === v ? f : v,
          b = o.paddingBottom,
          L = undefined === b ? f : b,
          O = o.paddingLeft,
          _ = undefined === O ? h : O,
          S = o.paddingRight,
          R = undefined === S ? h : S,
          P = module56.default(o, ['padding', 'paddingVertical', 'paddingHorizontal', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']);

        if ('number' != typeof w) w = A(w) * n;
        if ('number' != typeof L) L = A(L) * n;
        if ('number' != typeof _) _ = A(_) * n;
        if ('number' != typeof R) R = A(R) * n;
        return {
          paddingTop: w,
          paddingBottom: L,
          paddingLeft: _,
          paddingRight: R,
          viewStyle: P,
        };
      };

      t._getInset = function (n) {
        var o = t.props.isLandscape;

        switch (n) {
          case 'horizontal':
          case 'right':
          case 'left':
            return o && M ? 44 : 0;

          case 'vertical':
          case 'top':
            return E(o);

          case 'bottom':
            return M ? (o ? 24 : 34) : 0;
        }
      };

      return t;
    }

    module5.default(s, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this._isMounted = true;
          module12.InteractionManager.runAfterInteractions(function () {
            t._onLayout();
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this._isMounted = false;
        },
      },
      {
        key: 'componentWillReceiveProps',
        value: function () {
          this._onLayout();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props,
            s = module56.default(n, ['forceInset', 'isLandscape', 'style']),
            p = this._getSafeAreaStyle();

          return React.default.createElement(
            module12.Animated.View,
            module22.default(
              {
                ref: function (n) {
                  return (t.view = n);
                },
                pointerEvents: 'box-none',
              },
              s,
              {
                onLayout: this._onLayout,
                style: p,
              }
            )
          );
        },
      },
    ]);
    return s;
  })(React.Component);

D.setStatusBarHeight = function (t) {
  x = t;
};

var H = module1147.default(D),
  V = H;
exports.default = V;

exports.withSafeArea = function () {
  var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {};
  return function (n) {
    var o = (function (o) {
      module7.default(s, o);

      var u = _(s);

      function s() {
        module4.default(this, s);
        return u.apply(this, arguments);
      }

      module5.default(s, [
        {
          key: 'render',
          value: function () {
            return React.default.createElement(
              H,
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

    return module1127.default(o, n);
  };
};
