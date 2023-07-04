var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1369 = require('./1369'),
  module1346 = require('./1346');

function b(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
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

var w = /\s+/,
  module1359 = (function (t) {
    module9.default(x, t);

    var n = x,
      module50 = P(),
      b = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var c = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, c);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function x() {
      module6.default(this, x);
      return b.apply(this, arguments);
    }

    module7.default(x, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.preserveAspectRatio,
            u = t.x,
            c = t.y,
            f = t.width,
            l = t.height,
            s = t.xlinkHref,
            p = t.href,
            b = undefined === p ? s : p,
            P = n.trim().split(w);
          return React.default.createElement(
            R,
            module22.default(
              {
                ref: this.refMethod,
              },
              module1346.default(
                j(
                  j({}, module1346.propsAndStyles(t)),
                  {},
                  {
                    x: null,
                    y: null,
                  }
                ),
                this
              ),
              {
                x: u,
                y: c,
                width: f,
                height: l,
                meetOrSlice: module1369.meetOrSliceTypes[P[1]] || 0,
                align: module1369.alignEnum[P[0]] || 'xMidYMid',
                src: module13.Image.resolveAssetSource(
                  'string' == typeof b
                    ? {
                        uri: b,
                      }
                    : b
                ),
              }
            )
          );
        },
      },
    ]);
    return x;
  })(require('./1359').default);

exports.default = module1359;
module1359.displayName = 'Image';
module1359.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  preserveAspectRatio: 'xMidYMid meet',
};
var R = module13.requireNativeComponent('RNSVGImage');
