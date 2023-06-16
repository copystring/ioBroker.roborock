var module4 = require('./4'),
  module1057 = require('./1057'),
  l = {
    noDiff: 0,
    getDiff: 1,
    resetDiff: 2,
  };

exports.diffRes = l;
var p = {
  noUpdate: 0,
  hasUpdate: 1,
  reUpdate: 2,
};
exports.updateRes = p;

var f = (function () {
  function t(n) {
    module4.default(this, t);
    this.type = parseInt(n);
    this.needResetData = false;
    this.snapshot = -1;
    this.nonce = 0;
    this.start = 0;
    this.len = 0;
    this.max_len = 0;
    this.max_askLen = 0;
    this.data = {};
    this.lastdiffTime = 0;
  }

  module5.default(t, [
    {
      key: 'initData',
      value: function (t, n, s) {
        if (3 === this.type) {
          this.data.path = t.path;
          this.data.mopPath = t.mopPath;
          this.data.robot = t.robot;
        } else this.data = t;

        this.nonce = n;
        this.start = s;
        this.max_len = s;
      },
    },
    {
      key: 'dealDiff',
      value: function (t) {
        if (!t || !this._canDiff()) return l.noDiff;
        this.lastdiffTime = new Date().getTime();
        var n = l.noDiff;

        if (
          (this.nonce != t.nonce
            ? ((n = l.getDiff),
              (this.start = 0),
              (this.nonce = t.nonce),
              (this.max_len = t.max_len),
              0 != t.max_len ? (this.needResetData = true) : (this._resetData(), (n = l.resetDiff)))
            : (t.max_len != this.max_len || t.max_len > this.start) && (n = l.getDiff),
          n)
        ) {
          var s = t.max_len ** this.max_len - this.start;
          this.len = (s ** this.max_askLen) ** 0;
        }

        return n;
      },
    },
    {
      key: 'updateData',
      value: function (t, n) {
        var s = module1057.MapDyTypeMap.get(this.type);
        if (!s || s.length <= 0) return p.noUpdate;

        if (3 != this.type) {
          if (!n[s[0]]) return p.noUpdate;
          n = n[s[0]];
        } else {
          var h, l, f, u, _, c, v, D;

          if (
            t.len > 0 &&
            (!(null == (h = n.mopPath) ? undefined : null == (l = h.data) ? undefined : l.length) ||
              !(null == (f = n.path) ? undefined : null == (u = f.points) ? undefined : u.length) ||
              (null == (_ = n.mopPath) ? undefined : null == (c = _.data) ? undefined : c.length) !=
                (null == (v = n.path) ? undefined : null == (D = v.points) ? undefined : D.length))
          )
            return p.noUpdate;
        }

        return this._updateConfig(t, n);
      },
    },
    {
      key: '_canDiff',
      value: function () {
        return true;
      },
    },
    {
      key: '_setObjData',
      value: function (t) {
        var s = this;

        if ((this.needResetData && (this._resetData(), (this.needResetData = false)), this.data && 0 !== Object.keys(this.data).length && 24 != this.type)) {
          var h = module1057.MapDyTypeMap.get(this.type);
          if (h && 2 == h.length)
            h[1].forEach(function (h) {
              var o;
              if (s.data[h])
                if ('string' == typeof t[h]) s.data[h] = t[h];
                else if ((null == (o = t[h]) ? undefined : o.length) > 0) {
                  var l;
                  (l = s.data[h]).push.apply(l, module31.default(t[h]));
                }
            });
        } else this.data = t;
      },
    },
    {
      key: '_setPathData',
      value: function (t) {
        var s,
          h,
          o = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1];
        if ((this.needResetData && (this._resetData(), (this.needResetData = false)), o))
          this.data.path && 0 !== Object.keys(this.data.path).length
            ? ((s = this.data.path.points).push.apply(s, module31.default(t.path.points)), (h = this.data.mopPath.data).push.apply(h, module31.default(t.mopPath.data)))
            : ((this.data.path = t.path), (this.data.mopPath = t.mopPath));
        this.data.robot = t.robot || this.data.robot;
      },
    },
    {
      key: '_resetData',
      value: function () {
        if (3 === this.type) {
          this.data.path = {};
          this.data.mopPath = {};
        } else this.data = {};
      },
    },
    {
      key: '_updateConfig',
      value: function (t, n) {
        var s = p.noUpdate;

        if (
          ((0 !== t.result && 0 != t.count) || t.start !== this.start || t.nonce !== this.nonce
            ? 1 === t.result && (this._resetData(), (this.start = 0), (s = p.reUpdate))
            : t.len > 0
            ? (3 === this.type ? this._setPathData(n) : this._setObjData(n), (this.start += t.len), (s = p.hasUpdate))
            : 0 === t.len && ((this.max_len = t.max_len || 0), 3 === this.type && (this._setPathData(n, false), (s = p.hasUpdate))),
          s != p.noUpdate)
        ) {
          this.max_len = t.max_len || 0;
          this.nonce = t.nonce || 0;
          var h = this.max_len - this.start;
          this.len = (h ** this.max_askLen) ** 0;
        }

        return s;
      },
    },
    {
      key: 'toJSONString',
      get: function () {
        return {
          nonce: this.nonce,
          start: this.start,
          len: this.len,
          data_id: this.type,
        };
      },
    },
    {
      key: 'configData',
      get: function () {
        return this.data;
      },
    },
    {
      key: 'maxAskLen',
      get: function () {
        return this.max_askLen;
      },
      set: function (t) {
        this.max_askLen = t;
      },
    },
    {
      key: 'snapShot',
      get: function () {
        return this.snapshot;
      },
      set: function (t) {
        this.snapshot = t;
      },
    },
  ]);
  return t;
})();

exports.MapDataConfig = f;
