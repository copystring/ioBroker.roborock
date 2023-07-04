var module22 = require('./22'),
  module307 = require('./307'),
  module308 = require('./308'),
  React = (function (t, l) {
    if (!l && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = s(l);
    if (n && n.has(t)) return n.get(t);
    var u = {},
      o = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = o ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (n) n.set(t, u);
    return u;
  })(require('react')),
  module60 = require('./60'),
  module77 = require('./77');

function s(t) {
  if ('function' != typeof WeakMap) return null;
  var l = new WeakMap(),
    n = new WeakMap();
  return (s = function (t) {
    return t ? n : l;
  })(t);
}

var p = module60.default.create({
  pickerAndroid: {
    height: 50,
  },
});

module.exports = function (t) {
  var s = React.useRef(null),
    v = React.useMemo(
      function () {
        var l = 0;
        return [
          React.Children.map(t.children, function (n, u) {
            if (null === n) return null;
            if (n.props.value === t.selectedValue) l = u;
            var o = n.props,
              c = o.color,
              s = o.label;
            return {
              color: null == c ? null : module77.default(c),
              label: s,
            };
          }),
          l,
        ];
      },
      [t.children, t.selectedValue]
    ),
    b = module22.default(v, 2),
    y = b[0],
    h = b[1],
    O = React.useCallback(
      function (l) {
        var n = l.nativeEvent.position,
          u = t.onValueChange;
        if (null != u)
          if (n >= 0) {
            var c = React.Children.toArray(t.children).filter(function (t) {
              return null != t;
            })[n].props.value;
            if (t.selectedValue !== c) u(c, n);
          } else u(null, n);
        var f = s.current;
        if (null != f && n !== h)
          f.setNativeProps({
            selected: h,
          });
      },
      [t.children, t.onValueChange, t.selectedValue, h]
    ),
    j = {
      accessibilityLabel: t.accessibilityLabel,
      enabled: t.enabled,
      items: y,
      onSelect: O,
      prompt: t.prompt,
      ref: s,
      selected: h,
      style: module60.default.compose(p.pickerAndroid, t.style),
      testID: t.testID,
    };
  return 'dropdown' === t.mode ? <module307.default /> : <module308.default />;
};
