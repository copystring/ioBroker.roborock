var module1533 = require('./1533'),
  module1583 = require('./1583').f,
  o = {}.toString,
  c = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  w = function (t) {
    try {
      return module1583(t);
    } catch (t) {
      return c.slice();
    }
  };

module.exports.f = function (f) {
  return c && '[object Window]' == o.call(f) ? w(f) : module1583(module1533(f));
};
