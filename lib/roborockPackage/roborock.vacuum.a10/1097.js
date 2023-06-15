var module49 = require('./49'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1076 = require('./1076'),
  module1069 = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var f = k(n);
    if (f && f.has(t)) return f.get(t);
    var o = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = l ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(o, u, c);
        else o[u] = t[u];
      }

    o.default = t;
    if (f) f.set(t, o);
    return o;
  })(require('./1069')),
  module1094 = require('./1094'),
  module1080 = require('./1080'),
  module1082 = require('./1082'),
  module1096 = require('./1096'),
  x = ['children', 'xlinkHref', 'href', 'startOffset', 'method', 'spacing', 'side', 'alignmentBaseline', 'midLine'];

function k(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    f = new WeakMap();
  return (k = function (t) {
    return t ? f : n;
  })(t);
}

function M(t, n) {
  var f = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    f.push.apply(f, o);
  }

  return f;
}

function N(t) {
  for (var f = 1; f < arguments.length; f++) {
    var o = null != arguments[f] ? arguments[f] : {};
    if (f % 2)
      M(Object(o), true).forEach(function (f) {
        module49.default(t, f, o[f]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      M(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function D() {
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

var R = (function (t, ...args) {
  module7.default(k, t);

  var module49 = k,
    module12 = D(),
    j = function () {
      var t,
        f = module11.default(module49);

      if (module12) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(f, arguments, o);
      } else t = f.apply(this, arguments);

      return module9.default(this, t);
    };

  function k() {
    var t;
    module4.default(this, k);

    (t = j.call(this, ...args)).setNativeProps = function (n) {
      var f = !n.matrix && module1076.default(n);
      if (f) n.matrix = f;
      module21.default(n, module1080.pickNotNil(module1094.default(n, true)));
      t.root.setNativeProps(n);
    };

    return t;
  }

  module5.default(k, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.children,
          l = t.xlinkHref,
          u = t.href,
          c = undefined === u ? l : u,
          s = t.startOffset,
          p = undefined === s ? 0 : s,
          y = t.method,
          v = t.spacing,
          j = t.side,
          k = t.alignmentBaseline,
          M = t.midLine,
          D = module55.default(t, x),
          R = c && c.match(module1080.idPattern),
          B = R && R[1];

        if (B) {
          var E = module1069.default(
            N(
              N({}, module1069.propsAndStyles(D)),
              {},
              {
                x: null,
                y: null,
              }
            ),
            this
          );
          module21.default(
            E,
            module1094.default(
              {
                children: n,
              },
              true
            ),
            {
              href: B,
              startOffset: p,
              method: y,
              spacing: v,
              side: j,
              alignmentBaseline: k,
              midLine: M,
            }
          );
          E.ref = this.refMethod;
          return React.default.createElement(_, E);
        }

        console.warn('Invalid `href` prop for `TextPath` element, expected a href like "#id", but got: "' + c + '"');
        return React.default.createElement(
          module1096.default,
          {
            ref: this.refMethod,
          },
          n
        );
      },
    },
  ]);
  return k;
})(module1082.default);

exports.default = R;
R.displayName = 'TextPath';

var _ = module12.requireNativeComponent('RNSVGTextPath');
