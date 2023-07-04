exports.default = function (t, h) {
  if (null != t.stroke) h.push('stroke');
  if (null != t.strokeWidth) h.push('strokeWidth');
  if (null != t.strokeOpacity) h.push('strokeOpacity');
  if (null != t.strokeDasharray) h.push('strokeDasharray');
  if (null != t.strokeDashoffset) h.push('strokeDashoffset');
  if (null != t.strokeLinecap) h.push('strokeLinecap');
  if (null != t.strokeLinejoin) h.push('strokeLinejoin');
  if (null != t.strokeMiterlimit) h.push('strokeMiterlimit');
  var f = t.stroke,
    c = t.strokeWidth,
    p = undefined === c ? 1 : c,
    y = t.strokeDasharray,
    v = y && 'none' !== y ? module1075.default(y) : null;
  return {
    stroke: module1071.default(f),
    strokeOpacity: module1073.default(t.strokeOpacity),
    strokeLinecap: l[t.strokeLinecap] || 0,
    strokeLinejoin: k[t.strokeLinejoin] || 0,
    strokeDasharray: v && v.length % 2 == 1 ? v.concat(v) : v,
    strokeWidth: p,
    strokeDashoffset: y ? +t.strokeDashoffset || 0 : null,
    strokeMiterlimit: parseFloat(t.strokeMiterlimit) || 4,
    vectorEffect: u[t.vectorEffect] || 0,
  };
};

var module1071 = require('./1071'),
  module1073 = require('./1073'),
  module1075 = require('./1075'),
  l = {
    butt: 0,
    square: 2,
    round: 1,
  },
  k = {
    miter: 0,
    bevel: 2,
    round: 1,
  },
  u = {
    none: 0,
    default: 0,
    nonScalingStroke: 1,
    'non-scaling-stroke': 1,
    inherit: 2,
    uri: 3,
  };
