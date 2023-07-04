var module8 = require('./8'),
  module97 = require('./97');

function p(o, u, l) {
  if (module97()) module.exports = p = Reflect.construct;
  else
    module.exports = p = function (t, p, o) {
      var u = [null];
      u.push.apply(u, p);
      var l = new (Function.bind.apply(t, u))();
      if (o) module8(l, o.prototype);
      return l;
    };
  return p.apply(null, arguments);
}

module.exports = p;
