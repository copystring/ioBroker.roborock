var t = {
  x: undefined,
  y: undefined,
};

module.exports = function (n, o) {
  return (n = n || t) !== (o = o || t) && (n.x !== o.x || n.y !== o.y);
};
