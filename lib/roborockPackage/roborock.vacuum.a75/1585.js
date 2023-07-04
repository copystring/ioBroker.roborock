globals = require('./1521');

var module1522 = require('./1522'),
  module1549 = require('./1549'),
  module1580 = require('./1580'),
  module1526 = require('./1526').f;

module.exports = function (t) {
  var b = module1522.Symbol || (module1522.Symbol = module1549 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1526(b, t, {
      value: module1580.f(t),
    });
};
