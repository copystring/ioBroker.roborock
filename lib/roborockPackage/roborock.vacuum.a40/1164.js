var module22 = require('./22'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1165 = require('./1165');

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

var module1178 = (function (t) {
  module7.default(v, t);

  var n = v,
    module50 = j(),
    h = function () {
      var t,
        u = module11.default(n);

      if (module50) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, o);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function v() {
    module4.default(this, v);
    return h.apply(this, arguments);
  }

  module5.default(v, [
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
            module1165.default(
              b(
                b({}, module1165.propsAndStyles(t)),
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
})(require('./1178').default);

exports.default = module1178;
module1178.displayName = 'Rect';
module1178.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rx: 0,
  ry: 0,
};
var w = module12.requireNativeComponent('RNSVGRect');
