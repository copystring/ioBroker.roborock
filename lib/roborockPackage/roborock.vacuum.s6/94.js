module.exports = function (t) {
  return -1 !== Function.toString.call(t).indexOf('[native code]');
};

module.exports.default = module.exports;
module.exports.__esModule = true;
