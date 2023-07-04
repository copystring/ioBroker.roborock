var module49 = require('./49');

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
    var E = null != arguments[O] ? arguments[O] : {};
    if (O % 2)
      o(Object(E), true).forEach(function (o) {
        module49.default(t, o, E[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(E));
    else
      o(Object(E)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(E, n));
      });
  }

  return t;
}

var E = {
  OPEN_DRAWER: 'Navigation/OPEN_DRAWER',
  CLOSE_DRAWER: 'Navigation/CLOSE_DRAWER',
  TOGGLE_DRAWER: 'Navigation/TOGGLE_DRAWER',
  DRAWER_OPENED: 'Navigation/DRAWER_OPENED',
  DRAWER_CLOSED: 'Navigation/DRAWER_CLOSED',
  openDrawer: function (t) {
    return O(
      {
        type: 'Navigation/OPEN_DRAWER',
      },
      t
    );
  },
  closeDrawer: function (t) {
    return O(
      {
        type: 'Navigation/CLOSE_DRAWER',
      },
      t
    );
  },
  toggleDrawer: function (t) {
    return O(
      {
        type: 'Navigation/TOGGLE_DRAWER',
      },
      t
    );
  },
};
exports.default = E;
