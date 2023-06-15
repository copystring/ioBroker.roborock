var module1464 = require('./1464'),
  module1461 = require('./1461');

module.exports = function (c) {
  return function (o, u) {
    var h,
      f,
      v = String(module1461(o)),
      A = module1464(u),
      l = v.length;
    if (A < 0 || A >= l) return c ? '' : undefined;
    else if ((h = v.charCodeAt(A)) < 55296 || h > 56319 || A + 1 === l || (f = v.charCodeAt(A + 1)) < 56320 || f > 57343) return c ? v.charAt(A) : h;
    else return c ? v.slice(A, A + 2) : f - 56320 + ((h - 55296) << 10) + 65536;
  };
};
