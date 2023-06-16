exports.default = function (l, n) {
  if (null != l.fill) n.push('fill');
  if (null != l.fillOpacity) n.push('fillOpacity');
  if (null != l.fillRule) n.push('fillRule');
  var o = l.fill,
    p = l.fillRule,
    y = l.fillOpacity;
  return {
    fill: o || 'number' == typeof o ? module1355.default(o) : c,
    fillRule: 0 === t[p] ? 0 : 1,
    fillOpacity: module1357.default(y),
  };
};

var module1355 = require('./1355'),
  module1357 = require('./1357'),
  module1356 = require('./1356'),
  t = {
    evenodd: 0,
    nonzero: 1,
  },
  o = module1356.colorNames.black,
  c = [0, module1356.integerColor(o)];
