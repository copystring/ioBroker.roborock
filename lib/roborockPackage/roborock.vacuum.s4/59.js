var module21 = require('./21'),
  n = Object.getOwnPropertySymbols,
  o = Object.prototype.hasOwnProperty,
  c = Object.prototype.propertyIsEnumerable;

function f(t) {
  if (null === t || undefined === t) throw new TypeError('Object.assign cannot be called with null or undefined');
  return Object(t);
}

module.exports = (function () {
  try {
    if (!Object.assign) return false;
    var n = new String('abc');
    if (((n[5] = 'de'), '5' === Object.getOwnPropertyNames(n)[0])) return false;

    for (var o = {}, c = 0; c < 10; c++) o['_' + String.fromCharCode(c)] = c;

    if (
      '0123456789' !==
      Object.getOwnPropertyNames(o)
        .map(function (t) {
          return o[t];
        })
        .join('')
    )
      return false;
    var f = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (t) {
      f[t] = t;
    });
    return 'abcdefghijklmnopqrst' === Object.keys(module21({}, f)).join('');
  } catch (t) {
    return false;
  }
})()
  ? Object.assign
  : function (t, u) {
      for (var s, b, l = f(t), p = 1; p < arguments.length; p++) {
        for (var j in (s = Object(arguments[p]))) o.call(s, j) && (l[j] = s[j]);

        if (n) {
          b = n(s);

          for (var O = 0; O < b.length; O++) c.call(s, b[O]) && (l[b[O]] = s[b[O]]);
        }
      }

      return l;
    };
