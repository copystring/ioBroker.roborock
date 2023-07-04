var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1076 = require('./1076'),
  module1092 = require('./1092'),
  module1104 = require('./1104');

function R() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var module1082 = (function (t) {
  module7.default(B, t);

  var module12 = B,
    module1082 = R(),
    P = function () {
      var t,
        n = module11.default(module12);

      if (module1082) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function B() {
    module4.default(this, B);
    return P.apply(this, arguments);
  }

  module5.default(B, [
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
          B = t.children,
          U = t.viewBox,
          _ = t.preserveAspectRatio,
          C = module1076.default(u || f || t);
        return React.default.createElement(
          w,
          module21.default(
            {
              ref: this.refMethod,
              name: o,
              x: l,
              y: c,
              width: p,
              height: R,
              matrix: C,
              patternTransform: C,
              patternUnits: module1104.default[x] || 0,
              patternContentUnits: P ? module1104.default[P] : 1,
            },
            module1092.default({
              viewBox: U,
              preserveAspectRatio: _,
            })
          ),
          B
        );
      },
    },
  ]);
  return B;
})(require('./1082').default);

exports.default = module1082;
module1082.displayName = 'Pattern';
module1082.defaultProps = {
  x: '0%',
  y: '0%',
  width: '100%',
  height: '100%',
};
var w = module12.requireNativeComponent('RNSVGPattern');
