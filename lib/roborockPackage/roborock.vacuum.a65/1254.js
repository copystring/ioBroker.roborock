var module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1218 = require('./1218'),
  module1255 = require('./1255'),
  module1256 = require('./1256'),
  module1259 = require('./1259'),
  module1260 = require('./1260');

function C(t, n) {
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

function _(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      C(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      C(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
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

var x,
  L = 'ios' === module13.Platform.OS ? 44 : 56,
  B = 'ios' === module13.Platform.OS ? 20 : 0,
  O = 'ios' === module13.Platform.OS ? 70 : 56,
  I = 'ios' === module13.Platform.OS ? 20 : 56,
  P = function (t, n, o, l) {
    if ('left' === t) {
      var s = {
        left: I,
        right: I,
      };
      if (!o) s.left = 0;
      if (!l) s.right = 0;
      return s;
    }

    if ('center' === t) {
      var u = {
        left: O,
        right: O,
      };

      if (!(o || l)) {
        u.left = 0;
        u.right = 0;
      }

      return u;
    }
  },
  E = function (t) {
    return 'ios' === module13.Platform.OS ? (t && !module13.Platform.isPad ? 32 : 44) : 56;
  },
  module1262 = (function (t, ...args) {
    module9.default(O, t);

    var module1260 = O,
      C = T(),
      x = function () {
        var t,
          n = module12.default(module1260);

        if (C) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function O() {
      var t;
      module6.default(this, O);
      (t = x.call(this, ...args)).state = {
        widths: {},
      };

      t._renderTitleComponent = function (n) {
        var o = t.props.layoutPreset,
          s = n.scene.descriptor.options,
          u = s.headerTitle;
        if (React.default.isValidElement(u)) return u;

        var c = t._getHeaderTitleString(n.scene),
          f = s.headerTitleStyle,
          p = s.headerTintColor,
          y = s.headerTitleAllowFontScaling,
          v =
            'center' === o
              ? function (o) {
                  t.setState({
                    widths: _(_({}, t.state.widths), {}, module50.default({}, n.scene.key, o.nativeEvent.layout.width)),
                  });
                }
              : undefined,
          b = u && 'string' != typeof u ? u : module1255.default;

        return React.default.createElement(
          b,
          {
            onLayout: v,
            allowFontScaling: null == y || y,
            style: [
              p
                ? {
                    color: p,
                  }
                : null,
              'center' === o
                ? {
                    textAlign: 'center',
                  }
                : {
                    textAlign: 'left',
                  },
              f,
            ],
          },
          c
        );
      };

      t._renderLeftComponent = function (n) {
        var o = n.scene.descriptor.options;
        if (React.default.isValidElement(o.headerLeft) || null === o.headerLeft) return o.headerLeft;

        if (o.headerLeft || 0 !== n.scene.index) {
          var l = t._getBackButtonTitleString(n.scene),
            s = t._getTruncatedBackButtonTitle(n.scene),
            u = t.state.widths[n.scene.key] ? (t.props.layout.initWidth - t.state.widths[n.scene.key]) / 2 : undefined,
            c = o.headerLeft || module1256.default;

          return React.default.createElement(c, {
            onPress: function () {
              requestAnimationFrame(function () {
                n.scene.descriptor.navigation.goBack(n.scene.descriptor.key);
              });
            },
            pressColorAndroid: o.headerPressColorAndroid,
            tintColor: o.headerTintColor,
            backImage: o.headerBackImage,
            title: l,
            truncatedTitle: s,
            backTitleVisible: t.props.backTitleVisible,
            titleStyle: o.headerBackTitleStyle,
            layoutPreset: t.props.layoutPreset,
            width: u,
          });
        }
      };

      t._renderModularLeftComponent = function (n, o, l) {
        var s = n.scene.descriptor,
          u = s.options,
          c = s.navigation,
          f = t._getBackButtonTitleString(n.scene),
          p = t._getTruncatedBackButtonTitle(n.scene),
          y = t.state.widths[n.scene.key] ? (t.props.layout.initWidth - t.state.widths[n.scene.key]) / 2 : undefined;

        return React.default.createElement(module1259.default, {
          onPress: function () {
            requestAnimationFrame(function () {
              c.goBack(n.scene.descriptor.key);
            });
          },
          ButtonContainerComponent: o,
          LabelContainerComponent: l,
          pressColorAndroid: u.headerPressColorAndroid,
          tintColor: u.headerTintColor,
          backImage: u.headerBackImage,
          title: f,
          truncatedTitle: p,
          titleStyle: u.headerBackTitleStyle,
          width: y,
        });
      };

      t._renderRightComponent = function (t) {
        return t.scene.descriptor.options.headerRight || null;
      };

      return t;
    }

    module7.default(
      O,
      [
        {
          key: '_getHeaderTitleString',
          value: function (t) {
            var n = t.descriptor.options;
            if ('string' == typeof n.headerTitle) return n.headerTitle;
            else {
              if (n.title) n.title;
              return n.title;
            }
          },
        },
        {
          key: '_getLastScene',
          value: function (t) {
            return this.props.scenes.find(function (n) {
              return n.index === t.index - 1;
            });
          },
        },
        {
          key: '_getBackButtonTitleString',
          value: function (t) {
            var n = this._getLastScene(t);

            if (!n) return null;
            var o = n.descriptor.options.headerBackTitle;
            return o || null === o ? o : this._getHeaderTitleString(n);
          },
        },
        {
          key: '_getTruncatedBackButtonTitle',
          value: function (t) {
            var n = this._getLastScene(t);

            return n ? n.descriptor.options.headerTruncatedBackTitle : null;
          },
        },
        {
          key: '_renderLeft',
          value: function (t) {
            var n = t.scene.descriptor.options,
              o = this.props.transitionPreset,
              l = t.style;
            if (n.headerLeftContainerStyle) l = [l, n.headerLeftContainerStyle];
            return 'uikit' !== o || n.headerBackImage || n.headerLeft || null === n.headerLeft
              ? this._renderSubView(
                  _(
                    _({}, t),
                    {},
                    {
                      style: l,
                    }
                  ),
                  'left',
                  this._renderLeftComponent,
                  this.props.leftInterpolator
                )
              : this._renderModularSubView(
                  _(
                    _({}, t),
                    {},
                    {
                      style: l,
                    }
                  ),
                  'left',
                  this._renderModularLeftComponent,
                  this.props.leftLabelInterpolator,
                  this.props.leftButtonInterpolator
                );
          },
        },
        {
          key: '_renderTitle',
          value: function (t, n) {
            var o = this.props,
              l = o.layoutPreset,
              s = o.transitionPreset,
              u = [
                {
                  justifyContent: 'center' === l ? 'center' : 'flex-start',
                },
                P(l, 0, n.hasLeftComponent, n.hasRightComponent),
                n.headerTitleContainerStyle,
              ];
            return this._renderSubView(
              _(
                _({}, t),
                {},
                {
                  style: u,
                }
              ),
              'title',
              this._renderTitleComponent,
              'uikit' === s ? this.props.titleFromLeftInterpolator : this.props.titleInterpolator
            );
          },
        },
        {
          key: '_renderRight',
          value: function (t) {
            var n = t.scene.descriptor.options,
              o = t.style;
            if (n.headerRightContainerStyle) o = [o, n.headerRightContainerStyle];
            return this._renderSubView(
              _(
                _({}, t),
                {},
                {
                  style: o,
                }
              ),
              'right',
              this._renderRightComponent,
              this.props.rightInterpolator
            );
          },
        },
        {
          key: '_renderBackground',
          value: function (t) {
            var n = t.scene,
              o = n.index,
              l = n.descriptor.options,
              s = this.props.navigation.state.index - o;
            return Math.abs(s) > 2
              ? null
              : this._renderSubView(
                  _(
                    _({}, t),
                    {},
                    {
                      style: module13.StyleSheet.absoluteFill,
                    }
                  ),
                  'background',
                  function () {
                    return l.headerBackground;
                  },
                  this.props.backgroundInterpolator
                );
          },
        },
        {
          key: '_renderModularSubView',
          value: function (t, n, o, l, s) {
            var u = this,
              c = t.scene,
              f = c.index,
              p = c.isStale,
              v = c.key;

            if (0 !== f) {
              var k = this.props.navigation.state.index - f;
              if (Math.abs(k) > 2) return null;
              var b = o(
                t,
                function (n) {
                  var o = n.children;
                  return React.default.createElement(
                    module13.Animated.View,
                    {
                      style: [s(_(_({}, u.props), t))],
                    },
                    o
                  );
                },
                function (n) {
                  var o = n.children;
                  return React.default.createElement(
                    module13.Animated.View,
                    {
                      style: [l(_(_({}, u.props), t))],
                    },
                    o
                  );
                }
              );
              if (null === b) return b;
              var S = 0 !== k || p ? 'none' : 'box-none';
              return React.default.createElement(
                module13.View,
                {
                  key: n + '_' + v,
                  pointerEvents: S,
                  style: [R.item, R[n], t.style],
                },
                b
              );
            }
          },
        },
        {
          key: '_renderSubView',
          value: function (t, n, o, l) {
            var s = t.scene,
              u = s.index,
              c = s.isStale,
              f = s.key,
              p = this.props.navigation.state.index - u;
            if (Math.abs(p) > 2) return null;
            var v = o(t);
            if (null == v) return null;
            var k = 0 !== p || c ? 'none' : 'box-none';
            return React.default.createElement(
              module13.Animated.View,
              {
                pointerEvents: k,
                key: n + '_' + f,
                style: [R.item, R[n], t.style, l(_(_({}, this.props), t))],
              },
              v
            );
          },
        },
        {
          key: '_renderHeader',
          value: function (t) {
            var n = t.scene.descriptor.options;
            if (null === n.header) return null;

            var l = this._renderLeft(t),
              s = this._renderRight(t),
              u = this._renderTitle(t, {
                hasLeftComponent: !!l,
                hasRightComponent: !!s,
                headerTitleContainerStyle: n.headerTitleContainerStyle,
              }),
              c = this.props.transitionPreset,
              f = {
                style: R.header,
                key: 'scene_' + t.scene.key,
              };

            return n.headerLeft || n.headerBackImage || 'ios' !== module13.Platform.OS || 'uikit' !== c
              ? React.default.createElement(module13.View, f, u, l, s)
              : React.default.createElement(
                  module13.MaskedViewIOS,
                  module22.default({}, f, {
                    maskElement: React.default.createElement(
                      module13.View,
                      {
                        style: R.iconMaskContainer,
                      },
                      React.default.createElement(module13.Image, {
                        source: require('./1262'),
                        style: R.iconMask,
                      }),
                      React.default.createElement(module13.View, {
                        style: R.iconMaskFillerRect,
                      })
                    ),
                  }),
                  u,
                  l,
                  s
                );
          },
        },
        {
          key: 'render',
          value: function () {
            var t,
              o,
              l = this,
              s = this.props,
              u = s.mode,
              c = s.scene,
              f = s.isLandscape;

            if ('float' === u) {
              var p = {};
              this.props.scenes.forEach(function (t) {
                p[t.index] = t;
              });
              var k = Object.values(p).map(function (t) {
                return {
                  position: l.props.position,
                  progress: l.props.progress,
                  scene: t,
                };
              });
              t = k.map(this._renderHeader, this);
              o = k.map(this._renderBackground, this);
            } else {
              var b = {
                position: new module13.Animated.Value(this.props.scene.index),
                progress: new module13.Animated.Value(0),
                scene: this.props.scene,
              };
              t = this._renderHeader(b);
              o = this._renderBackground(b);
            }

            var S = c.descriptor.options,
              w = S.headerStyle,
              C = undefined === w ? {} : w,
              _ = module13.StyleSheet.flatten(C),
              T = E(f),
              x = module56.default(_, [
                'alignItems',
                'justifyContent',
                'flex',
                'flexDirection',
                'flexGrow',
                'flexShrink',
                'flexBasis',
                'flexWrap',
                'position',
                'padding',
                'paddingHorizontal',
                'paddingRight',
                'paddingLeft',
                'top',
                'right',
                'bottom',
                'left',
              ]),
              L = [
                S.headerTransparent ? R.transparentContainer : R.container,
                {
                  height: T,
                },
                x,
              ],
              B = S.headerForceInset || {
                top: 'always',
                bottom: 'never',
              };

            return React.default.createElement(
              module13.Animated.View,
              {
                style: [
                  this.props.layoutInterpolator(this.props),
                  'ios' !== module13.Platform.OS || S.headerTransparent
                    ? null
                    : {
                        backgroundColor: x.backgroundColor || A,
                      },
                ],
              },
              React.default.createElement(
                module1218.SafeAreaView,
                {
                  forceInset: B,
                  style: L,
                },
                o,
                React.default.createElement(
                  module13.View,
                  {
                    style: R.flexOne,
                  },
                  t
                )
              )
            );
          },
        },
      ],
      [
        {
          key: 'HEIGHT',
          get: function () {
            return L + B;
          },
        },
      ]
    );
    return O;
  })(React.default.PureComponent);

module1262.defaultProps = {
  layoutInterpolator: module1260.default.forLayout,
  leftInterpolator: module1260.default.forLeft,
  leftButtonInterpolator: module1260.default.forLeftButton,
  leftLabelInterpolator: module1260.default.forLeftLabel,
  titleFromLeftInterpolator: module1260.default.forCenterFromLeft,
  titleInterpolator: module1260.default.forCenter,
  rightInterpolator: module1260.default.forRight,
  backgroundInterpolator: module1260.default.forBackground,
};
x =
  'ios' === module13.Platform.OS
    ? {
        borderBottomWidth: module13.StyleSheet.hairlineWidth,
        borderBottomColor: '#A7A7AA',
      }
    : {
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: module13.StyleSheet.hairlineWidth,
        shadowOffset: {
          height: module13.StyleSheet.hairlineWidth,
        },
        elevation: 4,
      };
var A = '#FFF',
  R = module13.StyleSheet.create({
    container: _(
      {
        backgroundColor: A,
      },
      x
    ),
    transparentContainer: _(
      _(
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        },
        x
      ),
      {},
      {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        elevation: 0,
      }
    ),
    header: _(
      _({}, module13.StyleSheet.absoluteFillObject),
      {},
      {
        flexDirection: 'row',
      }
    ),
    item: {
      backgroundColor: 'transparent',
    },
    iconMaskContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    iconMaskFillerRect: {
      flex: 1,
      backgroundColor: '#d8d8d8',
      marginLeft: -3,
    },
    iconMask: {
      height: 21,
      width: 12,
      marginLeft: 9,
      marginTop: -0.5,
      alignSelf: 'center',
      resizeMode: 'contain',
      transform: [
        {
          scaleX: module13.I18nManager.isRTL ? -1 : 1,
        },
      ],
    },
    title: {
      bottom: 0,
      top: 0,
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row',
    },
    left: {
      left: 0,
      bottom: 0,
      top: 0,
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row',
    },
    right: {
      right: 0,
      bottom: 0,
      top: 0,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexOne: {
      flex: 1,
    },
  }),
  j = module1218.withOrientation(module1262);
exports.default = j;
