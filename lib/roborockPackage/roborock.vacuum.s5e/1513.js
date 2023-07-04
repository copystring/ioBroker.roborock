exports.__esModule = true;

var module1514 = require('./1514'),
  module1518 = require('./1518'),
  module1480 = require('./1480');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1480.default(l)));
  n.prototype = module1518.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1514.default ? module1514.default(n, l) : (n.__proto__ = l);
};
