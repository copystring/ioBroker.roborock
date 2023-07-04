var module22 = require('./22'),
  module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties');

function s(t, n) {
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

function c(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      s(Object(c), true).forEach(function (o) {
        module50(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      s(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

require('./52');

var React = require('react'),
  module61 = require('./61'),
  module84 = require('./84'),
  module184 = require('./184'),
  f = React.forwardRef(function (n, s) {
    var f,
      b,
      h = n.onLayout,
      j = n.style,
      w = n.size,
      v = module56(n, ['onLayout', 'style', 'size']);

    switch (w) {
      case 'small':
        f = O.sizeSmall;
        b = 'small';
        break;

      case 'large':
        f = O.sizeLarge;
        b = 'large';
        break;

      default:
        f = {
          height: n.size,
          width: n.size,
        };
    }

    var z = c(
      c({}, v),
      {},
      {
        ref: s,
        style: f,
        size: b,
      }
    );
    return (
      <module84 onLayout={h} style={module61.compose(O.container, j)}>
        <module184 />
      </module84>
    );
  });

f.displayName = 'ActivityIndicator';
f.defaultProps = {
  animating: true,
  color: null,
  hidesWhenStopped: true,
  size: 'small',
};
var O = module61.create({
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
module.exports = f;
