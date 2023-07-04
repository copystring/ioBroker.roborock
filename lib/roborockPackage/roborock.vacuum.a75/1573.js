var module1526 = require('./1526').f,
  module1535 = require('./1535'),
  module1574 = require('./1574')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1535((f = c ? f : f.prototype), module1574))
    module1526(f, module1574, {
      configurable: true,
      value: u,
    });
};
