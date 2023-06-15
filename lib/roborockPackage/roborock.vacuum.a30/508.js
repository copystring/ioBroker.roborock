var module22 = require('./22'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types');

function b(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      b(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function R() {
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

var S = (function (t) {
    module7.default(b, t);

    var n = b,
      module50 = R(),
      v = function () {
        var t,
          s = module11.default(n);

        if (module50) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(s, arguments, l);
        } else t = s.apply(this, arguments);

        return module9.default(this, t);
      };

    function b(t) {
      var n;
      module4.default(this, b);

      (n = v.call(this, t)).ensureScrollEnabled = function () {
        if (!n.parentScrollEnabled) {
          n.parentScrollEnabled = true;
          if (n.props.setScrollEnabled) n.props.setScrollEnabled(true);
        }
      };

      n.horizontalSwipeGestureBegan = false;
      n.swipeInitialX = null;
      n.parentScrollEnabled = true;
      n.ranPreview = false;
      n._ensureScrollEnabledTimer = null;
      n.state = {
        dimensionsSet: false,
        hiddenHeight: 0,
        hiddenWidth: 0,
      };
      n._translateX = new module12.Animated.Value(0);
      return n;
    }

    module5.default(b, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this._panResponder = module12.PanResponder.create({
            onMoveShouldSetPanResponder: function (n, s) {
              return t.handleOnMoveShouldSetPanResponder(n, s);
            },
            onPanResponderMove: function (n, s) {
              return t.handlePanResponderMove(n, s);
            },
            onPanResponderRelease: function (n, s) {
              return t.handlePanResponderEnd(n, s);
            },
            onPanResponderTerminate: function (n, s) {
              return t.handlePanResponderEnd(n, s);
            },
            onShouldBlockNativeResponder: function (t) {
              return false;
            },
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          clearTimeout(this._ensureScrollEnabledTimer);
        },
      },
      {
        key: 'getPreviewAnimation',
        value: function (t, n) {
          return module12.Animated.timing(this._translateX, {
            duration: this.props.previewDuration,
            toValue: t,
            delay: n,
          });
        },
      },
      {
        key: 'onContentLayout',
        value: function (t) {
          var n = this;

          if (
            (this.setState({
              dimensionsSet: !this.props.recalculateHiddenLayout,
              hiddenHeight: t.nativeEvent.layout.height,
              hiddenWidth: t.nativeEvent.layout.width,
            }),
            this.props.preview && !this.ranPreview)
          ) {
            this.ranPreview = true;
            var s = this.props.previewOpenValue || 0.5 * this.props.rightOpenValue;
            this.getPreviewAnimation(s, 700).start(function (t) {
              n.getPreviewAnimation(0, 300).start();
            });
          }
        },
      },
      {
        key: 'onRowPress',
        value: function () {
          if (this.props.onRowPress) this.props.onRowPress();
          else if (this.props.closeOnRowPress) this.closeRow();
        },
      },
      {
        key: 'handleOnMoveShouldSetPanResponder',
        value: function (t, n) {
          var s = n.dx;
          return Math.abs(s) > this.props.directionalDistanceChangeThreshold;
        },
      },
      {
        key: 'handlePanResponderMove',
        value: function (t, n) {
          var s = n.dx,
            o = n.dy,
            l = Math.abs(s),
            p = Math.abs(o);

          if (l > this.props.directionalDistanceChangeThreshold || p > this.props.directionalDistanceChangeThreshold) {
            if (p > l && !this.horizontalSwipeGestureBegan) return;

            if (this.parentScrollEnabled) {
              this.parentScrollEnabled = false;
              if (this.props.setScrollEnabled) this.props.setScrollEnabled(false);
            }

            if (null === this.swipeInitialX) this.swipeInitialX = this._translateX._value;

            if (!this.horizontalSwipeGestureBegan) {
              this.horizontalSwipeGestureBegan = true;
              if (this.props.swipeGestureBegan) this.props.swipeGestureBegan();
            }

            var u = this.swipeInitialX + s;
            if (this.props.disableLeftSwipe && u < 0) u = 0;
            if (this.props.disableRightSwipe && u > 0) u = 0;
            if (this.props.stopLeftSwipe && u > this.props.stopLeftSwipe) u = this.props.stopLeftSwipe;
            if (this.props.stopRightSwipe && u < this.props.stopRightSwipe) u = this.props.stopRightSwipe;

            this._translateX.setValue(u);
          }
        },
      },
      {
        key: 'handlePanResponderEnd',
        value: function (t, n) {
          var s = this.props.swipeToOpenVelocityContribution,
            o = this.props.rightOpenValue * s * (n.vx ** 5 / 5);
          this._ensureScrollEnabledTimer = setTimeout(this.ensureScrollEnabled, 300);
          var l = 0;
          if (this._translateX._value >= 0)
            this.swipeInitialX < this._translateX._value
              ? this._translateX._value - o > this.props.leftOpenValue * (this.props.swipeToOpenPercent / 100) && (l = this.props.leftOpenValue)
              : this._translateX._value - o > this.props.leftOpenValue * (1 - this.props.swipeToClosePercent / 100) && (l = this.props.leftOpenValue);
          else if (this.swipeInitialX > this._translateX._value) {
            if (this._translateX._value - o < this.props.rightOpenValue * (this.props.swipeToOpenPercent / 100)) l = this.props.rightOpenValue;
          } else if (this._translateX._value - o < this.props.rightOpenValue * (1 - this.props.swipeToClosePercent / 100)) l = this.props.rightOpenValue;
          this.manuallySwipeRow(l);
        },
      },
      {
        key: 'closeRow',
        value: function () {
          this.manuallySwipeRow(0);
        },
      },
      {
        key: 'manuallySwipeRow',
        value: function (t) {
          var n = this;
          module12.Animated.spring(this._translateX, {
            toValue: t,
            friction: this.props.friction,
            tension: this.props.tension,
          }).start(function (s) {
            n.ensureScrollEnabled();
            if (0 === t) {
              if (n.props.onRowDidClose) n.props.onRowDidClose();
            } else if (n.props.onRowDidOpen) n.props.onRowDidOpen();
          });
          if (0 === t) {
            if (this.props.onRowClose) this.props.onRowClose();
          } else if (this.props.onRowOpen) this.props.onRowOpen(t);
          this.swipeInitialX = null;
          this.horizontalSwipeGestureBegan = false;
        },
      },
      {
        key: 'renderVisibleContent',
        value: function () {
          var t = this,
            n = this.props.children[1].props.onPress;

          if (n) {
            return React.default.cloneElement(
              this.props.children[1],
              y(
                y({}, this.props.children[1].props),
                {},
                {
                  onPress: function (s) {
                    t.onRowPress();
                    n();
                  },
                }
              )
            );
          }

          return React.default.createElement(
            module12.TouchableOpacity,
            {
              activeOpacity: 1,
              onPress: function (n) {
                return t.onRowPress();
              },
            },
            this.props.children[1]
          );
        },
      },
      {
        key: 'renderRowContent',
        value: function () {
          var t = this;
          return this.state.dimensionsSet
            ? React.default.createElement(
                module12.Animated.View,
                module22.default({}, this._panResponder.panHandlers, {
                  style: {
                    transform: [
                      {
                        translateX: this._translateX,
                      },
                    ],
                  },
                }),
                this.renderVisibleContent()
              )
            : React.default.createElement(
                module12.Animated.View,
                module22.default({}, this._panResponder.panHandlers, {
                  onLayout: function (n) {
                    return t.onContentLayout(n);
                  },
                  style: {
                    transform: [
                      {
                        translateX: this._translateX,
                      },
                    ],
                  },
                }),
                this.renderVisibleContent()
              );
        },
      },
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              style: this.props.style ? this.props.style : O.container,
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  O.hidden,
                  {
                    height: this.state.hiddenHeight,
                    width: this.state.hiddenWidth,
                  },
                ],
              },
              this.props.children[0]
            ),
            this.renderRowContent()
          );
        },
      },
    ]);
    return b;
  })(React.Component),
  O = module12.StyleSheet.create({
    container: {},
    hidden: {
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
    },
  });

S.propTypes = {
  setScrollEnabled: PropTypes.default.func,
  swipeGestureBegan: PropTypes.default.func,
  onRowOpen: PropTypes.default.func,
  onRowDidOpen: PropTypes.default.func,
  leftOpenValue: PropTypes.default.number,
  rightOpenValue: PropTypes.default.number,
  stopLeftSwipe: PropTypes.default.number,
  stopRightSwipe: PropTypes.default.number,
  friction: PropTypes.default.number,
  tension: PropTypes.default.number,
  closeOnRowPress: PropTypes.default.bool,
  disableLeftSwipe: PropTypes.default.bool,
  disableRightSwipe: PropTypes.default.bool,
  recalculateHiddenLayout: PropTypes.default.bool,
  onRowClose: PropTypes.default.func,
  onRowDidClose: PropTypes.default.func,
  style: module12.ViewPropTypes.style,
  preview: PropTypes.default.bool,
  previewDuration: PropTypes.default.number,
  previewOpenValue: PropTypes.default.number,
  directionalDistanceChangeThreshold: PropTypes.default.number,
  swipeToOpenPercent: PropTypes.default.number,
  swipeToOpenVelocityContribution: PropTypes.default.number,
  swipeToClosePercent: PropTypes.default.number,
};
S.defaultProps = {
  leftOpenValue: 0,
  rightOpenValue: 0,
  closeOnRowPress: true,
  disableLeftSwipe: false,
  disableRightSwipe: false,
  recalculateHiddenLayout: false,
  preview: false,
  previewDuration: 300,
  directionalDistanceChangeThreshold: 2,
  swipeToOpenPercent: 50,
  swipeToOpenVelocityContribution: 0,
  swipeToClosePercent: 50,
};
module.exports = S;
