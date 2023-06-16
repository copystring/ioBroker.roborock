exports.__esModule = true;

var module1589 = require('./1589'),
  module1593 = require('./1593'),
  module1555 = require('./1555');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1555.default(l)));
  n.prototype = module1593.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1589.default ? module1589.default(n, l) : (n.__proto__ = l);
};
