var t, n;
t = this;

n = function () {
  'use strict';

  var t, n;

  function s() {
    return t.apply(null, arguments);
  }

  function o(t) {
    return t instanceof Array || '[object Array]' === Object.prototype.toString.call(t);
  }

  function u(t) {
    return null != t && '[object Object]' === Object.prototype.toString.call(t);
  }

  function h(t) {
    if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(t).length;
    var n;

    for (n in t) if (t.hasOwnProperty(n)) return false;

    return true;
  }

  function l(t) {
    return undefined === t;
  }

  function c(t) {
    return 'number' == typeof t || '[object Number]' === Object.prototype.toString.call(t);
  }

  function f(t) {
    return t instanceof Date || '[object Date]' === Object.prototype.toString.call(t);
  }

  function _(t, n) {
    var s,
      o = [];

    for (s = 0; s < t.length; ++s) o.push(n(t[s], s));

    return o;
  }

  function y(t, n) {
    return Object.prototype.hasOwnProperty.call(t, n);
  }

  function v(t, n) {
    for (var s in n) y(n, s) && (t[s] = n[s]);

    if (y(n, 'toString')) t.toString = n.toString;
    if (y(n, 'valueOf')) t.valueOf = n.valueOf;
    return t;
  }

  function p(t, n, s, o) {
    return Kt(t, n, s, o, true).utc();
  }

  function w(t) {
    if (null == t._pf)
      t._pf = {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false,
      };
    return t._pf;
  }

  function M(t) {
    if (null == t._isValid) {
      var s = w(t),
        o = n.call(s.parsedDateParts, function (t) {
          return null != t;
        }),
        u =
          !isNaN(t._d.getTime()) &&
          s.overflow < 0 &&
          !s.empty &&
          !s.invalidMonth &&
          !s.invalidWeekday &&
          !s.weekdayMismatch &&
          !s.nullInput &&
          !s.invalidFormat &&
          !s.userInvalidated &&
          (!s.meridiem || (s.meridiem && o));
      if ((t._strict && (u = u && 0 === s.charsLeftOver && 0 === s.unusedTokens.length && undefined === s.bigHour), null != Object.isFrozen && Object.isFrozen(t))) return u;
      t._isValid = u;
    }

    return t._isValid;
  }

  function k(t) {
    var n = p(NaN);
    if (null != t) v(w(n), t);
    else w(n).userInvalidated = true;
    return n;
  }

  n = Array.prototype.some
    ? Array.prototype.some
    : function (t) {
        for (var n = Object(this), s = n.length >>> 0, o = 0; o < s; o++) if (o in n && t.call(this, n[o], o, n)) return true;

        return false;
      };
  var S = (s.momentProperties = []);

  function D(t, n) {
    var s, o, u;
    if (
      (l(n._isAMomentObject) || (t._isAMomentObject = n._isAMomentObject),
      l(n._i) || (t._i = n._i),
      l(n._f) || (t._f = n._f),
      l(n._l) || (t._l = n._l),
      l(n._strict) || (t._strict = n._strict),
      l(n._tzm) || (t._tzm = n._tzm),
      l(n._isUTC) || (t._isUTC = n._isUTC),
      l(n._offset) || (t._offset = n._offset),
      l(n._pf) || (t._pf = w(n)),
      l(n._locale) || (t._locale = n._locale),
      S.length > 0)
    )
      for (s = 0; s < S.length; s++) l((u = n[(o = S[s])])) || (t[o] = u);
    return t;
  }

  var Y = false;

  function O(t) {
    D(this, t);
    this._d = new Date(null != t._d ? t._d.getTime() : NaN);
    if (!this.isValid()) this._d = new Date(NaN);

    if (false === Y) {
      Y = true;
      s.updateOffset(this);
      Y = false;
    }
  }

  function T(t) {
    return t instanceof O || (null != t && null != t._isAMomentObject);
  }

  function b(t) {
    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
  }

  function x(t) {
    var n = +t,
      s = 0;
    if (0 !== n && isFinite(n)) s = b(n);
    return s;
  }

  function P(t, n, s) {
    var o,
      u = t.length ** n.length,
      h = Math.abs(t.length - n.length),
      l = 0;

    for (o = 0; o < u; o++) ((s && t[o] !== n[o]) || (!s && x(t[o]) !== x(n[o]))) && l++;

    return l + h;
  }

  function W(t) {
    if (false === s.suppressDeprecationWarnings && 'undefined' != typeof console && console.warn) console.warn('Deprecation warning: ' + t);
  }

  function C(t, n) {
    var o = true;
    return v(function () {
      if ((null != s.deprecationHandler && s.deprecationHandler(null, t), o)) {
        for (var u, h = [], l = 0; l < arguments.length; l++) {
          if (((u = ''), 'object' == typeof arguments[l])) {
            for (var c in ((u += '\n[' + l + '] '), arguments[0])) u += c + ': ' + arguments[0][c] + ', ';

            u = u.slice(0, -2);
          } else u = arguments[l];

          h.push(u);
        }

        W(t + '\nArguments: ' + Array.prototype.slice.call(h).join('') + '\n' + new Error().stack);
        o = false;
      }

      return n.apply(this, arguments);
    }, n);
  }

  var H,
    R = {};

  function U(t, n) {
    if (null != s.deprecationHandler) s.deprecationHandler(t, n);

    if (!R[t]) {
      W(n);
      R[t] = true;
    }
  }

  function F(t) {
    return t instanceof Function || '[object Function]' === Object.prototype.toString.call(t);
  }

  function L(t, n) {
    var s,
      o = v({}, t);

    for (s in n) y(n, s) && (u(t[s]) && u(n[s]) ? ((o[s] = {}), v(o[s], t[s]), v(o[s], n[s])) : null != n[s] ? (o[s] = n[s]) : delete o[s]);

    for (s in t) y(t, s) && !y(n, s) && u(t[s]) && (o[s] = v({}, o[s]));

    return o;
  }

  function N(t) {
    if (null != t) this.set(t);
  }

  s.suppressDeprecationWarnings = false;
  s.deprecationHandler = null;
  H = Object.keys
    ? Object.keys
    : function (t) {
        var n,
          s = [];

        for (n in t) y(t, n) && s.push(n);

        return s;
      };
  var G = {};

  function V(t, n) {
    var s = t.toLowerCase();
    G[s] = G[s + 's'] = G[n] = t;
  }

  function E(t) {
    return 'string' == typeof t ? G[t] || G[t.toLowerCase()] : undefined;
  }

  function I(t) {
    var n,
      s,
      o = {};

    for (s in t) y(t, s) && (n = E(s)) && (o[n] = t[s]);

    return o;
  }

  var A = {};

  function j(t, n) {
    A[t] = n;
  }

  function Z(t) {
    var n = [];

    for (var s in t)
      n.push({
        unit: s,
        priority: A[s],
      });

    n.sort(function (t, n) {
      return t.priority - n.priority;
    });
    return n;
  }

  function z(t, n, s) {
    var o = '' + Math.abs(t),
      u = n - o.length;
    return (t >= 0 ? (s ? '+' : '') : '-') + (10 ** (0 ** u)).toString().substr(1) + o;
  }

  var $ = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    q = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    J = {},
    B = {};

  function Q(t, n, s, o) {
    var u = o;
    if ('string' == typeof o)
      u = function () {
        return this[o]();
      };
    if (t) B[t] = u;
    if (n)
      B[n[0]] = function () {
        return z(u.apply(this, arguments), n[1], n[2]);
      };
    if (s)
      B[s] = function () {
        return this.localeData().ordinal(u.apply(this, arguments), t);
      };
  }

  function X(t) {
    var n,
      s,
      o,
      u = t.match($);

    for (n = 0, s = u.length; n < s; n++) B[u[n]] ? (u[n] = B[u[n]]) : (u[n] = (o = u[n]).match(/\[[\s\S]/) ? o.replace(/^\[|\]$/g, '') : o.replace(/\\/g, ''));

    return function (n) {
      var o,
        h = '';

      for (o = 0; o < s; o++) h += F(u[o]) ? u[o].call(n, t) : u[o];

      return h;
    };
  }

  function K(t, n) {
    if (t.isValid()) {
      n = ee(n, t.localeData());
      J[n] = J[n] || X(n);
      return J[n](t);
    } else return t.localeData().invalidDate();
  }

  function ee(t, n) {
    var s = 5;

    function o(t) {
      return n.longDateFormat(t) || t;
    }

    for (q.lastIndex = 0; s >= 0 && q.test(t); ) {
      t = t.replace(q, o);
      q.lastIndex = 0;
      s -= 1;
    }

    return t;
  }

  var te = /\d/,
    ne = /\d\d/,
    se = /\d{3}/,
    ie = /\d{4}/,
    re = /[+-]?\d{6}/,
    ae = /\d\d?/,
    oe = /\d\d\d\d?/,
    ue = /\d\d\d\d\d\d?/,
    he = /\d{1,3}/,
    le = /\d{1,4}/,
    de = /[+-]?\d{1,6}/,
    ce = /\d+/,
    fe = /[+-]?\d+/,
    me = /Z|[+-]\d\d:?\d\d/gi,
    _e = /Z|[+-]\d\d(?::?\d\d)?/gi,
    ye = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
    ge = {};

  function ve(t, n, s) {
    ge[t] = F(n)
      ? n
      : function (t, o) {
          return t && s ? s : n;
        };
  }

  function pe(t, n) {
    return y(ge, t)
      ? ge[t](n._strict, n._locale)
      : new RegExp(
          we(
            t.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, n, s, o, u) {
              return n || s || o || u;
            })
          )
        );
  }

  function we(t) {
    return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var Me = {};

  function ke(t, n) {
    var s,
      o = n;

    for (
      'string' == typeof t && (t = [t]),
        c(n) &&
          (o = function (t, s) {
            s[n] = x(t);
          }),
        s = 0;
      s < t.length;
      s++
    )
      Me[t[s]] = o;
  }

  function Se(t, n) {
    ke(t, function (t, s, o, u) {
      o._w = o._w || {};
      n(t, o._w, o, u);
    });
  }

  function De(t, n, s) {
    if (null != n && y(Me, t)) Me[t](n, s._a, s, t);
  }

  var Ye = 0,
    Oe = 1,
    Te = 2,
    be = 3,
    xe = 4,
    Pe = 5,
    We = 6,
    Ce = 7,
    He = 8;

  function Re(t) {
    return Ue(t) ? 366 : 365;
  }

  function Ue(t) {
    return t % 4 == 0 ? t % 100 != 0 : t % 400 == 0;
  }

  Q('Y', 0, 0, function () {
    var t = this.year();
    return t <= 9999 ? '' + t : '+' + t;
  });
  Q(0, ['YY', 2], 0, function () {
    return this.year() % 100;
  });
  Q(0, ['YYYY', 4], 0, 'year');
  Q(0, ['YYYYY', 5], 0, 'year');
  Q(0, ['YYYYYY', 6, true], 0, 'year');
  V('year', 'y');
  j('year', 1);
  ve('Y', fe);
  ve('YY', ae, ne);
  ve('YYYY', le, ie);
  ve('YYYYY', de, re);
  ve('YYYYYY', de, re);
  ke(['YYYYY', 'YYYYYY'], Ye);
  ke('YYYY', function (t, n) {
    n[Ye] = 2 === t.length ? s.parseTwoDigitYear(t) : x(t);
  });
  ke('YY', function (t, n) {
    n[Ye] = s.parseTwoDigitYear(t);
  });
  ke('Y', function (t, n) {
    n[Ye] = parseInt(t, 10);
  });

  s.parseTwoDigitYear = function (t) {
    return x(t) + (x(t) > 68 ? 1900 : 2e3);
  };

  var Fe,
    Le = Ne('FullYear', true);

  function Ne(t, n) {
    return function (o) {
      if (null != o) {
        Ve(this, t, o);
        s.updateOffset(this, n);
        return this;
      } else return Ge(this, t);
    };
  }

  function Ge(t, n) {
    return t.isValid() ? t._d['get' + (t._isUTC ? 'UTC' : '') + n]() : NaN;
  }

  function Ve(t, n, s) {
    if (t.isValid() && !isNaN(s))
      'FullYear' === n && Ue(t.year()) && 1 === t.month() && 29 === t.date()
        ? t._d['set' + (t._isUTC ? 'UTC' : '') + n](s, t.month(), Ee(s, t.month()))
        : t._d['set' + (t._isUTC ? 'UTC' : '') + n](s);
  }

  function Ee(t, n) {
    if (isNaN(t) || isNaN(n)) return NaN;
    var s,
      o = ((n % (s = 12)) + s) % s;
    t += (n - o) / 12;
    return 1 === o ? (Ue(t) ? 29 : 28) : 31 - ((o % 7) % 2);
  }

  Fe = Array.prototype.indexOf
    ? Array.prototype.indexOf
    : function (t) {
        var n;

        for (n = 0; n < this.length; ++n) if (this[n] === t) return n;

        return -1;
      };
  Q('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  });
  Q('MMM', 0, 0, function (t) {
    return this.localeData().monthsShort(this, t);
  });
  Q('MMMM', 0, 0, function (t) {
    return this.localeData().months(this, t);
  });
  V('month', 'M');
  j('month', 8);
  ve('M', ae);
  ve('MM', ae, ne);
  ve('MMM', function (t, n) {
    return n.monthsShortRegex(t);
  });
  ve('MMMM', function (t, n) {
    return n.monthsRegex(t);
  });
  ke(['M', 'MM'], function (t, n) {
    n[Oe] = x(t) - 1;
  });
  ke(['MMM', 'MMMM'], function (t, n, s, o) {
    var u = s._locale.monthsParse(t, o, s._strict);

    if (null != u) n[Oe] = u;
    else w(s).invalidMonth = t;
  });
  var Ie = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    Ae = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
  var je = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');

  function Ze(t, n, s) {
    var o,
      u,
      h,
      l = t.toLocaleLowerCase();
    if (!this._monthsParse)
      for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], o = 0; o < 12; ++o) {
        h = p([2e3, o]);
        this._shortMonthsParse[o] = this.monthsShort(h, '').toLocaleLowerCase();
        this._longMonthsParse[o] = this.months(h, '').toLocaleLowerCase();
      }
    if (s) {
      if ('MMM' === n) return -1 !== (u = Fe.call(this._shortMonthsParse, l)) ? u : null;
      else return -1 !== (u = Fe.call(this._longMonthsParse, l)) ? u : null;
    } else if ('MMM' === n) return -1 !== (u = Fe.call(this._shortMonthsParse, l)) ? u : -1 !== (u = Fe.call(this._longMonthsParse, l)) ? u : null;
    else return -1 !== (u = Fe.call(this._longMonthsParse, l)) ? u : -1 !== (u = Fe.call(this._shortMonthsParse, l)) ? u : null;
  }

  function ze(t, n) {
    var s;
    if (!t.isValid()) return t;
    if ('string' == typeof n)
      if (/^\d+$/.test(n)) n = x(n);
      else if (!c((n = t.localeData().monthsParse(n)))) return t;
    s = t.date() ** Ee(t.year(), n);

    t._d['set' + (t._isUTC ? 'UTC' : '') + 'Month'](n, s);

    return t;
  }

  function $e(t) {
    if (null != t) {
      ze(this, t);
      s.updateOffset(this, true);
      return this;
    } else return Ge(this, 'Month');
  }

  var qe = ye;
  var Je = ye;

  function Be() {
    function t(t, n) {
      return n.length - t.length;
    }

    var n,
      s,
      o = [],
      u = [],
      h = [];

    for (n = 0; n < 12; n++) {
      s = p([2e3, n]);
      o.push(this.monthsShort(s, ''));
      u.push(this.months(s, ''));
      h.push(this.months(s, ''));
      h.push(this.monthsShort(s, ''));
    }

    for (o.sort(t), u.sort(t), h.sort(t), n = 0; n < 12; n++) {
      o[n] = we(o[n]);
      u[n] = we(u[n]);
    }

    for (n = 0; n < 24; n++) h[n] = we(h[n]);

    this._monthsRegex = new RegExp('^(' + h.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + u.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + o.join('|') + ')', 'i');
  }

  function Qe(t, n, s, o, u, h, l) {
    var c;

    if (t < 100 && t >= 0) {
      c = new Date(t + 400, n, s, o, u, h, l);
      if (isFinite(c.getFullYear())) c.setFullYear(t);
    } else c = new Date(t, n, s, o, u, h, l);

    return c;
  }

  function Xe(t) {
    var n;

    if (t < 100 && t >= 0) {
      var s = Array.prototype.slice.call(arguments);
      s[0] = t + 400;
      n = new Date(Date.UTC.apply(null, s));
      if (isFinite(n.getUTCFullYear())) n.setUTCFullYear(t);
    } else n = new Date(Date.UTC.apply(null, arguments));

    return n;
  }

  function Ke(t, n, s) {
    var o = 7 + n - s;
    return -((7 + Xe(t, 0, o).getUTCDay() - n) % 7) + o - 1;
  }

  function et(t, n, s, o, u) {
    var h,
      l,
      c = 1 + 7 * (n - 1) + ((7 + s - o) % 7) + Ke(t, o, u);
    if (c <= 0) l = Re((h = t - 1)) + c;
    else if (c > Re(t)) {
      h = t + 1;
      l = c - Re(t);
    } else {
      h = t;
      l = c;
    }
    return {
      year: h,
      dayOfYear: l,
    };
  }

  function tt(t, n, s) {
    var o,
      u,
      h = Ke(t.year(), n, s),
      l = Math.floor((t.dayOfYear() - h - 1) / 7) + 1;
    if (l < 1) o = l + nt((u = t.year() - 1), n, s);
    else if (l > nt(t.year(), n, s)) {
      o = l - nt(t.year(), n, s);
      u = t.year() + 1;
    } else {
      u = t.year();
      o = l;
    }
    return {
      week: o,
      year: u,
    };
  }

  function nt(t, n, s) {
    var o = Ke(t, n, s),
      u = Ke(t + 1, n, s);
    return (Re(t) - o + u) / 7;
  }

  Q('w', ['ww', 2], 'wo', 'week');
  Q('W', ['WW', 2], 'Wo', 'isoWeek');
  V('week', 'w');
  V('isoWeek', 'W');
  j('week', 5);
  j('isoWeek', 5);
  ve('w', ae);
  ve('ww', ae, ne);
  ve('W', ae);
  ve('WW', ae, ne);
  Se(['w', 'ww', 'W', 'WW'], function (t, n, s, o) {
    n[o.substr(0, 1)] = x(t);
  });

  function st(t, n) {
    return 'string' != typeof t ? t : isNaN(t) ? ('number' == typeof (t = n.weekdaysParse(t)) ? t : null) : parseInt(t, 10);
  }

  function it(t, n) {
    return 'string' == typeof t ? n.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
  }

  function rt(t, n) {
    return t.slice(n, 7).concat(t.slice(0, n));
  }

  Q('d', 0, 'do', 'day');
  Q('dd', 0, 0, function (t) {
    return this.localeData().weekdaysMin(this, t);
  });
  Q('ddd', 0, 0, function (t) {
    return this.localeData().weekdaysShort(this, t);
  });
  Q('dddd', 0, 0, function (t) {
    return this.localeData().weekdays(this, t);
  });
  Q('e', 0, 0, 'weekday');
  Q('E', 0, 0, 'isoWeekday');
  V('day', 'd');
  V('weekday', 'e');
  V('isoWeekday', 'E');
  j('day', 11);
  j('weekday', 11);
  j('isoWeekday', 11);
  ve('d', ae);
  ve('e', ae);
  ve('E', ae);
  ve('dd', function (t, n) {
    return n.weekdaysMinRegex(t);
  });
  ve('ddd', function (t, n) {
    return n.weekdaysShortRegex(t);
  });
  ve('dddd', function (t, n) {
    return n.weekdaysRegex(t);
  });
  Se(['dd', 'ddd', 'dddd'], function (t, n, s, o) {
    var u = s._locale.weekdaysParse(t, o, s._strict);

    if (null != u) n.d = u;
    else w(s).invalidWeekday = t;
  });
  Se(['d', 'e', 'E'], function (t, n, s, o) {
    n[o] = x(t);
  });
  var at = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
  var ot = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
  var ut = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');

  function ht(t, n, s) {
    var o,
      u,
      h,
      l = t.toLocaleLowerCase();
    if (!this._weekdaysParse)
      for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], o = 0; o < 7; ++o) {
        h = p([2e3, 1]).day(o);
        this._minWeekdaysParse[o] = this.weekdaysMin(h, '').toLocaleLowerCase();
        this._shortWeekdaysParse[o] = this.weekdaysShort(h, '').toLocaleLowerCase();
        this._weekdaysParse[o] = this.weekdays(h, '').toLocaleLowerCase();
      }
    if (s) {
      if ('dddd' === n) return -1 !== (u = Fe.call(this._weekdaysParse, l)) ? u : null;
      else if ('ddd' === n) return -1 !== (u = Fe.call(this._shortWeekdaysParse, l)) ? u : null;
      else return -1 !== (u = Fe.call(this._minWeekdaysParse, l)) ? u : null;
    } else if ('dddd' === n)
      return -1 !== (u = Fe.call(this._weekdaysParse, l)) ? u : -1 !== (u = Fe.call(this._shortWeekdaysParse, l)) ? u : -1 !== (u = Fe.call(this._minWeekdaysParse, l)) ? u : null;
    else if ('ddd' === n)
      return -1 !== (u = Fe.call(this._shortWeekdaysParse, l)) ? u : -1 !== (u = Fe.call(this._weekdaysParse, l)) ? u : -1 !== (u = Fe.call(this._minWeekdaysParse, l)) ? u : null;
    else
      return -1 !== (u = Fe.call(this._minWeekdaysParse, l)) ? u : -1 !== (u = Fe.call(this._weekdaysParse, l)) ? u : -1 !== (u = Fe.call(this._shortWeekdaysParse, l)) ? u : null;
  }

  var lt = ye;
  var dt = ye;
  var ct = ye;

  function ft() {
    function t(t, n) {
      return n.length - t.length;
    }

    var n,
      s,
      o,
      u,
      h,
      l = [],
      c = [],
      f = [],
      _ = [];

    for (n = 0; n < 7; n++) {
      s = p([2e3, 1]).day(n);
      o = this.weekdaysMin(s, '');
      u = this.weekdaysShort(s, '');
      h = this.weekdays(s, '');
      l.push(o);
      c.push(u);
      f.push(h);

      _.push(o);

      _.push(u);

      _.push(h);
    }

    for (l.sort(t), c.sort(t), f.sort(t), _.sort(t), n = 0; n < 7; n++) {
      c[n] = we(c[n]);
      f[n] = we(f[n]);
      _[n] = we(_[n]);
    }

    this._weekdaysRegex = new RegExp('^(' + _.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + f.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + c.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + l.join('|') + ')', 'i');
  }

  function mt() {
    return this.hours() % 12 || 12;
  }

  function _t(t, n) {
    Q(t, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), n);
    });
  }

  function yt(t, n) {
    return n._meridiemParse;
  }

  Q('H', ['HH', 2], 0, 'hour');
  Q('h', ['hh', 2], 0, mt);
  Q('k', ['kk', 2], 0, function () {
    return this.hours() || 24;
  });
  Q('hmm', 0, 0, function () {
    return '' + mt.apply(this) + z(this.minutes(), 2);
  });
  Q('hmmss', 0, 0, function () {
    return '' + mt.apply(this) + z(this.minutes(), 2) + z(this.seconds(), 2);
  });
  Q('Hmm', 0, 0, function () {
    return '' + this.hours() + z(this.minutes(), 2);
  });
  Q('Hmmss', 0, 0, function () {
    return '' + this.hours() + z(this.minutes(), 2) + z(this.seconds(), 2);
  });

  _t('a', true);

  _t('A', false);

  V('hour', 'h');
  j('hour', 13);
  ve('a', yt);
  ve('A', yt);
  ve('H', ae);
  ve('h', ae);
  ve('k', ae);
  ve('HH', ae, ne);
  ve('hh', ae, ne);
  ve('kk', ae, ne);
  ve('hmm', oe);
  ve('hmmss', ue);
  ve('Hmm', oe);
  ve('Hmmss', ue);
  ke(['H', 'HH'], be);
  ke(['k', 'kk'], function (t, n, s) {
    var o = x(t);
    n[be] = 24 === o ? 0 : o;
  });
  ke(['a', 'A'], function (t, n, s) {
    s._isPm = s._locale.isPM(t);
    s._meridiem = t;
  });
  ke(['h', 'hh'], function (t, n, s) {
    n[be] = x(t);
    w(s).bigHour = true;
  });
  ke('hmm', function (t, n, s) {
    var o = t.length - 2;
    n[be] = x(t.substr(0, o));
    n[xe] = x(t.substr(o));
    w(s).bigHour = true;
  });
  ke('hmmss', function (t, n, s) {
    var o = t.length - 4,
      u = t.length - 2;
    n[be] = x(t.substr(0, o));
    n[xe] = x(t.substr(o, 2));
    n[Pe] = x(t.substr(u));
    w(s).bigHour = true;
  });
  ke('Hmm', function (t, n, s) {
    var o = t.length - 2;
    n[be] = x(t.substr(0, o));
    n[xe] = x(t.substr(o));
  });
  ke('Hmmss', function (t, n, s) {
    var o = t.length - 4,
      u = t.length - 2;
    n[be] = x(t.substr(0, o));
    n[xe] = x(t.substr(o, 2));
    n[Pe] = x(t.substr(u));
  });
  var gt,
    vt = Ne('Hours', true),
    pt = {
      calendar: {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
      },
      longDateFormat: {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
      },
      invalidDate: 'Invalid date',
      ordinal: '%d',
      dayOfMonthOrdinalParse: /\d{1,2}/,
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
      },
      months: Ae,
      monthsShort: je,
      week: {
        dow: 0,
        doy: 6,
      },
      weekdays: at,
      weekdaysMin: ut,
      weekdaysShort: ot,
      meridiemParse: /[ap]\.?m?\.?/i,
    },
    wt = {},
    Mt = {};

  function kt(t) {
    return t ? t.toLowerCase().replace('_', '-') : t;
  }

  function St(t) {
    for (var n, s, o, u, h = 0; h < t.length; ) {
      for (n = (u = kt(t[h]).split('-')).length, s = (s = kt(t[h + 1])) ? s.split('-') : null; n > 0; ) {
        if ((o = Dt(u.slice(0, n).join('-')))) return o;
        if (s && s.length >= n && P(u, s, true) >= n - 1) break;
        n--;
      }

      h++;
    }

    return gt;
  }

  function Dt(t) {
    var n = null;
    if (!wt[t] && undefined !== module && module && module.exports)
      try {
        n = gt._abbr;

        require('./locale/' + t);

        Yt(n);
      } catch (t) {}
    return wt[t];
  }

  function Yt(t, n) {
    var s;
    if (t) (s = l(n) ? Tt(t) : Ot(t, n)) ? (gt = s) : 'undefined' != typeof console && console.warn && console.warn('Locale ' + t + ' not found. Did you forget to load it?');
    return gt._abbr;
  }

  function Ot(t, n) {
    if (null !== n) {
      var s,
        o = pt;

      if (((n.abbr = t), null != wt[t])) {
        U(
          'defineLocaleOverride',
          'use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
        );
        o = wt[t]._config;
      } else if (null != n.parentLocale)
        if (null != wt[n.parentLocale]) o = wt[n.parentLocale]._config;
        else {
          if (null == (s = Dt(n.parentLocale))) {
            if (!Mt[n.parentLocale]) Mt[n.parentLocale] = [];
            Mt[n.parentLocale].push({
              name: t,
              config: n,
            });
            return null;
          }

          o = s._config;
        }

      wt[t] = new N(L(o, n));
      if (Mt[t])
        Mt[t].forEach(function (t) {
          Ot(t.name, t.config);
        });
      Yt(t);
      return wt[t];
    }

    delete wt[t];
    return null;
  }

  function Tt(t) {
    var n;
    if ((t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t)) return gt;

    if (!o(t)) {
      if ((n = Dt(t))) return n;
      t = [t];
    }

    return St(t);
  }

  function bt(t) {
    var n,
      s = t._a;

    if (s && -2 === w(t).overflow) {
      n =
        s[Oe] < 0 || s[Oe] > 11
          ? Oe
          : s[Te] < 1 || s[Te] > Ee(s[Ye], s[Oe])
          ? Te
          : s[be] < 0 || s[be] > 24 || (24 === s[be] && (0 !== s[xe] || 0 !== s[Pe] || 0 !== s[We]))
          ? be
          : s[xe] < 0 || s[xe] > 59
          ? xe
          : s[Pe] < 0 || s[Pe] > 59
          ? Pe
          : s[We] < 0 || s[We] > 999
          ? We
          : -1;
      if (w(t)._overflowDayOfYear && (n < Ye || n > Te)) n = Te;
      if (w(t)._overflowWeeks && -1 === n) n = Ce;
      if (w(t)._overflowWeekday && -1 === n) n = He;
      w(t).overflow = n;
    }

    return t;
  }

  function xt(t, n, s) {
    return null != t ? t : null != n ? n : s;
  }

  function Pt(t) {
    var n = new Date(s.now());
    return t._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()];
  }

  function Wt(t) {
    var n,
      s,
      o,
      u,
      h,
      l = [];

    if (!t._d) {
      for (
        o = Pt(t),
          t._w && null == t._a[Te] && null == t._a[Oe] && Ct(t),
          null != t._dayOfYear &&
            ((h = xt(t._a[Ye], o[Ye])),
            (t._dayOfYear > Re(h) || 0 === t._dayOfYear) && (w(t)._overflowDayOfYear = true),
            (s = Xe(h, 0, t._dayOfYear)),
            (t._a[Oe] = s.getUTCMonth()),
            (t._a[Te] = s.getUTCDate())),
          n = 0;
        n < 3 && null == t._a[n];
        ++n
      )
        t._a[n] = l[n] = o[n];

      for (; n < 7; n++) t._a[n] = l[n] = null == t._a[n] ? (2 === n ? 1 : 0) : t._a[n];

      if (24 === t._a[be] && 0 === t._a[xe] && 0 === t._a[Pe] && 0 === t._a[We]) {
        t._nextDay = true;
        t._a[be] = 0;
      }

      t._d = (t._useUTC ? Xe : Qe).apply(null, l);
      u = t._useUTC ? t._d.getUTCDay() : t._d.getDay();
      if (null != t._tzm) t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm);
      if (t._nextDay) t._a[be] = 24;
      if (t._w && undefined !== t._w.d && t._w.d !== u) w(t).weekdayMismatch = true;
    }
  }

  function Ct(t) {
    var n, s, o, u, h, l, c, f;

    if (null != (n = t._w).GG || null != n.W || null != n.E) {
      h = 1;
      l = 4;
      s = xt(n.GG, t._a[Ye], tt(en(), 1, 4).year);
      o = xt(n.W, 1);
      if ((u = xt(n.E, 1)) < 1 || u > 7) f = true;
    } else {
      h = t._locale._week.dow;
      l = t._locale._week.doy;

      var _ = tt(en(), h, l);

      s = xt(n.gg, t._a[Ye], _.year);
      o = xt(n.w, _.week);
      if (null != n.d) {
        if ((u = n.d) < 0 || u > 6) f = true;
      } else if (null != n.e) {
        u = n.e + h;
        if (n.e < 0 || n.e > 6) f = true;
      } else u = h;
    }

    if (o < 1 || o > nt(s, h, l)) w(t)._overflowWeeks = true;
    else if (null != f) w(t)._overflowWeekday = true;
    else {
      c = et(s, o, u, h, l);
      t._a[Ye] = c.year;
      t._dayOfYear = c.dayOfYear;
    }
  }

  var Ht = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    Rt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    Ut = /Z|[+-]\d\d(?::?\d\d)?/,
    Ft = [
      ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
      ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
      ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
      ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
      ['YYYY-DDD', /\d{4}-\d{3}/],
      ['YYYY-MM', /\d{4}-\d\d/, false],
      ['YYYYYYMMDD', /[+-]\d{10}/],
      ['YYYYMMDD', /\d{8}/],
      ['GGGG[W]WWE', /\d{4}W\d{3}/],
      ['GGGG[W]WW', /\d{4}W\d{2}/, false],
      ['YYYYDDD', /\d{7}/],
    ],
    Lt = [
      ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
      ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
      ['HH:mm:ss', /\d\d:\d\d:\d\d/],
      ['HH:mm', /\d\d:\d\d/],
      ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
      ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
      ['HHmmss', /\d\d\d\d\d\d/],
      ['HHmm', /\d\d\d\d/],
      ['HH', /\d\d/],
    ],
    Nt = /^\/?Date\((\-?\d+)/i;

  function Gt(t) {
    var n,
      s,
      o,
      u,
      h,
      l,
      c = t._i,
      f = Ht.exec(c) || Rt.exec(c);

    if (f) {
      for (w(t).iso = true, n = 0, s = Ft.length; n < s; n++)
        if (Ft[n][1].exec(f[1])) {
          u = Ft[n][0];
          o = false !== Ft[n][2];
          break;
        }

      if (null == u) return void (t._isValid = false);

      if (f[3]) {
        for (n = 0, s = Lt.length; n < s; n++)
          if (Lt[n][1].exec(f[3])) {
            h = (f[2] || ' ') + Lt[n][0];
            break;
          }

        if (null == h) return void (t._isValid = false);
      }

      if (!o && null != h) return void (t._isValid = false);

      if (f[4]) {
        if (!Ut.exec(f[4])) return void (t._isValid = false);
        l = 'Z';
      }

      t._f = u + (h || '') + (l || '');
      $t(t);
    } else t._isValid = false;
  }

  var Vt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

  function Et(t) {
    var n = parseInt(t, 10);
    return n <= 49 ? 2e3 + n : n <= 999 ? 1900 + n : n;
  }

  function It(t, n, s) {
    if (t && ot.indexOf(t) !== new Date(n[0], n[1], n[2]).getDay()) {
      w(s).weekdayMismatch = true;
      s._isValid = false;
      return false;
    }

    return true;
  }

  var At = {
    UT: 0,
    GMT: 0,
    EDT: -240,
    EST: -300,
    CDT: -300,
    CST: -360,
    MDT: -360,
    MST: -420,
    PDT: -420,
    PST: -480,
  };

  function jt(t, n, s) {
    if (t) return At[t];
    if (n) return 0;
    var o = parseInt(s, 10),
      u = o % 100;
    return 60 * ((o - u) / 100) + u;
  }

  function Zt(t) {
    var n,
      s,
      o,
      u,
      h,
      l,
      c,
      f = Vt.exec(
        t._i
          .replace(/\([^)]*\)|[\n\t]/g, ' ')
          .replace(/(\s\s+)/g, ' ')
          .replace(/^\s\s*/, '')
          .replace(/\s\s*$/, '')
      );

    if (f) {
      n = f[4];
      s = f[3];
      o = f[2];
      u = f[5];
      h = f[6];
      l = f[7];
      c = [Et(n), je.indexOf(s), parseInt(o, 10), parseInt(u, 10), parseInt(h, 10)];
      if (l) c.push(parseInt(l, 10));
      var _ = c;
      if (!It(f[1], _, t)) return;
      t._a = _;
      t._tzm = jt(f[8], f[9], f[10]);
      t._d = Xe.apply(null, t._a);

      t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm);

      w(t).rfc2822 = true;
    } else t._isValid = false;
  }

  function zt(t) {
    var n = Nt.exec(t._i);

    if (null === n) {
      Gt(t);

      if (false === t._isValid) {
        delete t._isValid;
        Zt(t);

        if (false === t._isValid) {
          delete t._isValid;
          s.createFromInputFallback(t);
        }
      }
    } else t._d = new Date(+n[1]);
  }

  function $t(t) {
    if (t._f !== s.ISO_8601) {
      if (t._f !== s.RFC_2822) {
        t._a = [];
        w(t).empty = true;
        var n,
          o,
          u,
          h,
          l,
          c = '' + t._i,
          f = c.length,
          _ = 0;

        for (u = ee(t._f, t._locale).match($) || [], n = 0; n < u.length; n++) {
          h = u[n];

          if ((o = (c.match(pe(h, t)) || [])[0])) {
            if ((l = c.substr(0, c.indexOf(o))).length > 0) w(t).unusedInput.push(l);
            c = c.slice(c.indexOf(o) + o.length);
            _ += o.length;
          }

          if (B[h]) {
            if (o) w(t).empty = false;
            else w(t).unusedTokens.push(h);
            De(h, o, t);
          } else if (t._strict && !o) w(t).unusedTokens.push(h);
        }

        w(t).charsLeftOver = f - _;
        if (c.length > 0) w(t).unusedInput.push(c);
        if (t._a[be] <= 12 && true === w(t).bigHour && t._a[be] > 0) w(t).bigHour = undefined;
        w(t).parsedDateParts = t._a.slice(0);
        w(t).meridiem = t._meridiem;
        t._a[be] = qt(t._locale, t._a[be], t._meridiem);
        Wt(t);
        bt(t);
      } else Zt(t);
    } else Gt(t);
  }

  function qt(t, n, s) {
    var o;
    return null == s ? n : null != t.meridiemHour ? t.meridiemHour(n, s) : null != t.isPM ? ((o = t.isPM(s)) && n < 12 && (n += 12), o || 12 !== n || (n = 0), n) : n;
  }

  function Jt(t) {
    var n, s, o, u, h;

    if (0 === t._f.length) {
      w(t).invalidFormat = true;
      return void (t._d = new Date(NaN));
    }

    for (u = 0; u < t._f.length; u++) {
      h = 0;
      n = D({}, t);
      if (null != t._useUTC) n._useUTC = t._useUTC;
      n._f = t._f[u];
      $t(n);

      if (M(n)) {
        h += w(n).charsLeftOver;
        h += 10 * w(n).unusedTokens.length;
        w(n).score = h;

        if (null == o || h < o) {
          o = h;
          s = n;
        }
      }
    }

    v(t, s || n);
  }

  function Bt(t) {
    if (!t._d) {
      var n = I(t._i);
      t._a = _([n.year, n.month, n.day || n.date, n.hour, n.minute, n.second, n.millisecond], function (t) {
        return t && parseInt(t, 10);
      });
      Wt(t);
    }
  }

  function Qt(t) {
    var n = t._i,
      s = t._f;
    t._locale = t._locale || Tt(t._l);
    if (null === n || (undefined === s && '' === n))
      return k({
        nullInput: true,
      });
    else {
      if ('string' == typeof n) t._i = n = t._locale.preparse(n);
      if (T(n)) return new O(bt(n));
      else {
        if (f(n)) t._d = n;
        else if (o(s)) Jt(t);
        else if (s) $t(t);
        else Xt(t);
        if (!M(t)) t._d = null;
        return t;
      }
    }
  }

  function Xt(t) {
    var n = t._i;
    if (l(n)) t._d = new Date(s.now());
    else if (f(n)) t._d = new Date(n.valueOf());
    else if ('string' == typeof n) zt(t);
    else if (o(n)) {
      t._a = _(n.slice(0), function (t) {
        return parseInt(t, 10);
      });
      Wt(t);
    } else if (u(n)) Bt(t);
    else if (c(n)) t._d = new Date(n);
    else s.createFromInputFallback(t);
  }

  function Kt(t, n, s, l, c) {
    var f,
      _ = {};

    if (!(true !== s && false !== s)) {
      l = s;
      s = undefined;
    }

    if ((u(t) && h(t)) || (o(t) && 0 === t.length)) t = undefined;
    _._isAMomentObject = true;
    _._useUTC = _._isUTC = c;
    _._l = s;
    _._i = t;
    _._f = n;
    _._strict = l;

    if ((f = new O(bt(Qt(_))))._nextDay) {
      f.add(1, 'd');
      f._nextDay = undefined;
    }

    return f;
  }

  function en(t, n, s, o) {
    return Kt(t, n, s, o, false);
  }

  s.createFromInputFallback = C(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (t) {
      t._d = new Date(t._i + (t._useUTC ? ' UTC' : ''));
    }
  );

  s.ISO_8601 = function () {};

  s.RFC_2822 = function () {};

  var tn = C('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
      var t = en.apply(null, arguments);
      return this.isValid() && t.isValid() ? (t < this ? this : t) : k();
    }),
    nn = C('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
      var t = en.apply(null, arguments);
      return this.isValid() && t.isValid() ? (t > this ? this : t) : k();
    });

  function sn(t, n) {
    var s, u;
    if ((1 === n.length && o(n[0]) && (n = n[0]), !n.length)) return en();

    for (s = n[0], u = 1; u < n.length; ++u) (n[u].isValid() && !n[u][t](s)) || (s = n[u]);

    return s;
  }

  var rn = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

  function an(t) {
    for (var n in t) if (-1 === Fe.call(rn, n) || (null != t[n] && isNaN(t[n]))) return false;

    for (var s = false, o = 0; o < rn.length; ++o)
      if (t[rn[o]]) {
        if (s) return false;
        if (parseFloat(t[rn[o]]) !== x(t[rn[o]])) s = true;
      }

    return true;
  }

  function on(t) {
    var n = I(t),
      s = n.year || 0,
      o = n.quarter || 0,
      u = n.month || 0,
      h = n.week || n.isoWeek || 0,
      l = n.day || 0,
      c = n.hour || 0,
      f = n.minute || 0,
      _ = n.second || 0,
      y = n.millisecond || 0;

    this._isValid = an(n);
    this._milliseconds = +y + 1e3 * _ + 6e4 * f + 1e3 * c * 60 * 60;
    this._days = +l + 7 * h;
    this._months = +u + 3 * o + 12 * s;
    this._data = {};
    this._locale = Tt();

    this._bubble();
  }

  function un(t) {
    return t instanceof on;
  }

  function hn(t) {
    return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t);
  }

  function ln(t, n) {
    Q(t, 0, 0, function () {
      var t = this.utcOffset(),
        s = '+';

      if (t < 0) {
        t = -t;
        s = '-';
      }

      return s + z(~~(t / 60), 2) + n + z(~~t % 60, 2);
    });
  }

  ln('Z', ':');
  ln('ZZ', '');
  ve('Z', _e);
  ve('ZZ', _e);
  ke(['Z', 'ZZ'], function (t, n, s) {
    s._useUTC = true;
    s._tzm = cn(_e, t);
  });
  var dn = /([\+\-]|\d\d)/gi;

  function cn(t, n) {
    var s = (n || '').match(t);
    if (null === s) return null;
    var o = ((s[s.length - 1] || []) + '').match(dn) || ['-', 0, 0],
      u = 60 * o[1] + x(o[2]);
    return 0 === u ? 0 : '+' === o[0] ? u : -u;
  }

  function fn(t, n) {
    var o, u;

    if (n._isUTC) {
      o = n.clone();
      u = (T(t) || f(t) ? t.valueOf() : en(t).valueOf()) - o.valueOf();

      o._d.setTime(o._d.valueOf() + u);

      s.updateOffset(o, false);
      return o;
    } else return en(t).local();
  }

  function mn(t) {
    return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
  }

  function _n() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }

  s.updateOffset = function () {};

  var yn = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
    gn = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function vn(t, n) {
    var s,
      o,
      u,
      h = t,
      l = null;
    if (un(t))
      h = {
        ms: t._milliseconds,
        d: t._days,
        M: t._months,
      };
    else if (c(t)) {
      h = {};
      if (n) h[n] = t;
      else h.milliseconds = t;
    } else if ((l = yn.exec(t))) {
      s = '-' === l[1] ? -1 : 1;
      h = {
        y: 0,
        d: x(l[Te]) * s,
        h: x(l[be]) * s,
        m: x(l[xe]) * s,
        s: x(l[Pe]) * s,
        ms: x(hn(1e3 * l[We])) * s,
      };
    } else if ((l = gn.exec(t))) {
      s = '-' === l[1] ? -1 : 1;
      h = {
        y: pn(l[2], s),
        M: pn(l[3], s),
        w: pn(l[4], s),
        d: pn(l[5], s),
        h: pn(l[6], s),
        m: pn(l[7], s),
        s: pn(l[8], s),
      };
    } else if (null == h) h = {};
    else if ('object' == typeof h && ('from' in h || 'to' in h)) {
      u = Mn(en(h.from), en(h.to));
      (h = {}).ms = u.milliseconds;
      h.M = u.months;
    }
    o = new on(h);
    if (un(t) && y(t, '_locale')) o._locale = t._locale;
    return o;
  }

  function pn(t, n) {
    var s = t && parseFloat(t.replace(',', '.'));
    return (isNaN(s) ? 0 : s) * n;
  }

  function wn(t, n) {
    var s = {};
    s.months = n.month() - t.month() + 12 * (n.year() - t.year());
    if (t.clone().add(s.months, 'M').isAfter(n)) --s.months;
    s.milliseconds = +n - +t.clone().add(s.months, 'M');
    return s;
  }

  function Mn(t, n) {
    var s;

    if (t.isValid() && n.isValid()) {
      n = fn(n, t);
      if (t.isBefore(n)) s = wn(t, n);
      else {
        (s = wn(n, t)).milliseconds = -s.milliseconds;
        s.months = -s.months;
      }
      return s;
    } else
      return {
        milliseconds: 0,
        months: 0,
      };
  }

  function kn(t, n) {
    return function (s, o) {
      var u;

      if (!(null === o || isNaN(+o))) {
        U(
          n,
          'moment().' +
            n +
            '(period, number) is deprecated. Please use moment().' +
            n +
            '(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
        );
        u = s;
        s = o;
        o = u;
      }

      Sn(this, vn((s = 'string' == typeof s ? +s : s), o), t);
      return this;
    };
  }

  function Sn(t, n, o, u) {
    var h = n._milliseconds,
      l = hn(n._days),
      c = hn(n._months);

    if (t.isValid()) {
      u = null == u || u;
      if (c) ze(t, Ge(t, 'Month') + c * o);
      if (l) Ve(t, 'Date', Ge(t, 'Date') + l * o);
      if (h) t._d.setTime(t._d.valueOf() + h * o);
      if (u) s.updateOffset(t, l || c);
    }
  }

  vn.fn = on.prototype;

  vn.invalid = function () {
    return vn(NaN);
  };

  var Dn = kn(1, 'add'),
    Yn = kn(-1, 'subtract');

  function On(t, n) {
    var s = 12 * (n.year() - t.year()) + (n.month() - t.month()),
      o = t.clone().add(s, 'months');
    return -(s + (n - o < 0 ? (n - o) / (o - t.clone().add(s - 1, 'months')) : (n - o) / (t.clone().add(s + 1, 'months') - o))) || 0;
  }

  function Tn(t) {
    var n;
    if (undefined === t) return this._locale._abbr;
    else {
      if (null != (n = Tt(t))) this._locale = n;
      return this;
    }
  }

  s.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  s.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
  var bn = C('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (t) {
    return undefined === t ? this.localeData() : this.locale(t);
  });

  function xn() {
    return this._locale;
  }

  var Pn = 1e3,
    Wn = 6e4,
    Cn = 36e5,
    Hn = 126227808e5;

  function Rn(t, n) {
    return ((t % n) + n) % n;
  }

  function Un(t, n, s) {
    return t < 100 && t >= 0 ? new Date(t + 400, n, s) - Hn : new Date(t, n, s).valueOf();
  }

  function Fn(t, n, s) {
    return t < 100 && t >= 0 ? Date.UTC(t + 400, n, s) - Hn : Date.UTC(t, n, s);
  }

  function Ln(t, n) {
    Q(0, [t, t.length], 0, n);
  }

  function Nn(t, n, s, o, u) {
    var h;
    if (null == t) return tt(this, o, u).year;
    else {
      if (n > (h = nt(t, o, u))) n = h;
      return Gn.call(this, t, n, s, o, u);
    }
  }

  function Gn(t, n, s, o, u) {
    var h = et(t, n, s, o, u),
      l = Xe(h.year, 0, h.dayOfYear);
    this.year(l.getUTCFullYear());
    this.month(l.getUTCMonth());
    this.date(l.getUTCDate());
    return this;
  }

  Q(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  });
  Q(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
  });
  Ln('gggg', 'weekYear');
  Ln('ggggg', 'weekYear');
  Ln('GGGG', 'isoWeekYear');
  Ln('GGGGG', 'isoWeekYear');
  V('weekYear', 'gg');
  V('isoWeekYear', 'GG');
  j('weekYear', 1);
  j('isoWeekYear', 1);
  ve('G', fe);
  ve('g', fe);
  ve('GG', ae, ne);
  ve('gg', ae, ne);
  ve('GGGG', le, ie);
  ve('gggg', le, ie);
  ve('GGGGG', de, re);
  ve('ggggg', de, re);
  Se(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (t, n, s, o) {
    n[o.substr(0, 2)] = x(t);
  });
  Se(['gg', 'GG'], function (t, n, o, u) {
    n[u] = s.parseTwoDigitYear(t);
  });
  Q('Q', 0, 'Qo', 'quarter');
  V('quarter', 'Q');
  j('quarter', 7);
  ve('Q', te);
  ke('Q', function (t, n) {
    n[Oe] = 3 * (x(t) - 1);
  });
  Q('D', ['DD', 2], 'Do', 'date');
  V('date', 'D');
  j('date', 9);
  ve('D', ae);
  ve('DD', ae, ne);
  ve('Do', function (t, n) {
    return t ? n._dayOfMonthOrdinalParse || n._ordinalParse : n._dayOfMonthOrdinalParseLenient;
  });
  ke(['D', 'DD'], Te);
  ke('Do', function (t, n) {
    n[Te] = x(t.match(ae)[0]);
  });
  var Vn = Ne('Date', true);
  Q('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
  V('dayOfYear', 'DDD');
  j('dayOfYear', 4);
  ve('DDD', he);
  ve('DDDD', se);
  ke(['DDD', 'DDDD'], function (t, n, s) {
    s._dayOfYear = x(t);
  });
  Q('m', ['mm', 2], 0, 'minute');
  V('minute', 'm');
  j('minute', 14);
  ve('m', ae);
  ve('mm', ae, ne);
  ke(['m', 'mm'], xe);
  var En = Ne('Minutes', false);
  Q('s', ['ss', 2], 0, 'second');
  V('second', 's');
  j('second', 15);
  ve('s', ae);
  ve('ss', ae, ne);
  ke(['s', 'ss'], Pe);
  var In,
    An = Ne('Seconds', false);

  for (
    Q('S', 0, 0, function () {
      return ~~(this.millisecond() / 100);
    }),
      Q(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
      }),
      Q(0, ['SSS', 3], 0, 'millisecond'),
      Q(0, ['SSSS', 4], 0, function () {
        return 10 * this.millisecond();
      }),
      Q(0, ['SSSSS', 5], 0, function () {
        return 100 * this.millisecond();
      }),
      Q(0, ['SSSSSS', 6], 0, function () {
        return 1e3 * this.millisecond();
      }),
      Q(0, ['SSSSSSS', 7], 0, function () {
        return 1e4 * this.millisecond();
      }),
      Q(0, ['SSSSSSSS', 8], 0, function () {
        return 1e5 * this.millisecond();
      }),
      Q(0, ['SSSSSSSSS', 9], 0, function () {
        return 1e6 * this.millisecond();
      }),
      V('millisecond', 'ms'),
      j('millisecond', 16),
      ve('S', he, te),
      ve('SS', he, ne),
      ve('SSS', he, se),
      In = 'SSSS';
    In.length <= 9;
    In += 'S'
  )
    ve(In, ce);

  function jn(t, n) {
    n[We] = x(1e3 * ('0.' + t));
  }

  for (In = 'S'; In.length <= 9; In += 'S') ke(In, jn);

  var Zn = Ne('Milliseconds', false);
  Q('z', 0, 0, 'zoneAbbr');
  Q('zz', 0, 0, 'zoneName');
  var zn = O.prototype;

  function $n(t) {
    return t;
  }

  zn.add = Dn;

  zn.calendar = function (t, n) {
    var o = t || en(),
      u = fn(o, this).startOf('day'),
      h = s.calendarFormat(this, u) || 'sameElse',
      l = n && (F(n[h]) ? n[h].call(this, o) : n[h]);
    return this.format(l || this.localeData().calendar(h, this, en(o)));
  };

  zn.clone = function () {
    return new O(this);
  };

  zn.diff = function (t, n, s) {
    var o, u, h;
    if (!this.isValid()) return NaN;
    if (!(o = fn(t, this)).isValid()) return NaN;

    switch (((u = 6e4 * (o.utcOffset() - this.utcOffset())), (n = E(n)))) {
      case 'year':
        h = On(this, o) / 12;
        break;

      case 'month':
        h = On(this, o);
        break;

      case 'quarter':
        h = On(this, o) / 3;
        break;

      case 'second':
        h = (this - o) / 1e3;
        break;

      case 'minute':
        h = (this - o) / 6e4;
        break;

      case 'hour':
        h = (this - o) / 36e5;
        break;

      case 'day':
        h = (this - o - u) / 864e5;
        break;

      case 'week':
        h = (this - o - u) / 6048e5;
        break;

      default:
        h = this - o;
    }

    return s ? h : b(h);
  };

  zn.endOf = function (t) {
    var n;
    if (undefined === (t = E(t)) || 'millisecond' === t || !this.isValid()) return this;
    var o = this._isUTC ? Fn : Un;

    switch (t) {
      case 'year':
        n = o(this.year() + 1, 0, 1) - 1;
        break;

      case 'quarter':
        n = o(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
        break;

      case 'month':
        n = o(this.year(), this.month() + 1, 1) - 1;
        break;

      case 'week':
        n = o(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;

      case 'isoWeek':
        n = o(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;

      case 'day':
      case 'date':
        n = o(this.year(), this.month(), this.date() + 1) - 1;
        break;

      case 'hour':
        n = this._d.valueOf();
        n += Cn - Rn(n + (this._isUTC ? 0 : this.utcOffset() * Wn), Cn) - 1;
        break;

      case 'minute':
        n = this._d.valueOf();
        n += Wn - Rn(n, Wn) - 1;
        break;

      case 'second':
        n = this._d.valueOf();
        n += Pn - Rn(n, Pn) - 1;
    }

    this._d.setTime(n);

    s.updateOffset(this, true);
    return this;
  };

  zn.format = function (t) {
    if (!t) t = this.isUtc() ? s.defaultFormatUtc : s.defaultFormat;
    var n = K(this, t);
    return this.localeData().postformat(n);
  };

  zn.from = function (t, n) {
    return this.isValid() && ((T(t) && t.isValid()) || en(t).isValid())
      ? vn({
          to: this,
          from: t,
        })
          .locale(this.locale())
          .humanize(!n)
      : this.localeData().invalidDate();
  };

  zn.fromNow = function (t) {
    return this.from(en(), t);
  };

  zn.to = function (t, n) {
    return this.isValid() && ((T(t) && t.isValid()) || en(t).isValid())
      ? vn({
          from: this,
          to: t,
        })
          .locale(this.locale())
          .humanize(!n)
      : this.localeData().invalidDate();
  };

  zn.toNow = function (t) {
    return this.to(en(), t);
  };

  zn.get = function (t) {
    return F(this[(t = E(t))]) ? this[t]() : this;
  };

  zn.invalidAt = function () {
    return w(this).overflow;
  };

  zn.isAfter = function (t, n) {
    var s = T(t) ? t : en(t);
    return !(!this.isValid() || !s.isValid()) && ('millisecond' === (n = E(n) || 'millisecond') ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(n).valueOf());
  };

  zn.isBefore = function (t, n) {
    var s = T(t) ? t : en(t);
    return !(!this.isValid() || !s.isValid()) && ('millisecond' === (n = E(n) || 'millisecond') ? this.valueOf() < s.valueOf() : this.clone().endOf(n).valueOf() < s.valueOf());
  };

  zn.isBetween = function (t, n, s, o) {
    var u = T(t) ? t : en(t),
      h = T(n) ? n : en(n);
    return (
      !!(this.isValid() && u.isValid() && h.isValid()) &&
      ('(' === (o = o || '()')[0] ? this.isAfter(u, s) : !this.isBefore(u, s)) &&
      (')' === o[1] ? this.isBefore(h, s) : !this.isAfter(h, s))
    );
  };

  zn.isSame = function (t, n) {
    var s,
      o = T(t) ? t : en(t);
    return (
      !(!this.isValid() || !o.isValid()) &&
      ('millisecond' === (n = E(n) || 'millisecond')
        ? this.valueOf() === o.valueOf()
        : ((s = o.valueOf()), this.clone().startOf(n).valueOf() <= s && s <= this.clone().endOf(n).valueOf()))
    );
  };

  zn.isSameOrAfter = function (t, n) {
    return this.isSame(t, n) || this.isAfter(t, n);
  };

  zn.isSameOrBefore = function (t, n) {
    return this.isSame(t, n) || this.isBefore(t, n);
  };

  zn.isValid = function () {
    return M(this);
  };

  zn.lang = bn;
  zn.locale = Tn;
  zn.localeData = xn;
  zn.max = nn;
  zn.min = tn;

  zn.parsingFlags = function () {
    return v({}, w(this));
  };

  zn.set = function (t, n) {
    if ('object' == typeof t) for (var s = Z((t = I(t))), o = 0; o < s.length; o++) this[s[o].unit](t[s[o].unit]);
    else if (F(this[(t = E(t))])) return this[t](n);
    return this;
  };

  zn.startOf = function (t) {
    var n;
    if (undefined === (t = E(t)) || 'millisecond' === t || !this.isValid()) return this;
    var o = this._isUTC ? Fn : Un;

    switch (t) {
      case 'year':
        n = o(this.year(), 0, 1);
        break;

      case 'quarter':
        n = o(this.year(), this.month() - (this.month() % 3), 1);
        break;

      case 'month':
        n = o(this.year(), this.month(), 1);
        break;

      case 'week':
        n = o(this.year(), this.month(), this.date() - this.weekday());
        break;

      case 'isoWeek':
        n = o(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;

      case 'day':
      case 'date':
        n = o(this.year(), this.month(), this.date());
        break;

      case 'hour':
        n = this._d.valueOf();
        n -= Rn(n + (this._isUTC ? 0 : this.utcOffset() * Wn), Cn);
        break;

      case 'minute':
        n = this._d.valueOf();
        n -= Rn(n, Wn);
        break;

      case 'second':
        n = this._d.valueOf();
        n -= Rn(n, Pn);
    }

    this._d.setTime(n);

    s.updateOffset(this, true);
    return this;
  };

  zn.subtract = Yn;

  zn.toArray = function () {
    return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
  };

  zn.toObject = function () {
    return {
      years: this.year(),
      months: this.month(),
      date: this.date(),
      hours: this.hours(),
      minutes: this.minutes(),
      seconds: this.seconds(),
      milliseconds: this.milliseconds(),
    };
  };

  zn.toDate = function () {
    return new Date(this.valueOf());
  };

  zn.toISOString = function (t) {
    if (!this.isValid()) return null;
    var n = true !== t,
      s = n ? this.clone().utc() : this;
    return s.year() < 0 || s.year() > 9999
      ? K(s, n ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ')
      : F(Date.prototype.toISOString)
      ? n
        ? this.toDate().toISOString()
        : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace('Z', K(s, 'Z'))
      : K(s, n ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  };

  zn.inspect = function () {
    if (!this.isValid()) return 'moment.invalid(/* ' + this._i + ' */)';
    var t = 'moment',
      n = '';

    if (!this.isLocal()) {
      t = 0 === this.utcOffset() ? 'moment.utc' : 'moment.parseZone';
      n = 'Z';
    }

    var s = '[' + t + '("]',
      o = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY',
      u = n + '[")]';
    return this.format(s + o + '-MM-DD[T]HH:mm:ss.SSS' + u);
  };

  zn.toJSON = function () {
    return this.isValid() ? this.toISOString() : null;
  };

  zn.toString = function () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  };

  zn.unix = function () {
    return Math.floor(this.valueOf() / 1e3);
  };

  zn.valueOf = function () {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  };

  zn.creationData = function () {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict,
    };
  };

  zn.year = Le;

  zn.isLeapYear = function () {
    return Ue(this.year());
  };

  zn.weekYear = function (t) {
    return Nn.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  };

  zn.isoWeekYear = function (t) {
    return Nn.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
  };

  zn.quarter = zn.quarters = function (t) {
    return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + (this.month() % 3));
  };

  zn.month = $e;

  zn.daysInMonth = function () {
    return Ee(this.year(), this.month());
  };

  zn.week = zn.weeks = function (t) {
    var n = this.localeData().week(this);
    return null == t ? n : this.add(7 * (t - n), 'd');
  };

  zn.isoWeek = zn.isoWeeks = function (t) {
    var n = tt(this, 1, 4).week;
    return null == t ? n : this.add(7 * (t - n), 'd');
  };

  zn.weeksInYear = function () {
    var t = this.localeData()._week;

    return nt(this.year(), t.dow, t.doy);
  };

  zn.isoWeeksInYear = function () {
    return nt(this.year(), 1, 4);
  };

  zn.date = Vn;

  zn.day = zn.days = function (t) {
    if (!this.isValid()) return null != t ? this : NaN;
    var n = this._isUTC ? this._d.getUTCDay() : this._d.getDay();

    if (null != t) {
      t = st(t, this.localeData());
      return this.add(t - n, 'd');
    } else return n;
  };

  zn.weekday = function (t) {
    if (!this.isValid()) return null != t ? this : NaN;
    var n = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == t ? n : this.add(t - n, 'd');
  };

  zn.isoWeekday = function (t) {
    if (!this.isValid()) return null != t ? this : NaN;

    if (null != t) {
      var n = it(t, this.localeData());
      return this.day(this.day() % 7 ? n : n - 7);
    }

    return this.day() || 7;
  };

  zn.dayOfYear = function (t) {
    var n = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return null == t ? n : this.add(t - n, 'd');
  };

  zn.hour = zn.hours = vt;
  zn.minute = zn.minutes = En;
  zn.second = zn.seconds = An;
  zn.millisecond = zn.milliseconds = Zn;

  zn.utcOffset = function (t, n, o) {
    var u,
      h = this._offset || 0;
    if (!this.isValid()) return null != t ? this : NaN;

    if (null != t) {
      if ('string' == typeof t) {
        if (null === (t = cn(_e, t))) return this;
      } else Math.abs(t) < 16 && !o && (t *= 60);

      if (!this._isUTC && n) u = mn(this);
      this._offset = t;
      this._isUTC = true;
      if (null != u) this.add(u, 'm');
      if (h !== t)
        !n || this._changeInProgress
          ? Sn(this, vn(t - h, 'm'), 1, false)
          : this._changeInProgress || ((this._changeInProgress = true), s.updateOffset(this, true), (this._changeInProgress = null));
      return this;
    }

    return this._isUTC ? h : mn(this);
  };

  zn.utc = function (t) {
    return this.utcOffset(0, t);
  };

  zn.local = function (t) {
    if (this._isUTC) {
      this.utcOffset(0, t);
      this._isUTC = false;
      if (t) this.subtract(mn(this), 'm');
    }

    return this;
  };

  zn.parseZone = function () {
    if (null != this._tzm) this.utcOffset(this._tzm, false, true);
    else if ('string' == typeof this._i) {
      var t = cn(me, this._i);
      if (null != t) this.utcOffset(t);
      else this.utcOffset(0, true);
    }
    return this;
  };

  zn.hasAlignedHourOffset = function (t) {
    return !!this.isValid() && ((t = t ? en(t).utcOffset() : 0), (this.utcOffset() - t) % 60 == 0);
  };

  zn.isDST = function () {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  };

  zn.isLocal = function () {
    return !!this.isValid() && !this._isUTC;
  };

  zn.isUtcOffset = function () {
    return !!this.isValid() && this._isUTC;
  };

  zn.isUtc = _n;
  zn.isUTC = _n;

  zn.zoneAbbr = function () {
    return this._isUTC ? 'UTC' : '';
  };

  zn.zoneName = function () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  };

  zn.dates = C('dates accessor is deprecated. Use date instead.', Vn);
  zn.months = C('months accessor is deprecated. Use month instead', $e);
  zn.years = C('years accessor is deprecated. Use year instead', Le);
  zn.zone = C('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', function (t, n) {
    if (null != t) {
      if ('string' != typeof t) t = -t;
      this.utcOffset(t, n);
      return this;
    } else return -this.utcOffset();
  });
  zn.isDSTShifted = C('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', function () {
    if (!l(this._isDSTShifted)) return this._isDSTShifted;
    var t = {};

    if ((D(t, this), (t = Qt(t))._a)) {
      var n = t._isUTC ? p(t._a) : en(t._a);
      this._isDSTShifted = this.isValid() && P(t._a, n.toArray()) > 0;
    } else this._isDSTShifted = false;

    return this._isDSTShifted;
  });
  var qn = N.prototype;

  function Jn(t, n, s, o) {
    var u = Tt(),
      h = p().set(o, n);
    return u[s](h, t);
  }

  function Bn(t, n, s) {
    if ((c(t) && ((n = t), (t = undefined)), (t = t || ''), null != n)) return Jn(t, n, s, 'month');
    var o,
      u = [];

    for (o = 0; o < 12; o++) u[o] = Jn(t, o, s, 'month');

    return u;
  }

  function Qn(t, n, s, o) {
    if ('boolean' == typeof t) {
      if (c(n)) {
        s = n;
        n = undefined;
      }

      n = n || '';
    } else {
      s = n = t;
      t = false;

      if (c(n)) {
        s = n;
        n = undefined;
      }

      n = n || '';
    }

    var u,
      h = Tt(),
      l = t ? h._week.dow : 0;
    if (null != s) return Jn(n, (s + l) % 7, o, 'day');
    var f = [];

    for (u = 0; u < 7; u++) f[u] = Jn(n, (u + l) % 7, o, 'day');

    return f;
  }

  qn.calendar = function (t, n, s) {
    var o = this._calendar[t] || this._calendar.sameElse;
    return F(o) ? o.call(n, s) : o;
  };

  qn.longDateFormat = function (t) {
    var n = this._longDateFormat[t],
      s = this._longDateFormat[t.toUpperCase()];

    if (n || !s) return n;
    else {
      this._longDateFormat[t] = s.replace(/MMMM|MM|DD|dddd/g, function (t) {
        return t.slice(1);
      });
      return this._longDateFormat[t];
    }
  };

  qn.invalidDate = function () {
    return this._invalidDate;
  };

  qn.ordinal = function (t) {
    return this._ordinal.replace('%d', t);
  };

  qn.preparse = $n;
  qn.postformat = $n;

  qn.relativeTime = function (t, n, s, o) {
    var u = this._relativeTime[s];
    return F(u) ? u(t, n, s, o) : u.replace(/%d/i, t);
  };

  qn.pastFuture = function (t, n) {
    var s = this._relativeTime[t > 0 ? 'future' : 'past'];
    return F(s) ? s(n) : s.replace(/%s/i, n);
  };

  qn.set = function (t) {
    var n, s;

    for (s in t) F((n = t[s])) ? (this[s] = n) : (this['_' + s] = n);

    this._config = t;
    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  };

  qn.months = function (t, n) {
    if (t) return o(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || Ie).test(n) ? 'format' : 'standalone'][t.month()];
    else return o(this._months) ? this._months : this._months.standalone;
  };

  qn.monthsShort = function (t, n) {
    if (t) return o(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Ie.test(n) ? 'format' : 'standalone'][t.month()];
    else return o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
  };

  qn.monthsParse = function (t, n, s) {
    var o, u, h;
    if (this._monthsParseExact) return Ze.call(this, t, n, s);

    for (this._monthsParse || ((this._monthsParse = []), (this._longMonthsParse = []), (this._shortMonthsParse = [])), o = 0; o < 12; o++) {
      if (
        ((u = p([2e3, o])),
        s &&
          !this._longMonthsParse[o] &&
          ((this._longMonthsParse[o] = new RegExp('^' + this.months(u, '').replace('.', '') + '$', 'i')),
          (this._shortMonthsParse[o] = new RegExp('^' + this.monthsShort(u, '').replace('.', '') + '$', 'i'))),
        s || this._monthsParse[o] || ((h = '^' + this.months(u, '') + '|^' + this.monthsShort(u, '')), (this._monthsParse[o] = new RegExp(h.replace('.', ''), 'i'))),
        s && 'MMMM' === n && this._longMonthsParse[o].test(t))
      )
        return o;
      if (s && 'MMM' === n && this._shortMonthsParse[o].test(t)) return o;
      if (!s && this._monthsParse[o].test(t)) return o;
    }
  };

  qn.monthsRegex = function (t) {
    if (this._monthsParseExact) {
      if (!y(this, '_monthsRegex')) Be.call(this);
      return t ? this._monthsStrictRegex : this._monthsRegex;
    } else {
      if (!y(this, '_monthsRegex')) this._monthsRegex = Je;
      return this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex;
    }
  };

  qn.monthsShortRegex = function (t) {
    if (this._monthsParseExact) {
      if (!y(this, '_monthsRegex')) Be.call(this);
      return t ? this._monthsShortStrictRegex : this._monthsShortRegex;
    } else {
      if (!y(this, '_monthsShortRegex')) this._monthsShortRegex = qe;
      return this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  };

  qn.week = function (t) {
    return tt(t, this._week.dow, this._week.doy).week;
  };

  qn.firstDayOfYear = function () {
    return this._week.doy;
  };

  qn.firstDayOfWeek = function () {
    return this._week.dow;
  };

  qn.weekdays = function (t, n) {
    var s = o(this._weekdays) ? this._weekdays : this._weekdays[t && true !== t && this._weekdays.isFormat.test(n) ? 'format' : 'standalone'];
    return true === t ? rt(s, this._week.dow) : t ? s[t.day()] : s;
  };

  qn.weekdaysMin = function (t) {
    return true === t ? rt(this._weekdaysMin, this._week.dow) : t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
  };

  qn.weekdaysShort = function (t) {
    return true === t ? rt(this._weekdaysShort, this._week.dow) : t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
  };

  qn.weekdaysParse = function (t, n, s) {
    var o, u, h;
    if (this._weekdaysParseExact) return ht.call(this, t, n, s);

    for (this._weekdaysParse || ((this._weekdaysParse = []), (this._minWeekdaysParse = []), (this._shortWeekdaysParse = []), (this._fullWeekdaysParse = [])), o = 0; o < 7; o++) {
      if (
        ((u = p([2e3, 1]).day(o)),
        s &&
          !this._fullWeekdaysParse[o] &&
          ((this._fullWeekdaysParse[o] = new RegExp('^' + this.weekdays(u, '').replace('.', '\\.?') + '$', 'i')),
          (this._shortWeekdaysParse[o] = new RegExp('^' + this.weekdaysShort(u, '').replace('.', '\\.?') + '$', 'i')),
          (this._minWeekdaysParse[o] = new RegExp('^' + this.weekdaysMin(u, '').replace('.', '\\.?') + '$', 'i'))),
        this._weekdaysParse[o] ||
          ((h = '^' + this.weekdays(u, '') + '|^' + this.weekdaysShort(u, '') + '|^' + this.weekdaysMin(u, '')), (this._weekdaysParse[o] = new RegExp(h.replace('.', ''), 'i'))),
        s && 'dddd' === n && this._fullWeekdaysParse[o].test(t))
      )
        return o;
      if (s && 'ddd' === n && this._shortWeekdaysParse[o].test(t)) return o;
      if (s && 'dd' === n && this._minWeekdaysParse[o].test(t)) return o;
      if (!s && this._weekdaysParse[o].test(t)) return o;
    }
  };

  qn.weekdaysRegex = function (t) {
    if (this._weekdaysParseExact) {
      if (!y(this, '_weekdaysRegex')) ft.call(this);
      return t ? this._weekdaysStrictRegex : this._weekdaysRegex;
    } else {
      if (!y(this, '_weekdaysRegex')) this._weekdaysRegex = lt;
      return this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  };

  qn.weekdaysShortRegex = function (t) {
    if (this._weekdaysParseExact) {
      if (!y(this, '_weekdaysRegex')) ft.call(this);
      return t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    } else {
      if (!y(this, '_weekdaysShortRegex')) this._weekdaysShortRegex = dt;
      return this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  };

  qn.weekdaysMinRegex = function (t) {
    if (this._weekdaysParseExact) {
      if (!y(this, '_weekdaysRegex')) ft.call(this);
      return t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    } else {
      if (!y(this, '_weekdaysMinRegex')) this._weekdaysMinRegex = ct;
      return this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  };

  qn.isPM = function (t) {
    return 'p' === (t + '').toLowerCase().charAt(0);
  };

  qn.meridiem = function (t, n, s) {
    if (t > 11) return s ? 'pm' : 'PM';
    else return s ? 'am' : 'AM';
  };

  Yt('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (t) {
      var n = t % 10;
      return t + (1 === x((t % 100) / 10) ? 'th' : 1 === n ? 'st' : 2 === n ? 'nd' : 3 === n ? 'rd' : 'th');
    },
  });
  s.lang = C('moment.lang is deprecated. Use moment.locale instead.', Yt);
  s.langData = C('moment.langData is deprecated. Use moment.localeData instead.', Tt);
  var Xn = Math.abs;

  function Kn(t, n, s, o) {
    var u = vn(n, s);
    t._milliseconds += o * u._milliseconds;
    t._days += o * u._days;
    t._months += o * u._months;
    return t._bubble();
  }

  function es(t) {
    return t < 0 ? Math.floor(t) : Math.ceil(t);
  }

  function ts(t) {
    return (4800 * t) / 146097;
  }

  function ns(t) {
    return (146097 * t) / 4800;
  }

  function ss(t) {
    return function () {
      return this.as(t);
    };
  }

  var is = ss('ms'),
    rs = ss('s'),
    as = ss('m'),
    os = ss('h'),
    us = ss('d'),
    hs = ss('w'),
    ls = ss('M'),
    ds = ss('Q'),
    cs = ss('y');

  function fs(t) {
    return function () {
      return this.isValid() ? this._data[t] : NaN;
    };
  }

  var ms = fs('milliseconds'),
    _s = fs('seconds'),
    ys = fs('minutes'),
    gs = fs('hours'),
    vs = fs('days'),
    ps = fs('months'),
    ws = fs('years');

  var Ms = Math.round,
    ks = {
      ss: 44,
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      M: 11,
    };

  function Ss(t, n, s, o, u) {
    return u.relativeTime(n || 1, !!s, t, o);
  }

  function Ds(t, n, s) {
    var o = vn(t).abs(),
      u = Ms(o.as('s')),
      h = Ms(o.as('m')),
      l = Ms(o.as('h')),
      c = Ms(o.as('d')),
      f = Ms(o.as('M')),
      _ = Ms(o.as('y')),
      y = (u <= ks.ss && ['s', u]) ||
        (u < ks.s && ['ss', u]) ||
        (h <= 1 && ['m']) ||
        (h < ks.m && ['mm', h]) ||
        (l <= 1 && ['h']) ||
        (l < ks.h && ['hh', l]) ||
        (c <= 1 && ['d']) ||
        (c < ks.d && ['dd', c]) ||
        (f <= 1 && ['M']) ||
        (f < ks.M && ['MM', f]) ||
        (_ <= 1 && ['y']) || ['yy', _];

    y[2] = n;
    y[3] = +t > 0;
    y[4] = s;
    return Ss.apply(null, y);
  }

  var Ys = Math.abs;

  function Os(t) {
    return (t > 0) - (t < 0) || +t;
  }

  function Ts() {
    if (!this.isValid()) return this.localeData().invalidDate();
    var t,
      n,
      s = Ys(this._milliseconds) / 1e3,
      o = Ys(this._days),
      u = Ys(this._months);
    n = b((t = b(s / 60)) / 60);
    s %= 60;
    t %= 60;
    var h = b(u / 12),
      l = (u %= 12),
      c = o,
      f = n,
      _ = t,
      y = s ? s.toFixed(3).replace(/\.?0+$/, '') : '',
      v = this.asSeconds();
    if (!v) return 'P0D';
    var p = v < 0 ? '-' : '',
      w = Os(this._months) !== Os(v) ? '-' : '',
      M = Os(this._days) !== Os(v) ? '-' : '',
      k = Os(this._milliseconds) !== Os(v) ? '-' : '';
    return (
      p +
      'P' +
      (h ? w + h + 'Y' : '') +
      (l ? w + l + 'M' : '') +
      (c ? M + c + 'D' : '') +
      (f || _ || y ? 'T' : '') +
      (f ? k + f + 'H' : '') +
      (_ ? k + _ + 'M' : '') +
      (y ? k + y + 'S' : '')
    );
  }

  var bs = on.prototype;

  bs.isValid = function () {
    return this._isValid;
  };

  bs.abs = function () {
    var t = this._data;
    this._milliseconds = Xn(this._milliseconds);
    this._days = Xn(this._days);
    this._months = Xn(this._months);
    t.milliseconds = Xn(t.milliseconds);
    t.seconds = Xn(t.seconds);
    t.minutes = Xn(t.minutes);
    t.hours = Xn(t.hours);
    t.months = Xn(t.months);
    t.years = Xn(t.years);
    return this;
  };

  bs.add = function (t, n) {
    return Kn(this, t, n, 1);
  };

  bs.subtract = function (t, n) {
    return Kn(this, t, n, -1);
  };

  bs.as = function (t) {
    if (!this.isValid()) return NaN;
    var n,
      s,
      o = this._milliseconds;
    if ('month' === (t = E(t)) || 'quarter' === t || 'year' === t)
      switch (((n = this._days + o / 864e5), (s = this._months + ts(n)), t)) {
        case 'month':
          return s;

        case 'quarter':
          return s / 3;

        case 'year':
          return s / 12;
      }
    else
      switch (((n = this._days + Math.round(ns(this._months))), t)) {
        case 'week':
          return n / 7 + o / 6048e5;

        case 'day':
          return n + o / 864e5;

        case 'hour':
          return 24 * n + o / 36e5;

        case 'minute':
          return 1440 * n + o / 6e4;

        case 'second':
          return 86400 * n + o / 1e3;

        case 'millisecond':
          return Math.floor(864e5 * n) + o;

        default:
          throw new Error('Unknown unit ' + t);
      }
  };

  bs.asMilliseconds = is;
  bs.asSeconds = rs;
  bs.asMinutes = as;
  bs.asHours = os;
  bs.asDays = us;
  bs.asWeeks = hs;
  bs.asMonths = ls;
  bs.asQuarters = ds;
  bs.asYears = cs;

  bs.valueOf = function () {
    return this.isValid() ? this._milliseconds + 864e5 * this._days + (this._months % 12) * 2592e6 + 31536e6 * x(this._months / 12) : NaN;
  };

  bs._bubble = function () {
    var t,
      n,
      s,
      o,
      u,
      h = this._milliseconds,
      l = this._days,
      c = this._months,
      f = this._data;

    if (!((h >= 0 && l >= 0 && c >= 0) || (h <= 0 && l <= 0 && c <= 0))) {
      h += 864e5 * es(ns(c) + l);
      l = 0;
      c = 0;
    }

    f.milliseconds = h % 1e3;
    t = b(h / 1e3);
    f.seconds = t % 60;
    n = b(t / 60);
    f.minutes = n % 60;
    s = b(n / 60);
    f.hours = s % 24;
    c += u = b(ts((l += b(s / 24))));
    l -= es(ns(u));
    o = b(c / 12);
    c %= 12;
    f.days = l;
    f.months = c;
    f.years = o;
    return this;
  };

  bs.clone = function () {
    return vn(this);
  };

  bs.get = function (t) {
    t = E(t);
    return this.isValid() ? this[t + 's']() : NaN;
  };

  bs.milliseconds = ms;
  bs.seconds = _s;
  bs.minutes = ys;
  bs.hours = gs;
  bs.days = vs;

  bs.weeks = function () {
    return b(this.days() / 7);
  };

  bs.months = ps;
  bs.years = ws;

  bs.humanize = function (t) {
    if (!this.isValid()) return this.localeData().invalidDate();
    var n = this.localeData(),
      s = Ds(this, !t, n);
    if (t) s = n.pastFuture(+this, s);
    return n.postformat(s);
  };

  bs.toISOString = Ts;
  bs.toString = Ts;
  bs.toJSON = Ts;
  bs.locale = Tn;
  bs.localeData = xn;
  bs.toIsoString = C('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', Ts);
  bs.lang = bn;
  Q('X', 0, 0, 'unix');
  Q('x', 0, 0, 'valueOf');
  ve('x', fe);
  ve('X', /[+-]?\d+(\.\d{1,3})?/);
  ke('X', function (t, n, s) {
    s._d = new Date(1e3 * parseFloat(t, 10));
  });
  ke('x', function (t, n, s) {
    s._d = new Date(x(t));
  });
  s.version = '2.24.0';
  t = en;
  s.fn = zn;

  s.min = function () {
    return sn('isBefore', [].slice.call(arguments, 0));
  };

  s.max = function () {
    return sn('isAfter', [].slice.call(arguments, 0));
  };

  s.now = function () {
    return Date.now ? Date.now() : +new Date();
  };

  s.utc = p;

  s.unix = function (t) {
    return en(1e3 * t);
  };

  s.months = function (t, n) {
    return Bn(t, n, 'months');
  };

  s.isDate = f;
  s.locale = Yt;
  s.invalid = k;
  s.duration = vn;
  s.isMoment = T;

  s.weekdays = function (t, n, s) {
    return Qn(t, n, s, 'weekdays');
  };

  s.parseZone = function () {
    return en.apply(null, arguments).parseZone();
  };

  s.localeData = Tt;
  s.isDuration = un;

  s.monthsShort = function (t, n) {
    return Bn(t, n, 'monthsShort');
  };

  s.weekdaysMin = function (t, n, s) {
    return Qn(t, n, s, 'weekdaysMin');
  };

  s.defineLocale = Ot;

  s.updateLocale = function (t, n) {
    if (null != n) {
      var s,
        o,
        u = pt;
      if (null != (o = Dt(t))) u = o._config;
      (s = new N((n = L(u, n)))).parentLocale = wt[t];
      wt[t] = s;
      Yt(t);
    } else null != wt[t] && (null != wt[t].parentLocale ? (wt[t] = wt[t].parentLocale) : null != wt[t] && delete wt[t]);

    return wt[t];
  };

  s.locales = function () {
    return H(wt);
  };

  s.weekdaysShort = function (t, n, s) {
    return Qn(t, n, s, 'weekdaysShort');
  };

  s.normalizeUnits = E;

  s.relativeTimeRounding = function (t) {
    return undefined === t ? Ms : 'function' == typeof t && ((Ms = t), true);
  };

  s.relativeTimeThreshold = function (t, n) {
    return undefined !== ks[t] && (undefined === n ? ks[t] : ((ks[t] = n), 's' === t && (ks.ss = n - 1), true));
  };

  s.calendarFormat = function (t, n) {
    var s = t.diff(n, 'days', true);
    return s < -6 ? 'sameElse' : s < -1 ? 'lastWeek' : s < 0 ? 'lastDay' : s < 1 ? 'sameDay' : s < 2 ? 'nextDay' : s < 7 ? 'nextWeek' : 'sameElse';
  };

  s.prototype = zn;
  s.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    DATE: 'YYYY-MM-DD',
    TIME: 'HH:mm',
    TIME_SECONDS: 'HH:mm:ss',
    TIME_MS: 'HH:mm:ss.SSS',
    WEEK: 'GGGG-[W]WW',
    MONTH: 'YYYY-MM',
  };
  return s;
};

if ('object' == typeof exports && undefined !== module) module.exports = n();
else if ('function' == typeof define && define.amd) define(n);
else t.moment = n();
