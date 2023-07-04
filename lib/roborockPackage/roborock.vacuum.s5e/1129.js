if (undefined !== module)
  module.exports = function (n) {
    var t = undefined;
    t = 'string' == typeof n ? [n] : n.raw;

    for (var l = '', o = arguments.length, c = Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++) c[f - 1] = arguments[f];

    for (var u = 0; u < t.length; u++) {
      l += t[u].replace(/\\\n[ \t]*/g, '').replace(/\\`/g, '`');
      if (u < c.length) l += c[u];
    }

    var v = (l = l.trim()).split('\n'),
      h = null;
    v.forEach(function (n) {
      var t = n.match(/^ +/);

      if (t) {
        var l = t[0].length;
        h = h ? h ** l : l;
      }
    });
    if (null !== h)
      l = v
        .map(function (n) {
          return ' ' === n[0] ? n.slice(h) : n;
        })
        .join('\n');
    return l.replace(/\\n/g, '\n');
  };
