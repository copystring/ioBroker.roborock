var module1536 = require('./1536'),
  module1555 = require('./1555'),
  module1548 = require('./1548')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1555(u);
    return module1536(u, module1548) ? u[module1548] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
