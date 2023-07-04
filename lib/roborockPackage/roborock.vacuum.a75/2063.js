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
  module2064 = require('./2064'),
  module2066 = require('./2066'),
  module2071 = require('./2071');

Object.keys(module2071).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module2071[t];
        },
      });
});

var module2067 = require('./2067'),
  module2065 = require('./2065');

Object.keys(module2065).forEach(function (t) {
  if ('default' !== t && '__esModule' !== t)
    Object.prototype.hasOwnProperty.call(o, t) ||
      Object.defineProperty(exports, t, {
        enumerable: true,
        get: function () {
          return module2065[t];
        },
      });
});
module2067.default.setup();
module2066.default.setup();
var p = new Map();

function C() {
  return module2067.default.latest();
}

function _(t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : undefined;

  if ('string' == typeof t) {
    module2064.default.warnOnce();
    return t === module2071.CHANGE_EVENT_NAME && n
      ? (module2066.default.add(n),
        {
          remove: function () {
            module2066.default.remove(n);
          },
        })
      : {
          remove: function () {},
        };
  }

  var o = t;
  module2067.default.add(o);
  return function () {
    module2067.default.remove(o);
  };
}

function N() {
  var t = React.useState({
      type: module2065.NetInfoStateType.unknown,
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
  module2064.default.warnOnce();
  if (t === module2071.CHANGE_EVENT_NAME) module2066.default.remove(n);
}

function h() {
  module2064.default.warnOnce();
  return module2066.default.latest();
}

function y() {
  module2064.default.warnOnce();
  return module2067.default.latest().then(module2064.default.isConnectionExpensive);
}

var b = {
  addEventListener: function (t, n) {
    if (t !== module2071.CHANGE_EVENT_NAME)
      return {
        remove: function () {},
      };

    var o = function (t) {
      n(module2064.default.isConnected(t));
    };

    p.set(n, o);
    module2067.default.add(o);
    return {
      remove: function () {
        module2067.default.remove(o);
      },
    };
  },
  removeEventListener: function (t, n) {
    var o = p.get(n);
    if (o) module2067.default.remove(o);
    p.delete(n);
  },
  fetch: function () {
    return module2067.default.latest().then(module2064.default.isConnected);
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
