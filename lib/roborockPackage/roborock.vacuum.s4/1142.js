var module1137 = require('./1137');

module.exports = function (n, o) {
  if (!module1137(n)) return n;
  var f, u;
  if (o && 'function' == typeof (f = n.toString) && !module1137((u = f.call(n)))) return u;
  if ('function' == typeof (f = n.valueOf) && !module1137((u = f.call(n)))) return u;
  if (!o && 'function' == typeof (f = n.toString) && !module1137((u = f.call(n)))) return u;
  throw TypeError("Can't convert object to primitive value");
};
