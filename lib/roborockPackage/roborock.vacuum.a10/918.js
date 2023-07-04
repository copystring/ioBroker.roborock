var module49 = require('./49'),
  module12 = require('./12');

function o(t, n) {
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

function l(t) {
  for (var c = 1; c < arguments.length; c++) {
    var l = null != arguments[c] ? arguments[c] : {};
    if (c % 2)
      o(Object(l), true).forEach(function (c) {
        module49.default(t, c, l[c]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      o(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

var f = module12.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: l(
    l({}, module12.StyleSheet.absoluteFillObject),
    {},
    {
      justifyContent: 'flex-start',
      alignItems: 'center',
    }
  ),
});
exports.default = f;
