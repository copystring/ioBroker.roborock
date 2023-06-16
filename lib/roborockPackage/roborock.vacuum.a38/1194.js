var module22 = require('./22'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1165 = require('./1165'),
  module1176 = require('./1176');

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

var module1178 = (function (t) {
  module7.default(b, t);

  var n = b,
    module50 = P(),
    y = function () {
      var t,
        o = module11.default(n);

      if (module50) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, u);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function b() {
    module4.default(this, b);
    return y.apply(this, arguments);
  }

  module5.default(b, [
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
          b = y.match(module1176.idPattern),
          P = b && b[1];
        if (!P) console.warn('Invalid `href` prop for `Use` element, expected a href like "#id", but got: "' + y + '"');
        return React.default.createElement(
          x,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1165.default(
              j(
                j({}, module1165.propsAndStyles(t)),
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
})(require('./1178').default);

exports.default = module1178;
module1178.displayName = 'Use';
module1178.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
var x = module12.requireNativeComponent('RNSVGUse');
