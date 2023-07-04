var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1092 = require('./1092');

function y() {
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

var module1082 = (function (t) {
  module7.default(b, t);

  var module12 = b,
    module1082 = y(),
    _ = function () {
      var t,
        n = module11.default(module12);

      if (module1082) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b() {
    module4.default(this, b);
    return _.apply(this, arguments);
  }

  module5.default(b, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.id,
          f = t.children;
        return React.default.createElement(
          R,
          module21.default(
            {
              name: u,
            },
            module1092.default(t)
          ),
          f
        );
      },
    },
  ]);
  return b;
})(require('./1082').default);

exports.default = module1082;
module1082.displayName = 'Symbol';
var R = module12.requireNativeComponent('RNSVGSymbol');
