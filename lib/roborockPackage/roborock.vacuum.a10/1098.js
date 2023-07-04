var module21 = require('./21'),
  module49 = require('./49'),
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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var f = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(f, c, l);
        else f[c] = t[c];
      }

    f.default = t;
    if (o) o.set(t, f);
    return f;
  })(require('./1069')),
  module1080 = require('./1080');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(t);
    if (n)
      f = f.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, f);
  }

  return o;
}

function j(t) {
  for (var n = 1; n < arguments.length; n++) {
    var f = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(f), true).forEach(function (n) {
        module49.default(t, n, f[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(f));
    else
      b(Object(f)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(f, n));
      });
  }

  return t;
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

var module1082 = (function (t) {
  module7.default(b, t);

  var module49 = b,
    module12 = P(),
    v = function () {
      var t,
        n = module11.default(module49);

      if (module12) {
        var f = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, f);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b() {
    module4.default(this, b);
    return v.apply(this, arguments);
  }

  module5.default(b, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          o = t.children,
          f = t.x,
          u = t.y,
          c = t.width,
          l = t.height,
          p = t.xlinkHref,
          y = t.href,
          v = undefined === y ? p : y,
          b = v.match(module1080.idPattern),
          P = b && b[1];
        if (!P) console.warn('Invalid `href` prop for `Use` element, expected a href like "#id", but got: "' + v + '"');
        return React.default.createElement(
          k,
          module21.default(
            {
              ref: this.refMethod,
            },
            module1069.default(
              j(
                j({}, module1069.propsAndStyles(t)),
                {},
                {
                  x: null,
                  y: null,
                }
              ),
              this
            ),
            {
              href: P,
              x: f,
              y: u,
              width: c,
              height: l,
            }
          ),
          o
        );
      },
    },
  ]);
  return b;
})(require('./1082').default);

exports.default = module1082;
module1082.displayName = 'Use';
module1082.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
var k = module12.requireNativeComponent('RNSVGUse');
