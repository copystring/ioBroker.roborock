exports.default = function (t, n) {
  var o = new Set(),
    c = new Set(),
    l = new Set(),
    s = new Set(),
    f = new Set(),
    w = function () {
      [o, c, l, s, f].forEach(function (t) {
        return t.clear();
      });
      b.forEach(function (t) {
        return t && t.remove();
      });
    },
    p = function (t) {
      switch (t) {
        case 'action':
          return o;

        case 'willFocus':
          return c;

        case 'didFocus':
          return l;

        case 'willBlur':
          return s;

        case 'didBlur':
          return f;

        default:
          return null;
      }
    },
    y = function (t, n) {
      var o = u(
          u({}, n),
          {},
          {
            type: t,
          }
        ),
        c = p(t);
      if (c)
        c.forEach(function (t) {
          t(o);
        });
    },
    O = 'didBlur',
    b = ['willFocus', 'didFocus', 'willBlur', 'didBlur', 'action'].map(function (o) {
      return t(o, function (t) {
        if (c && c.routes) c.routes[c.index].key;
        var u = t.state,
          c = t.lastState,
          l = t.action,
          s = c && c.routes,
          f = u && u.routes,
          p = f && f[u.index].key,
          b = p === n,
          v =
            s &&
            s.find(function (t) {
              return t.key === n;
            }),
          B =
            f &&
            f.find(function (t) {
              return t.key === n;
            }),
          F = {
            context: n + ':' + l.type + '_' + (t.context || 'Root'),
            state: B,
            lastState: v,
            action: l,
            type: o,
          },
          j = !!u && u.isTransitioning,
          h = O;
        if ('didBlur' === O) 'willFocus' === o && b ? y((O = 'willFocus'), F) : 'action' === o && b && y((O = 'willFocus'), F);
        if ('willFocus' === O) 'didFocus' === o && b && !j ? y((O = 'didFocus'), F) : 'action' === o && b && !j && y((O = 'didFocus'), F);
        if ('didFocus' === O) b ? ('willBlur' === o ? y((O = 'willBlur'), F) : 'action' === o && 'didFocus' === h && y('action', F)) : y((O = 'willBlur'), F);
        if ('willBlur' === O) 'action' !== o || b || j ? 'didBlur' === o && y((O = 'didBlur'), F) : y((O = 'didBlur'), F);
        if (!('didBlur' !== O || B)) w();
      });
    });

  return {
    addListener: function (t, n) {
      var o = p(t);
      if (!o) throw new Error('Invalid event name "' + t + '"');
      o.add(n);
      return {
        remove: function () {
          o.delete(n);
        },
      };
    },
  };
};

var module50 = require('./50');

function o(t, n) {
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

function u(t) {
  for (var u = 1; u < arguments.length; u++) {
    var c = null != arguments[u] ? arguments[u] : {};
    if (u % 2)
      o(Object(c), true).forEach(function (o) {
        module50.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      o(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}
