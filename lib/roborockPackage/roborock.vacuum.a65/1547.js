var module1546 = require('./1546'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1546(u)) < 0 ? t(u + c, 0) : o(u, c);
};
