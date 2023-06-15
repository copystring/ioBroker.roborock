exports.__esModule = true;

var module1476 = require('./1476');

exports.default = (function () {
  function u(u, n) {
    for (var l = 0; l < n.length; l++) {
      var o = n[l];
      o.enumerable = o.enumerable || false;
      o.configurable = true;
      if ('value' in o) o.writable = true;
      n.default(u, o.key, o);
    }
  }

  return function (n, t, l) {
    if (t) u(n.prototype, t);
    if (l) u(n, l);
    return n;
  };
})();
