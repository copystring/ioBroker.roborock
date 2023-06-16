var module1449 = require('./1449');

module.exports = function (n, o) {
  if (!module1449(n)) return n;
  var f, u;
  if (o && 'function' == typeof (f = n.toString) && !module1449((u = f.call(n)))) return u;
  if ('function' == typeof (f = n.valueOf) && !module1449((u = f.call(n)))) return u;
  if (!o && 'function' == typeof (f = n.toString) && !module1449((u = f.call(n)))) return u;
  throw TypeError("Can't convert object to primitive value");
};
