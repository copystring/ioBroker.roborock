var module1249 = require('./1249'),
  t = Math.max,
  o = Math.min;

module.exports = function (u, c) {
  return (u = module1249(u)) < 0 ? t(u + c, 0) : o(u, c);
};
