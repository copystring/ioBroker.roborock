function t(t, o) {
  var u = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (u) return (u = u.call(t)).next.bind(u);

  if (Array.isArray(t) || (u = n(t)) || (o && t && 'number' == typeof t.length)) {
    if (u) t = u;
    var s = 0;
    return function () {
      return s >= t.length
        ? {
            done: true,
          }
        : {
            done: false,
            value: t[s++],
          };
    };
  }

  throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function n(t, n) {
  if (t) {
    if ('string' == typeof t) return o(t, n);
    var u = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === u && t.constructor) u = t.constructor.name;
    return 'Map' === u || 'Set' === u ? Array.from(t) : 'Arguments' === u || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u) ? o(t, n) : undefined;
  }
}

function o(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, u = new Array(n); o < n; o++) u[o] = t[o];

  return u;
}

exports.ConvertArrayToRepeatNum = function (t) {
  for (var n = 0, o = t.length, u = 0; u < o; u++) 1 == t[u] && (n |= 1 << (6 - u));

  return n;
};

exports.ConvertCustomRepeat = p;

exports.ConvertToReadableFormat = function (t) {
  T = n[0];
  b = n[1];
  C = n[2];
  h = n[3];
  var n = t.split(' '),
    o = parseInt(T),
    s = parseInt(b),
    f = C == u ? -1 : parseInt(C),
    l = h == u ? -1 : parseInt(h),
    v = c(n[4]),
    p = y(f, l, v);
  var h;
  var C;
  var b;
  var T;
  return {
    minute: o,
    hour: s,
    dateofmonth: f,
    month: l,
    repeat: p,
  };
};

exports.ConvertToCronStr = function (t, n, o, v, c) {
  var y = '';
  if (((y += n), (y += s + t), o == l)) y += s + v + s + c + s + u;
  else {
    y += ' * * ';

    for (var h = p(o), C = false, b = 0; b < 7; ++b) 0 != h[b] && ((y += C ? f + b : b), (C = true));
  }
  return y;
};

exports.GetExecDate = function (t, n, o) {
  var u = new Date(),
    s = new Date(u.getTime());
  s.setHours(t);
  s.setMinutes(n);
  var f = h(o);
  if (s.getTime() < u.getTime()) f || ++f;
  s.setTime(s.getTime() + 864e5 * f);
  return {
    hour: s.getHours(),
    minute: s.getMinutes(),
    date: s.getDate(),
    month: s.getMonth() + 1,
    year: s.getFullYear(),
  };
};

exports.CalcTimeElapse = function (t, n, o, u) {
  var s = new Date(),
    f = new Date(s.getTime());
  f.setHours(n);
  f.setMinutes(t);
  f.setDate(o);
  f.setMonth(u - 1);
  return f.getTime() - s.getTime();
};

var u = '*',
  s = ' ',
  f = ',',
  l = 0;
exports.CodeOnce = l;
var v = 127;
exports.CodeEveryday = v;
exports.CodeWeekdays = 62;
exports.CodeWeekends = 65;

function c(t) {
  if (t == u) return [];

  for (var n = t.split(','), o = n.length, s = new Array(o), f = 0; f < o; f++) s[f] = parseInt(n[f]);

  return s;
}

function y(n, o, u) {
  if ((-1 != n && -1 != o) || 0 == u.length) return l;

  for (var s, f = 0, v = t(u); !(s = v()).done; ) {
    f |= 1 << (6 - s.value);
  }

  return f;
}

function p(t) {
  for (var n = new Array(7), o = 0; o < 7; o++) n[6 - o] = (t >> o) & 1;

  return n;
}

function h(t) {
  if (t == l || t == v) return 0;
  var n = 0,
    o = new Date().getDay();

  for (n = 0; n < 7 && !((t >> (6 - o)) & true); n++) o = (o + 1) % 7;

  return n;
}
