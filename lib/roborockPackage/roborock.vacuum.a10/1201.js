exports.__esModule = true;

var module1202 = require('./1202'),
  module1206 = require('./1206'),
  module1168 = require('./1168');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1168.default(l)));
  n.prototype = module1206.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1202.default ? module1202.default(n, l) : (n.__proto__ = l);
};
