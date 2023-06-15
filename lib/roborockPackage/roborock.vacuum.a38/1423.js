var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1025 = require('./1025'),
  module1424 = require('./1424'),
  module391 = require('./391');

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

var PropTypes = require('prop-types'),
  module1425 = (function (t) {
    module7.default(R, t);

    var PropTypes = R,
      module1425 = v(),
      P = function () {
        var t,
          n = module11.default(PropTypes);

        if (module1425) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = P.call(this, t)).state = {
        bubbleWidth: n.props.bubbleWidth || 0,
        bubbleHeight: n.props.bubbleHeight || 0,
      };
      n.arrowImage = require('./1425');
      return n;
    }

    module5.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponderBubble = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return false;
            },
            onPanResponderStart: function (t, n) {},
            onStartShouldSetPanResponderCapture: function () {
              return true;
            },
            onPanResponderEnd: function (n, o) {
              if (t.props.onPressBubble) t.props.onPressBubble();
            },
            onPanResponderMove: function (t, n) {},
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (t, n) {
          var o;
          if (!(null == (o = this.LottieView))) o.play();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props.funcId || 'time_key_' + new Date().getTime();
          if (!this.props.center.x || !this.props.center.y) return null;
          var s = this.props.center.x * this.props.transform.xx,
            l = this.props.center.y * this.props.transform.yy;
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: 'box-none',
              style: {
                position: 'absolute',
                left: s - this.state.bubbleWidth / 2,
                top: l - this.state.bubbleHeight - this.props.topOffset,
                width: this.state.bubbleWidth,
                height: 2 * this.state.bubbleHeight,
                transform: [
                  {
                    rotateZ: -1 * this.props.mapDeg + 'deg',
                  },
                  {
                    translateX: 0,
                  },
                ],
              },
            },
            React.default.createElement(
              module12.Animated.View,
              module22.default({}, module391.default.getAccessibilityLabel(o), this.panResponderBubble.panHandlers, {
                style: {
                  top: 0,
                  left: 0,
                  height: this.state.bubbleHeight,
                  opacity: this.props.animatedOpacity,
                },
              }),
              React.default.createElement(
                module1424.Bubble,
                {
                  style: x.bubbleStyle,
                  onLayout: function (n) {
                    t.setState({
                      bubbleWidth: n.nativeEvent.layout.width,
                      bubbleHeight: n.nativeEvent.layout.height,
                    });
                    if (t.props.onBubbleLayout) t.props.onBubbleLayout(n.nativeEvent.layout, s);
                  },
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: x.imageStyle,
                  },
                  React.default.createElement(module12.Image, {
                    resizeMethod: 'auto',
                    style: x.imageStyle,
                    source: this.props.objectImage,
                  }),
                  this.props.objectLottie &&
                    React.default.createElement(module1025.default, {
                      ref: function (n) {
                        return (t.LottieView = n);
                      },
                      style: x.lottieStyle,
                      source: this.props.objectLottie,
                    })
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      x.textStyles,
                      {
                        width: this.state.textWidth,
                      },
                    ],
                    numberOfLines: 1,
                  },
                  ' ',
                  this.props.objectName,
                  ' '
                ),
                this.props.hasArrow &&
                  React.default.createElement(module12.Image, {
                    resizeMethod: 'auto',
                    style: x.arrowStyle,
                    source: this.arrowImage,
                  })
              )
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  x.textStyles,
                  {
                    position: 'absolute',
                    opacity: 0,
                  },
                ],
                numberOfLines: 1,
                onLayout: function (n) {
                  t.setState({
                    textWidth: n.nativeEvent.width,
                  });
                },
              },
              ' ',
              this.props.objectName,
              ' '
            )
          );
        },
      },
    ]);
    return R;
  })(React.default.PureComponent);

exports.default = module1425;
module1425.defaultProps = {
  hasArrow: true,
  topOffset: 0,
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
};
module1425.propTypes = {
  center: PropTypes.object,
  topOffset: PropTypes.number,
  transform: PropTypes.object,
  objectImage: PropTypes.number,
  objectName: PropTypes.string,
  onPressBubble: PropTypes.func,
  onBubbleLayout: PropTypes.func,
};
var x = module12.StyleSheet.create({
  imageStyle: {
    width: module391.default.scaledPixel(30),
    height: module391.default.scaledPixel(30),
  },
  lottieStyle: {
    position: 'absolute',
    width: module391.default.scaledPixel(30),
    height: module391.default.scaledPixel(30),
  },
  textStyles: {
    fontSize: 14,
    color: '#4A4A4A',
    marginLeft: 3,
  },
  arrowStyle: {
    marginLeft: -3,
    width: 18,
    height: 18,
    transform: [
      {
        rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
      },
    ],
    tintColor: '#9B9B9B',
  },
  bubbleStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 1,
    paddingRight: 8,
    paddingVertical: 1,
  },
});
