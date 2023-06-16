var module22 = require('./22'),
  module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1297 = require('./1297'),
  module1274 = require('./1274');

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
  module1287 = (function (t) {
    module7.default(x, t);

    var n = x,
      module50 = P(),
      b = function () {
        var t,
          o = module11.default(n);

        if (module50) {
          var c = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, c);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function x() {
      module4.default(this, x);
      return b.apply(this, arguments);
    }

    module5.default(x, [
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
              module1274.default(
                j(
                  j({}, module1274.propsAndStyles(t)),
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
                meetOrSlice: module1297.meetOrSliceTypes[P[1]] || 0,
                align: module1297.alignEnum[P[0]] || 'xMidYMid',
                src: module12.Image.resolveAssetSource(
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
  })(require('./1287').default);

exports.default = module1287;
module1287.displayName = 'Image';
module1287.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  preserveAspectRatio: 'xMidYMid meet',
};
var R = module12.requireNativeComponent('RNSVGImage');
