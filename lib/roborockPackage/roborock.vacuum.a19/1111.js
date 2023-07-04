var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1078 = require('./1078'),
  module1071 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = b(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var l = f ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, c, l);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('./1071')),
  module1106 = require('./1106');

function b(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (b = function (t) {
    return t ? o : n;
  })(t);
}

function j(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      j(Object(u), true).forEach(function (n) {
        module49.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      j(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function w() {
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

var module1084 = (function (t) {
  module7.default(j, t);

  var module49 = j,
    module12 = w(),
    b = function () {
      var t,
        n = module11.default(module49);

      if (module12) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function j() {
    module4.default(this, j);
    return b.apply(this, arguments);
  }

  module5.default(j, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          o = t.maskTransform,
          u = t.transform,
          f = t.x,
          c = t.y,
          l = t.width,
          s = t.height,
          y = t.maskUnits,
          b = t.maskContentUnits,
          j = t.children;
        return React.default.createElement(
          M,
          module21.default(
            {
              ref: this.refMethod,
            },
            module1071.default(
              P(
                P({}, module1071.propsAndStyles(t)),
                {},
                {
                  x: null,
                  y: null,
                }
              ),
              this
            ),
            {
              x: f,
              y: c,
              width: l,
              height: s,
              maskTransform: module1078.default(o || u || t),
              maskUnits: undefined !== y ? module1106.default[y] : 0,
              maskContentUnits: undefined !== b ? module1106.default[b] : 1,
            }
          ),
          j
        );
      },
    },
  ]);
  return j;
})(require('./1084').default);

exports.default = module1084;
module1084.displayName = 'Mask';
module1084.defaultProps = {
  x: '0%',
  y: '0%',
  width: '100%',
  height: '100%',
};
var M = module12.requireNativeComponent('RNSVGMask');
