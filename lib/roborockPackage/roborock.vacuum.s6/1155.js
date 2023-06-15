var module1154 = require('./1154'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1154(u)) < 0 ? t(u + c, 0) : o(u, c);
};
