exports.default = function (n, l) {
  for (var u = {}, p = false, R = 0; R < s; R++) {
    var c = o[R],
      b = n[c];

    if (b) {
      p = true;
      u[c] = b;
    }
  }

  var h = n.pointerEvents;
  if (h) u.pointerEvents = h;

  if (t(n)) {
    p = true;
    u.onResponderMove = l.touchableHandleResponderMove;
    u.onResponderGrant = l.touchableHandleResponderGrant;
    u.onResponderRelease = l.touchableHandleResponderRelease;
    u.onResponderTerminate = l.touchableHandleResponderTerminate;
    u.onStartShouldSetResponder = l.touchableHandleStartShouldSetResponder;
    u.onResponderTerminationRequest = l.touchableHandleResponderTerminationRequest;
  }

  if (p) u.responsible = true;
  return u;
};

var module13 = require('./13'),
  o = Object.keys(module13.PanResponder.create({}).panHandlers),
  s = o.length;

function t(n) {
  return null != n.disabled || n.onPress || n.onPressIn || n.onPressOut || n.onLongPress || n.delayPressIn || n.delayPressOut || n.delayLongPress;
}
