var module1549 = require('./1549')('wks'),
  module1551 = require('./1551'),
  module1522 = require('./1522').Symbol,
  f = 'function' == typeof module1522;

(module.exports = function (u) {
  return module1549[u] || (module1549[u] = (f && ('function' == typeof module1522 ? module1522[u] : '@@name')) || (f ? module1522 : module1551)('Symbol.' + u));
}).store = module1549;
