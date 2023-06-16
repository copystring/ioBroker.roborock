var module1241 = require('./1241'),
  module1256 = require('./1256'),
  module1257 = require('./1257');

module.exports = function (o) {
  var u = module1241(o),
    c = module1256.f;
  if (c) for (var l, v = c(o), h = module1257.f, p = 0; v.length > p; ) h.call(o, (l = v[p++])) && u.push(l);
  return u;
};
