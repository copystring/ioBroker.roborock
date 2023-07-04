var module505 = require('./505').strings;

exports.getCleanMethods = function () {
  return [module505.clean_method_clean, module505.clean_method_mop, module505.clean_method_clean_and_mop];
};

exports.CleanMethodNoSet = 3;
exports.CleanMethodClean = 0;
exports.CleanMethodMop = 1;
exports.CleanMethodCleanAndMop = 2;
