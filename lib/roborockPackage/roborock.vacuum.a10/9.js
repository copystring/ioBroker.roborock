var module10 = require('./10').default,
  module6 = require('./6');

module.exports = function (n, u) {
  return !u || ('object' !== module10(u) && 'function' != typeof u) ? module6(n) : u;
};

module.exports.default = module.exports;
module.exports.__esModule = true;
