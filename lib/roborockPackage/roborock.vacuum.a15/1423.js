var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module1414 = require('./1414');

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
  module7.default(R, t);

  var y = R,
    v = p(),
    h = function () {
      var t,
        n = module11.default(y);

      if (v) {
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
        return React.default.createElement(module1414.default, {
          style: this.props.style,
        });
      },
    },
  ]);
  return R;
})(React.default.Component);

exports.default = y;
