exports.parse = function (t, s, u, y) {
  var p = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
    v = base64js.toByteArray(t);
  return u ? c(v, s, y) : n(v, s, p);
};

var module1406 = require('./1406'),
  n = module1406.parseSync,
  c = module1406.parseSyncSax,
  base64js = require('base64-js');
