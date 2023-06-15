var module1531 = require('./1531'),
  module1538 = require('./1538'),
  module1553 = require('./1553'),
  module1554 = require('./1554'),
  module1555 = require('./1555'),
  module1541 = require('./1541'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1532')(function () {
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
        for (var b = module1555(l), h = arguments.length, j = 1, v = module1553.f, p = module1554.f; h > j; )
          for (var k, y = module1541(arguments[j++]), O = v ? module1538(y).concat(v(y)) : module1538(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1531 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
