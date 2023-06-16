require('./12');

var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module923 = require('./923');

function p() {
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

var v = (function (t) {
  module7.default(R, t);

  var v = R,
    y = p(),
    h = function () {
      var t,
        n = module11.default(v);

      if (y) {
        var u = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, u);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function R(t) {
    module4.default(this, R);
    return h.call(this, t);
  }

  module5.default(R, [
    {
      key: 'render',
      value: function () {
        return React.default.createElement(module923.default, {
          style: this.props.style,
        });
      },
    },
  ]);
  return R;
})(React.default.Component);

exports.default = v;
