var module1529 = require('./1529');

module.exports = function (n, o) {
  if (!module1529(n)) return n;
  var f, u;
  if (o && 'function' == typeof (f = n.toString) && !module1529((u = f.call(n)))) return u;
  if ('function' == typeof (f = n.valueOf) && !module1529((u = f.call(n)))) return u;
  if (!o && 'function' == typeof (f = n.toString) && !module1529((u = f.call(n)))) return u;
  throw TypeError("Can't convert object to primitive value");
};
