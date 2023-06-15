var module1144 = require('./1144'),
  module1163 = require('./1163'),
  module1156 = require('./1156')('IE_PROTO'),
  c = Object.prototype;

module.exports =
  Object.getPrototypeOf ||
  function (u) {
    u = module1163(u);
    return module1144(u, module1156) ? u[module1156] : 'function' == typeof u.constructor && u instanceof u.constructor ? u.constructor.prototype : u instanceof Object ? c : null;
  };
