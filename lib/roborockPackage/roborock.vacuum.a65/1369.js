var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1353 = require('./1353');

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

var module1366 = (function (t) {
  module9.default(_, t);

  var u = _,
    module13 = h(),
    x = function () {
      var t,
        n = module12.default(u);

      if (module13) {
        var f = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, f);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function _() {
    module6.default(this, _);
    return x.apply(this, arguments);
  }

  module7.default(_, [
    {
      key: 'render',
      value: function () {
        var t = this.props,
          u = t.cx,
          f = t.cy,
          c = t.rx,
          l = t.ry;
        return React.default.createElement(
          R,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1353.default(module1353.propsAndStyles(t), this),
            {
              cx: u,
              cy: f,
              rx: c,
              ry: l,
            }
          )
        );
      },
    },
  ]);
  return _;
})(require('./1366').default);

exports.default = module1366;
module1366.displayName = 'Ellipse';
module1366.defaultProps = {
  cx: 0,
  cy: 0,
  rx: 0,
  ry: 0,
};
var R = module13.requireNativeComponent('RNSVGEllipse');
