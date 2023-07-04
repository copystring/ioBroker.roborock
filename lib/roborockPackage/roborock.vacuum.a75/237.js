var module6 = require('./6'),
  module41 = require('./41'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function _() {
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

require('./227');

var module226 = require('./226'),
  module230 = require('./230');

class f {
  constructor(u, n) {
    var o;
    module6(this, k);
    (o = p.call(this))._a = u;
    o._modulus = n;
    return o;
  }

  __makeNative() {
    this._a.__makeNative();

    module41(module12(k.prototype), '__makeNative', this).call(this);
  }

  __getValue() {
    return ((this._a.__getValue() % this._modulus) + this._modulus) % this._modulus;
  }

  interpolate(t) {
    return new module226(this, t);
  }

  __attach() {
    this._a.__addChild(this);
  }

  __detach() {
    this._a.__removeChild(this);

    module41(module12(k.prototype), '__detach', this).call(this);
  }

  __getNativeConfig() {
    return {
      type: 'modulus',
      input: this._a.__getNativeTag(),
      modulus: this._modulus,
    };
  }
}

module.exports = f;
