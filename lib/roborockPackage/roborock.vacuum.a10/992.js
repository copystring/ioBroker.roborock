var module30 = require('./30'),
  module49 = require('./49'),
  module942 = require('./942'),
  module993 = require('./993'),
  module994 = require('./994'),
  module939 = require('./939'),
  module996 = require('./996'),
  module997 = require('./997'),
  module947 = require('./947');

function O(t, n) {
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

function y(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      O(Object(u), true).forEach(function (n) {
        module49.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      O(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

var x = function (t, n) {
  return {};
};

exports.default = function (t) {
  var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
  module997.default(t);
  var O = o.order || Object.keys(t),
    P = o.getCustomActionCreators || x,
    h = o.initialRouteParams,
    A = o.initialRouteName || O[0],
    b = 'initialRoute' === (o.backBehavior || 'none'),
    S = !o.hasOwnProperty('resetOnBlur') || o.resetOnBlur,
    j = O.indexOf(A),
    N = {};
  O.forEach(function (n) {
    N[n] = null;
    var o = module993.default(t, n);
    if (o.router) N[n] = o.router;
  });
  var F = module947.createPathParser(N, t, o.paths),
    k = F.getPathAndParamsForRoute,
    w = F.getActionForPathAndParams;
  if (-1 === j)
    throw new Error(
      "Invalid initialRouteName '" +
        A +
        "'.Should be one of " +
        O.map(function (t) {
          return '"' + t + '"';
        }).join(', ')
    );

  function R(t) {
    var n = t === A ? h : undefined,
      o = N[t];

    if (o) {
      var u = module939.default.init();
      return y(
        y({}, o.getStateForAction(u)),
        {},
        {
          key: t,
          routeName: t,
          params: n,
        }
      );
    }

    return {
      key: t,
      routeName: t,
      params: n,
    };
  }

  function C(t, o) {
    if (!t) return o;

    if (t.index !== o.index && S) {
      var u = t.routes[t.index].routeName,
        f = module30.default(o.routes);
      f[t.index] = R(u);
      return y(
        y({}, o),
        {},
        {
          routes: f,
        }
      );
    }

    return o;
  }

  return {
    childRouters: N,
    getActionCreators: function (t, n) {
      return P(t, n);
    },
    getStateForAction: function (t, o) {
      var u = o ? y({}, o) : o,
        f = o || {
          routes: O.map(R),
          index: j,
          isTransitioning: false,
        },
        s = f.index;

      if (t.type === module939.default.INIT) {
        var p = t.params;
        if (p)
          f.routes = f.routes.map(function (t) {
            return y(
              y({}, t),
              {},
              {
                params: y(y(y({}, t.params), p), t.routeName === A ? h : null),
              }
            );
          });
      }

      var v = f.routes[f.index],
        x = N[O[f.index]];

      if (x) {
        var P = x.getStateForAction(t, v);
        if (!P && o) return null;

        if (P && P !== v) {
          var S = module30.default(f.routes);
          S[f.index] = P;
          return C(
            u,
            y(
              y({}, f),
              {},
              {
                routes: S,
              }
            )
          );
        }
      }

      var F = null == t.key || t.key === v.key;

      if (t.type === module939.default.BACK) {
        if (!F || !b) return f;
        s = j;
      }

      var k = false;

      if (
        t.type === module939.default.NAVIGATE &&
        (k = !!O.find(function (n, o) {
          return n === t.routeName && ((s = o), true);
        }))
      ) {
        var w,
          E = f.routes[s],
          T = N[t.routeName];

        if (
          (t.action
            ? (w = T ? T.getStateForAction(t.action, E) : null)
            : !t.action &&
              t.params &&
              (w = y(
                y({}, E),
                {},
                {
                  params: y(y({}, E.params || {}), t.params),
                }
              )),
          w && w !== E)
        ) {
          var _ = module30.default(f.routes);

          _[s] = w;
          return C(
            u,
            y(
              y({}, f),
              {},
              {
                routes: _,
                index: s,
              }
            )
          );
        }

        if (!w && f.index === s && u) return null;
      }

      if (t.type === module939.default.SET_PARAMS) {
        var I = t.key,
          B = f.routes.find(function (t) {
            return t.key === I;
          });

        if (B) {
          var D = y(y({}, B.params), t.params),
            M = module30.default(f.routes);
          M[f.routes.indexOf(B)] = y(
            y({}, B),
            {},
            {
              params: D,
            }
          );
          return C(
            u,
            y(
              y({}, f),
              {},
              {
                routes: M,
              }
            )
          );
        }
      }

      if (s !== f.index)
        return C(
          u,
          y(
            y({}, f),
            {},
            {
              index: s,
            }
          )
        );
      if (k && !o) return f;
      if (k) return y({}, f);
      var G,
        K = f.index,
        L = f.routes;
      O.find(function (o, u) {
        var f = N[o];
        if (u === K) return false;
        var s = L[u];
        if (f) s = f.getStateForAction(t, s);
        if (s) return s !== L[u] && (((L = module30.default(L))[u] = s), (K = u), true);
        else {
          K = u;
          return true;
        }
      });
      G = t.type;
      if ([module939.default.SET_PARAMS, module996.default.COMPLETE_TRANSITION].includes(G)) K = f.index;
      return K !== f.index || L !== f.routes
        ? C(
            u,
            y(
              y({}, f),
              {},
              {
                index: K,
                routes: L,
              }
            )
          )
        : f;
    },
    getComponentForState: function (n) {
      var o = n.routes[n.index].routeName;
      module942.default(o, 'There is no route defined for index ' + n.index + '. Check that\n        that you passed in a navigation state with a valid tab/screen index.');
      var s = N[o];
      return s ? s.getComponentForState(n.routes[n.index]) : module993.default(t, o);
    },
    getComponentForRouteName: function (n) {
      return module993.default(t, n);
    },
    getPathAndParamsForState: function (t) {
      var n = t.routes[t.index];
      return k(n);
    },
    getActionForPathAndParams: function (t, n) {
      return w(t, n);
    },
    getScreenOptions: module994.default(t, o.navigationOptions),
  };
};
