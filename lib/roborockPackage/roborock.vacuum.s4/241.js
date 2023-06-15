var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function l() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module242 = require('./242'),
  module224 = require('./224').shouldUseNativeDriver,
  v = (function (v) {
    module7(D, module242);

    var f = D,
      p = l(),
      y = function () {
        var t,
          n = module11(f);

        if (p) {
          var s = module11(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function D(n) {
      var s, o, c, u;
      module4(this, D);
      (u = y.call(this))._deceleration = null != (s = n.deceleration) ? s : 0.998;
      u._velocity = n.velocity;
      u._useNativeDriver = module224(n);
      u.__isInteraction = null != (o = n.isInteraction) ? o : !u._useNativeDriver;
      u.__iterations = null != (c = n.iterations) ? c : 1;
      return u;
    }

    module5(D, [
      {
        key: '__getNativeAnimationConfig',
        value: function () {
          return {
            type: 'decay',
            deceleration: this._deceleration,
            velocity: this._velocity,
            iterations: this.__iterations,
          };
        },
      },
      {
        key: 'start',
        value: function (t, n, s, o, c) {
          this.__active = true;
          this._lastValue = t;
          this._fromValue = t;
          this._onUpdate = n;
          this.__onEnd = s;
          this._startTime = Date.now();
          if (this._useNativeDriver) this.__startNativeAnimation(c);
          else this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
        },
      },
      {
        key: 'onUpdate',
        value: function () {
          var t = Date.now(),
            n = this._fromValue + (this._velocity / (1 - this._deceleration)) * (1 - Math.exp(-(1 - this._deceleration) * (t - this._startTime)));

          this._onUpdate(n);

          if (Math.abs(this._lastValue - n) < 0.1)
            this.__debouncedOnEnd({
              finished: true,
            });
          else {
            this._lastValue = n;
            if (this.__active) this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
          }
        },
      },
      {
        key: 'stop',
        value: function () {
          module40(module11(D.prototype), 'stop', this).call(this);
          this.__active = false;
          globals.cancelAnimationFrame(this._animationFrame);

          this.__debouncedOnEnd({
            finished: false,
          });
        },
      },
    ]);
    return D;
  })();

module.exports = v;
