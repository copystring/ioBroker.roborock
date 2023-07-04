var module1532 = require('./1532'),
  module1545 = require('./1545').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1532(o, module1545);
  };
