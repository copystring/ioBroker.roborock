var module50 = require('./50'),
  module1217 = require('./1217'),
  module1265 = require('./1265'),
  module1267 = require('./1267');

function f(t, n) {
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

function p(t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      f(Object(u), true).forEach(function (o) {
        module50.default(t, o, u[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      f(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function s(t, n, o) {
  return 'function' == typeof t
    ? p(
        p({}, n),
        t(
          p(
            p({}, o),
            {},
            {
              navigationOptions: n,
            }
          )
        )
      )
    : 'object' == typeof t
    ? p(p({}, n), t)
    : n;
}

exports.default = function (t, n) {
  return function (f, p) {
    var O = f.state,
      l = O;
    module1217.default(l.routeName && 'string' == typeof l.routeName, 'Cannot get config because the route does not have a routeName.');
    var b = module1265.default(t, l.routeName),
      v = t[l.routeName],
      y = v === b ? null : v.navigationOptions,
      j = b.navigationOptions,
      P = {
        navigation: f,
        screenProps: p || {},
      },
      h = s(n, {}, P);
    h = s(y, (h = s(j, h, P)), P);
    module1267.default(h, l);
    return h;
  };
};
