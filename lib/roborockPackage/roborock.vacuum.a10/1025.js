var module49 = require('./49'),
  module30 = require('./30'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module936 = require('./936'),
  module1024 = require('./1024');

function v(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function w(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      v(Object(l), true).forEach(function (o) {
        module49.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      v(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function P() {
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

var T = parseInt(module12.Platform.Version, 10),
  x = 'ios' === module12.Platform.OS,
  O = T >= 11 && x,
  C = (function (t, ...args) {
    module7.default(x, t);

    var module49 = x,
      v = P(),
      T = function () {
        var t,
          o = module11.default(module49);

        if (v) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function x() {
      var t;
      module4.default(this, x);

      (t = T.call(this, ...args))._renderLabel = function (n) {
        var l = t.props,
          s = l.position,
          c = l.navigation,
          u = l.activeTintColor,
          f = l.inactiveTintColor,
          b = l.labelStyle,
          y = l.showLabel,
          v = l.showIcon,
          P = l.allowFontScaling;
        if (false === y) return null;

        var T = n.index,
          x = c.state.routes,
          O = [-1].concat(
            module30.default(
              x.map(function (t, n) {
                return n;
              })
            )
          ),
          C = O.map(function (t) {
            return t === T ? u : f;
          }),
          S = s.interpolate({
            inputRange: O,
            outputRange: C,
          }),
          _ = n.focused ? u : f,
          L = t.props.getLabel(
            w(
              w({}, n),
              {},
              {
                tintColor: _,
              }
            )
          );

        return 'string' == typeof L
          ? React.default.createElement(
              module12.Animated.Text,
              {
                numberOfLines: 1,
                style: [
                  I.label,
                  {
                    color: S,
                  },
                  v && t._shouldUseHorizontalTabs() ? I.labelBeside : I.labelBeneath,
                  b,
                ],
                allowFontScaling: P,
              },
              L
            )
          : 'function' == typeof L
          ? L(
              w(
                w({}, n),
                {},
                {
                  tintColor: _,
                }
              )
            )
          : L;
      };

      t._renderIcon = function (n) {
        var o = t.props,
          l = o.position,
          s = o.navigation,
          c = o.activeTintColor,
          u = o.inactiveTintColor,
          f = o.renderIcon,
          h = o.showIcon,
          b = o.showLabel;
        if (false === h) return null;

        var v = t._shouldUseHorizontalTabs();

        return React.default.createElement(module1024.default, {
          position: l,
          navigation: s,
          activeTintColor: c,
          inactiveTintColor: u,
          renderIcon: f,
          scene: n,
          style: [I.iconWithExplicitHeight, false === b && !v && I.iconWithoutLabel, false !== b && !v && I.iconWithLabel],
        });
      };

      t._renderTestIDProps = function (n) {
        return t.props.getTestIDProps && t.props.getTestIDProps(n);
      };

      t._handleTabPress = function (n) {
        var o = t.props,
          l = o.jumpToIndex,
          s = o.navigation;

        if (s.state.index === n) {
          var c = s.state.routes[n];
          if (c.hasOwnProperty('index') && c.index > 0)
            s.dispatch(
              module936.StackActions.popToTop({
                key: c.key,
              })
            );
        } else l(n);
      };

      return t;
    }

    module5.default(x, [
      {
        key: '_tabItemMaxWidth',
        value: function () {
          var t,
            n = this.props,
            o = n.tabStyle,
            l = n.layout,
            s = module12.StyleSheet.flatten(o);
          if (s)
            if ('number' == typeof s.width) t = s.width;
            else if ('string' == typeof s.width && s.width.endsWith('%')) {
              var c = parseFloat(s.width);
              if (Number.isFinite(c)) t = l.width * (c / 100);
            } else if ('number' == typeof s.maxWidth) t = s.maxWidth;
            else if ('string' == typeof s.maxWidth && s.width.endsWith('%')) {
              var u = parseFloat(s.maxWidth);
              if (Number.isFinite(u)) t = l.width * (u / 100);
            }
          if (!t) t = 125;
          return t;
        },
      },
      {
        key: '_shouldUseHorizontalTabs',
        value: function () {
          var t = this.props.navigation.state.routes,
            n = this.props,
            o = n.isLandscape,
            l = n.layout,
            s = n.adaptive;
          n.tabStyle;
          if (!s) return false;
          var c = l.width;
          if (0 === c) return module12.Platform.isPad;

          if (module12.Platform.isPad) {
            var u = this._tabItemMaxWidth();

            return t.length * u <= c;
          }

          return o;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props,
            l = n.position,
            s = n.navigation,
            c = n.jumpToIndex,
            u = n.getOnPress,
            f = n.activeBackgroundColor,
            y = n.inactiveBackgroundColor,
            v = n.style,
            w = n.animateStyle,
            P = n.tabStyle,
            T = s.state.routes,
            x = T[s.state.index],
            O = [-1].concat(
              module30.default(
                T.map(function (t, n) {
                  return n;
                })
              )
            ),
            C = [I.tabBar, this._shouldUseHorizontalTabs() && !module12.Platform.isPad ? I.tabBarCompact : I.tabBarRegular, v];
          return React.default.createElement(
            module12.Animated.View,
            {
              style: w,
            },
            React.default.createElement(
              module936.SafeAreaView,
              {
                style: C,
                forceInset: {
                  bottom: 'always',
                  top: 'never',
                },
              },
              T.map(function (n, o) {
                t.props.showIcon;
                var b = o === s.state.index,
                  v = {
                    route: n,
                    index: o,
                    focused: b,
                  },
                  w = u(x, v),
                  T = O.map(function (t) {
                    return t === o ? f : y;
                  }),
                  C = l.interpolate({
                    inputRange: O,
                    outputRange: T,
                  }),
                  S = t._renderTestIDProps(v) || {},
                  _ = S.testID,
                  L = S.accessibilityLabel;
                return React.default.createElement(
                  module12.TouchableWithoutFeedback,
                  {
                    key: n.key,
                    testID: _,
                    accessibilityLabel: L,
                    onPress: function () {
                      return w
                        ? w({
                            previousScene: x,
                            scene: v,
                            jumpToIndex: c,
                            defaultHandler: t._handleTabPress,
                          })
                        : t._handleTabPress(o);
                    },
                  },
                  React.default.createElement(
                    module12.Animated.View,
                    {
                      style: [
                        I.tab,
                        {
                          backgroundColor: C,
                        },
                      ],
                    },
                    React.default.createElement(
                      module12.View,
                      {
                        style: [I.tab, t._shouldUseHorizontalTabs() ? I.tabLandscape : I.tabPortrait, P],
                      },
                      t._renderIcon(v),
                      t._renderLabel(v)
                    )
                  )
                );
              })
            )
          );
        },
      },
    ]);
    return x;
  })(React.default.PureComponent);

C.defaultProps = {
  activeTintColor: '#3478f6',
  activeBackgroundColor: 'transparent',
  inactiveTintColor: '#929292',
  inactiveBackgroundColor: 'transparent',
  showLabel: true,
  showIcon: true,
  allowFontScaling: true,
  adaptive: O,
};
var I = module12.StyleSheet.create({
    tabBar: {
      backgroundColor: '#F7F7F7',
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
      alignItems: x ? 'center' : 'stretch',
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
      fontSize: 10,
      marginBottom: 1.5,
    },
    labelBeside: {
      fontSize: 13,
      marginLeft: 20,
    },
  }),
  S = module936.withOrientation(C);
exports.default = S;
