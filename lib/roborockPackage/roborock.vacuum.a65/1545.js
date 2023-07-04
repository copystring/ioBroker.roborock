var module1546 = require('./1546'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1546(o), 9007199254740991) : 0;
};
