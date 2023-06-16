var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module49 = require('./49');

function l() {
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

function h(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function s(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      h(Object(o), true).forEach(function (n) {
        module49(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      h(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./223');

var module226 = require('./226'),
  module224 = require('./224'),
  module13 = require('./13'),
  module67 = require('./67'),
  b = function (t) {
    return t;
  };

function x(t) {
  if (t.outputRange && 'string' == typeof t.outputRange[0]) return w(t);
  var n = t.outputRange;
  E('outputRange', n);
  var o = t.inputRange;
  E('inputRange', o);
  C(o);
  module13(o.length === n.length, 'inputRange (' + o.length + ') and outputRange (' + n.length + ') must have the same length');
  var u = t.easing || b,
    c = 'extend';
  if (undefined !== t.extrapolateLeft) c = t.extrapolateLeft;
  else if (undefined !== t.extrapolate) c = t.extrapolate;
  var p = 'extend';
  if (undefined !== t.extrapolateRight) p = t.extrapolateRight;
  else if (undefined !== t.extrapolate) p = t.extrapolate;
  return function (t) {
    module13('number' == typeof t, 'Cannot interpolation an input which is not a number');
    var f = D(t, o);
    return O(t, o[f], o[f + 1], n[f], n[f + 1], u, c, p);
  };
}

function O(t, n, o, u, c, p, f, l) {
  var h = t;

  if (h < n) {
    if ('identity' === f) return h;
    if ('clamp' === f) h = n;
  }

  if (h > o) {
    if ('identity' === l) return h;
    if ('clamp' === l) h = o;
  }

  return u === c
    ? u
    : n === o
    ? t <= n
      ? u
      : c
    : (n === -1 / 0 ? (h = -h) : o === 1 / 0 ? (h -= n) : (h = (h - n) / (o - n)), (h = p(h)), u === -1 / 0 ? (h = -h) : c === 1 / 0 ? (h += u) : (h = h * (c - u) + u), h);
}

function j(t) {
  var n = module67(t);
  return null === n ? t : 'rgba(' + ((4278190080 & (n = n || 0)) >>> 24) + ', ' + ((16711680 & n) >>> 16) + ', ' + ((65280 & n) >>> 8) + ', ' + (255 & n) / 255 + ')';
}

var k = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;

function w(t) {
  var n = t.outputRange;
  module13(n.length >= 2, 'Bad output range');
  P((n = n.map(j)));
  var o = n[0].match(k).map(function () {
    return [];
  });
  n.forEach(function (t) {
    t.match(k).forEach(function (t, n) {
      o[n].push(+t);
    });
  });
  var u,
    c = n[0].match(k).map(function (n, u) {
      return x(
        s(
          s({}, t),
          {},
          {
            outputRange: o[u],
          }
        )
      );
    }),
    p = 'string' == typeof (u = n[0]) && u.startsWith('rgb');
  return function (t) {
    var o = 0;
    return n[0].replace(k, function () {
      var n = +c[o++](t);
      if (p) n = o < 4 ? Math.round(n) : Math.round(1e3 * n) / 1e3;
      return String(n);
    });
  };
}

function P(t) {
  for (var n = t[0].replace(k, ''), o = 1; o < t.length; ++o) module13(n === t[o].replace(k, ''), 'invalid pattern ' + t[0] + ' and ' + t[o]);
}

function D(t, n) {
  var o;

  for (o = 1; o < n.length - 1 && !(n[o] >= t); ++o);

  return o - 1;
}

function C(t) {
  module13(t.length >= 2, 'inputRange must have at least 2 elements');

  for (var n = 1; n < t.length; ++n) module13(t[n] >= t[n - 1], 'inputRange must be monotonically non-decreasing ' + t);
}

function E(t, n) {
  module13(n.length >= 2, t + ' must have at least 2 elements');
  module13(2 !== n.length || n[0] !== -1 / 0 || n[1] !== 1 / 0, t + 'cannot be ]-infinity;+infinity[ ' + n);
}

var L = (function (f) {
  module7(b, module226);

  var h = b,
    s = l(),
    R = function () {
      var t,
        n = module11(h);

      if (s) {
        var o = module11(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9(this, t);
    };

  function b(n, o) {
    var u;
    module4(this, b);
    (u = R.call(this))._parent = n;
    u._config = o;
    u._interpolation = x(o);
    return u;
  }

  module5(b, [
    {
      key: '__makeNative',
      value: function () {
        this._parent.__makeNative();

        module40(module11(b.prototype), '__makeNative', this).call(this);
      },
    },
    {
      key: '__getValue',
      value: function () {
        var t = this._parent.__getValue();

        module13('number' == typeof t, 'Cannot interpolate an input which is not a number.');
        return this._interpolation(t);
      },
    },
    {
      key: 'interpolate',
      value: function (t) {
        return new b(this, t);
      },
    },
    {
      key: '__attach',
      value: function () {
        this._parent.__addChild(this);
      },
    },
    {
      key: '__detach',
      value: function () {
        this._parent.__removeChild(this);

        module40(module11(b.prototype), '__detach', this).call(this);
      },
    },
    {
      key: '__transformDataType',
      value: function (t) {
        return t.map(module224.transformDataType);
      },
    },
    {
      key: '__getNativeConfig',
      value: function () {
        return {
          inputRange: this._config.inputRange,
          outputRange: this.__transformDataType(this._config.outputRange),
          extrapolateLeft: this._config.extrapolateLeft || this._config.extrapolate || 'extend',
          extrapolateRight: this._config.extrapolateRight || this._config.extrapolate || 'extend',
          type: 'interpolation',
        };
      },
    },
  ]);
  return b;
})();

L.__createInterpolation = x;
module.exports = L;
