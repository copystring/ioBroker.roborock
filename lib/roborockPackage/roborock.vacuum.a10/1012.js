var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1013 = require('./1013'),
  module936 = require('./936');

function y() {
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

var P = (function (t, ...args) {
  module7.default(_, t);

  var module12 = _,
    P = y(),
    h = function () {
      var t,
        n = module11.default(module12);

      if (P) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    var t;
    module4.default(this, _);

    (t = h.call(this, ...args))._handlePageChanged = function (n) {
      var o = t.props.navigation.state.routes[n].routeName;
      t.props.navigation.dispatch(
        module936.NavigationActions.navigate({
          routeName: o,
        })
      );
    };

    t._renderScene = function (n) {
      var o = n.route,
        s = t.props,
        u = s.screenProps,
        l = s.navigation,
        p = s.descriptors,
        f = t.props.navigationConfig,
        b = f.lazy,
        y = f.removeClippedSubviews,
        P = f.animationEnabled,
        h = f.swipeEnabled,
        B = p[o.key],
        _ = l.state.index,
        C = l.state.routes[_].key,
        E = o.key,
        w = B.getComponent();
      return React.default.createElement(module936.ResourceSavingSceneView, {
        lazy: b,
        isFocused: C === E,
        removeClippedSubViews: y,
        animationEnabled: P,
        swipeEnabled: h,
        screenProps: u,
        component: w,
        navigation: l,
        childNavigation: B.navigation,
      });
    };

    t._getLabel = function (n) {
      var o = n.route,
        s = n.tintColor,
        u = n.focused,
        l = t.props,
        p = l.descriptors[o.key].options;
      if (p.tabBarLabel)
        return 'function' == typeof p.tabBarLabel
          ? p.tabBarLabel({
              tintColor: s,
              focused: u,
            })
          : p.tabBarLabel;
      else return 'string' == typeof p.title ? p.title : o.routeName;
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
        l = t.props.descriptors[s.key].options;
      return l.tabBarIcon
        ? 'function' == typeof l.tabBarIcon
          ? l.tabBarIcon({
              tintColor: u,
              focused: o,
            })
          : l.tabBarIcon
        : null;
    };

    t._renderTabBar = function (o) {
      var s = t.props.navigationConfig,
        u = s.tabBarOptions,
        l = s.tabBarComponent,
        p = s.animationEnabled,
        f = s.tabBarPosition;
      return undefined === l
        ? null
        : React.default.createElement(
            l,
            module21.default({}, o, u, {
              tabBarPosition: f,
              screenProps: t.props.screenProps,
              navigation: t.props.navigation,
              getLabel: t._getLabel,
              getTestIDProps: t._getTestIDProps,
              getOnPress: t._getOnPress,
              renderIcon: t._renderIcon,
              animationEnabled: p,
            })
          );
    };

    t._renderPager = function (t) {
      return React.default.createElement(module1013.TabViewPagerPan, t);
    };

    return t;
  }

  module5.default(_, [
    {
      key: 'render',
      value: function () {
        var t,
          n,
          o,
          s = this.props.navigationConfig,
          u = s.tabBarComponent,
          l = s.tabBarPosition,
          p = s.animationEnabled,
          f = s.configureTransition,
          v = s.initialLayout,
          y = this.props.navigation.state,
          P = y.routes[y.index],
          h = this.props.descriptors[P.key].options,
          _ = null == h.tabBarVisible || h.tabBarVisible,
          C = null == h.swipeEnabled ? this.props.navigationConfig.swipeEnabled : h.swipeEnabled;

        if ('function' == typeof C) C = C(y);
        if (undefined !== u && _) 'bottom' === l ? (n = this._renderTabBar) : (t = this._renderTabBar);
        if ((false === p && false === C) || 'function' == typeof f) o = this._renderPager;
        var E = {
          initialLayout: v,
          animationEnabled: p,
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
        return React.default.createElement(module1013.TabViewAnimated, E);
      },
    },
  ]);
  return _;
})(React.default.PureComponent);

P.defaultProps = {
  lazy: true,
  removedClippedSubviews: true,
  initialLayout: module12.Platform.select({
    android: {
      width: 1,
      height: 0,
    },
  }),
};
var h = P;
exports.default = h;
var B = module12.StyleSheet.create({
  container: {
    flex: 1,
  },
});
