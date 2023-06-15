var module50 = require('./50');

function o(t, o) {
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

function n(n) {
  for (var s = 1; s < arguments.length; s++) {
    var c = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      o(Object(c), true).forEach(function (o) {
        module50(n, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(c));
    else
      o(Object(c)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return n;
}

function s(t, o) {
  var n;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (n = c(t)) || (o && t && 'number' == typeof t.length)) {
      if (n) t = n;
      var s = 0;
      return function () {
        return s >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[s++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (n = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(n);
}

function c(t, o) {
  if (t) {
    if ('string' == typeof t) return l(t, o);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === n && t.constructor) n = t.constructor.name;
    return 'Map' === n || 'Set' === n ? Array.from(t) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(t, o) : undefined;
  }
}

function l(t, o) {
  if (null == o || o > t.length) o = t.length;

  for (var n = 0, s = new Array(o); n < o; n++) s[n] = t[n];

  return s;
}

var module200 = require('./200'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module204 = require('./204'),
  module84 = require('./84'),
  module215 = require('./215'),
  module219 = require('./219'),
  module220 = require('./220').DeprecatedAccessibilityRoles,
  O = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30,
  },
  v = [
    'accessibilityLabel',
    'accessibilityHint',
    'accessibilityIgnoresInvertColors',
    'accessibilityRole',
    'accessibilityStates',
    'accessibilityState',
    'accessibilityActions',
    'onAccessibilityAction',
    'hitSlop',
    'nativeID',
    'onBlur',
    'onFocus',
    'onLayout',
    'testID',
  ],
  R = module215({
    displayName: 'TouchableWithoutFeedback',
    mixins: [module204.Mixin],
    propTypes: {
      accessible: PropTypes.bool,
      accessibilityLabel: PropTypes.node,
      accessibilityHint: PropTypes.string,
      accessibilityIgnoresInvertColors: PropTypes.bool,
      accessibilityRole: PropTypes.oneOf(module220),
      accessibilityStates: PropTypes.array,
      accessibilityState: PropTypes.object,
      accessibilityActions: PropTypes.array,
      onAccessibilityAction: PropTypes.func,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      disabled: PropTypes.bool,
      onPress: PropTypes.func,
      onPressIn: PropTypes.func,
      onPressOut: PropTypes.func,
      onLayout: PropTypes.func,
      touchSoundDisabled: PropTypes.bool,
      onLongPress: PropTypes.func,
      nativeID: PropTypes.string,
      testID: PropTypes.string,
      delayPressIn: PropTypes.number,
      delayPressOut: PropTypes.number,
      delayLongPress: PropTypes.number,
      pressRetentionOffset: module200,
      hitSlop: module200,
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
      return this.props.pressRetentionOffset || O;
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
    render: function () {
      var t = React.Children.only(this.props.children),
        o = t.props.children;
      if (module204.TOUCH_TARGET_DEBUG && t.type === module84)
        (o = React.Children.toArray(o)).push(
          module204.renderDebugView({
            color: 'red',
            hitSlop: this.props.hitSlop,
          })
        );

      for (var c, l = {}, u = s(v); !(c = u()).done; ) {
        var b = c.value;
        if (undefined !== this.props[b]) l[b] = this.props[b];
      }

      return React.cloneElement(
        t,
        n(
          n({}, l),
          {},
          {
            accessible: false !== this.props.accessible,
            focusable: false !== this.props.focusable && undefined !== this.props.onPress,
            onClick: this.touchableHandlePress,
            onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
            onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
            onResponderGrant: this.touchableHandleResponderGrant,
            onResponderMove: this.touchableHandleResponderMove,
            onResponderRelease: this.touchableHandleResponderRelease,
            onResponderTerminate: this.touchableHandleResponderTerminate,
            children: o,
          }
        )
      );
    },
  });

module.exports = R;
