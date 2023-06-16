var module1454 = require('./1454'),
  module1473 = require('./1473'),
  module1466 = require('./1466')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1473(u);
    return module1454(u, module1466) ? u[module1466] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
