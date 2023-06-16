var module23 = require('./23'),
  module24 = require('./24'),
  module25 = require('./25'),
  module27 = require('./27');

module.exports = function (u, p) {
  return module23(u) || module24(u, p) || module25(u, p) || module27();
};

module.exports.default = module.exports;
module.exports.__esModule = true;
