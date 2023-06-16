var module1147 = require('./1147'),
  module1160 = require('./1160').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1147(o, module1160);
  };
