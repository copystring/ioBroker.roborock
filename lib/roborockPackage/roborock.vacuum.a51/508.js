var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function f() {
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

class React {
  constructor() {
    module6(this, y);
    return h.apply(this, arguments);
  }

  shouldComponentUpdate(t) {
    return t.shouldUpdate;
  }

  render() {
    return this.props.render();
  }
}

module.exports = React;
