var module1529 = require('./1529'),
  module1533 = require('./1533'),
  module1537 = require('./1537')(false),
  module1541 = require('./1541')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1533(f),
    _ = 0,
    c = [];

  for (p in s) p != module1541 && module1529(s, p) && c.push(p);

  for (; h.length > _; ) module1529(s, (p = h[_++])) && (~module1537(c, p) || c.push(p));

  return c;
};
