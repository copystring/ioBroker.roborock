var module10 = require('./10').default,
  module6 = require('./6');

module.exports = function (n, u) {
  if (u && ('object' === module10(u) || 'function' == typeof u)) return u;
  if (undefined !== u) throw new TypeError('Derived constructors may only return object or undefined');
  return module6(n);
};

module.exports.default = module.exports;
module.exports.__esModule = true;
