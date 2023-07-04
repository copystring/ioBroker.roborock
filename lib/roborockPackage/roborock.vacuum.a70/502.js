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

var React = require('react'),
  module503 = require('./503');

class y {
  constructor() {
    module6(this, p);
    return v.apply(this, arguments);
  }

  setNativeProps(t) {}

  flashScrollIndicators() {}

  getScrollResponder() {}

  getScrollableNode() {}

  getMetrics() {}

  scrollTo() {}

  scrollToEnd(t) {}
}

y.DataSource = module503;
module.exports = y;
