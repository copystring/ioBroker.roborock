globals = require('./1440');

var module1454 = require('./1454'),
  module1449 = require('./1449'),
  module1439 = require('./1439'),
  module1444 = require('./1444'),
  module1503 = require('./1503').KEY,
  module1450 = require('./1450'),
  module1467 = require('./1467'),
  module1492 = require('./1492'),
  module1469 = require('./1469'),
  module1493 = require('./1493'),
  module1499 = require('./1499'),
  module1504 = require('./1504'),
  module1505 = require('./1505'),
  module1506 = require('./1506'),
  module1446 = require('./1446'),
  module1447 = require('./1447'),
  module1473 = require('./1473'),
  module1458 = require('./1458'),
  module1452 = require('./1452'),
  module1453 = require('./1453'),
  module1489 = require('./1489'),
  module1507 = require('./1507'),
  module1509 = require('./1509'),
  module1471 = require('./1471'),
  module1445 = require('./1445'),
  module1456 = require('./1456'),
  C = module1509.f,
  M = module1445.f,
  D = module1507.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1493('_hidden'),
  Y = module1493('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1467('symbol-registry'),
  z = module1467('symbols'),
  A = module1467('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1471.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1449 &&
    module1450(function () {
      return (
        7 !=
        module1489(
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
    var n = (z[t] = module1489(G.prototype));
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
    if (n === B) Z(A, module1439, f);
    module1446(n);
    module1439 = module1452(module1439, true);
    module1446(f);

    if (module1454(z, module1439)) {
      if (f.enumerable) {
        if (module1454(n, W) && n[W][module1439]) n[W][module1439] = false;
        f = module1489(f, {
          enumerable: module1453(0, false),
        });
      } else {
        if (!module1454(n, W)) M(n, W, module1453(1, {}));
        n[W][module1439] = true;
      }

      return U(n, module1439, f);
    } else return M(n, module1439, f);
  },
  $ = function (t, n) {
    module1446(t);

    for (var o, f = module1505((n = module1458(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1452(n, true)));
    return !(this === B && module1454(z, n) && !module1454(A, n)) && (!(o || !module1454(this, n) || !module1454(z, n) || (module1454(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1458(n)), (o = module1452(o, true)), n !== B || !module1454(z, o) || module1454(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1454(z, o) || (module1454(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1458(n)), s = [], c = 0; f.length > c; ) module1454(z, (o = f[c++])) || o == W || o == module1503 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1458(n)), s = [], c = 0; u.length > c; ) !module1454(z, (o = u[c++])) || (f && !module1454(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1444(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1469(arguments.length > 0 ? arguments[0] : undefined);
      if (module1449 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1454(this, W) && module1454(this[W], o)) this[W][o] = false;
            U(this, o, module1453(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1509.f = rt;
  module1445.f = Z;
  require('./1508').f = module1507.f = nt;
  require('./1472').f = tt;
  module1471.f = et;
  if (module1449 && !require('./1468')) module1444(B, 'propertyIsEnumerable', tt, true);

  module1499.f = function (t) {
    return V(module1493(t));
  };
}

module1439(module1439.G + module1439.W + module1439.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1493(ot[it++]);

for (var ft = module1456(module1493.store), ut = 0; ft.length > ut; ) module1504(ft[ut++]);

module1439(module1439.S + module1439.F * !H, 'Symbol', {
  for: function (n) {
    return module1454(x, (n += '')) ? x[n] : (x[n] = G(n));
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
module1439(module1439.S + module1439.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1489(t) : $(module1489(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1450(function () {
  module1471.f(1);
});
module1439(module1439.S + module1439.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1471.f(module1473(t));
  },
});
if (K)
  module1439(
    module1439.S +
      module1439.F *
        (!H ||
          module1450(function () {
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

        if (((o = n = f[1]), (module1447(n) || undefined !== t) && !X(t))) {
          if (!module1506(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1444')(G.prototype, Y, G.prototype.valueOf);
module1492(G, 'Symbol');
module1492(Math, 'Math', true);
module1492(globals.JSON, 'JSON', true);
