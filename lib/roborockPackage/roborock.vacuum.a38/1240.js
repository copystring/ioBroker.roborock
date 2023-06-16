var module1234 = require('./1234'),
  module1241 = require('./1241'),
  module1256 = require('./1256'),
  module1257 = require('./1257'),
  module1258 = require('./1258'),
  module1244 = require('./1244'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1235')(function () {
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
        for (var b = module1258(l), h = arguments.length, j = 1, v = module1256.f, p = module1257.f; h > j; )
          for (var k, y = module1244(arguments[j++]), O = v ? module1241(y).concat(v(y)) : module1241(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1234 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
