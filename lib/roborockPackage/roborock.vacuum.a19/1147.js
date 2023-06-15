var module1144 = require('./1144'),
  module1148 = require('./1148'),
  module1152 = require('./1152')(false),
  module1156 = require('./1156')('IE_PROTO');

module.exports = function (f, h) {
  var p,
    s = module1148(f),
    _ = 0,
    c = [];

  for (p in s) p != module1156 && module1144(s, p) && c.push(p);

  for (; h.length > _; ) module1144(s, (p = h[_++])) && (~module1152(c, p) || c.push(p));

  return c;
};
