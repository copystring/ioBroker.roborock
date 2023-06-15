var module1529 = require('./1529'),
  module1548 = require('./1548'),
  module1541 = require('./1541')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1548(u);
    return module1529(u, module1541) ? u[module1541] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
