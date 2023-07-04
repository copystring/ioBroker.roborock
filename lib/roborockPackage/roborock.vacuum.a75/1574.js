var module1548 = require('./1548')('wks'),
  module1550 = require('./1550'),
  module1521 = require('./1521').Symbol,
  f = 'function' == typeof module1521;

(module.exports = function (u) {
  return module1548[u] || (module1548[u] = (f && ('function' == typeof module1521 ? module1521[u] : '@@name')) || (f ? module1521 : module1550)('Symbol.' + u));
}).store = module1548;
