exports.default = function (l) {
  var x = l.viewBox,
    u = l.preserveAspectRatio;
  if (!x) return null;
  var o = (Array.isArray(x) ? x : x.trim().split(M)).map(Number);

  if (4 !== o.length || o.some(isNaN)) {
    console.warn('Invalid `viewBox` prop:' + x);
    return null;
  }

  var v = u ? u.trim().split(M) : [];
  return {
    minX: o[0],
    minY: o[1],
    vbWidth: o[2],
    vbHeight: o[3],
    align: t[v[0]] || 'xMidYMid',
    meetOrSlice: n[v[1]] || 0,
  };
};

var n = {
  meet: 0,
  slice: 1,
  none: 2,
};
exports.meetOrSliceTypes = n;
var t = ['xMinYMin', 'xMidYMin', 'xMaxYMin', 'xMinYMid', 'xMidYMid', 'xMaxYMid', 'xMinYMax', 'xMidYMax', 'xMaxYMax', 'none'].reduce(function (n, t) {
  n[t] = t;
  return n;
}, {});
exports.alignEnum = t;
var M = /\s+/;
