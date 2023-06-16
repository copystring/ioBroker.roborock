var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1165 = require('./1165');

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

var module1178 = (function (t) {
  module7.default(_, t);

  var u = _,
    module12 = h(),
    R = function () {
      var t,
        n = module11.default(u);

      if (module12) {
        var c = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, c);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function _() {
    module4.default(this, _);
    return R.apply(this, arguments);
  }

  module5.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.cx,
          c = t.cy,
          f = t.r;
        return React.default.createElement(
          x,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1165.default(module1165.propsAndStyles(t), this),
            {
              cx: u,
              cy: c,
              r: f,
            }
          )
        );
      },
    },
  ]);
  return _;
})(require('./1178').default);

exports.default = module1178;
module1178.displayName = 'Circle';
module1178.defaultProps = {
  cx: 0,
  cy: 0,
  r: 0,
};
var x = module12.requireNativeComponent('RNSVGCircle');
