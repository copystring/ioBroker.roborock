var module1232 = require('./1232');

module.exports = function (o) {
  if (!module1232(o)) throw TypeError(o + ' is not an object!');
  return o;
};
