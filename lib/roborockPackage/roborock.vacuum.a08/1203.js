exports.__esModule = true;

var module1204 = require('./1204'),
  module1208 = require('./1208'),
  module1170 = require('./1170');

exports.default = function (n, l) {
  if ('function' != typeof l && null !== l)
    throw new TypeError('Super expression must either be null or a function, not ' + (undefined === l ? 'undefined' : module1170.default(l)));
  n.prototype = module1208.default(l && l.prototype, {
    constructor: {
      value: n,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (l) module1204.default ? module1204.default(n, l) : (n.__proto__ = l);
};
