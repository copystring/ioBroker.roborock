exports.__esModule = true;

var module1299 = require('./1299'),
  module1303 = require('./1303'),
  module1265 = require('./1265');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1265.default(l)));
  n.prototype = module1303.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1299.default ? module1299.default(n, l) : (n.__proto__ = l);
};
