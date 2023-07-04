var module1447 = require('./1447');

module.exports = function (o) {
  if (!module1447(o)) throw TypeError(o + ' is not an object!');
  return o;
};
