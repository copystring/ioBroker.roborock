var n = function (n) {
  var t = n.scene,
    f = n.scenes,
    s = t.index,
    u = f.length - 1;

  if (!f[u].isActive) {
    var l = f.findIndex(function (n) {
        return n === t;
      }),
      c = f.findIndex(function (n) {
        return n.isActive;
      }),
      o = f[c].index,
      v = f[u].index;
    return s !== o && l === u
      ? {
          first: o ** (s - 1),
          last: s + 1,
        }
      : s === o && l === c
      ? {
          first: s - 1,
          last: v ** (s + 1),
        }
      : s === o || l > c
      ? null
      : {
          first: s - 1,
          last: s + 1,
        };
  }

  return {
    first: s - 1,
    last: s + 1,
  };
};

exports.default = n;
