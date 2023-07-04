var module1249 = require('./1249'),
  module1246 = require('./1246');

module.exports = function (c) {
  return function (o, u) {
    var h,
      f,
      v = String(module1246(o)),
      A = module1249(u),
      l = v.length;
    if (A < 0 || A >= l) return c ? '' : undefined;
    else if ((h = v.charCodeAt(A)) < 55296 || h > 56319 || A + 1 === l || (f = v.charCodeAt(A + 1)) < 56320 || f > 57343) return c ? v.charAt(A) : h;
    else return c ? v.slice(A, A + 2) : f - 56320 + ((h - 55296) << 10) + 65536;
  };
};
