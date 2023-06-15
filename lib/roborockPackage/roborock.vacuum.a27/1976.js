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
  module1977 = require('./1977'),
  module1979 = require('./1979'),
  module1984 = require('./1984');

Object.keys(module1984).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module1984[t];
        },
      });
});

var module1980 = require('./1980'),
  module1978 = require('./1978');

Object.keys(module1978).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module1978[t];
        },
      });
});
module1980.default.setup();
module1979.default.setup();
var p = new Map();

function C() {
  return module1980.default.latest();
}

function _(t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : undefined;

  if ('string' == typeof t) {
    module1977.default.warnOnce();
    return t === module1984.CHANGE_EVENT_NAME && n
      ? (module1979.default.add(n),
        {
          remove: function () {
            module1979.default.remove(n);
          },
        })
      : {
          remove: function () {},
        };
  }

  var o = t;
  module1980.default.add(o);
  return function () {
    module1980.default.remove(o);
  };
}

function N() {
  var t = React.useState({
      type: module1978.NetInfoStateType.unknown,
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
  module1977.default.warnOnce();
  if (t === module1984.CHANGE_EVENT_NAME) module1979.default.remove(n);
}

function h() {
  module1977.default.warnOnce();
  return module1979.default.latest();
}

function y() {
  module1977.default.warnOnce();
  return module1980.default.latest().then(module1977.default.isConnectionExpensive);
}

var b = {
  addEventListener: function (t, n) {
    if (t !== module1984.CHANGE_EVENT_NAME)
      return {
        remove: function () {},
      };

    var o = function (t) {
      n(module1977.default.isConnected(t));
    };

    p.set(n, o);
    module1980.default.add(o);
    return {
      remove: function () {
        module1980.default.remove(o);
      },
    };
  },
  removeEventListener: function (t, n) {
    var o = p.get(n);
    if (o) module1980.default.remove(o);
    p.delete(n);
  },
  fetch: function () {
    return module1980.default.latest().then(module1977.default.isConnected);
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
