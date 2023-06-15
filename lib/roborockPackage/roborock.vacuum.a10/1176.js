var module1177 = require('./1177'),
  module1141 = require('./1141'),
  module1180 = require('./1180'),
  u = {};

require('./1132')(u, require('./1181')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1177(u, {
    next: module1141(1, f),
  });
  module1180(c, s + ' Iterator');
};
