var module49 = require('./49');

function t(o, t) {
  var n = Object.keys(o);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(o);
    if (t)
      s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(o, t).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

var module198 = require('./198'),
  module199 = require('./199'),
  module76 = require('./76'),
  l = require(d[4]),
  PropTypes = require('prop-types'),
  module216 = require('./216'),
  u = module216.DeprecatedAccessibilityRoles,
  f = module216.DeprecatedAccessibilityStates,
  y = module199(module76);

module.exports = (function (n) {
  for (var s = 1; s < arguments.length; s++) {
    var c = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      t(Object(c), true).forEach(function (t) {
        module49(n, t, c[t]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(c));
    else
      t(Object(c)).forEach(function (o) {
        Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(c, o));
      });
  }

  return n;
})(
  {
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.node,
    accessibilityHint: PropTypes.string,
    accessibilityActions: PropTypes.arrayOf(PropTypes.string),
    accessibilityIgnoresInvertColors: PropTypes.bool,
    accessibilityRole: PropTypes.oneOf(u),
    accessibilityStates: PropTypes.arrayOf(PropTypes.oneOf(f)),
    accessibilityState: PropTypes.object,
    accessibilityLiveRegion: PropTypes.oneOf(['none', 'polite', 'assertive']),
    importantForAccessibility: PropTypes.oneOf(['auto', 'yes', 'no', 'no-hide-descendants']),
    accessibilityViewIsModal: PropTypes.bool,
    accessibilityElementsHidden: PropTypes.bool,
    onAccessibilityAction: PropTypes.func,
    onAccessibilityTap: PropTypes.func,
    onMagicTap: PropTypes.func,
    testID: PropTypes.string,
    nativeID: PropTypes.string,
    onResponderGrant: PropTypes.func,
    onResponderMove: PropTypes.func,
    onResponderReject: PropTypes.func,
    onResponderRelease: PropTypes.func,
    onResponderTerminate: PropTypes.func,
    onResponderTerminationRequest: PropTypes.func,
    onStartShouldSetResponder: PropTypes.func,
    onStartShouldSetResponderCapture: PropTypes.func,
    onMoveShouldSetResponder: PropTypes.func,
    onMoveShouldSetResponderCapture: PropTypes.func,
    hitSlop: module198,
    onLayout: PropTypes.func,
    pointerEvents: PropTypes.oneOf(['box-none', 'none', 'box-only', 'auto']),
    style: y,
    removeClippedSubviews: PropTypes.bool,
    renderToHardwareTextureAndroid: PropTypes.bool,
    shouldRasterizeIOS: PropTypes.bool,
    collapsable: PropTypes.bool,
    needsOffscreenAlphaCompositing: PropTypes.bool,
  },
  l
);
