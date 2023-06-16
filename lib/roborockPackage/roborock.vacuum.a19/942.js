exports.default = function (t, n, u, s, l, p) {
  var O = t.getActionCreators(n, null),
    b = {
      actions: O,
      router: t,
      state: n,
      dispatch: u,
      getScreenProps: l,
      getChildNavigation: function (t) {
        return module945.default(b, t, p);
      },
      isFocused: function (t) {
        var n = p().state,
          o = n.routes,
          c = n.index;
        return null == t || o[c].key === t;
      },
      addListener: function (t, n) {
        if ('action' !== t)
          return {
            remove: function () {},
          };
        else {
          s.add(n);
          return {
            remove: function () {
              s.delete(n);
            },
          };
        }
      },
      dangerouslyGetParent: function () {
        return null;
      },
    },
    y = f(f({}, module943.default(b.state)), O);
  Object.keys(y).forEach(function (t) {
    b[t] = function () {
      return b.dispatch(y[t].apply(y, arguments));
    };
  });
  return b;
};

var module49 = require('./49'),
  module943 = require('./943'),
  module945 = require('./945');

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
        module49.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      u(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}
