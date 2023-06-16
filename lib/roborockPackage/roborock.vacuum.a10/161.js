require('./51');

var module46 = require('./46'),
  t = null,
  u = new Set();

module.exports = {
  currentlyFocusedField: function () {
    return t;
  },
  focusTextInput: function (u) {
    if (t !== u && null !== u) {
      t = u;
      module46.dispatchViewManagerCommand(u, module46.getViewManagerConfig('AndroidTextInput').Commands.focusTextInput, null);
    }
  },
  blurTextInput: function (u) {
    if (t === u && null !== u) {
      t = null;
      module46.dispatchViewManagerCommand(u, module46.getViewManagerConfig('AndroidTextInput').Commands.blurTextInput, null);
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
