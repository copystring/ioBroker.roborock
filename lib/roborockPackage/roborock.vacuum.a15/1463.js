var module1464 = require('./1464'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1464(o), 9007199254740991) : 0;
};
