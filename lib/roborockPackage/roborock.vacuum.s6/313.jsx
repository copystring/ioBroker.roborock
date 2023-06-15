require('./51');

require('./85');

var n,
  module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module314 = require('./314'),
  s = ['onValueChange', 'onSlidingComplete'],
  React = require('react'),
  module60 = require('./60'),
  c = React.forwardRef(function (t, c) {
    var p = module60.compose(n.slider, t.style),
      C = t.onValueChange,
      S = t.onSlidingComplete,
      h = module55.default(t, s),
      E = C
        ? function (n) {
            if (null != n.nativeEvent.fromUser && n.nativeEvent.fromUser) C(n.nativeEvent.value);
          }
        : null,
      V = E,
      R = S
        ? function (n) {
            S(n.nativeEvent.value);
          }
        : null;
    return <module314.default />;
  });

c.defaultProps = {
  disabled: false,
  value: 0,
  minimumValue: 0,
  maximumValue: 1,
  step: 0,
};
n = module60.create({
  slider: {},
});
module.exports = c;
