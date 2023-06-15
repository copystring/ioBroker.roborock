var module1137 = require('./1137'),
  module1144 = require('./1144'),
  module1159 = require('./1159'),
  module1160 = require('./1160'),
  module1161 = require('./1161'),
  module1147 = require('./1147'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1138')(function () {
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
        for (var b = module1161(l), h = arguments.length, j = 1, v = module1159.f, p = module1160.f; h > j; )
          for (var k, y = module1147(arguments[j++]), O = v ? module1144(y).concat(v(y)) : module1144(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1137 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
