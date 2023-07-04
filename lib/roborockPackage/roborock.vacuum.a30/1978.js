exports.setup = h;
exports.tearDown = w;
exports.latest = P;
exports.add = S;
exports.remove = D;

var module50 = require('./50'),
  module1979 = require('./1979'),
  module1980 = require('./1980'),
  module1981 = require('./1981');

function f(t, n) {
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

function l(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      f(Object(u), true).forEach(function (o) {
        module50.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      f(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var s = 'netInfo.networkStatusDidChange',
  p = false,
  v = null,
  O = null,
  b = new Set(),
  j = null;

function y() {
  return module1981.default.currentState().then(function (t) {
    module1980.default.update(t);
    var n = module1981.default.convertState(t);
    j = n;
    return n;
  });
}

function h() {
  if (!p) {
    v = module1979.default.eventEmitter.addListener(s, function (t) {
      module1980.default.update(t);
      var n = module1981.default.convertState(t);
      j = n;
      b.forEach(function (t) {
        return t(n);
      });
    });
    y();
    O = module1980.default.addSubscription(function (t) {
      if (j) {
        var n = l(
          l({}, j),
          {},
          {
            isInternetReachable: t,
          }
        );
        j = n;
        b.forEach(function (t) {
          return t(n);
        });
      }
    });
    p = true;
  }
}

function w() {
  if (p) {
    if (v) v.remove();
    b.clear();
    module1980.default.clear();
    if (O) O();
    p = false;
  }
}

function P() {
  return j ? Promise.resolve(j) : y();
}

function S(t) {
  b.add(t);
  if (j) t(j);
  else P().then(t);
}

function D(t) {
  b.delete(t);
}

var E = {
  setup: h,
  tearDown: w,
  latest: P,
  add: S,
  remove: D,
};
exports.default = E;
