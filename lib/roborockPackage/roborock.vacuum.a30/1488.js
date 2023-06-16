var module1489 = require('./1489'),
  module1453 = require('./1453'),
  module1492 = require('./1492'),
  u = {};

require('./1444')(u, require('./1493')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1489(u, {
    next: module1453(1, f),
  });
  module1492(c, s + ' Iterator');
};
