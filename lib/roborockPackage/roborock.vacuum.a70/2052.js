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
  module2053 = require('./2053'),
  module2055 = require('./2055'),
  module2060 = require('./2060');

Object.keys(module2060).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module2060[t];
        },
      });
});

var module2056 = require('./2056'),
  module2054 = require('./2054');

Object.keys(module2054).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module2054[t];
        },
      });
});
module2056.default.setup();
module2055.default.setup();
var p = new Map();

function C() {
  return module2056.default.latest();
}

function _(t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : undefined;

  if ('string' == typeof t) {
    module2053.default.warnOnce();
    return t === module2060.CHANGE_EVENT_NAME && n
      ? (module2055.default.add(n),
        {
          remove: function () {
            module2055.default.remove(n);
          },
        })
      : {
          remove: function () {},
        };
  }

  var o = t;
  module2056.default.add(o);
  return function () {
    module2056.default.remove(o);
  };
}

function N() {
  var t = React.useState({
      type: module2054.NetInfoStateType.unknown,
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
  module2053.default.warnOnce();
  if (t === module2060.CHANGE_EVENT_NAME) module2055.default.remove(n);
}

function h() {
  module2053.default.warnOnce();
  return module2055.default.latest();
}

function y() {
  module2053.default.warnOnce();
  return module2056.default.latest().then(module2053.default.isConnectionExpensive);
}

var b = {
  addEventListener: function (t, n) {
    if (t !== module2060.CHANGE_EVENT_NAME)
      return {
        remove: function () {},
      };

    var o = function (t) {
      n(module2053.default.isConnected(t));
    };

    p.set(n, o);
    module2056.default.add(o);
    return {
      remove: function () {
        module2056.default.remove(o);
      },
    };
  },
  removeEventListener: function (t, n) {
    var o = p.get(n);
    if (o) module2056.default.remove(o);
    p.delete(n);
  },
  fetch: function () {
    return module2056.default.latest().then(module2053.default.isConnected);
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
