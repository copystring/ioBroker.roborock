var module1142 = require('./1142'),
  module1146 = require('./1146'),
  module1150 = require('./1150')(false),
  module1154 = require('./1154')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1146(f),
    _ = 0,
    c = [];

  for (p in s) p != module1154 && module1142(s, p) && c.push(p);

  for (; h.length > _; ) module1142(s, (p = h[_++])) && (~module1150(c, p) || c.push(p));

  return c;
};
