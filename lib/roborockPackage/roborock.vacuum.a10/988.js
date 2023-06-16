exports.default = function (t, n, c, u) {
  if (
    (t.forEach(function (t) {
      var n = t.route;
      if (u && u[n.key]) t.descriptor = u[n.key];
    }),
    c === n)
  )
    return t;
  var y = new Map(),
    h = new Map(),
    p = new Map();
  t.forEach(function (t) {
    var n = t.key;
    if (t.isStale) p.set(n, t);
    y.set(n, t);
  });
  var k = new Set();
  n.routes.forEach(function (t, n) {
    var c = f + t.key,
      s = {
        index: n,
        isActive: false,
        isStale: false,
        key: c,
        route: t,
        descriptor: u && u[t.key],
      };
    module974.default(!k.has(c), 'navigation.state.routes[' + n + '].key "' + c + '" conflicts with another route!');
    k.add(c);
    if (p.has(c)) p.delete(c);
    h.set(c, s);
  });
  if (c)
    c.routes.forEach(function (n, o) {
      var c = f + n.key;

      if (!h.has(c)) {
        var s = t.find(function (t) {
            return t.route.key === n.key;
          }),
          y = s ? s.descriptor : u[n.key];
        if (y)
          p.set(c, {
            index: o,
            isActive: false,
            isStale: true,
            key: c,
            route: n,
            descriptor: y,
          });
      }
    });

  var O = [],
    b = function (t) {
      var n = t.key,
        o = y.has(n) ? y.get(n) : null;
      if (o && v(o, t)) O.push(o);
      else O.push(t);
    };

  p.forEach(b);
  h.forEach(b);
  O.sort(l);
  var j = 0;
  if (
    (O.forEach(function (t, o) {
      var c = !t.isStale && t.index === n.index;
      if (c !== t.isActive)
        O[o] = s(
          s({}, t),
          {},
          {
            isActive: c,
          }
        );
      if (c) j++;
    }),
    module974.default(1 === j, 'there should always be only one scene active, not %s.', j),
    O.length !== t.length)
  )
    return O;
  if (
    O.some(function (n, o) {
      return !v(t[o], n);
    })
  )
    return O;
  return t;
};

var module49 = require('./49'),
  module974 = require('./974'),
  module989 = require('./989');

function u(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function s(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      u(Object(c), true).forEach(function (o) {
        module49.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      u(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

var f = 'scene_';

function y(t, n) {
  var o = t.length - n.length;
  return o > 0 ? 1 : o < 0 ? -1 : t > n ? 1 : -1;
}

function l(t, n) {
  return t.index > n.index ? 1 : t.index < n.index ? -1 : y(t.key, n.key);
}

function v(t, n) {
  return t.key === n.key && t.index === n.index && t.isStale === n.isStale && t.isActive === n.isActive && h(t.route, n.route);
}

function h(t, n) {
  return t && n ? t.key === n.key && module989.default(t, n) : t === n;
}
