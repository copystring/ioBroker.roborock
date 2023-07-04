var module1538 = require('./1538'),
  module1551 = require('./1551').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1538(o, module1551);
  };
