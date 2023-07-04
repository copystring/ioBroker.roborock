var module1522 = require('./1522');

module.exports = function (n, o) {
  if (!module1522(n)) return n;
  var f, u;
  if (o && 'function' == typeof (f = n.toString) && !module1522((u = f.call(n)))) return u;
  if ('function' == typeof (f = n.valueOf) && !module1522((u = f.call(n)))) return u;
  if (!o && 'function' == typeof (f = n.toString) && !module1522((u = f.call(n)))) return u;
  throw TypeError("Can't convert object to primitive value");
};
