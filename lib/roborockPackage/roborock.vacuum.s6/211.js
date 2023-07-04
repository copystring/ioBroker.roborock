var module49 = require('./49');

function s(t, s) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    if (s)
      n = n.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable;
      });
    o.push.apply(o, n);
  }

  return o;
}

function o(o) {
  for (var n = 1; n < arguments.length; n++) {
    var c = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      s(Object(c), true).forEach(function (s) {
        module49(o, s, c[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(c));
    else
      s(Object(c)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return o;
}

var module51 = require('./51'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module85 = require('./85'),
  module202 = require('./202'),
  module212 = require('./212'),
  module46 = require('./46'),
  module83 = require('./83'),
  module213 = require('./213'),
  module215 = require('./215'),
  module77 = require('./77'),
  F = PropTypes.shape({
    type: PropTypes.oneOf(['RippleAndroid']),
    color: PropTypes.number,
    borderless: PropTypes.bool,
  }),
  S = PropTypes.shape({
    type: PropTypes.oneOf(['ThemeAttrAndroid']),
    attribute: PropTypes.string.isRequired,
  }),
  v = PropTypes.oneOfType([F, S]),
  O = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  A = module213({
    displayName: 'TouchableNativeFeedback',
    propTypes: o(
      o({}, module212.propTypes),
      {},
      {
        background: v,
        hasTVPreferredFocus: PropTypes.bool,
        nextFocusDown: PropTypes.number,
        nextFocusForward: PropTypes.number,
        nextFocusLeft: PropTypes.number,
        nextFocusRight: PropTypes.number,
        nextFocusUp: PropTypes.number,
        useForeground: PropTypes.bool,
      }
    ),
    statics: {
      SelectableBackground: function () {
        return {
          type: 'ThemeAttrAndroid',
          attribute: 'selectableItemBackground',
        };
      },
      SelectableBackgroundBorderless: function () {
        return {
          type: 'ThemeAttrAndroid',
          attribute: 'selectableItemBackgroundBorderless',
        };
      },
      Ripple: function (t, s) {
        return {
          type: 'RippleAndroid',
          color: module77(t),
          borderless: s,
        };
      },
      canUseNativeForeground: function () {
        return module51.Version >= 23;
      },
    },
    mixins: [module202.Mixin],
    getDefaultProps: function () {
      return {
        background: this.SelectableBackground(),
      };
    },
    getInitialState: function () {
      return this.touchableGetInitialState();
    },
    componentDidMount: function () {
      module215(this.props);
    },
    UNSAFE_componentWillReceiveProps: function (t) {
      module215(t);
    },
    touchableHandleActivePressIn: function (t) {
      if (this.props.onPressIn) this.props.onPressIn(t);

      this._dispatchPressedStateChange(true);

      if (this.pressInLocation) this._dispatchHotspotUpdate(this.pressInLocation.locationX, this.pressInLocation.locationY);
    },
    touchableHandleActivePressOut: function (t) {
      if (this.props.onPressOut) this.props.onPressOut(t);

      this._dispatchPressedStateChange(false);
    },
    touchableHandlePress: function (t) {
      if (this.props.onPress) this.props.onPress(t);
    },
    touchableHandleLongPress: function (t) {
      if (this.props.onLongPress) this.props.onLongPress(t);
    },
    touchableGetPressRectOffset: function () {
      return this.props.pressRetentionOffset || O;
    },
    touchableGetHitSlop: function () {
      return this.props.hitSlop;
    },
    touchableGetHighlightDelayMS: function () {
      return this.props.delayPressIn;
    },
    touchableGetLongPressDelayMS: function () {
      return this.props.delayLongPress;
    },
    touchableGetPressOutDelayMS: function () {
      return this.props.delayPressOut;
    },
    _handleResponderMove: function (t) {
      this.touchableHandleResponderMove(t);

      this._dispatchHotspotUpdate(t.nativeEvent.locationX, t.nativeEvent.locationY);
    },
    _dispatchHotspotUpdate: function (t, s) {
      module46.dispatchViewManagerCommand(module85.findNodeHandle(this), module46.getViewManagerConfig('RCTView').Commands.hotspotUpdate, [t || 0, s || 0]);
    },
    _dispatchPressedStateChange: function (t) {
      module46.dispatchViewManagerCommand(module85.findNodeHandle(this), module46.getViewManagerConfig('RCTView').Commands.setPressed, [t]);
    },
    render: function () {
      var s,
        n = React.Children.only(this.props.children),
        p = n.props.children;

      if (module202.TOUCH_TARGET_DEBUG && n.type === module83) {
        if (!Array.isArray(p)) p = [p];
        p.push(
          module202.renderDebugView({
            color: 'brown',
            hitSlop: this.props.hitSlop,
          })
        );
      }

      if (this.props.useForeground && !A.canUseNativeForeground())
        console.warn(
          'Requested foreground ripple, but it is not available on this version of Android. Consider calling TouchableNativeFeedback.canUseNativeForeground() and using a different Touchable if the result is false.'
        );
      var u = this.props.useForeground && A.canUseNativeForeground() ? 'nativeForegroundAndroid' : 'nativeBackgroundAndroid',
        h = o(
          o({}, n.props),
          {},
          (module49((s = {}), u, this.props.background),
          module49(s, 'accessible', false !== this.props.accessible),
          module49(s, 'accessibilityLabel', this.props.accessibilityLabel),
          module49(s, 'accessibilityRole', this.props.accessibilityRole),
          module49(s, 'accessibilityStates', this.props.accessibilityStates),
          module49(s, 'accessibilityState', this.props.accessibilityState),
          module49(s, 'accessibilityActions', this.props.accessibilityActions),
          module49(s, 'onAccessibilityAction', this.props.onAccessibilityAction),
          module49(s, 'children', p),
          module49(s, 'testID', this.props.testID),
          module49(s, 'onLayout', this.props.onLayout),
          module49(s, 'hitSlop', this.props.hitSlop),
          module49(s, 'isTVSelectable', true),
          module49(s, 'nextFocusDown', this.props.nextFocusDown),
          module49(s, 'nextFocusForward', this.props.nextFocusForward),
          module49(s, 'nextFocusLeft', this.props.nextFocusLeft),
          module49(s, 'nextFocusRight', this.props.nextFocusRight),
          module49(s, 'nextFocusUp', this.props.nextFocusUp),
          module49(s, 'hasTVPreferredFocus', this.props.hasTVPreferredFocus),
          module49(s, 'focusable', false !== this.props.focusable && undefined !== this.props.onPress && !this.props.disabled),
          module49(s, 'onClick', this.touchableHandlePress),
          module49(s, 'onStartShouldSetResponder', this.touchableHandleStartShouldSetResponder),
          module49(s, 'onResponderTerminationRequest', this.touchableHandleResponderTerminationRequest),
          module49(s, 'onResponderGrant', this.touchableHandleResponderGrant),
          module49(s, 'onResponderMove', this._handleResponderMove),
          module49(s, 'onResponderRelease', this.touchableHandleResponderRelease),
          module49(s, 'onResponderTerminate', this.touchableHandleResponderTerminate),
          s)
        );
      return React.cloneElement(n, h);
    },
  });

module.exports = A;
