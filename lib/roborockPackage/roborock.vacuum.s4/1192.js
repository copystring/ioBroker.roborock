globals = require('./1130');

var module1144 = require('./1144'),
  module1139 = require('./1139'),
  module1129 = require('./1129'),
  module1134 = require('./1134'),
  module1193 = require('./1193').KEY,
  module1140 = require('./1140'),
  module1157 = require('./1157'),
  module1182 = require('./1182'),
  module1159 = require('./1159'),
  module1183 = require('./1183'),
  module1189 = require('./1189'),
  module1194 = require('./1194'),
  module1195 = require('./1195'),
  module1196 = require('./1196'),
  module1136 = require('./1136'),
  module1137 = require('./1137'),
  module1163 = require('./1163'),
  module1148 = require('./1148'),
  module1142 = require('./1142'),
  module1143 = require('./1143'),
  module1179 = require('./1179'),
  module1197 = require('./1197'),
  module1199 = require('./1199'),
  module1161 = require('./1161'),
  module1135 = require('./1135'),
  module1146 = require('./1146'),
  C = module1199.f,
  M = module1135.f,
  D = module1197.f,
  G = globals.Symbol,
  K = globals.JSON,
  Q = K && K.stringify,
  W = module1183('_hidden'),
  Y = module1183('toPrimitive'),
  q = {}.propertyIsEnumerable,
  x = module1157('symbol-registry'),
  z = module1157('symbols'),
  A = module1157('op-symbols'),
  B = Object.prototype,
  H = 'function' == typeof G && !!module1161.f,
  L = globals.QObject,
  R = !L || !L.prototype || !L.prototype.findChild,
  U =
    module1139 &&
    module1140(function () {
      return (
        7 !=
        module1179(
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
    var n = (z[t] = module1179(G.prototype));
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
    if (n === B) Z(A, module1129, f);
    module1136(n);
    module1129 = module1142(module1129, true);
    module1136(f);

    if (module1144(z, module1129)) {
      if (f.enumerable) {
        if (module1144(n, W) && n[W][module1129]) n[W][module1129] = false;
        f = module1179(f, {
          enumerable: module1143(0, false),
        });
      } else {
        if (!module1144(n, W)) M(n, W, module1143(1, {}));
        n[W][module1129] = true;
      }

      return U(n, module1129, f);
    } else return M(n, module1129, f);
  },
  $ = function (t, n) {
    module1136(t);

    for (var o, f = module1195((n = module1148(n))), u = 0, s = f.length; s > u; ) Z(t, (o = f[u++]), n[o]);

    return t;
  },
  tt = function (n) {
    var o = q.call(this, (n = module1142(n, true)));
    return !(this === B && module1144(z, n) && !module1144(A, n)) && (!(o || !module1144(this, n) || !module1144(z, n) || (module1144(this, W) && this[W][n])) || o);
  },
  rt = function (n, o) {
    if (((n = module1148(n)), (o = module1142(o, true)), n !== B || !module1144(z, o) || module1144(A, o))) {
      var f = C(n, o);
      if (!(!f || !module1144(z, o) || (module1144(n, W) && n[W][o]))) f.enumerable = true;
      return f;
    }
  },
  nt = function (n) {
    for (var o, f = D(module1148(n)), s = [], c = 0; f.length > c; ) module1144(z, (o = f[c++])) || o == W || o == module1193 || s.push(o);

    return s;
  },
  et = function (n) {
    for (var o, f = n === B, u = D(f ? A : module1148(n)), s = [], c = 0; u.length > c; ) !module1144(z, (o = u[c++])) || (f && !module1144(B, o)) || s.push(z[o]);

    return s;
  };

if (!H) {
  module1134(
    (G = function () {
      if (this instanceof G) throw TypeError('Symbol is not a constructor!');
      var o = module1159(arguments.length > 0 ? arguments[0] : undefined);
      if (module1139 && R)
        U(B, o, {
          configurable: true,
          set: function n(f) {
            if (this === B) n.call(A, f);
            if (module1144(this, W) && module1144(this[W], o)) this[W][o] = false;
            U(this, o, module1143(1, f));
          },
        });
      return V(o);
    }).prototype,
    'toString',
    function () {
      return this._k;
    }
  );
  module1199.f = rt;
  module1135.f = Z;
  require('./1198').f = module1197.f = nt;
  require('./1162').f = tt;
  module1161.f = et;
  if (module1139 && !require('./1158')) module1134(B, 'propertyIsEnumerable', tt, true);

  module1189.f = function (t) {
    return V(module1183(t));
  };
}

module1129(module1129.G + module1129.W + module1129.F * !H, {
  Symbol: G,
});

for (var ot = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), it = 0; ot.length > it; )
  module1183(ot[it++]);

for (var ft = module1146(module1183.store), ut = 0; ft.length > ut; ) module1194(ft[ut++]);

module1129(module1129.S + module1129.F * !H, 'Symbol', {
  for: function (n) {
    return module1144(x, (n += '')) ? x[n] : (x[n] = G(n));
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
module1129(module1129.S + module1129.F * !H, 'Object', {
  create: function (t, n) {
    return undefined === n ? module1179(t) : $(module1179(t), n);
  },
  defineProperty: Z,
  defineProperties: $,
  getOwnPropertyDescriptor: rt,
  getOwnPropertyNames: nt,
  getOwnPropertySymbols: et,
});
var st = module1140(function () {
  module1161.f(1);
});
module1129(module1129.S + module1129.F * st, 'Object', {
  getOwnPropertySymbols: function (t) {
    return module1161.f(module1163(t));
  },
});
if (K)
  module1129(
    module1129.S +
      module1129.F *
        (!H ||
          module1140(function () {
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

        if (((o = n = f[1]), (module1137(n) || undefined !== t) && !X(t))) {
          if (!module1196(n))
            n = function (t, n) {
              if (('function' == typeof o && (n = o.call(this, t, n)), !X(n))) return n;
            };
          f[1] = n;
          return Q.apply(K, f);
        }
      },
    }
  );
if (!G.prototype[Y]) require('./1134')(G.prototype, Y, G.prototype.valueOf);
module1182(G, 'Symbol');
module1182(Math, 'Math', true);
module1182(globals.JSON, 'JSON', true);
