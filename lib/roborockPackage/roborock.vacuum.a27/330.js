var module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module331 = require('./331');

function s(t, o) {
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

function l(t) {
  for (var n = 1; n < arguments.length; n++) {
    var c = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      s(Object(c), true).forEach(function (n) {
        module50.default(t, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      s(Object(c)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(c, o));
      });
  }

  return t;
}

var module13 = require('./13'),
  module78 = require('./78'),
  p = {
    showActionSheetWithOptions: function (t, o) {
      module13('object' == typeof t && null !== t, 'Options must be a valid object');
      module13('function' == typeof o, 'Must provide a valid callback');
      module13(module331.default, "ActionSheetManager does't exist");
      var s = t.tintColor,
        p = module56.default(t, ['tintColor']);
      module331.default.showActionSheetWithOptions(
        l(
          l({}, p),
          {},
          {
            tintColor: module78(s),
          }
        ),
        o
      );
    },
    showShareActionSheetWithOptions: function (t, o, n) {
      module13('object' == typeof t && null !== t, 'Options must be a valid object');
      module13('function' == typeof o, 'Must provide a valid failureCallback');
      module13('function' == typeof n, 'Must provide a valid successCallback');
      module13(module331.default, "ActionSheetManager does't exist");
      module331.default.showShareActionSheetWithOptions(
        l(
          l({}, t),
          {},
          {
            tintColor: module78(t.tintColor),
          }
        ),
        o,
        n
      );
    },
  };

module.exports = p;
