var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module30 = require('./30'),
  module21 = require('./21'),
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
    var o = w(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(s, u, c);
        else s[u] = t[u];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module938 = require('./938'),
  module1035 = require('./1035'),
  module1028 = require('./1028'),
  module1046 = require('./1046'),
  module1033 = require('./1033'),
  _ = ['navigation', 'animationEnabled', 'renderScene', 'onIndexChange'];

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (w = function (t) {
    return t ? o : n;
  })(t);
}

function E() {
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

var I = (function (t, ...args) {
  module7.default(I, t);

  var module938 = I,
    module1028 = E(),
    w = function () {
      var t,
        n = module11.default(module938);

      if (module1028) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function I() {
    var t;
    module4.default(this, I);
    (t = w.call(this, ...args)).state = {
      index: 0,
      isSwiping: false,
      loaded: [t.props.navigation.state.index],
      transitioningFromIndex: null,
    };

    t._renderIcon = function (n) {
      var o = n.focused,
        s = n.route,
        l = n.tintColor,
        u = t.props.descriptors[s.key].options;
      return u.tabBarIcon
        ? 'function' == typeof u.tabBarIcon
          ? u.tabBarIcon({
              tintColor: l,
              focused: o,
            })
          : u.tabBarIcon
        : null;
    };

    t._renderTabBar = function (n) {
      var o = t.props.navigation.state,
        l = o.routes[o.index],
        u = t.props.descriptors[l.key].options,
        c = null == u.tabBarVisible || u.tabBarVisible,
        p = t.props,
        f = p.tabBarComponent,
        v = undefined === f ? module1046.default : f,
        h = p.tabBarPosition,
        y = p.tabBarOptions;
      return null !== v && c ? <v /> : null;
    };

    t._renderPanPager = function (t) {
      return <module1035.PagerPan />;
    };

    t._handleAnimationEnd = function () {
      if (t.props.lazy)
        t.setState({
          transitioningFromIndex: null,
          isSwiping: false,
        });
    };

    t._handleSwipeStart = function () {
      var n = t.props,
        s = n.navigation;
      if (n.lazy)
        t.setState({
          isSwiping: true,
          loaded: module30.default(new Set([].concat(module30.default(t.state.loaded), [(s.state.index - 1) ** 0, (s.state.index + 1) ** (s.state.routes.length - 1)]))),
        });
    };

    t._handleIndexChange = function (n) {
      var o = t.props,
        s = o.animationEnabled,
        l = o.navigation,
        u = o.onIndexChange;
      if (o.lazy && s)
        t.setState({
          transitioningFromIndex: l.state.index || 0,
        });
      u(n);
    };

    t._mustBeVisible = function (n) {
      var o = n.index,
        s = n.focused,
        l = t.props,
        u = l.animationEnabled,
        c = l.navigation,
        p = t.state,
        f = p.isSwiping,
        b = p.transitioningFromIndex;
      if (f && (c.state.index === o - 1 || c.state.index === o + 1)) return true;
      return !(!u || b !== o) || s;
    };

    t._renderScene = function (n) {
      var o = n.route,
        s = t.props,
        l = s.renderScene,
        u = s.descriptors,
        c = s.lazy,
        p = s.optimizationsEnabled;

      if (c) {
        var f = t.state.loaded,
          h = t.props.navigation.state.routes.findIndex(function (t) {
            return t.key === o.key;
          }),
          y = u[o.key].navigation,
          x = t._mustBeVisible({
            index: h,
            focused: y.isFocused(),
          });

        if (!f.includes(h) && !x) return <module12.View />;
        if (p)
          return (
            <module1033.default isVisible={x}>
              {l({
                route: o,
              })}
            </module1033.default>
          );
      }

      return l({
        route: o,
      });
    };

    return t;
  }

  module5.default(
    I,
    [
      {
        key: 'render',
        value: function () {
          var t,
            o = this.props,
            l = o.navigation,
            u = o.animationEnabled,
            c = module55.default(o, _),
            p = this.props.navigation.state,
            f = p.routes[p.index],
            v = this.props.descriptors[f.key].options,
            h = null == v.swipeEnabled ? this.props.swipeEnabled : v.swipeEnabled;
          if ('function' == typeof h) h = h(p);
          if (false === u && false === h) t = this._renderPanPager;
          return <module1035.TabView />;
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function (t, n) {
          var s = t.navigation.state.index;
          return n.index === s
            ? null
            : {
                loaded: n.loaded.includes(s) ? n.loaded : [].concat(module30.default(n.loaded), [s]),
                index: s,
              };
        },
      },
    ]
  );
  return I;
})(React.PureComponent);

I.defaultProps = {
  initialLayout: module12.Platform.select({
    android: {
      width: 1,
      height: 0,
    },
  }),
  animationEnabled: true,
  lazy: false,
  optimizationsEnabled: false,
};
module938.polyfill(I);
var B = module1028.default(I);
exports.default = B;
