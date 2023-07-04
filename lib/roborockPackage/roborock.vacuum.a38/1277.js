var module1230 = require('./1230').f,
  module1239 = require('./1239'),
  module1278 = require('./1278')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1239((f = c ? f : f.prototype), module1278))
    module1230(f, module1278, {
      configurable: true,
      value: u,
    });
};
