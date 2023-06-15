var module21 = require('./21'),
  module49 = require('./49'),
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
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var p in t)
      if ('default' !== p && Object.prototype.hasOwnProperty.call(t, p)) {
        var u = l ? Object.getOwnPropertyDescriptor(t, p) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, p, u);
        else s[p] = t[p];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  PropTypes = require('prop-types');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function b(t, n) {
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

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      b(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function O() {
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

var R = (function (t) {
    module7.default(b, t);

    var module49 = b,
      PropTypes = O(),
      v = function () {
        var t,
          n = module11.default(module49);

        if (PropTypes) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

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
            onMoveShouldSetPanResponder: function (n, o) {
              return t.handleOnMoveShouldSetPanResponder(n, o);
            },
            onPanResponderMove: function (n, o) {
              return t.handlePanResponderMove(n, o);
            },
            onPanResponderRelease: function (n, o) {
              return t.handlePanResponderEnd(n, o);
            },
            onPanResponderTerminate: function (n, o) {
              return t.handlePanResponderEnd(n, o);
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
            var o = this.props.previewOpenValue || 0.5 * this.props.rightOpenValue;
            this.getPreviewAnimation(o, 700).start(function (t) {
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
          var o = n.dx;
          return Math.abs(o) > this.props.directionalDistanceChangeThreshold;
        },
      },
      {
        key: 'handlePanResponderMove',
        value: function (t, n) {
          var o = n.dx,
            s = n.dy,
            l = Math.abs(o),
            p = Math.abs(s);

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

            var u = this.swipeInitialX + o;
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
          var o = this.props.swipeToOpenVelocityContribution,
            s = this.props.rightOpenValue * o * (n.vx ** 5 / 5);
          this._ensureScrollEnabledTimer = setTimeout(this.ensureScrollEnabled, 300);
          var l = 0;
          if (this._translateX._value >= 0)
            this.swipeInitialX < this._translateX._value
              ? this._translateX._value - s > this.props.leftOpenValue * (this.props.swipeToOpenPercent / 100) && (l = this.props.leftOpenValue)
              : this._translateX._value - s > this.props.leftOpenValue * (1 - this.props.swipeToClosePercent / 100) && (l = this.props.leftOpenValue);
          else if (this.swipeInitialX > this._translateX._value) {
            if (this._translateX._value - s < this.props.rightOpenValue * (this.props.swipeToOpenPercent / 100)) l = this.props.rightOpenValue;
          } else if (this._translateX._value - s < this.props.rightOpenValue * (1 - this.props.swipeToClosePercent / 100)) l = this.props.rightOpenValue;
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
          }).start(function (o) {
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
                  onPress: function (o) {
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
                module21.default({}, this._panResponder.panHandlers, {
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
                module21.default({}, this._panResponder.panHandlers, {
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
              style: this.props.style ? this.props.style : S.container,
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  S.hidden,
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
  S = module12.StyleSheet.create({
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

R.propTypes = {
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
R.defaultProps = {
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
module.exports = R;
