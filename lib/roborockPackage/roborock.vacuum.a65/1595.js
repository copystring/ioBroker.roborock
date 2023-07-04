exports.__esModule = true;

var module1596 = require('./1596'),
  module1600 = require('./1600'),
  module1562 = require('./1562');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1562.default(l)));
  n.prototype = module1600.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1596.default ? module1596.default(n, l) : (n.__proto__ = l);
};
