var module1148 = require('./1148'),
  module1198 = require('./1198').f,
  o = {}.toString,
  c = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  w = function (t) {
    try {
      return module1198(t);
    } catch (t) {
      return c.slice();
    }
  };

module.exports.f = function (f) {
  return c && '[object Window]' == o.call(f) ? w(f) : module1198(module1148(f));
};
