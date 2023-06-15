var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function f(t) {
  var n = s();
  return function () {
    var o,
      f = module12(t);

    if (n) {
      var s = module12(this).constructor;
      o = Reflect.construct(f, arguments, s);
    } else o = f.apply(this, arguments);

    return module11(this, o);
  };
}

function s() {
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

require('./301');

require('./52');

require('./301');

var module310 = require('./310'),
  React = require('react');

class y {
  constructor() {
    module6(this, s);
    return c.apply(this, arguments);
  }

  render() {
    return <module310>{this.props.children}</module310>;
  }
}

class h {
  constructor() {
    module6(this, s);
    return c.apply(this, arguments);
  }

  render() {
    throw null;
  }
}

y.MODE_DIALOG = 'dialog';
y.MODE_DROPDOWN = 'dropdown';
y.Item = h;
y.defaultProps = {
  mode: 'dialog',
};
module.exports = y;
