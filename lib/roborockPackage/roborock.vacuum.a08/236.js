var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function y(n) {
  for (var s = 1; s < arguments.length; s++) {
    var o = null != arguments[s] ? arguments[s] : {};
    if (s % 2)
      f(Object(o), true).forEach(function (s) {
        module49(n, s, o[s]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(o));
    else
      f(Object(o)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
      });
  }

  return n;
}

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

var module223 = require('./223'),
  module237 = require('./237'),
  module226 = require('./226'),
  module224 = require('./224'),
  module82 = require('./82'),
  b = (function (t) {
    module7(j, module226);

    var f = j,
      b = _(),
      A = function () {
        var t,
          n = module11(f);

        if (b) {
          var s = module11(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function j(t) {
      var module5;
      module4(this, j);
      module5 = A.call(this);
      if ((t = module82(t) || {}).transform)
        t = y(
          y({}, t),
          {},
          {
            transform: new module237(t.transform),
          }
        );
      module5._style = t;
      return module5;
    }

    module5(j, [
      {
        key: '_walkStyleAndGetValues',
        value: function (t) {
          var n = {};

          for (var s in t) {
            var o = t[s];
            if (o instanceof module223) {
              if (!o.__isNative) n[s] = o.__getValue();
            } else if (o && !Array.isArray(o) && 'object' == typeof o) n[s] = this._walkStyleAndGetValues(o);
            else n[s] = o;
          }

          return n;
        },
      },
      {
        key: '__getValue',
        value: function () {
          return this._walkStyleAndGetValues(this._style);
        },
      },
      {
        key: '_walkStyleAndGetAnimatedValues',
        value: function (t) {
          var n = {};

          for (var s in t) {
            var o = t[s];
            if (o instanceof module223) n[s] = o.__getAnimatedValue();
            else if (o && !Array.isArray(o) && 'object' == typeof o) n[s] = this._walkStyleAndGetAnimatedValues(o);
          }

          return n;
        },
      },
      {
        key: '__getAnimatedValue',
        value: function () {
          return this._walkStyleAndGetAnimatedValues(this._style);
        },
      },
      {
        key: '__attach',
        value: function () {
          for (var t in this._style) {
            var n = this._style[t];
            if (n instanceof module223) n.__addChild(this);
          }
        },
      },
      {
        key: '__detach',
        value: function () {
          for (var t in this._style) {
            var n = this._style[t];
            if (n instanceof module223) n.__removeChild(this);
          }

          module40(module11(j.prototype), '__detach', this).call(this);
        },
      },
      {
        key: '__makeNative',
        value: function () {
          for (var t in this._style) {
            var n = this._style[t];
            if (n instanceof module223) n.__makeNative();
          }

          module40(module11(j.prototype), '__makeNative', this).call(this);
        },
      },
      {
        key: '__getNativeConfig',
        value: function () {
          var t = {};

          for (var n in this._style)
            if (this._style[n] instanceof module223) {
              var s = this._style[n];

              s.__makeNative();

              t[n] = s.__getNativeTag();
            }

          module224.validateStyles(t);
          return {
            type: 'style',
            style: t,
          };
        },
      },
    ]);
    return j;
  })();

module.exports = b;
