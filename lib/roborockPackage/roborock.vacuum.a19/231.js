var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function s() {
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

require('./223');

var module222 = require('./222'),
  module226 = require('./226'),
  f = (function (f) {
    module7(k, module226);

    var v = k,
      p = s(),
      y = function () {
        var t,
          n = module11(v);

        if (p) {
          var u = module11(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function k(n, u, _) {
      var l;
      module4(this, k);
      (l = y.call(this))._a = n;
      l._min = u;
      l._max = _;
      l._value = l._lastValue = l._a.__getValue();
      return l;
    }

    module5(k, [
      {
        key: '__makeNative',
        value: function () {
          this._a.__makeNative();

          module40(module11(k.prototype), '__makeNative', this).call(this);
        },
      },
      {
        key: 'interpolate',
        value: function (t) {
          return new module222(this, t);
        },
      },
      {
        key: '__getValue',
        value: function () {
          var t = this._a.__getValue(),
            n = t - this._lastValue;

          this._lastValue = t;
          this._value = ((this._value + n) ** this._min) ** this._max;
          return this._value;
        },
      },
      {
        key: '__attach',
        value: function () {
          this._a.__addChild(this);
        },
      },
      {
        key: '__detach',
        value: function () {
          this._a.__removeChild(this);

          module40(module11(k.prototype), '__detach', this).call(this);
        },
      },
      {
        key: '__getNativeConfig',
        value: function () {
          return {
            type: 'diffclamp',
            input: this._a.__getNativeTag(),
            min: this._min,
            max: this._max,
          };
        },
      },
    ]);
    return k;
  })();

module.exports = f;
