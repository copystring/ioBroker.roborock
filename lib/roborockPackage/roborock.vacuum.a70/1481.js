var module6 = require('./6'),
  module1120 = require('./1120'),
  module393 = require('./393'),
  p = {
    noDiff: 0,
    getDiff: 1,
    resetDiff: 2,
    getMap: 3,
  };

exports.diffRes = p;
var f = {
  noUpdate: 0,
  hasUpdate: 1,
  reUpdate: 2,
};
exports.updateRes = f;

var u = (function () {
  function t(s) {
    var h = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 0;
    module6.default(this, t);
    this.type = parseInt(s);
    this.needResetData = false;
    this.snapshot = -1;
    this.nonce = 0;
    this.start = 0;
    this.len = 0;
    this.max_len = 0;
    this.max_askLen = h;
    this.data = {};
    this.lastdiffTime = 0;
  }

  module7.default(t, [
    {
      key: 'initData',
      value: function (t, s, n) {
        if (3 === this.type) {
          this.data.path = t.path;
          this.data.mopPath = t.mopPath;
          this.data.robot = t.robot;
        } else this.data = t;

        this.nonce = s;
        this.start = n;
        this.max_len = n;
        this.needResetData = false;
      },
    },
    {
      key: 'dealDiff',
      value: function (t) {
        if (!t || !this._canDiff()) return p.noDiff;
        this.lastdiffTime = new Date().getTime();
        var s = p.noDiff;

        if (
          (this.nonce != t.nonce
            ? ((s = p.getDiff),
              (this.start = 0),
              (this.nonce = t.nonce),
              (this.max_len = t.max_len),
              3 === this.type && t.max_len > this.max_askLen ? (s = p.getMap) : 0 != t.max_len ? (this.needResetData = true) : (this._resetData(), (s = p.resetDiff)))
            : (t.max_len != this.max_len || t.max_len > this.start) && (s = p.getDiff),
          s)
        ) {
          var n = t.max_len ** this.max_len - this.start;
          this.len = (n ** this.max_askLen) ** 0;
        }

        return s;
      },
    },
    {
      key: 'updateData',
      value: function (t, s) {
        var n = module1120.MapDyTypeMap.get(this.type);
        if (!n || n.length <= 0) return f.noUpdate;

        if (3 != this.type) {
          if (!s[n[0]]) return f.noUpdate;
          s = s[n[0]];
        } else {
          var h, o, p, u, v, _, c, D;

          if (
            t.len > 0 &&
            (!(null == (h = s.mopPath) ? undefined : null == (o = h.data) ? undefined : o.length) ||
              !(null == (p = s.path) ? undefined : null == (u = p.points) ? undefined : u.length) ||
              (null == (v = s.mopPath) ? undefined : null == (_ = v.data) ? undefined : _.length) !=
                (null == (c = s.path) ? undefined : null == (D = c.points) ? undefined : D.length))
          )
            return f.noUpdate;
        }

        return this._updateConfig(t, s);
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
        var n = this;

        if ((this.needResetData && (this._resetData(), (this.needResetData = false)), this.data && 0 !== Object.keys(this.data).length && 24 != this.type)) {
          var h = module1120.MapDyTypeMap.get(this.type);
          if (h && h.length > 2)
            h[1].forEach(function (h) {
              var l;
              if (n.data[h])
                if ('string' == typeof t[h]) n.data[h] = t[h];
                else if ((null == (l = t[h]) ? undefined : l.length) > 0) {
                  var o;
                  (o = n.data[h]).push.apply(o, module31.default(t[h]));
                }
            });
        } else this.data = t;
      },
    },
    {
      key: '_setPathData',
      value: function (t) {
        var n = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1],
          h = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : -1;
        if ((this.needResetData && (this._resetData(), (this.needResetData = false)), n))
          if (this.data.path && 0 !== Object.keys(this.data.path).length) {
            var l, o, p, f, u, v, _, c;

            if (h > 0 && h < (null == (l = t.path) ? undefined : null == (o = l.points) ? undefined : o.length)) {
              if (!(null == (u = t.path) || null == (v = u.points))) v.splice(0, h);
              if (!(null == (_ = t.mopPath) || null == (c = _.data))) c.splice(0, h);
            }

            (p = this.data.path.points).push.apply(p, module31.default(t.path.points));
            (f = this.data.mopPath.data).push.apply(f, module31.default(t.mopPath.data));
          } else {
            this.data.path = t.path;
            this.data.mopPath = t.mopPath;
          }
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
      value: function (t, s) {
        var n = f.noUpdate;
        if ((0 !== t.result && 0 != t.count) || t.nonce !== this.nonce) 1 === t.result && (this._resetData(), (this.start = 0), (n = f.reUpdate));
        else if (t.start === this.start)
          t.len > 0
            ? (3 === this.type ? this._setPathData(s) : this._setObjData(s), (this.start += t.len), (n = f.hasUpdate))
            : 0 === t.len && ((this.max_len = t.max_len || 0), 3 === this.type && (this._setPathData(s, false), (n = f.hasUpdate)));
        else if (t.len > 0 && t.start < this.start && t.len + t.start > this.start && !module393.isMiApp && 3 == this.type) {
          var h = this.start - t.start,
            l = t.len - h;

          this._setPathData(s, true, h);

          this.start += l;
          n = f.hasUpdate;
        }

        if (n != f.noUpdate) {
          this.max_len = t.max_len || 0;
          this.nonce = t.nonce || 0;
          var p = this.max_len - this.start;
          this.len = (p ** this.max_askLen) ** 0;
        }

        return n;
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

exports.MapDataConfig = u;
