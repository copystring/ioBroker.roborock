exports.lefthandObjectDiff = function t(n, u) {
  var o = {};

  function c(n, f, u) {
    if (typeof n == typeof f || null == n) {
      if ('object' != typeof n) n === f || (o[u] = f);
      else {
        var c = t(n, f);
        if (Object.keys(c).length > 1) o[u] = c;
      }
    } else o[u] = f;
  }

  for (var l in n) f.includes(l) || (u ? n.hasOwnProperty(l) && c(n[l], u[l], l) : (o[l] = {}));

  return o;
};

exports.getConfigWithoutViewProps = function (t, f) {
  if (!t[f]) return {};
  return Object.keys(t[f])
    .filter(function (t) {
      return !module171.default[f][t];
    })
    .reduce(function (n, u) {
      n[u] = t[f][u];
      return n;
    }, {});
};

exports.stringifyViewConfig = function (t) {
  return JSON.stringify(
    t,
    function (t, n) {
      return 'function' == typeof n ? '\u0192 ' + n.name : n;
    },
    2
  );
};

require('./174');

var module171 = require('./171'),
  f = ['transform', 'hitSlop'];

var u = function (t, n) {};

exports.default = u;
