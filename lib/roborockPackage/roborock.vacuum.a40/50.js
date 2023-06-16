module.exports = function (n, t, u) {
  if (t in n)
    Object.defineProperty(n, t, {
      value: u,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  else n[t] = u;
  return n;
};
