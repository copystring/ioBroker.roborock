var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module22 = require('./22'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1213 = require('./1213'),
  module1307 = require('./1307'),
  module1300 = require('./1300'),
  module1318 = require('./1318'),
  module1305 = require('./1305');

function _() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (n) {
    return false;
  }
}

var P = (function (n, ...args) {
  module9.default(P, n);

  var t = P,
    module1213 = _(),
    S = function () {
      var n,
        o = module12.default(t);

      if (module1213) {
        var s = module12.default(this).constructor;
        n = Reflect.construct(o, arguments, s);
      } else n = o.apply(this, arguments);

      return module11.default(this, n);
    };

  function P() {
    var n;
    module6.default(this, P);
    (n = S.call(this, ...args)).state = {
      index: 0,
      isSwiping: false,
      loaded: [n.props.navigation.state.index],
      transitioningFromIndex: null,
    };

    n._renderIcon = function (t) {
      var o = t.focused,
        s = t.route,
        l = t.tintColor,
        u = n.props.descriptors[s.key].options;
      return u.tabBarIcon
        ? 'function' == typeof u.tabBarIcon
          ? u.tabBarIcon({
              tintColor: l,
              focused: o,
            })
          : u.tabBarIcon
        : null;
    };

    n._renderTabBar = function (t) {
      var o = n.props.navigation.state,
        s = o.routes[o.index],
        u = n.props.descriptors[s.key].options,
        c = null == u.tabBarVisible || u.tabBarVisible,
        p = n.props,
        f = p.tabBarComponent,
        b = undefined === f ? module1318.default : f,
        h = p.tabBarPosition,
        x = p.tabBarOptions;
      return null !== b && c ? <b /> : null;
    };

    n._renderPanPager = function (n) {
      return <module1307.PagerPan />;
    };

    n._handleAnimationEnd = function () {
      if (n.props.lazy)
        n.setState({
          transitioningFromIndex: null,
          isSwiping: false,
        });
    };

    n._handleSwipeStart = function () {
      var t = n.props,
        o = t.navigation;
      if (t.lazy)
        n.setState({
          isSwiping: true,
          loaded: module31.default(new Set([].concat(module31.default(n.state.loaded), [(o.state.index - 1) ** 0, (o.state.index + 1) ** (o.state.routes.length - 1)]))),
        });
    };

    n._handleIndexChange = function (t) {
      var o = n.props,
        s = o.animationEnabled,
        l = o.navigation,
        u = o.onIndexChange;
      if (o.lazy && s)
        n.setState({
          transitioningFromIndex: l.state.index || 0,
        });
      u(t);
    };

    n._mustBeVisible = function (t) {
      var o = t.index,
        s = t.focused,
        l = n.props,
        u = l.animationEnabled,
        c = l.navigation,
        p = n.state,
        f = p.isSwiping,
        b = p.transitioningFromIndex;
      if (f && (c.state.index === o - 1 || c.state.index === o + 1)) return true;
      return !(!u || b !== o) || s;
    };

    n._renderScene = function (t) {
      var o = t.route,
        s = n.props,
        l = s.renderScene,
        u = s.descriptors,
        c = s.lazy,
        p = s.optimizationsEnabled;

      if (c) {
        var f = n.state.loaded,
          b = n.props.navigation.state.routes.findIndex(function (n) {
            return n.key === o.key;
          }),
          x = u[o.key].navigation,
          y = n._mustBeVisible({
            index: b,
            focused: x.isFocused(),
          });

        if (!f.includes(b) && !y) return <module13.View />;
        if (p)
          return (
            <module1305.default isVisible={y}>
              {l({
                route: o,
              })}
            </module1305.default>
          );
      }

      return l({
        route: o,
      });
    };

    return n;
  }

  module7.default(
    P,
    [
      {
        key: 'render',
        value: function () {
          var n,
            t = this.props,
            s = t.navigation,
            u = t.animationEnabled,
            c = module56.default(t, ['navigation', 'animationEnabled', 'renderScene', 'onIndexChange']),
            p = this.props.navigation.state,
            f = p.routes[p.index],
            b = this.props.descriptors[f.key].options,
            h = null == b.swipeEnabled ? this.props.swipeEnabled : b.swipeEnabled;
          if ('function' == typeof h) h = h(p);
          if (false === u && false === h) n = this._renderPanPager;
          return <module1307.TabView />;
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function (n, t) {
          var o = n.navigation.state.index;
          return t.index === o
            ? null
            : {
                loaded: t.loaded.includes(o) ? t.loaded : [].concat(module31.default(t.loaded), [o]),
                index: o,
              };
        },
      },
    ]
  );
  return P;
})(React.PureComponent);

P.defaultProps = {
  initialLayout: module13.Platform.select({
    android: {
      width: 1,
      height: 0,
    },
  }),
  animationEnabled: true,
  lazy: false,
  optimizationsEnabled: false,
};
module1213.polyfill(P);
var w = module1300.default(P);
exports.default = w;
