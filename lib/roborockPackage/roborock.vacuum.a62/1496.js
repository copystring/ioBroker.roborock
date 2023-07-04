var module1456 = require('./1456'),
  module1475 = require('./1475'),
  module1468 = require('./1468')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1475(u);
    return module1456(u, module1468) ? u[module1468] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
