var module1179 = require('./1179'),
  module1143 = require('./1143'),
  module1182 = require('./1182'),
  u = {};

require('./1134')(u, require('./1183')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1179(u, {
    next: module1143(1, f),
  });
  module1182(c, s + ' Iterator');
};
