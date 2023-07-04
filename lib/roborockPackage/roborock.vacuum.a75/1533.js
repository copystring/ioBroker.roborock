var module1528 = require('./1528');

module.exports = function (n, o) {
  if (!module1528(n)) return n;
  var f, u;
  if (o && 'function' == typeof (f = n.toString) && !module1528((u = f.call(n)))) return u;
  if ('function' == typeof (f = n.valueOf) && !module1528((u = f.call(n)))) return u;
  if (!o && 'function' == typeof (f = n.toString) && !module1528((u = f.call(n)))) return u;
  throw TypeError("Can't convert object to primitive value");
};
