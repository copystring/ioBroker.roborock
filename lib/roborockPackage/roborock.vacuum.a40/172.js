var t = {
  top: undefined,
  left: undefined,
  right: undefined,
  bottom: undefined,
};

module.exports = function (o, f) {
  return (o = o || t) !== (f = f || t) && (o.top !== f.top || o.left !== f.left || o.right !== f.right || o.bottom !== f.bottom);
};
