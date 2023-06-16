globals = require('./1522');

var module1536 = require('./1536'),
  module1531 = require('./1531'),
  module1521 = require('./1521'),
  module1526 = require('./1526'),
  module1585 = require('./1585').KEY,
  module1532 = require('./1532'),
  module1549 = require('./1549'),
  module1574 = require('./1574'),
  module1551 = require('./1551'),
  module1575 = require('./1575'),
  module1581 = require('./1581'),
  module1586 = require('./1586'),
  module1587 = require('./1587'),
  module1588 = require('./1588'),
  module1528 = require('./1528'),
  module1529 = require('./1529'),
  module1555 = require('./1555'),
  module1540 = require('./1540'),
  module1534 = require('./1534'),
  module1535 = require('./1535'),
  module1571 = require('./1571'),
  module1589 = require('./1589'),
  module1591 = require('./1591'),
  module1553 = require('./1553'),
  module1527 = require('./1527'),
  module1538 = require('./1538'),
  C = module1591.f,
  M = module1527.f,
  D = module1589.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1575('_hidden'),
  Y = module1575('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1549('symbol-registry'),
  z = module1549('symbols'),
  A = module1549('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1553.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1531 &&
    module1532(function () {
      return (
        7 !=
        module1571(
          M({}, 'a', {
            get: function () {
              return M(this, 'a', {
                value: 7,
              }).a;
            },
          })
        ).a
      );
    })
      ? function (t, n, o) {
          var f = C(B, n);
          if (f) delete B[n];
          M(t, n, o);
          if (f && t !== B) M(B, n, f);
        }
      : M,
  V = function (t) {
    var n = (z[t] = module1571(G.prototype));
    n._k = t;
    return n;
  },
  X =
    H && 'symbol' == typeof G.iterator
      ? function (t) {
          return 'symbol' == typeof t;
        }
      : function (t) {
          return t instanceof G;
        },
  Z = function (n, o, f) {
    if (n === B) Z(A, module1521, f);
    module1528(n);
    module1521 = module1534(module1521, true);
    module1528(f);

    if (module1536(z, module1521)) {
      if (f.enumerable) {
        if (module1536(n, W) && n[W][module1521]) n[W][module1521] = false;
        f = module1571(f, {
          enumerable: module1535(0, false),
        });
      } else {
        if (!module1536(n, W)) M(n, W, module1535(1, {}));
        n[W][module1521] = true;
      }

      return U(n, module1521, f);
    } else return M(n, module1521, f);
  },
  $ = function (t, n) {
    module1528(t);

    for (var o, f = module1587((n = module1540(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1534(n, true)));
    return !(this === B && module1536(z, n) && !module1536(A, n)) && (!(o || !module1536(this, n) || !module1536(z, n) || (module1536(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1540(n)), (o = module1534(o, true)), n !== B || !module1536(z, o) || module1536(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1536(z, o) || (module1536(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1540(n)), s = [], c = 0; f.length > c; ) module1536(z, (o = f[c++])) || o == W || o == module1585 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1540(n)), s = [], c = 0; u.length > c; ) !module1536(z, (o = u[c++])) || (f && !module1536(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1526(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1551(arguments.length > 0 ? arguments[0] : undefined);
      if (module1531 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1536(this, W) && module1536(this[W], o)) this[W][o] = false;
            U(this, o, module1535(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1591.f = rt;
  module1527.f = Z;
  require('./1590').f = module1589.f = nt;
  require('./1554').f = tt;
  module1553.f = et;
  if (module1531 && !require('./1550')) module1526(B, 'propertyIsEnumerable', tt, true);

  module1581.f = function (t) {
    return V(module1575(t));
  };
}

module1521(module1521.G + module1521.W + module1521.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1575(ot[it++]);

for (var ft = module1538(module1575.store), ut = 0; ft.length > ut; ) module1586(ft[ut++]);

module1521(module1521.S + module1521.F * !H, 'Symbol', {
  for: function (n) {
    return module1536(x, (n += '')) ? x[n] : (x[n] = G(n));
  },
  keyFor: function (t) {
    if (!X(t)) throw TypeError(t + ' is not a symbol!');

    for (var n in x) if (x[n] === t) return n;
  },
  useSetter: function () {
    R = true;
  },
  useSimple: function () {
    R = false;
  },
});
module1521(module1521.S + module1521.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1571(t) : $(module1571(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1532(function () {
  module1553.f(1);
});
module1521(module1521.S + module1521.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1553.f(module1555(t));
  },
});
if (K)
  module1521(
    module1521.S +
      module1521.F *
        (!H ||
          module1532(function () {
            var t = G();
            return (
              '[null]' != Q([t]) ||
              '{}' !=
                Q({
                  a: t,
                }) ||
              '{}' != Q(Object(t))
            );
          })),
    'JSON',
    {
      stringify: function (t) {
        for (var n, o, f = [t], u = 1; arguments.length > u; ) f.push(arguments[u++]);

        if (((o = n = f[1]), (module1529(n) || undefined !== t) && !X(t))) {
          if (!module1588(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1526')(G.prototype, Y, G.prototype.valueOf);
module1574(G, 'Symbol');
module1574(Math, 'Math', true);
module1574(globals.JSON, 'JSON', true);
