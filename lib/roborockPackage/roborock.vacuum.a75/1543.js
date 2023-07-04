var module1539 = require('./1539'),
  module1544 = require('./1544'),
  module1546 = require('./1546');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1539(o),
      _ = module1544(v.length),
      h = module1546(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
