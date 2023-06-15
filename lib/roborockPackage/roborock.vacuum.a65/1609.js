var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1406 = require('./1406');

function b(t, n) {
  var c = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    c.push.apply(c, o);
  }

  return c;
}

function v(t) {
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

function h() {
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

var module393 = require('./393'),
  P = module393.isMiApp || module393.apiLevel > 10007,
  w = P ? module1406.default : module13.View,
  D = (function (t) {
    module9.default(O, t);

    var n = O,
      module50 = h(),
      y = function () {
        var t,
          o = module12.default(n);

        if (module50) {
          var u = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function O() {
      module6.default(this, O);
      return y.apply(this, arguments);
    }

    module7.default(O, [
      {
        key: 'render',
        value: function () {
          var t = v({}, this.props);

          if (!P) {
            delete t.start;
            delete t.end;
          }

          return React.default.createElement(w, t, t.children);
        },
      },
    ]);
    return O;
  })(React.Component);

exports.default = D;
