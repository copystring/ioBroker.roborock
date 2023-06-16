var module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module22 = require('./22'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1360 = require('./1360'),
  module1353 = require('./1353'),
  module1378 = require('./1378'),
  module1364 = require('./1364'),
  module1366 = require('./1366'),
  module1380 = require('./1380');

function N(t, n) {
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

function k(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      N(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      N(Object(o)).forEach(function (n) {
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
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var R = (function (t, ...args) {
  module9.default(x, t);

  var n = x,
    module50 = D(),
    y = function () {
      var t,
        o = module12.default(n);

      if (module50) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function x() {
    var t;
    module6.default(this, x);

    (t = y.call(this, ...args)).setNativeProps = function (n) {
      var f = !n.matrix && module1360.default(n);
      if (f) n.matrix = f;
      module22.default(n, module1364.pickNotNil(module1378.default(n, true)));
      t.root.setNativeProps(n);
    };

    return t;
  }

  module7.default(x, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.children,
          f = t.xlinkHref,
          c = t.href,
          u = undefined === c ? f : c,
          s = t.startOffset,
          p = undefined === s ? 0 : s,
          h = t.method,
          y = t.spacing,
          O = t.side,
          x = t.alignmentBaseline,
          N = t.midLine,
          D = module56.default(t, ['children', 'xlinkHref', 'href', 'startOffset', 'method', 'spacing', 'side', 'alignmentBaseline', 'midLine']),
          R = u && u.match(module1364.idPattern),
          E = R && R[1];

        if (E) {
          var _ = module1353.default(
            k(
              k({}, module1353.propsAndStyles(D)),
              {},
              {
                x: null,
                y: null,
              }
            ),
            this
          );

          module22.default(
            _,
            module1378.default(
              {
                children: n,
              },
              true
            ),
            {
              href: E,
              startOffset: p,
              method: h,
              spacing: y,
              side: O,
              alignmentBaseline: x,
              midLine: N,
            }
          );
          _.ref = this.refMethod;
          return React.default.createElement(S, _);
        }

        console.warn('Invalid `href` prop for `TextPath` element, expected a href like "#id", but got: "' + u + '"');
        return React.default.createElement(
          module1380.default,
          {
            ref: this.refMethod,
          },
          n
        );
      },
    },
  ]);
  return x;
})(module1366.default);

exports.default = R;
R.displayName = 'TextPath';
var S = module13.requireNativeComponent('RNSVGTextPath');
