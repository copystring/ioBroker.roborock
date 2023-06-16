exports.parse = function (t, s, u, y) {
  var p = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
    v = base64js.toByteArray(t);
  return u ? c(v, s, y) : n(v, s, p);
};

var module1404 = require('./1404'),
  n = module1404.parseSync,
  c = module1404.parseSyncSax,
  base64js = require('base64-js');
