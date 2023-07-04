var module1469 = require('./1469')('wks'),
  module1471 = require('./1471'),
  module1442 = require('./1442').Symbol,
  f = 'function' == typeof module1442;

(module.exports = function (u) {
  return module1469[u] || (module1469[u] = (f && ('function' == typeof module1442 ? module1442[u] : '@@name')) || (f ? module1442 : module1471)('Symbol.' + u));
}).store = module1469;
