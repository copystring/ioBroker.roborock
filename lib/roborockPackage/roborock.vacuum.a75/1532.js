var module1528 = require('./1528'),
  module1521 = require('./1521').document,
  c = module1528(module1521) && module1528(module1521.createElement);

module.exports = function (t) {
  return c ? module1521.createElement(t) : {};
};
