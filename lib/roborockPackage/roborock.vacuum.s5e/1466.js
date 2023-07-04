var module1467 = require('./1467')('keys'),
  module1469 = require('./1469');

module.exports = function (o) {
  return module1467[o] || (module1467[o] = module1469(o));
};
