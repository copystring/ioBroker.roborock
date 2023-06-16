function t(t) {
  return t < 10 ? '0' + t : t;
}

function n(t) {
  return t < 10 ? t + '00' : t < 100 ? t + '0' : t;
}

exports.format = function (n, c) {
  var l = new Date(n);
  return c
    .replace('YYYY', l.getFullYear())
    .replace('MM', t(l.getMonth() + 1))
    .replace('DD', t(l.getDate()))
    .replace('HH', t(l.getHours()))
    .replace('mm', t(l.getMinutes()))
    .replace('ss', t(l.getSeconds()));
};

exports.formatWithMillis = function (c, l) {
  var s = new Date(c);
  return l
    .replace('YYYY', s.getFullYear())
    .replace('MM', t(s.getMonth() + 1))
    .replace('DD', t(s.getDate()))
    .replace('HH', t(s.getHours()))
    .replace('mm', t(s.getMinutes()))
    .replace('ss', t(s.getSeconds()))
    .replace('SSS', n(s.getMilliseconds()));
};

exports.formatSpeical = function (n, c) {
  var l = new Date(n);
  if (l.getSeconds() >= 30) l = new Date(l.getTime() + 6e4);
  return c
    .replace('YYYY', l.getFullYear())
    .replace('MMM', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][l.getMonth()])
    .replace('MM', t(l.getMonth() + 1))
    .replace('DD', t(l.getDate()))
    .replace('HH', t(l.getHours()))
    .replace('mm', t(l.getMinutes()))
    .replace('ss', t(l.getSeconds()));
};

exports.extend = t;
exports.append = n;

exports.GenerateTimestamp = function (t, n, c, l) {
  var s = new Date();
  s.setHours(n);
  s.setMinutes(t);

  if (-1 != c && -1 != l) {
    s.setMonth((l + 11) % 12);
    s.setDate(c);
  }

  return s.getTime();
};

exports.GetTimestampBeforeSeconds = function (t) {
  return new Date().getTime() - 1e3 * t;
};

exports.GenerateTimestampByEnLocalString = function (t) {
  var n = t.split(','),
    c = n[0].split('/'),
    l = n[1].split(':'),
    s = parseInt(c[2]),
    p = parseInt(c[0]),
    u = parseInt(c[1]),
    o = s + '-' + p + '-' + u + ' ' + l[0] + ':' + l[1] + ':' + l[2];
  return new Date(o);
};
