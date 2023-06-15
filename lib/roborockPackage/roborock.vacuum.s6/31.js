var module26 = require('./26');

module.exports = function (o) {
  if (Array.isArray(o)) return module26(o);
};

module.exports.default = module.exports;
module.exports.__esModule = true;
