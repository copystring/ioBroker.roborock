var module6 = require('./6'),
  module41 = require('./41'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function s() {
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
  module225 = require('./225'),
  module230 = require('./230');

class v {
  constructor(n, _) {
    var u;
    module6(this, b);
    (u = k.call(this))._a = 'number' == typeof n ? new module225(n) : n;
    u._b = 'number' == typeof _ ? new module225(_) : _;
    return u;
  }

  __makeNative() {
    this._a.__makeNative();

    this._b.__makeNative();

    module41(module12(b.prototype), '__makeNative', this).call(this);
  }

  __getValue() {
    return this._a.__getValue() * this._b.__getValue();
  }

  interpolate(t) {
    return new module226(this, t);
  }

  __attach() {
    this._a.__addChild(this);

    this._b.__addChild(this);
  }

  __detach() {
    this._a.__removeChild(this);

    this._b.__removeChild(this);

    module41(module12(b.prototype), '__detach', this).call(this);
  }

  __getNativeConfig() {
    return {
      type: 'multiplication',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()],
    };
  }
}

module.exports = v;
