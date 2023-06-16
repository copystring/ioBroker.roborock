var module1457 = require('./1457'),
  module1470 = require('./1470').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1457(o, module1470);
  };
