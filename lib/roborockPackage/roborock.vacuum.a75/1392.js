var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1359 = require('./1359'),
  module1352 = require('./1352'),
  module1387 = require('./1387');

function j(t, n) {
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

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      j(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      j(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function k() {
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

var module1365 = (function (t) {
  module9.default(j, t);

  var n = j,
    module50 = k(),
    h = function () {
      var t,
        o = module12.default(n);

      if (module50) {
        var f = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, f);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function j() {
    module6.default(this, j);
    return h.apply(this, arguments);
  }

  module7.default(j, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.maskTransform,
          u = t.transform,
          f = t.x,
          c = t.y,
          s = t.width,
          l = t.height,
          p = t.maskUnits,
          h = t.maskContentUnits,
          j = t.children;
        return React.default.createElement(
          D,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1352.default(
              P(
                P({}, module1352.propsAndStyles(t)),
                {},
                {
                  x: null,
                  y: null,
                }
              ),
              this
            ),
            {
              x: f,
              y: c,
              width: s,
              height: l,
              maskTransform: module1359.default(n || u || t),
              maskUnits: undefined !== p ? module1387.default[p] : 0,
              maskContentUnits: undefined !== h ? module1387.default[h] : 1,
            }
          ),
          j
        );
      },
    },
  ]);
  return j;
})(require('./1365').default);

exports.default = module1365;
module1365.displayName = 'Mask';
module1365.defaultProps = {
  x: '0%',
  y: '0%',
  width: '100%',
  height: '100%',
};
var D = module13.requireNativeComponent('RNSVGMask');
