globals = require('./1128');

var module1129 = require('./1129'),
  module1156 = require('./1156'),
  module1187 = require('./1187'),
  module1133 = require('./1133').f;

module.exports = function (t) {
  var b = module1129.Symbol || (module1129.Symbol = module1156 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1133(b, t, {
      value: module1187.f(t),
    });
};
