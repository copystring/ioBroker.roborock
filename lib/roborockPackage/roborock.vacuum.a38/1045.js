var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module50 = require('./50'),
  module1046 = require('./1046'),
  module1037 = require('./1037'),
  module1040 = require('./1040');

function s(t, n) {
  var o;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
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

  return (o = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(o);
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
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      v(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      v(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

var module1048 = require('./1048'),
  b = function (t, n, o) {
    return n.slice(1).reduce(function (t, n, u) {
      var c = o[u];
      if (!c || c.asterisk) return t;
      var l,
        f = c.name;

      try {
        l = decodeURIComponent(n);
      } catch (t) {}

      t[f] = l || n;
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
    u = o ? module1048.parse(o[2]) : {},
    c = o ? o[1] : t,
    l = n || '://',
    f = c.split(l)[1];
  if (undefined === f) f = c;
  if ('/' === f) f = '';
  if ('/' === f[f.length - 1]) f = f.slice(0, -1);
  return {
    path: f,
    params: u,
  };
};

var j = function (t, n) {
  var u,
    p = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : {},
    h = {};
  Object.keys(t).forEach(function (t) {
    var o;
    if (undefined === (o = undefined !== p[t] ? p[t] : n[t].path)) o = t;
    module1040.default(null === o || 'string' == typeof o, 'Route path for ' + t + ' must be specified as a string, or null.');
    var u = null !== o,
      l = [],
      s = u ? module1046.default(o, l) : null,
      v = [],
      y = '' === o || !u,
      P = module1046.default(y ? '*' : o + '/*', v);
    h[t] = {
      exactRe: s,
      exactReKeys: l,
      extendedPathRe: P,
      extendedPathReKeys: v,
      isWildcard: y,
      toPath:
        null === o
          ? function () {
              return '';
            }
          : module1046.compile(o),
    };
  });
  u = Object.entries(h);
  return {
    getActionForPathAndParams: function () {
      for (
        var n, c = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : '', f = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {}, p = s(u);
        !(n = p()).done;

      ) {
        var h = n.value,
          v = module23.default(h, 2),
          y = v[0],
          P = v[1],
          j = P.exactRe,
          x = P.exactReKeys,
          A = P.extendedPathRe,
          R = P.extendedPathReKeys,
          S = t[y],
          w = j && j.exec(c);

        if (w && w.length) {
          var F = A && A.exec(c),
            K = null;

          if (F && S) {
            var k = O(F, R);
            K = S.getActionForPathAndParams(k, f);
          }

          return module1037.default.navigate({
            routeName: y,
            params: b(f, w, x),
            action: K,
          });
        }
      }

      for (var E, I = s(u); !(E = I()).done; ) {
        var D = E.value,
          _ = module23.default(D, 2),
          N = _[0],
          T = _[1],
          C = T.extendedPathRe,
          M = T.extendedPathReKeys,
          U = t[N],
          $ = C && C.exec(c);

        if ($ && $.length) {
          var W = O($, M),
            q = null;
          if ((U && (q = U.getActionForPathAndParams(W, f)), !q)) continue;
          return module1037.default.navigate({
            routeName: N,
            params: b(f, $, M),
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
        l = h[o],
        f = l.toPath,
        s = l.exactReKeys,
        p = f(u),
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
