var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1291 = require('./1291'),
  module1217 = require('./1217');

function y() {
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

var P = (function (t, ...args) {
  module9.default(_, t);

  var module13 = _,
    P = y(),
    h = function () {
      var t,
        n = module12.default(module13);

      if (P) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function _() {
    var t;
    module6.default(this, _);

    (t = h.call(this, ...args))._handlePageChanged = function (n) {
      var o = t.props.navigation.state.routes[n].routeName;
      t.props.navigation.dispatch(
        module1217.NavigationActions.navigate({
          routeName: o,
        })
      );
    };

    t._renderScene = function (n) {
      var o = n.route,
        s = t.props,
        u = s.screenProps,
        p = s.navigation,
        c = s.descriptors,
        f = t.props.navigationConfig,
        b = f.lazy,
        y = f.removeClippedSubviews,
        P = f.animationEnabled,
        h = f.swipeEnabled,
        B = c[o.key],
        _ = p.state.index,
        C = p.state.routes[_].key,
        E = o.key,
        w = B.getComponent();
      return React.default.createElement(module1217.ResourceSavingSceneView, {
        lazy: b,
        isFocused: C === E,
        removeClippedSubViews: y,
        animationEnabled: P,
        swipeEnabled: h,
        screenProps: u,
        component: w,
        navigation: p,
        childNavigation: B.navigation,
      });
    };

    t._getLabel = function (n) {
      var o = n.route,
        s = n.tintColor,
        u = n.focused,
        p = t.props,
        c = p.descriptors[o.key].options;
      if (c.tabBarLabel)
        return 'function' == typeof c.tabBarLabel
          ? c.tabBarLabel({
              tintColor: s,
              focused: u,
            })
          : c.tabBarLabel;
      else return 'string' == typeof c.title ? c.title : o.routeName;
    };

    t._getOnPress = function (n, o) {
      var s = o.route;
      return t.props.descriptors[s.key].options.tabBarOnPress;
    };

    t._getTestIDProps = function (n) {
      var o = n.route,
        s = t.props.descriptors[o.key].options;
      return 'function' == typeof s.tabBarTestIDProps
        ? s.tabBarTestIDProps({
            focused: focused,
          })
        : s.tabBarTestIDProps;
    };

    t._renderIcon = function (n) {
      var o = n.focused,
        s = n.route,
        u = n.tintColor,
        p = t.props.descriptors[s.key].options;
      return p.tabBarIcon
        ? 'function' == typeof p.tabBarIcon
          ? p.tabBarIcon({
              tintColor: u,
              focused: o,
            })
          : p.tabBarIcon
        : null;
    };

    t._renderTabBar = function (o) {
      var s = t.props.navigationConfig,
        u = s.tabBarOptions,
        p = s.tabBarComponent,
        c = s.animationEnabled,
        f = s.tabBarPosition;
      return undefined === p
        ? null
        : React.default.createElement(
            p,
            module22.default({}, o, u, {
              tabBarPosition: f,
              screenProps: t.props.screenProps,
              navigation: t.props.navigation,
              getLabel: t._getLabel,
              getTestIDProps: t._getTestIDProps,
              getOnPress: t._getOnPress,
              renderIcon: t._renderIcon,
              animationEnabled: c,
            })
          );
    };

    t._renderPager = function (t) {
      return React.default.createElement(module1291.TabViewPagerPan, t);
    };

    return t;
  }

  module7.default(_, [
    {
      key: 'render',
      value: function () {
        var t,
          n,
          o,
          s = this.props.navigationConfig,
          u = s.tabBarComponent,
          p = s.tabBarPosition,
          c = s.animationEnabled,
          f = s.configureTransition,
          v = s.initialLayout,
          y = this.props.navigation.state,
          P = y.routes[y.index],
          h = this.props.descriptors[P.key].options,
          _ = null == h.tabBarVisible || h.tabBarVisible,
          C = null == h.swipeEnabled ? this.props.navigationConfig.swipeEnabled : h.swipeEnabled;

        if ('function' == typeof C) C = C(y);
        if (undefined !== u && _) 'bottom' === p ? (n = this._renderTabBar) : (t = this._renderTabBar);
        if ((false === c && false === C) || 'function' == typeof f) o = this._renderPager;
        var E = {
          initialLayout: v,
          animationEnabled: c,
          configureTransition: f,
          swipeEnabled: C,
          renderPager: o,
          renderHeader: t,
          renderFooter: n,
          renderScene: this._renderScene,
          onIndexChange: this._handlePageChanged,
          navigationState: this.props.navigation.state,
          style: B.container,
        };
        return React.default.createElement(module1291.TabViewAnimated, E);
      },
    },
  ]);
  return _;
})(React.default.PureComponent);

P.defaultProps = {
  lazy: true,
  removedClippedSubviews: true,
  initialLayout: module13.Platform.select({
    android: {
      width: 1,
      height: 0,
    },
  }),
};
var h = P;
exports.default = h;
var B = module13.StyleSheet.create({
  container: {
    flex: 1,
  },
});
