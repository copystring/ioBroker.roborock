module.exports = function (o) {
  throw new TypeError('"' + o + '" is read-only');
};

module.exports.default = module.exports;
module.exports.__esModule = true;
