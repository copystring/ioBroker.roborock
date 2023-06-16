var module1460 = require('./1460'),
  module1510 = require('./1510').f,
  o = {}.toString,
  c = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  w = function (t) {
    try {
      return module1510(t);
    } catch (t) {
      return c.slice();
    }
  };

module.exports.f = function (f) {
  return c && '[object Window]' == o.call(f) ? w(f) : module1510(module1460(f));
};
