var module18 = require('@babel/runtime/helpers/interopRequireDefault')(require('./18')),
  module39 = require('./39'),
  module46 = require('./46'),
  s = new Map(),
  c = {
    isBoldTextEnabled: function () {
      return Promise.resolve(false);
    },
    isGrayscaleEnabled: function () {
      return Promise.resolve(false);
    },
    isInvertColorsEnabled: function () {
      return Promise.resolve(false);
    },
    isReduceMotionEnabled: function () {
      return new Promise(function (t, o) {
        if (module18.default) module18.default.isReduceMotionEnabled(t);
        else o(false);
      });
    },
    isReduceTransparencyEnabled: function () {
      return Promise.resolve(false);
    },
    isScreenReaderEnabled: function () {
      return new Promise(function (t, o) {
        if (module18.default) module18.default.isTouchExplorationEnabled(t);
        else o(false);
      });
    },

    get fetch() {
      return this.isScreenReaderEnabled;
    },

    addEventListener: function (n, o) {
      var c;
      if ('change' === n || 'screenReaderChanged' === n)
        c = module39.addListener('touchExplorationDidChange', function (n) {
          o(n);
        });
      else if ('reduceMotionChanged' === n)
        c = module39.addListener('reduceMotionDidChange', function (n) {
          o(n);
        });
      s.set(o, c);
    },
    removeEventListener: function (n, t) {
      var o = s.get(t);

      if (o) {
        o.remove();
        s.delete(t);
      }
    },
    setAccessibilityFocus: function (n) {
      module46.sendAccessibilityEvent(n, module46.getConstants().AccessibilityEventTypes.typeViewFocused);
    },
    announceForAccessibility: function (t) {
      if (module18.default) module18.default.announceForAccessibility(t);
    },
  };

module.exports = c;
