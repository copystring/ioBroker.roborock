var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12');

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
  module7.default(R, t);

  var n = R,
    module12 = v(),
    y = function () {
      var t,
        u = module11.default(n);

      if (module12) {
        var f = module11.default(this).constructor;
        t = Reflect.construct(u, arguments, f);
      } else t = u.apply(this, arguments);

      return module9.default(this, t);
    };

  function R() {
    module4.default(this, R);
    return y.apply(this, arguments);
  }

  module5.default(R, [
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
var h = module12.requireNativeComponent('RNSVGDefs');
