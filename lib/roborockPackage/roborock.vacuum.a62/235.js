var module4 = require('./4'),
  module41 = require('./41'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

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

require('./227');

var module226 = require('./226'),
  module230 = require('./230');

class f {
  constructor(n, u, _) {
    var c;
    module4(this, k);
    (c = y.call(this))._a = n;
    c._min = u;
    c._max = _;
    c._value = c._lastValue = c._a.__getValue();
    return c;
  }

  __makeNative() {
    this._a.__makeNative();

    module41(module11(k.prototype), '__makeNative', this).call(this);
  }

  interpolate(t) {
    return new module226(this, t);
  }

  __getValue() {
    var t = this._a.__getValue(),
      n = t - this._lastValue;

    this._lastValue = t;
    this._value = ((this._value + n) ** this._min) ** this._max;
    return this._value;
  }

  __attach() {
    this._a.__addChild(this);
  }

  __detach() {
    this._a.__removeChild(this);

    module41(module11(k.prototype), '__detach', this).call(this);
  }

  __getNativeConfig() {
    return {
      type: 'diffclamp',
      input: this._a.__getNativeTag(),
      min: this._min,
      max: this._max,
    };
  }
}

module.exports = f;
