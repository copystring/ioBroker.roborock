var module1459 = require('./1459'),
  module1472 = require('./1472').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1459(o, module1472);
  };
