var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

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
  module498 = require('./498');

class y {
  constructor() {
    module4(this, p);
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

y.DataSource = module498;
module.exports = y;
