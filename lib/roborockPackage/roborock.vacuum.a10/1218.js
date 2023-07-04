var module21 = require('./21'),
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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, s, c);
        else l[s] = t[s];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module506 = require('./506');

require('prop-types');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
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

var y = (function (t) {
  module7.default(R, t);

  var module506 = R,
    v = V(),
    y = function () {
      var t,
        n = module11.default(module506);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R(t) {
    var n;
    module4.default(this, R);

    (n = y.call(this, t)).onStartShouldSetPanResponder = function (t, o) {
      var l = t.nativeEvent.locationX;
      t.nativeEvent.locationY;
      return n.isPressCircle(l);
    };

    n.onMoveShouldSetPanResponder = function (t, o) {
      var l = t.nativeEvent.locationX;
      t.nativeEvent.locationY;
      return n.isPressCircle(l);
    };

    n.onPanResponderGrant = function (t, n) {};

    n.onPanResponderMove = function (t, o) {
      var l = t.nativeEvent.locationX;
      n.setState({
        textValue: n.caculateValue(l),
      });
      if (n.props.onSlidingMove) n.props.onSlidingMove(n.caculateValue(l));
    };

    n.onPanResponderRelease = function (t, o) {
      var l = t.nativeEvent.locationX;
      if (n.props.onSlidingComplete) n.props.onSlidingComplete(n.caculateValue(l));
    };

    n.onPanResponderTerminationRequest = function (t, n) {
      return false;
    };

    n.onPanResponderTerminate = function (t, n) {};

    n.state = {
      textValue: t.value,
    };
    return n;
  }

  module5.default(R, [
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        this.setState({
          textValue: t.value,
        });
      },
    },
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {
        this._panResponder = module12.PanResponder.create({
          onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
          onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
          onPanResponderGrant: this.onPanResponderGrant,
          onPanResponderMove: this.onPanResponderMove,
          onPanResponderRelease: this.onPanResponderRelease,
          onPanResponderTerminationRequest: this.onPanResponderTerminationRequest,
          onPanResponderTerminate: this.onPanResponderTerminate,
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.context.theme.fatSlider,
          o = this.props,
          l = o.sliderWidth,
          u = o.sliderHeight,
          s = o.cicleMargin,
          c = o.enabled,
          f = o.shouldShowSideValue,
          v = o.circleValue,
          V = u / 2,
          y = u - 2 * s,
          R = y / 2;
        return React.default.createElement(
          module12.View,
          {
            style: [
              x.container,
              {
                opacity: c ? 1 : 0.5,
                width: l,
                height: u,
                borderRadius: V,
                backgroundColor: t.backgroundColor,
              },
              this.props.style,
            ],
          },
          React.default.createElement(module12.View, {
            style: [
              x.secondaryView,
              {
                width: this.textValue2CurX(this.state.textValue) + u,
                height: u,
                borderRadius: V,
              },
            ],
          }),
          React.default.createElement(
            module12.View,
            {
              style: [
                x.maxTextView,
                {
                  height: u,
                },
              ],
            },
            f &&
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    x.maxTextStyle,
                    {
                      color: t.textColor,
                    },
                  ],
                },
                this.props.maximumValue
              )
          ),
          React.default.createElement(
            module12.View,
            {
              style: [
                x.circleView,
                {
                  left: this.textValue2CurX(this.state.textValue),
                  width: u,
                  height: u,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  x.circle,
                  {
                    width: y,
                    height: y,
                    borderRadius: R,
                  },
                ],
              },
              this.props.shouldShowValue &&
                React.default.createElement(
                  module12.Text,
                  {
                    style: x.circleText,
                  },
                  undefined == v ? this.state.textValue : v
                )
            )
          ),
          React.default.createElement(
            module12.View,
            {
              style: [
                x.minTextView,
                {
                  height: u,
                },
              ],
            },
            f &&
              React.default.createElement(
                module12.Text,
                {
                  style: x.minTextStyle,
                },
                this.props.minimumValue
              )
          ),
          c &&
            React.default.createElement(
              module12.View,
              module21.default({}, this._panResponder.panHandlers, {
                style: x.touchArea,
              })
            )
        );
      },
    },
    {
      key: 'textValue2CurX',
      value: function (t) {
        if (t > this.props.maximumValue) t = this.props.maximumValue;
        if (t < this.props.minimumValue) t = this.props.minimumValue;
        return this.caculateX(t);
      },
    },
    {
      key: 'caculateX',
      value: function (t) {
        var n = this.props.sliderWidth - this.props.sliderHeight,
          o = (t - this.props.minimumValue) / (this.props.maximumValue - this.props.minimumValue);
        return parseInt(n * o);
      },
    },
    {
      key: 'isPressCircle',
      value: function (t) {
        return t >= this.textValue2CurX(this.state.textValue) && t <= this.textValue2CurX(this.state.textValue) + this.props.sliderHeight;
      },
    },
    {
      key: 'caculateValue',
      value: function (t) {
        var n = this.props,
          o = n.sliderWidth,
          l = n.sliderHeight,
          u = n.minimumValue,
          s = n.maximumValue,
          c = n.step,
          p = l / 2,
          h = (s - u) / c,
          f = 0;
        f = t - p < 0 ? 0 : t + p > o ? o - l : t - p;
        var v = this.props.sliderWidth - this.props.sliderHeight;
        return Math.ceil((f / v) * h) * c + u;
      },
    },
  ]);
  return R;
})(React.PureComponent);

exports.default = y;
y.contextType = module506.AppConfigContext;
y.defaultProps = {
  value: 0,
  minimumValue: 0,
  maximumValue: 50,
  step: 1,
  sliderHeight: 40,
  sliderWidth: module12.Dimensions.get('window').width - 40,
  shouldShowValue: false,
  shouldShowSideValue: true,
  cicleMargin: 4,
  enabled: true,
};
var x = module12.StyleSheet.create({
  container: {},
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  secondaryView: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#3384ff',
  },
  circleView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 14,
    color: '#3384ff',
  },
  minTextView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    top: 0,
    left: 0,
  },
  minTextStyle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  maxTextView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    right: 0,
    top: 0,
  },
  maxTextStyle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.3)',
  },
});
