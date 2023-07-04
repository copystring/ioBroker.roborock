var module6 = require('./6'),
  module41 = require('./41'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function l() {
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

var module43 = require('./43'),
  module46 = require('./46');

class h {
  constructor() {
    var n;
    module6(this, R);
    var c = new module46();
    (n = b.call(this, c)).sharedSubscriber = c;
    return n;
  }

  addListener(t, n, o) {
    return module41(module12(R.prototype), 'addListener', this).call(this, t, n, o);
  }

  removeAllListeners(t) {
    module41(module12(R.prototype), 'removeAllListeners', this).call(this, t);
  }

  removeSubscription(t) {
    if (t.emitter !== this) t.emitter.removeSubscription(t);
    else module41(module12(R.prototype), 'removeSubscription', this).call(this, t);
  }
}

module.exports = new h();
