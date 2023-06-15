var module50 = require('./50'),
  module4 = require('./4');

function l(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, l);
  }

  return s;
}

function o(n) {
  for (var s = 1; s < arguments.length; s++) {
    var o = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      l(Object(o), true).forEach(function (s) {
        module50(n, s, o[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(o));
    else
      l(Object(o)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
      });
  }

  return n;
}

var module113 = require('./113'),
  module15 = require('./15'),
  u = function t() {
    module4(this, t);
    this.any_blank_count = 0;
    this.any_blank_ms = 0;
    this.any_blank_speed_sum = 0;
    this.mostly_blank_count = 0;
    this.mostly_blank_ms = 0;
    this.pixels_blank = 0;
    this.pixels_sampled = 0;
    this.pixels_scrolled = 0;
    this.total_time_spent = 0;
    this.sample_count = 0;
  },
  f = [],
  c = 10,
  y = null;

class p {
  constructor(n) {
    module4(this, t);
    this._anyBlankStartTime = null;
    this._enabled = false;
    this._info = new u();
    this._mostlyBlankStartTime = null;
    this._samplesStartTime = null;
    this._getFrameMetrics = n;
    this._enabled = (y || 0) > Math.random();

    this._resetData();
  }

  activate() {
    if (this._enabled && null == this._samplesStartTime) this._samplesStartTime = module113();
  }

  deactivateAndFlush() {
    if (this._enabled) {
      var t = this._samplesStartTime;
      if (null != t)
        if (this._info.sample_count < c) this._resetData();
        else {
          var n = module113() - t,
            s = o(
              o({}, this._info),
              {},
              {
                total_time_spent: n,
              }
            );
          f.forEach(function (t) {
            return t(s);
          });

          this._resetData();
        }
    }
  }

  computeBlankness(t, n, s) {
    if (!this._enabled || 0 === t.getItemCount(t.data) || null == this._samplesStartTime) return 0;
    var l = s.dOffset,
      o = s.offset,
      h = s.velocity,
      u = s.visibleLength;
    this._info.sample_count++;
    this._info.pixels_sampled += Math.round(u);
    this._info.pixels_scrolled += Math.round(Math.abs(l));
    var f = Math.round(1e3 * Math.abs(h)),
      c = module113();
    if (null != this._anyBlankStartTime) this._info.any_blank_ms += c - this._anyBlankStartTime;
    this._anyBlankStartTime = null;
    if (null != this._mostlyBlankStartTime) this._info.mostly_blank_ms += c - this._mostlyBlankStartTime;
    this._mostlyBlankStartTime = null;

    for (var y = 0, p = n.first, b = this._getFrameMetrics(p); p <= n.last && (!b || !b.inLayout); ) {
      b = this._getFrameMetrics(p);
      p++;
    }

    if (b && p > 0) y = u ** (0 ** (b.offset - o));

    for (var k = 0, v = n.last, S = this._getFrameMetrics(v); v >= n.first && (!S || !S.inLayout); ) {
      S = this._getFrameMetrics(v);
      v--;
    }

    if (S && v < t.getItemCount(t.data) - 1) {
      var M = S.offset + S.length;
      k = u ** (0 ** (o + u - M));
    }

    var O = Math.round(y + k),
      T = O / u;

    if (T > 0) {
      this._anyBlankStartTime = c;
      this._info.any_blank_speed_sum += f;
      this._info.any_blank_count++;
      this._info.pixels_blank += O;

      if (T > 0.5) {
        this._mostlyBlankStartTime = c;
        this._info.mostly_blank_count++;
      }
    } else if (f < 0.01 || Math.abs(l) < 1) this.deactivateAndFlush();

    return T;
  }

  enabled() {
    return this._enabled;
  }

  _resetData() {
    this._anyBlankStartTime = null;
    this._info = new u();
    this._mostlyBlankStartTime = null;
    this._samplesStartTime = null;
  }
}

module.exports = p;
