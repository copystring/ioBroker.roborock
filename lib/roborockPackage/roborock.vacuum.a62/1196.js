var module50 = require('./50');

function o(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var O = Object.getOwnPropertySymbols(t);
    if (n)
      O = O.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, O);
  }

  return o;
}

function O(t) {
  for (var O = 1; O < arguments.length; O++) {
    var c = null != arguments[O] ? arguments[O] : {};
    if (O % 2)
      o(Object(c), true).forEach(function (o) {
        module50.default(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      o(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

var c = 'Navigation/POP',
  p = 'Navigation/PUSH',
  u = 'Navigation/RESET',
  P = {
    POP: c,
    POP_TO_TOP: 'Navigation/POP_TO_TOP',
    PUSH: p,
    RESET: u,
    REPLACE: 'Navigation/REPLACE',
    COMPLETE_TRANSITION: 'Navigation/COMPLETE_TRANSITION',
    pop: function (t) {
      return O(
        {
          type: c,
        },
        t
      );
    },
    popToTop: function (t) {
      return O(
        {
          type: 'Navigation/POP_TO_TOP',
        },
        t
      );
    },
    push: function (t) {
      return O(
        {
          type: p,
        },
        t
      );
    },
    reset: function (t) {
      return O(
        {
          type: u,
        },
        t
      );
    },
    replace: function (t) {
      return O(
        {
          type: 'Navigation/REPLACE',
        },
        t
      );
    },
    completeTransition: function (t) {
      return O(
        {
          type: 'Navigation/COMPLETE_TRANSITION',
        },
        t
      );
    },
  };
exports.default = P;
