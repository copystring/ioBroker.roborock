var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1160 = require('./1160');

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
  module7.default(P, t);

  var v = P,
    y = p(),
    h = function () {
      var t,
        n = module11.default(v);

      if (y) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function P() {
    module4.default(this, P);
    return h.apply(this, arguments);
  }

  module5.default(P, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.screenProps,
          u = t.component,
          o = t.navigation;
        return React.default.createElement(
          module1160.NavigationProvider,
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
