var module370 = require('@babel/runtime/helpers/interopRequireDefault')(require('./370')),
  s = {
    SHORT: module370.default.getConstants().SHORT,
    LONG: module370.default.getConstants().LONG,
    TOP: module370.default.getConstants().TOP,
    BOTTOM: module370.default.getConstants().BOTTOM,
    CENTER: module370.default.getConstants().CENTER,
    show: function (s, n) {
      module370.default.show(s, n);
    },
    showWithGravity: function (s, n, f) {
      module370.default.showWithGravity(s, n, f);
    },
    showWithGravityAndOffset: function (s, n, f, o, u) {
      module370.default.showWithGravityAndOffset(s, n, f, o, u);
    },
  };

module.exports = s;
