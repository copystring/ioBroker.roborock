var module4 = require('./4'),
  module5 = require('./5'),
  module40 = require('./40'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function _(t, n) {
  var o = ('undefined' != typeof Symbol && t['function' == typeof Symbol ? Symbol.iterator : '@@iterator']) || t['@@iterator'];
  if (o) return (o = o.call(t)).next.bind(o);

  if (Array.isArray(t) || (o = u(t)) || (n && t && 'number' == typeof t.length)) {
    if (o) t = o;
    var c = 0;
    return function () {
      return c >= t.length
        ? {
            done: true,
          }
        : {
            done: false,
            value: t[c++],
          };
    };
  }

  throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function u(t, n) {
  if (t) {
    if ('string' == typeof t) return h(t, n);
    var o = Object.prototype.toString.call(t).slice(8, -1);
    if ('Object' === o && t.constructor) o = t.constructor.name;
    return 'Map' === o || 'Set' === o ? Array.from(t) : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? h(t, n) : undefined;
  }
}

function h(t, n) {
  if (null == n || n > t.length) n = t.length;

  for (var o = 0, c = new Array(n); o < n; o++) c[o] = t[o];

  return c;
}

function f() {
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
  module224 = require('./224'),
  p = (function (u) {
    module7(b, module223);

    var h = b,
      p = f(),
      N = function () {
        var t,
          n = module11(h);

        if (p) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function b() {
      var n;
      module4(this, b);
      (n = N.call(this))._children = [];
      return n;
    }

    module5(b, [
      {
        key: '__makeNative',
        value: function () {
          if (!this.__isNative) {
            this.__isNative = true;

            for (var t, n = _(this._children); !(t = n()).done; ) {
              var c = t.value;

              c.__makeNative();

              module224.API.connectAnimatedNodes(this.__getNativeTag(), c.__getNativeTag());
            }
          }

          module40(module11(b.prototype), '__makeNative', this).call(this);
        },
      },
      {
        key: '__addChild',
        value: function (t) {
          if (0 === this._children.length) this.__attach();

          this._children.push(t);

          if (this.__isNative) {
            t.__makeNative();

            module224.API.connectAnimatedNodes(this.__getNativeTag(), t.__getNativeTag());
          }
        },
      },
      {
        key: '__removeChild',
        value: function (t) {
          var n = this._children.indexOf(t);

          if (-1 !== n) {
            if (this.__isNative && t.__isNative) module224.API.disconnectAnimatedNodes(this.__getNativeTag(), t.__getNativeTag());

            this._children.splice(n, 1);

            if (0 === this._children.length) this.__detach();
          } else console.warn("Trying to remove a child that doesn't exist");
        },
      },
      {
        key: '__getChildren',
        value: function () {
          return this._children;
        },
      },
      {
        key: '__callListeners',
        value: function (t) {
          if ((module40(module11(b.prototype), '__callListeners', this).call(this, t), !this.__isNative))
            for (var n, c = _(this._children); !(n = c()).done; ) {
              var l = n.value;
              if (l.__getValue) l.__callListeners(l.__getValue());
            }
        },
      },
    ]);
    return b;
  })();

module.exports = p;
