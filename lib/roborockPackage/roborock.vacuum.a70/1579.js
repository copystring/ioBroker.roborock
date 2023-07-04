globals = require('./1515');

var module1516 = require('./1516'),
  module1543 = require('./1543'),
  module1574 = require('./1574'),
  module1520 = require('./1520').f;

module.exports = function (t) {
  var b = module1516.Symbol || (module1516.Symbol = module1543 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1520(b, t, {
      value: module1574.f(t),
    });
};
