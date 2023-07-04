var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module958 = require('./958');

function v() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var p = (function (t) {
  module7.default(P, t);

  var p = P,
    y = v(),
    h = function () {
      var t,
        n = module11.default(p);

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
          module958.NavigationProvider,
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

exports.default = p;
