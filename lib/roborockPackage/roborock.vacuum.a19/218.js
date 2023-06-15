var module49 = require('./49'),
  module51 = require('./51');

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

var module219 = require('./219'),
  module229 = require('./229'),
  O = module51.default.isTesting ? module219 : module229;

module.exports = (function (t) {
  for (var c = 1; c < arguments.length; c++) {
    var u = null != arguments[c] ? arguments[c] : {};
    if (c % 2)
      o(Object(u), true).forEach(function (c) {
        module49.default(t, c, u[c]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      o(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
})(
  {
    get FlatList() {
      return require('./249');
    },

    get Image() {
      return require('./270');
    },

    get ScrollView() {
      return require('./276');
    },

    get SectionList() {
      return require('./277');
    },

    get Text() {
      return require('./280');
    },

    get View() {
      return require('./281');
    },
  },
  O
);
