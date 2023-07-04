var module49 = require('./49');

function c(t, c) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    if (c)
      n = n.filter(function (c) {
        return Object.getOwnPropertyDescriptor(t, c).enumerable;
      });
    s.push.apply(s, n);
  }

  return s;
}

function s(s) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      c(Object(o), true).forEach(function (c) {
        module49(s, c, o[c]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(s, Object.getOwnPropertyDescriptors(o));
    else
      c(Object(o)).forEach(function (t) {
        Object.defineProperty(s, t, Object.getOwnPropertyDescriptor(o, t));
      });
  }

  return s;
}

var module64 = {
    pointerEvents: true,
    accessible: true,
    accessibilityActions: true,
    accessibilityLabel: true,
    accessibilityLiveRegion: true,
    accessibilityRole: true,
    accessibilityStates: true,
    accessibilityState: true,
    accessibilityHint: true,
    importantForAccessibility: true,
    nativeID: true,
    testID: true,
    renderToHardwareTextureAndroid: true,
    shouldRasterizeIOS: true,
    onLayout: true,
    onAccessibilityAction: true,
    onAccessibilityTap: true,
    onMagicTap: true,
    onAccessibilityEscape: true,
    collapsable: true,
    needsOffscreenAlphaCompositing: true,
    style: require('./64'),
  },
  o = {
    UIView: module64,
    RCTView: s(
      s({}, module64),
      {},
      {
        removeClippedSubviews: true,
      }
    ),
  };
module.exports = o;
