module.exports = function (n, u) {
  return {
    enumerable: !(1 & n),
    configurable: !(2 & n),
    writable: !(4 & n),
    value: u,
  };
};
