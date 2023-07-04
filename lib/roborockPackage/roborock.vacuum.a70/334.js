var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function o() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module94 = (function (t) {
  module9.default(v, t);

  var module94 = v,
    s = o(),
    p = function () {
      var t,
        u = module12.default(module94);

      if (s) {
        var n = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, n);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function v() {
    module6.default(this, v);
    return p.apply(this, arguments);
  }

  return v;
})(require('./94').default(Error));

exports.default = module94;
