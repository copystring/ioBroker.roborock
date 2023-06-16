var module1145 = require('./1145'),
  module1158 = require('./1158').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1145(o, module1158);
  };
