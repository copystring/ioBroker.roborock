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
  module1416 = require('./1416'),
  module391 = require('./391');

function _(t, n) {
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
      _(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      _(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function S(t) {
  var n = R();
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

function R() {
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

var module393 = require('./393'),
  D = 375,
  j = 812,
  P = module12.Dimensions.get('window'),
  E = P.height,
  I = P.width,
  T = function () {
    return module391.default.isIphoneX();
  },
  k = !('ios' !== module12.Platform.OS || T() || (E > I && I < 768) || (I > E && E < 768)),
  M = null,
  x = function (t) {
    return null !== M
      ? M
      : 'android' === module12.Platform.OS
      ? globals.Expo
        ? globals.Expo.Constants.statusBarHeight
        : 0
      : module393.isWindowDisplay
      ? 14
      : T()
      ? t
        ? 0
        : 44
      : k
      ? 20
      : t
      ? 0
      : 20;
  },
  A = function (t) {
    if (!t.includes('%')) return 0;
    var n = parseFloat(t) / 100;
    return isNaN(n) ? 0 : n;
  },
  W = (function (t, ...args) {
    module7.default(s, t);
    var n = S(s);

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
            var f = s ? j : D,
              l = s ? D : j;

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
                  _ = y + s >= f;

                t.setState({
                  touchesTop: w,
                  touchesBottom: b,
                  touchesLeft: L,
                  touchesRight: _,
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
          l = c.isLandscape,
          h = c.fullWidth,
          v = t._getViewStyles(),
          w = v.paddingTop,
          b = v.paddingBottom,
          L = v.paddingLeft,
          _ = v.paddingRight,
          S = O(
            O({}, v.viewStyle),
            {},
            {
              paddingTop: o ? t._getInset('top') : 0,
              paddingBottom: u ? t._getInset('bottom') : 0,
              paddingLeft: s ? t._getInset('left') : 0,
              paddingRight: p ? t._getInset('right') : 0,
            }
          );

        if (h) S.width = l ? module12.Dimensions.get('window').height : module12.Dimensions.get('window').width;
        if (f)
          Object.keys(f).forEach(function (n) {
            var o = f[n];

            switch (('always' === o && (o = t._getInset(n)), 'never' === o && (o = 0), n)) {
              case 'horizontal':
                S.paddingLeft = o;
                S.paddingRight = o;
                break;

              case 'vertical':
                S.paddingTop = o;
                S.paddingBottom = o;
                break;

              case 'left':
              case 'right':
              case 'top':
              case 'bottom':
                var u = 'padding' + n[0].toUpperCase() + n.slice(1);
                S[u] = o;
            }
          });
        if (S.height && 'number' == typeof S.height) S.height += S.paddingTop + S.paddingBottom;
        if (S.width && 'number' == typeof S.width) S.width += S.paddingLeft + S.paddingRight;
        S.paddingTop = S.paddingTop ** w;
        S.paddingBottom = S.paddingBottom ** b;
        S.paddingLeft = S.paddingLeft ** L;
        S.paddingRight = S.paddingRight ** _;
        return S;
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
          _ = o.paddingLeft,
          O = undefined === _ ? h : _,
          S = o.paddingRight,
          R = undefined === S ? h : S,
          B = module56.default(o, ['padding', 'paddingVertical', 'paddingHorizontal', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']);
        if ('number' != typeof w) w = A(w) * n;
        if ('number' != typeof L) L = A(L) * n;
        if ('number' != typeof O) O = A(O) * n;
        if ('number' != typeof R) R = A(R) * n;
        return {
          paddingTop: w,
          paddingBottom: L,
          paddingLeft: O,
          paddingRight: R,
          viewStyle: B,
        };
      };

      t._getInset = function (n) {
        var o = t.props.isLandscape;

        switch (n) {
          case 'horizontal':
          case 'right':
          case 'left':
            return o && T() ? 44 : 0;

          case 'vertical':
          case 'top':
            return x(o);

          case 'bottom':
            return T() ? (o ? 24 : 34) : 0;
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

W.setStatusBarHeight = function (t) {
  M = t;
};

var H = module1416.default(W),
  C = H;
exports.default = C;

exports.withSafeArea = function () {
  var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {};
  return function (n) {
    var o = (function (o) {
      module7.default(s, o);
      var u = S(s);

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
