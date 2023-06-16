var module304 = require('@babel/runtime/helpers/interopRequireDefault')(require('./304')),
  n = module304.default
    ? module304.default.getConstants()
    : {
        isRTL: false,
        doLeftAndRightSwapInRTL: true,
      };

module.exports = {
  getConstants: function () {
    return n;
  },
  allowRTL: function (n) {
    if (module304.default) module304.default.allowRTL(n);
  },
  forceRTL: function (n) {
    if (module304.default) module304.default.forceRTL(n);
  },
  swapLeftAndRightInRTL: function (n) {
    if (module304.default) module304.default.swapLeftAndRightInRTL(n);
  },
  isRTL: n.isRTL,
  doLeftAndRightSwapInRTL: n.doLeftAndRightSwapInRTL,
};
