var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1353 = require('./1353'),
  module1364 = require('./1364');

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
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      b(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      b(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function P() {
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

var module1366 = (function (t) {
  module9.default(b, t);

  var n = b,
    module50 = P(),
    y = function () {
      var t,
        o = module12.default(n);

      if (module50) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function b() {
    module6.default(this, b);
    return y.apply(this, arguments);
  }

  module7.default(b, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.children,
          f = t.x,
          u = t.y,
          c = t.width,
          l = t.height,
          s = t.xlinkHref,
          p = t.href,
          y = undefined === p ? s : p,
          b = y.match(module1364.idPattern),
          P = b && b[1];
        if (!P) console.warn('Invalid `href` prop for `Use` element, expected a href like "#id", but got: "' + y + '"');
        return React.default.createElement(
          x,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1353.default(
              j(
                j({}, module1353.propsAndStyles(t)),
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
          n
        );
      },
    },
  ]);
  return b;
})(require('./1366').default);

exports.default = module1366;
module1366.displayName = 'Use';
module1366.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
var x = module13.requireNativeComponent('RNSVGUse');
