var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1274 = require('./1274');

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

var module1287 = (function (t) {
  module7.default(_, t);

  var n = _,
    module12 = h(),
    x = function () {
      var t,
        u = module11.default(n);

      if (module12) {
        var f = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, f);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    module4.default(this, _);
    return x.apply(this, arguments);
  }

  module5.default(_, [
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
            module1274.default(module1274.propsAndStyles(t), this),
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
})(require('./1287').default);

exports.default = module1287;
module1287.displayName = 'Line';
module1287.defaultProps = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
};
var R = module12.requireNativeComponent('RNSVGLine');
