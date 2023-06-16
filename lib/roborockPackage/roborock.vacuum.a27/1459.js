var module1456 = require('./1456'),
  module1460 = require('./1460'),
  module1464 = require('./1464')(false),
  module1468 = require('./1468')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1460(f),
    _ = 0,
    c = [];

  for (p in s) p != module1468 && module1456(s, p) && c.push(p);

  for (; h.length > _; ) module1456(s, (p = h[_++])) && (~module1464(c, p) || c.push(p));

  return c;
};
