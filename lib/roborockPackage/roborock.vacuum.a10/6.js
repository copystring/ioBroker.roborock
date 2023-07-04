module.exports = function (t) {
  if (undefined === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
};

module.exports.default = module.exports;
module.exports.__esModule = true;
