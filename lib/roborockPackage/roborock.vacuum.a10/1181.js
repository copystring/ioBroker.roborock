var module1155 = require('./1155')('wks'),
  module1157 = require('./1157'),
  module1128 = require('./1128').Symbol,
  f = 'function' == typeof module1128;

(module.exports = function (u) {
  return module1155[u] || (module1155[u] = (f && ('function' == typeof module1128 ? module1128[u] : '@@name')) || (f ? module1128 : module1157)('Symbol.' + u));
}).store = module1155;
