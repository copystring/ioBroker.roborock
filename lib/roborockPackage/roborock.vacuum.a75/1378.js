var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1377 = require('./1377'),
  module1352 = require('./1352'),
  module1359 = require('./1359'),
  module1363 = require('./1363'),
  module1365 = require('./1365');

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

require('./1379');

var D = (function (t, ...args) {
  module9.default(P, t);

  var n = P,
    module50 = x(),
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
      var o = !n.matrix && module1359.default(n);
      if (o) n.matrix = o;
      var c = module1352.propsAndStyles(n);
      module22.default(c, module1363.pickNotNil(module1377.default(c, true)));
      t.root.setNativeProps(c);
    };

    return t;
  }

  module7.default(P, [
    {
      key: 'render',
      value: function () {
        var t = module1352.propsAndStyles(this.props),
          n = module1352.default(
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
        module22.default(n, module1377.default(t, true));
        n.ref = this.refMethod;
        return React.default.createElement(R, n);
      },
    },
  ]);
  return P;
})(module1365.default);

exports.default = D;
D.displayName = 'Text';
var R = module13.requireNativeComponent('RNSVGText');
