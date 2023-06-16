var module50 = require('./50');

function t(o, t) {
  var b = Object.keys(o);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    if (t)
      n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(o, t).enumerable;
      });
    b.push.apply(b, n);
  }

  return b;
}

function b(b) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      t(Object(u), true).forEach(function (t) {
        module50(b, t, u[t]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(b, Object.getOwnPropertyDescriptors(u));
    else
      t(Object(u)).forEach(function (o) {
        Object.defineProperty(b, o, Object.getOwnPropertyDescriptor(u, o));
      });
  }

  return b;
}

var module67 = require('./67'),
  module69 = require('./69'),
  module73 = require('./73'),
  module74 = require('./74'),
  PropTypes = require('prop-types'),
  l = b(
    b(b(b({}, module69), module73), module74),
    {},
    {
      backfaceVisibility: PropTypes.oneOf(['visible', 'hidden']),
      backgroundColor: module67,
      borderColor: module67,
      borderTopColor: module67,
      borderRightColor: module67,
      borderBottomColor: module67,
      borderLeftColor: module67,
      borderStartColor: module67,
      borderEndColor: module67,
      borderRadius: PropTypes.number,
      borderTopLeftRadius: PropTypes.number,
      borderTopRightRadius: PropTypes.number,
      borderTopStartRadius: PropTypes.number,
      borderTopEndRadius: PropTypes.number,
      borderBottomLeftRadius: PropTypes.number,
      borderBottomRightRadius: PropTypes.number,
      borderBottomStartRadius: PropTypes.number,
      borderBottomEndRadius: PropTypes.number,
      borderStyle: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
      borderWidth: PropTypes.number,
      borderTopWidth: PropTypes.number,
      borderRightWidth: PropTypes.number,
      borderBottomWidth: PropTypes.number,
      borderLeftWidth: PropTypes.number,
      opacity: PropTypes.number,
      elevation: PropTypes.number,
    }
  );

module.exports = l;
