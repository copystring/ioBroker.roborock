var module50 = require('./50'),
  module170 = require('./170');

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
        module50.default(t, c, s[c]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      o(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

var module162 = require('./162'),
  module171 = require('./171');

module.exports = function (t, n) {
  var o = {
    uiViewClassName: t,
    Commands: {},
    bubblingEventTypes: s(s({}, module171.bubblingEventTypes), n.bubblingEventTypes || {}),
    directEventTypes: s(s({}, module171.directEventTypes), n.directEventTypes || {}),
    validAttributes: s(s({}, module171.validAttributes), n.validAttributes || {}),
  };
  module162.register(t, function () {
    module170.default(t, o);
    return o;
  });
};
