var module19 = require('@babel/runtime/helpers/interopRequireDefault')(require('./19')),
  module40 = require('./40'),
  module47 = require('./47'),
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
        if (module19.default) module19.default.isReduceMotionEnabled(t);
        else o(false);
      });
    },
    isReduceTransparencyEnabled: function () {
      return Promise.resolve(false);
    },
    isScreenReaderEnabled: function () {
      return new Promise(function (t, o) {
        if (module19.default) module19.default.isTouchExplorationEnabled(t);
        else o(false);
      });
    },

    get fetch() {
      return this.isScreenReaderEnabled;
    },

    addEventListener: function (n, o) {
      var c;
      if ('change' === n || 'screenReaderChanged' === n)
        c = module40.addListener('touchExplorationDidChange', function (n) {
          o(n);
        });
      else if ('reduceMotionChanged' === n)
        c = module40.addListener('reduceMotionDidChange', function (n) {
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
      module47.sendAccessibilityEvent(n, module47.getConstants().AccessibilityEventTypes.typeViewFocused);
    },
    announceForAccessibility: function (t) {
      if (module19.default) module19.default.announceForAccessibility(t);
    },
  };

module.exports = c;
