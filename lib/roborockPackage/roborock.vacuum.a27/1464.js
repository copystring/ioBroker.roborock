var module1460 = require('./1460'),
  module1465 = require('./1465'),
  module1467 = require('./1467');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1460(o),
      _ = module1465(v.length),
      h = module1467(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
