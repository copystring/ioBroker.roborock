require('./152');

var module35 = require('./35'),
  module111 = globals.nativeQPLTimestamp || globals.nativePerformanceNow || require('./111'),
  n = {};

module.exports = function () {
  return {
    _timespans: {},
    _extras: {},
    _points: {},
    addTimespan: function (t, s, n) {
      if (!this._timespans[t])
        this._timespans[t] = {
          description: n,
          totalTime: s,
        };
    },
    startTimespan: function (o, p) {
      if (!this._timespans[o]) {
        this._timespans[o] = {
          description: p,
          startTime: module111(),
        };
        n[o] = module35.beginAsyncEvent(o);
      }
    },
    stopTimespan: function (o) {
      var p = this._timespans[o];
      if (p && p.startTime) p.endTime || ((p.endTime = module111()), (p.totalTime = p.endTime - (p.startTime || 0)), module35.endAsyncEvent(o, n[o]), delete n[o]);
    },
    clear: function () {
      this._timespans = {};
      this._extras = {};
      this._points = {};
    },
    clearCompleted: function () {
      for (var t in this._timespans) this._timespans[t].totalTime && delete this._timespans[t];

      this._extras = {};
      this._points = {};
    },
    clearExceptTimespans: function (t) {
      this._timespans = Object.keys(this._timespans).reduce(function (s, n) {
        if (-1 !== t.indexOf(n)) s[n] = this._timespans[n];
        return s;
      }, {});
      this._extras = {};
      this._points = {};
    },
    currentTimestamp: function () {
      return module111();
    },
    getTimespans: function () {
      return this._timespans;
    },
    hasTimespan: function (t) {
      return !!this._timespans[t];
    },
    logTimespans: function () {},
    addTimespans: function (t, s) {
      for (var n = 0, o = t.length; n < o; n += 2) {
        var p = s[n / 2];
        this.addTimespan(p, t[n + 1] - t[n], p);
      }
    },
    setExtra: function (t, s) {
      if (!this._extras[t]) this._extras[t] = s;
    },
    getExtras: function () {
      return this._extras;
    },
    removeExtra: function (t) {
      var s = this._extras[t];
      delete this._extras[t];
      return s;
    },
    logExtras: function () {},
    markPoint: function (t, n) {
      if (!this._points[t]) this._points[t] = null != n ? n : module111();
    },
    getPoints: function () {
      return this._points;
    },
    logPoints: function () {},
    logEverything: function () {
      this.logTimespans();
      this.logExtras();
      this.logPoints();
    },
  };
};
