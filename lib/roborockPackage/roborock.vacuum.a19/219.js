var module49 = require('./49');

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
        module49(o, n, c[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(o, Object.getOwnPropertyDescriptors(c));
    else
      n(Object(c)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(c, t));
      });
  }

  return o;
}

var module220 = require('./220'),
  c = module220.AnimatedEvent,
  f = module220.attachNativeEvent,
  module229 = require('./229'),
  module222 = require('./222'),
  module223 = require('./223'),
  module235 = require('./235'),
  module221 = require('./221'),
  module240 = require('./240'),
  module248 = require('./248'),
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
  Value: module221,
  ValueXY: module240,
  Interpolation: module222,
  Node: module223,
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
  add: module229.add,
  subtract: module229.subtract,
  divide: module229.divide,
  multiply: module229.multiply,
  modulo: module229.modulo,
  diffClamp: module229.diffClamp,
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
  createAnimatedComponent: module248,
  attachNativeEvent: f,
  forkEvent: module229.forkEvent,
  unforkEvent: module229.unforkEvent,
  Event: c,
  __PropsOnlyForTests: module235,
};
