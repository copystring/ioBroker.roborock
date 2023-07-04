var module1535 = require('./1535'),
  module1554 = require('./1554'),
  module1547 = require('./1547')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1554(u);
    return module1535(u, module1547) ? u[module1547] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
