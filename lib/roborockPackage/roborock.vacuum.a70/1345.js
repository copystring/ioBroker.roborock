var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1346 = require('./1346');

function v(t, n) {
  var u = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    u.push.apply(u, c);
  }

  return u;
}

function b(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      v(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      v(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function j() {
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

var module1359 = (function (t) {
  module9.default(v, t);

  var n = v,
    module50 = j(),
    h = function () {
      var t,
        u = module12.default(n);

      if (module50) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, o);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function v() {
    module6.default(this, v);
    return h.apply(this, arguments);
  }

  module7.default(v, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.x,
          c = t.y,
          o = t.width,
          f = t.height,
          l = t.rx,
          s = t.ry;
        return React.default.createElement(
          w,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1346.default(
              b(
                b({}, module1346.propsAndStyles(t)),
                {},
                {
                  x: null,
                  y: null,
                }
              ),
              this
            ),
            {
              x: n,
              y: c,
              width: o,
              height: f,
              rx: l,
              ry: s,
            }
          )
        );
      },
    },
  ]);
  return v;
})(require('./1359').default);

exports.default = module1359;
module1359.displayName = 'Rect';
module1359.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rx: 0,
  ry: 0,
};
var w = module13.requireNativeComponent('RNSVGRect');
