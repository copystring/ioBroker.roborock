exports.default = function (l, n) {
  if (null != l.fill) n.push('fill');
  if (null != l.fillOpacity) n.push('fillOpacity');
  if (null != l.fillRule) n.push('fillRule');
  var o = l.fill,
    p = l.fillRule,
    y = l.fillOpacity;
  return {
    fill: o || 'number' == typeof o ? module1354.default(o) : c,
    fillRule: 0 === t[p] ? 0 : 1,
    fillOpacity: module1356.default(y),
  };
};

var module1354 = require('./1354'),
  module1356 = require('./1356'),
  module1355 = require('./1355'),
  t = {
    evenodd: 0,
    nonzero: 1,
  },
  o = module1355.colorNames.black,
  c = [0, module1355.integerColor(o)];
