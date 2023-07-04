module.exports = function () {
  throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
};

module.exports.default = module.exports;
module.exports.__esModule = true;
