var t = {
  width: undefined,
  height: undefined,
};

module.exports = function (h, n) {
  return (h = h || t) !== (n = n || t) && (h.width !== n.width || h.height !== n.height);
};
