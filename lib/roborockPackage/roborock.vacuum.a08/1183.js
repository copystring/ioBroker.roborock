var module1157 = require('./1157')('wks'),
  module1159 = require('./1159'),
  module1130 = require('./1130').Symbol,
  f = 'function' == typeof module1130;

(module.exports = function (u) {
  return module1157[u] || (module1157[u] = (f && ('function' == typeof module1130 ? module1130[u] : '@@name')) || (f ? module1130 : module1159)('Symbol.' + u));
}).store = module1157;
