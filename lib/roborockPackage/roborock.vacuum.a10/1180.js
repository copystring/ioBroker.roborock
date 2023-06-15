var module1133 = require('./1133').f,
  module1142 = require('./1142'),
  module1181 = require('./1181')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1142((f = c ? f : f.prototype), module1181))
    module1133(f, module1181, {
      configurable: true,
      value: u,
    });
};
