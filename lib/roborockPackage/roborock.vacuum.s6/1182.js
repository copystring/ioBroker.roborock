var module1135 = require('./1135').f,
  module1144 = require('./1144'),
  module1183 = require('./1183')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1144((f = c ? f : f.prototype), module1183))
    module1135(f, module1183, {
      configurable: true,
      value: u,
    });
};
