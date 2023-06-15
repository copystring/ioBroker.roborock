var module491 = require('./491').strings;

exports.getCleanMethods = function () {
  return [module491.clean_method_clean, module491.clean_method_mop, module491.clean_method_clean_and_mop];
};

exports.CleanMethodNoSet = 3;
exports.CleanMethodClean = 0;
exports.CleanMethodMop = 1;
exports.CleanMethodCleanAndMop = 2;
