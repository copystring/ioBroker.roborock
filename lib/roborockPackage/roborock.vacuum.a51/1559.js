var module1539 = require('./1539'),
  module1536 = require('./1536');

module.exports = function (c) {
  return function (o, u) {
    var h,
      f,
      v = String(module1536(o)),
      A = module1539(u),
      l = v.length;
    if (A < 0 || A >= l) return c ? '' : undefined;
    else if ((h = v.charCodeAt(A)) < 55296 || h > 56319 || A + 1 === l || (f = v.charCodeAt(A + 1)) < 56320 || f > 57343) return c ? v.charAt(A) : h;
    else return c ? v.slice(A, A + 2) : f - 56320 + ((h - 55296) << 10) + 65536;
  };
};
