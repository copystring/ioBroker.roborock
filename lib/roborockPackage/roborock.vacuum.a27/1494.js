var module1447 = require('./1447').f,
  module1456 = require('./1456'),
  module1495 = require('./1495')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1456((f = c ? f : f.prototype), module1495))
    module1447(f, module1495, {
      configurable: true,
      value: u,
    });
};
