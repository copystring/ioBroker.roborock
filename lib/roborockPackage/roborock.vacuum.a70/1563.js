var module1564 = require('./1564'),
  module1528 = require('./1528'),
  module1567 = require('./1567'),
  u = {};

require('./1519')(u, require('./1568')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1564(u, {
    next: module1528(1, f),
  });
  module1567(c, s + ' Iterator');
};
