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

var module218 = require('./218'),
  module246 = require('./246'),
  module282 = require('./282'),
  module51 = require('./51'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module202 = require('./202'),
  module212 = require('./212'),
  module213 = require('./213'),
  module215 = require('./215'),
  module82 = require('./82'),
  v = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  S = module213({
    displayName: 'TouchableOpacity',
    mixins: [module202.Mixin.withoutDefaultFocusAndBlur, module282],
    propTypes: o(
      o({}, module212.propTypes),
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
          anim: new module218.Value(this._getChildStyleOpacityWithDefault()),
        }
      );
    },
    componentDidMount: function () {
      module215(this.props);
    },
    UNSAFE_componentWillReceiveProps: function (t) {
      module215(t);
    },
    componentDidUpdate: function (t, s) {
      if (this.props.disabled !== t.disabled) this._opacityInactive(250);
    },
    setOpacityTo: function (t, s) {
      module218
        .timing(this.state.anim, {
          toValue: t,
          duration: s,
          easing: module246.inOut(module246.quad),
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
      if (module51.isTV) this._opacityActive(150);
      if (this.props.onFocus) this.props.onFocus(t);
    },
    touchableHandleBlur: function (t) {
      if (module51.isTV) this._opacityInactive(250);
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
      var t = module82(this.props.style) || {};
      return null == t.opacity ? 1 : t.opacity;
    },
    render: function () {
      return (
        <module218.View
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
          {module202.renderDebugView({
            color: 'cyan',
            hitSlop: this.props.hitSlop,
          })}
        </module218.View>
      );
    },
  });

module.exports = S;
