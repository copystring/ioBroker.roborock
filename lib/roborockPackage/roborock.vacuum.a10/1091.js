var module21 = require('./21'),
  module30 = require('./30'),
  module49 = require('./49'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1081 = require('./1081'),
  module1092 = require('./1092'),
  module1082 = require('./1082'),
  module1093 = require('./1093'),
  j = ['opacity', 'viewBox', 'preserveAspectRatio', 'style', 'children', 'onLayout'];

function R(t, o) {
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

function N(t) {
  for (var o = 1; o < arguments.length; o++) {
    var n = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(n), true).forEach(function (o) {
        module49.default(t, o, n[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
    else
      R(Object(n)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
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

var L = module12.NativeModules.RNSVGSvgViewManager,
  D = module12.StyleSheet.create({
    svg: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  }),
  S = (function (t, ...args) {
    module7.default(S, t);

    var module49 = S,
      module1082 = P(),
      R = function () {
        var t,
          o = module11.default(module49);

        if (module1082) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function S() {
      var t;
      module4.default(this, S);

      (t = R.call(this, ...args)).measureInWindow = function () {
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
          var l = module12.findNodeHandle(t.root);
          L.toDataURL(l, n, o);
        }
      };

      return t;
    }

    module5.default(S, [
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
            v = module55.default(t, j),
            k = N(N({}, f && f.length ? Object.assign({}, ...module30.default(f)) : f), v),
            R = k.color,
            P = k.width,
            L = k.height,
            S = k.font,
            W = k.transform,
            x = k.fill,
            A = k.fillOpacity,
            B = k.fillRule,
            E = k.stroke,
            I = k.strokeWidth,
            V = k.strokeOpacity,
            _ = k.strokeDasharray,
            C = k.strokeDashoffset,
            H = k.strokeLinecap,
            G = k.strokeLinejoin,
            U = k.strokeMiterlimit,
            q = parseInt(P, 10),
            Y = parseInt(L, 10),
            z = isNaN(q) || '%' === P[P.length - 1],
            F = isNaN(Y) || '%' === L[L.length - 1],
            J =
              P && L
                ? {
                    width: z ? P : q,
                    height: F ? L : Y,
                    flex: 0,
                  }
                : null,
            K = +l,
            Q = isNaN(K)
              ? null
              : {
                  opacity: K,
                };
          return React.default.createElement(
            M,
            module21.default(
              {},
              v,
              {
                bbWidth: P,
                bbHeight: L,
                tintColor: R,
                onLayout: y,
                ref: this.refMethod,
                style: [D.svg, f, Q, J],
              },
              module1081.default(v, this),
              module1092.default({
                viewBox: c,
                preserveAspectRatio: u,
              })
            ),
            React.default.createElement(module1093.default, {
              children: p,
              style: f,
              font: S,
              transform: W,
              fill: x,
              fillOpacity: A,
              fillRule: B,
              stroke: E,
              strokeWidth: I,
              strokeOpacity: V,
              strokeDasharray: _,
              strokeDashoffset: C,
              strokeLinecap: H,
              strokeLinejoin: G,
              strokeMiterlimit: U,
            })
          );
        },
      },
    ]);
    return S;
  })(module1082.default);

exports.default = S;
S.displayName = 'Svg';
S.defaultProps = {
  preserveAspectRatio: 'xMidYMid meet',
};
var M = module12.requireNativeComponent('RNSVGSvgView');
