var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1217 = require('./1217'),
  module1308 = require('./1308'),
  module1309 = require('./1309');

function y(t) {
  var o = L();
  return function () {
    var n,
      l = module12.default(t);

    if (o) {
      var c = module12.default(this).constructor;
      n = Reflect.construct(l, arguments, c);
    } else n = l.apply(this, arguments);

    return module11.default(this, n);
  };
}

function L() {
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

var C = parseInt(module13.Platform.Version, 10),
  w = 'ios' === module13.Platform.OS,
  P = C >= 11 && w,
  I = 125,
  S = (function (t) {
    module9.default(u, t);
    var s = y(u);

    function u() {
      module6.default(this, u);
      return s.apply(this, arguments);
    }

    module7.default(u, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.onPress,
            l = t.testID,
            c = t.accessibilityLabel,
            s = module56.default(t, ['onPress', 'testID', 'accessibilityLabel']);
          return React.default.createElement(
            module13.TouchableWithoutFeedback,
            {
              onPress: n,
              testID: l,
              accessibilityLabel: c,
            },
            React.default.createElement(module13.View, s)
          );
        },
      },
    ]);
    return u;
  })(React.default.Component),
  x = (function (t, ...args) {
    module9.default(s, t);
    var o = y(s);

    function s() {
      var t;
      module6.default(this, s);

      (t = o.call(this, ...args))._renderLabel = function (o) {
        var n = o.route,
          l = o.focused,
          c = t.props,
          s = c.activeTintColor,
          u = c.inactiveTintColor,
          p = c.labelStyle,
          h = c.showLabel,
          v = c.showIcon,
          y = c.allowFontScaling;
        if (false === h) return null;
        var L = t.props.getLabelText({
            route: n,
          }),
          C = l ? s : u;
        return 'string' == typeof L
          ? React.default.createElement(
              module13.Animated.Text,
              {
                numberOfLines: 1,
                style: [
                  B.label,
                  {
                    color: C,
                  },
                  v && t._shouldUseHorizontalLabels() ? B.labelBeside : B.labelBeneath,
                  p,
                ],
                allowFontScaling: y,
              },
              L
            )
          : 'function' == typeof L
          ? L({
              route: n,
              focused: l,
              tintColor: C,
            })
          : L;
      };

      t._renderIcon = function (o) {
        var n = o.route,
          l = o.focused,
          c = t.props,
          s = c.navigation,
          u = c.activeTintColor,
          b = c.inactiveTintColor,
          p = c.renderIcon,
          v = c.showIcon,
          y = c.showLabel;
        if (false === v) return null;

        var L = t._shouldUseHorizontalLabels(),
          C = l ? 1 : 0,
          w = l ? 0 : 1;

        return React.default.createElement(module1308.default, {
          route: n,
          horizontal: L,
          navigation: s,
          activeOpacity: C,
          inactiveOpacity: w,
          activeTintColor: u,
          inactiveTintColor: b,
          renderIcon: p,
          style: [B.iconWithExplicitHeight, false === y && !L && B.iconWithoutLabel, false !== y && !L && B.iconWithLabel],
        });
      };

      t._shouldUseHorizontalLabels = function () {
        var o = t.props.navigation.state.routes,
          n = t.props,
          l = n.isLandscape,
          c = n.dimensions,
          s = n.adaptive,
          u = n.tabStyle;
        if (!s) return false;

        if (module13.Platform.isPad) {
          var f = I,
            p = module13.StyleSheet.flatten(u);
          if (p) 'number' == typeof p.width ? (f = p.width) : 'number' == typeof p.maxWidth && (f = p.maxWidth);
          return o.length * f <= c.width;
        }

        return l;
      };

      return t;
    }

    module7.default(s, [
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props,
            n = o.navigation,
            l = o.activeBackgroundColor,
            c = o.inactiveBackgroundColor,
            s = o.onTabPress,
            u = o.safeAreaInset,
            h = o.style,
            v = o.tabStyle,
            y = n.state.routes,
            L = [B.tabBar, this._shouldUseHorizontalLabels() && !module13.Platform.isPad ? B.tabBarCompact : B.tabBarRegular, h];
          return React.default.createElement(
            module1217.SafeAreaView,
            {
              style: L,
              forceInset: u,
            },
            y.map(function (o, u) {
              var b = u === n.state.index,
                p = {
                  route: o,
                  focused: b,
                },
                h = t.props.getAccessibilityLabel({
                  route: o,
                }),
                y = t.props.getTestID({
                  route: o,
                }),
                L = b ? l : c,
                C =
                  t.props.getButtonComponent({
                    route: o,
                  }) || S;
              return React.default.createElement(
                C,
                {
                  key: o.key,
                  onPress: function () {
                    return s({
                      route: o,
                    });
                  },
                  testID: y,
                  accessibilityLabel: h,
                  style: [
                    B.tab,
                    {
                      backgroundColor: L,
                    },
                    t._shouldUseHorizontalLabels() ? B.tabLandscape : B.tabPortrait,
                    v,
                  ],
                },
                t._renderIcon(p),
                t._renderLabel(p)
              );
            })
          );
        },
      },
    ]);
    return s;
  })(React.default.Component);

x.defaultProps = {
  activeTintColor: '#3478f6',
  activeBackgroundColor: 'transparent',
  inactiveTintColor: '#929292',
  inactiveBackgroundColor: 'transparent',
  showLabel: true,
  showIcon: true,
  allowFontScaling: true,
  adaptive: P,
  safeAreaInset: {
    bottom: 'always',
    top: 'never',
  },
};
var B = module13.StyleSheet.create({
    tabBar: {
      backgroundColor: '#fff',
      borderTopWidth: module13.StyleSheet.hairlineWidth,
      borderTopColor: 'rgba(0, 0, 0, .3)',
      flexDirection: 'row',
    },
    tabBarCompact: {
      height: 29,
    },
    tabBarRegular: {
      height: 49,
    },
    tab: {
      flex: 1,
      alignItems: w ? 'center' : 'stretch',
    },
    tabPortrait: {
      justifyContent: 'flex-end',
      flexDirection: 'column',
    },
    tabLandscape: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    iconWithoutLabel: {
      flex: 1,
    },
    iconWithLabel: {
      flex: 1,
    },
    iconWithExplicitHeight: {
      height: module13.Platform.isPad ? 49 : 29,
    },
    label: {
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
    labelBeneath: {
      fontSize: 11,
      marginBottom: 1.5,
    },
    labelBeside: {
      fontSize: 12,
      marginLeft: 15,
    },
  }),
  T = module1309.default(x);
exports.default = T;
