var module1524 = require('./1524'),
  module1531 = require('./1531'),
  module1546 = require('./1546'),
  module1547 = require('./1547'),
  module1548 = require('./1548'),
  module1534 = require('./1534'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1525')(function () {
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
        for (var b = module1548(l), h = arguments.length, j = 1, v = module1546.f, p = module1547.f; h > j; )
          for (var k, y = module1534(arguments[j++]), O = v ? module1531(y).concat(v(y)) : module1531(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1524 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
