var module49 = require('./49');

function n(t, n) {
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

function o(o) {
  for (var s = 1; s < arguments.length; s++) {
    var c = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      n(Object(c), true).forEach(function (n) {
        module49(o, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(c));
    else
      n(Object(c)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return o;
}

function s(t, n) {
  var o = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (o) return (o = o.call(t)).next.bind(o);

  if (Array.isArray(t) || (o = c(t)) || (n && t && 'number' == typeof t.length)) {
    if (o) t = o;
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

function c(t, n) {
  if (t) {
    if ('string' == typeof t) return l(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? l(t, n) : undefined;
  }
}

function l(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, s = new Array(n); o < n; o++) s[o] = t[o];

  return s;
}

var module198 = require('./198'),
  React = require('react'),
  PropTypes = require('prop-types'),
  module202 = require('./202'),
  module83 = require('./83'),
  module213 = require('./213'),
  module215 = require('./215'),
  module216 = require('./216').DeprecatedAccessibilityRoles,
  S = {
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
  R = module213({
    displayName: 'TouchableWithoutFeedback',
    mixins: [module202.Mixin],
    propTypes: {
      accessible: PropTypes.bool,
      accessibilityLabel: PropTypes.node,
      accessibilityHint: PropTypes.string,
      accessibilityIgnoresInvertColors: PropTypes.bool,
      accessibilityRole: PropTypes.oneOf(module216),
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
      pressRetentionOffset: module198,
      hitSlop: module198,
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
      return this.props.pressRetentionOffset || S;
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
        n = t.props.children;
      if (module202.TOUCH_TARGET_DEBUG && t.type === module83)
        (n = React.Children.toArray(n)).push(
          module202.renderDebugView({
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
        o(
          o({}, l),
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
            children: n,
          }
        )
      );
    },
  });

module.exports = R;
