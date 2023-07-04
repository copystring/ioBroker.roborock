var module49 = require('./49'),
  module12 = require('./12');

function s(t, n) {
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

function p(t) {
  for (var o = 1; o < arguments.length; o++) {
    var p = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      s(Object(p), true).forEach(function (o) {
        module49.default(t, o, p[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(p));
    else
      s(Object(p)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(p, n));
      });
  }

  return t;
}

var l = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  u = p(
    p({}, module12.Touchable.Mixin),
    {},
    {
      touchableHandleStartShouldSetResponder: function (t) {
        return this.props.onStartShouldSetResponder ? this.props.onStartShouldSetResponder(t) : module12.Touchable.Mixin.touchableHandleStartShouldSetResponder.call(this, t);
      },
      touchableHandleResponderTerminationRequest: function (t) {
        return this.props.onResponderTerminationRequest
          ? this.props.onResponderTerminationRequest(t)
          : module12.Touchable.Mixin.touchableHandleResponderTerminationRequest.call(this, t);
      },
      touchableHandleResponderGrant: function (t) {
        return this.props.onResponderGrant ? this.props.onResponderGrant(t) : module12.Touchable.Mixin.touchableHandleResponderGrant.call(this, t);
      },
      touchableHandleResponderMove: function (t) {
        return this.props.onResponderMove ? this.props.onResponderMove(t) : module12.Touchable.Mixin.touchableHandleResponderMove.call(this, t);
      },
      touchableHandleResponderRelease: function (t) {
        return this.props.onResponderRelease ? this.props.onResponderRelease(t) : module12.Touchable.Mixin.touchableHandleResponderRelease.call(this, t);
      },
      touchableHandleResponderTerminate: function (t) {
        return this.props.onResponderTerminate ? this.props.onResponderTerminate(t) : module12.Touchable.Mixin.touchableHandleResponderTerminate.call(this, t);
      },
      touchableHandlePress: function (t) {
        if (this.props.onPress) this.props.onPress(t);
      },
      touchableHandleActivePressIn: function (t) {
        if (this.props.onPressIn) this.props.onPressIn(t);
      },
      touchableHandleActivePressOut: function (t) {
        if (this.props.onPressOut) this.props.onPressOut(t);
      },
      touchableHandleLongPress: function (t) {
        if (this.props.onLongPress) this.props.onLongPress(t);
      },
      touchableGetPressRectOffset: function () {
        return this.props.pressRetentionOffset || l;
      },
      touchableGetHitSlop: function () {
        return this.props.hitSlop;
      },
      touchableGetHighlightDelayMS: function () {
        return this.props.delayPressIn || 0;
      },
      touchableGetLongPressDelayMS: function () {
        return 0 === this.props.delayLongPress ? 0 : this.props.delayLongPress || 500;
      },
      touchableGetPressOutDelayMS: function () {
        return this.props.delayPressOut || 0;
      },
    }
  );
exports.default = u;
