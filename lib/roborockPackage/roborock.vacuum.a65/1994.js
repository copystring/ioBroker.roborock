exports.parse = function (t, s, u, y) {
  var p = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
    v = base64js.toByteArray(t);
  return u ? c(v, s, y) : n(v, s, p);
};

var module1486 = require('./1486'),
  n = module1486.parseSync,
  c = module1486.parseSyncSax,
  base64js = require('base64-js');
