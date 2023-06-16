var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1387 = require('./1387');

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

var module1366 = (function (t) {
  module9.default(_, t);

  var module13 = _,
    module1366 = v(),
    R = function () {
      var t,
        n = module12.default(module13);

      if (module1366) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
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
          u = t.x1,
          f = t.y1,
          c = t.x2,
          l = t.y2;
        return React.default.createElement(
          x,
          module22.default(
            {
              ref: this.refMethod,
              x1: u,
              y1: f,
              x2: c,
              y2: l,
            },
            module1387.default(t, this)
          )
        );
      },
    },
  ]);
  return _;
})(require('./1366').default);

exports.default = module1366;
module1366.displayName = 'LinearGradient';
module1366.defaultProps = {
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '0%',
};
var x = module13.requireNativeComponent('RNSVGLinearGradient');
