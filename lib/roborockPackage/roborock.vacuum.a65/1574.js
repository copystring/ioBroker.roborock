var module1527 = require('./1527').f,
  module1536 = require('./1536'),
  module1575 = require('./1575')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1536((f = c ? f : f.prototype), module1575))
    module1527(f, module1575, {
      configurable: true,
      value: u,
    });
};
