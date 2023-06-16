var module1243 = require('./1243'),
  module1248 = require('./1248'),
  module1250 = require('./1250');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1243(o),
      _ = module1248(v.length),
      h = module1250(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
