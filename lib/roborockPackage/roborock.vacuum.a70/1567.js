var module1520 = require('./1520').f,
  module1529 = require('./1529'),
  module1568 = require('./1568')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1529((f = c ? f : f.prototype), module1568))
    module1520(f, module1568, {
      configurable: true,
      value: u,
    });
};
