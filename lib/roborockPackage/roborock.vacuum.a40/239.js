var module50 = require('./50'),
  module4 = require('./4'),
  module41 = require('./41'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function v(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function f(n) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      v(Object(s), true).forEach(function (o) {
        module50(n, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    else
      v(Object(s)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(s, t));
      });
  }

  return n;
}

function p() {
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

var module224 = require('./224').AnimatedEvent,
  module227 = require('./227'),
  module240 = require('./240'),
  module228 = require('./228'),
  module86 = require('./86'),
  module13 = require('./13');

class k {
  constructor(t, o) {
    var module41;
    module4(this, O);
    module41 = V.call(this);
    if (t.style)
      t = f(
        f({}, t),
        {},
        {
          style: new module240(t.style),
        }
      );
    module41._props = t;
    module41._callback = o;

    module41.__attach();

    return module41;
  }

  __getValue() {
    var t = {};

    for (var n in this._props) {
      var o = this._props[n];
      if (o instanceof module227) {
        if (!o.__isNative || o instanceof module240) t[n] = o.__getValue();
      } else t[n] = o instanceof module224 ? o.__getHandler() : o;
    }

    return t;
  }

  __getAnimatedValue() {
    var t = {};

    for (var n in this._props) {
      var o = this._props[n];
      if (o instanceof module227) t[n] = o.__getAnimatedValue();
    }

    return t;
  }

  __attach() {
    for (var t in this._props) {
      var n = this._props[t];
      if (n instanceof module227) n.__addChild(this);
    }
  }

  __detach() {
    for (var t in (this.__isNative && this._animatedView && this.__disconnectAnimatedView(), this._props)) {
      var n = this._props[t];
      if (n instanceof module227) n.__removeChild(this);
    }

    module41(module11(O.prototype), '__detach', this).call(this);
  }

  update() {
    this._callback();
  }

  __makeNative() {
    if (!this.__isNative) {
      for (var t in ((this.__isNative = true), this._props)) {
        var n = this._props[t];
        if (n instanceof module227) n.__makeNative();
      }

      if (this._animatedView) this.__connectAnimatedView();
    }
  }

  setNativeView(t) {
    if (this._animatedView !== t) {
      this._animatedView = t;
      if (this.__isNative) this.__connectAnimatedView();
    }
  }

  __connectAnimatedView() {
    module13(this.__isNative, 'Expected node to be marked as "native"');
    var t = module86.findNodeHandle(this._animatedView);
    module13(null != t, 'Unable to locate attached view in the native tree');
    module228.API.connectAnimatedNodeToView(this.__getNativeTag(), t);
  }

  __disconnectAnimatedView() {
    module13(this.__isNative, 'Expected node to be marked as "native"');
    var t = module86.findNodeHandle(this._animatedView);
    module13(null != t, 'Unable to locate attached view in the native tree');
    module228.API.disconnectAnimatedNodeFromView(this.__getNativeTag(), t);
  }

  __getNativeConfig() {
    var t = {};

    for (var n in this._props) {
      var o = this._props[n];

      if (o instanceof module227) {
        o.__makeNative();

        t[n] = o.__getNativeTag();
      }
    }

    return {
      type: 'props',
      props: t,
    };
  }
}

module.exports = k;
