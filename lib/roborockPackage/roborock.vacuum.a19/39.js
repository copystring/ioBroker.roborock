var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function l() {
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

var module42 = require('./42'),
  module45 = require('./45'),
  v = (function (v) {
    module7(R, module42);

    var h = R,
      y = l(),
      b = function () {
        var t,
          n = module11(h);

        if (y) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function R() {
      var n;
      module4(this, R);
      var o = new module45();
      (n = b.call(this, o)).sharedSubscriber = o;
      return n;
    }

    module5(R, [
      {
        key: 'addListener',
        value: function (t, n, c) {
          return module40(module11(R.prototype), 'addListener', this).call(this, t, n, c);
        },
      },
      {
        key: 'removeAllListeners',
        value: function (t) {
          module40(module11(R.prototype), 'removeAllListeners', this).call(this, t);
        },
      },
      {
        key: 'removeSubscription',
        value: function (t) {
          if (t.emitter !== this) t.emitter.removeSubscription(t);
          else module40(module11(R.prototype), 'removeSubscription', this).call(this, t);
        },
      },
    ]);
    return R;
  })();

module.exports = new v();
