var module227 = require('./227'),
  module358 = require('./358'),
  t = module358.currentCentroidXOfTouchesChangedAfter,
  u = module358.currentCentroidYOfTouchesChangedAfter,
  s = module358.previousCentroidXOfTouchesChangedAfter,
  c = module358.previousCentroidYOfTouchesChangedAfter,
  p = module358.currentCentroidX,
  v = module358.currentCentroidY,
  h = {
    _initializeGestureState: function (n) {
      n.moveX = 0;
      n.moveY = 0;
      n.x0 = 0;
      n.y0 = 0;
      n.dx = 0;
      n.dy = 0;
      n.vx = 0;
      n.vy = 0;
      n.numberActiveTouches = 0;
      n._accountsForMovesUpTo = 0;
    },
    _updateGestureStateOnMove: function (n, o) {
      n.numberActiveTouches = o.numberActiveTouches;
      n.moveX = t(o, n._accountsForMovesUpTo);
      n.moveY = u(o, n._accountsForMovesUpTo);
      var p = n._accountsForMovesUpTo,
        v = s(o, p),
        h = t(o, p),
        l = c(o, p),
        S = u(o, p),
        R = n.dx + (h - v),
        T = n.dy + (S - l),
        f = o.mostRecentTimeStamp - n._accountsForMovesUpTo;
      n.vx = (R - n.dx) / f;
      n.vy = (T - n.dy) / f;
      n.dx = R;
      n.dy = T;
      n._accountsForMovesUpTo = o.mostRecentTimeStamp;
    },
    create: function (o) {
      var t = {
          handle: null,
        },
        u = {
          stateID: Math.random(),
          moveX: 0,
          moveY: 0,
          x0: 0,
          y0: 0,
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0,
          numberActiveTouches: 0,
          _accountsForMovesUpTo: 0,
        };
      return {
        panHandlers: {
          onStartShouldSetResponder: function (n) {
            return null != o.onStartShouldSetPanResponder && o.onStartShouldSetPanResponder(n, u);
          },
          onMoveShouldSetResponder: function (n) {
            return null != o.onMoveShouldSetPanResponder && o.onMoveShouldSetPanResponder(n, u);
          },
          onStartShouldSetResponderCapture: function (n) {
            if (1 === n.nativeEvent.touches.length) h._initializeGestureState(u);
            u.numberActiveTouches = n.touchHistory.numberActiveTouches;
            return null != o.onStartShouldSetPanResponderCapture && o.onStartShouldSetPanResponderCapture(n, u);
          },
          onMoveShouldSetResponderCapture: function (n) {
            var t = n.touchHistory;
            return (
              u._accountsForMovesUpTo !== t.mostRecentTimeStamp &&
              (h._updateGestureStateOnMove(u, t), !!o.onMoveShouldSetPanResponderCapture && o.onMoveShouldSetPanResponderCapture(n, u))
            );
          },
          onResponderGrant: function (s) {
            if (!t.handle) t.handle = module227.createInteractionHandle();
            u.x0 = p(s.touchHistory);
            u.y0 = v(s.touchHistory);
            u.dx = 0;
            u.dy = 0;
            if (o.onPanResponderGrant) o.onPanResponderGrant(s, u);
            return null == o.onShouldBlockNativeResponder || o.onShouldBlockNativeResponder(s, u);
          },
          onResponderReject: function (n) {
            l(t, o.onPanResponderReject, n, u);
          },
          onResponderRelease: function (n) {
            l(t, o.onPanResponderRelease, n, u);

            h._initializeGestureState(u);
          },
          onResponderStart: function (n) {
            var t = n.touchHistory;
            u.numberActiveTouches = t.numberActiveTouches;
            if (o.onPanResponderStart) o.onPanResponderStart(n, u);
          },
          onResponderMove: function (n) {
            var t = n.touchHistory;

            if (u._accountsForMovesUpTo !== t.mostRecentTimeStamp) {
              h._updateGestureStateOnMove(u, t);

              if (o.onPanResponderMove) o.onPanResponderMove(n, u);
            }
          },
          onResponderEnd: function (n) {
            var s = n.touchHistory;
            u.numberActiveTouches = s.numberActiveTouches;
            l(t, o.onPanResponderEnd, n, u);
          },
          onResponderTerminate: function (n) {
            l(t, o.onPanResponderTerminate, n, u);

            h._initializeGestureState(u);
          },
          onResponderTerminationRequest: function (n) {
            return null == o.onPanResponderTerminationRequest || o.onPanResponderTerminationRequest(n, u);
          },
        },
        getInteractionHandle: function () {
          return t.handle;
        },
      };
    },
  };

function l(o, t, u, s) {
  if (o.handle) {
    module227.clearInteractionHandle(o.handle);
    o.handle = null;
  }

  if (t) t(u, s);
}

module.exports = h;
