var module1135 = require('./1135');

module.exports = function (o) {
  if (!module1135(o)) throw TypeError(o + ' is not an object!');
  return o;
};
