function t(o, s) {
  module.exports = t =
    Object.setPrototypeOf ||
    function (t, o) {
      t.__proto__ = o;
      return t;
    };

  module.exports.default = module.exports;
  module.exports.__esModule = true;
  return t(o, s);
}

module.exports = t;
module.exports.default = module.exports;
module.exports.__esModule = true;
