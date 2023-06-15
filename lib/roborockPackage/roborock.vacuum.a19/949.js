var module22 = require('./22'),
  module49 = require('./49'),
  module950 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = l(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (s && (s.get || s.set)) Object.defineProperty(u, f, s);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('./950')),
  module941 = require('./941'),
  module944 = require('./944');

function l(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (l = function (t) {
    return t ? o : n;
  })(t);
}

function s(t, n) {
  var o = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (o) return (o = o.call(t)).next.bind(o);

  if (Array.isArray(t) || (o = p(t)) || (n && t && 'number' == typeof t.length)) {
    if (o) t = o;
    var u = 0;
    return function () {
      return u >= t.length
        ? {
            done: true,
          }
        : {
            done: false,
            value: t[u++],
          };
    };
  }

  throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function p(t, n) {
  if (t) {
    if ('string' == typeof t) return h(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? h(t, n) : undefined;
  }
}

function h(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, u = new Array(n); o < n; o++) u[o] = t[o];

  return u;
}

function v(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      v(Object(u), true).forEach(function (n) {
        module49.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      v(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var module952 = require('./952'),
  b = function (t, n, o) {
    return n.slice(1).reduce(function (t, n, u) {
      var c = o[u];
      if (!c || c.asterisk) return t;
      var f,
        l = c.name;

      try {
        f = decodeURIComponent(n);
      } catch (t) {}

      t[l] = f || n;
      return t;
    }, y({}, t));
  },
  O = function (t, n) {
    return t[
      n.findIndex(function (t) {
        return t.asterisk;
      }) + 1
    ];
  };

exports.urlToPathAndParams = function (t, n) {
  var o = t.match(/^(.*)\?(.*)$/),
    u = o ? module952.parse(o[2]) : {},
    c = o ? o[1] : t,
    f = n || '://',
    l = c.split(f)[1];
  if (undefined === l) l = c;
  if ('/' === l) l = '';
  if ('/' === l[l.length - 1]) l = l.slice(0, -1);
  return {
    path: l,
    params: u,
  };
};

var j = function (t, o) {
  var l,
    p = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : {},
    h = {};
  Object.keys(t).forEach(function (t) {
    var n;
    if (undefined === (n = undefined !== p[t] ? p[t] : o[t].path)) n = t;
    module944.default(null === n || 'string' == typeof n, 'Route path for ' + t + ' must be specified as a string, or null.');
    var c = null !== n,
      l = [],
      s = c ? module950.default(n, l) : null,
      v = [],
      y = '' === n || !c,
      P = module950.default(y ? '*' : n + '/*', v);
    h[t] = {
      exactRe: s,
      exactReKeys: l,
      extendedPathRe: P,
      extendedPathReKeys: v,
      isWildcard: y,
      toPath:
        null === n
          ? function () {
              return '';
            }
          : module950.compile(n),
    };
  });
  l = Object.entries(h);
  return {
    getActionForPathAndParams: function () {
      for (
        var o, u = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : '', f = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {}, p = s(l);
        !(o = p()).done;

      ) {
        var h = o.value,
          v = module22.default(h, 2),
          y = v[0],
          P = v[1],
          j = P.exactRe,
          x = P.exactReKeys,
          A = P.extendedPathRe,
          w = P.extendedPathReKeys,
          R = t[y],
          S = j && j.exec(u);

        if (S && S.length) {
          var k = A && A.exec(u),
            D = null;

          if (k && R) {
            var F = O(k, w);
            D = R.getActionForPathAndParams(F, f);
          }

          return module941.default.navigate({
            routeName: y,
            params: b(f, S, x),
            action: D,
          });
        }
      }

      for (var K, M = s(l); !(K = M()).done; ) {
        var _ = K.value,
          E = module22.default(_, 2),
          I = E[0],
          W = E[1],
          N = W.extendedPathRe,
          T = W.extendedPathReKeys,
          C = t[I],
          U = N && N.exec(u);

        if (U && U.length) {
          var $ = O(U, T),
            q = null;
          if ((C && (q = C.getActionForPathAndParams($, f)), !q)) continue;
          return module941.default.navigate({
            routeName: I,
            params: b(f, U, T),
            action: q,
          });
        }
      }

      return null;
    },
    getPathAndParamsForRoute: function (n) {
      var o = n.routeName,
        u = n.params,
        c = t[o],
        f = h[o],
        l = f.toPath,
        s = f.exactReKeys,
        p = l(u),
        v = {};

      if (
        (u &&
          Object.keys(u)
            .filter(function (t) {
              return !s.find(function (n) {
                return n.name === t;
              });
            })
            .forEach(function (t) {
              v[t] = u[t];
            }),
        c)
      ) {
        var P = c.getPathAndParamsForState(n);
        return {
          path: p ? p + '/' + P.path : P.path,
          params: P.params ? y(y({}, v), P.params) : v,
        };
      }

      return {
        path: p,
        params: v,
      };
    },
  };
};

exports.createPathParser = j;
var x = {
  getParamsFromPath: b,
  createPathParser: j,
};
exports.default = x;
