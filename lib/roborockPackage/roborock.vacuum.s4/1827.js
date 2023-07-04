var n =
    'function' == typeof Symbol && 'symbol' == typeof ('function' == typeof Symbol ? Symbol.iterator : '@@iterator')
      ? function (n) {
          return typeof n;
        }
      : function (n) {
          return n && 'function' == typeof Symbol && n.constructor === Symbol && n !== ('function' == typeof Symbol ? Symbol.prototype : '@@prototype') ? 'symbol' : typeof n;
        },
  t =
    Object.assign ||
    function (n) {
      for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];

        for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (n[u] = o[u]);
      }

      return n;
    },
  module1821 = require('./1821'),
  u = 1,
  c = {},
  f = {},
  l = {},
  s = {},
  p = {},
  y = {},
  b = {};

v.promise = h;

var v = {},
  h = new Promise(function (n, t) {
    v.resolve = n;
    v.reject = t;
  }),
  S = v,
  j = S.promise,
  O = function (n) {
    var t = w(f, n),
      o = t || u++,
      y = undefined;
    if (t) y = l[o];
    else {
      c[o] = n.name;
      f[o] = n;
      p[o] = 0;
      l[o] = y = j
        .then(function (t) {
          return t.add(o, n);
        })
        .then(function (n) {
          return (s[o] = n);
        });
    }
    return {
      id: o,
      promise: y,
    };
  },
  _ = function (n) {
    delete f[n];
    delete c[n];
    delete p[n];
    delete l[n];
    j.then(function (t) {
      return t.remove(n);
    });
  },
  k = function () {
    return Object.keys(p)
      .filter(function (n) {
        return p[n] <= 0;
      })
      .map(function (n) {
        return parseInt(n, 10);
      });
  },
  E = undefined,
  I = function () {
    clearTimeout(E);
    k().forEach(_);
  },
  P = function () {
    if (!(k().length > 20)) clearTimeout(E);
    E = setTimeout(I, 500);
  },
  w = function (n, t) {
    for (var o in n) if (((u = n[o]), (c = t), u.frag === c.frag)) return parseInt(o, 10);

    var u, c;
    return null;
  },
  T = function (n) {
    return function (t) {
      return console.error("Shader '" + n.name + "' failed to compile:\n" + t);
    };
  },
  x = {
    _onSurfaceWillMount: function (n) {
      y[n] = [];
    },
    _onSurfaceWillUnmount: function (n) {
      y[n].forEach(function (n) {
        return p[n]--;
      });
      delete y[n];
      delete b[n];
      P();
    },
    _beforeSurfaceBuild: function (n) {
      b[n] = y[n];
      y[n] = [];
    },
    _resolve: function (n, o, u) {
      if ('number' == typeof n) return n;
      var c = O(
          t(
            {
              name: '<inline>',
            },
            n
          )
        ),
        f = c.id,
        l = c.promise;
      if (u)
        l.then(
          function (n) {
            return u(null, n);
          },
          function (n) {
            return u(n);
          }
        );
      else l.catch(T(x.get(f)));
      y[o].push(f);
      return f;
    },
    _afterSurfaceBuild: function (n) {
      b[n].forEach(function (n) {
        return p[n]--;
      });
      y[n].forEach(function (n) {
        return p[n]++;
      });
      delete b[n];
      P();
    },
    create: function (u, c) {
      module1821('object' === (undefined === u ? 'undefined' : n(u)), 'config must be an object');
      var f = {},
        l = {},
        s = {};
      Promise.all(
        Object.keys(u).map(function (c) {
          var y = u[c];
          module1821(
            'object' === (undefined === y ? 'undefined' : n(y)) && 'string' == typeof y.frag,
            'invalid shader given to Shaders.create(). A valid shader is a { frag: String }'
          );
          var b = O(
              t(
                {
                  name: c,
                },
                y
              )
            ),
            v = b.id,
            h = b.promise;
          f[c] = v;
          p[v]++;
          return h.then(
            function (n) {
              return (s[c] = n);
            },
            function (n) {
              return (l[c] = n);
            }
          );
        })
      ).then(function () {
        if (c) c(Object.keys(l).length ? l : null, s);
        else
          Object.keys(l).forEach(function (n) {
            return T(x.get(f[n]))(l[n]);
          });
      });
      return f;
    },
    get: function (n) {
      return Object.freeze(f[n]);
    },
    getCompilationResult: function (n) {
      return s[n] || null;
    },
    getCompilationPromise: function (n) {
      return l[n] || null;
    },
    list: function () {
      return Object.keys(f);
    },
    exists: function (n) {
      return n in f;
    },
    gcNow: I,
    setImplementation: function (n) {
      module1821(S, 'Shaders.setImplementation can be called only once');
      S.resolve(n);
      S = null;
    },
    implementation: j,
  };

module.exports = Object.freeze(x);
