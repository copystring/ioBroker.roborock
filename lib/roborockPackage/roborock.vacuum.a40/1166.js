exports.default = function (l, n) {
  if (null != l.fill) n.push('fill');
  if (null != l.fillOpacity) n.push('fillOpacity');
  if (null != l.fillRule) n.push('fillRule');
  var o = l.fill,
    p = l.fillRule,
    y = l.fillOpacity;
  return {
    fill: o || 'number' == typeof o ? module1167.default(o) : c,
    fillRule: 0 === t[p] ? 0 : 1,
    fillOpacity: module1169.default(y),
  };
};

var module1167 = require('./1167'),
  module1169 = require('./1169'),
  module1168 = require('./1168'),
  t = {
    evenodd: 0,
    nonzero: 1,
  },
  o = module1168.colorNames.black,
  c = [0, module1168.integerColor(o)];
