var module49 = require('./49'),
  module22 = require('./22'),
  module4 = require('./4'),
  module5 = require('./5');

function c(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function l(n) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      c(Object(s), true).forEach(function (o) {
        module49(n, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    else
      c(Object(s)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(s, t));
      });
  }

  return n;
}

function u(t, n) {
  var o = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (o) return (o = o.call(t)).next.bind(o);

  if (Array.isArray(t) || (o = f(t)) || (n && t && 'number' == typeof t.length)) {
    if (o) t = o;
    var s = 0;
    return function () {
      return s >= t.length
        ? {
            done: true,
          }
        : {
            done: false,
            value: t[s++],
          };
    };
  }

  throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function f(t, n) {
  if (t) {
    if ('string' == typeof t) return h(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? h(t, n) : undefined;
  }
}

function h(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, s = new Array(n); o < n; o++) s[o] = t[o];

  return s;
}

var module13 = require('./13'),
  b = (function () {
    function t() {
      var n =
        arguments.length > 0 && undefined !== arguments[0]
          ? arguments[0]
          : {
              viewAreaCoveragePercentThreshold: 0,
            };
      module4(this, t);
      this._hasInteracted = false;
      this._timers = new Set();
      this._viewableIndices = [];
      this._viewableItems = new Map();
      this._config = n;
    }

    module5(t, [
      {
        key: 'dispose',
        value: function () {
          this._timers.forEach(clearTimeout);
        },
      },
      {
        key: 'computeViewableItems',
        value: function (t, n, o, s, c) {
          var l = this._config,
            u = l.itemVisiblePercentThreshold,
            f = l.viewAreaCoveragePercentThreshold,
            h = null != f,
            b = h ? f : u;
          module13(null != b && (null != u) != (null != f), 'Must set exactly one of itemVisiblePercentThreshold or viewAreaCoveragePercentThreshold');
          var p = [];
          if (0 === t) return p;

          var w = -1,
            _ = c || {
              first: 0,
              last: t - 1,
            },
            I = _.first,
            O = _.last;

          if (O >= t) {
            console.warn(
              'Invalid render range computing viewability ' +
                JSON.stringify({
                  renderRange: c,
                  itemCount: t,
                })
            );
            return [];
          }

          for (var j = I; j <= O; j++) {
            var P = s(j);

            if (P) {
              var S = P.offset - n,
                A = S + P.length;

              if (S < o && A > 0) {
                w = j;
                if (y(h, b, S, A, o, P.length)) p.push(j);
              } else if (w >= 0) break;
            }
          }

          return p;
        },
      },
      {
        key: 'onUpdate',
        value: function (t, n, o, s, c, l, u) {
          var f = this;

          if ((!this._config.waitForInteraction || this._hasInteracted) && 0 !== t && s(0)) {
            var h = [];
            if (
              (t && (h = this.computeViewableItems(t, n, o, s, u)),
              this._viewableIndices.length !== h.length ||
                !this._viewableIndices.every(function (t, n) {
                  return t === h[n];
                }))
            )
              if (((this._viewableIndices = h), this._config.minimumViewTime)) {
                var v = setTimeout(function () {
                  f._timers.delete(v);

                  f._onUpdateSync(h, l, c);
                }, this._config.minimumViewTime);

                this._timers.add(v);
              } else this._onUpdateSync(h, l, c);
          }
        },
      },
      {
        key: 'resetViewableIndices',
        value: function () {
          this._viewableIndices = [];
        },
      },
      {
        key: 'recordInteraction',
        value: function () {
          this._hasInteracted = true;
        },
      },
      {
        key: '_onUpdateSync',
        value: function (t, o, s) {
          var c = this;
          t = t.filter(function (t) {
            return c._viewableIndices.includes(t);
          });

          for (
            var f,
              h = this._viewableItems,
              v = new Map(
                t.map(function (t) {
                  var n = s(t, true);
                  return [n.key, n];
                })
              ),
              b = [],
              y = u(v);
            !(f = y()).done;

          ) {
            var p = f.value,
              w = module22(p, 2),
              _ = w[0],
              I = w[1];
            if (!h.has(_)) b.push(I);
          }

          for (var O, j = u(h); !(O = j()).done; ) {
            var P = O.value,
              S = module22(P, 2),
              A = S[0],
              T = S[1];
            if (!v.has(A))
              b.push(
                l(
                  l({}, T),
                  {},
                  {
                    isViewable: false,
                  }
                )
              );
          }

          if (b.length > 0) {
            this._viewableItems = v;
            o({
              viewableItems: Array.from(v.values()),
              changed: b,
              viewabilityConfig: this._config,
            });
          }
        },
      },
    ]);
    return t;
  })();

function y(t, n, o, s, c, l) {
  if (w(o, s, c)) return true;
  var u = p(o, s, c);
  return 100 * (t ? u / c : u / l) >= n;
}

function p(t, n, o) {
  var s = n ** o - t ** 0;
  return 0 ** s;
}

function w(t, n, o) {
  return t >= 0 && n <= o && n > t;
}

module.exports = b;
