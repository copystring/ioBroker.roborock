exports.convertState = b;
exports.currentState = l;

var module49 = require('./49'),
  module2064 = require('./2064'),
  module2063 = require('./2063');

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
        module49.default(t, c, o[c]);
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
          isInternetReachable: module2064.default.currentState(),
        }
      );
}

function l() {
  return module2063.default.getCurrentState();
}

var O = {
  convertState: b,
  currentState: l,
};
exports.default = O;
