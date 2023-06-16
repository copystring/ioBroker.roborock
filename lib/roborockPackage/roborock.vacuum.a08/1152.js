var module1148 = require('./1148'),
  module1153 = require('./1153'),
  module1155 = require('./1155');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1148(o),
      _ = module1153(v.length),
      h = module1155(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
