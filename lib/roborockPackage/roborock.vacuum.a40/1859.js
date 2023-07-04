exports.parse = function (t, s, u, y) {
  var p = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
    v = base64js.toByteArray(t);
  return u ? c(v, s, y) : n(v, s, p);
};

var module1487 = require('./1487'),
  n = module1487.parseSync,
  c = module1487.parseSyncSax,
  base64js = require('base64-js');
