var module1542 = require('./1542')('keys'),
  module1544 = require('./1544');

module.exports = function (o) {
  return module1542[o] || (module1542[o] = module1544(o));
};
