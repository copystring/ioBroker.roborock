require('prop-types');

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1200 = require('./1200'),
  module391 = require('./391');

function x() {
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

var y = (function (t) {
  module9.default(S, t);

  var n = S,
    module1200 = x(),
    y = function () {
      var t,
        o = module12.default(n);

      if (module1200) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function S(t) {
    var n;
    module6.default(this, S);

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

  module7.default(S, [
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
        this._panResponder = module13.PanResponder.create({
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
          n = this.props,
          l = n.sliderWidth,
          s = n.sliderHeight,
          u = n.cicleMargin,
          c = n.enabled,
          p = n.shouldShowSideValue,
          v = n.circleValue,
          x = n.touchBallKey,
          y = s / 2,
          S = s - 2 * u,
          P = S / 2;
        return React.default.createElement(
          module13.View,
          {
            style: [
              R.container,
              {
                opacity: c ? 1 : 0.5,
                width: l,
                height: s,
                borderRadius: y,
                backgroundColor: t.backgroundColor,
              },
              this.props.style,
            ],
          },
          React.default.createElement(module13.View, {
            style: [
              R.secondaryView,
              {
                width: this.textValue2CurX(this.state.textValue) + s,
                height: s,
                borderRadius: y,
              },
            ],
          }),
          React.default.createElement(
            module13.View,
            {
              style: [
                R.maxTextView,
                {
                  height: s,
                },
              ],
            },
            p &&
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    R.maxTextStyle,
                    {
                      color: t.textColor,
                    },
                  ],
                },
                this.props.maximumValue
              )
          ),
          React.default.createElement(
            module13.View,
            module22.default({}, module391.default.getAccessibilityLabel(x || 'touchBall_x'), {
              style: [
                R.circleView,
                {
                  left: this.textValue2CurX(this.state.textValue),
                  width: s,
                  height: s,
                },
              ],
            }),
            React.default.createElement(
              module13.View,
              {
                style: [
                  R.circle,
                  {
                    width: S,
                    height: S,
                    borderRadius: P,
                  },
                ],
              },
              this.props.shouldShowValue &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: R.circleText,
                  },
                  undefined == v ? this.state.textValue : v
                )
            )
          ),
          React.default.createElement(
            module13.View,
            {
              style: [
                R.minTextView,
                {
                  height: s,
                },
              ],
            },
            p &&
              React.default.createElement(
                module13.Text,
                {
                  style: R.minTextStyle,
                },
                this.props.minimumValue
              )
          ),
          c &&
            React.default.createElement(
              module13.View,
              module22.default({}, this._panResponder.panHandlers, {
                style: R.touchArea,
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
          s = n.minimumValue,
          u = n.maximumValue,
          c = n.step,
          p = l / 2,
          h = (u - s) / c,
          f = 0;
        f = t - p < 0 ? 0 : t + p > o ? o - l : t - p;
        var v = this.props.sliderWidth - this.props.sliderHeight;
        return Math.ceil((f / v) * h) * c + s;
      },
    },
  ]);
  return S;
})(React.PureComponent);

exports.default = y;
y.contextType = module1200.AppConfigContext;
y.defaultProps = {
  value: 0,
  minimumValue: 0,
  maximumValue: 50,
  step: 1,
  sliderHeight: 40,
  sliderWidth: module13.Dimensions.get('window').width - 40,
  shouldShowValue: false,
  shouldShowSideValue: true,
  cicleMargin: 4,
  enabled: true,
};
var R = module13.StyleSheet.create({
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
