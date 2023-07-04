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
    var u = v(n);
    if (u && u.has(t)) return u.get(t);
    var f = {},
      o = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = o ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(f, c, l);
        else f[c] = t[c];
      }

    f.default = t;
    if (u) u.set(t, f);
    return f;
  })(require('./1069'));

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (v = function (t) {
    return t ? u : n;
  })(t);
}

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

var module1082 = (function (t) {
  module7.default(b, t);

  var module12 = b,
    v = h(),
    O = function () {
      var t,
        n = module11.default(module12);

      if (v) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b() {
    module4.default(this, b);
    return O.apply(this, arguments);
  }

  module5.default(b, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.cx,
          f = t.cy,
          o = t.rx,
          c = t.ry;
        return React.default.createElement(
          P,
          module21.default(
            {
              ref: this.refMethod,
            },
            module1069.default(module1069.propsAndStyles(t), this),
            {
              cx: u,
              cy: f,
              rx: o,
              ry: c,
            }
          )
        );
      },
    },
  ]);
  return b;
})(require('./1082').default);

exports.default = module1082;
module1082.displayName = 'Ellipse';
module1082.defaultProps = {
  cx: 0,
  cy: 0,
  rx: 0,
  ry: 0,
};
var P = module12.requireNativeComponent('RNSVGEllipse');
