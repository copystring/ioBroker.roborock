var module1146 = require('./1146'),
  module1151 = require('./1151'),
  module1153 = require('./1153');

module.exports = function (u) {
  return function (o, c, l) {
    var s,
      v = module1146(o),
      _ = module1151(v.length),
      h = module1153(l, _);

    if (u && c != c) {
      for (; _ > h; ) if ((s = v[h++]) != s) return true;
    } else for (; _ > h; h++) if ((u || h in v) && v[h] === c) return u || h || 0;

    return !u && -1;
  };
};
