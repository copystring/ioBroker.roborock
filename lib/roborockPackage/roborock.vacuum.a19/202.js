var module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module49 = require('./49');

function R(t, E) {
  var R = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (E)
      o = o.filter(function (E) {
        return Object.getOwnPropertyDescriptor(t, E).enumerable;
      });
    R.push.apply(R, o);
  }

  return R;
}

function o(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(s), true).forEach(function (R) {
        module49(t, R, s[R]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      R(Object(s)).forEach(function (E) {
        Object.defineProperty(t, E, Object.getOwnPropertyDescriptor(s, E));
      });
  }

  return t;
}

require('react');

require('./83');

require('./67');

var module203 = require('./203'),
  module51 = require('./51'),
  module205 = require('./205'),
  module85 = require('./85'),
  module60 = require('./60'),
  module206 = require('./206'),
  module46 = require('./46'),
  module208 = require('./208'),
  O = function (t) {
    var E = t.touches,
      R = t.changedTouches,
      o = E && E.length > 0,
      s = R && R.length > 0;
    return !o && s ? R[0] : o ? E[0] : t;
  },
  P = module208({
    NOT_RESPONDER: null,
    RESPONDER_INACTIVE_PRESS_IN: null,
    RESPONDER_INACTIVE_PRESS_OUT: null,
    RESPONDER_ACTIVE_PRESS_IN: null,
    RESPONDER_ACTIVE_PRESS_OUT: null,
    RESPONDER_ACTIVE_LONG_PRESS_IN: null,
    RESPONDER_ACTIVE_LONG_PRESS_OUT: null,
    ERROR: null,
  }),
  T = {
    NOT_RESPONDER: false,
    RESPONDER_INACTIVE_PRESS_IN: false,
    RESPONDER_INACTIVE_PRESS_OUT: false,
    RESPONDER_ACTIVE_PRESS_IN: false,
    RESPONDER_ACTIVE_PRESS_OUT: false,
    RESPONDER_ACTIVE_LONG_PRESS_IN: false,
    RESPONDER_ACTIVE_LONG_PRESS_OUT: false,
    ERROR: false,
  },
  c = o(
    o({}, T),
    {},
    {
      RESPONDER_ACTIVE_PRESS_OUT: true,
      RESPONDER_ACTIVE_PRESS_IN: true,
    }
  ),
  D = o(
    o({}, T),
    {},
    {
      RESPONDER_INACTIVE_PRESS_IN: true,
      RESPONDER_ACTIVE_PRESS_IN: true,
      RESPONDER_ACTIVE_LONG_PRESS_IN: true,
    }
  ),
  A = o(
    o({}, T),
    {},
    {
      RESPONDER_ACTIVE_LONG_PRESS_IN: true,
    }
  ),
  I = module208({
    DELAY: null,
    RESPONDER_GRANT: null,
    RESPONDER_RELEASE: null,
    RESPONDER_TERMINATED: null,
    ENTER_PRESS_RECT: null,
    LEAVE_PRESS_RECT: null,
    LONG_PRESS_DETECTED: null,
  }),
  b = {
    NOT_RESPONDER: {
      DELAY: P.ERROR,
      RESPONDER_GRANT: P.RESPONDER_INACTIVE_PRESS_IN,
      RESPONDER_RELEASE: P.ERROR,
      RESPONDER_TERMINATED: P.ERROR,
      ENTER_PRESS_RECT: P.ERROR,
      LEAVE_PRESS_RECT: P.ERROR,
      LONG_PRESS_DETECTED: P.ERROR,
    },
    RESPONDER_INACTIVE_PRESS_IN: {
      DELAY: P.RESPONDER_ACTIVE_PRESS_IN,
      RESPONDER_GRANT: P.ERROR,
      RESPONDER_RELEASE: P.NOT_RESPONDER,
      RESPONDER_TERMINATED: P.NOT_RESPONDER,
      ENTER_PRESS_RECT: P.RESPONDER_INACTIVE_PRESS_IN,
      LEAVE_PRESS_RECT: P.RESPONDER_INACTIVE_PRESS_OUT,
      LONG_PRESS_DETECTED: P.ERROR,
    },
    RESPONDER_INACTIVE_PRESS_OUT: {
      DELAY: P.RESPONDER_ACTIVE_PRESS_OUT,
      RESPONDER_GRANT: P.ERROR,
      RESPONDER_RELEASE: P.NOT_RESPONDER,
      RESPONDER_TERMINATED: P.NOT_RESPONDER,
      ENTER_PRESS_RECT: P.RESPONDER_INACTIVE_PRESS_IN,
      LEAVE_PRESS_RECT: P.RESPONDER_INACTIVE_PRESS_OUT,
      LONG_PRESS_DETECTED: P.ERROR,
    },
    RESPONDER_ACTIVE_PRESS_IN: {
      DELAY: P.ERROR,
      RESPONDER_GRANT: P.ERROR,
      RESPONDER_RELEASE: P.NOT_RESPONDER,
      RESPONDER_TERMINATED: P.NOT_RESPONDER,
      ENTER_PRESS_RECT: P.RESPONDER_ACTIVE_PRESS_IN,
      LEAVE_PRESS_RECT: P.RESPONDER_ACTIVE_PRESS_OUT,
      LONG_PRESS_DETECTED: P.RESPONDER_ACTIVE_LONG_PRESS_IN,
    },
    RESPONDER_ACTIVE_PRESS_OUT: {
      DELAY: P.ERROR,
      RESPONDER_GRANT: P.ERROR,
      RESPONDER_RELEASE: P.NOT_RESPONDER,
      RESPONDER_TERMINATED: P.NOT_RESPONDER,
      ENTER_PRESS_RECT: P.RESPONDER_ACTIVE_PRESS_IN,
      LEAVE_PRESS_RECT: P.RESPONDER_ACTIVE_PRESS_OUT,
      LONG_PRESS_DETECTED: P.ERROR,
    },
    RESPONDER_ACTIVE_LONG_PRESS_IN: {
      DELAY: P.ERROR,
      RESPONDER_GRANT: P.ERROR,
      RESPONDER_RELEASE: P.NOT_RESPONDER,
      RESPONDER_TERMINATED: P.NOT_RESPONDER,
      ENTER_PRESS_RECT: P.RESPONDER_ACTIVE_LONG_PRESS_IN,
      LEAVE_PRESS_RECT: P.RESPONDER_ACTIVE_LONG_PRESS_OUT,
      LONG_PRESS_DETECTED: P.RESPONDER_ACTIVE_LONG_PRESS_IN,
    },
    RESPONDER_ACTIVE_LONG_PRESS_OUT: {
      DELAY: P.ERROR,
      RESPONDER_GRANT: P.ERROR,
      RESPONDER_RELEASE: P.NOT_RESPONDER,
      RESPONDER_TERMINATED: P.NOT_RESPONDER,
      ENTER_PRESS_RECT: P.RESPONDER_ACTIVE_LONG_PRESS_IN,
      LEAVE_PRESS_RECT: P.RESPONDER_ACTIVE_LONG_PRESS_OUT,
      LONG_PRESS_DETECTED: P.ERROR,
    },
    error: {
      DELAY: P.NOT_RESPONDER,
      RESPONDER_GRANT: P.RESPONDER_INACTIVE_PRESS_IN,
      RESPONDER_RELEASE: P.NOT_RESPONDER,
      RESPONDER_TERMINATED: P.NOT_RESPONDER,
      ENTER_PRESS_RECT: P.NOT_RESPONDER,
      LEAVE_PRESS_RECT: P.NOT_RESPONDER,
      LONG_PRESS_DETECTED: P.NOT_RESPONDER,
    },
  },
  p = {
    componentDidMount: function () {
      if (module51.isTV) {
        this._tvEventHandler = new module206();

        this._tvEventHandler.enable(this, function (t, E) {
          var R = module85.findNodeHandle(t);
          E.dispatchConfig = {};
          if (R === E.tag)
            'focus' === E.eventType
              ? t.touchableHandleFocus(E)
              : 'blur' === E.eventType
              ? t.touchableHandleBlur(E)
              : 'select' === E.eventType && t.touchableHandlePress && !t.props.disabled && t.touchableHandlePress(E);
        });
      }
    },
    componentWillUnmount: function () {
      if (this._tvEventHandler) {
        this._tvEventHandler.disable();

        delete this._tvEventHandler;
      }

      if (this.touchableDelayTimeout) clearTimeout(this.touchableDelayTimeout);
      if (this.longPressDelayTimeout) clearTimeout(this.longPressDelayTimeout);
      if (this.pressOutDelayTimeout) clearTimeout(this.pressOutDelayTimeout);
    },
    touchableGetInitialState: function () {
      return {
        touchable: {
          touchState: undefined,
          responderID: null,
        },
      };
    },
    touchableHandleResponderTerminationRequest: function () {
      return !this.props.rejectResponderTermination;
    },
    touchableHandleStartShouldSetResponder: function () {
      return !this.props.disabled;
    },
    touchableLongPressCancelsPress: function () {
      return true;
    },
    touchableHandleResponderGrant: function (t) {
      var E = t.currentTarget;
      t.persist();
      if (this.pressOutDelayTimeout) clearTimeout(this.pressOutDelayTimeout);
      this.pressOutDelayTimeout = null;
      this.state.touchable.touchState = P.NOT_RESPONDER;
      this.state.touchable.responderID = E;

      this._receiveSignal(I.RESPONDER_GRANT, t);

      var R = undefined !== this.touchableGetHighlightDelayMS ? this.touchableGetHighlightDelayMS() ** 0 : 130;
      if (0 !== (R = isNaN(R) ? 130 : R)) this.touchableDelayTimeout = setTimeout(this._handleDelay.bind(this, t), R);
      else this._handleDelay(t);
      var o = undefined !== this.touchableGetLongPressDelayMS ? this.touchableGetLongPressDelayMS() ** 10 : 370;
      o = isNaN(o) ? 370 : o;
      this.longPressDelayTimeout = setTimeout(this._handleLongDelay.bind(this, t), o + R);
    },
    touchableHandleResponderRelease: function (t) {
      this.pressInLocation = null;

      this._receiveSignal(I.RESPONDER_RELEASE, t);
    },
    touchableHandleResponderTerminate: function (t) {
      this.pressInLocation = null;

      this._receiveSignal(I.RESPONDER_TERMINATED, t);
    },
    touchableHandleResponderMove: function (t) {
      if (this.state.touchable.positionOnActivate) {
        var E = this.state.touchable.positionOnActivate,
          R = this.state.touchable.dimensionsOnActivate,
          o = this.touchableGetPressRectOffset
            ? this.touchableGetPressRectOffset()
            : {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
              },
          s = o.left,
          _ = o.top,
          n = o.right,
          S = o.bottom,
          l = this.touchableGetHitSlop ? this.touchableGetHitSlop() : null;

        if (l) {
          s += l.left || 0;
          _ += l.top || 0;
          n += l.right || 0;
          S += l.bottom || 0;
        }

        var u = O(t.nativeEvent),
          h = u && u.pageX,
          N = u && u.pageY;
        if (this.pressInLocation) this._getDistanceBetweenPoints(h, N, this.pressInLocation.pageX, this.pressInLocation.pageY) > 10 && this._cancelLongPressDelayTimeout();

        if (h > E.left - s && N > E.top - _ && h < E.left + R.width + n && N < E.top + R.height + S) {
          var T = this.state.touchable.touchState;

          this._receiveSignal(I.ENTER_PRESS_RECT, t);

          if (this.state.touchable.touchState === P.RESPONDER_INACTIVE_PRESS_IN && T !== P.RESPONDER_INACTIVE_PRESS_IN) this._cancelLongPressDelayTimeout();
        } else {
          this._cancelLongPressDelayTimeout();

          this._receiveSignal(I.LEAVE_PRESS_RECT, t);
        }
      }
    },
    touchableHandleFocus: function (t) {
      if (this.props.onFocus) this.props.onFocus(t);
    },
    touchableHandleBlur: function (t) {
      if (this.props.onBlur) this.props.onBlur(t);
    },
    _remeasureMetricsOnActivation: function () {
      var t = this.state.touchable.responderID;
      if (null != t) module46.measure(t, this._handleQueryLayout);
    },
    _handleQueryLayout: function (t, E, R, o, _, S) {
      if (t || E || R || o || _ || S) {
        if (this.state.touchable.positionOnActivate) module205.release(this.state.touchable.positionOnActivate);
        if (this.state.touchable.dimensionsOnActivate) module203.release(this.state.touchable.dimensionsOnActivate);
        this.state.touchable.positionOnActivate = module205.getPooled(_, S);
        this.state.touchable.dimensionsOnActivate = module203.getPooled(R, o);
      }
    },
    _handleDelay: function (t) {
      this.touchableDelayTimeout = null;

      this._receiveSignal(I.DELAY, t);
    },
    _handleLongDelay: function (t) {
      this.longPressDelayTimeout = null;
      var E = this.state.touchable.touchState;
      if (E !== P.RESPONDER_ACTIVE_PRESS_IN && E !== P.RESPONDER_ACTIVE_LONG_PRESS_IN)
        console.error(
          'Attempted to transition from state `' +
            E +
            '` to `' +
            P.RESPONDER_ACTIVE_LONG_PRESS_IN +
            '`, which is not supported. This is most likely due to `Touchable.longPressDelayTimeout` not being cancelled.'
        );
      else this._receiveSignal(I.LONG_PRESS_DETECTED, t);
    },
    _receiveSignal: function (t, E) {
      var R = this.state.touchable.responderID,
        o = this.state.touchable.touchState,
        s = b[o] && b[o][t];

      if (R || t !== I.RESPONDER_RELEASE) {
        if (!s) throw new Error('Unrecognized signal `' + t + '` or state `' + o + '` for Touchable responder `' + R + '`');
        if (s === P.ERROR) throw new Error('Touchable cannot transition from `' + o + '` to `' + t + '` for responder `' + R + '`');

        if (o !== s) {
          this._performSideEffectsForTransition(o, s, t, E);

          this.state.touchable.touchState = s;
        }
      }
    },
    _cancelLongPressDelayTimeout: function () {
      if (this.longPressDelayTimeout) clearTimeout(this.longPressDelayTimeout);
      this.longPressDelayTimeout = null;
    },
    _isHighlight: function (t) {
      return t === P.RESPONDER_ACTIVE_PRESS_IN || t === P.RESPONDER_ACTIVE_LONG_PRESS_IN;
    },
    _savePressInLocation: function (t) {
      var E = O(t.nativeEvent),
        R = E && E.pageX,
        o = E && E.pageY,
        s = E && E.locationX,
        _ = E && E.locationY;

      this.pressInLocation = {
        pageX: R,
        pageY: o,
        locationX: s,
        locationY: _,
      };
    },
    _getDistanceBetweenPoints: function (t, E, R, o) {
      var s = t - R,
        _ = E - o;

      return Math.sqrt(s * s + _ * _);
    },
    _performSideEffectsForTransition: function (t, E, R, o) {
      var s = this._isHighlight(t),
        _ = this._isHighlight(E);

      if (R === I.RESPONDER_TERMINATED || R === I.RESPONDER_RELEASE) this._cancelLongPressDelayTimeout();
      var n = t === P.NOT_RESPONDER && E === P.RESPONDER_INACTIVE_PRESS_IN,
        S = !c[t] && c[E];

      if (
        ((n || S) && this._remeasureMetricsOnActivation(),
        D[t] && R === I.LONG_PRESS_DETECTED && this.touchableHandleLongPress && this.touchableHandleLongPress(o),
        _ && !s ? this._startHighlight(o) : !_ && s && this._endHighlight(o),
        D[t] && R === I.RESPONDER_RELEASE)
      ) {
        var l = !!this.props.onLongPress,
          u = A[t] && (!l || !this.touchableLongPressCancelsPress());

        if ((!A[t] || u) && this.touchableHandlePress) {
          if (!(_ || s)) {
            this._startHighlight(o);

            this._endHighlight(o);
          }

          if (!this.props.touchSoundDisabled) this._playTouchSound();
          this.touchableHandlePress(o);
        }
      }

      if (this.touchableDelayTimeout) clearTimeout(this.touchableDelayTimeout);
      this.touchableDelayTimeout = null;
    },
    _playTouchSound: function () {
      module46.playTouchSound();
    },
    _startHighlight: function (t) {
      this._savePressInLocation(t);

      if (this.touchableHandleActivePressIn) this.touchableHandleActivePressIn(t);
    },
    _endHighlight: function (t) {
      var E = this;
      if (this.touchableHandleActivePressOut)
        this.touchableGetPressOutDelayMS && this.touchableGetPressOutDelayMS()
          ? (this.pressOutDelayTimeout = setTimeout(function () {
              E.touchableHandleActivePressOut(t);
            }, this.touchableGetPressOutDelayMS()))
          : this.touchableHandleActivePressOut(t);
    },
    withoutDefaultFocusAndBlur: {},
  },
  C = module55(p, ['touchableHandleFocus', 'touchableHandleBlur']);

p.withoutDefaultFocusAndBlur = C;
var L = {
  Mixin: p,
  TOUCH_TARGET_DEBUG: false,
  renderDebugView: function (t) {
    if (!L.TOUCH_TARGET_DEBUG) return null;
    throw Error('Touchable.TOUCH_TARGET_DEBUG should not be enabled in prod!');
  },
};
module60.create({
  debug: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
});
module.exports = L;
