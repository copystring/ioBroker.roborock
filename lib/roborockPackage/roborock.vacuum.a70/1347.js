exports.default = function (l, n) {
  if (null != l.fill) n.push('fill');
  if (null != l.fillOpacity) n.push('fillOpacity');
  if (null != l.fillRule) n.push('fillRule');
  var o = l.fill,
    p = l.fillRule,
    y = l.fillOpacity;
  return {
    fill: o || 'number' == typeof o ? module1348.default(o) : c,
    fillRule: 0 === t[p] ? 0 : 1,
    fillOpacity: module1350.default(y),
  };
};

var module1348 = require('./1348'),
  module1350 = require('./1350'),
  module1349 = require('./1349'),
  t = {
    evenodd: 0,
    nonzero: 1,
  },
  o = module1349.colorNames.black,
  c = [0, module1349.integerColor(o)];
