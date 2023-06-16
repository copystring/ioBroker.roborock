var module1536 = require('./1536'),
  module1540 = require('./1540'),
  module1544 = require('./1544')(false),
  module1548 = require('./1548')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1540(f),
    _ = 0,
    c = [];

  for (p in s) p != module1548 && module1536(s, p) && c.push(p);

  for (; h.length > _; ) module1536(s, (p = h[_++])) && (~module1544(c, p) || c.push(p));

  return c;
};
