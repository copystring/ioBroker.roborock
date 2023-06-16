var o = {
  fetch: true,
  addEventListener: true,
  useNetInfo: true,
  removeEventListener: true,
  getConnectionInfo: true,
  isConnectionExpensive: true,
  isConnected: true,
};
exports.fetch = C;
exports.addEventListener = _;
exports.useNetInfo = N;
exports.removeEventListener = O;
exports.getConnectionInfo = h;
exports.isConnectionExpensive = y;

var module23 = require('@babel/runtime/helpers/slicedToArray'),
  React = require('react'),
  module1926 = require('./1926'),
  module1928 = require('./1928'),
  module1933 = require('./1933');

Object.keys(module1933).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module1933[t];
        },
      });
});

var module1929 = require('./1929'),
  module1927 = require('./1927');

Object.keys(module1927).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module1927[t];
        },
      });
});
module1929.default.setup();
module1928.default.setup();
var p = new Map();

function C() {
  return module1929.default.latest();
}

function _(t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : undefined;

  if ('string' == typeof t) {
    module1926.default.warnOnce();
    return t === module1933.CHANGE_EVENT_NAME && n
      ? (module1928.default.add(n),
        {
          remove: function () {
            module1928.default.remove(n);
          },
        })
      : {
          remove: function () {},
        };
  }

  var o = t;
  module1929.default.add(o);
  return function () {
    module1929.default.remove(o);
  };
}

function N() {
  var t = React.useState({
      type: module1927.NetInfoStateType.unknown,
      isConnected: false,
      isInternetReachable: false,
      details: null,
    }),
    n = module23.default(t, 2),
    o = n[0],
    c = n[1];
  React.useEffect(function () {
    return _(c);
  }, []);
  return o;
}

function O(t, n) {
  module1926.default.warnOnce();
  if (t === module1933.CHANGE_EVENT_NAME) module1928.default.remove(n);
}

function h() {
  module1926.default.warnOnce();
  return module1928.default.latest();
}

function y() {
  module1926.default.warnOnce();
  return module1929.default.latest().then(module1926.default.isConnectionExpensive);
}

var b = {
  addEventListener: function (t, n) {
    if (t !== module1933.CHANGE_EVENT_NAME)
      return {
        remove: function () {},
      };

    var o = function (t) {
      n(module1926.default.isConnected(t));
    };

    p.set(n, o);
    module1929.default.add(o);
    return {
      remove: function () {
        module1929.default.remove(o);
      },
    };
  },
  removeEventListener: function (t, n) {
    var o = p.get(n);
    if (o) module1929.default.remove(o);
    p.delete(n);
  },
  fetch: function () {
    return module1929.default.latest().then(module1926.default.isConnected);
  },
};
exports.isConnected = b;
var w = {
  fetch: C,
  addEventListener: _,
  useNetInfo: N,
  removeEventListener: O,
  getConnectionInfo: h,
  isConnectionExpensive: y,
  isConnected: b,
};
exports.default = w;
