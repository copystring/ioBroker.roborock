var module6 = require('./6'),
  module41 = require('./41'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function h() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./225');

require('./244');

var l,
  module246 = require('./246'),
  module228 = require('./228').shouldUseNativeDriver;

function v() {
  if (!l) {
    var module250 = require('./250');

    l = module250.inOut(module250.ease);
  }

  return l;
}

class p {
  constructor(n) {
    var s, o, u, _, h, l;

    module6(this, D);
    (l = V.call(this))._toValue = n.toValue;
    l._easing = null != (s = n.easing) ? s : v();
    l._duration = null != (o = n.duration) ? o : 500;
    l._delay = null != (u = n.delay) ? u : 0;
    l.__iterations = null != (_ = n.iterations) ? _ : 1;
    l._useNativeDriver = module228(n);
    l.__isInteraction = null != (h = n.isInteraction) ? h : !l._useNativeDriver;
    return l;
  }

  __getNativeAnimationConfig() {
    for (var t = [], n = Math.round(this._duration / 16.666666666666668), s = 0; s < n; s++) t.push(this._easing(s / n));

    t.push(this._easing(1));
    return {
      type: 'frames',
      frames: t,
      toValue: this._toValue,
      iterations: this.__iterations,
    };
  }

  start(t, n, s, o, u) {
    var _ = this;

    this.__active = true;
    this._fromValue = t;
    this._onUpdate = n;
    this.__onEnd = s;

    var h = function () {
      if (0 !== _._duration || _._useNativeDriver) {
        _._startTime = Date.now();
        if (_._useNativeDriver) _.__startNativeAnimation(u);
        else _._animationFrame = requestAnimationFrame(_.onUpdate.bind(_));
      } else {
        _._onUpdate(_._toValue);

        _.__debouncedOnEnd({
          finished: true,
        });
      }
    };

    if (this._delay) this._timeout = setTimeout(h, this._delay);
    else h();
  }

  onUpdate() {
    var t = Date.now();

    if (t >= this._startTime + this._duration) {
      if (0 === this._duration) this._onUpdate(this._toValue);
      else this._onUpdate(this._fromValue + this._easing(1) * (this._toValue - this._fromValue));
      return void this.__debouncedOnEnd({
        finished: true,
      });
    }

    this._onUpdate(this._fromValue + this._easing((t - this._startTime) / this._duration) * (this._toValue - this._fromValue));

    if (this.__active) this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
  }

  stop() {
    module41(module12(D.prototype), 'stop', this).call(this);
    this.__active = false;
    clearTimeout(this._timeout);
    globals.cancelAnimationFrame(this._animationFrame);

    this.__debouncedOnEnd({
      finished: false,
    });
  }
}

module.exports = p;
