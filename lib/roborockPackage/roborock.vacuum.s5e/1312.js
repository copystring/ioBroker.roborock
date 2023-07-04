var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1284 = require('./1284');

function v() {
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

var module1287 = (function (t) {
  module7.default(_, t);

  var module12 = _,
    module1287 = v(),
    P = function () {
      var t,
        n = module11.default(module12);

      if (module1287) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    module4.default(this, _);
    return P.apply(this, arguments);
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
              ref: this.refMethod,
              name: u,
            },
            module1284.default(t)
          ),
          f
        );
      },
    },
  ]);
  return _;
})(require('./1287').default);

exports.default = module1287;
module1287.displayName = 'ClipPath';
var R = module12.requireNativeComponent('RNSVGClipPath');
