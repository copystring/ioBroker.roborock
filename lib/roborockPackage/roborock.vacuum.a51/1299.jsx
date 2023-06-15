var module31 = require('@babel/runtime/helpers/toConsumableArray'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1242 = require('./1242'),
  module1213 = require('./1213'),
  module1300 = require('./1300'),
  module1301 = require('./1301'),
  module1305 = require('./1305');

function S() {
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

var _ = (function (t, ...args) {
  module9.default(_, t);

  var n = _,
    module1213 = S(),
    x = function () {
      var t,
        o = module12.default(n);

      if (module1213) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function _() {
    var t;
    module6.default(this, _);
    (t = x.call(this, ...args)).state = {
      loaded: [t.props.navigation.state.index],
    };

    t._renderTabBar = function () {
      var n = t.props,
        o = n.tabBarComponent,
        u = undefined === o ? module1301.default : o,
        s = n.tabBarOptions,
        c = n.navigation,
        f = n.screenProps,
        p = n.getLabelText,
        y = n.getAccessibilityLabel,
        b = n.getButtonComponent,
        h = n.getTestID,
        x = n.renderIcon,
        P = n.onTabPress,
        S = t.props.descriptors,
        _ = t.props.navigation.state;
      return false === S[_.routes[_.index].key].options.tabBarVisible ? null : <u />;
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

  module7.default(
    _,
    [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.navigation,
            o = t.renderScene,
            l = t.lazy,
            u = n.state.routes,
            s = this.state.loaded;
          return React.createElement(
            module13.View,
            {
              style: B.container,
            },
            React.createElement(
              module1242.ScreenContainer,
              {
                style: B.pages,
              },
              u.map(function (t, u) {
                if (l && !s.includes(u)) return null;
                var c = n.state.index === u;
                return React.createElement(
                  module1305.default,
                  {
                    key: t.key,
                    style: [
                      module13.StyleSheet.absoluteFill,
                      {
                        opacity: c ? 1 : 0,
                      },
                    ],
                    isVisible: c,
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
        value: function (t, n) {
          var l = t.navigation.state.index;
          return {
            loaded: n.loaded.includes(l) ? n.loaded : [].concat(module31.default(n.loaded), [l]),
          };
        },
      },
    ]
  );
  return _;
})(React.PureComponent);

_.defaultProps = {
  lazy: true,
};
module1213.polyfill(_);
var B = module13.StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden',
    },
    pages: {
      flex: 1,
    },
  }),
  k = module1300.default(_);
exports.default = k;
