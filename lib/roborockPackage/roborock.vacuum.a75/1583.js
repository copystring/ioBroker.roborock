globals = require('./1521');

var module1535 = require('./1535'),
  module1530 = require('./1530'),
  module1520 = require('./1520'),
  module1525 = require('./1525'),
  module1584 = require('./1584').KEY,
  module1531 = require('./1531'),
  module1548 = require('./1548'),
  module1573 = require('./1573'),
  module1550 = require('./1550'),
  module1574 = require('./1574'),
  module1580 = require('./1580'),
  module1585 = require('./1585'),
  module1586 = require('./1586'),
  module1587 = require('./1587'),
  module1527 = require('./1527'),
  module1528 = require('./1528'),
  module1554 = require('./1554'),
  module1539 = require('./1539'),
  module1533 = require('./1533'),
  module1534 = require('./1534'),
  module1570 = require('./1570'),
  module1588 = require('./1588'),
  module1590 = require('./1590'),
  module1552 = require('./1552'),
  module1526 = require('./1526'),
  module1537 = require('./1537'),
  C = module1590.f,
  M = module1526.f,
  D = module1588.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1574('_hidden'),
  Y = module1574('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1548('symbol-registry'),
  z = module1548('symbols'),
  A = module1548('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1552.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1530 &&
    module1531(function () {
      return (
        7 !=
        module1570(
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
    var n = (z[t] = module1570(G.prototype));
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
    if (n === B) Z(A, module1520, f);
    module1527(n);
    module1520 = module1533(module1520, true);
    module1527(f);

    if (module1535(z, module1520)) {
      if (f.enumerable) {
        if (module1535(n, W) && n[W][module1520]) n[W][module1520] = false;
        f = module1570(f, {
          enumerable: module1534(0, false),
        });
      } else {
        if (!module1535(n, W)) M(n, W, module1534(1, {}));
        n[W][module1520] = true;
      }

      return U(n, module1520, f);
    } else return M(n, module1520, f);
  },
  $ = function (t, n) {
    module1527(t);

    for (var o, f = module1586((n = module1539(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1533(n, true)));
    return !(this === B && module1535(z, n) && !module1535(A, n)) && (!(o || !module1535(this, n) || !module1535(z, n) || (module1535(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1539(n)), (o = module1533(o, true)), n !== B || !module1535(z, o) || module1535(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1535(z, o) || (module1535(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1539(n)), s = [], c = 0; f.length > c; ) module1535(z, (o = f[c++])) || o == W || o == module1584 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1539(n)), s = [], c = 0; u.length > c; ) !module1535(z, (o = u[c++])) || (f && !module1535(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1525(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1550(arguments.length > 0 ? arguments[0] : undefined);
      if (module1530 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1535(this, W) && module1535(this[W], o)) this[W][o] = false;
            U(this, o, module1534(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1590.f = rt;
  module1526.f = Z;
  require('./1589').f = module1588.f = nt;
  require('./1553').f = tt;
  module1552.f = et;
  if (module1530 && !require('./1549')) module1525(B, 'propertyIsEnumerable', tt, true);

  module1580.f = function (t) {
    return V(module1574(t));
  };
}

module1520(module1520.G + module1520.W + module1520.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1574(ot[it++]);

for (var ft = module1537(module1574.store), ut = 0; ft.length > ut; ) module1585(ft[ut++]);

module1520(module1520.S + module1520.F * !H, 'Symbol', {
  for: function (n) {
    return module1535(x, (n += '')) ? x[n] : (x[n] = G(n));
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
module1520(module1520.S + module1520.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1570(t) : $(module1570(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1531(function () {
  module1552.f(1);
});
module1520(module1520.S + module1520.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1552.f(module1554(t));
  },
});
if (K)
  module1520(
    module1520.S +
      module1520.F *
        (!H ||
          module1531(function () {
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

        if (((o = n = f[1]), (module1528(n) || undefined !== t) && !X(t))) {
          if (!module1587(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1525')(G.prototype, Y, G.prototype.valueOf);
module1573(G, 'Symbol');
module1573(Math, 'Math', true);
module1573(globals.JSON, 'JSON', true);
