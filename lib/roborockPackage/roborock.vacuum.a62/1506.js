globals = require('./1442');

var module1443 = require('./1443'),
  module1470 = require('./1470'),
  module1501 = require('./1501'),
  module1447 = require('./1447').f;

module.exports = function (t) {
  var b = module1443.Symbol || (module1443.Symbol = module1470 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1447(b, t, {
      value: module1501.f(t),
    });
};
