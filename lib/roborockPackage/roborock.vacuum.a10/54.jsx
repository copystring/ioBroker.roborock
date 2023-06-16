var module21 = require('./21'),
  module49 = require('./49'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  s = ['onLayout', 'style', 'size'];

function c(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function l(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      c(Object(s), true).forEach(function (o) {
        module49(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      c(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

require('./51');

var React = require('react'),
  module60 = require('./60'),
  module83 = require('./83'),
  module182 = require('./182'),
  O = React.forwardRef(function (n, c) {
    var O,
      h,
      j = n.onLayout,
      w = n.style,
      v = n.size,
      z = module55(n, s);

    switch (v) {
      case 'small':
        O = b.sizeSmall;
        h = 'small';
        break;

      case 'large':
        O = b.sizeLarge;
        h = 'large';
        break;

      default:
        O = {
          height: n.size,
          width: n.size,
        };
    }

    var P = l(
      l({}, z),
      {},
      {
        ref: c,
        style: O,
        size: h,
      }
    );
    return (
      <module83 onLayout={j} style={module60.compose(b.container, w)}>
        <module182 />
      </module83>
    );
  });

O.displayName = 'ActivityIndicator';
O.defaultProps = {
  animating: true,
  color: null,
  hidesWhenStopped: true,
  size: 'small',
};
var b = module60.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeSmall: {
    width: 20,
    height: 20,
  },
  sizeLarge: {
    width: 36,
    height: 36,
  },
});
module.exports = O;
