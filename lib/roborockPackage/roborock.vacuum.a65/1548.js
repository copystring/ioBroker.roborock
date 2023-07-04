var module1549 = require('./1549')('keys'),
  module1551 = require('./1551');

module.exports = function (o) {
  return module1549[o] || (module1549[o] = module1551(o));
};
