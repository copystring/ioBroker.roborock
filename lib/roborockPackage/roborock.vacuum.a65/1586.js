globals = require('./1522');

var module1523 = require('./1523'),
  module1550 = require('./1550'),
  module1581 = require('./1581'),
  module1527 = require('./1527').f;

module.exports = function (t) {
  var b = module1523.Symbol || (module1523.Symbol = module1550 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1527(b, t, {
      value: module1581.f(t),
    });
};
