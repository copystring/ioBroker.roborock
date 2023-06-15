var module1449 = require('./1449'),
  module1442 = require('./1442').document,
  c = module1449(module1442) && module1449(module1442.createElement);

module.exports = function (t) {
  return c ? module1442.createElement(t) : {};
};
