exports.__esModule = true;

var module1516 = require('./1516'),
  module1520 = require('./1520'),
  module1482 = require('./1482');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1482.default(l)));
  n.prototype = module1520.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1516.default ? module1516.default(n, l) : (n.__proto__ = l);
};
