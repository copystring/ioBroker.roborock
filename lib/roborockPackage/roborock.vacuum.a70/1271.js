var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1232 = require('./1232');

function p() {
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

var v = (function (t) {
  module9.default(P, t);

  var v = P,
    y = p(),
    h = function () {
      var t,
        n = module12.default(v);

      if (y) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function P() {
    module6.default(this, P);
    return h.apply(this, arguments);
  }

  module7.default(P, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.screenProps,
          u = t.component,
          o = t.navigation;
        return React.default.createElement(
          module1232.NavigationProvider,
          {
            value: o,
          },
          React.default.createElement(u, {
            screenProps: n,
            navigation: o,
          })
        );
      },
    },
  ]);
  return P;
})(React.default.PureComponent);

exports.default = v;
