var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1352 = require('./1352');

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

var module1365 = (function (t) {
  module9.default(_, t);

  var u = _,
    module13 = h(),
    R = function () {
      var t,
        n = module12.default(u);

      if (module13) {
        var c = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, c);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function _() {
    module6.default(this, _);
    return R.apply(this, arguments);
  }

  module7.default(_, [
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
            module1352.default(module1352.propsAndStyles(t), this),
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
})(require('./1365').default);

exports.default = module1365;
module1365.displayName = 'Circle';
module1365.defaultProps = {
  cx: 0,
  cy: 0,
  r: 0,
};
var x = module13.requireNativeComponent('RNSVGCircle');
