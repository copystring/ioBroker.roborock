var module202 = require('./202'),
  module83 = require('./83');

module.exports = function (o) {
  var c = module202(o);
  return function (n, o, u, v) {
    var f = n;
    if (n[o]) (f = {})[o] = module83(n[o]);

    for (var p = arguments.length, s = new Array(p > 4 ? p - 4 : 0), l = 4; l < p; l++) s[l - 4] = arguments[l];

    return c.apply(undefined, [f, o, u, v].concat(s));
  };
};
