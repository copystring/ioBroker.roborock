var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = R(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, s, f);
        else l[s] = t[s];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module1218 = require('./1218'),
  b = ['children', 'colors', 'end', 'locations', 'useAngle', 'angleCenter', 'angle', 'start', 'style'];

function R(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (R = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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

var P = function (t, n) {
    if (Array.isArray(n)) console.warn("LinearGradient '" + t + "' property should be an object with fields 'x' and 'y', Array type is deprecated.");
    return null !== n && 'object' == typeof n ? [n.x, n.y] : n;
  },
  O = (function (t) {
    module7.default(w, t);

    var R = w,
      O = v(),
      j = function () {
        var t,
          n = module11.default(R);

        if (O) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function w() {
      module4.default(this, w);
      return j.apply(this, arguments);
    }

    module5.default(w, [
      {
        key: 'setNativeProps',
        value: function (t) {
          this.gradientRef.setNativeProps(t);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            l = this.props,
            u = l.children,
            s = l.colors,
            f = l.end,
            c = l.locations,
            R = l.useAngle,
            v = l.angleCenter,
            O = l.angle,
            j = l.start,
            w = l.style,
            A = module55.default(l, b);
          if (s && c && s.length !== c.length) console.warn('LinearGradient colors and locations props should be arrays of the same length');

          var B = L,
            C = module12.StyleSheet.flatten(w) || {},
            L = C.borderRadius || 0,
            _ = function (t) {
              return 'number' == typeof t ? t : B;
            },
            k = [
              _(C.borderTopLeftRadius),
              _(C.borderTopLeftRadius),
              _(C.borderTopRightRadius),
              _(C.borderTopRightRadius),
              _(C.borderBottomRightRadius),
              _(C.borderBottomRightRadius),
              _(C.borderBottomLeftRadius),
              _(C.borderBottomLeftRadius),
            ];

          return React.default.createElement(
            module12.View,
            module21.default(
              {
                ref: function (n) {
                  t.gradientRef = n;
                },
              },
              A,
              {
                style: w,
              }
            ),
            React.default.createElement(module1218.default, {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              colors: s.map(module12.processColor),
              startPoint: P('start', j),
              endPoint: P('end', f),
              locations: c ? c.slice(0, s.length) : null,
              useAngle: R,
              angleCenter: P('angleCenter', v),
              angle: O,
              borderRadii: k,
            }),
            u
          );
        },
      },
    ]);
    return w;
  })(React.Component);

exports.default = O;
O.defaultProps = {
  start: {
    x: 0.5,
    y: 0,
  },
  end: {
    x: 0.5,
    y: 1,
  },
};
