var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function u() {
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

var module223 = require('./223'),
  module226 = require('./226'),
  module224 = require('./224'),
  h = (function (h) {
    module7(N, module226);

    var p = N,
      y = u(),
      k = function () {
        var t,
          n = module11(p);

        if (y) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function N(n) {
      var o;
      module4(this, N);
      (o = k.call(this))._transforms = n;
      return o;
    }

    module5(N, [
      {
        key: '__makeNative',
        value: function () {
          this._transforms.forEach(function (t) {
            for (var n in t) {
              var o = t[n];
              if (o instanceof module223) o.__makeNative();
            }
          });

          module40(module11(N.prototype), '__makeNative', this).call(this);
        },
      },
      {
        key: '__getValue',
        value: function () {
          return this._transforms.map(function (t) {
            var n = {};

            for (var o in t) {
              var f = t[o];
              n[o] = f instanceof module223 ? f.__getValue() : f;
            }

            return n;
          });
        },
      },
      {
        key: '__getAnimatedValue',
        value: function () {
          return this._transforms.map(function (t) {
            var n = {};

            for (var o in t) {
              var f = t[o];
              n[o] = f instanceof module223 ? f.__getAnimatedValue() : f;
            }

            return n;
          });
        },
      },
      {
        key: '__attach',
        value: function () {
          var t = this;

          this._transforms.forEach(function (n) {
            for (var o in n) {
              var f = n[o];
              if (f instanceof module223) f.__addChild(t);
            }
          });
        },
      },
      {
        key: '__detach',
        value: function () {
          var t = this;

          this._transforms.forEach(function (n) {
            for (var o in n) {
              var f = n[o];
              if (f instanceof module223) f.__removeChild(t);
            }
          });

          module40(module11(N.prototype), '__detach', this).call(this);
        },
      },
      {
        key: '__getNativeConfig',
        value: function () {
          var t = [];

          this._transforms.forEach(function (n) {
            for (var o in n) {
              var f = n[o];
              if (f instanceof module223)
                t.push({
                  type: 'animated',
                  property: o,
                  nodeTag: f.__getNativeTag(),
                });
              else
                t.push({
                  type: 'static',
                  property: o,
                  value: module224.transformDataType(f),
                });
            }
          });

          module224.validateTransform(t);
          return {
            type: 'transform',
            transforms: t,
          };
        },
      },
    ]);
    return N;
  })();

module.exports = h;
