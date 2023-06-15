var module1540 = require('./1540'),
  module1545 = require('./1545'),
  module1547 = require('./1547');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1540(o),
      _ = module1545(v.length),
      h = module1547(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
