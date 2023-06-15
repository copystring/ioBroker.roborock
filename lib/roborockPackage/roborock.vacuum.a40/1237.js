var module1232 = require('./1232');

module.exports = function (n, o) {
  if (!module1232(n)) return n;
  var f, u;
  if (o && 'function' == typeof (f = n.toString) && !module1232((u = f.call(n)))) return u;
  if ('function' == typeof (f = n.valueOf) && !module1232((u = f.call(n)))) return u;
  if (!o && 'function' == typeof (f = n.toString) && !module1232((u = f.call(n)))) return u;
  throw TypeError("Can't convert object to primitive value");
};
