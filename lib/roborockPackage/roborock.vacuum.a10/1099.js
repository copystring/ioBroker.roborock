var module21 = require('./21'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1092 = require('./1092'),
  module1069 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
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
  })(require('./1069'));

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
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function j(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(u), true).forEach(function (n) {
        module49.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      b(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
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

var w = /\s+/,
  module1082 = (function (t) {
    module7.default(M, t);

    var module49 = M,
      v = P(),
      b = function () {
        var t,
          n = module11.default(module49);

        if (v) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, u);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function M() {
      module4.default(this, M);
      return b.apply(this, arguments);
    }

    module5.default(M, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            o = t.preserveAspectRatio,
            u = t.x,
            f = t.y,
            c = t.width,
            l = t.height,
            p = t.xlinkHref,
            v = t.href,
            b = undefined === v ? p : v,
            P = o.trim().split(w);
          return React.default.createElement(
            x,
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
                x: u,
                y: f,
                width: c,
                height: l,
                meetOrSlice: module1092.meetOrSliceTypes[P[1]] || 0,
                align: module1092.alignEnum[P[0]] || 'xMidYMid',
                src: module12.Image.resolveAssetSource(
                  'string' == typeof b
                    ? {
                        uri: b,
                      }
                    : b
                ),
              }
            )
          );
        },
      },
    ]);
    return M;
  })(require('./1082').default);

exports.default = module1082;
module1082.displayName = 'Image';
module1082.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  preserveAspectRatio: 'xMidYMid meet',
};
var x = module12.requireNativeComponent('RNSVGImage');
