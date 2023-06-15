var module1139 = require('./1139'),
  module1146 = require('./1146'),
  module1161 = require('./1161'),
  module1162 = require('./1162'),
  module1163 = require('./1163'),
  module1149 = require('./1149'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1140')(function () {
    var n = {},
      t = {},
      c = Symbol(),
      o = 'abcdefghijklmnopqrst';
    n[c] = 7;
    o.split('').forEach(function (n) {
      t[n] = n;
    });
    return 7 != l({}, n)[c] || Object.keys(l({}, t)).join('') != o;
  })
    ? function (l, u) {
        for (var b = module1163(l), h = arguments.length, j = 1, v = module1161.f, p = module1162.f; h > j; )
          for (var k, y = module1149(arguments[j++]), O = v ? module1146(y).concat(v(y)) : module1146(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1139 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
