globals = require('./1442');

var module1456 = require('./1456'),
  module1451 = require('./1451'),
  module1441 = require('./1441'),
  module1446 = require('./1446'),
  module1505 = require('./1505').KEY,
  module1452 = require('./1452'),
  module1469 = require('./1469'),
  module1494 = require('./1494'),
  module1471 = require('./1471'),
  module1495 = require('./1495'),
  module1501 = require('./1501'),
  module1506 = require('./1506'),
  module1507 = require('./1507'),
  module1508 = require('./1508'),
  module1448 = require('./1448'),
  module1449 = require('./1449'),
  module1475 = require('./1475'),
  module1460 = require('./1460'),
  module1454 = require('./1454'),
  module1455 = require('./1455'),
  module1491 = require('./1491'),
  module1509 = require('./1509'),
  module1511 = require('./1511'),
  module1473 = require('./1473'),
  module1447 = require('./1447'),
  module1458 = require('./1458'),
  C = module1511.f,
  M = module1447.f,
  D = module1509.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1495('_hidden'),
  Y = module1495('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1469('symbol-registry'),
  z = module1469('symbols'),
  A = module1469('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1473.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1451 &&
    module1452(function () {
      return (
        7 !=
        module1491(
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
    var n = (z[t] = module1491(G.prototype));
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
    if (n === B) Z(A, module1441, f);
    module1448(n);
    module1441 = module1454(module1441, true);
    module1448(f);

    if (module1456(z, module1441)) {
      if (f.enumerable) {
        if (module1456(n, W) && n[W][module1441]) n[W][module1441] = false;
        f = module1491(f, {
          enumerable: module1455(0, false),
        });
      } else {
        if (!module1456(n, W)) M(n, W, module1455(1, {}));
        n[W][module1441] = true;
      }

      return U(n, module1441, f);
    } else return M(n, module1441, f);
  },
  $ = function (t, n) {
    module1448(t);

    for (var o, f = module1507((n = module1460(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1454(n, true)));
    return !(this === B && module1456(z, n) && !module1456(A, n)) && (!(o || !module1456(this, n) || !module1456(z, n) || (module1456(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1460(n)), (o = module1454(o, true)), n !== B || !module1456(z, o) || module1456(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1456(z, o) || (module1456(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1460(n)), s = [], c = 0; f.length > c; ) module1456(z, (o = f[c++])) || o == W || o == module1505 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1460(n)), s = [], c = 0; u.length > c; ) !module1456(z, (o = u[c++])) || (f && !module1456(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1446(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1471(arguments.length > 0 ? arguments[0] : undefined);
      if (module1451 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1456(this, W) && module1456(this[W], o)) this[W][o] = false;
            U(this, o, module1455(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1511.f = rt;
  module1447.f = Z;
  require('./1510').f = module1509.f = nt;
  require('./1474').f = tt;
  module1473.f = et;
  if (module1451 && !require('./1470')) module1446(B, 'propertyIsEnumerable', tt, true);

  module1501.f = function (t) {
    return V(module1495(t));
  };
}

module1441(module1441.G + module1441.W + module1441.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1495(ot[it++]);

for (var ft = module1458(module1495.store), ut = 0; ft.length > ut; ) module1506(ft[ut++]);

module1441(module1441.S + module1441.F * !H, 'Symbol', {
  for: function (n) {
    return module1456(x, (n += '')) ? x[n] : (x[n] = G(n));
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
module1441(module1441.S + module1441.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1491(t) : $(module1491(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1452(function () {
  module1473.f(1);
});
module1441(module1441.S + module1441.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1473.f(module1475(t));
  },
});
if (K)
  module1441(
    module1441.S +
      module1441.F *
        (!H ||
          module1452(function () {
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

        if (((o = n = f[1]), (module1449(n) || undefined !== t) && !X(t))) {
          if (!module1508(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1446')(G.prototype, Y, G.prototype.valueOf);
module1494(G, 'Symbol');
module1494(Math, 'Math', true);
module1494(globals.JSON, 'JSON', true);
