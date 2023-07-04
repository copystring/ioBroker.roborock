var module22 = require('./22'),
  module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1364 = require('./1364'),
  module1375 = require('./1375'),
  module1365 = require('./1365'),
  module1376 = require('./1376');

function j(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, l);
  }

  return n;
}

function R(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      j(Object(n), true).forEach(function (o) {
        module50.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      j(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
      });
  }

  return t;
}

function N() {
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

var P = module13.NativeModules.RNSVGSvgViewManager,
  D = module13.StyleSheet.create({
    svg: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  }),
  L = (function (t, ...args) {
    module9.default(L, t);

    var module50 = L,
      module1365 = N(),
      j = function () {
        var t,
          o = module12.default(module50);

        if (module1365) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function L() {
      var t;
      module6.default(this, L);

      (t = j.call(this, ...args)).measureInWindow = function () {
        var o;
        (o = t.root).measureInWindow.apply(o, arguments);
      };

      t.measure = function () {
        var o;
        (o = t.root).measure.apply(o, arguments);
      };

      t.measureLayout = function () {
        var o;
        (o = t.root).measureLayout.apply(o, arguments);
      };

      t.setNativeProps = function (o) {
        var n = o.width,
          l = o.height;
        if (n) o.bbWidth = n;
        if (l) o.bbHeight = l;
        t.root.setNativeProps(o);
      };

      t.toDataURL = function (o, n) {
        if (o) {
          var l = module13.findNodeHandle(t.root);
          P.toDataURL(l, n, o);
        }
      };

      return t;
    }

    module7.default(L, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            l = t.opacity,
            c = t.viewBox,
            u = t.preserveAspectRatio,
            f = t.style,
            p = t.children,
            y = t.onLayout,
            v = module56.default(t, ['opacity', 'viewBox', 'preserveAspectRatio', 'style', 'children', 'onLayout']),
            k = R(R({}, f && f.length ? Object.assign({}, ...module31.default(f)) : f), v),
            j = k.color,
            N = k.width,
            P = k.height,
            L = k.font,
            M = k.transform,
            W = k.fill,
            x = k.fillOpacity,
            A = k.fillRule,
            E = k.stroke,
            I = k.strokeWidth,
            V = k.strokeOpacity,
            _ = k.strokeDasharray,
            B = k.strokeDashoffset,
            C = k.strokeLinecap,
            H = k.strokeLinejoin,
            G = k.strokeMiterlimit,
            U = parseInt(N, 10),
            q = parseInt(P, 10),
            Y = isNaN(U) || '%' === N[N.length - 1],
            z = isNaN(q) || '%' === P[P.length - 1],
            F =
              N && P
                ? {
                    width: Y ? N : U,
                    height: z ? P : q,
                    flex: 0,
                  }
                : null,
            J = +l,
            K = isNaN(J)
              ? null
              : {
                  opacity: J,
                };
          return React.default.createElement(
            S,
            module22.default(
              {},
              v,
              {
                bbWidth: N,
                bbHeight: P,
                tintColor: j,
                onLayout: y,
                ref: this.refMethod,
                style: [D.svg, f, K, F],
              },
              module1364.default(v, this),
              module1375.default({
                viewBox: c,
                preserveAspectRatio: u,
              })
            ),
            React.default.createElement(module1376.default, {
              children: p,
              style: f,
              font: L,
              transform: M,
              fill: W,
              fillOpacity: x,
              fillRule: A,
              stroke: E,
              strokeWidth: I,
              strokeOpacity: V,
              strokeDasharray: _,
              strokeDashoffset: B,
              strokeLinecap: C,
              strokeLinejoin: H,
              strokeMiterlimit: G,
            })
          );
        },
      },
    ]);
    return L;
  })(module1365.default);

exports.default = L;
L.displayName = 'Svg';
L.defaultProps = {
  preserveAspectRatio: 'xMidYMid meet',
};
var S = module13.requireNativeComponent('RNSVGSvgView');
