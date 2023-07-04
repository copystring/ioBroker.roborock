var module1522 = require('./1522');

module.exports = function (o) {
  if (!module1522(o)) throw TypeError(o + ' is not an object!');
  return o;
};
