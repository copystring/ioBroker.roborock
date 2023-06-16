var module1464 = require('./1464'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1464(u)) < 0 ? t(u + c, 0) : o(u, c);
};
