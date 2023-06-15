exports.default = function (l, n) {
  if (null != l.fill) n.push('fill');
  if (null != l.fillOpacity) n.push('fillOpacity');
  if (null != l.fillRule) n.push('fillRule');
  var o = l.fill,
    p = l.fillRule,
    y = l.fillOpacity;
  return {
    fill: o || 'number' == typeof o ? module1276.default(o) : c,
    fillRule: 0 === t[p] ? 0 : 1,
    fillOpacity: module1278.default(y),
  };
};

var module1276 = require('./1276'),
  module1278 = require('./1278'),
  module1277 = require('./1277'),
  t = {
    evenodd: 0,
    nonzero: 1,
  },
  o = module1277.colorNames.black,
  c = [0, module1277.integerColor(o)];
