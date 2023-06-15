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

var module222 = require('./222'),
  module250 = require('./250'),
  module286 = require('./286'),
  module52 = require('./52'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module204 = require('./204'),
  module214 = require('./214'),
  module215 = require('./215'),
  module219 = require('./219'),
  module83 = require('./83'),
  v = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  S = module215({
    displayName: 'TouchableOpacity',
    mixins: [module204.Mixin.withoutDefaultFocusAndBlur, module286],
    propTypes: o(
      o({}, module214.propTypes),
      {},
      {
        activeOpacity: PropTypes.number,
        hasTVPreferredFocus: PropTypes.bool,
        nextFocusDown: PropTypes.number,
        nextFocusForward: PropTypes.number,
        nextFocusLeft: PropTypes.number,
        nextFocusRight: PropTypes.number,
        nextFocusUp: PropTypes.number,
        tvParallaxProperties: PropTypes.object,
      }
    ),
    getDefaultProps: function () {
      return {
        activeOpacity: 0.2,
      };
    },
    getInitialState: function () {
      return o(
        o({}, this.touchableGetInitialState()),
        {},
        {
          anim: new module222.Value(this._getChildStyleOpacityWithDefault()),
        }
      );
    },
    componentDidMount: function () {
      module219(this.props);
    },
    UNSAFE_componentWillReceiveProps: function (t) {
      module219(t);
    },
    componentDidUpdate: function (t, s) {
      if (this.props.disabled !== t.disabled) this._opacityInactive(250);
    },
    setOpacityTo: function (t, s) {
      module222
        .timing(this.state.anim, {
          toValue: t,
          duration: s,
          easing: module250.inOut(module250.quad),
          useNativeDriver: true,
        })
        .start();
    },
    touchableHandleActivePressIn: function (t) {
      if ('onResponderGrant' === t.dispatchConfig.registrationName) this._opacityActive(0);
      else this._opacityActive(150);
      if (this.props.onPressIn) this.props.onPressIn(t);
    },
    touchableHandleActivePressOut: function (t) {
      this._opacityInactive(250);

      if (this.props.onPressOut) this.props.onPressOut(t);
    },
    touchableHandleFocus: function (t) {
      if (module52.isTV) this._opacityActive(150);
      if (this.props.onFocus) this.props.onFocus(t);
    },
    touchableHandleBlur: function (t) {
      if (module52.isTV) this._opacityInactive(250);
      if (this.props.onBlur) this.props.onBlur(t);
    },
    touchableHandlePress: function (t) {
      if (this.props.onPress) this.props.onPress(t);
    },
    touchableHandleLongPress: function (t) {
      if (this.props.onLongPress) this.props.onLongPress(t);
    },
    touchableGetPressRectOffset: function () {
      return this.props.pressRetentionOffset || v;
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
      return this.props.delayPressOut;
    },
    _opacityActive: function (t) {
      this.setOpacityTo(this.props.activeOpacity, t);
    },
    _opacityInactive: function (t) {
      this.setOpacityTo(this._getChildStyleOpacityWithDefault(), t);
    },
    _getChildStyleOpacityWithDefault: function () {
      var t = module83(this.props.style) || {};
      return null == t.opacity ? 1 : t.opacity;
    },
    render: function () {
      return (
        <module222.View
          accessible={false !== this.props.accessible}
          accessibilityLabel={this.props.accessibilityLabel}
          accessibilityHint={this.props.accessibilityHint}
          accessibilityRole={this.props.accessibilityRole}
          accessibilityStates={this.props.accessibilityStates}
          accessibilityState={this.props.accessibilityState}
          accessibilityActions={this.props.accessibilityActions}
          onAccessibilityAction={this.props.onAccessibilityAction}
          style={[
            this.props.style,
            {
              opacity: this.state.anim,
            },
          ]}
          nativeID={this.props.nativeID}
          testID={this.props.testID}
          onLayout={this.props.onLayout}
          isTVSelectable
          nextFocusDown={this.props.nextFocusDown}
          nextFocusForward={this.props.nextFocusForward}
          nextFocusLeft={this.props.nextFocusLeft}
          nextFocusRight={this.props.nextFocusRight}
          nextFocusUp={this.props.nextFocusUp}
          hasTVPreferredFocus={this.props.hasTVPreferredFocus}
          tvParallaxProperties={this.props.tvParallaxProperties}
          hitSlop={this.props.hitSlop}
          focusable={false !== this.props.focusable && undefined !== this.props.onPress}
          onClick={this.touchableHandlePress}
          onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
          onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
          onResponderGrant={this.touchableHandleResponderGrant}
          onResponderMove={this.touchableHandleResponderMove}
          onResponderRelease={this.touchableHandleResponderRelease}
          onResponderTerminate={this.touchableHandleResponderTerminate}
        >
          {this.props.children}
          {module204.renderDebugView({
            color: 'cyan',
            hitSlop: this.props.hitSlop,
          })}
        </module222.View>
      );
    },
  });

module.exports = S;
