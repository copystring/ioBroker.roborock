var module1239 = require('./1239'),
  module1243 = require('./1243'),
  module1247 = require('./1247')(false),
  module1251 = require('./1251')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1243(f),
    _ = 0,
    c = [];

  for (p in s) p != module1251 && module1239(s, p) && c.push(p);

  for (; h.length > _; ) module1239(s, (p = h[_++])) && (~module1247(c, p) || c.push(p));

  return c;
};
