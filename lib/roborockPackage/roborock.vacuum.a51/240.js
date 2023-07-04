var module50 = require('./50'),
  module6 = require('./6'),
  module41 = require('./41'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function f(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function y(n) {
  for (var s = 1; s < arguments.length; s++) {
    var o = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      f(Object(o), true).forEach(function (s) {
        module50(n, s, o[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(o));
    else
      f(Object(o)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
      });
  }

  return n;
}

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

var module227 = require('./227'),
  module241 = require('./241'),
  module230 = require('./230'),
  module228 = require('./228'),
  module83 = require('./83');

class b {
  constructor(t) {
    var module7;
    module6(this, j);
    module7 = A.call(this);
    if ((t = module83(t) || {}).transform)
      t = y(
        y({}, t),
        {},
        {
          transform: new module241(t.transform),
        }
      );
    module7._style = t;
    return module7;
  }

  _walkStyleAndGetValues(t) {
    var n = {};

    for (var s in t) {
      var o = t[s];
      if (o instanceof module227) {
        if (!o.__isNative) n[s] = o.__getValue();
      } else if (o && !Array.isArray(o) && 'object' == typeof o) n[s] = this._walkStyleAndGetValues(o);
      else n[s] = o;
    }

    return n;
  }

  __getValue() {
    return this._walkStyleAndGetValues(this._style);
  }

  _walkStyleAndGetAnimatedValues(t) {
    var n = {};

    for (var s in t) {
      var o = t[s];
      if (o instanceof module227) n[s] = o.__getAnimatedValue();
      else if (o && !Array.isArray(o) && 'object' == typeof o) n[s] = this._walkStyleAndGetAnimatedValues(o);
    }

    return n;
  }

  __getAnimatedValue() {
    return this._walkStyleAndGetAnimatedValues(this._style);
  }

  __attach() {
    for (var t in this._style) {
      var n = this._style[t];
      if (n instanceof module227) n.__addChild(this);
    }
  }

  __detach() {
    for (var t in this._style) {
      var n = this._style[t];
      if (n instanceof module227) n.__removeChild(this);
    }

    module41(module12(j.prototype), '__detach', this).call(this);
  }

  __makeNative() {
    for (var t in this._style) {
      var n = this._style[t];
      if (n instanceof module227) n.__makeNative();
    }

    module41(module12(j.prototype), '__makeNative', this).call(this);
  }

  __getNativeConfig() {
    var t = {};

    for (var n in this._style)
      if (this._style[n] instanceof module227) {
        var s = this._style[n];

        s.__makeNative();

        t[n] = s.__getNativeTag();
      }

    module228.validateStyles(t);
    return {
      type: 'style',
      style: t,
    };
  }
}

module.exports = b;
