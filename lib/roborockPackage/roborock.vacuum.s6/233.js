var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function _() {
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
      y = _(),
      p = function () {
        var t,
          u = module11(v);

        if (y) {
          var n = module11(this).constructor;
          t = Reflect.construct(u, arguments, n);
        } else t = u.apply(this, arguments);

        return module9(this, t);
      };

    function k(u, n) {
      var o;
      module4(this, k);
      (o = p.call(this))._a = u;
      o._modulus = n;
      return o;
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
        key: '__getValue',
        value: function () {
          return ((this._a.__getValue() % this._modulus) + this._modulus) % this._modulus;
        },
      },
      {
        key: 'interpolate',
        value: function (t) {
          return new module222(this, t);
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
            type: 'modulus',
            input: this._a.__getNativeTag(),
            modulus: this._modulus,
          };
        },
      },
    ]);
    return k;
  })();

module.exports = f;
