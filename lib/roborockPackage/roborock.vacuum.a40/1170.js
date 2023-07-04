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
    v = y && 'none' !== y ? module1171.default(y) : null;
  return {
    stroke: module1167.default(f),
    strokeOpacity: module1169.default(t.strokeOpacity),
    strokeLinecap: l[t.strokeLinecap] || 0,
    strokeLinejoin: k[t.strokeLinejoin] || 0,
    strokeDasharray: v && v.length % 2 == 1 ? v.concat(v) : v,
    strokeWidth: p,
    strokeDashoffset: y ? +t.strokeDashoffset || 0 : null,
    strokeMiterlimit: parseFloat(t.strokeMiterlimit) || 4,
    vectorEffect: u[t.vectorEffect] || 0,
  };
};

var module1167 = require('./1167'),
  module1169 = require('./1169'),
  module1171 = require('./1171'),
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
