var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1360 = require('./1360'),
  module1376 = require('./1376'),
  module1388 = require('./1388');

function R() {
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
  module9.default(U, t);

  var module13 = U,
    module1366 = R(),
    P = function () {
      var t,
        n = module12.default(module13);

      if (module1366) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function U() {
    module6.default(this, U);
    return P.apply(this, arguments);
  }

  module7.default(U, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.patternTransform,
          f = t.transform,
          o = t.id,
          l = t.x,
          c = t.y,
          p = t.width,
          R = t.height,
          x = t.patternUnits,
          P = t.patternContentUnits,
          U = t.children,
          _ = t.viewBox,
          C = t.preserveAspectRatio,
          N = module1360.default(u || f || t);
        return React.default.createElement(
          w,
          module22.default(
            {
              ref: this.refMethod,
              name: o,
              x: l,
              y: c,
              width: p,
              height: R,
              matrix: N,
              patternTransform: N,
              patternUnits: module1388.default[x] || 0,
              patternContentUnits: P ? module1388.default[P] : 1,
            },
            module1376.default({
              viewBox: _,
              preserveAspectRatio: C,
            })
          ),
          U
        );
      },
    },
  ]);
  return U;
})(require('./1366').default);

exports.default = module1366;
module1366.displayName = 'Pattern';
module1366.defaultProps = {
  x: '0%',
  y: '0%',
  width: '100%',
  height: '100%',
};
var w = module13.requireNativeComponent('RNSVGPattern');
