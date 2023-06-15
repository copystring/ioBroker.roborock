var module1469 = require('./1469')('keys'),
  module1471 = require('./1471');

module.exports = function (o) {
  return module1469[o] || (module1469[o] = module1471(o));
};
