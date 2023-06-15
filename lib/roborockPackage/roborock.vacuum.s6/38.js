module.exports = function (t, n, u) {
  var b,
    c = u.get,
    o = false !== u.enumerable,
    f = false !== u.writable,
    l = false;

  function s(u) {
    b = u;
    l = true;
    Object.defineProperty(t, n, {
      value: u,
      configurable: true,
      enumerable: o,
      writable: f,
    });
  }

  Object.defineProperty(t, n, {
    get: function () {
      if (!l) {
        l = true;
        s(c());
      }

      return b;
    },
    set: s,
    configurable: true,
    enumerable: o,
  });
};
