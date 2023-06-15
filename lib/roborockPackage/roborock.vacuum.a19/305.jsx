var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

function f(t) {
  var n = l();
  return function () {
    var o,
      f = module11(t);

    if (n) {
      var l = module11(this).constructor;
      o = Reflect.construct(f, arguments, l);
    } else o = f.apply(this, arguments);

    return module9(this, o);
  };
}

function l() {
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

require('./297');

require('./51');

require('./297');

var module306 = require('./306'),
  React = require('react'),
  h = (function (u) {
    module7(l, u);
    var c = f(l);

    function l() {
      module4(this, l);
      return c.apply(this, arguments);
    }

    module5(l, [
      {
        key: 'render',
        value: function () {
          throw null;
        },
      },
    ]);
    return l;
  })(React.Component),
  v = (function (u) {
    module7(l, u);
    var c = f(l);

    function l() {
      module4(this, l);
      return c.apply(this, arguments);
    }

    module5(l, [
      {
        key: 'render',
        value: function () {
          return <module306>{this.props.children}</module306>;
        },
      },
    ]);
    return l;
  })(React.Component);

v.MODE_DIALOG = 'dialog';
v.MODE_DROPDOWN = 'dropdown';
v.Item = h;
v.defaultProps = {
  mode: 'dialog',
};
module.exports = v;
