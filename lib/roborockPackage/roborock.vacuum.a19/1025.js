var module21 = require('./21'),
  module49 = require('./49'),
  module30 = require('./30'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1015 = require('./1015'),
  module1026 = require('./1026');

function O(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      O(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      O(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
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

var w = (function (t, ...args) {
  module7.default(T, t);

  var module49 = T,
    O = j(),
    w = function () {
      var t,
        n = module11.default(module49);

      if (O) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function T() {
    var t;
    module4.default(this, T);

    (t = w.call(this, ...args))._renderLabel = function (n) {
      var o = t.props,
        c = o.position,
        u = o.navigation,
        f = o.activeTintColor,
        s = o.inactiveTintColor,
        p = o.showLabel,
        y = o.upperCaseLabel,
        h = o.labelStyle,
        O = o.allowFontScaling;
      if (false === p) return null;

      var j = n.index,
        w = u.state.routes,
        T = [-1].concat(
          module30.default(
            w.map(function (t, n) {
              return n;
            })
          )
        ),
        S = T.map(function (t) {
          return t === j ? f : s;
        }),
        I = c.interpolate({
          inputRange: T,
          outputRange: S,
        }),
        _ = n.focused ? f : s,
        x = t.props.getLabel(
          P(
            P({}, n),
            {},
            {
              tintColor: _,
            }
          )
        );

      return 'string' == typeof x
        ? React.default.createElement(
            module12.Animated.Text,
            {
              style: [
                C.label,
                {
                  color: I,
                },
                h,
              ],
              allowFontScaling: O,
            },
            y ? x.toUpperCase() : x
          )
        : 'function' == typeof x
        ? x(
            P(
              P({}, n),
              {},
              {
                tintColor: _,
              }
            )
          )
        : x;
    };

    t._renderIcon = function (n) {
      var o = t.props,
        l = o.position,
        c = o.navigation,
        u = o.activeTintColor,
        f = o.inactiveTintColor,
        s = o.renderIcon,
        p = o.showIcon,
        b = o.iconStyle;
      return false === p
        ? null
        : React.default.createElement(module1026.default, {
            position: l,
            navigation: c,
            activeTintColor: u,
            inactiveTintColor: f,
            renderIcon: s,
            scene: n,
            style: [C.icon, b],
          });
    };

    t._handleOnPress = function (n) {
      var o = t.props,
        l = o.getOnPress,
        c = o.jumpToIndex,
        u = o.navigation,
        f = u.state.routes[u.state.index],
        s = l(f, n);
      if (s)
        s({
          previousScene: f,
          scene: n,
          jumpToIndex: c,
          defaultHandler: c,
        });
      else c(n.index);
    };

    return t;
  }

  module5.default(T, [
    {
      key: 'render',
      value: function () {
        var t = this.props;
        return React.default.createElement(
          module1015.TabBar,
          module21.default({}, t, {
            onTabPress: this._handleOnPress,
            jumpToIndex: function () {},
            renderIcon: this._renderIcon,
            renderLabel: this._renderLabel,
          })
        );
      },
    },
  ]);
  return T;
})(React.default.PureComponent);

exports.default = w;
w.defaultProps = {
  activeTintColor: '#fff',
  inactiveTintColor: '#fff',
  showIcon: false,
  showLabel: true,
  upperCaseLabel: true,
  allowFontScaling: true,
};
var C = module12.StyleSheet.create({
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
