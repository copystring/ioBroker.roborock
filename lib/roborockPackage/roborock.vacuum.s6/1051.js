var n = require('./49'),
  module994 = require('./994'),
  module1052 = require('./1052');

function u(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function f(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      u(Object(c), true).forEach(function (o) {
        n.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      u(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

exports.default = function (t) {
  var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
  n = f({}, n);
  n = module1052.default(n, 'resetOnBlur', false);
  n = module1052.default(n, 'backBehavior', 'initialRoute');
  return module994.default(t, n);
};
