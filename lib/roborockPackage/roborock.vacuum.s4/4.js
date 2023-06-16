module.exports = function (o, n) {
  if (!(o instanceof n)) throw new TypeError('Cannot call a class as a function');
};

module.exports.default = module.exports;
module.exports.__esModule = true;
