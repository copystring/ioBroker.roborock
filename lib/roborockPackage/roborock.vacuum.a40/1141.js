var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module31 = require('@babel/runtime/helpers/toConsumableArray'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1130 = require('./1130'),
  module1125 = require('./1125');

function T() {
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

var R = (function (t, ...args) {
  module7.default(w, t);

  var n = w,
    R = T(),
    S = function () {
      var t,
        o = module11.default(n);

      if (R) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function w() {
    var t;
    module4.default(this, w);

    (t = S.call(this, ...args))._renderLabel = function (n) {
      var o = n.route,
        l = t.props,
        c = l.position,
        f = l.navigation,
        p = l.activeTintColor,
        s = l.inactiveTintColor,
        v = l.showLabel,
        b = l.upperCaseLabel,
        C = l.labelStyle,
        T = l.allowFontScaling;
      if (false === v) return null;

      var R = f.state.routes,
        S = R.indexOf(o),
        w = S === f.state.index,
        x = [-1].concat(
          module31.default(
            R.map(function (t, n) {
              return n;
            })
          )
        ),
        I = x.map(function (t) {
          return t === S ? p : s;
        }),
        _ = c.interpolate({
          inputRange: x,
          outputRange: I,
        }),
        O = w ? p : s,
        P = t.props.getLabelText({
          route: o,
        });

      return 'string' == typeof P
        ? React.createElement(
            module12.Animated.Text,
            {
              style: [
                L.label,
                {
                  color: _,
                },
                C,
              ],
              allowFontScaling: T,
            },
            b ? P.toUpperCase() : P
          )
        : 'function' == typeof P
        ? P({
            focused: w,
            tintColor: O,
          })
        : P;
    };

    t._renderIcon = function (n) {
      var o = n.route,
        l = t.props,
        c = l.position,
        f = l.navigation,
        p = l.activeTintColor,
        s = l.inactiveTintColor,
        v = l.renderIcon,
        y = l.showIcon,
        b = l.iconStyle;
      if (false === y) return null;
      var T = f.state.routes.indexOf(o),
        R = [-1].concat(
          module31.default(
            f.state.routes.map(function (t, n) {
              return n;
            })
          )
        ),
        S = c.interpolate({
          inputRange: R,
          outputRange: R.map(function (t) {
            return t === T ? 1 : 0;
          }),
        }),
        w = c.interpolate({
          inputRange: R,
          outputRange: R.map(function (t) {
            return t === T ? 0 : 1;
          }),
        });
      return React.createElement(module1125.default, {
        route: o,
        navigation: f,
        activeOpacity: S,
        inactiveOpacity: w,
        activeTintColor: p,
        inactiveTintColor: s,
        renderIcon: v,
        style: [L.icon, b],
      });
    };

    return t;
  }

  module5.default(w, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.navigation,
          u = module56.default(t, ['navigation', 'renderIcon', 'getLabelText']);
        return React.createElement(
          module1130.TabBar,
          module22.default({}, u, {
            navigationState: n.state,
            renderIcon: this._renderIcon,
            renderLabel: this._renderLabel,
          })
        );
      },
    },
  ]);
  return w;
})(React.PureComponent);

exports.default = R;
R.defaultProps = {
  activeTintColor: '#fff',
  inactiveTintColor: '#fff',
  showIcon: false,
  showLabel: true,
  upperCaseLabel: true,
  allowFontScaling: true,
};
var L = module12.StyleSheet.create({
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
