var module49 = require('./49'),
  module946 = require('./946'),
  module947 = require('./947'),
  module943 = require('./943');

require('./944');

function s(t, n) {
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

function f(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      s(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      s(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var l = function (t) {
  return function (n, o) {
    var u = t.params;
    return u && n in u ? u[n] : o;
  };
};

var p = function t(n, s, p) {
  var v = n._childrenNavigation || (n._childrenNavigation = {}),
    y = n.state.routes.find(function (t) {
      return t.key === s;
    });
  if (!y) return null;
  if (v[s] && v[s].state === y) return v[s];
  var O = module947.default(n.router, y.routeName),
    b = y.routes && 'number' == typeof y.index ? y.routes[y.index] : null,
    P = f(f(f(f({}, n.actions), n.router.getActionCreators(y, n.state.key)), O ? O.getActionCreators(b, y.key) : {}), module943.default(y)),
    j = {};

  if (
    (Object.keys(P).forEach(function (t) {
      j[t] = function () {
        var o = P[t].apply(undefined, arguments);
        return n.dispatch(o);
      };
    }),
    v[s])
  ) {
    v[s] = f(
      f(f({}, v[s]), j),
      {},
      {
        state: y,
        router: O,
        actions: P,
        getParam: l(y),
      }
    );
    return v[s];
  }

  var h = module946.default(n.addListener, s);
  v[s] = f(
    f({}, j),
    {},
    {
      state: y,
      router: O,
      actions: P,
      getParam: l(y),
      getChildNavigation: function (n) {
        return t(v[s], n, function () {
          var t = p();
          return t && t.getChildNavigation(s);
        });
      },
      isFocused: function () {
        var t = p();
        if (!t) return false;
        var n = t.state,
          o = n.routes,
          u = n.index;
        return !!t.isFocused() && o[u].key === s;
      },
      dispatch: n.dispatch,
      getScreenProps: n.getScreenProps,
      dangerouslyGetParent: p,
      addListener: h.addListener,
    }
  );
  return v[s];
};

exports.default = p;
