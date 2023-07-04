exports.BytesToInt = function (n, t, o) {
  for (var u = 0, f = 0; f < o; f++) u |= (255 & parseInt(n[f + t])) << (8 * f);

  return u;
};

exports.BytesToHexString = function (n, t, o) {
  if (0 == o) return '';
  if (!t) t = 0;
  if (!o) o = n.length;

  for (var u = '', f = t; f < t + o; f++) {
    var c = n[f].toString(16);
    u += 1 == c.length ? '0' + c : c;
  }

  return u;
};

exports.BytesToASCII = function (n, t, o) {
  if (0 == o) return '';
  if (!t) t = 0;
  if (!o) o = n.length;

  for (var u = '', f = t; f < t + o; f++) {
    var c = String.fromCharCode(parseInt(n[f]));
    u += c;
  }

  return u;
};

exports.fromSqmmToSqm = function (n) {
  return Math.round(n / 1e6);
};

exports.fromSecToMin = function (n) {
  return Math.round(n / 60);
};

exports.fromMinToHour = function (n) {
  return Math.round(n / 60);
};

exports.fromSecToHour = function (n) {
  return Math.round(n / 3600);
};

exports.fill = function (n, t) {
  if (!n) return;

  for (var o = 0; o < n.length; o++) n[o] = t;
};
