var module1135 = require('./1135');

module.exports = function (n, o) {
  if (!module1135(n)) return n;
  var f, u;
  if (o && 'function' == typeof (f = n.toString) && !module1135((u = f.call(n)))) return u;
  if ('function' == typeof (f = n.valueOf) && !module1135((u = f.call(n)))) return u;
  if (!o && 'function' == typeof (f = n.toString) && !module1135((u = f.call(n)))) return u;
  throw TypeError("Can't convert object to primitive value");
};
