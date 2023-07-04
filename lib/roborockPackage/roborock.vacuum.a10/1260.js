var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1261 = require('./1261'),
  module387 = require('./387');

function y() {
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

var PropTypes = require('prop-types'),
  module1262 = (function (t) {
    module7.default(w, t);

    var PropTypes = w,
      module1262 = y(),
      P = function () {
        var t,
          n = module11.default(PropTypes);

        if (module1262) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function w(t) {
      var n;
      module4.default(this, w);
      (n = P.call(this, t)).state = {
        bubbleWidth: 0,
        bubbleHeight: 0,
      };
      n.arrowImage = require('./1262');
      return n;
    }

    module5.default(w, [
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
        key: 'render',
        value: function () {
          var t = this,
            o = this.props.funcId || 'time_key_' + new Date().getTime();
          if (!this.props.center.x || !this.props.center.y) return null;
          var s = this.props.center.x * this.props.transform.xx,
            u = this.props.center.y * this.props.transform.yy;
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: 'box-none',
              style: {
                position: 'absolute',
                left: s - this.state.bubbleWidth / 2,
                top: u - this.state.bubbleHeight - this.props.topOffset,
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
              module21.default({}, module387.default.getAccessibilityLabel(o), this.panResponderBubble.panHandlers, {
                style: {
                  top: 0,
                  left: 0,
                  height: this.state.bubbleHeight,
                  opacity: this.props.animatedOpacity,
                },
              }),
              React.default.createElement(
                module1261.Bubble,
                {
                  style: R.bubbleStyle,
                  onLayout: function (n) {
                    t.setState({
                      bubbleWidth: n.nativeEvent.layout.width,
                      bubbleHeight: n.nativeEvent.layout.height,
                    });
                    if (t.props.onBubbleLayout) t.props.onBubbleLayout(n.nativeEvent.layout, s);
                  },
                },
                React.default.createElement(module12.Image, {
                  resizeMethod: 'auto',
                  style: R.imageStyle,
                  source: this.props.objectImage,
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: R.textStyles,
                  },
                  ' ',
                  this.props.objectName,
                  ' '
                ),
                this.props.hasArrow &&
                  React.default.createElement(module12.Image, {
                    resizeMethod: 'auto',
                    style: R.arrowStyle,
                    source: this.arrowImage,
                  })
              )
            )
          );
        },
      },
    ]);
    return w;
  })(React.default.PureComponent);

exports.default = module1262;
module1262.defaultProps = {
  hasArrow: true,
  topOffset: 0,
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
};
module1262.propTypes = {
  center: PropTypes.object,
  topOffset: PropTypes.number,
  transform: PropTypes.object,
  objectImage: PropTypes.number,
  objectName: PropTypes.string,
  onPressBubble: PropTypes.func,
  onBubbleLayout: PropTypes.func,
};
var R = module12.StyleSheet.create({
  imageStyle: {
    width: module387.default.scaledPixel(30),
    height: module387.default.scaledPixel(30),
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
