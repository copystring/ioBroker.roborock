function t(t, o) {
  var u;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (u = n(t)) || (o && t && 'number' == typeof t.length)) {
      if (u) t = u;
      var f = 0;
      return function () {
        return f >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[f++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (u = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(u);
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
  C = n[1];
  b = n[2];
  h = n[3];
  var n = t.split(' '),
    o = parseInt(T),
    f = parseInt(C),
    s = b == u ? -1 : parseInt(b),
    l = h == u ? -1 : parseInt(h),
    v = c(n[4]),
    p = y(s, l, v);
  var h;
  var b;
  var C;
  var T;
  return {
    minute: o,
    hour: f,
    dateofmonth: s,
    month: l,
    repeat: p,
  };
};

exports.ConvertToCronStr = function (t, n, o, v, c) {
  var y = '';
  if (((y += n), (y += f + t), o == l)) y += f + v + f + c + f + u;
  else {
    y += ' * * ';

    for (var h = p(o), b = false, C = 0; C < 7; ++C) 0 != h[C] && ((y += b ? s + C : C), (b = true));
  }
  return y;
};

exports.GetExecDate = function (t, n, o) {
  var u = new Date(),
    f = new Date(u.getTime());
  f.setHours(t);
  f.setMinutes(n);
  var s = h(o);
  if (f.getTime() < u.getTime()) s || ++s;
  f.setTime(f.getTime() + 864e5 * s);
  return {
    hour: f.getHours(),
    minute: f.getMinutes(),
    date: f.getDate(),
    month: f.getMonth() + 1,
    year: f.getFullYear(),
  };
};

exports.CalcTimeElapse = function (t, n, o, u) {
  var f = new Date(),
    s = new Date(f.getTime());
  s.setHours(n);
  s.setMinutes(t);
  s.setDate(o);
  s.setMonth(u - 1);
  return s.getTime() - f.getTime();
};

var u = '*',
  f = ' ',
  s = ',',
  l = 0;
exports.CodeOnce = l;
var v = 127;
exports.CodeEveryday = v;
exports.CodeWeekdays = 62;
exports.CodeWeekends = 65;

function c(t) {
  if (t == u) return [];

  for (var n = t.split(','), o = n.length, f = new Array(o), s = 0; s < o; s++) f[s] = parseInt(n[s]);

  return f;
}

function y(n, o, u) {
  if ((-1 != n && -1 != o) || 0 == u.length) return l;

  for (var f, s = 0, v = t(u); !(f = v()).done; ) {
    s |= 1 << (6 - f.value);
  }

  return s;
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
