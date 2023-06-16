var module500 = require('./500').strings;

exports.getCleanMethods = function () {
  return [module500.clean_method_clean, module500.clean_method_mop, module500.clean_method_clean_and_mop];
};

exports.CleanMethodNoSet = 3;
exports.CleanMethodClean = 0;
exports.CleanMethodMop = 1;
exports.CleanMethodCleanAndMop = 2;
