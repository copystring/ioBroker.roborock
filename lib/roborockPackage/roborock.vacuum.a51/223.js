var module50 = require('./50');

function n(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function o(o) {
  for (var u = 1; u < arguments.length; u++) {
    var c = null != arguments[u] ? arguments[u] : {};
    if (u % 2)
      n(Object(c), true).forEach(function (n) {
        module50(o, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(c));
    else
      n(Object(c)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return o;
}

var module224 = require('./224'),
  c = module224.AnimatedEvent,
  f = module224.attachNativeEvent,
  module233 = require('./233'),
  module226 = require('./226'),
  module227 = require('./227'),
  module239 = require('./239'),
  module225 = require('./225'),
  module244 = require('./244'),
  module252 = require('./252'),
  j = {
    start: function () {},
    stop: function () {},
    reset: function () {},
    _startNativeLoop: function () {},
    _isUsingNativeDriver: function () {
      return false;
    },
  };

module.exports = {
  Value: module225,
  ValueXY: module244,
  Interpolation: module226,
  Node: module227,
  decay: function (t, n) {
    return j;
  },
  timing: function (t, n) {
    var u = t;
    return o(
      o({}, j),
      {},
      {
        start: function (t) {
          u.setValue(n.toValue);
          if (t)
            t({
              finished: true,
            });
        },
      }
    );
  },
  spring: function (t, n) {
    var u = t;
    return o(
      o({}, j),
      {},
      {
        start: function (t) {
          u.setValue(n.toValue);
          if (t)
            t({
              finished: true,
            });
        },
      }
    );
  },
  add: module233.add,
  subtract: module233.subtract,
  divide: module233.divide,
  multiply: module233.multiply,
  modulo: module233.modulo,
  diffClamp: module233.diffClamp,
  delay: function (t) {
    return j;
  },
  sequence: function (t) {
    return j;
  },
  parallel: function (t, n) {
    return j;
  },
  stagger: function (t, n) {
    return j;
  },
  loop: function (t) {
    (arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {}).iterations;
    return j;
  },
  event: function (t, n) {
    return null;
  },
  createAnimatedComponent: module252,
  attachNativeEvent: f,
  forkEvent: module233.forkEvent,
  unforkEvent: module233.unforkEvent,
  Event: c,
  __PropsOnlyForTests: module239,
};
