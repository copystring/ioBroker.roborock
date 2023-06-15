globals = require('./1440');

var module1441 = require('./1441'),
  module1468 = require('./1468'),
  module1499 = require('./1499'),
  module1445 = require('./1445').f;

module.exports = function (t) {
  var b = module1441.Symbol || (module1441.Symbol = module1468 ? {} : globals.Symbol || {});
  if (!('_' == t.charAt(0) || t in b))
    module1445(b, t, {
      value: module1499.f(t),
    });
};
