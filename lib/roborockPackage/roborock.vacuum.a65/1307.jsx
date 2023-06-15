exports.default = function (t) {
  var n = (function (n, ...args) {
    module9.default(O, n);

    var module50 = O,
      y = _(),
      P = function () {
        var t,
          n = module12.default(module50);

        if (y) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function O() {
      var t;
      module6.default(this, O);

      (t = P.call(this, ...args))._renderScene = function (n) {
        var o = n.route,
          s = t.props,
          c = s.screenProps,
          u = s.descriptors,
          p = u[o.key],
          l = p.getComponent();
        return <module1218.SceneView screenProps={c} navigation={p.navigation} component={l} />;
      };

      t._renderIcon = function (n) {
        var o = n.route,
          s = n.focused,
          c = undefined === s || s,
          u = n.tintColor,
          p = n.horizontal,
          l = undefined !== p && p,
          f = t.props.descriptors,
          b = f[o.key],
          v = b.options;
        return v.tabBarIcon
          ? 'function' == typeof v.tabBarIcon
            ? v.tabBarIcon({
                focused: c,
                tintColor: u,
                horizontal: l,
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
          l = function () {
            if (u.isFocused()) {
              if (o.hasOwnProperty('index') && o.index > 0)
                u.dispatch(
                  module1218.StackActions.popToTop({
                    key: o.key,
                  })
                );
            } else t._jumpTo(o.routeName);
          };

        if (p.tabBarOnPress)
          p.tabBarOnPress({
            navigation: u,
            defaultHandler: l,
          });
        else l();
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
          module1218.NavigationActions.navigate({
            routeName: n,
          })
        );
      };

      t._isTabPress = false;
      return t;
    }

    module7.default(O, [
      {
        key: 'render',
        value: function () {
          var n = this.props,
            s = n.descriptors,
            c = n.navigation,
            u = n.screenProps,
            p = c.state,
            l = p.routes[p.index],
            f = s[l.key],
            v = h(h({}, this.props.navigationConfig), f.options);
          return <t />;
        },
      },
    ]);
    return O;
  })(React.Component);

  return function (t) {
    var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      s = module1218.TabRouter(t, o),
      c = module1218.createNavigator(n, s, o);
    return module1218.createNavigationContainer(c);
  };
};

var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1218 = require('./1218');

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
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      y(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      y(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function _() {
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
