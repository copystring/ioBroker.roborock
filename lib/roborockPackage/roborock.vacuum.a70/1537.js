var module1533 = require('./1533'),
  module1538 = require('./1538'),
  module1540 = require('./1540');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1533(o),
      _ = module1538(v.length),
      h = module1540(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
