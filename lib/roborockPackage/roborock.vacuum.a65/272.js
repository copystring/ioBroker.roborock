var module50 = require('./50'),
  module6 = require('./6');

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
        module50(n, o, s[o]);
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
  var o;

  if ('undefined' == typeof Symbol || null == t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) {
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

  return (o = t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']()).next.bind(o);
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

var module14 = require('./14');

class b {
  constructor() {
    var n =
      arguments.length > 0 && undefined !== arguments[0]
        ? arguments[0]
        : {
            viewAreaCoveragePercentThreshold: 0,
          };
    module6(this, t);
    this._hasInteracted = false;
    this._timers = new Set();
    this._viewableIndices = [];
    this._viewableItems = new Map();
    this._config = n;
  }

  dispose() {
    this._timers.forEach(clearTimeout);
  }

  computeViewableItems(t, n, o, s, c) {
    var l = this._config,
      u = l.itemVisiblePercentThreshold,
      f = l.viewAreaCoveragePercentThreshold,
      h = null != f,
      b = h ? f : u;
    module14(null != b && (null != u) != (null != f), 'Must set exactly one of itemVisiblePercentThreshold or viewAreaCoveragePercentThreshold');
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

    for (var S = I; S <= O; S++) {
      var j = s(S);

      if (j) {
        var P = j.offset - n,
          A = P + j.length;

        if (P < o && A > 0) {
          w = S;
          if (y(h, b, P, A, o, j.length)) p.push(S);
        } else if (w >= 0) break;
      }
    }

    return p;
  }

  onUpdate(t, n, o, s, c, l, u) {
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
  }

  resetViewableIndices() {
    this._viewableIndices = [];
  }

  recordInteraction() {
    this._hasInteracted = true;
  }

  _onUpdateSync(t, o, s) {
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
      var [_, I] = f.value;
      if (!h.has(_)) b.push(I);
    }

    for (var O, S = u(h); !(O = S()).done; ) {
      var [A, T] = O.value;
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
  }
}

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
