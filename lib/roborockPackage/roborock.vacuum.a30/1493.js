var module1467 = require('./1467')('wks'),
  module1469 = require('./1469'),
  module1440 = require('./1440').Symbol,
  f = 'function' == typeof module1440;

(module.exports = function (u) {
  return module1467[u] || (module1467[u] = (f && ('function' == typeof module1440 ? module1440[u] : '@@name')) || (f ? module1440 : module1469)('Symbol.' + u));
}).store = module1467;
