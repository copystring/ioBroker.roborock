var module209 = require('./209');

module.exports = function (t) {
  var o,
    s = {};

  for (o in ((t instanceof Object && !Array.isArray(t)) || module209(false), t)) t.hasOwnProperty(o) && (s[o] = o);

  return s;
};
