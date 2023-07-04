var module1530 = require('./1530'),
  module1537 = require('./1537'),
  module1552 = require('./1552'),
  module1553 = require('./1553'),
  module1554 = require('./1554'),
  module1540 = require('./1540'),
  l = Object.assign;

module.exports =
  !l ||
  require('./1531')(function () {
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
        for (var b = module1554(l), h = arguments.length, j = 1, v = module1552.f, p = module1553.f; h > j; )
          for (var k, y = module1540(arguments[j++]), O = v ? module1537(y).concat(v(y)) : module1537(y), _ = O.length, q = 0; _ > q; ) {
            k = O[q++];
            if (!(module1530 && !p.call(y, k))) b[k] = y[k];
          }

        return b;
      }
    : l;
