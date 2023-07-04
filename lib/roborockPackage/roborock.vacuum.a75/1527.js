var module1528 = require('./1528');

module.exports = function (o) {
  if (!module1528(o)) throw TypeError(o + ' is not an object!');
  return o;
};
