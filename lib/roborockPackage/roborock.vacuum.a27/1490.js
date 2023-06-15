var module1491 = require('./1491'),
  module1455 = require('./1455'),
  module1494 = require('./1494'),
  u = {};

require('./1446')(u, require('./1495')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1491(u, {
    next: module1455(1, f),
  });
  module1494(c, s + ' Iterator');
};
