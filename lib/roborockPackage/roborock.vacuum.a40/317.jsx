require('./52');

require('./86');

var n,
  module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module318 = require('./318'),
  React = require('react'),
  module61 = require('./61'),
  v = React.forwardRef(function (t, v) {
    var c = module61.compose(n.slider, t.style),
      p = t.onValueChange,
      C = t.onSlidingComplete,
      S = module56.default(t, ['onValueChange', 'onSlidingComplete']),
      h = p
        ? function (n) {
            if (null != n.nativeEvent.fromUser && n.nativeEvent.fromUser) p(n.nativeEvent.value);
          }
        : null,
      E = h,
      V = C
        ? function (n) {
            C(n.nativeEvent.value);
          }
        : null;
    return <module318.default />;
  });

v.defaultProps = {
  disabled: false,
  value: 0,
  minimumValue: 0,
  maximumValue: 1,
  step: 0,
};
n = module61.create({
  slider: {},
});
module.exports = v;
