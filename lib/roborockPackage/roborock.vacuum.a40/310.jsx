var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module311 = require('./311'),
  module312 = require('./312'),
  React = require('react'),
  module61 = require('./61'),
  module78 = require('./78');

var p = module61.default.create({
  pickerAndroid: {
    height: 50,
  },
});

module.exports = function (l) {
  var t = React.useRef(null),
    v = React.useMemo(
      function () {
        var t = 0;
        return [
          React.Children.map(l.children, function (n, u) {
            if (null === n) return null;
            if (n.props.value === l.selectedValue) t = u;
            var c = n.props,
              o = c.color,
              s = c.label;
            return {
              color: null == o ? null : module78.default(o),
              label: s,
            };
          }),
          t,
        ];
      },
      [l.children, l.selectedValue]
    ),
    h = module23.default(v, 2),
    b = h[0],
    V = h[1],
    y = React.useCallback(
      function (n) {
        var u = n.nativeEvent.position,
          c = l.onValueChange;
        if (null != c)
          if (u >= 0) {
            var s = React.Children.toArray(l.children).filter(function (l) {
              return null != l;
            })[u].props.value;
            if (l.selectedValue !== s) c(s, u);
          } else c(null, u);
        var f = t.current;
        if (null != f && u !== V)
          f.setNativeProps({
            selected: V,
          });
      },
      [l.children, l.onValueChange, l.selectedValue, V]
    ),
    C = {
      accessibilityLabel: l.accessibilityLabel,
      enabled: l.enabled,
      items: b,
      onSelect: y,
      prompt: l.prompt,
      ref: t,
      selected: V,
      style: module61.default.compose(p.pickerAndroid, l.style),
      testID: l.testID,
    };
  return 'dropdown' === l.mode ? <module311.default /> : <module312.default />;
};
