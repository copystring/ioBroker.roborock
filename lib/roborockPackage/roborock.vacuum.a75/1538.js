var module1535 = require('./1535'),
  module1539 = require('./1539'),
  module1543 = require('./1543')(false),
  module1547 = require('./1547')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1539(f),
    _ = 0,
    c = [];

  for (p in s) p != module1547 && module1535(s, p) && c.push(p);

  for (; h.length > _; ) module1535(s, (p = h[_++])) && (~module1543(c, p) || c.push(p));

  return c;
};
