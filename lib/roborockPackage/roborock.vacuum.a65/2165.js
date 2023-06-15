var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module13 = require('./13'),
  module2162 = require('./2162');

function b(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function P(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      b(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      b(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
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

var L = (function (t) {
  module9.default(b, t);

  var o = b,
    module50 = R(),
    h = function () {
      var t,
        n = module12.default(o);

      if (module50) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function b(t) {
    var o;
    module6.default(this, b);
    (o = h.call(this, t))._panResponder = module13.PanResponder.create({
      onStartShouldSetPanResponder: function () {
        return !o._isDisabled();
      },
      onMoveShouldSetPanResponder: function (t, n) {
        if (o._isDisabled()) return false;
        var s = Math.abs(n.vy),
          l = Math.abs(n.vx);
        return o._active && (o.props.horizontal ? l > s : s > l);
      },
      onShouldBlockNativeResponder: function () {
        return false;
      },
      onPanResponderGrant: function (t, n) {
        t.persist();
        o._target = t.nativeEvent.target;
        o._prevGestureState = P(
          P({}, n),
          {},
          {
            moveX: n.x0,
            moveY: n.y0,
          }
        );
        if (!o.props.manuallyActivateRows)
          o._longPressTimer = setTimeout(function () {
            if (!o._active) o._toggleActive(t, n);
          }, o.props.activationTime);
      },
      onPanResponderMove: function (t, n) {
        if (!o._active || n.numberActiveTouches > 1 || t.nativeEvent.target !== o._target) o._isTouchInsideElement(t) || o._cancelLongPress();
        else {
          var s = o._mapGestureToMove(o._prevGestureState, n);

          o.moveBy(s);
          o._prevGestureState = P({}, n);
          if (o.props.onMove) o.props.onMove(t, n, o._nextLocation);
        }
      },
      onPanResponderRelease: function (t, n) {
        if (o._active) o._toggleActive(t, n);
        else {
          o._cancelLongPress();

          if (o._isTouchInsideElement(t) && o.props.onPress) o.props.onPress();
        }
      },
      onPanResponderTerminationRequest: function () {
        return !o._active && (o._cancelLongPress(), true);
      },
      onPanResponderTerminate: function (t, n) {
        console.log('Sort: Terminated.');

        o._cancelLongPress();

        if (o._active) {
          o._toggleActive(t, n);

          if (module2162.shallowEqual(o.props.location, o._location)) o._relocate(o.props.location);
        }
      },
    });

    o._toggleActive = function (t, n) {
      var s = o._active ? o.props.onRelease : o.props.onActivate;
      o._active = !o._active;
      if (s) s(t, n, o._location);
    };

    o._onChangeLocation = function (t) {
      o._location = t;
    };

    o._onLayout = function (t) {
      o._layout = t.nativeEvent.layout;
      if (o.props.onLayout) o.props.onLayout(t);
    };

    o._animatedLocation = new module13.Animated.ValueXY(t.location);
    o._location = t.location;

    o._animatedLocation.addListener(o._onChangeLocation);

    return o;
  }

  module7.default(b, [
    {
      key: 'componentDidUpdate',
      value: function () {
        if (!this._active && !module2162.shallowEqual(this._location, this.props.location)) {
          var t = !this._active && this.props.animated;

          this._relocate(this.props.location, t);
        }
      },
    },
    {
      key: 'shouldComponentUpdate',
      value: function (t, o) {
        return this.props.disabled !== t.disabled || this.props.children !== t.children || !module2162.shallowEqual(this.props.style, t.style);
      },
    },
    {
      key: 'moveBy',
      value: function (t) {
        var o = t.dx,
          n = undefined === o ? 0 : o,
          s = t.dy,
          l = undefined === s ? 0 : s,
          c = t.animated,
          u = undefined !== c && c;
        console.log('Sort: Moving offset ' + n + ', ' + l);
        this._nextLocation = {
          x: this._location.x + n,
          y: this._location.y + l,
        };

        this._relocate(this._nextLocation, u);
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.props,
          o = t.children,
          s = t.style,
          l = t.horizontal,
          c = [s, A.container, this._animatedLocation.getLayout(), l ? A.horizontalContainer : A.verticalContainer];
        return React.default.createElement(
          module13.Animated.View,
          module22.default({}, this._panResponder.panHandlers, {
            style: c,
            onLayout: this._onLayout,
          }),
          this.props.manuallyActivateRows && o
            ? React.cloneElement(o, {
                toggleRowActive: this._toggleActive,
              })
            : o
        );
      },
    },
    {
      key: '_cancelLongPress',
      value: function () {
        clearTimeout(this._longPressTimer);
      },
    },
    {
      key: '_relocate',
      value: function (t, o) {
        var n = this;
        this._location = t;

        if (o) {
          this._isAnimationRunning = true;
          module13.Animated.timing(this._animatedLocation, {
            toValue: t,
            duration: 300,
            useNativeDriver: false,
          }).start(function () {
            n._isAnimationRunning = false;
          });
        } else this._animatedLocation.setValue(t);
      },
    },
    {
      key: '_mapGestureToMove',
      value: function (t, o) {
        return this.props.horizontal
          ? {
              dx: o.moveX - t.moveX,
            }
          : {
              dy: o.moveY - t.moveY,
            };
      },
    },
    {
      key: '_isDisabled',
      value: function () {
        return this.props.disabled || this._isAnimationRunning;
      },
    },
    {
      key: '_isTouchInsideElement',
      value: function (t) {
        var o = t.nativeEvent;
        return this._layout && o.locationX >= 0 && o.locationX <= this._layout.width && o.locationY >= 0 && o.locationY <= this._layout.height;
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = L;
L.propTypes = {
  children: PropTypes.default.node,
  animated: PropTypes.default.bool,
  disabled: PropTypes.default.bool,
  horizontal: PropTypes.default.bool,
  style: PropTypes.default.object,
  location: PropTypes.default.shape({
    x: PropTypes.default.number,
    y: PropTypes.default.number,
  }),
  manuallyActivateRows: PropTypes.default.bool,
  activationTime: PropTypes.default.number,
  onActivate: PropTypes.default.func,
  onLayout: PropTypes.default.func,
  onPress: PropTypes.default.func,
  onMove: PropTypes.default.func,
  onRelease: PropTypes.default.func,
};
L.defaultProps = {
  location: {
    x: 0,
    y: 0,
  },
  activationTime: 200,
};
var A = module13.StyleSheet.create({
  container: {
    position: 'absolute',
  },
  horizontalContainer: {
    top: 0,
    bottom: 0,
  },
  verticalContainer: {
    left: 0,
    right: 0,
  },
});
