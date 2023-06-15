var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1308 = require('./1308');

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
    R = function () {
      var t,
        f = module11.default(module12);

      if (module1287) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(f, arguments, n);
      } else t = f.apply(this, arguments);

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
            module1308.default(t, this)
          )
        );
      },
    },
  ]);
  return _;
})(require('./1287').default);

exports.default = module1287;
module1287.displayName = 'RadialGradient';
module1287.defaultProps = {
  fx: '50%',
  fy: '50%',
  cx: '50%',
  cy: '50%',
  r: '50%',
};
var x = module12.requireNativeComponent('RNSVGRadialGradient');
