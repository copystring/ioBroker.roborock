var module510 = require('./510').strings;

exports.getCleanMethods = function () {
  return [module510.clean_method_clean, module510.clean_method_mop, module510.clean_method_clean_and_mop];
};

exports.CleanMethodNoSet = 3;
exports.CleanMethodClean = 0;
exports.CleanMethodMop = 1;
exports.CleanMethodCleanAndMop = 2;
