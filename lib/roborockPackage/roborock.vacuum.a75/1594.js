exports.__esModule = true;

var module1595 = require('./1595'),
  module1599 = require('./1599'),
  module1561 = require('./1561');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1561.default(l)));
  n.prototype = module1599.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1595.default ? module1595.default(n, l) : (n.__proto__ = l);
};
