var module190 = require('./190'),
  module191 = require('./191'),
  h = module190(module191, {
    initialize: function (t) {
      this.reset();
      if (t instanceof h) this.path = t.path.slice(0);
      else if (t) t.applyToPath ? t.applyToPath(this) : this.push(t);
    },
    onReset: function () {
      this.path = [];
    },
    onMove: function (t, n, h, o) {
      this.path.push(0, h, o);
    },
    onLine: function (t, n, h, o) {
      this.path.push(2, h, o);
    },
    onBezierCurve: function (t, n, h, o, s, p, u, c) {
      this.path.push(3, h, o, s, p, u, c);
    },
    _arcToBezier: module191.prototype.onArc,
    onArc: function (t, n, h, o, s, p, u, c, f, l, z, T) {
      if (u !== c || T) return this._arcToBezier(t, n, h, o, s, p, u, c, f, l, z, T);
      this.path.push(4, s, p, u, f, l, z ? 0 : 1);
    },
    onClose: function () {
      this.path.push(1);
    },
    toJSON: function () {
      return this.path;
    },
  });

module.exports = h;
