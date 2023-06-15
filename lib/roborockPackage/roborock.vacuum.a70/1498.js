var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1489 = require('./1489');

function p() {
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

  var y = R,
    v = p(),
    h = function () {
      var t,
        n = module12.default(y);

      if (v) {
        var u = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function R(t) {
    module6.default(this, R);
    return h.call(this, t);
  }

  module7.default(R, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(module1489.default, {
          style: this.props.style,
        });
      },
    },
  ]);
  return R;
})(React.default.Component);

exports.default = y;
