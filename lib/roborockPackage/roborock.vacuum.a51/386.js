var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module50 = require('./50'),
  React = require('react'),
  module13 = require('./13'),
  module387 = require('./387'),
  module391 = require('./391');

function b() {
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

function v(t, n) {
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

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      v(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      v(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

var O = module13.StyleSheet.create({
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  topButtonWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  topButtonText: {
    fontSize: 13,
    paddingTop: 14,
    textAlign: 'center',
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  redPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: -2,
  },
});

function W(t) {
  var c = t.hasImage,
    v = t.hasText,
    W = t.imagePosition,
    x = (function (t) {
      return P(
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          left: {
            flexDirection: 'row',
            backgroundColor: 'white',
          },
          right: {
            flexDirection: 'row-reverse',
            backgroundColor: 'white',
          },
          top: {
            backgroundColor: 'transparent',
          },
          pureText: {
            backgroundColor: 'white',
            alignSelf: 'stretch',
            alignSelf: 'stretch',
          },
        }[t] || {}
      );
    })(W),
    w = (function (t) {
      module9.default(T, t);

      var w = T,
        S = b(),
        A = function () {
          var t,
            n = module12.default(w);

          if (S) {
            var o = module12.default(this).constructor;
            t = Reflect.construct(n, arguments, o);
          } else t = n.apply(this, arguments);

          return module11.default(this, t);
        };

      function T(t) {
        var n;
        module6.default(this, T);
        (n = A.call(this, t)).initWithProps(t);
        n.isAnimating = false;
        n.state = {
          enabled: undefined == t.enabled || t.enabled,
        };
        return n;
      }

      module7.default(T, [
        {
          key: 'initWithProps',
          value: function (t) {
            this.originalImageWidth = t.imageWidth || 40;
            this.originalImageHeight = t.imageHeight || 40;
            this.animatedImageWidth = new module13.Animated.Value(this.originalImageWidth);
            this.minImageWidth = 0.8 * this.originalImageWidth;
            this.minImageHeight = 0.8 * this.originalImageHeight;
            this.animatedImageOpacity = new module13.Animated.Value(1);
          },
        },
        {
          key: 'UNSAFE_componentWillReceiveProps',
          value: function (t) {
            this.initWithProps(t);
            if (t.enabled !== this.props.enabled)
              this.setState({
                enabled: undefined == t.enabled || t.enabled,
              });
          },
        },
        {
          key: 'render',
          value: function () {
            var t = this,
              o = this.props,
              s = o.selected,
              l = o.selectedImage,
              u = o.image,
              h = o.imageStyle,
              b = o.imageWrapperStyle,
              w = o.underlayColor,
              S = o.style,
              A = o.hitSlop,
              T = o.justifyContent,
              C = o.textColor,
              j = o.selectedTextColor,
              B = o.fontSize,
              k = o.textTop,
              L = o.textLeft,
              R = o.fontWeight,
              D = o.numberOfLines,
              E = o.shouldShowShadow,
              V = o.maxTextWidth,
              H = o.shouldShowRedPoint,
              _ = o.funcId,
              N = o.textStyle,
              z = o.redPointStyle,
              q = o.logParams,
              F = o.accessibilityLabel,
              M = s ? l : u,
              U = (s ? j : C) || 'rgba(0,0,0,0.8)',
              G = 'top' == W ? k || 14 : 0,
              J = 'left' == W ? L || 14 : 0,
              K = 0 === D ? D : D || 2,
              Q = this.state.enabled ? 1 : 0.5,
              X = this.animatedImageWidth.interpolate({
                inputRange: [this.minImageWidth, this.originalImageWidth],
                outputRange: [this.minImageHeight, this.originalImageHeight],
              }),
              Y = null,
              Z = _ || 'time_key_' + new Date().getTime();

            if (v && this.props.title) {
              var $ = E
                ? {
                    textShadowColor: 'rgba(0,0,0,0.15)',
                    textShadowRadius: 0.6,
                    textShadowOffset: {
                      width: 0.5,
                      height: 0.5,
                    },
                  }
                : {};
              Y = React.default.createElement(
                module13.Text,
                {
                  numberOfLines: K,
                  style: [
                    P(
                      {
                        textAlign: 'center',
                        opacity: Q,
                        paddingLeft: J,
                        paddingTop: G,
                        fontSize: B,
                        fontWeight: R,
                        color: U,
                        alignSelf: 'center',
                        maxWidth: V || 2e3,
                      },
                      $
                    ),
                    N,
                  ],
                },
                this.props.title
              );
            }

            return React.default.createElement(
              module13.TouchableOpacity,
              module22.default(
                {
                  activeOpacity: this.state.enabled ? 0.6 : 1,
                  style: [
                    x,
                    {
                      justifyContent: T || 'center',
                    },
                    S,
                  ],
                  onPress: function () {
                    if (t.state.enabled) {
                      if (t.props.onPress) t.props.onPress();
                      if (t.props.eventName) module387.LogEventStat(t.props.eventName);
                      if (_) module387.LogEventCommon(_, null != q ? q : {});
                    }
                  },
                  onLayout: this.props.onLayout || null,
                  underlayColor: w || 'transparent',
                },
                module391.default.getAccessibilityLabel(Z, F),
                {
                  hitSlop: A,
                }
              ),
              c &&
                React.default.createElement(
                  module13.View,
                  {
                    style: [
                      O.imageWrap,
                      {
                        opacity: Q,
                        width: this.originalImageWidth,
                        height: this.originalImageHeight,
                      },
                      b,
                    ],
                  },
                  React.default.createElement(module13.Animated.Image, {
                    source: M,
                    style: [
                      {
                        opacity: this.animatedImageOpacity,
                        width: this.animatedImageWidth,
                        height: X,
                      },
                      h,
                    ],
                  }),
                  H &&
                    React.default.createElement(module13.View, {
                      style: [O.redPoint, P({}, z)],
                    })
                ),
              Y
            );
          },
        },
        {
          key: 'setEnabled',
          value: function (t) {
            this.setState({
              enabled: t,
            });
          },
        },
        {
          key: 'onPressSelf',
          value: function () {
            if (!this.isAnimating) this.props.onPress && this.props.onPress();
          },
        },
        {
          key: 'startAnimation',
          value: function () {
            this.isAnimating = true;
            var t = module13.Animated.timing(this.animatedImageWidth, {
                toValue: this.minImageWidth,
                duration: 600,
              }),
              n = module13.Animated.timing(this.animatedImageWidth, {
                toValue: this.originalImageWidth,
                duration: 600,
              }),
              o = module13.Animated.sequence([t, n]);
            this.animation = module13.Animated.loop(o, {
              iterations: -1,
            });
            this.animation.start();
          },
        },
        {
          key: 'endAnimation',
          value: function () {
            var t = this;
            this.animation.stop();
            setTimeout(function () {
              t.animatedImageWidth.setValue(t.originalImageWidth);
            }, 100);
          },
        },
        {
          key: 'startOpacityAnim',
          value: function () {
            this.isAnimating = true;
            var t = module13.Animated.timing(this.animatedImageOpacity, {
                toValue: 0.5,
                duration: 500,
              }),
              n = module13.Animated.timing(this.animatedImageOpacity, {
                toValue: 1,
                duration: 500,
              }),
              o = module13.Animated.sequence([t, n]);
            this.opaAnimation = module13.Animated.loop(o, {
              useNativeDriver: true,
              isInteraction: false,
            });
            this.opaAnimation.start();
          },
        },
        {
          key: 'endOpacityAnim',
          value: function () {
            var t = this;

            if (this.opaAnimation) {
              this.opaAnimation.stop();
              setTimeout(function () {
                t.animatedImageOpacity.setValue(1);
              }, 100);
            }
          },
        },
      ]);
      return T;
    })(React.default.PureComponent);

  w.displayName = t.name || 'Button';
  return w;
}

var x = W({
  name: 'LeftImageButton',
  hasImage: true,
  hasText: true,
  imagePosition: 'left',
});
exports.LeftImageButton = x;
var w = W({
  name: 'RightImageButton',
  hasImage: true,
  hasText: true,
  imagePosition: 'right',
});
exports.RightImageButton = w;
var S = W({
  name: 'PureImageButton',
  hasImage: true,
  hasText: false,
});
exports.PureImageButton = S;
var A = W({
  name: 'PureButton',
  hasImage: false,
  hasText: true,
  imagePosition: 'pureText',
});
exports.PureButton = A;
var T = W({
  name: 'TopImageButton',
  hasImage: true,
  hasText: true,
  imagePosition: 'top',
});
exports.TopImageButton = T;
