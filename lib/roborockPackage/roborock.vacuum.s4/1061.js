var module49 = require('./49'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module21 = require('./21'),
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

    var u = _(n);

    if (u && u.has(t)) return u.get(t);
    var o = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var h in t)
      if ('default' !== h && Object.prototype.hasOwnProperty.call(t, h)) {
        var s = l ? Object.getOwnPropertyDescriptor(t, h) : null;
        if (s && (s.get || s.set)) Object.defineProperty(o, h, s);
        else o[h] = t[h];
      }

    o.default = t;
    if (u) u.set(t, o);
    return o;
  })(require('react')),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  T = [
    'minimumValue',
    'maximumValue',
    'minimumTrackTintColor',
    'maximumTrackTintColor',
    'thumbTintColor',
    'thumbImage',
    'thumbDisabled',
    'styles',
    'style',
    'trackStyle',
    'thumbStyle',
    'debugTouchArea',
  ],
  S = ['value', 'onValueChange', 'onSlidingStart', 'onSlidingComplete', 'style', 'trackStyle', 'thumbStyle'];

function _(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (_ = function (t) {
    return t ? u : n;
  })(t);
}

function v(t, n) {
  var u = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    u.push.apply(u, o);
  }

  return u;
}

function w(t) {
  for (var u = 1; u < arguments.length; u++) {
    var o = null != arguments[u] ? arguments[u] : {};
    if (u % 2)
      v(Object(o), true).forEach(function (u) {
        module49.default(t, u, o[u]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      v(Object(o)).forEach(function (n) {
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

function C(t, n, u, o) {
  this.x = t;
  this.y = n;
  this.width = u;
  this.height = o;
}

C.prototype.containsPoint = function (t, n) {
  return t >= this.x && n >= this.y && t <= this.x + this.width && n <= this.y + this.height;
};

var R = {
    spring: {
      friction: 7,
      tension: 100,
    },
    timing: {
      duration: 150,
      easing: module12.Easing.inOut(module12.Easing.ease),
      delay: 0,
    },
  },
  P = (function (t, ...args) {
    module7.default(v, t);

    var module49 = v,
      PropTypes = V(),
      _ = function () {
        var t,
          u = module11.default(module49);

        if (PropTypes) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(u, arguments, o);
        } else t = u.apply(this, arguments);

        return module9.default(this, t);
      };

    function v() {
      var t;
      module4.default(this, v);
      (t = _.call(this, ...args)).state = {
        containerSize: {
          width: 0,
          height: 0,
        },
        trackSize: {
          width: 0,
          height: 0,
        },
        thumbSize: {
          width: 0,
          height: 0,
        },
        allMeasured: false,
        value: new module12.Animated.Value(t.props.value),
      };

      t._handleStartShouldSetPanResponder = function (n) {
        return t._thumbHitTest(n);
      };

      t._handlePanResponderGrant = function () {
        t._previousLeft = t._getThumbLeft(t._getCurrentValue());

        t._fireChangeEvent('onSlidingStart');
      };

      t._handlePanResponderMove = function (n, u) {
        if (!t.props.disabled) {
          t._setCurrentValue(t._getValue(u));

          t._fireChangeEvent('onValueChange');
        }
      };

      t._handlePanResponderEnd = function (n, u) {
        if (!t.props.disabled) {
          t._setCurrentValue(t._getValue(u));

          t._fireChangeEvent('onSlidingComplete');
        }
      };

      t._measureContainer = function (n) {
        t._handleMeasure('containerSize', n);
      };

      t._measureTrack = function (n) {
        t._handleMeasure('trackSize', n);
      };

      t._measureThumb = function (n) {
        t._handleMeasure('thumbSize', n);
      };

      t._handleMeasure = function (n, u) {
        var o = u.nativeEvent.layout,
          l = o.width,
          h = o.height,
          s = {
            width: l,
            height: h,
          },
          c = '_' + n,
          p = t[c];

        if (!(p && l === p.width && h === p.height)) {
          t[c] = s;
          if (t._containerSize && t._trackSize && t._thumbSize)
            t.setState({
              containerSize: t._containerSize,
              trackSize: t._trackSize,
              thumbSize: t._thumbSize,
              allMeasured: true,
            });
        }
      };

      t._getRatio = function (n) {
        return (n - t.props.minimumValue) / (t.props.maximumValue - t.props.minimumValue);
      };

      t._getThumbLeft = function (n) {
        return t._getRatio(n) * (t.state.containerSize.width - t.state.thumbSize.width);
      };

      t._getValue = function (n) {
        var u = t.state.containerSize.width - t.state.thumbSize.width,
          o = (t._previousLeft + (module12.I18nManager.isRTL ? -n.dx : n.dx)) / u;
        return t.props.step
          ? t.props.minimumValue ** (t.props.maximumValue ** (t.props.minimumValue + Math.round((o * (t.props.maximumValue - t.props.minimumValue)) / t.props.step) * t.props.step))
          : t.props.minimumValue ** (t.props.maximumValue ** (o * (t.props.maximumValue - t.props.minimumValue) + t.props.minimumValue));
      };

      t._getCurrentValue = function () {
        return t.state.value.__getValue();
      };

      t._setCurrentValue = function (n) {
        t.state.value.setValue(n);
      };

      t._setCurrentValueAnimated = function (n) {
        var u = t.props.animationType,
          l = module21.default({}, R[u], t.props.animationConfig, {
            toValue: n,
          });
        module12.Animated[u](t.state.value, l).start();
      };

      t._fireChangeEvent = function (n) {
        if (t.props[n]) t.props[n](t._getCurrentValue());
      };

      t._getTouchOverflowSize = function () {
        var n = t.state,
          u = t.props,
          o = {};

        if (true === n.allMeasured) {
          o.width = 0 ** (u.thumbTouchSize.width - n.thumbSize.width);
          o.height = 0 ** (u.thumbTouchSize.height - n.containerSize.height);
        }

        return o;
      };

      t._getTouchOverflowStyle = function () {
        var n = t._getTouchOverflowSize(),
          u = n.width,
          o = n.height,
          l = {};

        if (undefined !== u && undefined !== o) {
          var h = -o / 2;
          l.marginTop = h;
          l.marginBottom = h;
          var s = -u / 2;
          l.marginLeft = s;
          l.marginRight = s;
        }

        if (true === t.props.debugTouchArea) {
          l.backgroundColor = 'orange';
          l.opacity = 0.5;
        }

        return l;
      };

      t._thumbHitTest = function (n) {
        var u = n.nativeEvent;
        return t._getThumbTouchRect().containsPoint(u.locationX, u.locationY);
      };

      t._getThumbTouchRect = function () {
        var n = t.state,
          u = t.props,
          o = t._getTouchOverflowSize();

        return new C(
          o.width / 2 + t._getThumbLeft(t._getCurrentValue()) + (n.thumbSize.width - u.thumbTouchSize.width) / 2,
          o.height / 2 + (n.containerSize.height - u.thumbTouchSize.height) / 2,
          u.thumbTouchSize.width,
          u.thumbTouchSize.height
        );
      };

      t._renderDebugThumbTouchRect = function (n) {
        var u = t._getThumbTouchRect(),
          o = {
            left: n,
            top: u.y,
            width: u.width,
            height: u.height,
          };

        return React.default.createElement(module12.Animated.View, {
          style: [k.debugThumbTouchArea, o],
          pointerEvents: 'none',
        });
      };

      t._renderThumbImage = function () {
        var n = t.props.thumbImage;
        if (n)
          return React.default.createElement(module12.Image, {
            source: n,
          });
      };

      return t;
    }

    module5.default(v, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this._panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
          });
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          var n = t.value;
          if (this.props.value !== n) this.props.animateTransitions ? this._setCurrentValueAnimated(n) : this._setCurrentValue(n);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.minimumValue,
            l = t.maximumValue,
            h = t.minimumTrackTintColor,
            s = t.maximumTrackTintColor,
            c = t.thumbTintColor,
            p = t.thumbDisabled,
            y = t.styles,
            S = t.style,
            _ = t.trackStyle,
            v = t.thumbStyle,
            V = t.debugTouchArea,
            C = module55.default(t, T),
            R = this.state,
            P = R.value,
            z = R.containerSize,
            O = R.thumbSize,
            M = R.allMeasured,
            x = y || k;
          if (p) O.width = 0;
          var A = P.interpolate({
              inputRange: [n, l],
              outputRange: [0, z.width - O.width],
            }),
            E = {};
          if (!M) E.opacity = 0;

          var j = w(
              {
                position: 'absolute',
                width: module12.Animated.add(A, O.width / 2),
                backgroundColor: h,
              },
              E
            ),
            L = this._getTouchOverflowStyle();

          return React.default.createElement(
            module12.View,
            module21.default({}, C, {
              style: [x.container, S],
              onLayout: this._measureContainer,
            }),
            React.default.createElement(module12.View, {
              style: [
                {
                  backgroundColor: s,
                },
                x.track,
                _,
              ],
              renderToHardwareTextureAndroid: true,
              onLayout: this._measureTrack,
            }),
            React.default.createElement(module12.Animated.View, {
              renderToHardwareTextureAndroid: true,
              style: [x.track, _, j],
            }),
            React.default.createElement(
              module12.Animated.View,
              {
                onLayout: this._measureThumb,
                renderToHardwareTextureAndroid: true,
                style: [
                  {
                    backgroundColor: c,
                  },
                  x.thumb,
                  v,
                  w(
                    {
                      transform: [
                        {
                          translateX: module12.I18nManager.isRTL ? module12.Animated.multiply(A, -1) : A,
                        },
                        {
                          translateY: 0,
                        },
                      ],
                    },
                    E
                  ),
                ],
              },
              this._renderThumbImage()
            ),
            React.default.createElement(
              module12.View,
              module21.default(
                {
                  renderToHardwareTextureAndroid: true,
                  style: [k.touchArea, L],
                },
                this._panResponder.panHandlers
              ),
              true === V && this._renderDebugThumbTouchRect(A)
            )
          );
        },
      },
      {
        key: '_getPropsForComponentUpdate',
        value: function (t) {
          return module55.default(t, S);
        },
      },
      {
        key: '_handleMoveShouldSetPanResponder',
        value: function () {
          return true;
        },
      },
      {
        key: '_handlePanResponderRequestEnd',
        value: function (t, n) {
          return false;
        },
      },
    ]);
    return v;
  })(React.PureComponent);

exports.default = P;
P.propTypes = {
  value: PropTypes.default.number,
  disabled: PropTypes.default.bool,
  minimumValue: PropTypes.default.number,
  maximumValue: PropTypes.default.number,
  step: PropTypes.default.number,
  minimumTrackTintColor: PropTypes.default.string,
  maximumTrackTintColor: PropTypes.default.string,
  thumbTintColor: PropTypes.default.string,
  thumbTouchSize: PropTypes.default.shape({
    width: PropTypes.default.number,
    height: PropTypes.default.number,
  }),
  onValueChange: PropTypes.default.func,
  onSlidingStart: PropTypes.default.func,
  onSlidingComplete: PropTypes.default.func,
  style: module12.ViewPropTypes.style,
  trackStyle: module12.ViewPropTypes.style,
  thumbStyle: module12.ViewPropTypes.style,
  thumbImage: module12.Image.propTypes.source,
  debugTouchArea: PropTypes.default.bool,
  animateTransitions: PropTypes.default.bool,
  animationType: PropTypes.default.oneOf(['spring', 'timing']),
  animationConfig: PropTypes.default.object,
};
P.defaultProps = {
  value: 0,
  minimumValue: 0,
  maximumValue: 1,
  step: 0,
  minimumTrackTintColor: '#3f3f3f',
  maximumTrackTintColor: '#b3b3b3',
  thumbTintColor: '#343434',
  thumbTouchSize: {
    width: 40,
    height: 40,
  },
  debugTouchArea: false,
  animationType: 'timing',
};
var k = module12.StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
});
