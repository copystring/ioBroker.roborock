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
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      s(Object(l), true).forEach(function (s) {
        module50(o, s, l[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(l));
    else
      s(Object(l)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(l, t));
      });
  }

  return o;
}

var module67 = require('./67'),
  module276 = require('./276'),
  module286 = require('./286'),
  module52 = require('./52'),
  PropTypes = require('prop-types'),
  React = require('react'),
  module193 = require('./193'),
  module61 = require('./61'),
  module204 = require('./204'),
  module214 = require('./214'),
  module84 = require('./84'),
  module215 = require('./215'),
  module219 = require('./219'),
  T = {
    activeOpacity: 0.85,
    delayPressOut: 100,
    underlayColor: 'black',
  },
  _ = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  F = module215({
    displayName: 'TouchableHighlight',
    propTypes: o(
      o({}, module214.propTypes),
      {},
      {
        activeOpacity: PropTypes.number,
        underlayColor: module67,
        style: module276.style,
        onShowUnderlay: PropTypes.func,
        onHideUnderlay: PropTypes.func,
        hasTVPreferredFocus: PropTypes.bool,
        nextFocusDown: PropTypes.number,
        nextFocusForward: PropTypes.number,
        nextFocusLeft: PropTypes.number,
        nextFocusRight: PropTypes.number,
        nextFocusUp: PropTypes.number,
        tvParallaxProperties: PropTypes.object,
        testOnly_pressed: PropTypes.bool,
      }
    ),
    mixins: [module286, module204.Mixin.withoutDefaultFocusAndBlur],
    getDefaultProps: function () {
      return T;
    },
    getInitialState: function () {
      this._isMounted = false;
      return this.props.testOnly_pressed
        ? o(
            o({}, this.touchableGetInitialState()),
            {},
            {
              extraChildStyle: {
                opacity: this.props.activeOpacity,
              },
              extraUnderlayStyle: {
                backgroundColor: this.props.underlayColor,
              },
            }
          )
        : o(
            o({}, this.touchableGetInitialState()),
            {},
            {
              extraChildStyle: null,
              extraUnderlayStyle: null,
            }
          );
    },
    componentDidMount: function () {
      this._isMounted = true;
      module219(this.props);
    },
    componentWillUnmount: function () {
      this._isMounted = false;
      clearTimeout(this._hideTimeout);
    },
    UNSAFE_componentWillReceiveProps: function (t) {
      module219(t);
    },
    viewConfig: {
      uiViewClassName: 'RCTView',
      validAttributes: module193.RCTView,
    },
    touchableHandleActivePressIn: function (t) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;

      this._showUnderlay();

      if (this.props.onPressIn) this.props.onPressIn(t);
    },
    touchableHandleActivePressOut: function (t) {
      if (!this._hideTimeout) this._hideUnderlay();
      if (this.props.onPressOut) this.props.onPressOut(t);
    },
    touchableHandleFocus: function (t) {
      if (module52.isTV) this._showUnderlay();
      if (this.props.onFocus) this.props.onFocus(t);
    },
    touchableHandleBlur: function (t) {
      if (module52.isTV) this._hideUnderlay();
      if (this.props.onBlur) this.props.onBlur(t);
    },
    touchableHandlePress: function (t) {
      clearTimeout(this._hideTimeout);

      if (!module52.isTV) {
        this._showUnderlay();

        this._hideTimeout = setTimeout(this._hideUnderlay, this.props.delayPressOut);
      }

      if (this.props.onPress) this.props.onPress(t);
    },
    touchableHandleLongPress: function (t) {
      if (this.props.onLongPress) this.props.onLongPress(t);
    },
    touchableGetPressRectOffset: function () {
      return this.props.pressRetentionOffset || _;
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
    _showUnderlay: function () {
      if (this._isMounted && this._hasPressHandler()) {
        this.setState({
          extraChildStyle: {
            opacity: this.props.activeOpacity,
          },
          extraUnderlayStyle: {
            backgroundColor: this.props.underlayColor,
          },
        });
        if (this.props.onShowUnderlay) this.props.onShowUnderlay();
      }
    },
    _hideUnderlay: function () {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
      if (!this.props.testOnly_pressed)
        this._hasPressHandler() &&
          (this.setState({
            extraChildStyle: null,
            extraUnderlayStyle: null,
          }),
          this.props.onHideUnderlay && this.props.onHideUnderlay());
    },
    _hasPressHandler: function () {
      return !!(this.props.onPress || this.props.onPressIn || this.props.onPressOut || this.props.onLongPress);
    },
    render: function () {
      var t = React.Children.only(this.props.children);
      return (
        <module84
          accessible={false !== this.props.accessible}
          accessibilityLabel={this.props.accessibilityLabel}
          accessibilityHint={this.props.accessibilityHint}
          accessibilityRole={this.props.accessibilityRole}
          accessibilityStates={this.props.accessibilityStates}
          accessibilityState={this.props.accessibilityState}
          accessibilityActions={this.props.accessibilityActions}
          onAccessibilityAction={this.props.onAccessibilityAction}
          style={module61.compose(this.props.style, this.state.extraUnderlayStyle)}
          onLayout={this.props.onLayout}
          hitSlop={this.props.hitSlop}
          isTVSelectable
          tvParallaxProperties={this.props.tvParallaxProperties}
          hasTVPreferredFocus={this.props.hasTVPreferredFocus}
          nextFocusDown={this.props.nextFocusDown}
          nextFocusForward={this.props.nextFocusForward}
          nextFocusLeft={this.props.nextFocusLeft}
          nextFocusRight={this.props.nextFocusRight}
          nextFocusUp={this.props.nextFocusUp}
          focusable={false !== this.props.focusable && undefined !== this.props.onPress}
          onClick={this.touchableHandlePress}
          onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
          onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
          onResponderGrant={this.touchableHandleResponderGrant}
          onResponderMove={this.touchableHandleResponderMove}
          onResponderRelease={this.touchableHandleResponderRelease}
          onResponderTerminate={this.touchableHandleResponderTerminate}
          nativeID={this.props.nativeID}
          testID={this.props.testID}
        >
          <t style={module61.compose(t.props.style, this.state.extraChildStyle)} />
          {module204.renderDebugView({
            color: 'green',
            hitSlop: this.props.hitSlop,
          })}
        </module84>
      );
    },
  });

module.exports = F;
