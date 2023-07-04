var module4 = require('./4'),
  module41 = require('./41'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function c() {
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

require('./52');

var module43 = require('./43'),
  module40 = require('./40'),
  module13 = require('./13');

class p {
  constructor(n) {
    module4(this, M);
    return L.call(this, module40.sharedSubscriber);
  }

  addListener(t, n, o) {
    if (null != this._nativeModule) this._nativeModule.addListener(t);
    return module41(module11(M.prototype), 'addListener', this).call(this, t, n, o);
  }

  removeAllListeners(t) {
    module13(t, 'eventType argument is required.');
    var n = this.listeners(t).length;
    if (null != this._nativeModule) this._nativeModule.removeListeners(n);
    module41(module11(M.prototype), 'removeAllListeners', this).call(this, t);
  }

  removeSubscription(t) {
    if (null != this._nativeModule) this._nativeModule.removeListeners(1);
    module41(module11(M.prototype), 'removeSubscription', this).call(this, t);
  }
}

module.exports = p;
