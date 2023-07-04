var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function _() {
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

var module222 = require('./222'),
  module226 = require('./226'),
  module227 = require('./227'),
  module224 = require('./224').API;

function p(t) {
  var n = new Set();
  !(function t(s) {
    if ('function' == typeof s.update) n.add(s);
    else s.__getChildren().forEach(t);
  })(t);
  n.forEach(function (t) {
    return t.update();
  });
}

var y = (function (y) {
  module7(A, module226);

  var k = A,
    N = _(),
    V = function () {
      var t,
        n = module11(k);

      if (N) {
        var s = module11(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);

      return module9(this, t);
    };

  function A(n) {
    var s;
    module4(this, A);
    (s = V.call(this))._startingValue = s._value = n;
    s._offset = 0;
    s._animation = null;
    return s;
  }

  module5(A, [
    {
      key: '__detach',
      value: function () {
        this.stopAnimation();
        module40(module11(A.prototype), '__detach', this).call(this);
      },
    },
    {
      key: '__getValue',
      value: function () {
        return this._value + this._offset;
      },
    },
    {
      key: 'setValue',
      value: function (t) {
        if (this._animation) {
          this._animation.stop();

          this._animation = null;
        }

        this._updateValue(t, !this.__isNative);

        if (this.__isNative) module224.setAnimatedNodeValue(this.__getNativeTag(), t);
      },
    },
    {
      key: 'setOffset',
      value: function (t) {
        this._offset = t;
        if (this.__isNative) module224.setAnimatedNodeOffset(this.__getNativeTag(), t);
      },
    },
    {
      key: 'flattenOffset',
      value: function () {
        this._value += this._offset;
        this._offset = 0;
        if (this.__isNative) module224.flattenAnimatedNodeOffset(this.__getNativeTag());
      },
    },
    {
      key: 'extractOffset',
      value: function () {
        this._offset += this._value;
        this._value = 0;
        if (this.__isNative) module224.extractAnimatedNodeOffset(this.__getNativeTag());
      },
    },
    {
      key: 'stopAnimation',
      value: function (t) {
        this.stopTracking();
        if (this._animation) this._animation.stop();
        this._animation = null;
        if (t) t(this.__getValue());
      },
    },
    {
      key: 'resetAnimation',
      value: function (t) {
        this.stopAnimation(t);
        this._value = this._startingValue;
      },
    },
    {
      key: '_onAnimatedValueUpdateReceived',
      value: function (t) {
        this._updateValue(t, false);
      },
    },
    {
      key: 'interpolate',
      value: function (t) {
        return new module222(this, t);
      },
    },
    {
      key: 'animate',
      value: function (t, n) {
        var s = this,
          u = null;
        if (t.__isInteraction) u = module227.createInteractionHandle();
        var o = this._animation;
        if (this._animation) this._animation.stop();
        this._animation = t;
        t.start(
          this._value,
          function (t) {
            s._updateValue(t, true);
          },
          function (t) {
            s._animation = null;
            if (null !== u) module227.clearInteractionHandle(u);
            if (n) n(t);
          },
          o,
          this
        );
      },
    },
    {
      key: 'stopTracking',
      value: function () {
        if (this._tracking) this._tracking.__detach();
        this._tracking = null;
      },
    },
    {
      key: 'track',
      value: function (t) {
        this.stopTracking();
        this._tracking = t;
      },
    },
    {
      key: '_updateValue',
      value: function (t, n) {
        this._value = t;
        if (n) p(this);
        module40(module11(A.prototype), '__callListeners', this).call(this, this.__getValue());
      },
    },
    {
      key: '__getNativeConfig',
      value: function () {
        return {
          type: 'value',
          value: this._value,
          offset: this._offset,
        };
      },
    },
  ]);
  return A;
})();

module.exports = y;
