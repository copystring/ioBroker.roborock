var module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1281 = require('./1281'),
  module1274 = require('./1274'),
  module1299 = require('./1299'),
  module1285 = require('./1285'),
  module1287 = require('./1287'),
  module1301 = require('./1301');

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
  module7.default(x, t);

  var n = x,
    module50 = D(),
    y = function () {
      var t,
        o = module11.default(n);

      if (module50) {
        var l = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, l);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function x() {
    var t;
    module4.default(this, x);

    (t = y.call(this, ...args)).setNativeProps = function (n) {
      var f = !n.matrix && module1281.default(n);
      if (f) n.matrix = f;
      module22.default(n, module1285.pickNotNil(module1299.default(n, true)));
      t.root.setNativeProps(n);
    };

    return t;
  }

  module5.default(x, [
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
          R = u && u.match(module1285.idPattern),
          E = R && R[1];

        if (E) {
          var _ = module1274.default(
            k(
              k({}, module1274.propsAndStyles(D)),
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
            module1299.default(
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
          module1301.default,
          {
            ref: this.refMethod,
          },
          n
        );
      },
    },
  ]);
  return x;
})(module1287.default);

exports.default = R;
R.displayName = 'TextPath';
var S = module12.requireNativeComponent('RNSVGTextPath');
