globals = require('./1130');

var module1131 = require('./1131'),
  module1158 = require('./1158'),
  module1189 = require('./1189'),
  module1135 = require('./1135').f;

module.exports = function (t) {
  var b = module1131.Symbol || (module1131.Symbol = module1158 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1135(b, t, {
      value: module1189.f(t),
    });
};
