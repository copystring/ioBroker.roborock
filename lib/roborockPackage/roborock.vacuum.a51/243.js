var module50 = require('./50'),
  module6 = require('./6'),
  module41 = require('./41'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

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
        module50(n, o, c[o]);
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./225');

var module227 = require('./227'),
  module228 = require('./228'),
  y = module228.generateNewAnimationId,
  O = module228.shouldUseNativeDriver;

class b {
  constructor(t, o, c, u, _) {
    var s;
    module6(this, k);
    (s = b.call(this))._value = t;
    s._parent = o;
    s._animationClass = c;
    s._animationConfig = u;
    s._useNativeDriver = O(u);
    s._callback = _;

    s.__attach();

    return s;
  }

  __makeNative() {
    this.__isNative = true;

    this._parent.__makeNative();

    module41(module12(k.prototype), '__makeNative', this).call(this);

    this._value.__makeNative();
  }

  __getValue() {
    return this._parent.__getValue();
  }

  __attach() {
    this._parent.__addChild(this);

    if (this._useNativeDriver) this.__makeNative();
  }

  __detach() {
    this._parent.__removeChild(this);

    module41(module12(k.prototype), '__detach', this).call(this);
  }

  update() {
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
  }

  __getNativeConfig() {
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
  }
}

module.exports = b;
