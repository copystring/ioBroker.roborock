var module1449 = require('./1449'),
  module1456 = require('./1456'),
  module1471 = require('./1471'),
  module1472 = require('./1472'),
  module1473 = require('./1473'),
  module1459 = require('./1459'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1450')(function () {
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
        for (var b = module1473(l), h = arguments.length, j = 1, v = module1471.f, p = module1472.f; h > j; )
          for (var k, y = module1459(arguments[j++]), O = v ? module1456(y).concat(v(y)) : module1456(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1449 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
