exports.props2transform = c;
exports.transformToMatrix = y;

exports.default = function (t) {
  if (Array.isArray(t)) return t;
  if ('string' == typeof t)
    try {
      var n = module1283.default.parse(t);
      return [n[0], n[3], n[1], n[4], n[2], n[5]];
    } catch (t) {
      console.error(t);
      return module1282.identity;
    }
  return y(c(t), t.transform);
};

var module1282 = require('./1282'),
  module1283 = require('./1283'),
  f = new module1282.default();

function l(t) {
  f.appendTransform(t.x + t.originX, t.y + t.originY, t.scaleX, t.scaleY, t.rotation, t.skewX, t.skewY, t.originX, t.originY);
}

function u(t, n, s, o) {
  var f, l;
  if ('number' == typeof t) f = l = t;
  else if ('string' == typeof t) {
    var u = t.split(/\s*,\s*/);

    if (2 === u.length) {
      f = +u[0];
      l = +u[1];
    } else if (1 === u.length) f = l = +u[0];
  } else Array.isArray(t) && (2 === t.length ? ((f = +t[0]), (l = +t[1])) : 1 === t.length && (f = l = +t[0]));
  n = +n;
  if (!isNaN(n)) f = n;
  module1282 = +module1282;
  if (!isNaN(module1282)) l = module1282;
  return [f || o || 0, l || o || 0];
}

function c(t) {
  var n = u(t.origin, t.originX, t.originY),
    s = u(t.scale, t.scaleX, t.scaleY, 1),
    o = u(t.skew, t.skewX, t.skewY),
    f = u(t.translate, t.translateX || t.x, t.translateY || t.y);
  return {
    rotation: +t.rotation || 0,
    scaleX: s[0],
    scaleY: s[1],
    originX: n[0],
    originY: n[1],
    skewX: o[0],
    skewY: o[1],
    x: f[0],
    y: f[1],
  };
}

function y(t, n) {
  if ((f.reset(), l(t), n))
    if (Array.isArray(n)) 'number' == typeof n[0] && f.append(n[0], n[1], n[2], n[3], n[4], n[5]);
    else if ('string' == typeof n)
      try {
        var s = module1283.default.parse(n);
        f.append(s[0], s[3], s[1], s[4], s[2], s[5]);
      } catch (t) {
        console.error(t);
      }
    else l(c(n));
  return f.toArray();
}
