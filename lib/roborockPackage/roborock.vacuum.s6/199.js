var module200 = require('./200'),
  module82 = require('./82');

module.exports = function (o) {
  var c = module200(o);
  return function (n, o, u, v) {
    var f = n;
    if (n[o]) (f = {})[o] = module82(n[o]);

    for (var p = arguments.length, s = new Array(p > 4 ? p - 4 : 0), l = 4; l < p; l++) s[l - 4] = arguments[l];

    return c.apply(undefined, [f, o, u, v].concat(s));
  };
};
