exports.default = function (t) {
  var o = (function (o, ...args) {
    module7.default(P, o);

    var v = P,
      y = _(),
      O = function () {
        var t,
          n = module11.default(v);

        if (y) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P() {
      var t;
      module4.default(this, P);

      (t = O.call(this, ...args))._renderScene = function (n) {
        var o = n.route,
          s = t.props,
          c = s.screenProps,
          u = s.descriptors,
          p = u[o.key],
          f = p.getComponent();
        return <module936.SceneView screenProps={c} navigation={p.navigation} component={f} />;
      };

      t._renderIcon = function (n) {
        var o = n.route,
          s = n.focused,
          c = undefined === s || s,
          u = n.tintColor,
          p = n.horizontal,
          f = undefined !== p && p,
          l = t.props.descriptors,
          b = l[o.key],
          v = b.options;
        return v.tabBarIcon
          ? 'function' == typeof v.tabBarIcon
            ? v.tabBarIcon({
                focused: c,
                tintColor: u,
                horizontal: f,
              })
            : v.tabBarIcon
          : null;
      };

      t._getButtonComponent = function (n) {
        var o = n.route,
          s = t.props.descriptors,
          c = s[o.key],
          u = c.options;
        return u.tabBarButtonComponent ? u.tabBarButtonComponent : null;
      };

      t._getLabelText = function (n) {
        var o = n.route,
          s = t.props.descriptors,
          c = s[o.key],
          u = c.options;
        return u.tabBarLabel ? u.tabBarLabel : 'string' == typeof u.title ? u.title : o.routeName;
      };

      t._getAccessibilityLabel = function (n) {
        var o = n.route,
          s = t.props.descriptors,
          c = s[o.key],
          u = c.options;
        if (undefined !== u.tabBarAccessibilityLabel) return u.tabBarAccessibilityLabel;

        var p = t._getLabelText({
          route: o,
        });

        return 'string' == typeof p ? p : undefined;
      };

      t._getTestID = function (n) {
        var o = n.route,
          s = t.props.descriptors,
          c = s[o.key],
          u = c.options;
        return u.tabBarTestID;
      };

      t._handleTabPress = function (n) {
        var o = n.route;
        t._isTabPress = true;

        var s = t.props.descriptors,
          c = s[o.key],
          u = c.navigation,
          p = c.options,
          f = function () {
            if (u.isFocused()) {
              if (o.hasOwnProperty('index') && o.index > 0)
                u.dispatch(
                  module936.StackActions.popToTop({
                    key: o.key,
                  })
                );
            } else t._jumpTo(o.routeName);
          };

        if (p.tabBarOnPress)
          p.tabBarOnPress({
            navigation: u,
            defaultHandler: f,
          });
        else f();
      };

      t._handleIndexChange = function (n) {
        if (t._isTabPress) t._isTabPress = false;
        else t._jumpTo(t.props.navigation.state.routes[n].routeName);
      };

      t._handleSwipeStart = function () {
        t.setState({
          isSwiping: true,
        });
      };

      t._handleSwipeEnd = function () {
        t.setState({
          isSwiping: false,
        });
      };

      t._jumpTo = function (n) {
        return t.props.navigation.dispatch(
          module936.NavigationActions.navigate({
            routeName: n,
          })
        );
      };

      t._isTabPress = false;
      return t;
    }

    module5.default(P, [
      {
        key: 'render',
        value: function () {
          var o = this.props,
            s = o.descriptors,
            c = o.navigation,
            u = o.screenProps,
            p = c.state,
            f = p.routes[p.index],
            b = s[f.key],
            v = h(h({}, this.props.navigationConfig), b.options);
          return <t />;
        },
      },
    ]);
    return P;
  })(React.Component);

  return function (t) {
    var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      s = module936.TabRouter(t, n),
      c = module936.createNavigator(o, s, n);
    return module936.createNavigationContainer(c);
  };
};

var module21 = require('./21'),
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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var p = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (p && (p.get || p.set)) Object.defineProperty(s, u, p);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module936 = require('./936');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function y(t, n) {
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

function h(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      y(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      y(Object(s)).forEach(function (n) {
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
