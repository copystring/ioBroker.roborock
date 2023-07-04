var module50 = require('./50'),
  module1037 = require('./1037'),
  module1091 = require('./1091'),
  module1089 = require('./1089'),
  module1088 = require('./1088'),
  module1052 = require('./1052'),
  module1092 = require('./1092'),
  module1040 = require('./1040'),
  module1143 = require('./1143'),
  module1045 = require('./1045');

function A(t, n) {
  var o;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
    if (Array.isArray(t) || (o = S(t)) || (n && t && 'number' == typeof t.length)) {
      if (o) t = o;
      var u = 0;
      return function () {
        return u >= t.length
          ? {
              done: true,
            }
          : {
              done: false,
              value: t[u++],
            };
      };
    }

    throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
  }

  return (o = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(o);
}

function S(t, n) {
  if (t) {
    if ('string' == typeof t) return b(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? b(t, n) : undefined;
  }
}

function b(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, u = new Array(n); o < n; o++) u[o] = t[o];

  return u;
}

function P(t, n) {
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

function h(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      P(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function N(t) {
  return t.type === module1037.default.NAVIGATE || t.type === module1091.default.PUSH;
}

var O = function (t, n) {
  return {};
};

function T(t) {
  return t.type === module1091.default.RESET && null === t.key;
}

exports.default = function (t) {
  var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
  module1092.default(t);
  var S = {},
    b = Object.keys(t);
  b.forEach(function (n) {
    var o = module1088.default(t, n);
    if (o && o.router) S[n] = o.router;
    else S[n] = null;
  });
  var P = o.initialRouteParams,
    x = o.getCustomActionCreators || O,
    j = o.initialRouteName || b[0],
    E = S[j];

  function F(t) {
    var n = {},
      f = S[t.routeName];

    if (N(t) && undefined !== f) {
      var s = {};

      if (null !== f) {
        var l =
          t.action ||
          module1037.default.init({
            params: t.params,
          });
        s = f.getStateForAction(l);
      }

      return {
        key: 'StackRouterRoot',
        isTransitioning: false,
        index: 0,
        routes: [
          h(
            h(
              {
                params: t.params,
              },
              s
            ),
            {},
            {
              key: t.key || module1143.generateKey(),
              routeName: t.routeName,
            }
          ),
        ],
      };
    }

    if (E)
      n = E.getStateForAction(
        module1037.default.navigate({
          routeName: j,
          params: P,
        })
      );
    var c = (n.params || t.params || P) && h(h(h({}, n.params || {}), t.params || {}), P || {}),
      p = o.initialRouteKey;
    return {
      key: 'StackRouterRoot',
      isTransitioning: false,
      index: 0,
      routes: [
        (n = h(
          h(
            h({}, n),
            c
              ? {
                  params: c,
                }
              : {}
          ),
          {},
          {
            routeName: j,
            key: t.key || p || module1143.generateKey(),
          }
        )),
      ],
    };
  }

  var R = module1045.createPathParser(S, t, o.paths),
    w = R.getPathAndParamsForRoute,
    C = R.getActionForPathAndParams;
  return {
    childRouters: S,
    getComponentForState: function (n) {
      var o = n.routes[n.index],
        u = o.routeName;
      return S[u] ? S[u].getComponentForState(o) : module1088.default(t, u);
    },
    getComponentForRouteName: function (n) {
      return module1088.default(t, n);
    },
    getActionCreators: function (t, n) {
      return h(
        h({}, x(t, n)),
        {},
        {
          pop: function (t, n) {
            return module1091.default.pop(
              h(
                {
                  n: t,
                },
                n
              )
            );
          },
          popToTop: function (t) {
            return module1091.default.popToTop(t);
          },
          push: function (t, n, o) {
            return module1091.default.push({
              routeName: t,
              params: n,
              action: o,
            });
          },
          replace: function (n, o, u, s) {
            if ('string' == typeof n)
              return module1091.default.replace({
                routeName: n,
                params: o,
                action: u,
                key: t.key,
                newKey: s,
              });
            else {
              module1040.default('object' == typeof n, 'Must replaceWith an object or a string');
              module1040.default(null == o, 'Params must not be provided to .replace() when specifying an object');
              module1040.default(null == u, 'Child action must not be provided to .replace() when specifying an object');
              module1040.default(null == s, 'Child action must not be provided to .replace() when specifying an object');
              return module1091.default.replace(n);
            }
          },
          reset: function (t, o) {
            return module1091.default.reset({
              actions: t,
              index: null == o ? t.length - 1 : o,
              key: n,
            });
          },
          dismiss: function () {
            return module1037.default.back({
              key: n,
            });
          },
        }
      );
    },
    getStateForAction: function (t, o) {
      if (!o) return F(t);
      var s,
        l = o.routes[o.index];

      if (T(t) || t.type === module1037.default.NAVIGATE) {
        if (t.type === module1037.default.NAVIGATE)
          for (var p, k = A(o.routes.slice().reverse()); !(p = k()).done; ) {
            var b = p.value,
              P = S[b.routeName],
              O = t.routeName === b.routeName && t.action ? t.action : t;

            if (P) {
              var x = P.getStateForAction(O, b);

              if (null === x || x !== b) {
                var j = module1052.default.replaceAndPrune(o, x ? x.key : b.key, x || b);
                return h(
                  h({}, j),
                  {},
                  {
                    isTransitioning: o.index !== j.index ? true !== t.immediate : o.isTransitioning,
                  }
                );
              }
            }
          }
      } else {
        var E = S[l.routeName];

        if (E) {
          var R = E.getStateForAction(t, l);
          if (null !== R && R !== l) return module1052.default.replaceAt(o, l.key, R, t.type === module1037.default.SET_PARAMS);
        }
      }

      if (N(t) && undefined !== S[t.routeName]) {
        var w,
          C = S[t.routeName];
        module1040.default(t.type !== module1091.default.PUSH || null == t.key, 'StackRouter does not support key on the push action');
        var K = o.routes.findIndex(function (n) {
          return t.key ? n.key === t.key : n.routeName === t.routeName;
        });

        if (t.type !== module1091.default.PUSH && -1 !== K) {
          if (o.index === K && !t.params) return null;
          var I = o.routes.slice(0, K + 1);

          if (t.params) {
            var _ = o.routes[K];
            I[K] = h(
              h({}, _),
              {},
              {
                params: h(h({}, _.params), t.params),
              }
            );
          }

          return h(
            h({}, o),
            {},
            {
              isTransitioning: o.index !== K ? true !== t.immediate : o.isTransitioning,
              index: K,
              routes: I,
            }
          );
        }

        if (C) {
          var M =
            t.action ||
            module1037.default.init({
              params: t.params,
            });
          w = h(
            h(
              {
                params: t.params,
              },
              C.getStateForAction(M)
            ),
            {},
            {
              routeName: t.routeName,
              key: t.key || module1143.generateKey(),
            }
          );
        } else
          w = {
            params: t.params,
            routeName: t.routeName,
            key: t.key || module1143.generateKey(),
          };

        return h(
          h({}, module1052.default.push(o, w)),
          {},
          {
            isTransitioning: true !== t.immediate,
          }
        );
      }

      if (t.type === module1091.default.PUSH && undefined === S[t.routeName]) return o;
      if (N(t))
        for (var U = Object.keys(S), D = 0; D < U.length; D++) {
          var H = U[D],
            G = S[H];

          if (G) {
            var V = G.getStateForAction(module1037.default.init()),
              L = G.getStateForAction(t, V),
              B = null;

            if ((null === L ? (B = V) : L !== V && (B = L), B)) {
              var W = h(
                h({}, B),
                {},
                {
                  routeName: H,
                  key: t.key || module1143.generateKey(),
                }
              );
              return h(
                h({}, module1052.default.push(o, W)),
                {},
                {
                  isTransitioning: true !== t.immediate,
                }
              );
            }
          }
        }
      if (t.type === module1091.default.POP_TO_TOP)
        return t.key && o.key !== t.key
          ? o
          : o.index > 0
          ? h(
              h({}, o),
              {},
              {
                isTransitioning: true !== t.immediate,
                index: 0,
                routes: [o.routes[0]],
              }
            )
          : o;

      if (
        t.type === module1091.default.REPLACE &&
        -1 !==
          (s =
            undefined === t.key && o.routes.length
              ? o.routes.length - 1
              : o.routes.findIndex(function (n) {
                  return n.key === t.key;
                }))
      ) {
        var $ = S[t.routeName],
          q = {};

        if ($) {
          var z =
            t.action ||
            module1037.default.init({
              params: t.params,
            });
          q = $.getStateForAction(z);
        }

        var J = module31.default(o.routes);
        J[s] = h(
          h(
            {
              params: t.params,
            },
            q
          ),
          {},
          {
            routeName: t.routeName,
            key: t.newKey || module1143.generateKey(),
          }
        );
        return h(
          h({}, o),
          {},
          {
            routes: J,
          }
        );
      }

      if (t.type === module1091.default.COMPLETE_TRANSITION && (null == t.key || t.key === o.key) && o.isTransitioning)
        return h(
          h({}, o),
          {},
          {
            isTransitioning: false,
          }
        );

      if (t.type === module1037.default.SET_PARAMS) {
        var Q = t.key,
          X = o.routes.find(function (t) {
            return t.key === Q;
          });

        if (X) {
          var Y = h(h({}, X.params), t.params),
            Z = module31.default(o.routes);
          Z[o.routes.indexOf(X)] = h(
            h({}, X),
            {},
            {
              params: Y,
            }
          );
          return h(
            h({}, o),
            {},
            {
              routes: Z,
            }
          );
        }
      }

      if (t.type === module1091.default.RESET) {
        if (null != t.key && t.key != o.key) return o;
        var ee = t.actions;
        return h(
          h({}, o),
          {},
          {
            routes: ee.map(function (t) {
              var n = S[t.routeName],
                o = {};

              if (n) {
                var f =
                  t.action ||
                  module1037.default.init({
                    params: t.params,
                  });
                o = n.getStateForAction(f);
              }

              return h(
                h(
                  {
                    params: t.params,
                  },
                  o
                ),
                {},
                {
                  routeName: t.routeName,
                  key: t.key || module1143.generateKey(),
                }
              );
            }),
            index: t.index,
          }
        );
      }

      if (t.type === module1037.default.BACK || t.type === module1091.default.POP) {
        var te = t.key,
          re = t.n,
          ae = t.immediate,
          ne = o.index;
        if (t.type === module1091.default.POP && null != re) ne = 1 ** (o.index - re + 1);
        else if (te) {
          var oe = o.routes.find(function (t) {
            return t.key === te;
          });
          ne = o.routes.indexOf(oe);
        }
        if (ne > 0)
          return h(
            h({}, o),
            {},
            {
              routes: o.routes.slice(0, ne),
              index: ne - 1,
              isTransitioning: true !== ae,
            }
          );
      }

      for (var ie, ue = t.key ? module1052.default.indexOf(o, t.key) : -1, fe = A(o.routes.slice().reverse()); !(ie = fe()).done; ) {
        var se = ie.value;

        if (se.key !== l.key && !(ue >= 0 && se.key !== t.key)) {
          var le = S[se.routeName];

          if (le) {
            var de = le.getStateForAction(t, se);
            if (null === de) return o;
            if (de && de !== se) return module1052.default.replaceAt(o, se.key, de, t.type === module1037.default.SET_PARAMS);
          }
        }
      }

      return o;
    },
    getPathAndParamsForState: function (t) {
      var n = t.routes[t.index];
      return w(n);
    },
    getActionForPathAndParams: function (t, n) {
      return C(t, n);
    },
    getScreenOptions: module1089.default(t, o.navigationOptions),
  };
};
