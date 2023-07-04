var module1137 = require('./1137');

module.exports = function (o) {
  if (!module1137(o)) throw TypeError(o + ' is not an object!');
  return o;
};
