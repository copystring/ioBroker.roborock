globals = require('./1225');

var module1226 = require('./1226'),
  module1253 = require('./1253'),
  module1284 = require('./1284'),
  module1230 = require('./1230').f;

module.exports = function (t) {
  var b = module1226.Symbol || (module1226.Symbol = module1253 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1230(b, t, {
      value: module1284.f(t),
    });
};
