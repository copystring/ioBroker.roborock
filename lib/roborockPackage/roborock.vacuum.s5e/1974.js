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
  module1975 = require('./1975'),
  module1977 = require('./1977'),
  module1982 = require('./1982');

Object.keys(module1982).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module1982[t];
        },
      });
});

var module1978 = require('./1978'),
  module1976 = require('./1976');

Object.keys(module1976).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module1976[t];
        },
      });
});
module1978.default.setup();
module1977.default.setup();
var p = new Map();

function C() {
  return module1978.default.latest();
}

function _(t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : undefined;

  if ('string' == typeof t) {
    module1975.default.warnOnce();
    return t === module1982.CHANGE_EVENT_NAME && n
      ? (module1977.default.add(n),
        {
          remove: function () {
            module1977.default.remove(n);
          },
        })
      : {
          remove: function () {},
        };
  }

  var o = t;
  module1978.default.add(o);
  return function () {
    module1978.default.remove(o);
  };
}

function N() {
  var t = React.useState({
      type: module1976.NetInfoStateType.unknown,
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
  module1975.default.warnOnce();
  if (t === module1982.CHANGE_EVENT_NAME) module1977.default.remove(n);
}

function h() {
  module1975.default.warnOnce();
  return module1977.default.latest();
}

function y() {
  module1975.default.warnOnce();
  return module1978.default.latest().then(module1975.default.isConnectionExpensive);
}

var b = {
  addEventListener: function (t, n) {
    if (t !== module1982.CHANGE_EVENT_NAME)
      return {
        remove: function () {},
      };

    var o = function (t) {
      n(module1975.default.isConnected(t));
    };

    p.set(n, o);
    module1978.default.add(o);
    return {
      remove: function () {
        module1978.default.remove(o);
      },
    };
  },
  removeEventListener: function (t, n) {
    var o = p.get(n);
    if (o) module1978.default.remove(o);
    p.delete(n);
  },
  fetch: function () {
    return module1978.default.latest().then(module1975.default.isConnected);
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
