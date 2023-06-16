var n = {
  fetch: true,
  addEventListener: true,
  useNetInfo: true,
  removeEventListener: true,
  getConnectionInfo: true,
  isConnectionExpensive: true,
  isConnected: true,
};
exports.fetch = O;
exports.addEventListener = C;
exports.useNetInfo = b;
exports.removeEventListener = _;
exports.getConnectionInfo = h;
exports.isConnectionExpensive = j;

var module22 = require('./22'),
  React = require('react'),
  module2058 = require('./2058'),
  module2060 = require('./2060'),
  module2065 = E(require('./2065'));

Object.keys(module2065).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(n, t) ||
      (t in exports && exports[t] === module2065[t]) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module2065[t];
        },
      });
});

var module2061 = require('./2061'),
  module2059 = E(require('./2059'));

function p(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (p = function (t) {
    return t ? o : n;
  })(t);
}

function E(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var o = p(n);
  if (o && o.has(t)) return o.get(t);
  var u = {},
    f = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
      else u[c] = t[c];
    }

  u.default = t;
  if (o) o.set(t, u);
  return u;
}

Object.keys(module2059).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(n, t) ||
      (t in exports && exports[t] === module2059[t]) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module2059[t];
        },
      });
});
module2061.default.setup();
module2060.default.setup();
var y = new Map();

function O() {
  return module2061.default.latest();
}

function C(t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : undefined;

  if ('string' == typeof t) {
    module2058.default.warnOnce();
    return t === module2065.CHANGE_EVENT_NAME && n
      ? (module2060.default.add(n),
        {
          remove: function () {
            module2060.default.remove(n);
          },
        })
      : {
          remove: function () {},
        };
  }

  var o = t;
  module2061.default.add(o);
  return function () {
    module2061.default.remove(o);
  };
}

function b() {
  var t = React.useState({
      type: module2059.NetInfoStateType.unknown,
      isConnected: false,
      isInternetReachable: false,
      details: null,
    }),
    n = module22.default(t, 2),
    f = n[0],
    c = n[1];
  React.useEffect(function () {
    return C(c);
  }, []);
  return f;
}

function _(t, n) {
  module2058.default.warnOnce();
  if (t === module2065.CHANGE_EVENT_NAME) module2060.default.remove(n);
}

function h() {
  module2058.default.warnOnce();
  return module2060.default.latest();
}

function j() {
  module2058.default.warnOnce();
  return module2061.default.latest().then(module2058.default.isConnectionExpensive);
}

var w = {
  addEventListener: function (t, n) {
    if (t !== module2065.CHANGE_EVENT_NAME)
      return {
        remove: function () {},
      };

    var o = function (t) {
      n(module2058.default.isConnected(t));
    };

    y.set(n, o);
    module2061.default.add(o);
    return {
      remove: function () {
        module2061.default.remove(o);
      },
    };
  },
  removeEventListener: function (t, n) {
    var o = y.get(n);
    if (o) module2061.default.remove(o);
    y.delete(n);
  },
  fetch: function () {
    return module2061.default.latest().then(module2058.default.isConnected);
  },
};
exports.isConnected = w;
var N = {
  fetch: O,
  addEventListener: C,
  useNetInfo: b,
  removeEventListener: _,
  getConnectionInfo: h,
  isConnectionExpensive: j,
  isConnected: w,
};
exports.default = N;
