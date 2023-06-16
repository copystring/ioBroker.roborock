var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function o() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module93 = (function (t) {
  module7.default(v, t);

  var module93 = v,
    s = o(),
    p = function () {
      var t,
        u = module11.default(module93);

      if (s) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, n);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function v() {
    module4.default(this, v);
    return p.apply(this, arguments);
  }

  return v;
})(require('./93').default(Error));

exports.default = module93;
