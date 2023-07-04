var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module22 = require('./22'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1169 = require('./1169'),
  module12 = require('./12'),
  module1139 = require('./1139'),
  module1170 = require('./1170'),
  module1172 = require('./1172'),
  module1175 = require('./1175'),
  module1184 = require('./1184'),
  module1186 = require('./1186');

function x(t, n) {
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

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      x(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      x(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function V() {
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

var H = function () {},
  I = module12.Dimensions.get('window'),
  T = I.width,
  w = I.height,
  E = !('ios' !== module12.Platform.OS || module12.Platform.isPad || module12.Platform.isTVOS || (812 !== w && 812 !== T)),
  C = module12.Easing.inOut(module12.Easing.ease),
  M = ['center', 'left'],
  D = ['uikit', 'fade-in-place'],
  j = 500,
  G = 0.5,
  L = 20,
  N = 25,
  A = 135,
  B = function (t) {
    if (t.__isNative && 0 === Object.keys(t._listeners).length) t.addListener(H);
  },
  F = function (t) {
    return 'ios' === module12.Platform.OS ? (t && !module12.Platform.isPad ? 32 : E ? 88 : 64) : 56;
  },
  q = (function (t) {
    module7.default(I, t);

    var module50 = I,
      x = V(),
      H = function () {
        var t,
          n = module11.default(module50);

        if (x) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t) {
      var n;
      module4.default(this, I);
      (n = H.call(this, t))._gestureStartValue = 0;
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
            u = p.navigation,
            l = p.layout,
            c = p.scene,
            f = s.mode,
            h = u.state.index,
            v = 'modal' === f,
            y = c.descriptor.options,
            P = y.gestureDirection,
            b = 'string' == typeof P ? 'inverted' === P : module12.I18nManager.isRTL;
          if (h !== c.index) return false;
          var S = null == n._immediateIndex ? h : n._immediateIndex,
            O = o[v ? 'dy' : 'dx'],
            k = t.nativeEvent[v ? 'pageY' : 'pageX'],
            x = v ? l.height.__getValue() : l.width.__getValue(),
            R = !!x,
            V = b ? x - (k - O) : k - O,
            H = y.gestureResponseDistance,
            I = undefined === H ? {} : H;
          return !(V > (v ? I.vertical || A : I.horizontal || N)) && Math.abs(O) > L && R && !(0 === S);
        },
        onPanResponderMove: function (t, o) {
          var s = n.props,
            p = s.transitionProps,
            u = p.navigation,
            l = p.position,
            c = p.layout,
            f = p.scene,
            h = s.mode,
            y = u.state.index,
            P = 'modal' === h,
            b = f.descriptor.options.gestureDirection,
            S = 'string' == typeof b ? 'inverted' === b : module12.I18nManager.isRTL,
            O = n._gestureStartValue,
            k = P ? 'dy' : 'dx',
            x = P ? c.height.__getValue() : c.width.__getValue(),
            R = 'dx' === k && S ? O + o[k] / x : O - o[k] / x,
            V = module1169.default(y - 1, R, y);
          l.setValue(V);
        },
        onPanResponderTerminationRequest: function () {
          return false;
        },
        onPanResponderRelease: function (t, o) {
          var s = n.props,
            p = s.transitionProps,
            u = p.navigation,
            l = p.position,
            c = p.layout,
            f = p.scene,
            h = s.mode,
            v = u.state.index,
            y = 'modal' === h,
            P = f.descriptor.options.gestureDirection,
            b = 'string' == typeof P ? 'inverted' === P : module12.I18nManager.isRTL;

          if (n._isResponding) {
            n._isResponding = false;
            var S = null == n._immediateIndex ? v : n._immediateIndex,
              O = y ? c.height.__getValue() : c.width.__getValue(),
              k = b ? -1 : 1,
              x = k * o[y ? 'dy' : 'dx'],
              R = k * o[y ? 'vy' : 'vx'],
              V = O / j,
              H = Math.abs(R) ** V,
              I = b ? (O - x) / H : x / H,
              T = b ? x / H : (O - x) / H;
            l.stopAnimation(function (t) {
              if (R < -0.5) {
                if (n.props.onGestureCanceled) n.props.onGestureCanceled();
                return void n._reset(S, I);
              } else if (R > 0.5) {
                if (n.props.onGestureFinish) n.props.onGestureFinish();
                return void n._goBack(S, T);
              } else
                return void (t <= v - G
                  ? (n.props.onGestureFinish && n.props.onGestureFinish(), n._goBack(S, T))
                  : (n.props.onGestureCanceled && n.props.onGestureCanceled(), n._reset(S, I)));
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
        return module1184.default.getTransitionConfig(n.props.transitionConfig, n.props.transitionProps, n.props.lastTransitionProps, t);
      };

      n._renderCard = function (t) {
        var s = n._getTransitionConfig().screenInterpolator,
          p =
            s &&
            s(
              R(
                R({}, n.props.transitionProps),
                {},
                {
                  scene: t,
                }
              )
            ),
          u = t.descriptor.options,
          l = null !== u.header,
          c = n._getHeaderMode(),
          f = 0;

        if (l && 'float' === c && !u.headerTransparent) f = n.state.floatingHeaderHeight;
        return React.default.createElement(
          module1172.default,
          module22.default({}, n.props.transitionProps, {
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
        floatingHeaderHeight: F(t.isLandscape),
      };
      return n;
    }

    module5.default(I, [
      {
        key: '_renderHeader',
        value: function (t, o) {
          var s = t.descriptor.options.header;
          if (null === s && 'screen' === o) return null;
          if (React.default.isValidElement(s)) return s;

          var p =
              s ||
              function (t) {
                return React.default.createElement(module1175.default, t);
              },
            u = this._getTransitionConfig(),
            l = u.headerLeftInterpolator,
            c = u.headerTitleInterpolator,
            f = u.headerRightInterpolator,
            v = u.headerBackgroundInterpolator,
            _ = this.props,
            P = _.transitionProps,
            b = module56.default(_, ['transitionProps']);

          return React.default.createElement(
            module1139.NavigationProvider,
            {
              value: t.descriptor.navigation,
            },
            p(
              R(
                R(R({}, b), P),
                {},
                {
                  scene: t,
                  mode: o,
                  transitionPreset: this._getHeaderTransitionPreset(),
                  layoutPreset: this._getHeaderLayoutPreset(),
                  backTitleVisible: this._getheaderBackTitleVisible(),
                  leftInterpolator: l,
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
          B(t.transitionProps.layout.width);
          B(t.transitionProps.layout.height);
          B(t.transitionProps.position);
        },
      },
      {
        key: '_reset',
        value: function (t, n) {
          if ('ios' === module12.Platform.OS && module1186.supportsImprovedSpringAnimation())
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
              easing: C,
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
            u = s.position,
            l = s.scenes,
            c = (t - 1) ** 0;
          this._immediateIndex = c;

          var f = function () {
            o._immediateIndex = null;
            var t = l.find(function (t) {
              return t.index === c + 1;
            });

            if (!o._isResponding && t) {
              p.dispatch(
                module1139.NavigationActions.back({
                  key: t.route.key,
                  immediate: true,
                })
              );
              p.dispatch(module1139.StackActions.completeTransition());
            }
          };

          if ('ios' === module12.Platform.OS && module1186.supportsImprovedSpringAnimation())
            module12.Animated.spring(u, {
              toValue: c,
              stiffness: 5e3,
              damping: 600,
              mass: 3,
              useNativeDriver: u.__isNative,
            }).start(f);
          else
            module12.Animated.timing(u, {
              toValue: c,
              duration: n,
              easing: C,
              useNativeDriver: u.__isNative,
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
                style: z.floatingHeader,
                pointerEvents: 'box-none',
                onLayout: this._onFloatingHeaderLayout,
              },
              this._renderHeader(p, s)
            );
          }

          var u = this.props.transitionProps,
            l = u.scene,
            c = u.scenes,
            f = l.descriptor.options,
            v = 'boolean' == typeof f.gesturesEnabled ? f.gesturesEnabled : 'ios' === module12.Platform.OS,
            y = v ? this._panResponder : null,
            b = v ? y.panHandlers : {},
            S = [z.container, this._getTransitionConfig().containerStyle];
          return React.default.createElement(
            module12.View,
            module22.default({}, b, {
              style: S,
            }),
            React.default.createElement(
              module1170.ScreenContainer,
              {
                style: z.scenes,
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
          return t && M.includes(t) ? t : 'android' === module12.Platform.OS ? 'left' : 'center';
        },
      },
      {
        key: '_getHeaderTransitionPreset',
        value: function () {
          if ('android' === module12.Platform.OS || 'screen' === this._getHeaderMode()) return 'fade-in-place';
          var t = this.props.headerTransitionPreset;
          return t && D.includes(t) ? t : 'fade-in-place';
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
            u = this._getHeaderMode();

          return 'screen' === u
            ? React.default.createElement(
                module12.View,
                {
                  style: z.container,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: z.scenes,
                  },
                  React.default.createElement(module1139.SceneView, {
                    screenProps: p,
                    navigation: o,
                    component: s,
                  })
                ),
                this._renderHeader(t, u)
              )
            : React.default.createElement(module1139.SceneView, {
                screenProps: p,
                navigation: o,
                component: s,
              });
        },
      },
    ]);
    return I;
  })(React.default.Component),
  z = module12.StyleSheet.create({
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
  X = module1139.withOrientation(q);

exports.default = X;
