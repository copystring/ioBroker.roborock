var module374 = require('@babel/runtime/helpers/interopRequireDefault')(require('./374')),
  s = {
    SHORT: module374.default.getConstants().SHORT,
    LONG: module374.default.getConstants().LONG,
    TOP: module374.default.getConstants().TOP,
    BOTTOM: module374.default.getConstants().BOTTOM,
    CENTER: module374.default.getConstants().CENTER,
    show: function (s, n) {
      module374.default.show(s, n);
    },
    showWithGravity: function (s, n, f) {
      module374.default.showWithGravity(s, n, f);
    },
    showWithGravityAndOffset: function (s, n, f, o, u) {
      module374.default.showWithGravityAndOffset(s, n, f, o, u);
    },
  };

module.exports = s;
