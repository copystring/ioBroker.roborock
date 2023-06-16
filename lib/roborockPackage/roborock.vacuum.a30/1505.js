var module1456 = require('./1456'),
  module1471 = require('./1471'),
  module1472 = require('./1472');

module.exports = function (o) {
  var u = module1456(o),
    c = module1471.f;
  if (c) for (var l, v = c(o), h = module1472.f, p = 0; v.length > p; ) h.call(o, (l = v[p++])) && u.push(l);
  return u;
};
