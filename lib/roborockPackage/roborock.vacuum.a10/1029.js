var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module936 = require('./936'),
  module1030 = require('./1030'),
  module1031 = require('./1031'),
  y = ['onPress', 'testID', 'accessibilityLabel'];

function L(t) {
  var o = C();
  return function () {
    var n,
      l = module11.default(t);

    if (o) {
      var c = module11.default(this).constructor;
      n = Reflect.construct(l, arguments, c);
    } else n = l.apply(this, arguments);

    return module9.default(this, n);
  };
}

function C() {
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

var w = parseInt(module12.Platform.Version, 10),
  B = 'ios' === module12.Platform.OS,
  P = w >= 11 && B,
  I = 125,
  x = (function (t) {
    module7.default(u, t);
    var s = L(u);

    function u() {
      module4.default(this, u);
      return s.apply(this, arguments);
    }

    module5.default(u, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.onPress,
            l = t.testID,
            c = t.accessibilityLabel,
            s = module55.default(t, y);
          return React.default.createElement(
            module12.TouchableWithoutFeedback,
            {
              onPress: n,
              testID: l,
              accessibilityLabel: c,
            },
            React.default.createElement(module12.View, s)
          );
        },
      },
    ]);
    return u;
  })(React.default.Component),
  S = (function (t, ...args) {
    module7.default(s, t);
    var o = L(s);

    function s() {
      var t;
      module4.default(this, s);

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
              module12.Animated.Text,
              {
                numberOfLines: 1,
                style: [
                  T.label,
                  {
                    color: C,
                  },
                  v && t._shouldUseHorizontalLabels() ? T.labelBeside : T.labelBeneath,
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

        return React.default.createElement(module1030.default, {
          route: n,
          horizontal: L,
          navigation: s,
          activeOpacity: C,
          inactiveOpacity: w,
          activeTintColor: u,
          inactiveTintColor: b,
          renderIcon: p,
          style: [T.iconWithExplicitHeight, false === y && !L && T.iconWithoutLabel, false !== y && !L && T.iconWithLabel],
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

        if (module12.Platform.isPad) {
          var f = I,
            p = module12.StyleSheet.flatten(u);
          if (p) 'number' == typeof p.width ? (f = p.width) : 'number' == typeof p.maxWidth && (f = p.maxWidth);
          return o.length * f <= c.width;
        }

        return l;
      };

      return t;
    }

    module5.default(s, [
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
            L = [T.tabBar, this._shouldUseHorizontalLabels() && !module12.Platform.isPad ? T.tabBarCompact : T.tabBarRegular, h];
          return React.default.createElement(
            module936.SafeAreaView,
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
                  }) || x;
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
                    T.tab,
                    {
                      backgroundColor: L,
                    },
                    t._shouldUseHorizontalLabels() ? T.tabLandscape : T.tabPortrait,
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

S.defaultProps = {
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

var T = module12.StyleSheet.create({
    tabBar: {
      backgroundColor: '#fff',
      borderTopWidth: module12.StyleSheet.hairlineWidth,
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
      alignItems: B ? 'center' : 'stretch',
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
      height: module12.Platform.isPad ? 49 : 29,
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
  _ = module1031.default(S);

exports.default = _;
