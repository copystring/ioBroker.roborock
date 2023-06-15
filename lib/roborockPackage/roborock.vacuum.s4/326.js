var module49 = require('./49'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module327 = require('./327'),
  s = ['tintColor'];

function l(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (o)
      c = c.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, c);
  }

  return n;
}

function u(t) {
  for (var n = 1; n < arguments.length; n++) {
    var c = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      l(Object(c), true).forEach(function (n) {
        module49.default(t, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      l(Object(c)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(c, o));
      });
  }

  return t;
}

var module13 = require('./13'),
  module77 = require('./77'),
  b = {
    showActionSheetWithOptions: function (t, o) {
      module13('object' == typeof t && null !== t, 'Options must be a valid object');
      module13('function' == typeof o, 'Must provide a valid callback');
      module13(module327.default, "ActionSheetManager does't exist");
      var l = t.tintColor,
        b = module55.default(t, s);
      module327.default.showActionSheetWithOptions(
        u(
          u({}, b),
          {},
          {
            tintColor: module77(l),
          }
        ),
        o
      );
    },
    showShareActionSheetWithOptions: function (t, o, n) {
      module13('object' == typeof t && null !== t, 'Options must be a valid object');
      module13('function' == typeof o, 'Must provide a valid failureCallback');
      module13('function' == typeof n, 'Must provide a valid successCallback');
      module13(module327.default, "ActionSheetManager does't exist");
      module327.default.showShareActionSheetWithOptions(
        u(
          u({}, t),
          {},
          {
            tintColor: module77(t.tintColor),
          }
        ),
        o,
        n
      );
    },
  };

module.exports = b;
