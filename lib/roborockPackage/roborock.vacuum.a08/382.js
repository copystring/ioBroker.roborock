var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module49 = require('./49'),
  React = require('react'),
  module12 = require('./12'),
  module383 = require('./383'),
  module387 = require('./387');

function I() {
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
        module49.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      v(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

var W = module12.StyleSheet.create({
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

function x(t) {
  var c = t.hasImage,
    v = t.hasText,
    x = t.imagePosition,
    w = (function (t) {
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
    })(x),
    S = (function (t) {
      module7.default(B, t);

      var S = B,
        O = I(),
        T = function () {
          var t,
            n = module11.default(S);

          if (O) {
            var o = module11.default(this).constructor;
            t = Reflect.construct(n, arguments, o);
          } else t = n.apply(this, arguments);

          return module9.default(this, t);
        };

      function B(t) {
        var n;
        module4.default(this, B);
        (n = T.call(this, t)).initWithProps(t);
        n.isAnimating = false;
        n.state = {
          enabled: undefined == t.enabled || t.enabled,
        };
        return n;
      }

      module5.default(B, [
        {
          key: 'initWithProps',
          value: function (t) {
            this.originalImageWidth = t.imageWidth || 40;
            this.originalImageHeight = t.imageHeight || 40;
            this.animatedImageWidth = new module12.Animated.Value(this.originalImageWidth);
            this.minImageWidth = 0.8 * this.originalImageWidth;
            this.minImageHeight = 0.8 * this.originalImageHeight;
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
              I = o.underlayColor,
              S = o.style,
              O = o.hitSlop,
              T = o.justifyContent,
              B = o.textColor,
              C = o.selectedTextColor,
              j = o.fontSize,
              k = o.textTop,
              A = o.textLeft,
              L = o.fontWeight,
              R = o.numberOfLines,
              E = o.shouldShowShadow,
              D = o.maxTextWidth,
              H = o.shouldShowRedPoint,
              _ = o.funcId,
              V = o.textStyle,
              N = o.redPointStyle,
              z = o.logParams,
              q = o.accessibilityLabel,
              F = s ? l : u,
              M = (s ? C : B) || 'rgba(0,0,0,0.8)',
              U = 'top' == x ? k || 14 : 0,
              G = 'left' == x ? A || 14 : 0,
              J = undefined === R ? 2 : R,
              K = this.state.enabled ? 1 : 0.5,
              Q = this.animatedImageWidth.interpolate({
                inputRange: [this.minImageWidth, this.originalImageWidth],
                outputRange: [this.minImageHeight, this.originalImageHeight],
              }),
              X = null,
              Y = _ || 'time_key_' + new Date().getTime();

            if (v && this.props.title) {
              var Z = E
                ? {
                    textShadowColor: 'rgba(0,0,0,0.15)',
                    textShadowRadius: 0.6,
                    textShadowOffset: {
                      width: 0.5,
                      height: 0.5,
                    },
                  }
                : {};
              X = React.default.createElement(
                module12.Text,
                {
                  numberOfLines: J,
                  style: [
                    P(
                      {
                        textAlign: 'center',
                        opacity: K,
                        paddingLeft: G,
                        paddingTop: U,
                        fontSize: j,
                        fontWeight: L,
                        color: M,
                        alignSelf: 'center',
                        maxWidth: D || 2e3,
                      },
                      Z
                    ),
                    V,
                  ],
                },
                this.props.title
              );
            }

            return React.default.createElement(
              module12.TouchableOpacity,
              module21.default(
                {
                  activeOpacity: this.state.enabled ? 0.6 : 1,
                  style: [
                    w,
                    {
                      justifyContent: T || 'center',
                    },
                    S,
                  ],
                  onPress: function () {
                    if (t.state.enabled) {
                      if (t.props.onPress) t.props.onPress();
                      if (t.props.eventName) module383.LogEventStat(t.props.eventName);
                      if (_) module383.LogEventCommon(_, null != z ? z : {});
                    }
                  },
                  onLayout: this.props.onLayout || null,
                  underlayColor: I || 'transparent',
                },
                module387.default.getAccessibilityLabel(Y, q),
                {
                  hitSlop: O,
                }
              ),
              c &&
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      W.imageWrap,
                      {
                        opacity: K,
                        width: this.originalImageWidth,
                        height: this.originalImageHeight,
                      },
                    ],
                  },
                  React.default.createElement(module12.Animated.Image, {
                    source: F,
                    style: [
                      {
                        width: this.animatedImageWidth,
                        height: Q,
                      },
                      h,
                    ],
                  }),
                  H &&
                    React.default.createElement(module12.View, {
                      style: [W.redPoint, P({}, N)],
                    })
                ),
              X
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
            var t = module12.Animated.timing(this.animatedImageWidth, {
                toValue: this.minImageWidth,
                duration: 600,
              }),
              n = module12.Animated.timing(this.animatedImageWidth, {
                toValue: this.originalImageWidth,
                duration: 600,
              }),
              o = module12.Animated.sequence([t, n]);
            this.animation = module12.Animated.loop(o, {
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
      ]);
      return B;
    })(React.default.PureComponent);

  S.displayName = t.name || 'Button';
  return S;
}

var w = x({
  name: 'LeftImageButton',
  hasImage: true,
  hasText: true,
  imagePosition: 'left',
});
exports.LeftImageButton = w;
var S = x({
  name: 'RightImageButton',
  hasImage: true,
  hasText: true,
  imagePosition: 'right',
});
exports.RightImageButton = S;
var O = x({
  name: 'PureImageButton',
  hasImage: true,
  hasText: false,
});
exports.PureImageButton = O;
var T = x({
  name: 'PureButton',
  hasImage: false,
  hasText: true,
  imagePosition: 'pureText',
});
exports.PureButton = T;
var B = x({
  name: 'TopImageButton',
  hasImage: true,
  hasText: true,
  imagePosition: 'top',
});
exports.TopImageButton = B;
