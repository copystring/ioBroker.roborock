var module1570 = require('./1570'),
  module1534 = require('./1534'),
  module1573 = require('./1573'),
  u = {};

require('./1525')(u, require('./1574')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1570(u, {
    next: module1534(1, f),
  });
  module1573(c, s + ' Iterator');
};
