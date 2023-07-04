var module211 = require('./211');

module.exports = function (t) {
  var o,
    s = {};

  for (o in ((t instanceof Object && !Array.isArray(t)) || module211(false), t)) t.hasOwnProperty(o) && (s[o] = o);

  return s;
};
