globals = require('./1515');

var module1529 = require('./1529'),
  module1524 = require('./1524'),
  module1514 = require('./1514'),
  module1519 = require('./1519'),
  module1578 = require('./1578').KEY,
  module1525 = require('./1525'),
  module1542 = require('./1542'),
  module1567 = require('./1567'),
  module1544 = require('./1544'),
  module1568 = require('./1568'),
  module1574 = require('./1574'),
  module1579 = require('./1579'),
  module1580 = require('./1580'),
  module1581 = require('./1581'),
  module1521 = require('./1521'),
  module1522 = require('./1522'),
  module1548 = require('./1548'),
  module1533 = require('./1533'),
  module1527 = require('./1527'),
  module1528 = require('./1528'),
  module1564 = require('./1564'),
  module1582 = require('./1582'),
  module1584 = require('./1584'),
  module1546 = require('./1546'),
  module1520 = require('./1520'),
  module1531 = require('./1531'),
  C = module1584.f,
  M = module1520.f,
  D = module1582.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1568('_hidden'),
  Y = module1568('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1542('symbol-registry'),
  z = module1542('symbols'),
  A = module1542('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1546.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1524 &&
    module1525(function () {
      return (
        7 !=
        module1564(
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
    var n = (z[t] = module1564(G.prototype));
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
    if (n === B) Z(A, module1514, f);
    module1521(n);
    module1514 = module1527(module1514, true);
    module1521(f);

    if (module1529(z, module1514)) {
      if (f.enumerable) {
        if (module1529(n, W) && n[W][module1514]) n[W][module1514] = false;
        f = module1564(f, {
          enumerable: module1528(0, false),
        });
      } else {
        if (!module1529(n, W)) M(n, W, module1528(1, {}));
        n[W][module1514] = true;
      }

      return U(n, module1514, f);
    } else return M(n, module1514, f);
  },
  $ = function (t, n) {
    module1521(t);

    for (var o, f = module1580((n = module1533(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1527(n, true)));
    return !(this === B && module1529(z, n) && !module1529(A, n)) && (!(o || !module1529(this, n) || !module1529(z, n) || (module1529(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1533(n)), (o = module1527(o, true)), n !== B || !module1529(z, o) || module1529(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1529(z, o) || (module1529(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1533(n)), s = [], c = 0; f.length > c; ) module1529(z, (o = f[c++])) || o == W || o == module1578 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1533(n)), s = [], c = 0; u.length > c; ) !module1529(z, (o = u[c++])) || (f && !module1529(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1519(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1544(arguments.length > 0 ? arguments[0] : undefined);
      if (module1524 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1529(this, W) && module1529(this[W], o)) this[W][o] = false;
            U(this, o, module1528(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1584.f = rt;
  module1520.f = Z;
  require('./1583').f = module1582.f = nt;
  require('./1547').f = tt;
  module1546.f = et;
  if (module1524 && !require('./1543')) module1519(B, 'propertyIsEnumerable', tt, true);

  module1574.f = function (t) {
    return V(module1568(t));
  };
}

module1514(module1514.G + module1514.W + module1514.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1568(ot[it++]);

for (var ft = module1531(module1568.store), ut = 0; ft.length > ut; ) module1579(ft[ut++]);

module1514(module1514.S + module1514.F * !H, 'Symbol', {
  for: function (n) {
    return module1529(x, (n += '')) ? x[n] : (x[n] = G(n));
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
module1514(module1514.S + module1514.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1564(t) : $(module1564(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1525(function () {
  module1546.f(1);
});
module1514(module1514.S + module1514.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1546.f(module1548(t));
  },
});
if (K)
  module1514(
    module1514.S +
      module1514.F *
        (!H ||
          module1525(function () {
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

        if (((o = n = f[1]), (module1522(n) || undefined !== t) && !X(t))) {
          if (!module1581(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1519')(G.prototype, Y, G.prototype.valueOf);
module1567(G, 'Symbol');
module1567(Math, 'Math', true);
module1567(globals.JSON, 'JSON', true);
