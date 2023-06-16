var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1281 = require('./1281'),
  module1297 = require('./1297'),
  module1309 = require('./1309');

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

var module1287 = (function (t) {
  module7.default(U, t);

  var module12 = U,
    module1287 = R(),
    P = function () {
      var t,
        n = module11.default(module12);

      if (module1287) {
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
          N = module1281.default(u || f || t);
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
              patternUnits: module1309.default[x] || 0,
              patternContentUnits: P ? module1309.default[P] : 1,
            },
            module1297.default({
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
})(require('./1287').default);

exports.default = module1287;
module1287.displayName = 'Pattern';
module1287.defaultProps = {
  x: '0%',
  y: '0%',
  width: '100%',
  height: '100%',
};
var w = module12.requireNativeComponent('RNSVGPattern');
