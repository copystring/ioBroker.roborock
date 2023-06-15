var module1146 = require('./1146'),
  module1196 = require('./1196').f,
  o = {}.toString,
  c = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  w = function (t) {
    try {
      return module1196(t);
    } catch (t) {
      return c.slice();
    }
  };

module.exports.f = function (f) {
  return c && '[object Window]' == o.call(f) ? w(f) : module1196(module1146(f));
};
