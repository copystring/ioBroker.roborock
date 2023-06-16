exports.default = function () {
  var t = module62.default.get('window'),
    f = React.useState(false)[1].bind(null, function (t) {
      return !t;
    }),
    o = React.useState(t)[0];
  React.useEffect(
    function () {
      module62.default.addEventListener('change', f);
      if (module62.default.get('window') !== o) f();
      return function () {
        module62.default.removeEventListener('change', f);
      };
    },
    [f, o]
  );
  return t;
};

var module62 = require('./62'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var u = f(n);
    if (u && u.has(t)) return u.get(t);
    var o = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var p = c ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (p && (p.get || p.set)) Object.defineProperty(o, l, p);
        else o[l] = t[l];
      }

    o.default = t;
    if (u) u.set(t, o);
    return o;
  })(require('react'));

function f(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    u = new WeakMap();
  return (f = function (t) {
    return t ? u : n;
  })(t);
}
