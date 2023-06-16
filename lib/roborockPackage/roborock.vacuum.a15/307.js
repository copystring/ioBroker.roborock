var module308 = require('@babel/runtime/helpers/interopRequireDefault')(require('./308')),
  n = module308.default
    ? module308.default.getConstants()
    : {
        isRTL: false,
        doLeftAndRightSwapInRTL: true,
      };

module.exports = {
  getConstants: function () {
    return n;
  },
  allowRTL: function (n) {
    if (module308.default) module308.default.allowRTL(n);
  },
  forceRTL: function (n) {
    if (module308.default) module308.default.forceRTL(n);
  },
  swapLeftAndRightInRTL: function (n) {
    if (module308.default) module308.default.swapLeftAndRightInRTL(n);
  },
  isRTL: n.isRTL,
  doLeftAndRightSwapInRTL: n.doLeftAndRightSwapInRTL,
};
