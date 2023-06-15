var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1299 = require('./1299'),
  module1274 = require('./1274'),
  module1281 = require('./1281'),
  module1285 = require('./1285'),
  module1287 = require('./1287');

function w(t, n) {
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

function N(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      w(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      w(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function x() {
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

require('./1301');

var D = (function (t, ...args) {
  module7.default(P, t);

  var n = P,
    module50 = x(),
    v = function () {
      var t,
        u = module11.default(n);

      if (module50) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, c);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function P() {
    var t;
    module4.default(this, P);

    (t = v.call(this, ...args)).setNativeProps = function (n) {
      var o = !n.matrix && module1281.default(n);
      if (o) n.matrix = o;
      var c = module1274.propsAndStyles(n);
      module22.default(c, module1285.pickNotNil(module1299.default(c, true)));
      t.root.setNativeProps(c);
    };

    return t;
  }

  module5.default(P, [
    {
      key: 'render',
      value: function () {
        var t = module1274.propsAndStyles(this.props),
          n = module1274.default(
            N(
              N({}, t),
              {},
              {
                x: null,
                y: null,
              }
            ),
            this
          );
        module22.default(n, module1299.default(t, true));
        n.ref = this.refMethod;
        return React.default.createElement(R, n);
      },
    },
  ]);
  return P;
})(module1287.default);

exports.default = D;
D.displayName = 'Text';
var R = module12.requireNativeComponent('RNSVGText');
