exports.parse = function (t, s, u, y) {
  var p = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
    v = base64js.toByteArray(t);
  return u ? c(v, s, y) : n(v, s, p);
};

var module1479 = require('./1479'),
  n = module1479.parseSync,
  c = module1479.parseSyncSax,
  base64js = require('base64-js');
