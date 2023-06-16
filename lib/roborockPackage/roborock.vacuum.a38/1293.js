var module1242 = require('./1242'),
  module1255 = require('./1255').concat('length', 'prototype');

exports.f =
  Object.getOwnPropertyNames ||
  function (o) {
    return module1242(o, module1255);
  };
