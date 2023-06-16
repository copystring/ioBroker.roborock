exports.default = function (l, n) {
  if (null != l.fill) n.push('fill');
  if (null != l.fillOpacity) n.push('fillOpacity');
  if (null != l.fillRule) n.push('fillRule');
  var o = l.fill,
    p = l.fillRule,
    y = l.fillOpacity;
  return {
    fill: o || 'number' == typeof o ? module1073.default(o) : c,
    fillRule: 0 === t[p] ? 0 : 1,
    fillOpacity: module1075.default(y),
  };
};

var module1073 = require('./1073'),
  module1075 = require('./1075'),
  module1074 = require('./1074'),
  t = {
    evenodd: 0,
    nonzero: 1,
  },
  o = module1074.colorNames.black,
  c = [0, module1074.integerColor(o)];
