var module1571 = require('./1571'),
  module1535 = require('./1535'),
  module1574 = require('./1574'),
  u = {};

require('./1526')(u, require('./1575')('iterator'), function () {
  return this;
});

module.exports = function (c, s, f) {
  c.prototype = module1571(u, {
    next: module1535(1, f),
  });
  module1574(c, s + ' Iterator');
};
