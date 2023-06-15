var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function l(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function f(n) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      l(Object(c), true).forEach(function (o) {
        module49(n, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(c));
    else
      l(Object(c)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return n;
}

function h() {
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

require('./221');

var module223 = require('./223'),
  module224 = require('./224'),
  y = module224.generateNewAnimationId,
  O = module224.shouldUseNativeDriver,
  b = (function (t) {
    module7(k, module223);

    var l = k,
      module224 = h(),
      b = function () {
        var t,
          n = module11(l);

        if (module224) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function k(t, o, c, u, _) {
      var s;
      module4(this, k);
      (s = b.call(this))._value = t;
      s._parent = o;
      s._animationClass = c;
      s._animationConfig = u;
      s._useNativeDriver = O(u);
      s._callback = _;

      s.__attach();

      return s;
    }

    module5(k, [
      {
        key: '__makeNative',
        value: function () {
          this.__isNative = true;

          this._parent.__makeNative();

          module40(module11(k.prototype), '__makeNative', this).call(this);

          this._value.__makeNative();
        },
      },
      {
        key: '__getValue',
        value: function () {
          return this._parent.__getValue();
        },
      },
      {
        key: '__attach',
        value: function () {
          this._parent.__addChild(this);

          if (this._useNativeDriver) this.__makeNative();
        },
      },
      {
        key: '__detach',
        value: function () {
          this._parent.__removeChild(this);

          module40(module11(k.prototype), '__detach', this).call(this);
        },
      },
      {
        key: 'update',
        value: function () {
          this._value.animate(
            new this._animationClass(
              f(
                f({}, this._animationConfig),
                {},
                {
                  toValue: this._animationConfig.toValue.__getValue(),
                }
              )
            ),
            this._callback
          );
        },
      },
      {
        key: '__getNativeConfig',
        value: function () {
          var t = new this._animationClass(
            f(
              f({}, this._animationConfig),
              {},
              {
                toValue: undefined,
              }
            )
          ).__getNativeAnimationConfig();

          return {
            type: 'tracking',
            animationId: y(),
            animationConfig: t,
            toValue: this._parent.__getNativeTag(),
            value: this._value.__getNativeTag(),
          };
        },
      },
    ]);
    return k;
  })();

module.exports = b;
