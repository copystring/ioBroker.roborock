var module50 = require('./50');

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
        module50(o, s, c[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(c));
    else
      s(Object(c)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return o;
}

var module52 = require('./52'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module86 = require('./86'),
  module204 = require('./204'),
  module214 = require('./214'),
  module47 = require('./47'),
  module84 = require('./84'),
  module215 = require('./215'),
  module219 = require('./219'),
  module78 = require('./78'),
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
  A = module215({
    displayName: 'TouchableNativeFeedback',
    propTypes: o(
      o({}, module214.propTypes),
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
          color: module78(t),
          borderless: s,
        };
      },
      canUseNativeForeground: function () {
        return module52.Version >= 23;
      },
    },
    mixins: [module204.Mixin],
    getDefaultProps: function () {
      return {
        background: this.SelectableBackground(),
      };
    },
    getInitialState: function () {
      return this.touchableGetInitialState();
    },
    componentDidMount: function () {
      module219(this.props);
    },
    UNSAFE_componentWillReceiveProps: function (t) {
      module219(t);
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
      module47.dispatchViewManagerCommand(module86.findNodeHandle(this), module47.getViewManagerConfig('RCTView').Commands.hotspotUpdate, [t || 0, s || 0]);
    },
    _dispatchPressedStateChange: function (t) {
      module47.dispatchViewManagerCommand(module86.findNodeHandle(this), module47.getViewManagerConfig('RCTView').Commands.setPressed, [t]);
    },
    render: function () {
      var s,
        n = React.Children.only(this.props.children),
        p = n.props.children;

      if (module204.TOUCH_TARGET_DEBUG && n.type === module84) {
        if (!Array.isArray(p)) p = [p];
        p.push(
          module204.renderDebugView({
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
          (module50((s = {}), u, this.props.background),
          module50(s, 'accessible', false !== this.props.accessible),
          module50(s, 'accessibilityLabel', this.props.accessibilityLabel),
          module50(s, 'accessibilityRole', this.props.accessibilityRole),
          module50(s, 'accessibilityStates', this.props.accessibilityStates),
          module50(s, 'accessibilityState', this.props.accessibilityState),
          module50(s, 'accessibilityActions', this.props.accessibilityActions),
          module50(s, 'onAccessibilityAction', this.props.onAccessibilityAction),
          module50(s, 'children', p),
          module50(s, 'testID', this.props.testID),
          module50(s, 'onLayout', this.props.onLayout),
          module50(s, 'hitSlop', this.props.hitSlop),
          module50(s, 'isTVSelectable', true),
          module50(s, 'nextFocusDown', this.props.nextFocusDown),
          module50(s, 'nextFocusForward', this.props.nextFocusForward),
          module50(s, 'nextFocusLeft', this.props.nextFocusLeft),
          module50(s, 'nextFocusRight', this.props.nextFocusRight),
          module50(s, 'nextFocusUp', this.props.nextFocusUp),
          module50(s, 'hasTVPreferredFocus', this.props.hasTVPreferredFocus),
          module50(s, 'focusable', false !== this.props.focusable && undefined !== this.props.onPress && !this.props.disabled),
          module50(s, 'onClick', this.touchableHandlePress),
          module50(s, 'onStartShouldSetResponder', this.touchableHandleStartShouldSetResponder),
          module50(s, 'onResponderTerminationRequest', this.touchableHandleResponderTerminationRequest),
          module50(s, 'onResponderGrant', this.touchableHandleResponderGrant),
          module50(s, 'onResponderMove', this._handleResponderMove),
          module50(s, 'onResponderRelease', this.touchableHandleResponderRelease),
          module50(s, 'onResponderTerminate', this.touchableHandleResponderTerminate),
          s)
        );
      return React.cloneElement(n, h);
    },
  });

module.exports = A;
