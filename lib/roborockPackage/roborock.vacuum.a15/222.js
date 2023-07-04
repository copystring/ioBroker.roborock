var module50 = require('./50'),
  module52 = require('./52');

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

var module223 = require('./223'),
  module233 = require('./233'),
  O = module52.default.isTesting ? module223 : module233;

module.exports = (function (t) {
  for (var c = 1; c < arguments.length; c++) {
    var u = null != arguments[c] ? arguments[c] : {};
    if (c % 2)
      o(Object(u), true).forEach(function (c) {
        module50.default(t, c, u[c]);
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
      return require('./253');
    },

    get Image() {
      return require('./274');
    },

    get ScrollView() {
      return require('./280');
    },

    get SectionList() {
      return require('./281');
    },

    get Text() {
      return require('./284');
    },

    get View() {
      return require('./285');
    },
  },
  O
);
