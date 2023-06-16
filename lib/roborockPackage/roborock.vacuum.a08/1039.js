var module49 = require('./49'),
  module30 = require('./30'),
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

    var o = _(n);

    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  PropTypes = require('prop-types'),
  module12 = require('./12'),
  module1040 = require('./1040'),
  module1041 = require('./1041');

function _(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (_ = function (t) {
    return t ? o : n;
  })(t);
}

function S(t, n) {
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
      S(Object(l), true).forEach(function (o) {
        module49.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      S(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
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

var O = Boolean(module12.NativeModules.NativeAnimatedModule),
  P = (function (t) {
    module7.default(_, t);

    var module49 = _,
      PropTypes = T(),
      v = function () {
        var t,
          o = module11.default(module49);

        if (PropTypes) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var n;
      module4.default(this, _);
      (n = v.call(this, t))._isIntial = true;
      n._isManualScroll = false;
      n._isMomentumScroll = false;

      n._startTrackingPosition = function () {
        n._offsetXListener = n.props.offsetX.addListener(function (t) {
          var o = t.value;
          n._lastOffsetX = o;

          n._handlePosition();
        });
        n._panXListener = n.props.panX.addListener(function (t) {
          var o = t.value;
          n._lastPanX = o;

          n._handlePosition();
        });
      };

      n._stopTrackingPosition = function () {
        n.props.offsetX.removeListener(n._offsetXListener);
        n.props.panX.removeListener(n._panXListener);
      };

      n._handlePosition = function () {
        var t = n.props,
          o = t.navigationState,
          l = t.layout;

        if (0 !== l.width) {
          var s = (('number' == typeof n._lastPanX ? n._lastPanX : 0) + ('number' == typeof n._lastOffsetX ? n._lastOffsetX : -o.index * l.width)) / -(l.width || 0.001);

          n._adjustScroll(s);
        }
      };

      n._renderLabel = function (t) {
        if (undefined !== n.props.renderLabel) return n.props.renderLabel(t);
        var o = n.props.getLabelText(t);
        return 'string' != typeof o
          ? null
          : React.createElement(
              module12.Animated.Text,
              {
                style: [x.tabLabel, n.props.labelStyle],
              },
              o
            );
      };

      n._renderIndicator = function (t) {
        if (undefined !== n.props.renderIndicator) return n.props.renderIndicator(t);
        var o = t.width,
          l = t.position,
          s = t.navigationState,
          c = module12.Animated.multiply(
            module12.Animated.multiply(
              l.interpolate({
                inputRange: [-1, s.routes.length],
                outputRange: [-1, s.routes.length],
                extrapolate: 'clamp',
              }),
              o
            ),
            module12.I18nManager.isRTL ? -1 : 1
          );
        return React.createElement(module12.Animated.View, {
          style: [
            x.indicator,
            {
              width: o,
              transform: [
                {
                  translateX: c,
                },
              ],
            },
            n.props.indicatorStyle,
          ],
        });
      };

      n._getTabWidth = function (t) {
        var n = t.layout,
          o = t.navigationState,
          l = t.tabStyle,
          s = module12.StyleSheet.flatten(l);
        if (s)
          switch (typeof s.width) {
            case 'number':
              return s.width;

            case 'string':
              if (s.width.endsWith('%')) {
                var c = parseFloat(s.width);
                if (Number.isFinite(c)) return n.width * (c / 100);
              }
          }
        return t.scrollEnabled ? (n.width / 5) * 2 : n.width / o.routes.length;
      };

      n._handleTabPress = function (t) {
        var o = t.route;
        n._pendingIndex = n.props.navigationState.routes.indexOf(o);
        if (n.props.onTabPress)
          n.props.onTabPress({
            route: o,
          });
        n.props.jumpTo(o.key);
      };

      n._handleTabLongPress = function (t) {
        var o = t.route;
        if (n.props.onTabLongPress)
          n.props.onTabLongPress({
            route: o,
          });
      };

      n._normalizeScrollValue = function (t, o) {
        var l = t.layout,
          s = t.navigationState,
          c = n._getTabWidth(t),
          u = (c * s.routes.length) ** l.width - l.width;

        return (o ** u) ** 0;
      };

      n._getScrollAmount = function (t, o) {
        var l = t.layout,
          s = n._getTabWidth(t) * (o + 0.5) - l.width / 2;
        return n._normalizeScrollValue(t, s);
      };

      n._adjustScroll = function (t) {
        if (n.props.scrollEnabled) {
          globals.cancelAnimationFrame(n._scrollResetCallback);
          if (n._scrollView)
            n._scrollView.scrollTo({
              x: n._normalizeScrollValue(n.props, n._getScrollAmount(n.props, t)),
              animated: !n._isIntial,
            });
          n._isIntial = false;
        }
      };

      n._resetScroll = function (t) {
        var o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1];

        if (n.props.scrollEnabled) {
          globals.cancelAnimationFrame(n._scrollResetCallback);
          n._scrollResetCallback = globals.requestAnimationFrame(function () {
            if (n._scrollView)
              n._scrollView.scrollTo({
                x: n._getScrollAmount(n.props, t),
                animated: o,
              });
          });
        }
      };

      n._handleBeginDrag = function () {
        n._isManualScroll = true;
        n._isMomentumScroll = false;
      };

      n._handleEndDrag = function () {
        globals.requestAnimationFrame(function () {
          if (!n._isMomentumScroll) n._isManualScroll = false;
        });
      };

      n._handleMomentumScrollBegin = function () {
        n._isMomentumScroll = true;
      };

      n._handleMomentumScrollEnd = function () {
        n._isMomentumScroll = false;
        n._isManualScroll = false;
      };

      var o = 1;
      if (n.props.scrollEnabled) n._getTabWidth(n.props) || (o = 0);
      var s =
        n.props.scrollEnabled && n.props.layout.width
          ? {
              x: n._getScrollAmount(n.props, n.props.navigationState.index),
              y: 0,
            }
          : undefined;
      n.state = {
        visibility: new module12.Animated.Value(o),
        scrollAmount: new module12.Animated.Value(0),
        initialOffset: s,
      };
      return n;
    }

    module5.default(_, [
      {
        key: 'componentDidMount',
        value: function () {
          if (this.props.scrollEnabled) this._startTrackingPosition();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t) {
          var n = this._getTabWidth(t),
            o = this._getTabWidth(this.props),
            l = 'number' == typeof this._pendingIndex ? this._pendingIndex : this.props.navigationState.index;

          this._pendingIndex = null;
          if (n !== o && o) this.state.visibility.setValue(1);
          if (t.navigationState.routes.length !== this.props.navigationState.routes.length || t.layout.width !== this.props.layout.width)
            this._resetScroll(this.props.navigationState.index, false);
          else if (t.navigationState.index !== l) this._resetScroll(this.props.navigationState.index);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this._stopTrackingPosition();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props,
            l = n.position,
            s = n.navigationState,
            c = n.scrollEnabled,
            u = n.bounces,
            p = s.routes,
            b = this._getTabWidth(this.props),
            v = b * p.length,
            _ = [-1].concat(
              module30.default(
                p.map(function (t, n) {
                  return n;
                })
              )
            ),
            S = module12.Animated.multiply(this.state.scrollAmount, -1);

          return React.createElement(
            module12.Animated.View,
            {
              style: [x.tabBar, this.props.style],
            },
            React.createElement(
              module12.Animated.View,
              {
                pointerEvents: 'none',
                style: [
                  x.indicatorContainer,
                  c
                    ? {
                        width: v,
                        transform: [
                          {
                            translateX: S,
                          },
                        ],
                      }
                    : null,
                ],
              },
              this._renderIndicator(
                w(
                  w({}, this.props),
                  {},
                  {
                    width: b,
                  }
                )
              )
            ),
            React.createElement(
              module12.View,
              {
                style: x.scroll,
              },
              React.createElement(
                module12.Animated.ScrollView,
                {
                  horizontal: true,
                  keyboardShouldPersistTaps: 'handled',
                  scrollEnabled: c,
                  bounces: u,
                  alwaysBounceHorizontal: false,
                  scrollsToTop: false,
                  showsHorizontalScrollIndicator: false,
                  automaticallyAdjustContentInsets: false,
                  overScrollMode: 'never',
                  contentContainerStyle: [x.tabContent, c ? null : x.container],
                  scrollEventThrottle: 1,
                  onScroll: module12.Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: {
                            x: this.state.scrollAmount,
                          },
                        },
                      },
                    ],
                    {
                      useNativeDriver: O,
                    }
                  ),
                  onScrollBeginDrag: this._handleBeginDrag,
                  onScrollEndDrag: this._handleEndDrag,
                  onMomentumScrollBegin: this._handleMomentumScrollBegin,
                  onMomentumScrollEnd: this._handleMomentumScrollEnd,
                  contentOffset: this.state.initialOffset,
                  ref: function (n) {
                    return (t._scrollView = n && n.getNode());
                  },
                },
                p.map(function (n, o) {
                  var u = _.map(function (t) {
                      return t === o ? 1 : 0.7;
                    }),
                    p = module12.Animated.multiply(
                      t.state.visibility,
                      l.interpolate({
                        inputRange: _,
                        outputRange: u,
                      })
                    ),
                    v = t._renderLabel({
                      route: n,
                    }),
                    S = t.props.renderIcon
                      ? t.props.renderIcon({
                          route: n,
                        })
                      : null,
                    w = t.props.renderBadge
                      ? t.props.renderBadge({
                          route: n,
                        })
                      : null,
                    T = {};

                  T.opacity = p;
                  if (S) v ? (T.paddingTop = 8) : (T.padding = 12);
                  var O = module12.StyleSheet.flatten(t.props.tabStyle),
                    P = (O && undefined !== O.width) || true === c,
                    A = {};
                  if (P) T.width = b;
                  if (O && 'number' == typeof O.flex) A.flex = O.flex;
                  else if (!P) A.flex = 1;
                  var E = t.props.getAccessibilityLabel({
                    route: n,
                  });
                  E =
                    undefined !== E
                      ? E
                      : t.props.getLabelText({
                          route: n,
                        });
                  var L = o === s.index;
                  return React.createElement(
                    module1040.default,
                    {
                      borderless: true,
                      key: n.key,
                      testID: t.props.getTestID({
                        route: n,
                      }),
                      accessible: t.props.getAccessible({
                        route: n,
                      }),
                      accessibilityLabel: E,
                      accessibilityTraits: L ? ['button', 'selected'] : 'button',
                      accessibilityComponentType: 'button',
                      accessibilityRole: 'button',
                      accessibilityStates: L ? ['selected'] : [],
                      pressColor: t.props.pressColor,
                      pressOpacity: t.props.pressOpacity,
                      delayPressIn: 0,
                      onPress: function () {
                        return t._handleTabPress({
                          route: n,
                        });
                      },
                      onLongPress: function () {
                        return t._handleTabLongPress({
                          route: n,
                        });
                      },
                      style: A,
                    },
                    React.createElement(
                      module12.View,
                      {
                        pointerEvents: 'none',
                        style: x.container,
                      },
                      React.createElement(
                        module12.Animated.View,
                        {
                          style: [x.tabItem, T, O, x.container],
                        },
                        S,
                        v
                      ),
                      w
                        ? React.createElement(
                            module12.Animated.View,
                            {
                              style: [
                                x.badge,
                                {
                                  opacity: t.state.visibility,
                                },
                              ],
                            },
                            w
                          )
                        : null
                    )
                  );
                })
              )
            )
          );
        },
      },
    ]);
    return _;
  })(React.Component);

exports.default = P;
P.propTypes = w(
  w({}, module1041.SceneRendererPropType),
  {},
  {
    scrollEnabled: PropTypes.default.bool,
    bounces: PropTypes.default.bool,
    pressColor: module1040.default.propTypes.pressColor,
    pressOpacity: module1040.default.propTypes.pressOpacity,
    getLabelText: PropTypes.default.func,
    getAccessible: PropTypes.default.func,
    getAccessibilityLabel: PropTypes.default.func,
    getTestID: PropTypes.default.func,
    renderIcon: PropTypes.default.func,
    renderLabel: PropTypes.default.func,
    renderIndicator: PropTypes.default.func,
    onTabPress: PropTypes.default.func,
    onTabLongPress: PropTypes.default.func,
    labelStyle: PropTypes.default.any,
    style: PropTypes.default.any,
  }
);
P.defaultProps = {
  getLabelText: function (t) {
    var n = t.route;
    return 'string' == typeof n.title ? n.title.toUpperCase() : n.title;
  },
  getAccessible: function (t) {
    var n = t.route;
    return undefined === n.accessible || n.accessible;
  },
  getAccessibilityLabel: function (t) {
    return t.route.accessibilityLabel;
  },
  getTestID: function (t) {
    return t.route.testID;
  },
};
var x = module12.StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    overflow: 'web' === module12.Platform.OS ? 'auto' : 'scroll',
  },
  tabBar: {
    backgroundColor: '#2196f3',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: module12.StyleSheet.hairlineWidth,
    shadowOffset: {
      height: module12.StyleSheet.hairlineWidth,
    },
    zIndex: 'android' === module12.Platform.OS ? 0 : 1,
  },
  tabContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  tabLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    margin: 8,
  },
  tabItem: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
  },
});
