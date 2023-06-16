function t(o) {
  module.exports = t = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      };
  module.exports.default = module.exports;
  module.exports.__esModule = true;
  return t(o);
}

module.exports = t;
module.exports.default = module.exports;
module.exports.__esModule = true;
