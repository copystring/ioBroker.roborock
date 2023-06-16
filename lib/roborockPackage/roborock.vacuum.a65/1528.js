var module1529 = require('./1529');

module.exports = function (o) {
  if (!module1529(o)) throw TypeError(o + ' is not an object!');
  return o;
};
