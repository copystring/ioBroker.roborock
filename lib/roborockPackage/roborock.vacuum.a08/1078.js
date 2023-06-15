exports.props2transform = c;
exports.transformToMatrix = p;

exports.default = function (t) {
  if (Array.isArray(t)) return t;
  if ('string' == typeof t)
    try {
      var s = module1080.default.parse(t);
      return [s[0], s[3], s[1], s[4], s[2], s[5]];
    } catch (t) {
      console.error(t);
      return module1079.identity;
    }
  return p(c(t), t.transform);
};

var module1079 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = s(n);
    if (o && o.has(t)) return o.get(t);
    var f = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (c && (c.get || c.set)) Object.defineProperty(f, l, c);
        else f[l] = t[l];
      }

    f.default = t;
    if (o) o.set(t, f);
    return f;
  })(require('./1079')),
  module1080 = require('./1080');

function s(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (s = function (t) {
    return t ? o : n;
  })(t);
}

var f = new module1079.default();

function u(t) {
  f.appendTransform(t.x + t.originX, t.y + t.originY, t.scaleX, t.scaleY, t.rotation, t.skewX, t.skewY, t.originX, t.originY);
}

function l(t, n, o, s) {
  var f, u;
  if ('number' == typeof t) f = u = t;
  else if ('string' == typeof t) {
    var l = t.split(/\s*,\s*/);

    if (2 === l.length) {
      f = +l[0];
      u = +l[1];
    } else if (1 === l.length) f = u = +l[0];
  } else Array.isArray(t) && (2 === t.length ? ((f = +t[0]), (u = +t[1])) : 1 === t.length && (f = u = +t[0]));
  module1079 = +module1079;
  if (!isNaN(module1079)) f = module1079;
  module1080 = +module1080;
  if (!isNaN(module1080)) u = module1080;
  return [f || s || 0, u || s || 0];
}

function c(t) {
  var n = l(t.origin, t.originX, t.originY),
    o = l(t.scale, t.scaleX, t.scaleY, 1),
    s = l(t.skew, t.skewX, t.skewY),
    f = l(t.translate, t.translateX || t.x, t.translateY || t.y);
  return {
    rotation: +t.rotation || 0,
    scaleX: o[0],
    scaleY: o[1],
    originX: n[0],
    originY: n[1],
    skewX: s[0],
    skewY: s[1],
    x: f[0],
    y: f[1],
  };
}

function p(t, n) {
  if ((f.reset(), u(t), n))
    if (Array.isArray(n)) 'number' == typeof n[0] && f.append(n[0], n[1], n[2], n[3], n[4], n[5]);
    else if ('string' == typeof n)
      try {
        var s = module1080.default.parse(n);
        f.append(s[0], s[3], s[1], s[4], s[2], s[5]);
      } catch (t) {
        console.error(t);
      }
    else u(c(n));
  return f.toArray();
}
