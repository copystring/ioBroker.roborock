var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1386 = require('./1386');

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

var module1365 = (function (t) {
  module9.default(_, t);

  var module13 = _,
    module1365 = v(),
    R = function () {
      var t,
        f = module12.default(module13);

      if (module1365) {
        var n = module12.default(this).constructor;
        t = Reflect.construct(f, arguments, n);
      } else t = f.apply(this, arguments);

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
          n = t.fx,
          u = t.fy,
          c = t.rx,
          l = t.ry,
          o = t.r,
          y = t.cx,
          v = t.cy;
        return React.default.createElement(
          x,
          module22.default(
            {
              ref: this.refMethod,
              fx: n,
              fy: u,
              rx: c || o,
              ry: l || o,
              cx: y,
              cy: v,
            },
            module1386.default(t, this)
          )
        );
      },
    },
  ]);
  return _;
})(require('./1365').default);

exports.default = module1365;
module1365.displayName = 'RadialGradient';
module1365.defaultProps = {
  fx: '50%',
  fy: '50%',
  cx: '50%',
  cy: '50%',
  r: '50%',
};
var x = module13.requireNativeComponent('RNSVGRadialGradient');
