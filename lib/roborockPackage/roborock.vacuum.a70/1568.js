var module1542 = require('./1542')('wks'),
  module1544 = require('./1544'),
  module1515 = require('./1515').Symbol,
  f = 'function' == typeof module1515;

(module.exports = function (u) {
  return module1542[u] || (module1542[u] = (f && ('function' == typeof module1515 ? module1515[u] : '@@name')) || (f ? module1515 : module1544)('Symbol.' + u));
}).store = module1542;
