var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1369 = require('./1369');

function y() {
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

var module1359 = (function (t) {
  module9.default(_, t);

  var module13 = _,
    module1359 = y(),
    S = function () {
      var t,
        n = module12.default(module13);

      if (module1359) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function _() {
    module6.default(this, _);
    return S.apply(this, arguments);
  }

  module7.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.id,
          f = t.children;
        return React.default.createElement(
          R,
          module22.default(
            {
              name: u,
            },
            module1369.default(t)
          ),
          f
        );
      },
    },
  ]);
  return _;
})(require('./1359').default);

exports.default = module1359;
module1359.displayName = 'Symbol';
var R = module13.requireNativeComponent('RNSVGSymbol');
