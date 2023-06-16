var module1252 = require('./1252')('wks'),
  module1254 = require('./1254'),
  module1225 = require('./1225').Symbol,
  f = 'function' == typeof module1225;

(module.exports = function (u) {
  return module1252[u] || (module1252[u] = (f && ('function' == typeof module1225 ? module1225[u] : '@@name')) || (f ? module1225 : module1254)('Symbol.' + u));
}).store = module1252;
