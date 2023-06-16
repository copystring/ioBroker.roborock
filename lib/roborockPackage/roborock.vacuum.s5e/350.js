var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module351 = require('./351'),
  module13 = require('./13'),
  o = module351.default,
  s = {
    _getRequests: [],
    _getKeys: [],
    _immediate: null,
    getItem: function (t, n) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (u, l) {
        o.multiGet([t], function (t, o) {
          var s = o && o[0] && o[0][1] ? o[0][1] : null,
            f = c(t);
          if (n) n(f && f[0], s);
          if (f) l(f[0]);
          else u(s);
        });
      });
    },
    setItem: function (t, n, u) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (l, s) {
        o.multiSet([[t, n]], function (t) {
          var n = c(t);
          if (u) u(n && n[0]);
          if (n) s(n[0]);
          else l(null);
        });
      });
    },
    removeItem: function (t, n) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (u, l) {
        o.multiRemove([t], function (t) {
          var o = c(t);
          if (n) n(o && o[0]);
          if (o) l(o[0]);
          else u(null);
        });
      });
    },
    mergeItem: function (t, n, u) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (l, s) {
        o.multiMerge([[t, n]], function (t) {
          var n = c(t);
          if (u) u(n && n[0]);
          if (n) s(n[0]);
          else l(null);
        });
      });
    },
    clear: function (t) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (n, u) {
        o.clear(function (l) {
          if (t) t(f(l));
          if (l && f(l)) u(f(l));
          else n(null);
        });
      });
    },
    getAllKeys: function (t) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (n, u) {
        o.getAllKeys(function (l, o) {
          if (t) t(f(l), o);
          if (l) u(f(l));
          else n(o);
        });
      });
    },
    flushGetRequests: function () {
      var t = this._getRequests,
        u = this._getKeys;
      this._getRequests = [];
      this._getKeys = [];
      module13.default(o, 'RCTAsyncStorage not available');
      o.multiGet(u, function (u, l) {
        var o = {};
        if (l)
          l.forEach(function (t) {
            var u = module23.default(t, 2),
              l = u[0],
              s = u[1];
            o[l] = s;
            return s;
          });

        for (var s = t.length, c = 0; c < s; c++) {
          var f = t[c],
            v = f.keys.map(function (t) {
              return [t, o[t]];
            });
          if (f.callback) f.callback(null, v);
          if (f.resolve) f.resolve(v);
        }
      });
    },
    multiGet: function (t, n) {
      var u = this;
      if (!this._immediate)
        this._immediate = setImmediate(function () {
          u._immediate = null;
          u.flushGetRequests();
        });
      var l = {
          keys: t,
          callback: n,
          keyIndex: this._getKeys.length,
          resolve: null,
          reject: null,
        },
        o = new Promise(function (t, n) {
          l.resolve = t;
          l.reject = n;
        });

      this._getRequests.push(l);

      t.forEach(function (t) {
        if (-1 === u._getKeys.indexOf(t)) u._getKeys.push(t);
      });
      return o;
    },
    multiSet: function (t, n) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (u, l) {
        o.multiSet(t, function (t) {
          var o = c(t);
          if (n) n(o);
          if (o) l(o);
          else u(null);
        });
      });
    },
    multiRemove: function (t, n) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (u, l) {
        o.multiRemove(t, function (t) {
          var o = c(t);
          if (n) n(o);
          if (o) l(o);
          else u(null);
        });
      });
    },
    multiMerge: function (t, n) {
      module13.default(o, 'RCTAsyncStorage not available');
      return new Promise(function (u, l) {
        o.multiMerge(t, function (t) {
          var o = c(t);
          if (n) n(o);
          if (o) l(o);
          else u(null);
        });
      });
    },
  };

function c(t) {
  return t
    ? (Array.isArray(t) ? t : [t]).map(function (t) {
        return f(t);
      })
    : null;
}

function f(t) {
  if (!t) return null;
  var n = new Error(t.message);
  n.key = t.key;
  return n;
}

if (!o.multiMerge) {
  delete s.mergeItem;
  delete s.multiMerge;
}

module.exports = s;
