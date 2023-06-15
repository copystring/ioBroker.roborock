require('./52');

var module47 = require('./47'),
  t = null,
  u = new Set();

module.exports = {
  currentlyFocusedField: function () {
    return t;
  },
  focusTextInput: function (u) {
    if (t !== u && null !== u) {
      t = u;
      module47.dispatchViewManagerCommand(u, module47.getViewManagerConfig('AndroidTextInput').Commands.focusTextInput, null);
    }
  },
  blurTextInput: function (u) {
    if (t === u && null !== u) {
      t = null;
      module47.dispatchViewManagerCommand(u, module47.getViewManagerConfig('AndroidTextInput').Commands.blurTextInput, null);
    }
  },
  registerInput: function (n) {
    u.add(n);
  },
  unregisterInput: function (n) {
    u.delete(n);
  },
  isTextInput: function (n) {
    return u.has(n);
  },
};
