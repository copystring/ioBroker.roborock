var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1188 = require('./1188');

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

var module1178 = (function (t) {
  module7.default(_, t);

  var module12 = _,
    module1178 = y(),
    S = function () {
      var t,
        n = module11.default(module12);

      if (module1178) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    module4.default(this, _);
    return S.apply(this, arguments);
  }

  module5.default(_, [
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
            module1188.default(t)
          ),
          f
        );
      },
    },
  ]);
  return _;
})(require('./1178').default);

exports.default = module1178;
module1178.displayName = 'Symbol';
var R = module12.requireNativeComponent('RNSVGSymbol');
