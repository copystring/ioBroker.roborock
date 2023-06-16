var module1154 = require('./1154'),
  t = Math.min;

module.exports = function (o) {
  return o > 0 ? t(module1154(o), 9007199254740991) : 0;
};
