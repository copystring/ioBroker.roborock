var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

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

var y = (function (t) {
  module9.default(R, t);

  var n = R,
    module13 = v(),
    y = function () {
      var t,
        u = module12.default(n);

      if (module13) {
        var f = module12.default(this).constructor;
        t = Reflect.construct(u, arguments, f);
      } else t = u.apply(this, arguments);

      return module11.default(this, t);
    };

  function R() {
    module6.default(this, R);
    return y.apply(this, arguments);
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(h, null, this.props.children);
      },
    },
  ]);
  return R;
})(React.Component);

exports.default = y;
y.displayName = 'Defs';
var h = module13.requireNativeComponent('RNSVGDefs');
