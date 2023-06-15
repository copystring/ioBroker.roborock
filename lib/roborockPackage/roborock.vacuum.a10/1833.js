var module1819 = require('./1819');

module.exports = function (s, n) {
  module1819('number' == typeof s && s > 0 && !isNaN(s), "%s must be a strictly positive number. Got: '%s'", n, s);
};
