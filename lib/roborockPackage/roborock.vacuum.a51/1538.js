var module1539 = require('./1539'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1539(o), 9007199254740991) : 0;
};
