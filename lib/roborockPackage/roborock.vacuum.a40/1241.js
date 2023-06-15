var module1242 = require('./1242'),
  module1255 = require('./1255');

module.exports =
  Object.keys ||
  function (c) {
    return module1242(c, module1255);
  };
