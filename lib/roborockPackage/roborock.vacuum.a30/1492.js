var module1445 = require('./1445').f,
  module1454 = require('./1454'),
  module1493 = require('./1493')('toStringTag');

module.exports = function (f, u, c) {
  if (f && !module1454((f = c ? f : f.prototype), module1493))
    module1445(f, module1493, {
      configurable: true,
      value: u,
    });
};
