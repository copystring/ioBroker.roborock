var module50 = require('./50'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1165 = require('./1165'),
  module1172 = require('./1172'),
  module1190 = require('./1190'),
  module1176 = require('./1176');

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

var module1178 = (function (t, ...args) {
  module7.default(P, t);

  var n = P,
    module50 = w(),
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
      var o = !n.matrix && module1172.default(n);
      if (o) n.matrix = o;
      var c = module1165.propsAndStyles(n);
      module22.default(c, module1176.pickNotNil(module1190.default(c, false)));
      t.root.setNativeProps(c);
    };

    return t;
  }

  module5.default(P, [
    {
      key: 'render',
      value: function () {
        var t = module1165.propsAndStyles(this.props),
          n = module1165.default(
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
        module22.default(n, module1190.default(t, false));
        n.ref = this.refMethod;
        return React.default.createElement(D, n);
      },
    },
  ]);
  return P;
})(require('./1178').default);

exports.default = module1178;
module1178.displayName = 'TSpan';
module1190.setTSpan(module1178);
var D = module12.requireNativeComponent('RNSVGTSpan');
