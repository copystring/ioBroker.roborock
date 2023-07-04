var module1548 = require('./1548')('keys'),
  module1550 = require('./1550');

module.exports = function (o) {
  return module1548[o] || (module1548[o] = module1550(o));
};
