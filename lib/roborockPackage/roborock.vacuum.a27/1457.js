var module1451 = require('./1451'),
  module1458 = require('./1458'),
  module1473 = require('./1473'),
  module1474 = require('./1474'),
  module1475 = require('./1475'),
  module1461 = require('./1461'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1452')(function () {
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
        for (var b = module1475(l), h = arguments.length, j = 1, v = module1473.f, p = module1474.f; h > j; )
          for (var k, y = module1461(arguments[j++]), O = v ? module1458(y).concat(v(y)) : module1458(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1451 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
