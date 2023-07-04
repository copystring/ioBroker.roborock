var module1274 = require('./1274'),
  module1238 = require('./1238'),
  module1277 = require('./1277'),
  u = {};

require('./1229')(u, require('./1278')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1274(u, {
    next: module1238(1, f),
  });
  module1277(c, s + ' Iterator');
};
