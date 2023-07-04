var module30 = require('./30'),
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
    var o = O(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var s = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, c, s);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module970 = require('./970'),
  module938 = require('./938'),
  module1028 = require('./1028'),
  module1029 = require('./1029'),
  module1033 = require('./1033');

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (O = function (t) {
    return t ? o : n;
  })(t);
}

function T() {
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

var j = (function (t, ...args) {
  module7.default(j, t);

  var module938 = j,
    module1028 = T(),
    O = function () {
      var t,
        n = module11.default(module938);

      if (module1028) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function j() {
    var t;
    module4.default(this, j);
    (t = O.call(this, ...args)).state = {
      loaded: [t.props.navigation.state.index],
    };

    t._renderTabBar = function () {
      var n = t.props,
        l = n.tabBarComponent,
        u = undefined === l ? module1029.default : l,
        c = n.tabBarOptions,
        s = n.navigation,
        f = n.screenProps,
        y = n.getLabelText,
        v = n.getAccessibilityLabel,
        b = n.getButtonComponent,
        h = n.getTestID,
        x = n.renderIcon,
        O = n.onTabPress,
        T = t.props.descriptors,
        j = t.props.navigation.state;
      return false === T[j.routes[j.index].key].options.tabBarVisible ? null : <u />;
    };

    t._jumpTo = function (n) {
      var o = t.props,
        l = o.navigation;
      o.onIndexChange(
        l.state.routes.findIndex(function (t) {
          return t.key === n;
        })
      );
    };

    return t;
  }

  module5.default(
    j,
    [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.navigation,
            o = t.renderScene,
            l = t.lazy,
            u = n.state.routes,
            c = this.state.loaded;
          return React.createElement(
            module12.View,
            {
              style: _.container,
            },
            React.createElement(
              module970.ScreenContainer,
              {
                style: _.pages,
              },
              u.map(function (t, u) {
                if (l && !c.includes(u)) return null;
                var s = n.state.index === u;
                return React.createElement(
                  module1033.default,
                  {
                    key: t.key,
                    style: [
                      module12.StyleSheet.absoluteFill,
                      {
                        opacity: s ? 1 : 0,
                      },
                    ],
                    isVisible: s,
                  },
                  o({
                    route: t,
                  })
                );
              })
            ),
            this._renderTabBar()
          );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function (t, o) {
          var l = t.navigation.state.index;
          return {
            loaded: o.loaded.includes(l) ? o.loaded : [].concat(module30.default(o.loaded), [l]),
          };
        },
      },
    ]
  );
  return j;
})(React.PureComponent);

j.defaultProps = {
  lazy: true,
};
module938.polyfill(j);

var _ = module12.StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden',
    },
    pages: {
      flex: 1,
    },
  }),
  k = module1028.default(j);

exports.default = k;
