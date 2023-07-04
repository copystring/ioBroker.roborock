var module1458 = require('./1458'),
  module1463 = require('./1463'),
  module1465 = require('./1465');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1458(o),
      _ = module1463(v.length),
      h = module1465(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
