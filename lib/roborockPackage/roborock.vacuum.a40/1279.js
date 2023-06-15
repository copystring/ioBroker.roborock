var module1239 = require('./1239'),
  module1258 = require('./1258'),
  module1251 = require('./1251')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1258(u);
    return module1239(u, module1251) ? u[module1251] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
