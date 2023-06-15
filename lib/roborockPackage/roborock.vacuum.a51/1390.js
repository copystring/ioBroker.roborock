require('./1391');

var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module50 = require('./50'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1304 = require('./1304'),
  module391 = require('./391');

function L(t, n) {
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
  var n = O();
  return function () {
    var o,
      s = module12.default(t);

    if (n) {
      var u = module12.default(this).constructor;
      o = Reflect.construct(s, arguments, u);
    } else o = s.apply(this, arguments);

    return module11.default(this, o);
  };
}

function O() {
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
  B = 812,
  P = module13.Dimensions.get('window'),
  j = P.height,
  T = P.width,
  E = function () {
    return module391.default.isIphoneX();
  },
  I = !('ios' !== module13.Platform.OS || E() || (j > T && T < 768) || (T > j && j < 768)),
  M = null,
  k = function (t) {
    return null !== M
      ? M
      : 'android' === module13.Platform.OS
      ? globals.Expo
        ? globals.Expo.Constants.statusBarHeight
        : 0
      : module393.isWindowDisplay
      ? 14
      : E()
      ? t
        ? 0
        : module391.default.iphoneSafeareaTop()
      : I
      ? 20
      : t
      ? 0
      : 20;
  },
  x = function (t) {
    if (!t.includes('%')) return 0;
    var n = parseFloat(t) / 100;
    return isNaN(n) ? 0 : n;
  },
  A = (function (t, ...args) {
    module9.default(u, t);

    var n = _(u);

    function u() {
      var t;
      module6.default(this, u);
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
          var u = t.props.isLandscape,
            p = t.state.orientation,
            c = u ? 'landscape' : 'portrait';

          if (!p || p !== c) {
            var f = u ? B : D,
              l = u ? D : B;

            t.view._component.measureInWindow(function (n, s, u, p) {
              var h;

              if (t.view) {
                var v = s,
                  y = n;
                if (v >= l) v %= l;
                else if (v < 0) v = (v % l) + l;
                if (y >= f) y %= f;
                else if (y < 0) y = (y % f) + f;
                var w = 0 === v,
                  b = v + p >= l,
                  L = 0 === y,
                  S = y + u >= f;
                t.setState({
                  touchesTop: w,
                  touchesBottom: b,
                  touchesLeft: L,
                  touchesRight: S,
                  orientation: c,
                  viewWidth: u,
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
          s = n.touchesBottom,
          u = n.touchesLeft,
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
          O = S(
            S({}, v.viewStyle),
            {},
            {
              paddingTop: o ? t._getInset('top') : 0,
              paddingBottom: s ? t._getInset('bottom') : 0,
              paddingLeft: u ? t._getInset('left') : 0,
              paddingRight: p ? t._getInset('right') : 0,
            }
          );

        if (h) O.width = module13.Dimensions.get('window').width;
        if (l && 'android' === module13.Platform.OS) O.width = module13.Dimensions.get('screen').width ** module13.Dimensions.get('screen').height;
        if (f)
          Object.keys(f).forEach(function (n) {
            var o = f[n];

            switch (('always' === o && (o = t._getInset(n)), 'never' === o && (o = 0), n)) {
              case 'horizontal':
                O.paddingLeft = o;
                O.paddingRight = o;
                break;

              case 'vertical':
                O.paddingTop = o;
                O.paddingBottom = o;
                break;

              case 'left':
              case 'right':
              case 'top':
              case 'bottom':
                var s = 'padding' + n[0].toUpperCase() + n.slice(1);
                O[s] = o;
            }
          });
        if (O.height && 'number' == typeof O.height) O.height += O.paddingTop + O.paddingBottom;
        if (O.width && 'number' == typeof O.width) O.width += O.paddingLeft + O.paddingRight;
        O.paddingTop = O.paddingTop ** w;
        O.paddingBottom = O.paddingBottom ** b;
        O.paddingLeft = O.paddingLeft ** L;
        O.paddingRight = O.paddingRight ** _;
        return O;
      };

      t._getViewStyles = function () {
        var n = t.state.viewWidth,
          o = module13.StyleSheet.flatten(t.props.style || {}),
          u = o.padding,
          p = undefined === u ? 0 : u,
          c = o.paddingVertical,
          f = undefined === c ? p : c,
          l = o.paddingHorizontal,
          h = undefined === l ? p : l,
          v = o.paddingTop,
          w = undefined === v ? f : v,
          b = o.paddingBottom,
          L = undefined === b ? f : b,
          S = o.paddingLeft,
          _ = undefined === S ? h : S,
          O = o.paddingRight,
          R = undefined === O ? h : O,
          D = module56.default(o, ['padding', 'paddingVertical', 'paddingHorizontal', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']);

        if ('number' != typeof w) w = x(w) * n;
        if ('number' != typeof L) L = x(L) * n;
        if ('number' != typeof _) _ = x(_) * n;
        if ('number' != typeof R) R = x(R) * n;
        return {
          paddingTop: w,
          paddingBottom: L,
          paddingLeft: _,
          paddingRight: R,
          viewStyle: D,
        };
      };

      t._getInset = function (n) {
        var o = t.props.isLandscape;

        switch (n) {
          case 'horizontal':
          case 'right':
          case 'left':
            return o && E() ? 44 : 0;

          case 'vertical':
          case 'top':
            return k(o);

          case 'bottom':
            return E() ? (o ? 24 : 34) : 0;
        }
      };

      return t;
    }

    module7.default(u, [
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
            u = module56.default(n, ['forceInset', 'isLandscape', 'style']),
            p = this._getSafeAreaStyle();

          return React.default.createElement(
            module13.Animated.View,
            module22.default(
              {
                ref: function (n) {
                  return (t.view = n);
                },
                pointerEvents: 'box-none',
              },
              u,
              {
                onLayout: this._onLayout,
                style: p,
              }
            )
          );
        },
      },
    ]);
    return u;
  })(React.Component);

A.setStatusBarHeight = function (t) {
  M = t;
};

var W = A,
  H = W;
exports.default = H;

exports.withSafeArea = function () {
  var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {};
  return function (n) {
    var o = (function (o) {
      module9.default(u, o);

      var s = _(u);

      function u() {
        module6.default(this, u);
        return s.apply(this, arguments);
      }

      module7.default(u, [
        {
          key: 'componentDidMount',
          value: function () {
            var t = this;
            module13.DeviceEventEmitter.addListener('SafeAreaDidChange', function () {
              t.forceUpdate();
            });
          },
        },
        {
          key: 'render',
          value: function () {
            return React.default.createElement(
              W,
              {
                style: {
                  flex: 1,
                },
                isLandscape: this.props.isLandscape,
                forceInset: t,
              },
              React.default.createElement(n, this.props)
            );
          },
        },
      ]);
      return u;
    })(React.Component);

    return module1304.default(o, n);
  };
};
