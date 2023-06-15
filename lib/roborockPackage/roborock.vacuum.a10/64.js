var module49 = require('./49');

function t(o, t) {
  var n = Object.keys(o);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(o);
    if (t)
      c = c.filter(function (t) {
        return Object.getOwnPropertyDescriptor(o, t).enumerable;
      });
    n.push.apply(n, c);
  }

  return n;
}

function n(n) {
  for (var c = 1; c < arguments.length; c++) {
    var l = null != arguments[c] ? arguments[c] : {};
    if (c % 2)
      t(Object(l), true).forEach(function (t) {
        module49(n, t, l[t]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(l));
    else
      t(Object(l)).forEach(function (o) {
        Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return n;
}

for (
  var module65 = require('./65'),
    module75 = require('./75'),
    module76 = require('./76'),
    module77 = require('./77'),
    module78 = require('./78'),
    module80 = require('./80'),
    O = {},
    u = 0,
    y = Object.keys(n(n(n({}, module76), module75), module65));
  u < y.length;
  u++
) {
  O[y[u]] = true;
}

O.transform = {
  process: module78,
};
O.shadowOffset = {
  diff: module80,
};
var C = {
  process: module77,
};
O.backgroundColor = C;
O.borderBottomColor = C;
O.borderColor = C;
O.borderLeftColor = C;
O.borderRightColor = C;
O.borderTopColor = C;
O.borderStartColor = C;
O.borderEndColor = C;
O.color = C;
O.shadowColor = C;
O.textDecorationColor = C;
O.tintColor = C;
O.textShadowColor = C;
O.overlayColor = C;
module.exports = O;
