var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f() {
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

var React = (function (s) {
  module7(y, s);

  var l = y,
    p = f(),
    h = function () {
      var t,
        n = module11(l);

      if (p) {
        var o = module11(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9(this, t);
    };

  function y() {
    module4(this, y);
    return h.apply(this, arguments);
  }

  module5(y, [
    {
      key: 'shouldComponentUpdate',
      value: function (t) {
        return t.shouldUpdate;
      },
    },
    {
      key: 'render',
      value: function () {
        return this.props.render();
      },
    },
  ]);
  return y;
})(require('react').Component);

module.exports = React;
