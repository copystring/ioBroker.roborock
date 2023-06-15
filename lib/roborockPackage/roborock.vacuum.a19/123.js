var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function c() {
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

require('./51');

var module42 = require('./42'),
  module39 = require('./39'),
  module13 = require('./13'),
  p = (function (p) {
    module7(M, module42);

    var y = M,
      _ = c(),
      L = function () {
        var t,
          n = module11(y);

        if (_) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function M(n) {
      module4(this, M);
      return L.call(this, module39.sharedSubscriber);
    }

    module5(M, [
      {
        key: 'addListener',
        value: function (t, n, s) {
          if (null != this._nativeModule) this._nativeModule.addListener(t);
          return module40(module11(M.prototype), 'addListener', this).call(this, t, n, s);
        },
      },
      {
        key: 'removeAllListeners',
        value: function (t) {
          module13(t, 'eventType argument is required.');
          var n = this.listeners(t).length;
          if (null != this._nativeModule) this._nativeModule.removeListeners(n);
          module40(module11(M.prototype), 'removeAllListeners', this).call(this, t);
        },
      },
      {
        key: 'removeSubscription',
        value: function (t) {
          if (null != this._nativeModule) this._nativeModule.removeListeners(1);
          module40(module11(M.prototype), 'removeSubscription', this).call(this, t);
        },
      },
    ]);
    return M;
  })();

module.exports = p;
