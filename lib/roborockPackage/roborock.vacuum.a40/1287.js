globals = require('./1225');

var module1239 = require('./1239'),
  module1234 = require('./1234'),
  module1224 = require('./1224'),
  module1229 = require('./1229'),
  module1288 = require('./1288').KEY,
  module1235 = require('./1235'),
  module1252 = require('./1252'),
  module1277 = require('./1277'),
  module1254 = require('./1254'),
  module1278 = require('./1278'),
  module1284 = require('./1284'),
  module1289 = require('./1289'),
  module1290 = require('./1290'),
  module1291 = require('./1291'),
  module1231 = require('./1231'),
  module1232 = require('./1232'),
  module1258 = require('./1258'),
  module1243 = require('./1243'),
  module1237 = require('./1237'),
  module1238 = require('./1238'),
  module1274 = require('./1274'),
  module1292 = require('./1292'),
  module1294 = require('./1294'),
  module1256 = require('./1256'),
  module1230 = require('./1230'),
  module1241 = require('./1241'),
  C = module1294.f,
  M = module1230.f,
  D = module1292.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1278('_hidden'),
  Y = module1278('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1252('symbol-registry'),
  z = module1252('symbols'),
  A = module1252('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1256.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1234 &&
    module1235(function () {
      return (
        7 !=
        module1274(
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
    var n = (z[t] = module1274(G.prototype));
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
    if (n === B) Z(A, module1224, f);
    module1231(n);
    module1224 = module1237(module1224, true);
    module1231(f);

    if (module1239(z, module1224)) {
      if (f.enumerable) {
        if (module1239(n, W) && n[W][module1224]) n[W][module1224] = false;
        f = module1274(f, {
          enumerable: module1238(0, false),
        });
      } else {
        if (!module1239(n, W)) M(n, W, module1238(1, {}));
        n[W][module1224] = true;
      }

      return U(n, module1224, f);
    } else return M(n, module1224, f);
  },
  $ = function (t, n) {
    module1231(t);

    for (var o, f = module1290((n = module1243(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1237(n, true)));
    return !(this === B && module1239(z, n) && !module1239(A, n)) && (!(o || !module1239(this, n) || !module1239(z, n) || (module1239(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1243(n)), (o = module1237(o, true)), n !== B || !module1239(z, o) || module1239(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1239(z, o) || (module1239(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1243(n)), s = [], c = 0; f.length > c; ) module1239(z, (o = f[c++])) || o == W || o == module1288 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1243(n)), s = [], c = 0; u.length > c; ) !module1239(z, (o = u[c++])) || (f && !module1239(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1229(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1254(arguments.length > 0 ? arguments[0] : undefined);
      if (module1234 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1239(this, W) && module1239(this[W], o)) this[W][o] = false;
            U(this, o, module1238(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1294.f = rt;
  module1230.f = Z;
  require('./1293').f = module1292.f = nt;
  require('./1257').f = tt;
  module1256.f = et;
  if (module1234 && !require('./1253')) module1229(B, 'propertyIsEnumerable', tt, true);

  module1284.f = function (t) {
    return V(module1278(t));
  };
}

module1224(module1224.G + module1224.W + module1224.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1278(ot[it++]);

for (var ft = module1241(module1278.store), ut = 0; ft.length > ut; ) module1289(ft[ut++]);

module1224(module1224.S + module1224.F * !H, 'Symbol', {
  for: function (n) {
    return module1239(x, (n += '')) ? x[n] : (x[n] = G(n));
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
module1224(module1224.S + module1224.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1274(t) : $(module1274(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1235(function () {
  module1256.f(1);
});
module1224(module1224.S + module1224.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1256.f(module1258(t));
  },
});
if (K)
  module1224(
    module1224.S +
      module1224.F *
        (!H ||
          module1235(function () {
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

        if (((o = n = f[1]), (module1232(n) || undefined !== t) && !X(t))) {
          if (!module1291(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1229')(G.prototype, Y, G.prototype.valueOf);
module1277(G, 'Symbol');
module1277(Math, 'Math', true);
module1277(globals.JSON, 'JSON', true);
