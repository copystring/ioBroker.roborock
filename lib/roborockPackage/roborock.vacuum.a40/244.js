var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function o() {
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

var module225 = require('./225'),
  module230 = require('./230'),
  module13 = require('./13'),
  h = 1;

class x {
  constructor(n) {
    var s;
    module4(this, k);
    s = p.call(this);
    var u = n || {
      x: 0,
      y: 0,
    };

    if ('number' == typeof u.x && 'number' == typeof u.y) {
      s.x = new module225(u.x);
      s.y = new module225(u.y);
    } else {
      module13(u.x instanceof module225 && u.y instanceof module225, 'AnimatedValueXY must be initialized with an object of numbers or AnimatedValues.');
      s.x = u.x;
      s.y = u.y;
    }

    s._listeners = {};
    return s;
  }

  setValue(t) {
    this.x.setValue(t.x);
    this.y.setValue(t.y);
  }

  setOffset(t) {
    this.x.setOffset(t.x);
    this.y.setOffset(t.y);
  }

  flattenOffset() {
    this.x.flattenOffset();
    this.y.flattenOffset();
  }

  extractOffset() {
    this.x.extractOffset();
    this.y.extractOffset();
  }

  __getValue() {
    return {
      x: this.x.__getValue(),
      y: this.y.__getValue(),
    };
  }

  resetAnimation(t) {
    this.x.resetAnimation();
    this.y.resetAnimation();
    if (t) t(this.__getValue());
  }

  stopAnimation(t) {
    this.x.stopAnimation();
    this.y.stopAnimation();
    if (t) t(this.__getValue());
  }

  addListener(t) {
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
  }

  removeListener(t) {
    this.x.removeListener(this._listeners[t].x);
    this.y.removeListener(this._listeners[t].y);
    delete this._listeners[t];
  }

  removeAllListeners() {
    this.x.removeAllListeners();
    this.y.removeAllListeners();
    this._listeners = {};
  }

  getLayout() {
    return {
      left: this.x,
      top: this.y,
    };
  }

  getTranslateTransform() {
    return [
      {
        translateX: this.x,
      },
      {
        translateY: this.y,
      },
    ];
  }
}

module.exports = x;
