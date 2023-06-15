var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function v(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function f(n) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      v(Object(s), true).forEach(function (o) {
        module49(n, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(s));
    else
      v(Object(s)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(s, t));
      });
  }

  return n;
}

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

var module220 = require('./220').AnimatedEvent,
  module223 = require('./223'),
  module236 = require('./236'),
  module224 = require('./224'),
  module85 = require('./85'),
  module13 = require('./13'),
  k = (function (t) {
    module7(V, module223);

    var v = V,
      k = l(),
      O = function () {
        var t,
          n = module11(v);

        if (k) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function V(t, o) {
      var module40;
      module4(this, V);
      module40 = O.call(this);
      if (t.style)
        t = f(
          f({}, t),
          {},
          {
            style: new module236(t.style),
          }
        );
      module40._props = t;
      module40._callback = o;

      module40.__attach();

      return module40;
    }

    module5(V, [
      {
        key: '__getValue',
        value: function () {
          var t = {};

          for (var n in this._props) {
            var o = this._props[n];
            if (o instanceof module223) {
              if (!o.__isNative || o instanceof module236) t[n] = o.__getValue();
            } else t[n] = o instanceof module220 ? o.__getHandler() : o;
          }

          return t;
        },
      },
      {
        key: '__getAnimatedValue',
        value: function () {
          var t = {};

          for (var n in this._props) {
            var o = this._props[n];
            if (o instanceof module223) t[n] = o.__getAnimatedValue();
          }

          return t;
        },
      },
      {
        key: '__attach',
        value: function () {
          for (var t in this._props) {
            var n = this._props[t];
            if (n instanceof module223) n.__addChild(this);
          }
        },
      },
      {
        key: '__detach',
        value: function () {
          for (var t in (this.__isNative && this._animatedView && this.__disconnectAnimatedView(), this._props)) {
            var n = this._props[t];
            if (n instanceof module223) n.__removeChild(this);
          }

          module40(module11(V.prototype), '__detach', this).call(this);
        },
      },
      {
        key: 'update',
        value: function () {
          this._callback();
        },
      },
      {
        key: '__makeNative',
        value: function () {
          if (!this.__isNative) {
            for (var t in ((this.__isNative = true), this._props)) {
              var n = this._props[t];
              if (n instanceof module223) n.__makeNative();
            }

            if (this._animatedView) this.__connectAnimatedView();
          }
        },
      },
      {
        key: 'setNativeView',
        value: function (t) {
          if (this._animatedView !== t) {
            this._animatedView = t;
            if (this.__isNative) this.__connectAnimatedView();
          }
        },
      },
      {
        key: '__connectAnimatedView',
        value: function () {
          module13(this.__isNative, 'Expected node to be marked as "native"');
          var t = module85.findNodeHandle(this._animatedView);
          module13(null != t, 'Unable to locate attached view in the native tree');
          module224.API.connectAnimatedNodeToView(this.__getNativeTag(), t);
        },
      },
      {
        key: '__disconnectAnimatedView',
        value: function () {
          module13(this.__isNative, 'Expected node to be marked as "native"');
          var t = module85.findNodeHandle(this._animatedView);
          module13(null != t, 'Unable to locate attached view in the native tree');
          module224.API.disconnectAnimatedNodeFromView(this.__getNativeTag(), t);
        },
      },
      {
        key: '__getNativeConfig',
        value: function () {
          var t = {};

          for (var n in this._props) {
            var o = this._props[n];

            if (o instanceof module223) {
              o.__makeNative();

              t[n] = o.__getNativeTag();
            }
          }

          return {
            type: 'props',
            props: t,
          };
        },
      },
    ]);
    return V;
  })();

module.exports = k;
