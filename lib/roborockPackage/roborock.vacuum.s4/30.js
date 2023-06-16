var module31 = require('./31'),
  module32 = require('./32'),
  module25 = require('./25'),
  module33 = require('./33');

module.exports = function (u) {
  return module31(u) || module32(u) || module25(u) || module33();
};

module.exports.default = module.exports;
module.exports.__esModule = true;
