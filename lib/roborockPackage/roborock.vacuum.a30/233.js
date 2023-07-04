var module50 = require('./50');

function n(t, n) {
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

function o(o) {
  for (var u = 1; u < arguments.length; u++) {
    var s = null != arguments[u] ? arguments[u] : {};
    if (u % 2)
      n(Object(s), true).forEach(function (n) {
        module50(o, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(s));
    else
      n(Object(s)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(s, t));
      });
  }

  return o;
}

var module224 = require('./224'),
  s = module224.AnimatedEvent,
  c = module224.attachNativeEvent,
  module234 = require('./234'),
  module235 = require('./235'),
  module236 = require('./236'),
  module226 = require('./226'),
  module237 = require('./237'),
  module238 = require('./238'),
  module227 = require('./227'),
  module239 = require('./239'),
  module242 = require('./242'),
  module243 = require('./243'),
  module225 = require('./225'),
  module244 = require('./244'),
  module245 = require('./245'),
  module247 = require('./247'),
  module249 = require('./249'),
  module252 = require('./252'),
  P = function (t, n) {
    return t && n.onComplete
      ? function () {
          if (n.onComplete) n.onComplete.apply(n, arguments);
          if (t) t.apply(undefined, arguments);
        }
      : t || n.onComplete;
  },
  k = function (t, n, u) {
    if (t instanceof module244) {
      var s = o({}, n),
        c = o({}, n);

      for (var f in n) {
        var v = n[f],
          p = v.x,
          l = v.y;

        if (undefined !== p && undefined !== l) {
          s[f] = p;
          c[f] = l;
        }
      }

      var h = u(t.x, s),
        _ = u(t.y, c);

      return C([h, _], {
        stopTogether: false,
      });
    }

    return null;
  },
  U = function t(n, u) {
    var s = function (t, n, o) {
      o = P(o, n);
      var u = t,
        s = n;
      u.stopTracking();
      if (n.toValue instanceof module227) u.track(new module243(u, n.toValue, module249, s, o));
      else u.animate(new module249(s), o);
    };

    return (
      k(n, u, t) || {
        start: function (t) {
          s(n, u, t);
        },
        stop: function () {
          n.stopAnimation();
        },
        reset: function () {
          n.resetAnimation();
        },
        _startNativeLoop: function (t) {
          var c = o(
            o({}, u),
            {},
            {
              iterations: t,
            }
          );
          s(n, c);
        },
        _isUsingNativeDriver: function () {
          return u.useNativeDriver || false;
        },
      }
    );
  },
  V = function (t) {
    var n = 0;
    return {
      start: function (o) {
        if (0 === t.length) {
          if (o)
            o({
              finished: true,
            });
        } else
          t[n].start(function u(s) {
            if (s.finished && ++n !== t.length) t[n].start(u);
            else if (o) o(s);
          });
      },
      stop: function () {
        if (n < t.length) t[n].stop();
      },
      reset: function () {
        t.forEach(function (t, o) {
          if (o <= n) t.reset();
        });
        n = 0;
      },
      _startNativeLoop: function () {
        throw new Error('Loops run using the native driver cannot contain Animated.sequence animations');
      },
      _isUsingNativeDriver: function () {
        return false;
      },
    };
  },
  C = function (t, n) {
    var o = 0,
      u = {},
      s = !(n && false === n.stopTogether),
      c = {
        start: function (n) {
          if (o !== t.length)
            t.forEach(function (f, v) {
              var p = function (f) {
                if (((u[v] = true), ++o === t.length)) {
                  o = 0;
                  return void (n && n(f));
                }

                if (!f.finished && s) c.stop();
              };

              if (f) f.start(p);
              else
                p({
                  finished: true,
                });
            });
          else if (n)
            n({
              finished: true,
            });
        },
        stop: function () {
          t.forEach(function (t, n) {
            if (!u[n]) t.stop();
            u[n] = true;
          });
        },
        reset: function () {
          t.forEach(function (t, n) {
            t.reset();
            u[n] = false;
            o = 0;
          });
        },
        _startNativeLoop: function () {
          throw new Error('Loops run using the native driver cannot contain Animated.parallel animations');
        },
        _isUsingNativeDriver: function () {
          return false;
        },
      };
    return c;
  },
  T = function (t) {
    return U(new module225(0), {
      toValue: 0,
      delay: t,
      duration: 0,
      useNativeDriver: false,
    });
  };

module.exports = {
  Value: module225,
  ValueXY: module244,
  Interpolation: module226,
  Node: module227,
  decay: function t(n, u) {
    var s = function (t, n, o) {
      o = P(o, n);
      var u = t,
        s = n;
      u.stopTracking();
      u.animate(new module245(s), o);
    };

    return (
      k(n, u, t) || {
        start: function (t) {
          s(n, u, t);
        },
        stop: function () {
          n.stopAnimation();
        },
        reset: function () {
          n.resetAnimation();
        },
        _startNativeLoop: function (t) {
          var c = o(
            o({}, u),
            {},
            {
              iterations: t,
            }
          );
          s(n, c);
        },
        _isUsingNativeDriver: function () {
          return u.useNativeDriver || false;
        },
      }
    );
  },
  timing: U,
  spring: function t(n, u) {
    var s = function (t, n, o) {
      o = P(o, n);
      var u = t,
        s = n;
      u.stopTracking();
      if (n.toValue instanceof module227) u.track(new module243(u, n.toValue, module247, s, o));
      else u.animate(new module247(s), o);
    };

    return (
      k(n, u, t) || {
        start: function (t) {
          s(n, u, t);
        },
        stop: function () {
          n.stopAnimation();
        },
        reset: function () {
          n.resetAnimation();
        },
        _startNativeLoop: function (t) {
          var c = o(
            o({}, u),
            {},
            {
              iterations: t,
            }
          );
          s(n, c);
        },
        _isUsingNativeDriver: function () {
          return u.useNativeDriver || false;
        },
      }
    );
  },
  add: function (t, n) {
    return new module234(t, n);
  },
  subtract: function (t, n) {
    return new module242(t, n);
  },
  divide: function (t, n) {
    return new module236(t, n);
  },
  multiply: function (t, n) {
    return new module238(t, n);
  },
  modulo: function (t, n) {
    return new module237(t, n);
  },
  diffClamp: function (t, n, o) {
    return new module235(t, n, o);
  },
  delay: T,
  sequence: V,
  parallel: C,
  stagger: function (t, n) {
    return C(
      n.map(function (n, o) {
        return V([T(t * o), n]);
      })
    );
  },
  loop: function (t) {
    var n = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {},
      o = n.iterations,
      u = undefined === o ? -1 : o,
      s = n.resetBeforeIteration,
      c = undefined === s || s,
      f = false,
      v = 0;
    return {
      start: function (n) {
        if (t && 0 !== u)
          t._isUsingNativeDriver()
            ? t._startNativeLoop(u)
            : (function o() {
                var s =
                  arguments.length > 0 && undefined !== arguments[0]
                    ? arguments[0]
                    : {
                        finished: true,
                      };
                if (f || v === u || false === s.finished) {
                  if (n) n(s);
                } else {
                  v++;
                  if (c) t.reset();
                  t.start(o);
                }
              })();
        else if (n)
          n({
            finished: true,
          });
      },
      stop: function () {
        f = true;
        t.stop();
      },
      reset: function () {
        v = 0;
        f = false;
        t.reset();
      },
      _startNativeLoop: function () {
        throw new Error('Loops run using the native driver cannot contain Animated.loop animations');
      },
      _isUsingNativeDriver: function () {
        return t._isUsingNativeDriver();
      },
    };
  },
  event: function (t, n) {
    var o = new s(t, n);
    return o.__isNative ? o : o.__getHandler();
  },
  createAnimatedComponent: module252,
  attachNativeEvent: c,
  forkEvent: function (t, n) {
    return t
      ? t instanceof s
        ? (t.__addListener(n), t)
        : function () {
            if ('function' == typeof t) t.apply(undefined, arguments);
            n.apply(undefined, arguments);
          }
      : n;
  },
  unforkEvent: function (t, n) {
    if (t && t instanceof s) t.__removeListener(n);
  },
  Event: s,
  __PropsOnlyForTests: module239,
};
