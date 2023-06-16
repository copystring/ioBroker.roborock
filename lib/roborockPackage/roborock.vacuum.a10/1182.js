var module1142 = require('./1142'),
  module1161 = require('./1161'),
  module1154 = require('./1154')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1161(u);
    return module1142(u, module1154) ? u[module1154] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
