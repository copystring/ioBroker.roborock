var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f() {
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

var module44 = require('./44'),
  l = (function (l) {
    module7(y, module44);

    var v = y,
      h = f(),
      p = function () {
        var t,
          n = module11(v);

        if (h) {
          var c = module11(this).constructor;
          t = Reflect.construct(n, arguments, c);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function y(n, c, o, u) {
      var f;
      module4(this, y);
      (f = p.call(this, c)).emitter = n;
      f.listener = o;
      f.context = u;
      return f;
    }

    module5(y, [
      {
        key: 'remove',
        value: function () {
          this.emitter.removeSubscription(this);
        },
      },
    ]);
    return y;
  })();

module.exports = l;
