module.exports = function (t, l) {
  var n = null == t ? null : ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];

  if (null != n) {
    var o,
      u,
      f = [],
      y = true,
      p = false;

    try {
      for (n = n.call(t); !(y = (o = n.next()).done) && (f.push(o.value), !l || f.length !== l); y = true);
    } catch (t) {
      p = true;
      u = t;
    } finally {
      try {
        if (!(y || null == n.return)) n.return();
      } finally {
        if (p) throw u;
      }
    }

    return f;
  }
};

module.exports.default = module.exports;
module.exports.__esModule = true;
