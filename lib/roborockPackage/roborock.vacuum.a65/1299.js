var module50 = require('./50'),
  module31 = require('@babel/runtime/helpers/toConsumableArray'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module1300 = require('./1300'),
  module1294 = require('./1294');

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
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      S(Object(l), true).forEach(function (n) {
        module50.default(t, n, l[n]);
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var O = Boolean(module13.NativeModules.NativeAnimatedModule),
  P = (function (t) {
    module9.default(v, t);

    var n = v,
      module50 = T(),
      b = function () {
        var t,
          l = module12.default(n);

        if (module50) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(l, arguments, s);
        } else t = l.apply(this, arguments);

        return module11.default(this, t);
      };

    function v(t) {
      var n;
      module6.default(this, v);
      (n = b.call(this, t))._isIntial = true;
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
              module13.Animated.Text,
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
          c = module13.Animated.multiply(
            module13.Animated.multiply(
              l.interpolate({
                inputRange: [0, s.routes.length - 1],
                outputRange: [0, s.routes.length - 1],
                extrapolate: 'clamp',
              }),
              o
            ),
            module13.I18nManager.isRTL ? -1 : 1
          );
        return React.createElement(module13.Animated.View, {
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
          s = module13.StyleSheet.flatten(l);
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
        n._pendingIndex = t.index;
        n.props.jumpTo(t.route.key);
        if (n.props.onTabPress) n.props.onTabPress(t);
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

      n._setRef = function (t) {
        return (n._scrollView = t && t._component);
      };

      var o = 1;
      if (n.props.scrollEnabled) n._getTabWidth(n.props) || (o = 0);
      var l =
        n.props.scrollEnabled && n.props.layout.width
          ? {
              x: n._getScrollAmount(n.props, n.props.navigationState.index),
              y: 0,
            }
          : undefined;
      n.state = {
        visibility: new module13.Animated.Value(o),
        scrollAmount: new module13.Animated.Value(0),
        initialOffset: l,
      };
      return n;
    }

    module7.default(v, [
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
            o = this._getTabWidth(this.props);

          if (n !== o && o) this.state.visibility.setValue(1);

          if (!((t.navigationState === this.props.navigationState && t.layout === this.props.layout && n === o) || this.props.navigationState.index === this._pendingIndex)) {
            this._resetScroll(this.props.navigationState.index, Boolean(t.layout.width));

            this._pendingIndex = null;
          }
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
            o = n.position,
            s = n.navigationState,
            c = n.scrollEnabled,
            u = n.bounces,
            p = s.routes,
            f = s.index,
            b = this._getTabWidth(this.props),
            v = b * p.length,
            S = [-1].concat(
              module31.default(
                p.map(function (t, n) {
                  return n;
                })
              )
            ),
            T = module13.Animated.multiply(this.state.scrollAmount, -1);

          return React.createElement(
            module13.Animated.View,
            {
              style: [x.tabBar, this.props.style],
            },
            React.createElement(
              module13.Animated.View,
              {
                pointerEvents: 'none',
                style: [
                  x.indicatorContainer,
                  c
                    ? {
                        width: v,
                        transform: [
                          {
                            translateX: T,
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
              module13.View,
              {
                style: x.scroll,
              },
              React.createElement(
                module13.Animated.ScrollView,
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
                  onScroll: module13.Animated.event(
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
                  ref: this._setRef,
                },
                p.map(function (n, l) {
                  var s = f === l,
                    u = S.map(function (t) {
                      return t === l ? 1 : 0.7;
                    }),
                    p = module13.Animated.multiply(
                      t.state.visibility,
                      o.interpolate({
                        inputRange: S,
                        outputRange: u,
                      })
                    ),
                    v = {
                      route: n,
                      focused: s,
                      index: l,
                    },
                    w = t._renderLabel(v),
                    T = t.props.renderIcon ? t.props.renderIcon(v) : null,
                    O = t.props.renderBadge ? t.props.renderBadge(v) : null,
                    P = {};

                  P.opacity = p;
                  if (T) w ? (P.paddingTop = 8) : (P.padding = 12);
                  var E = module13.StyleSheet.flatten(t.props.tabStyle),
                    A = (E && undefined !== E.width) || true === c,
                    I = {};
                  if (A) P.width = b;
                  if (E && 'number' == typeof E.flex) I.flex = E.flex;
                  else if (!A) I.flex = 1;
                  var M = n.accessibilityLabel || n.title;
                  return React.createElement(
                    module1300.default,
                    {
                      borderless: true,
                      key: n.key,
                      testID: n.testID,
                      accessible: n.accessible,
                      accessibilityLabel: M,
                      accessibilityTraits: 'button',
                      pressColor: t.props.pressColor,
                      pressOpacity: t.props.pressOpacity,
                      delayPressIn: 0,
                      onPress: function () {
                        return t._handleTabPress(v);
                      },
                      style: I,
                    },
                    React.createElement(
                      module13.View,
                      {
                        pointerEvents: 'none',
                        style: x.container,
                      },
                      React.createElement(
                        module13.Animated.View,
                        {
                          style: [x.tabItem, P, E, x.container],
                        },
                        T,
                        w
                      ),
                      O
                        ? React.createElement(
                            module13.Animated.View,
                            {
                              style: [
                                x.badge,
                                {
                                  opacity: t.state.visibility,
                                },
                              ],
                            },
                            O
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
    return v;
  })(React.Component);

exports.default = P;
P.propTypes = w(
  w({}, module1294.SceneRendererPropType),
  {},
  {
    scrollEnabled: PropTypes.default.bool,
    bounces: PropTypes.default.bool,
    pressColor: module1300.default.propTypes.pressColor,
    pressOpacity: module1300.default.propTypes.pressOpacity,
    getLabelText: PropTypes.default.func,
    renderIcon: PropTypes.default.func,
    renderLabel: PropTypes.default.func,
    renderIndicator: PropTypes.default.func,
    onTabPress: PropTypes.default.func,
    labelStyle: PropTypes.default.any,
    style: PropTypes.default.any,
  }
);
P.defaultProps = {
  getLabelText: function (t) {
    var n = t.route;
    return 'string' == typeof n.title ? n.title.toUpperCase() : n.title;
  },
};
var x = module13.StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    overflow: 'web' === module13.Platform.OS ? 'auto' : 'scroll',
  },
  tabBar: {
    backgroundColor: '#2196f3',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: module13.StyleSheet.hairlineWidth,
    shadowOffset: {
      height: module13.StyleSheet.hairlineWidth,
    },
    zIndex: 'android' === module13.Platform.OS ? 0 : 1,
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
