var module1532 = require('./1532'),
  module1545 = require('./1545');

module.exports =
  Object.keys ||
  function (c) {
    return module1532(c, module1545);
  };
