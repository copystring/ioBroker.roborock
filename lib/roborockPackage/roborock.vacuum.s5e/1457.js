var module1454 = require('./1454'),
  module1458 = require('./1458'),
  module1462 = require('./1462')(false),
  module1466 = require('./1466')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1458(f),
    _ = 0,
    c = [];

  for (p in s) p != module1466 && module1454(s, p) && c.push(p);

  for (; h.length > _; ) module1454(s, (p = h[_++])) && (~module1462(c, p) || c.push(p));

  return c;
};
