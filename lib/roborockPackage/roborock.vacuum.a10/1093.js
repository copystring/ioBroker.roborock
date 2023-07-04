var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1069 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var u = O(n);
    if (u && u.has(t)) return u.get(t);
    var o = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(o, c, l);
        else o[c] = t[c];
      }

    o.default = t;
    if (u) u.set(t, o);
    return o;
  })(require('./1069')),
  module1094 = require('./1094'),
  module1076 = require('./1076');

function O(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (O = function (t) {
    return t ? u : n;
  })(t);
}

function P() {
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

var module1082 = (function (t, ...args) {
  module7.default(w, t);

  var module12 = w,
    O = P(),
    b = function () {
      var t,
        n = module11.default(module12);

      if (O) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function w() {
    var t;
    module4.default(this, w);

    (t = b.call(this, ...args)).setNativeProps = function (n) {
      var u = !n.matrix && module1076.default(n);
      if (u) n.matrix = u;
      t.root.setNativeProps(n);
    };

    return t;
  }

  module5.default(w, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = module1069.propsAndStyles(t);
        return React.default.createElement(
          j,
          module21.default(
            {
              ref: this.refMethod,
            },
            module1069.default(u, this),
            {
              font: module1094.extractFont(u),
            }
          ),
          t.children
        );
      },
    },
  ]);
  return w;
})(require('./1082').default);

exports.default = module1082;
module1082.displayName = 'G';
var j = module12.requireNativeComponent('RNSVGGroup');
