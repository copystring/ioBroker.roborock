var module1539 = require('./1539'),
  module1552 = require('./1552').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1539(o, module1552);
  };
