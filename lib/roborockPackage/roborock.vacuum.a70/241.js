var module6 = require('./6'),
  module41 = require('./41'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function u() {
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

var module227 = require('./227'),
  module230 = require('./230'),
  module228 = require('./228');

class l {
  constructor(n) {
    var o;
    module6(this, N);
    (o = k.call(this))._transforms = n;
    return o;
  }

  __makeNative() {
    this._transforms.forEach(function (t) {
      for (var n in t) {
        var o = t[n];
        if (o instanceof module227) o.__makeNative();
      }
    });

    module41(module12(N.prototype), '__makeNative', this).call(this);
  }

  __getValue() {
    return this._transforms.map(function (t) {
      var n = {};

      for (var o in t) {
        var f = t[o];
        n[o] = f instanceof module227 ? f.__getValue() : f;
      }

      return n;
    });
  }

  __getAnimatedValue() {
    return this._transforms.map(function (t) {
      var n = {};

      for (var o in t) {
        var f = t[o];
        n[o] = f instanceof module227 ? f.__getAnimatedValue() : f;
      }

      return n;
    });
  }

  __attach() {
    var t = this;

    this._transforms.forEach(function (n) {
      for (var o in n) {
        var f = n[o];
        if (f instanceof module227) f.__addChild(t);
      }
    });
  }

  __detach() {
    var t = this;

    this._transforms.forEach(function (n) {
      for (var o in n) {
        var f = n[o];
        if (f instanceof module227) f.__removeChild(t);
      }
    });

    module41(module12(N.prototype), '__detach', this).call(this);
  }

  __getNativeConfig() {
    var t = [];

    this._transforms.forEach(function (n) {
      for (var o in n) {
        var f = n[o];
        if (f instanceof module227)
          t.push({
            type: 'animated',
            property: o,
            nodeTag: f.__getNativeTag(),
          });
        else
          t.push({
            type: 'static',
            property: o,
            value: module228.transformDataType(f),
          });
      }
    });

    module228.validateTransform(t);
    return {
      type: 'transform',
      transforms: t,
    };
  }
}

module.exports = l;
