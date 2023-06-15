var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1346 = require('./1346');

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

var module1359 = (function (t) {
  module9.default(_, t);

  var n = _,
    module13 = h(),
    x = function () {
      var t,
        u = module12.default(n);

      if (module13) {
        var f = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, f);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function _() {
    module6.default(this, _);
    return x.apply(this, arguments);
  }

  module7.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          n = t.x1,
          f = t.y1,
          l = t.x2,
          o = t.y2;
        return React.default.createElement(
          R,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1346.default(module1346.propsAndStyles(t), this),
            {
              x1: n,
              y1: f,
              x2: l,
              y2: o,
            }
          )
        );
      },
    },
  ]);
  return _;
})(require('./1359').default);

exports.default = module1359;
module1359.displayName = 'Line';
module1359.defaultProps = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
};
var R = module13.requireNativeComponent('RNSVGLine');
