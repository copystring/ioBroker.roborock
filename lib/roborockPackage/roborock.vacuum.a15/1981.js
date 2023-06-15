exports.convertState = b;
exports.currentState = l;

var module50 = require('./50'),
  module1980 = require('./1980'),
  module1979 = require('./1979');

function u(t, n) {
  var c = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    c.push.apply(c, o);
  }

  return c;
}

function f(t) {
  for (var c = 1; c < arguments.length; c++) {
    var o = null != arguments[c] ? arguments[c] : {};
    if (c % 2)
      u(Object(o), true).forEach(function (c) {
        module50.default(t, c, o[c]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      u(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function b(t) {
  return 'boolean' == typeof t.isInternetReachable
    ? t
    : f(
        f({}, t),
        {},
        {
          isInternetReachable: module1980.default.currentState(),
        }
      );
}

function l() {
  return module1979.default.getCurrentState();
}

var O = {
  convertState: b,
  currentState: l,
};
exports.default = O;
