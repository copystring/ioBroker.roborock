var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function l() {
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

var React = (function (t, ...args) {
  module9.default(y, t);

  var React = y,
    s = l(),
    v = function () {
      var t,
        n = module12.default(React);

      if (s) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function y() {
    var t;
    module6.default(this, y);

    (t = v.call(this, ...args)).setNativeProps = function () {
      var n = t.props.parent;
      if (n) n.forceUpdate();
    };

    return t;
  }

  module7.default(y, [
    {
      key: 'render',
      value: function () {
        return null;
      },
    },
  ]);
  return y;
})(require('react').Component);

exports.default = React;
React.displayName = 'Stop';
React.defaultProps = {
  stopColor: '#000',
  stopOpacity: 1,
};
