var module4 = require('./4'),
  module41 = require('./41'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function _() {
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

var module246 = require('./246'),
  module248 = require('./248'),
  module13 = require('./13'),
  module228 = require('./228').shouldUseNativeDriver;

class p {
  constructor(s) {
    var n, o, l, h, _, u, p, y, V, D, M, P;

    if (
      (module4(this, b),
      ((V = T.call(this))._overshootClamping = null != (n = s.overshootClamping) && n),
      (V._restDisplacementThreshold = null != (o = s.restDisplacementThreshold) ? o : 0.001),
      (V._restSpeedThreshold = null != (l = s.restSpeedThreshold) ? l : 0.001),
      (V._initialVelocity = null != (h = s.velocity) ? h : 0),
      (V._lastVelocity = null != (_ = s.velocity) ? _ : 0),
      (V._toValue = s.toValue),
      (V._delay = null != (u = s.delay) ? u : 0),
      (V._useNativeDriver = module228(s)),
      (V.__isInteraction = null != (p = s.isInteraction) ? p : !V._useNativeDriver),
      (V.__iterations = null != (y = s.iterations) ? y : 1),
      undefined !== s.stiffness || undefined !== s.damping || undefined !== s.mass)
    ) {
      module13(
        undefined === s.bounciness && undefined === s.speed && undefined === s.tension && undefined === s.friction,
        'You can define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one'
      );
      V._stiffness = null != (D = s.stiffness) ? D : 100;
      V._damping = null != (M = s.damping) ? M : 10;
      V._mass = null != (P = s.mass) ? P : 1;
    } else if (undefined !== s.bounciness || undefined !== s.speed) {
      var S, U;
      module13(
        undefined === s.tension && undefined === s.friction && undefined === s.stiffness && undefined === s.damping && undefined === s.mass,
        'You can define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one'
      );
      var A = module248.fromBouncinessAndSpeed(null != (S = s.bounciness) ? S : 8, null != (U = s.speed) ? U : 12);
      V._stiffness = A.stiffness;
      V._damping = A.damping;
      V._mass = 1;
    } else {
      var C,
        N,
        k = module248.fromOrigamiTensionAndFriction(null != (C = s.tension) ? C : 40, null != (N = s.friction) ? N : 7);
      V._stiffness = k.stiffness;
      V._damping = k.damping;
      V._mass = 1;
    }

    module13(V._stiffness > 0, 'Stiffness value must be greater than 0');
    module13(V._damping > 0, 'Damping value must be greater than 0');
    module13(V._mass > 0, 'Mass value must be greater than 0');
    return V;
  }

  __getNativeAnimationConfig() {
    var t;
    return {
      type: 'spring',
      overshootClamping: this._overshootClamping,
      restDisplacementThreshold: this._restDisplacementThreshold,
      restSpeedThreshold: this._restSpeedThreshold,
      stiffness: this._stiffness,
      damping: this._damping,
      mass: this._mass,
      initialVelocity: null != (t = this._initialVelocity) ? t : this._lastVelocity,
      toValue: this._toValue,
      iterations: this.__iterations,
    };
  }

  start(t, s, n, o, l) {
    var h = this;

    if (
      ((this.__active = true),
      (this._startPosition = t),
      (this._lastPosition = this._startPosition),
      (this._onUpdate = s),
      (this.__onEnd = n),
      (this._lastTime = Date.now()),
      (this._frameTime = 0),
      o instanceof b)
    ) {
      var _ = o.getInternalState();

      this._lastPosition = _.lastPosition;
      this._lastVelocity = _.lastVelocity;
      this._initialVelocity = this._lastVelocity;
      this._lastTime = _.lastTime;
    }

    var u = function () {
      if (h._useNativeDriver) h.__startNativeAnimation(l);
      else h.onUpdate();
    };

    if (this._delay) this._timeout = setTimeout(u, this._delay);
    else u();
  }

  getInternalState() {
    return {
      lastPosition: this._lastPosition,
      lastVelocity: this._lastVelocity,
      lastTime: this._lastTime,
    };
  }

  onUpdate() {
    var t = Date.now();
    if (t > this._lastTime + 64) t = this._lastTime + 64;
    var s = (t - this._lastTime) / 1e3;
    this._frameTime += s;

    var n = this._damping,
      o = this._mass,
      l = this._stiffness,
      h = -this._initialVelocity,
      _ = n / (2 * Math.sqrt(l * o)),
      u = Math.sqrt(l / o),
      f = u * Math.sqrt(1 - _ * _),
      c = this._toValue - this._startPosition,
      v = 0,
      p = 0,
      y = this._frameTime;

    if (_ < 1) {
      var V = Math.exp(-_ * u * y);
      v = this._toValue - V * (((h + _ * u * c) / f) * Math.sin(f * y) + c * Math.cos(f * y));
      p = _ * u * V * ((Math.sin(f * y) * (h + _ * u * c)) / f + c * Math.cos(f * y)) - V * (Math.cos(f * y) * (h + _ * u * c) - f * c * Math.sin(f * y));
    } else {
      var T = Math.exp(-u * y);
      v = this._toValue - T * (c + (h + u * c) * y);
      p = T * (h * (y * u - 1) + y * c * (u * u));
    }

    if (((this._lastTime = t), (this._lastPosition = v), (this._lastVelocity = p), this._onUpdate(v), this.__active)) {
      var b = false;
      if (this._overshootClamping && 0 !== this._stiffness) b = this._startPosition < this._toValue ? v > this._toValue : v < this._toValue;

      var D = Math.abs(p) <= this._restSpeedThreshold,
        M = true;

      if ((0 !== this._stiffness && (M = Math.abs(this._toValue - v) <= this._restDisplacementThreshold), b || (D && M))) {
        if (0 !== this._stiffness) {
          this._lastPosition = this._toValue;
          this._lastVelocity = 0;

          this._onUpdate(this._toValue);
        }

        return void this.__debouncedOnEnd({
          finished: true,
        });
      }

      this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
    }
  }

  stop() {
    module41(module11(b.prototype), 'stop', this).call(this);
    this.__active = false;
    clearTimeout(this._timeout);
    globals.cancelAnimationFrame(this._animationFrame);

    this.__debouncedOnEnd({
      finished: false,
    });
  }
}

module.exports = p;
