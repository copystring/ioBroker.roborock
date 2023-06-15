exports.default = function (n) {
  if ('number' == typeof n && n >>> 0 === n && n >= 0 && n <= 4294967295) return [0, module1277.integerColor(n)];
  if (!n || 'none' === n) return null;
  if ('currentColor' === n) return o;
  var l = 'string' == typeof n && n.match(u);
  if (l) return [1, l[1]];
  var f = module1277.default(n);
  if ('number' == typeof f) return [0, f];
  console.warn('"' + n + '" is not a valid color or brush');
  return null;
};

var module1277 = require('./1277'),
  u = /^url\(#(.+)\)$/,
  o = [2];
