var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module971 = require('./971'),
  module12 = require('./12'),
  module938 = require('./938'),
  module972 = require('./972'),
  module974 = require('./974'),
  module977 = require('./977'),
  module986 = require('./986'),
  module988 = require('./988'),
  x = ['transitionProps'];

function R(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function V(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      R(Object(o), true).forEach(function (n) {
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      R(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function H() {
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

var I = function () {},
  T = module12.Dimensions.get('window'),
  w = T.width,
  E = T.height,
  C = !('ios' !== module12.Platform.OS || module12.Platform.isPad || module12.Platform.isTVOS || (812 !== E && 812 !== w)),
  M = module12.Easing.inOut(module12.Easing.ease),
  D = ['center', 'left'],
  j = ['uikit', 'fade-in-place'],
  G = 500,
  L = 0.5,
  B = 20,
  N = 25,
  A = 135,
  F = function (t) {
    if (t.__isNative && 0 === Object.keys(t._listeners).length) t.addListener(I);
  },
  q = function (t) {
    return 'ios' === module12.Platform.OS ? (t && !module12.Platform.isPad ? 32 : C ? 88 : 64) : 56;
  },
  z = (function (t) {
    module7.default(T, t);

    var module49 = T,
      R = H(),
      I = function () {
        var t,
          n = module11.default(module49);

        if (R) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var n;
      module4.default(this, T);
      (n = I.call(this, t))._gestureStartValue = 0;
      n._isResponding = false;
      n._immediateIndex = null;
      n._panResponder = module12.PanResponder.create({
        onPanResponderTerminate: function () {
          var t = n.props.transitionProps.navigation.state.index;
          n._isResponding = false;

          n._reset(t, 0);

          if (n.props.onGestureCanceled) n.props.onGestureCanceled();
        },
        onPanResponderGrant: function () {
          var t = n.props.transitionProps,
            o = t.navigation,
            s = t.position,
            p = t.scene;
          if (o.state.index !== p.index) return false;
          s.stopAnimation(function (t) {
            n._isResponding = true;
            n._gestureStartValue = t;
          });
          if (n.props.onGestureBegin) n.props.onGestureBegin();
        },
        onMoveShouldSetPanResponder: function (t, o) {
          var s = n.props,
            p = s.transitionProps,
            l = p.navigation,
            u = p.layout,
            c = p.scene,
            f = s.mode,
            h = l.state.index,
            v = 'modal' === f,
            y = c.descriptor.options,
            P = y.gestureDirection,
            b = 'string' == typeof P ? 'inverted' === P : module12.I18nManager.isRTL;
          if (h !== c.index) return false;
          var O = null == n._immediateIndex ? h : n._immediateIndex,
            S = o[v ? 'dy' : 'dx'],
            k = t.nativeEvent[v ? 'pageY' : 'pageX'],
            x = v ? u.height.__getValue() : u.width.__getValue(),
            R = !!x,
            V = b ? x - (k - S) : k - S,
            H = y.gestureResponseDistance,
            I = undefined === H ? {} : H;
          return !(V > (v ? I.vertical || A : I.horizontal || N)) && Math.abs(S) > B && R && !(0 === O);
        },
        onPanResponderMove: function (t, o) {
          var s = n.props,
            p = s.transitionProps,
            l = p.navigation,
            u = p.position,
            c = p.layout,
            f = p.scene,
            h = s.mode,
            y = l.state.index,
            P = 'modal' === h,
            b = f.descriptor.options.gestureDirection,
            O = 'string' == typeof b ? 'inverted' === b : module12.I18nManager.isRTL,
            S = n._gestureStartValue,
            k = P ? 'dy' : 'dx',
            x = P ? c.height.__getValue() : c.width.__getValue(),
            R = 'dx' === k && O ? S + o[k] / x : S - o[k] / x,
            V = module971.default(y - 1, R, y);
          u.setValue(V);
        },
        onPanResponderTerminationRequest: function () {
          return false;
        },
        onPanResponderRelease: function (t, o) {
          var s = n.props,
            p = s.transitionProps,
            l = p.navigation,
            u = p.position,
            c = p.layout,
            f = p.scene,
            h = s.mode,
            v = l.state.index,
            y = 'modal' === h,
            P = f.descriptor.options.gestureDirection,
            b = 'string' == typeof P ? 'inverted' === P : module12.I18nManager.isRTL;

          if (n._isResponding) {
            n._isResponding = false;
            var O = null == n._immediateIndex ? v : n._immediateIndex,
              S = y ? c.height.__getValue() : c.width.__getValue(),
              k = b ? -1 : 1,
              x = k * o[y ? 'dy' : 'dx'],
              R = k * o[y ? 'vy' : 'vx'],
              V = S / G,
              H = Math.abs(R) ** V,
              I = b ? (S - x) / H : x / H,
              T = b ? x / H : (S - x) / H;
            u.stopAnimation(function (t) {
              if (R < -0.5) {
                if (n.props.onGestureCanceled) n.props.onGestureCanceled();
                return void n._reset(O, I);
              } else if (R > 0.5) {
                if (n.props.onGestureFinish) n.props.onGestureFinish();
                return void n._goBack(O, T);
              } else
                return void (t <= v - L
                  ? (n.props.onGestureFinish && n.props.onGestureFinish(), n._goBack(O, T))
                  : (n.props.onGestureCanceled && n.props.onGestureCanceled(), n._reset(O, I)));
            });
          }
        },
      });

      n._onFloatingHeaderLayout = function (t) {
        n.setState({
          floatingHeaderHeight: t.nativeEvent.layout.height,
        });
      };

      n._getTransitionConfig = function () {
        var t = 'modal' === n.props.mode;
        return module986.default.getTransitionConfig(n.props.transitionConfig, n.props.transitionProps, n.props.lastTransitionProps, t);
      };

      n._renderCard = function (t) {
        var s = n._getTransitionConfig().screenInterpolator,
          p =
            s &&
            s(
              V(
                V({}, n.props.transitionProps),
                {},
                {
                  scene: t,
                }
              )
            ),
          l = t.descriptor.options,
          u = null !== l.header,
          c = n._getHeaderMode(),
          f = 0;

        if (u && 'float' === c && !l.headerTransparent) f = n.state.floatingHeaderHeight;
        return React.default.createElement(
          module974.default,
          module21.default({}, n.props.transitionProps, {
            key: 'card_' + t.key,
            style: [
              p,
              {
                paddingTop: f,
              },
              n.props.cardStyle,
            ],
            scene: t,
          }),
          n._renderInnerScene(t)
        );
      };

      n.state = {
        floatingHeaderHeight: q(t.isLandscape),
      };
      return n;
    }

    module5.default(T, [
      {
        key: '_renderHeader',
        value: function (t, o) {
          var s = t.descriptor.options.header;
          if (null === s && 'screen' === o) return null;
          if (React.default.isValidElement(s)) return s;

          var p =
              s ||
              function (t) {
                return React.default.createElement(module977.default, t);
              },
            l = this._getTransitionConfig(),
            u = l.headerLeftInterpolator,
            c = l.headerTitleInterpolator,
            f = l.headerRightInterpolator,
            v = l.headerBackgroundInterpolator,
            _ = this.props,
            P = _.transitionProps,
            b = module55.default(_, x);

          return React.default.createElement(
            module938.NavigationProvider,
            {
              value: t.descriptor.navigation,
            },
            p(
              V(
                V(V({}, b), P),
                {},
                {
                  scene: t,
                  mode: o,
                  transitionPreset: this._getHeaderTransitionPreset(),
                  layoutPreset: this._getHeaderLayoutPreset(),
                  backTitleVisible: this._getheaderBackTitleVisible(),
                  leftInterpolator: u,
                  titleInterpolator: c,
                  rightInterpolator: f,
                  backgroundInterpolator: v,
                }
              )
            )
          );
        },
      },
      {
        key: '_animatedSubscribe',
        value: function (t) {
          F(t.transitionProps.layout.width);
          F(t.transitionProps.layout.height);
          F(t.transitionProps.position);
        },
      },
      {
        key: '_reset',
        value: function (t, n) {
          if ('ios' === module12.Platform.OS && module988.supportsImprovedSpringAnimation())
            module12.Animated.spring(this.props.transitionProps.position, {
              toValue: t,
              stiffness: 5e3,
              damping: 600,
              mass: 3,
              useNativeDriver: this.props.transitionProps.position.__isNative,
            }).start();
          else
            module12.Animated.timing(this.props.transitionProps.position, {
              toValue: t,
              duration: n,
              easing: M,
              useNativeDriver: this.props.transitionProps.position.__isNative,
            }).start();
        },
      },
      {
        key: '_goBack',
        value: function (t, n) {
          var o = this,
            s = this.props.transitionProps,
            p = s.navigation,
            l = s.position,
            u = s.scenes,
            c = (t - 1) ** 0;
          this._immediateIndex = c;

          var f = function () {
            o._immediateIndex = null;
            var t = u.find(function (t) {
              return t.index === c + 1;
            });

            if (!o._isResponding && t) {
              p.dispatch(
                module938.NavigationActions.back({
                  key: t.route.key,
                  immediate: true,
                })
              );
              p.dispatch(module938.StackActions.completeTransition());
            }
          };

          if ('ios' === module12.Platform.OS && module988.supportsImprovedSpringAnimation())
            module12.Animated.spring(l, {
              toValue: c,
              stiffness: 5e3,
              damping: 600,
              mass: 3,
              useNativeDriver: l.__isNative,
            }).start(f);
          else
            module12.Animated.timing(l, {
              toValue: c,
              duration: n,
              easing: M,
              useNativeDriver: l.__isNative,
            }).start(f);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = null,
            s = this._getHeaderMode();

          if ('float' === s) {
            var p = this.props.transitionProps.scene;
            n = React.default.createElement(
              module12.View,
              {
                style: X.floatingHeader,
                pointerEvents: 'box-none',
                onLayout: this._onFloatingHeaderLayout,
              },
              this._renderHeader(p, s)
            );
          }

          var l = this.props.transitionProps,
            u = l.scene,
            c = l.scenes,
            f = u.descriptor.options,
            v = 'boolean' == typeof f.gesturesEnabled ? f.gesturesEnabled : 'ios' === module12.Platform.OS,
            y = v ? this._panResponder : null,
            b = v ? y.panHandlers : {},
            O = [X.container, this._getTransitionConfig().containerStyle];
          return React.default.createElement(
            module12.View,
            module21.default({}, b, {
              style: O,
            }),
            React.default.createElement(
              module972.ScreenContainer,
              {
                style: X.scenes,
              },
              c.map(function (n) {
                return t._renderCard(n);
              })
            ),
            n
          );
        },
      },
      {
        key: '_getHeaderMode',
        value: function () {
          return this.props.headerMode ? this.props.headerMode : 'android' === module12.Platform.OS || 'modal' === this.props.mode ? 'screen' : 'float';
        },
      },
      {
        key: '_getHeaderLayoutPreset',
        value: function () {
          var t = this.props.headerLayoutPreset;
          return t && D.includes(t) ? t : 'android' === module12.Platform.OS ? 'left' : 'center';
        },
      },
      {
        key: '_getHeaderTransitionPreset',
        value: function () {
          if ('android' === module12.Platform.OS || 'screen' === this._getHeaderMode()) return 'fade-in-place';
          var t = this.props.headerTransitionPreset;
          return t && j.includes(t) ? t : 'fade-in-place';
        },
      },
      {
        key: '_getheaderBackTitleVisible',
        value: function () {
          return this.props.headerBackTitleVisible;
        },
      },
      {
        key: '_renderInnerScene',
        value: function (t) {
          var n = t.descriptor,
            o = n.navigation,
            s = n.getComponent(),
            p = this.props.screenProps,
            l = this._getHeaderMode();

          return 'screen' === l
            ? React.default.createElement(
                module12.View,
                {
                  style: X.container,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: X.scenes,
                  },
                  React.default.createElement(module938.SceneView, {
                    screenProps: p,
                    navigation: o,
                    component: s,
                  })
                ),
                this._renderHeader(t, l)
              )
            : React.default.createElement(module938.SceneView, {
                screenProps: p,
                navigation: o,
                component: s,
              });
        },
      },
    ]);
    return T;
  })(React.default.Component),
  X = module12.StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    scenes: {
      flex: 1,
    },
    floatingHeader: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
    },
  }),
  Y = module938.withOrientation(z);

exports.default = Y;
