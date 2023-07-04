var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function o() {
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

var module221 = require('./221'),
  module226 = require('./226'),
  module13 = require('./13'),
  h = 1,
  x = (function (x) {
    module7(k, module226);

    var v = k,
      _ = o(),
      p = function () {
        var t,
          n = module11(v);

        if (_) {
          var s = module11(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function k(n) {
      var s;
      module4(this, k);
      s = p.call(this);
      var u = n || {
        x: 0,
        y: 0,
      };

      if ('number' == typeof u.x && 'number' == typeof u.y) {
        s.x = new module221(u.x);
        s.y = new module221(u.y);
      } else {
        module13(u.x instanceof module221 && u.y instanceof module221, 'AnimatedValueXY must be initialized with an object of numbers or AnimatedValues.');
        s.x = u.x;
        s.y = u.y;
      }

      s._listeners = {};
      return s;
    }

    module5(k, [
      {
        key: 'setValue',
        value: function (t) {
          this.x.setValue(t.x);
          this.y.setValue(t.y);
        },
      },
      {
        key: 'setOffset',
        value: function (t) {
          this.x.setOffset(t.x);
          this.y.setOffset(t.y);
        },
      },
      {
        key: 'flattenOffset',
        value: function () {
          this.x.flattenOffset();
          this.y.flattenOffset();
        },
      },
      {
        key: 'extractOffset',
        value: function () {
          this.x.extractOffset();
          this.y.extractOffset();
        },
      },
      {
        key: '__getValue',
        value: function () {
          return {
            x: this.x.__getValue(),
            y: this.y.__getValue(),
          };
        },
      },
      {
        key: 'resetAnimation',
        value: function (t) {
          this.x.resetAnimation();
          this.y.resetAnimation();
          if (t) t(this.__getValue());
        },
      },
      {
        key: 'stopAnimation',
        value: function (t) {
          this.x.stopAnimation();
          this.y.stopAnimation();
          if (t) t(this.__getValue());
        },
      },
      {
        key: 'addListener',
        value: function (t) {
          var n = this,
            s = String(h++),
            u = function (s) {
              s.value;
              t(n.__getValue());
            };

          this._listeners[s] = {
            x: this.x.addListener(u),
            y: this.y.addListener(u),
          };
          return s;
        },
      },
      {
        key: 'removeListener',
        value: function (t) {
          this.x.removeListener(this._listeners[t].x);
          this.y.removeListener(this._listeners[t].y);
          delete this._listeners[t];
        },
      },
      {
        key: 'removeAllListeners',
        value: function () {
          this.x.removeAllListeners();
          this.y.removeAllListeners();
          this._listeners = {};
        },
      },
      {
        key: 'getLayout',
        value: function () {
          return {
            left: this.x,
            top: this.y,
          };
        },
      },
      {
        key: 'getTranslateTransform',
        value: function () {
          return [
            {
              translateX: this.x,
            },
            {
              translateY: this.y,
            },
          ];
        },
      },
    ]);
    return k;
  })();

module.exports = x;
