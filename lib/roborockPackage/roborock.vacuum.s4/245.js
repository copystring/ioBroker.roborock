var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function h() {
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

require('./221');

require('./240');

var l,
  module242 = require('./242'),
  module224 = require('./224').shouldUseNativeDriver;

function v() {
  if (!l) {
    var module246 = require('./246');

    l = module246.inOut(module246.ease);
  }

  return l;
}

var p = (function (l) {
  module7(U, module242);

  var p = U,
    y = h(),
    V = function () {
      var t,
        n = module11(p);

      if (y) {
        var s = module11(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);

      return module9(this, t);
    };

  function U(n) {
    var s, o, u, _, h, l;

    module4(this, U);
    (l = V.call(this))._toValue = n.toValue;
    l._easing = null != (s = n.easing) ? s : v();
    l._duration = null != (o = n.duration) ? o : 500;
    l._delay = null != (u = n.delay) ? u : 0;
    l.__iterations = null != (_ = n.iterations) ? _ : 1;
    l._useNativeDriver = module224(n);
    l.__isInteraction = null != (h = n.isInteraction) ? h : !l._useNativeDriver;
    return l;
  }

  module5(U, [
    {
      key: '__getNativeAnimationConfig',
      value: function () {
        for (var t = [], n = Math.round(this._duration / 16.666666666666668), s = 0; s < n; s++) t.push(this._easing(s / n));

        t.push(this._easing(1));
        return {
          type: 'frames',
          frames: t,
          toValue: this._toValue,
          iterations: this.__iterations,
        };
      },
    },
    {
      key: 'start',
      value: function (t, n, s, o, u) {
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
      },
    },
    {
      key: 'onUpdate',
      value: function () {
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
      },
    },
    {
      key: 'stop',
      value: function () {
        module40(module11(U.prototype), 'stop', this).call(this);
        this.__active = false;
        clearTimeout(this._timeout);
        globals.cancelAnimationFrame(this._animationFrame);

        this.__debouncedOnEnd({
          finished: false,
        });
      },
    },
  ]);
  return U;
})();

module.exports = p;
