var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1353 = require('./1353'),
  module1360 = require('./1360'),
  module1378 = require('./1378'),
  module1364 = require('./1364');

function P(t, n) {
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

function S(t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      P(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
}

function w() {
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

var module1366 = (function (t, ...args) {
  module9.default(P, t);

  var n = P,
    module50 = w(),
    v = function () {
      var t,
        u = module12.default(n);

      if (module50) {
        var c = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, c);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function P() {
    var t;
    module6.default(this, P);

    (t = v.call(this, ...args)).setNativeProps = function (n) {
      var o = !n.matrix && module1360.default(n);
      if (o) n.matrix = o;
      var c = module1353.propsAndStyles(n);
      module22.default(c, module1364.pickNotNil(module1378.default(c, false)));
      t.root.setNativeProps(c);
    };

    return t;
  }

  module7.default(P, [
    {
      key: 'render',
      value: function () {
        var t = module1353.propsAndStyles(this.props),
          n = module1353.default(
            S(
              S({}, t),
              {},
              {
                x: null,
                y: null,
              }
            ),
            this
          );
        module22.default(n, module1378.default(t, false));
        n.ref = this.refMethod;
        return React.default.createElement(D, n);
      },
    },
  ]);
  return P;
})(require('./1366').default);

exports.default = module1366;
module1366.displayName = 'TSpan';
module1378.setTSpan(module1366);
var D = module13.requireNativeComponent('RNSVGTSpan');
