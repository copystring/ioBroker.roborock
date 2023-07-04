var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1103 = require('./1103');

function v() {
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
  module7.default(_, t);

  var module12 = _,
    module1082 = v(),
    R = function () {
      var t,
        n = module11.default(module12);

      if (module1082) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
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
          u = t.x1,
          f = t.y1,
          l = t.x2,
          o = t.y2;
        return React.default.createElement(
          x,
          module21.default(
            {
              ref: this.refMethod,
              x1: u,
              y1: f,
              x2: l,
              y2: o,
            },
            module1103.default(t, this)
          )
        );
      },
    },
  ]);
  return _;
})(require('./1082').default);

exports.default = module1082;
module1082.displayName = 'LinearGradient';
module1082.defaultProps = {
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '0%',
};
var x = module12.requireNativeComponent('RNSVGLinearGradient');
