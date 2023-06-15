var module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module22 = require('./22'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  PropTypes = require('prop-types');

function _(t, n) {
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

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      _(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      _(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function v() {
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

function w(t, n, u, o) {
  this.x = t;
  this.y = n;
  this.width = u;
  this.height = o;
}

w.prototype.containsPoint = function (t, n) {
  return t >= this.x && n >= this.y && t <= this.x + this.width && n <= this.y + this.height;
};

var V = {
    spring: {
      friction: 7,
      tension: 100,
    },
    timing: {
      duration: 150,
      easing: module13.Easing.inOut(module13.Easing.ease),
      delay: 0,
    },
  },
  C = (function (t, ...args) {
    module9.default(_, t);

    var n = _,
      module50 = v(),
      S = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function _() {
      var t;
      module6.default(this, _);
      (t = S.call(this, ...args)).state = {
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
        value: new module13.Animated.Value(t.props.value),
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
          o = (t._previousLeft + (module13.I18nManager.isRTL ? -n.dx : n.dx)) / u;
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
          o = module22.default({}, V[u], t.props.animationConfig, {
            toValue: n,
          });
        module13.Animated[u](t.state.value, o).start();
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

        return new w(
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

        return React.default.createElement(module13.Animated.View, {
          style: [R.debugThumbTouchArea, o],
          pointerEvents: 'none',
        });
      };

      t._renderThumbImage = function () {
        var n = t.props.thumbImage;
        if (n)
          return React.default.createElement(module13.Image, {
            source: n,
          });
      };

      return t;
    }

    module7.default(_, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this._panResponder = module13.PanResponder.create({
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
            u = t.maximumValue,
            h = t.minimumTrackTintColor,
            s = t.maximumTrackTintColor,
            c = t.thumbTintColor,
            p = t.thumbDisabled,
            f = t.styles,
            S = t.style,
            _ = t.trackStyle,
            v = t.thumbStyle,
            w = t.debugTouchArea,
            V = module56.default(t, [
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
            ]),
            C = this.state,
            P = C.value,
            k = C.containerSize,
            z = C.thumbSize,
            x = C.allMeasured,
            A = f || R;
          if (p) z.width = 0;
          var E = P.interpolate({
              inputRange: [n, u],
              outputRange: [0, k.width - z.width],
            }),
            M = {};
          if (!x) M.opacity = 0;

          var O = y(
              {
                position: 'absolute',
                width: module13.Animated.add(E, z.width / 2),
                backgroundColor: h,
              },
              M
            ),
            j = this._getTouchOverflowStyle();

          return React.default.createElement(
            module13.View,
            module22.default({}, V, {
              style: [A.container, S],
              onLayout: this._measureContainer,
            }),
            React.default.createElement(module13.View, {
              style: [
                {
                  backgroundColor: s,
                },
                A.track,
                _,
              ],
              renderToHardwareTextureAndroid: true,
              onLayout: this._measureTrack,
            }),
            React.default.createElement(module13.Animated.View, {
              renderToHardwareTextureAndroid: true,
              style: [A.track, _, O],
            }),
            React.default.createElement(
              module13.Animated.View,
              {
                onLayout: this._measureThumb,
                renderToHardwareTextureAndroid: true,
                style: [
                  {
                    backgroundColor: c,
                  },
                  A.thumb,
                  v,
                  y(
                    {
                      transform: [
                        {
                          translateX: module13.I18nManager.isRTL ? module13.Animated.multiply(E, -1) : E,
                        },
                        {
                          translateY: 0,
                        },
                      ],
                    },
                    M
                  ),
                ],
              },
              this._renderThumbImage()
            ),
            React.default.createElement(
              module13.View,
              module22.default(
                {
                  renderToHardwareTextureAndroid: true,
                  style: [R.touchArea, j],
                },
                this._panResponder.panHandlers
              ),
              true === w && this._renderDebugThumbTouchRect(E)
            )
          );
        },
      },
      {
        key: '_getPropsForComponentUpdate',
        value: function (t) {
          return module56.default(t, ['value', 'onValueChange', 'onSlidingStart', 'onSlidingComplete', 'style', 'trackStyle', 'thumbStyle']);
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
    return _;
  })(React.PureComponent);

exports.default = C;
C.propTypes = {
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
  style: module13.ViewPropTypes.style,
  trackStyle: module13.ViewPropTypes.style,
  thumbStyle: module13.ViewPropTypes.style,
  thumbImage: module13.Image.propTypes.source,
  debugTouchArea: PropTypes.default.bool,
  animateTransitions: PropTypes.default.bool,
  animationType: PropTypes.default.oneOf(['spring', 'timing']),
  animationConfig: PropTypes.default.object,
};
C.defaultProps = {
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
var R = module13.StyleSheet.create({
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
