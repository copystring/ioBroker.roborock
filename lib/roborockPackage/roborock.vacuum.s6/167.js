var module49 = require('./49'),
  module168 = require('./168');

function o(t, n) {
  var c = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    c.push.apply(c, o);
  }

  return c;
}

function s(t) {
  for (var c = 1; c < arguments.length; c++) {
    var s = null != arguments[c] ? arguments[c] : {};
    if (c % 2)
      o(Object(s), true).forEach(function (c) {
        module49.default(t, c, s[c]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      o(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

var module160 = require('./160'),
  module169 = require('./169');

module.exports = function (t, n) {
  var o = {
    uiViewClassName: t,
    Commands: {},
    bubblingEventTypes: s(s({}, module169.bubblingEventTypes), n.bubblingEventTypes || {}),
    directEventTypes: s(s({}, module169.directEventTypes), n.directEventTypes || {}),
    validAttributes: s(s({}, module169.validAttributes), n.validAttributes || {}),
  };
  module160.register(t, function () {
    module168.default(t, o);
    return o;
  });
};
