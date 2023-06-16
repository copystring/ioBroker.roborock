globals = require('./1128');

var module1142 = require('./1142'),
  module1137 = require('./1137'),
  module1127 = require('./1127'),
  module1132 = require('./1132'),
  module1191 = require('./1191').KEY,
  module1138 = require('./1138'),
  module1155 = require('./1155'),
  module1180 = require('./1180'),
  module1157 = require('./1157'),
  module1181 = require('./1181'),
  module1187 = require('./1187'),
  module1192 = require('./1192'),
  module1193 = require('./1193'),
  module1194 = require('./1194'),
  module1134 = require('./1134'),
  module1135 = require('./1135'),
  module1161 = require('./1161'),
  module1146 = require('./1146'),
  module1140 = require('./1140'),
  module1141 = require('./1141'),
  module1177 = require('./1177'),
  module1195 = require('./1195'),
  module1197 = require('./1197'),
  module1159 = require('./1159'),
  module1133 = require('./1133'),
  module1144 = require('./1144'),
  C = module1197.f,
  M = module1133.f,
  D = module1195.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1181('_hidden'),
  Y = module1181('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1155('symbol-registry'),
  z = module1155('symbols'),
  A = module1155('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1159.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1137 &&
    module1138(function () {
      return (
        7 !=
        module1177(
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
    var n = (z[t] = module1177(G.prototype));
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
    if (n === B) Z(A, module1127, f);
    module1134(n);
    module1127 = module1140(module1127, true);
    module1134(f);

    if (module1142(z, module1127)) {
      if (f.enumerable) {
        if (module1142(n, W) && n[W][module1127]) n[W][module1127] = false;
        f = module1177(f, {
          enumerable: module1141(0, false),
        });
      } else {
        if (!module1142(n, W)) M(n, W, module1141(1, {}));
        n[W][module1127] = true;
      }

      return U(n, module1127, f);
    } else return M(n, module1127, f);
  },
  $ = function (t, n) {
    module1134(t);

    for (var o, f = module1193((n = module1146(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1140(n, true)));
    return !(this === B && module1142(z, n) && !module1142(A, n)) && (!(o || !module1142(this, n) || !module1142(z, n) || (module1142(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1146(n)), (o = module1140(o, true)), n !== B || !module1142(z, o) || module1142(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1142(z, o) || (module1142(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1146(n)), s = [], c = 0; f.length > c; ) module1142(z, (o = f[c++])) || o == W || o == module1191 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1146(n)), s = [], c = 0; u.length > c; ) !module1142(z, (o = u[c++])) || (f && !module1142(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1132(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1157(arguments.length > 0 ? arguments[0] : undefined);
      if (module1137 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1142(this, W) && module1142(this[W], o)) this[W][o] = false;
            U(this, o, module1141(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1197.f = rt;
  module1133.f = Z;
  require('./1196').f = module1195.f = nt;
  require('./1160').f = tt;
  module1159.f = et;
  if (module1137 && !require('./1156')) module1132(B, 'propertyIsEnumerable', tt, true);

  module1187.f = function (t) {
    return V(module1181(t));
  };
}

module1127(module1127.G + module1127.W + module1127.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1181(ot[it++]);

for (var ft = module1144(module1181.store), ut = 0; ft.length > ut; ) module1192(ft[ut++]);

module1127(module1127.S + module1127.F * !H, 'Symbol', {
  for: function (n) {
    return module1142(x, (n += '')) ? x[n] : (x[n] = G(n));
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
module1127(module1127.S + module1127.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1177(t) : $(module1177(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1138(function () {
  module1159.f(1);
});
module1127(module1127.S + module1127.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1159.f(module1161(t));
  },
});
if (K)
  module1127(
    module1127.S +
      module1127.F *
        (!H ||
          module1138(function () {
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

        if (((o = n = f[1]), (module1135(n) || undefined !== t) && !X(t))) {
          if (!module1194(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1132')(G.prototype, Y, G.prototype.valueOf);
module1180(G, 'Symbol');
module1180(Math, 'Math', true);
module1180(globals.JSON, 'JSON', true);
