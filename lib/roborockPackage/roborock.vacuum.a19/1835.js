var module1821 = require('./1821');

module.exports = function (s, n) {
  module1821('number' == typeof s && s > 0 && !isNaN(s), "%s must be a strictly positive number. Got: '%s'", n, s);
};
