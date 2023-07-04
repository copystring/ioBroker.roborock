var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module30 = require('./30'),
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
    var o = C(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1037 = require('./1037'),
  module1032 = require('./1032'),
  w = ['navigation', 'renderIcon', 'getLabelText'];

function C(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (C = function (t) {
    return t ? o : n;
  })(t);
}

function O() {
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

var T = (function (t, ...args) {
  module7.default(_, t);

  var C = _,
    T = O(),
    L = function () {
      var t,
        n = module11.default(C);

      if (T) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    var t;
    module4.default(this, _);

    (t = L.call(this, ...args))._renderLabel = function (n) {
      var o = n.route,
        l = t.props,
        c = l.position,
        f = l.navigation,
        p = l.activeTintColor,
        s = l.inactiveTintColor,
        b = l.showLabel,
        h = l.upperCaseLabel,
        w = l.labelStyle,
        C = l.allowFontScaling;
      if (false === b) return null;

      var O = f.state.routes,
        T = O.indexOf(o),
        L = T === f.state.index,
        _ = [-1].concat(
          module30.default(
            O.map(function (t, n) {
              return n;
            })
          )
        ),
        x = _.map(function (t) {
          return t === T ? p : s;
        }),
        I = c.interpolate({
          inputRange: _,
          outputRange: x,
        }),
        P = L ? p : s,
        S = t.props.getLabelText({
          route: o,
        });

      return 'string' == typeof S
        ? React.createElement(
            module12.Animated.Text,
            {
              style: [
                R.label,
                {
                  color: I,
                },
                w,
              ],
              allowFontScaling: C,
            },
            h ? S.toUpperCase() : S
          )
        : 'function' == typeof S
        ? S({
            focused: L,
            tintColor: P,
          })
        : S;
    };

    t._renderIcon = function (n) {
      var o = n.route,
        l = t.props,
        c = l.position,
        f = l.navigation,
        p = l.activeTintColor,
        s = l.inactiveTintColor,
        y = l.renderIcon,
        b = l.showIcon,
        w = l.iconStyle;
      if (false === b) return null;
      var C = f.state.routes.indexOf(o),
        O = [-1].concat(
          module30.default(
            f.state.routes.map(function (t, n) {
              return n;
            })
          )
        ),
        T = c.interpolate({
          inputRange: O,
          outputRange: O.map(function (t) {
            return t === C ? 1 : 0;
          }),
        }),
        L = c.interpolate({
          inputRange: O,
          outputRange: O.map(function (t) {
            return t === C ? 0 : 1;
          }),
        });
      return React.createElement(module1032.default, {
        route: o,
        navigation: f,
        activeOpacity: T,
        inactiveOpacity: L,
        activeTintColor: p,
        inactiveTintColor: s,
        renderIcon: y,
        style: [R.icon, w],
      });
    };

    return t;
  }

  module5.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.navigation,
          l = module55.default(t, w);
        return React.createElement(
          module1037.TabBar,
          module21.default({}, l, {
            navigationState: u.state,
            renderIcon: this._renderIcon,
            renderLabel: this._renderLabel,
          })
        );
      },
    },
  ]);
  return _;
})(React.PureComponent);

exports.default = T;
T.defaultProps = {
  activeTintColor: '#fff',
  inactiveTintColor: '#fff',
  showIcon: false,
  showLabel: true,
  upperCaseLabel: true,
  allowFontScaling: true,
};
var R = module12.StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  label: {
    textAlign: 'center',
    fontSize: 13,
    margin: 8,
    backgroundColor: 'transparent',
  },
});
