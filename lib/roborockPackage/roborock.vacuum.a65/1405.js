var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1204 = require('./1204'),
  module1406 = require('./1406'),
  module1408 = require('./1408'),
  module391 = require('./391');

function S() {
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
  module1412 = (function (t) {
    module9.default(E, t);

    var PropTypes = E,
      module1412 = S(),
      R = function () {
        var t,
          n = module12.default(PropTypes);

        if (module1412) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var n;
      module6.default(this, E);
      (n = R.call(this, t)).state = {
        bubbleWidth: n.props.bubbleWidth || 0,
        bubbleHeight: n.props.bubbleHeight || 0,
      };
      n.arrowImage = require('./1412');
      return n;
    }

    module7.default(E, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponderBubble = module13.PanResponder.create({
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
            o = this.props,
            s = o.funcId,
            l = o.imageStyle,
            u = s || 'time_key_' + new Date().getTime();
          if (!this.props.center.x || !this.props.center.y) return null;
          var p = this.props.center.x * this.props.transform.xx,
            S = this.props.center.y * this.props.transform.yy,
            w = React.default.createElement(module13.Image, {
              resizeMethod: 'auto',
              style: [P.imageStyle, l],
              source: this.props.objectImage,
            });
          return React.default.createElement(
            module13.View,
            {
              pointerEvents: 'box-none',
              style: {
                position: 'absolute',
                left: p - this.state.bubbleWidth / 2,
                top: S - this.state.bubbleHeight - this.props.topOffset,
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
              module13.Animated.View,
              module22.default({}, module391.default.getAccessibilityLabel(u), this.panResponderBubble.panHandlers, {
                style: {
                  top: 0,
                  left: 0,
                  height: this.state.bubbleHeight,
                  opacity: this.props.animatedOpacity,
                },
              }),
              React.default.createElement(
                module1408.Bubble,
                {
                  style: P.bubbleStyle,
                  onLayout: function (n) {
                    t.setState({
                      bubbleWidth: n.nativeEvent.layout.width,
                      bubbleHeight: n.nativeEvent.layout.height,
                    });
                    if (t.props.onBubbleLayout) t.props.onBubbleLayout(n.nativeEvent.layout, p);
                  },
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: P.imageView,
                  },
                  this.props.gardienConfig && React.default.createElement(module1406.default, this.props.gardienConfig, w),
                  !this.props.gardienConfig && w,
                  this.props.objectLottie &&
                    React.default.createElement(module1204.default, {
                      ref: function (n) {
                        return (t.LottieView = n);
                      },
                      style: P.lottieStyle,
                      source: this.props.objectLottie,
                    })
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      P.textStyles,
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
                  React.default.createElement(module13.Image, {
                    resizeMethod: 'auto',
                    style: P.arrowStyle,
                    source: this.arrowImage,
                  })
              )
            ),
            React.default.createElement(
              module13.Text,
              {
                style: [
                  P.textStyles,
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
    return E;
  })(React.default.PureComponent);

exports.default = module1412;
module1412.defaultProps = {
  hasArrow: true,
  topOffset: 0,
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  gardienConfig: null,
};
module1412.propTypes = {
  center: PropTypes.object,
  topOffset: PropTypes.number,
  transform: PropTypes.object,
  objectImage: PropTypes.number,
  objectName: PropTypes.string,
  onPressBubble: PropTypes.func,
  onBubbleLayout: PropTypes.func,
};
var P = module13.StyleSheet.create({
  imageView: {
    width: module391.default.scaledPixel(30),
    height: module391.default.scaledPixel(30),
    marginLeft: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginLeft: 2,
  },
  arrowStyle: {
    marginLeft: -3,
    width: 18,
    height: 18,
    transform: [
      {
        rotateY: module13.I18nManager.isRTL ? '180deg' : '0deg',
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
