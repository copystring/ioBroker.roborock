var module1540 = require('./1540'),
  module1590 = require('./1590').f,
  o = {}.toString,
  c = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  w = function (t) {
    try {
      return module1590(t);
    } catch (t) {
      return c.slice();
    }
  };

module.exports.f = function (f) {
  return c && '[object Window]' == o.call(f) ? w(f) : module1590(module1540(f));
};
