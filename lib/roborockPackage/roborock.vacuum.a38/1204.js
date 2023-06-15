var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1172 = require('./1172'),
  module1188 = require('./1188'),
  module1200 = require('./1200');

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

var module1178 = (function (t) {
  module7.default(U, t);

  var module12 = U,
    module1178 = R(),
    P = function () {
      var t,
        n = module11.default(module12);

      if (module1178) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function U() {
    module4.default(this, U);
    return P.apply(this, arguments);
  }

  module5.default(U, [
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
          N = module1172.default(u || f || t);
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
              patternUnits: module1200.default[x] || 0,
              patternContentUnits: P ? module1200.default[P] : 1,
            },
            module1188.default({
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
})(require('./1178').default);

exports.default = module1178;
module1178.displayName = 'Pattern';
module1178.defaultProps = {
  x: '0%',
  y: '0%',
  width: '100%',
  height: '100%',
};
var w = module12.requireNativeComponent('RNSVGPattern');
