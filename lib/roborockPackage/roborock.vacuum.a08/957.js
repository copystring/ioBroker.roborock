var module49 = require('./49'),
  module944 = require('./944');

function o(t, n) {
  var u = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    u.push.apply(u, o);
  }

  return u;
}

function c(t) {
  for (var u = 1; u < arguments.length; u++) {
    var c = null != arguments[u] ? arguments[u] : {};
    if (u % 2)
      o(Object(c), true).forEach(function (u) {
        module49.default(t, u, c[u]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      o(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

var f = {
    get: function (t, n) {
      return (
        t.routes.find(function (t) {
          return t.key === n;
        }) || null
      );
    },
    indexOf: function (t, n) {
      return t.routes.findIndex(function (t) {
        return t.key === n;
      });
    },
    has: function (t, n) {
      return !!t.routes.some(function (t) {
        return t.key === n;
      });
    },
    push: function (t, n) {
      module944.default(-1 === f.indexOf(t, n.key), 'should not push route with duplicated key %s', n.key);
      var o = t.routes.slice();
      o.push(n);
      return c(
        c({}, t),
        {},
        {
          index: o.length - 1,
          routes: o,
        }
      );
    },
    pop: function (t) {
      if (t.index <= 0) return t;
      var n = t.routes.slice(0, -1);
      return c(
        c({}, t),
        {},
        {
          index: n.length - 1,
          routes: n,
        }
      );
    },
    jumpToIndex: function (t, n) {
      if (n === t.index) return t;
      else {
        module944.default(!!t.routes[n], 'invalid index %s to jump to', n);
        return c(
          c({}, t),
          {},
          {
            index: n,
          }
        );
      }
    },
    jumpTo: function (t, n) {
      var u = f.indexOf(t, n);
      return f.jumpToIndex(t, u);
    },
    back: function (t) {
      var n = t.index - 1;
      return t.routes[n] ? f.jumpToIndex(t, n) : t;
    },
    forward: function (t) {
      var n = t.index + 1;
      return t.routes[n] ? f.jumpToIndex(t, n) : t;
    },
    replaceAndPrune: function (t, n, u) {
      var o = f.indexOf(t, n),
        s = f.replaceAtIndex(t, o, u);
      return c(
        c({}, s),
        {},
        {
          routes: s.routes.slice(0, o + 1),
        }
      );
    },
    replaceAt: function (t, n, u) {
      var o = arguments.length > 3 && undefined !== arguments[3] && arguments[3],
        c = f.indexOf(t, n),
        s = o ? t.index : c,
        l = f.replaceAtIndex(t, c, u);
      l.index = s;
      return l;
    },
    replaceAtIndex: function (t, n, o) {
      if ((module944.default(!!t.routes[n], 'invalid index %s for replacing route %s', n, o.key), t.routes[n] === o && n === t.index)) return t;
      var f = t.routes.slice();
      f[n] = o;
      return c(
        c({}, t),
        {},
        {
          index: n,
          routes: f,
        }
      );
    },
    reset: function (t, n, o) {
      module944.default(n.length && Array.isArray(n), 'invalid routes to replace');
      var f = undefined === o ? n.length - 1 : o;

      if (t.routes.length === n.length && t.index === f) {
        if (
          t.routes.every(function (t, u) {
            return n[u] === t;
          })
        )
          return t;
      }

      module944.default(!!n[f], 'invalid index %s to reset', f);
      return c(
        c({}, t),
        {},
        {
          index: f,
          routes: n,
        }
      );
    },
  },
  s = f;
exports.default = s;
