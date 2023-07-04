var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1352 = require('./1352');

function y() {
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

  var n = _,
    module13 = y(),
    R = function () {
      var t,
        u = module12.default(n);

      if (module13) {
        var f = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, f);
      } else t = u.apply(this, arguments);

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
        var t = this.props;
        return React.default.createElement(
          P,
          module22.default(
            {
              ref: this.refMethod,
            },
            module1352.default(module1352.propsAndStyles(t), this),
            {
              d: t.d,
            }
          )
        );
      },
    },
  ]);
  return _;
})(require('./1365').default);

exports.default = module1365;
module1365.displayName = 'Path';
var P = module13.requireNativeComponent('RNSVGPath');
