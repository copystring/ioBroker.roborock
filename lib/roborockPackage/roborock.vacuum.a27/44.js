var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f() {
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

var module45 = require('./45');

class l {
  constructor(n, c, o, u) {
    var f;
    module4(this, y);
    (f = p.call(this, c)).emitter = n;
    f.listener = o;
    f.context = u;
    return f;
  }

  remove() {
    this.emitter.removeSubscription(this);
  }
}

module.exports = l;
