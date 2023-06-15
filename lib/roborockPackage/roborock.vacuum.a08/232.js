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
  module221 = require('./221'),
  module226 = require('./226'),
  v = (function (v) {
    module7(b, module226);

    var y = b,
      p = s(),
      k = function () {
        var t,
          n = module11(y);

        if (p) {
          var _ = module11(this).constructor;
          t = Reflect.construct(n, arguments, _);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function b(n, _) {
      var o;
      module4(this, b);
      (o = k.call(this))._a = 'number' == typeof n ? new module221(n) : n;
      o._b = 'number' == typeof _ ? new module221(_) : _;
      return o;
    }

    module5(b, [
      {
        key: '__makeNative',
        value: function () {
          this._a.__makeNative();

          this._b.__makeNative();

          module40(module11(b.prototype), '__makeNative', this).call(this);
        },
      },
      {
        key: '__getValue',
        value: function () {
          var t = this._a.__getValue(),
            n = this._b.__getValue();

          if (0 === n) console.error('Detected division by zero in AnimatedDivision');
          return t / n;
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

          this._b.__addChild(this);
        },
      },
      {
        key: '__detach',
        value: function () {
          this._a.__removeChild(this);

          this._b.__removeChild(this);

          module40(module11(b.prototype), '__detach', this).call(this);
        },
      },
      {
        key: '__getNativeConfig',
        value: function () {
          return {
            type: 'division',
            input: [this._a.__getNativeTag(), this._b.__getNativeTag()],
          };
        },
      },
    ]);
    return b;
  })();

module.exports = v;
