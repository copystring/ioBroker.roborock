var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1313 = require('./1313');

function b() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var v = function (t, n) {
    if (Array.isArray(n)) console.warn("LinearGradient '" + t + "' property should be an object with fields 'x' and 'y', Array type is deprecated.");
    return null !== n && 'object' == typeof n ? [n.x, n.y] : n;
  },
  P = (function (t) {
    module7.default(C, t);

    var n = C,
      P = b(),
      A = function () {
        var t,
          o = module11.default(n);

        if (P) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function C() {
      module4.default(this, C);
      return A.apply(this, arguments);
    }

    module5.default(C, [
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
            n = this.props,
            s = n.children,
            u = n.colors,
            f = n.end,
            c = n.locations,
            p = n.useAngle,
            b = n.angleCenter,
            P = n.angle,
            A = n.start,
            C = n.style,
            L = module56.default(n, ['children', 'colors', 'end', 'locations', 'useAngle', 'angleCenter', 'angle', 'start', 'style']);
          if (u && c && u.length !== c.length) console.warn('LinearGradient colors and locations props should be arrays of the same length');

          var x = B,
            w = module12.StyleSheet.flatten(C) || {},
            B = w.borderRadius || 0,
            T = function (t) {
              return 'number' == typeof t ? t : x;
            },
            _ = [
              T(w.borderTopLeftRadius),
              T(w.borderTopLeftRadius),
              T(w.borderTopRightRadius),
              T(w.borderTopRightRadius),
              T(w.borderBottomRightRadius),
              T(w.borderBottomRightRadius),
              T(w.borderBottomLeftRadius),
              T(w.borderBottomLeftRadius),
            ];

          return React.default.createElement(
            module12.View,
            module22.default(
              {
                ref: function (n) {
                  t.gradientRef = n;
                },
              },
              L,
              {
                style: C,
              }
            ),
            React.default.createElement(module1313.default, {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              colors: u.map(module12.processColor),
              startPoint: v('start', A),
              endPoint: v('end', f),
              locations: c ? c.slice(0, u.length) : null,
              useAngle: p,
              angleCenter: v('angleCenter', b),
              angle: P,
              borderRadii: _,
            }),
            s
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = P;
P.defaultProps = {
  start: {
    x: 0.5,
    y: 0,
  },
  end: {
    x: 0.5,
    y: 1,
  },
};
