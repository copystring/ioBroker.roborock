var t = 'undefined' == typeof window ? globals : window,
  n = function (t, n, s) {
    return function (c, o) {
      var l = t(
        function () {
          n.call(this, l);
          c.apply(this, arguments);
        }.bind(this),
        o
      );
      if (this[s]) this[s].push(l);
      else this[s] = [l];
      return l;
    };
  },
  s = function (t, n) {
    return function (s) {
      if (this[n]) {
        var c = this[n].indexOf(s);
        if (-1 !== c) this[n].splice(c, 1);
      }

      t(s);
    };
  },
  c = 'TimerMixin_timeouts',
  o = s(t.clearTimeout, c),
  l = n(t.setTimeout, o, c),
  u = 'TimerMixin_intervals',
  h = s(t.clearInterval, u),
  f = n(t.setInterval, function () {}, u),
  I = 'TimerMixin_immediates',
  v = s(t.clearImmediate, I),
  T = n(t.setImmediate, v, I),
  p = 'TimerMixin_rafs',
  x = s(t.cancelAnimationFrame, p),
  _ = {
    componentWillUnmount: function () {
      if (this[c])
        this[c].forEach(function (n) {
          t.clearTimeout(n);
        });
      this[c] = null;
      if (this[u])
        this[u].forEach(function (n) {
          t.clearInterval(n);
        });
      this[u] = null;
      if (this[I])
        this[I].forEach(function (n) {
          t.clearImmediate(n);
        });
      this[I] = null;
      if (this[p])
        this[p].forEach(function (n) {
          t.cancelAnimationFrame(n);
        });
      this[p] = null;
    },
    setTimeout: l,
    clearTimeout: o,
    setInterval: f,
    clearInterval: h,
    setImmediate: T,
    clearImmediate: v,
    requestAnimationFrame: n(t.requestAnimationFrame, x, p),
    cancelAnimationFrame: x,
  };

module.exports = _;
