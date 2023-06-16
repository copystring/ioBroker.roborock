exports.default = function (l, n) {
  if (null != l.fill) n.push('fill');
  if (null != l.fillOpacity) n.push('fillOpacity');
  if (null != l.fillRule) n.push('fillRule');
  var o = l.fill,
    p = l.fillRule,
    y = l.fillOpacity;
  return {
    fill: o || 'number' == typeof o ? module1071.default(o) : c,
    fillRule: 0 === t[p] ? 0 : 1,
    fillOpacity: module1073.default(y),
  };
};

var module1071 = require('./1071'),
  module1073 = require('./1073'),
  module1072 = require('./1072'),
  t = {
    evenodd: 0,
    nonzero: 1,
  },
  o = module1072.colorNames.black,
  c = [0, module1072.integerColor(o)];
